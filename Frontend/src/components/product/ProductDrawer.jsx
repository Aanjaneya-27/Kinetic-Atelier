import  { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { TelemetryTag } from "../ui/TelemetryTag";
import { SizeSelector } from "../ui/SizeSelector";

export function ProductDrawer({ product, onClose }) {
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const addBtnRef = useRef(null);
  const { flyToCart } = useCart();

  const handleAdd = () => {
    flyToCart(addBtnRef.current, {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumb,
      size,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#0B0B0C]/85 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`card-${product.id}`}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed inset-x-4 bottom-4 top-4 z-50 overflow-y-auto rounded-sm bg-[#101113] md:inset-x-auto md:right-6 md:top-6 md:bottom-6 md:w-[560px]"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2C30] text-[#ECE9E2]"
        >
          <X size={16} />
        </button>

        <motion.div layoutId={`card-img-${product.id}`} className="relative h-[42vh] w-full">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        </motion.div>

        <div className="p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#84868C]">
              {product.category}
            </p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="font-black uppercase text-3xl text-[#ECE9E2]">{product.title}</h3>
              <span className="font-mono text-xl text-[#FF4B1F]">${product.price}</span>
            </div>
            <p className="mt-1 text-xs text-[#84868C]">Colorway — {product.colorway}</p>

            <TelemetryTag specs={product.specs} className="mt-5" />

            <p className="mt-6 text-sm leading-relaxed text-[#84868C]">
              Constructed from lab-grade materials and stress-tested through repeated kinetic cycles.
              Designed to disappear on the body while carrying the exact tolerances of an engineering
              spec sheet.
            </p>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#84868C]">
                Select Size
              </p>
              <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
            </div>

            <button
              ref={addBtnRef}
              onClick={handleAdd}
              className="mt-8 flex w-full items-center justify-center gap-2 bg-[#ECE9E2] py-4 font-mono text-xs uppercase tracking-[0.2em] text-[#0B0B0C] transition-colors hover:bg-[#FF4B1F] hover:text-[#0B0B0C]"
            >
              Add to Bag <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}