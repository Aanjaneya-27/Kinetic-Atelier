import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

export function FlyParticles() {
  const { particles } = useCart();
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.startX, y: p.startY, width: 52, height: 52, opacity: 1, borderRadius: 4 }}
            animate={{
              x: p.endX,
              y: p.endY,
              width: 12,
              height: 12,
              opacity: 0.4,
              borderRadius: 12,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.6, 0, 0.3, 1] }}
            className="absolute overflow-hidden bg-[#18191B]"
            style={{ position: "fixed" }}
          >
            <img src={p.image} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}