import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function BentoCard({ product, onOpen, className = "" }) {
  return (
    <motion.button
      layoutId={`card-${product.id}`}
      onClick={() => onOpen(product)}
      className={
        "group relative overflow-hidden rounded-sm bg-[#18191B] text-left " + className
      }
    >
      <motion.div layoutId={`card-img-${product.id}`} className="absolute inset-0">
        <img
          src={product.thumb}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/10 to-transparent opacity-80" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84868C]">
          {product.category}
        </p>
        <p className="mt-1 font-black uppercase text-[#ECE9E2]">{product.title}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-sm text-[#FF4B1F]">${product.price}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2A2C30] text-[#ECE9E2] opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}