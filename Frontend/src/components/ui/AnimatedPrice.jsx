import { useState, useEffect } from "react";
import { useMotionValue, animate } from "framer-motion";

export function AnimatedPrice({ value, className = "" }) {
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(value.toFixed(2));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, mv]);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplay(v.toFixed(2)));
    return unsub;
  }, [mv]);

  return <span className={"font-mono tabular-nums " + className}>${display}</span>;
}