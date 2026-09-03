import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FEATURED } from "../../data/product";

export function Lookbook() {
  const ref = useRef(null);
  const shots = [FEATURED[1], FEATURED[3], FEATURED[0]];

  useGSAP(
    () => {
      gsap.from(".look-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      gsap.utils.toArray(".look-img").forEach((img, i) => {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="editorial" ref={ref} className="border-t border-[#18191B] px-6 py-24 md:px-10 md:py-32">
      <div className="look-heading mb-14 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#84868C]">
            Editorial
          </p>
          <h2 className="mt-2 font-black uppercase text-[#ECE9E2] text-4xl md:text-5xl">
            Field Notes — SS26
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm text-[#84868C] md:block">
          Shot on location, worn under load. No studio lighting, no retouching
          of the wear.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {shots.map((p, i) => (
          <div key={p.id} className={i === 1 ? "md:mt-16" : ""}>
            <div
              className="relative overflow-hidden rounded-sm bg-[#18191B]"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ willChange: "transform" }}
                className="look-img absolute -inset-y-[15%] left-0 h-[130%] w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="font-black uppercase text-sm text-[#ECE9E2]">{p.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84868C]">
                {p.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}