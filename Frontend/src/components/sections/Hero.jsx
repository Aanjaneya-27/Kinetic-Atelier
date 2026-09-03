import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FEATURED } from "../../data/product";
import { TelemetryTag } from "../ui/TelemetryTag";

export function Hero() {
  const containerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const cursorX = useSpring(mvX, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(mvY, { stiffness: 300, damping: 30 });

  const bgX = useTransform(mvX, [-0.5, 0.5], [-24, 24]);
  const bgY = useTransform(mvY, [-0.5, 0.5], [-24, 24]);
  const midX = useTransform(mvX, [-0.5, 0.5], [-48, 48]);
  const midY = useTransform(mvY, [-0.5, 0.5], [-32, 32]);
  const fgX = useTransform(mvX, [-0.5, 0.5], [12, -12]);
  const fgY = useTransform(mvY, [-0.5, 0.5], [8, -8]);

  const rafId = useRef(null);
  const pendingEvent = useRef(null);

  const handleMove = (e) => {
    pendingEvent.current = { x: e.clientX, y: e.clientY };
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      const r = containerRef.current.getBoundingClientRect();
      const { x, y } = pendingEvent.current;
      mvX.set((x - r.left) / r.width - 0.5);
      mvY.set((y - r.top) / r.height - 0.5);
      cursorX.set(x - r.left);
      cursorY.set(y - r.top);
      rafId.current = null;
    });
  };

  useEffect(() => () => rafId.current && cancelAnimationFrame(rafId.current), []);

  useGSAP(
    () => {
      gsap.set(".split-word", { yPercent: 130, rotate: 5, opacity: 0 });
      gsap.set(".hero-fade", { opacity: 0, y: 16 });
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });
      tl.to(".split-word", { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.055 })
        .to(".hero-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.6");
    },
    { scope: containerRef }
  );

  const words = "PRECISION\u00A0BUILT\u00A0MOTION".split("\u00A0");

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative h-[100svh] w-full overflow-hidden bg-[#0B0B0C]"
    >
      <motion.div
        style={{ x: bgX, y: bgY, willChange: "transform" }}
        className="pointer-events-none absolute -inset-20 opacity-60"
      >
        <div className="absolute top-1/4 left-1/4 h-[34vw] w-[34vw] rounded-full bg-[#FF4B1F]/10 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 h-[24vw] w-[24vw] rounded-full bg-[#84868C]/10 blur-[80px]" />
      </motion.div>

      <motion.div
        style={{ x: midX, y: midY, willChange: "transform" }}
        className="pointer-events-none absolute right-[6%] top-[18%] hidden md:block"
      >
        <div className="hero-fade w-[280px] rotate-3 border border-[#2A2C30] bg-[#101113]/60 p-4 backdrop-blur-sm">
          <TelemetryTag specs={FEATURED[0].specs} className="!flex-col !items-start !gap-1.5" />
        </div>
      </motion.div>

      <motion.div
        style={{ x: fgX, y: fgY, willChange: "transform" }}
        className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-24 md:px-10 md:pb-28"
      >
        <p className="hero-fade mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#84868C]">
          SS26 Collection — 001 / Kinetic Line
        </p>
        <h1 className="font-black uppercase leading-[0.86] tracking-tight text-[#ECE9E2] text-[13vw] md:text-[7.2vw]">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-top">
              <span className="split-word inline-block will-change-transform">{w}</span>
            </span>
          ))}
        </h1>

        <div className="hero-fade mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-sm text-[#84868C]">
            Apparel and footwear engineered at the intersection of laboratory materials science and
            editorial minimalism. Every piece ships with its own telemetry.
          </p>
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="group relative flex items-center gap-4 cursor-pointer"
          >
            <div className="h-24 w-24 overflow-hidden rounded-sm bg-[#18191B] md:h-28 md:w-28">
              <img
                src={FEATURED[0].thumb}
                alt={FEATURED[0].title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84868C]">
                Flagship
              </p>
              <p className="font-black uppercase text-[#ECE9E2]">{FEATURED[0].title}</p>
              <p className="font-mono text-sm text-[#FF4B1F]">${FEATURED[0].price}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="pointer-events-none absolute left-0 top-0 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ECE9E2] text-[10px] font-bold uppercase tracking-wider text-[#0B0B0C]"
      >
        Quick View
      </motion.div>
    </section>
  );
}