import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { HorizontalShowcase } from "./components/sections/HorizontalShowcase";
import { BentoGrid } from "./components/sections/BentoGrid";
import { MaterialsLab } from "./components/sections/MaterialsLab";
import { Lookbook } from "./components/sections/Lookbook";
import { Newsletter } from "./components/sections/Newsletter";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { FlyParticles } from "./components/cart/FlyParticles";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen w-full bg-[#0B0B0C] font-sans text-[#ECE9E2] selection:bg-[#FF4B1F] selection:text-[#0B0B0C]">
        <Navbar />
        <main>
          <Hero />
          <HorizontalShowcase />
          <BentoGrid />
          <MaterialsLab />
          <Lookbook />
          <Newsletter />
        </main>
        <Footer />

        <CartDrawer />
        <FlyParticles />
      </div>
    </CartProvider>
  );
}