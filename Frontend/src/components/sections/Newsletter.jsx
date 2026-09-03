import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "../ui/MagneticButton";

export function Newsletter() {
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from(".news-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
    },
    { scope: ref }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="border-t border-[#18191B] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="news-reveal font-mono text-xs uppercase tracking-[0.3em] text-[#84868C]">
          Join The Line
        </p>
        <h2 className="news-reveal mt-3 font-black uppercase text-[#ECE9E2] text-4xl md:text-5xl">
          Get Early Access To Drops
        </h2>
        <p className="news-reveal mx-auto mt-4 max-w-md text-sm text-[#84868C]">
          Limited-run releases, restock alerts, and first look at whatever the
          lab ships next.
        </p>

        <div className="news-reveal mt-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-sm text-[#FF4B1F]"
              >
                You're on the list — check your inbox.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="flex-1 border border-[#2A2C30] bg-transparent px-4 py-3 font-mono text-sm text-[#ECE9E2] outline-none placeholder:text-[#84868C] focus:border-[#FF4B1F]"
                />
                <MagneticButton
                  strength={0.25}
                  className="flex items-center justify-center gap-2 bg-[#ECE9E2] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#0B0B0C] transition-colors hover:bg-[#FF4B1F]"
                >
                  Subscribe <ArrowRight size={14} />
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}