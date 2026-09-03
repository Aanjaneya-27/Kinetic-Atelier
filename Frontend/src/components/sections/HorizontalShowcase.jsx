import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FEATURED } from "../../data/product";
import { TelemetryTag } from "../ui/TelemetryTag";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURED[activeIdx];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const panels = gsap.utils.toArray(".showcase-panel", track);
        const distance = () => track.scrollWidth - section.offsetWidth;

        const scrollTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, i) => {
          gsap.fromTo(
            panel.querySelector(".panel-inner"),
            { scale: 0.82, opacity: 0.35 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 60%",
                end: "left 30%",
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            panel.querySelector(".panel-inner"),
            { scale: 1, opacity: 1 },
            {
              scale: 0.82,
              opacity: 0.35,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "right 70%",
                end: "right 40%",
                scrub: true,
              },
            }
          );
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
            end: "right center",
            onToggle: (self) => self.isActive && setActiveIdx(i),
          });
        });

        return () => {
          scrollTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-auto overflow-hidden lg:h-[100svh]"
      style={{
        background: `linear-gradient(180deg, ${active.accent}14 0%, #0B0B0C 60%)`,
        transition: "background 0.8s ease",
      }}
    >
      <div className="absolute left-6 top-8 z-10 md:left-10 md:top-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#84868C]">
          Flagship Line — {String(activeIdx + 1).padStart(2, "0")} /{" "}
          {String(FEATURED.length).padStart(2, "0")}
        </p>
        <h2 className="mt-2 font-black uppercase text-[#ECE9E2] text-4xl md:text-5xl">
          {active.title}
        </h2>
      </div>

      <div
        ref={trackRef}
        style={{ willChange: "transform" }}
        className="flex h-full w-max snap-x snap-mandatory overflow-x-auto lg:overflow-visible lg:snap-none"
      >
        {FEATURED.map((p) => (
          <div
            key={p.id}
            className="showcase-panel flex h-[70vh] w-[85vw] shrink-0 snap-center items-center justify-center px-6 lg:h-full lg:w-screen lg:px-24"
          >
            <div
              className="panel-inner grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="order-2 lg:order-1">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#84868C]">
                  {p.category}
                </p>
                <p className="mt-3 font-mono text-3xl text-[#FF4B1F]">${p.price}</p>
                <p className="mt-4 max-w-sm text-sm text-[#84868C]">
                  Colorway — {p.colorway}. Lab-tested under repeated kinetic load for durability well
                  beyond spec.
                </p>
                <TelemetryTag specs={p.specs} className="mt-6" />
              </div>
              <div className="order-1 aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#18191B] lg:order-2">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}