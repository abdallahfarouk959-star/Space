import { NavLink, Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion"; // ضفنا Framer Motion عشان اللوجو

export function Navigation() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "transition-colors pb-1 border-b-2 whitespace-nowrap",
      isActive
        ? "text-space-cyan border-space-cyan"
        : "border-transparent hover:text-space-cyan text-gray-300"
    );

  return (
    <nav className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 max-w-7xl mx-auto w-full z-10 shrink-0">
      
      {/* جزء اللوجو الجديد باسم CosmoVision */}
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div 
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="p-2 bg-space-purple/20 rounded-xl border border-space-purple/30 text-space-cyan group-hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all"
        >
          <Rocket size={24} strokeWidth={1.5} />
        </motion.div>
        
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-black tracking-widest uppercase leading-none">
            Cosmo<span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan to-space-purple">Vision</span>
          </span>
        </div>
      </Link>

      {/* الروابط (ضيفنا رابط 3D Planets) */}
      <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium tracking-widest uppercase items-center pt-1 overflow-x-auto hide-scrollbar">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/explore" className={linkClass}>Gallery</NavLink>
        <NavLink to="/planets" className={linkClass}>3D Planets</NavLink> {/* ده لينك الكواكب الجديد */}
        <NavLink to="/book" className={linkClass}>Book Tour</NavLink>
      </div>

      <button className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/20 hover:text-space-cyan transition-all hidden lg:block whitespace-nowrap shrink-0">
        Terminal Access
      </button>
    </nav>
  );
}