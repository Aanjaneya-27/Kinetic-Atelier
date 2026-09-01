import React from "react";
import { motion } from "framer-motion";

export function SizeSelector({ sizes, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className="relative px-3.5 py-2 font-mono text-xs uppercase tracking-wide text-[#ECE9E2]"
        >
          {value === s && (
            <motion.span
              layoutId="size-highlight"
              transition={{ type: "spring", stiffness: 520, damping: 32 }}
              className="absolute inset-0 bg-[#ECE9E2]"
            />
          )}
          <span className={"relative z-10 " + (value === s ? "text-[#0B0B0C]" : "")}>
            {s}
          </span>
          <span className="absolute inset-0 border border-[#2A2C30]" />
        </button>
      ))}
    </div>
  );
}