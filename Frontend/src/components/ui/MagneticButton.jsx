import { motion, useTransform } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";

export function MagneticButton({ children, className = "", strength = 0.35, ...props }) {
  const m = useMagnetic(strength);
  return (
    <motion.button
      ref={m.ref}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      style={{ x: m.x, y: m.y }}
      className={className}
      {...props}
    >
      <motion.span
        style={{ x: useTransform(m.x, (v) => v * 0.4), y: useTransform(m.y, (v) => v * 0.4) }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}