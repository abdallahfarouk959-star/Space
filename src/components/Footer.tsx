import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 mt-auto py-8 relative overflow-hidden flex-shrink-0">
      {/* إضاءة خفيفة جداً في الخلفية تليق مع ستايل الموقع */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-purple/5 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xs sm:text-sm font-medium tracking-widest uppercase text-gray-400">
        
        {/* حقوق النشر */}
        <span className="text-white/70">
          © {currentYear} Stellaris.
        </span>
        
        <span className="hidden md:inline-block text-white/20">|</span>

        {/* Created with React & Heart */}
        <div className="flex items-center gap-2">
          <span>Created with</span>
          {/* لوجو ريأكت الأصلي مع أنيميشن الدوران */}
          <svg 
            viewBox="-10.5 -9.45 21 18.9" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 text-[#61DAFB] animate-[spin_10s_linear_infinite]"
          >
            <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="10" ry="4.5"></ellipse>
              <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
              <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
            </g>
          </svg>
          <span className="text-white/40 font-black">&</span>
          {/* القلب مع أنيميشن النبض */}
          <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
        </div>

        <span className="hidden md:inline-block text-white/20">|</span>

        {/* اسمك كـ مطور */}
        <span className="flex items-center gap-2">
          By <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan to-space-purple font-black text-sm sm:text-base">Abdallah M Farouk</span>
        </span>

      </div>
    </footer>
  );
}