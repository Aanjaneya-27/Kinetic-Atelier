import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".footer-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
      });
    },
    { scope: footerRef }
  );

  const marqueeWords = ["PRECISION", "KINETIC", "ATELIER", "MOTION", "ENGINEERED"];

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[#18191B] bg-[#0B0B0C] pt-20">
      <div className="footer-reveal overflow-hidden border-y border-[#18191B] py-6">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-black uppercase text-[#18191B] text-[8vw] leading-none [-webkit-text-stroke:1px_#2A2C30] md:text-[4vw]"
            >
              {w} <span className="text-[#FF4B1F] text-2xl md:text-3xl">&#9679;</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="footer-reveal col-span-2 md:col-span-1">
          <p className="font-black uppercase text-[#ECE9E2]">
            KINETIC<span className="text-[#FF4B1F]">/</span>ATELIER
          </p>
          <p className="mt-3 max-w-[220px] text-xs text-[#84868C]">
            Technical apparel and footwear, engineered in small batches.
          </p>
        </div>
        {[
          { h: "Shop", items: ["Footwear", "Apparel", "New Arrivals", "Archive"] },
          { h: "Studio", items: ["About", "Materials Lab", "Journal", "Careers"] },
          { h: "Support", items: ["Sizing Guide", "Shipping", "Returns", "Contact"] },
        ].map((col) => (
          <div key={col.h} className="footer-reveal">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#84868C]">
              {col.h}
            </p>
            <ul className="space-y-2">
              {col.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-[#ECE9E2]/80 transition-colors hover:text-[#FF4B1F]">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-reveal flex flex-col items-center justify-between gap-4 border-t border-[#18191B] px-6 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[#84868C] md:flex-row md:px-10">
        <span>&copy; 2026 Kinetic Atelier. All rights reserved.</span>
        <span>Designed &amp; built</span>
      </div>
    </footer>
  );
}