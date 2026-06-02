import { NavLink, Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "transition-colors pb-1 border-b-2 whitespace-nowrap",
      isActive
        ? "text-space-cyan border-space-cyan"
        : "border-transparent hover:text-space-cyan text-gray-300"
    );

  return (
    // التعديل هنا: استخدمنا sm:justify-between عشان يفصل اللوجو عن اللينكات على الشاشات الكبيرة
    <nav className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-8 border-b border-white/10 pb-4 max-w-7xl mx-auto w-full z-10 shrink-0">
      
      {/* جزء اللوجو (أقصى الشمال) */}
      <Link to="/" className="flex items-center gap-3 group shrink-0">
        <motion.div 
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="p-2 bg-space-purple/20 rounded-xl border border-space-purple/30 text-space-cyan group-hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all"
        >
          <Rocket size={24} strokeWidth={1.5} />
        </motion.div>
        
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-black tracking-widest uppercase leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan to-space-purple">Stellaris</span>
          </span>
        </div>
      </Link>

      {/* الروابط (أقصى اليمين بسبب justify-between) */}
      <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium tracking-widest uppercase items-center overflow-x-auto hide-scrollbar w-full sm:w-auto justify-center pb-2 sm:pb-0">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/planets" className={linkClass}>3D Planets</NavLink>
        <NavLink to="/explore" className={linkClass}>Gallery</NavLink>
        <NavLink to="/book" className={linkClass}>Book Tour</NavLink>
      </div>
      
    </nav>
  );
}