import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { CartLineItem } from "./CartLineItem";
import { AnimatedPrice } from "../ui/AnimatedPrice";

export function CartDrawer() {
  const { items, cartOpen, setCartOpen, subtotal } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-40 bg-[#0B0B0C]/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-[#0B0B0C] p-6 md:w-[440px] md:p-8"
          >
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-black uppercase text-xl text-[#ECE9E2]">
                Bag <span className="text-[#84868C]">({items.length})</span>
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2C30] text-[#ECE9E2]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-16 text-center text-sm text-[#84868C]"
                  >
                    Your bag is empty. Swipe left on an item here once you've added something, to remove it.
                  </motion.p>
                ) : (
                  items.map((item, i) => <CartLineItem key={item.cartId} item={item} index={i} />)
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#2A2C30] pt-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#84868C]">
                    Subtotal
                  </span>
                  <AnimatedPrice value={subtotal} className="text-xl text-[#ECE9E2]" />
                </div>
                <button className="flex w-full items-center justify-center gap-2 bg-[#FF4B1F] py-4 font-mono text-xs uppercase tracking-[0.2em] text-[#0B0B0C]">
                  Checkout <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}