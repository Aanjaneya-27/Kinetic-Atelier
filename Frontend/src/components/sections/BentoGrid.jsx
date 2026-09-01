import  { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { PRODUCTS } from "../../data/product";
import { BentoCard } from "../product/BentoCard";
import { ProductDrawer } from "../product/ProductDrawer";

export function BentoGrid() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".bento-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="px-6 py-24 md:px-10 md:py-32">
      <div className="bento-heading mb-12 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#84868C]">
            Full Catalogue
          </p>
          <h2 className="mt-2 font-black uppercase text-[#ECE9E2] text-4xl md:text-5xl">
            The Archive
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm text-[#84868C] md:block">
          Eight silhouettes. Every unit shipped with its own telemetry tag.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PRODUCTS.map((p, i) => (
          <BentoCard
            key={p.id}
            product={p}
            onOpen={setSelected}
            className={
              "aspect-[3/4] " +
              (i % 7 === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-[4/5]" : "")
            }
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProductDrawer product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}