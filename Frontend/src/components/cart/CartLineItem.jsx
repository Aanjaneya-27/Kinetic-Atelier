import { motion, useMotionValue, useTransform } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { AnimatedPrice } from "../ui/AnimatedPrice";

export function CartLineItem({ item, index }) {
  const { dispatch } = useCart();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-160, 0], [0, 1]);
  const bgOpacity = useTransform(x, [-160, -40, 0], [1, 0, 0]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className="relative mb-4 overflow-hidden"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 flex items-center justify-end bg-[#FF4B1F] pr-6 font-mono text-xs uppercase tracking-wide text-[#0B0B0C]"
      >
        Remove
      </motion.div>
      <motion.div
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.6, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -100) {
            dispatch({ type: "REMOVE", payload: item.cartId });
          }
        }}
        className="relative flex cursor-grab items-center gap-4 bg-[#0B0B0C] active:cursor-grabbing"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[#18191B]">
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-black uppercase text-sm text-[#ECE9E2]">{item.title}</p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-[#84868C]">
            Size {item.size}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() =>
                dispatch({ type: "QTY", payload: { cartId: item.cartId, qty: item.qty - 1 } })
              }
              className="flex h-6 w-6 items-center justify-center border border-[#2A2C30] text-[#ECE9E2]"
            >
              <Minus size={11} />
            </button>
            <span className="w-4 text-center font-mono text-xs text-[#ECE9E2]">{item.qty}</span>
            <button
              onClick={() =>
                dispatch({ type: "QTY", payload: { cartId: item.cartId, qty: item.qty + 1 } })
              }
              className="flex h-6 w-6 items-center justify-center border border-[#2A2C30] text-[#ECE9E2]"
            >
              <Plus size={11} />
            </button>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <AnimatedPrice value={item.price * item.qty} className="text-sm text-[#ECE9E2]" />
          <button
            onClick={() => dispatch({ type: "REMOVE", payload: item.cartId })}
            aria-label={`Remove ${item.title} from bag`}
            className="text-[#84868C] transition-colors hover:text-[#FF4B1F]"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}