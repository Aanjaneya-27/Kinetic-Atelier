import { useRef, useEffect } from "react";
import { animate } from "framer-motion";

export function AnimatedPrice({ value, className = "" }) {
  const nodeRef = useRef(null);
  const mv = useRef(null);
  if (mv.current === null) mv.current = value;

  useEffect(() => {
    const controls = animate(mv.current, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        mv.current = v;
        if (nodeRef.current) nodeRef.current.textContent = `$${v.toFixed(2)}`;
      },
    });
    return controls.stop;
  }, [value]);

  return (
    <span ref={nodeRef} className={"font-mono tabular-nums " + className}>
      ${value.toFixed(2)}
    </span>
  );
}