import React, { createContext, useContext, useReducer, useRef, useState, useCallback } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const cartId = `${action.payload.id}-${action.payload.size}`;
      const existing = state.items.find((i) => i.cartId === cartId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.payload, cartId, qty: 1 }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.cartId !== action.payload) };
    case "QTY":
      return {
        items: state.items.map((i) =>
          i.cartId === action.payload.cartId
            ? { ...i, qty: Math.max(1, action.payload.qty) }
            : i
        ),
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [cartOpen, setCartOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const cartIconRef = useRef(null);

  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = state.items.reduce((s, i) => s + i.qty, 0);

  const flyToCart = useCallback((originEl, payload) => {
    if (!originEl || !cartIconRef.current) {
      dispatch({ type: "ADD", payload });
      return;
    }
    const start = originEl.getBoundingClientRect();
    const end = cartIconRef.current.getBoundingClientRect();
    const particleId = `${payload.id}-${Date.now()}`;
    setParticles((p) => [
      ...p,
      {
        id: particleId,
        image: payload.image,
        startX: start.left + start.width / 2 - 26,
        startY: start.top + start.height / 2 - 26,
        endX: end.left + end.width / 2 - 6,
        endY: end.top + end.height / 2 - 6,
      },
    ]);
    window.setTimeout(() => {
      dispatch({ type: "ADD", payload });
      setParticles((p) => p.filter((x) => x.id !== particleId));
    }, 700);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        dispatch,
        subtotal,
        count,
        cartOpen,
        setCartOpen,
        flyToCart,
        cartIconRef,
        particles,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}