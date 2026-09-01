import { Circle } from "lucide-react";

export function TelemetryTag({ specs, className = "" }) {
  return (
    <div
      className={
        "inline-flex items-center gap-3 border border-[#2A2C30] bg-[#101113]/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#84868C] " +
        className
      }
    >
      <span className="text-[#ECE9E2]">{specs.weight}G</span>
      <Circle size={3} fill="#84868C" stroke="none" />
      <span>{specs.drop}MM DROP</span>
      <Circle size={3} fill="#84868C" stroke="none" />
      <span>{specs.upper}</span>
      <Circle size={3} fill="#84868C" stroke="none" />
      <span>{specs.rating}</span>
    </div>
  );
}