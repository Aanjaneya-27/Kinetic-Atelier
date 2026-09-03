import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { MagneticButton } from "../ui/MagneticButton";

export function Navbar() {
  const { count, setCartOpen, cartIconRef } = useCart();
  const { scrollY } = useScroll();

  const padY = useTransform(scrollY, [0, 140], [28, 14]);
  const blur = useTransform(scrollY, [0, 140], [0, 16]);
  const bgAlpha = useTransform(scrollY, [0, 140], [0, 0.72]);
  const backdropFilter = useTransform(blur, (v) => `blur(${v}px)`);
  const background = useTransform(bgAlpha, (v) => `rgba(11,11,12,${v})`);
  const borderAlpha = useTransform(scrollY, [0, 140], [0, 1]);
  const borderColor = useTransform(borderAlpha, (v) => `rgba(42,44,48,${v})`);

  const links = [
    { label: "Shop", href: "#archive" },
    { label: "Lab", href: "#lab" },
    { label: "Editorial", href: "#editorial" },
  ];

  return (
    <motion.header
      style={{ paddingTop: padY, paddingBottom: padY, backdropFilter, background, borderColor }}
      className="fixed top-0 left-0 right-0 z-50 border-b px-6 md:px-10 flex items-center justify-between"
    >
      <a href="#top" className="font-black tracking-tight text-[#ECE9E2] text-lg select-none">
        KINETIC<span className="text-[#FF4B1F]">/</span>ATELIER
      </a>

      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <MagneticButton
            key={l.label}
            onClick={() =>
              document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-[#84868C] hover:text-[#ECE9E2] transition-colors"
          >
            {l.label}
          </MagneticButton>
        ))}
      </nav>

      <MagneticButton
        onClick={() => setCartOpen(true)}
        strength={0.4}
        className="relative flex items-center gap-2 border border-[#2A2C30] px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-[#ECE9E2]"
      >
        <span ref={cartIconRef} className="relative flex items-center">
          <ShoppingBag size={15} />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4B1F] text-[9px] font-bold text-[#0B0B0C]"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        Bag
      </MagneticButton>
    </motion.header>
  );
}