import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LAB_ITEMS = [
  {
    label: "01",
    title: "Mono-Filament Weave",
    desc: "Single-strand engineered mesh cuts seam count while raising tensile strength.",
    stat: "40% fewer seams",
  },
  {
    label: "02",
    title: "Reclaimed Compound Sole",
    desc: "EVA/TPU blend recovered from post-industrial waste, retested against virgin-material rebound.",
    stat: "62% recycled input",
  },
  {
    label: "03",
    title: "Laser-Mapped Ventilation",
    desc: "Micro-perforation placed against thermal imaging of the body in motion.",
    stat: "1,200 vents / m\u00B2",
  },
  {
    label: "04",
    title: "Closed-Loop Dye Bath",
    desc: "Pigment baths recirculate through the line, driving discharge toward zero.",
    stat: "94% water reclaimed",
  },
];

export function MaterialsLab() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from(".lab-item", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="lab" ref={ref} className="border-t border-[#18191B] px-6 py-24 md:px-10 md:py-32">
      <div className="lab-item mb-14">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#84868C]">
          Materials Lab
        </p>
        <h2 className="mt-2 max-w-2xl font-black uppercase text-[#ECE9E2] text-4xl md:text-5xl">
          Built From First Principles
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#18191B] bg-[#18191B] md:grid-cols-4">
        {LAB_ITEMS.map((it) => (
          <div
            key={it.label}
            className="lab-item group flex flex-col bg-[#0B0B0C] p-6 transition-colors duration-300 hover:bg-[#101113] md:p-8"
          >
            <p className="font-mono text-xs text-[#FF4B1F]">{it.label}</p>
            <h3 className="mt-4 font-black uppercase text-[#ECE9E2]">{it.title}</h3>
            <p className="mt-3 flex-1 text-sm text-[#84868C]">{it.desc}</p>
            <p className="mt-6 border-t border-[#18191B] pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#84868C]">
              {it.stat}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}