import { useState, useEffect } from "react";
import { GlassCard } from "../components/GlassCard";

interface Planet {
  id: string;
  englishName: string;
  gravity: number;
  density: number;
  moonsCount: number;
  massValue: number;
  massExponent: number;
  description: string;
  gradientClass: string; // ستايل الملامح والتفاصيل الواقعية لكل كوكب
}

const SOLAR_SYSTEM_DATA: Planet[] = [
  { id: "earth", englishName: "Earth", gravity: 9.8, density: 5.51, moonsCount: 1, massValue: 5.97, massExponent: 24, description: "كوكبنا الأزرق، تظهر تفاصيل القارات الخضراء والبحار المحيطية مع طبقة السحب البيضاء المتحركة.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#4f46e5,#06b6d4_40%,#1e3a8a_70%,#000_100%)]" },
  { id: "mars", englishName: "Mars", gravity: 3.71, density: 3.93, moonsCount: 2, massValue: 6.41, massExponent: 23, description: "الكوكب الأحمر، تظهر تضاريسه الصخرية الجافة، فوهاته البركانية العملاقة، وأكسيد الحديد المميز لسطحه.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#f97316,#dc2626_40%,#7f1d1d_75%,#000_100%)]" },
  { id: "jupiter", englishName: "Jupiter", gravity: 24.79, density: 1.32, moonsCount: 95, massValue: 1.89, massExponent: 27, description: "عملاق الغاز، تظهر بوضوح أحزمته الغازية المتوازية، عواصفه الدوامية، والبقعة الحمراء العظيمة الشهيرة.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#f59e0b,#d97706_30%,#78350f_60%,#451a03_85%,#000_100%)]" },
  { id: "venus", englishName: "Venus", gravity: 8.87, density: 5.24, moonsCount: 0, massValue: 4.86, massExponent: 24, description: "توأم الأرض المحترق، يغطيه غلاف جوي سميك جداً من السحب الكبريتية الصفراء والبراكين الثائرة.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#fef08a,#eab308_40%,#854d0e_75%,#000_100%)]" },
  { id: "saturn", englishName: "Saturn", gravity: 10.44, density: 0.68, moonsCount: 146, massValue: 5.68, massExponent: 26, description: "جواهر النظام الشمسي، كوكب غازي ذهبي محاط بنظام حلقات جليدية وصخرية براقة تدور حوله.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#fef3c7,#fcd34d_30%,#b45309_70%,#000_100%)]" },
  { id: "uranus", englishName: "Uranus", gravity: 8.69, density: 1.27, moonsCount: 28, massValue: 8.68, massExponent: 25, description: "العملاق الثلجي، كوكب هادئ يتميز بلونه الأزرق القريب من الخضرة بسبب غاز الميثان المتجمد في جوه.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#a5f3fc,#22d3ee_45%,#0369a1_80%,#000_100%)]" },
  { id: "neptune", englishName: "Neptune", gravity: 11.15, density: 1.63, moonsCount: 16, massValue: 1.02, massExponent: 26, description: "الكوكب الأزرق الداكن المعزول، تضربه أقوى رياح في النظام الشمسي وتظهر عليه بقع العواصف المظلمة.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#3b82f6,#1d4ed8_40%,#1e3a8a_75%,#000_100%)]" },
  { id: "mercury", englishName: "Mercury", gravity: 3.7, density: 5.42, moonsCount: 0, massValue: 3.3, massExponent: 23, description: "الكوكب الأقرب للشمس، سطحه مليء بالفوهات والمنحدرات الصخرية الشبيهة بالقمر نتيجة غياب الغلاف الجوي.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#e4e4e7,#a1a1aa_40%,#4b5563_75%,#000_100%)]" },
  { id: "moon", englishName: "Moon", gravity: 1.62, density: 3.34, moonsCount: 0, massValue: 7.34, massExponent: 22, description: "تابع الأرض الحليق، تظهر ماريا القمر (السهول البازلتية الداكنة) المتباينة مع المرتفعات الفاتحة المليئة بالفوهات.", gradientClass: "bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d4d4d8_35%,#52525b_70%,#18181b_95%,#000_100%)]" }
];

export default function Planets() {
  const [planets] = useState<Planet[]>(SOLAR_SYSTEM_DATA);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(SOLAR_SYSTEM_DATA[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // إضافة تأثير تفاعلي مذهل: تحريك الكوكب والملامح والظلال بناءً على حركة الماوس أو اللمس يحاكي الواقع تماماً
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 30;
    const y = (clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-2 select-none" onMouseMove={handleMouseMove}>
      {/* القائمة الجانبية */}
      <GlassCard className="w-full lg:w-1/4 flex flex-col gap-3 max-h-[150px] lg:max-h-[600px] overflow-y-auto p-4 hide-scrollbar">
        <h2 className="text-lg font-black uppercase tracking-widest text-space-cyan mb-2 border-b border-white/10 pb-2 hidden lg:block">
          Planets explorer
        </h2>
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet)}
              className={`p-2.5 text-xs font-bold uppercase tracking-wider text-left rounded-xl transition-all border shrink-0 lg:shrink ${
                selectedPlanet.id === planet.id 
                  ? "bg-space-purple/20 border-space-cyan text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]" 
                  : "bg-black/20 border-white/5 text-gray-400 hover:border-space-purple/50"
              }`}
            >
              {planet.englishName}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* منطقة العرض الاحترافية الواقعية */}
      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        <GlassCard className="flex-1 relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] bg-black/60 border border-white/10 rounded-[2rem] p-6">
          
          {/* تفاصيل النص */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none max-w-sm">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              {selectedPlanet.englishName}
            </h1>
            <p className="text-space-cyan uppercase tracking-widest text-xs mt-1 font-bold mb-2">
              Photorealistic Mapping
            </p>
            <p className="text-xs text-gray-400 font-medium leading-relaxed hidden md:block text-right dir-rtl">
              {selectedPlanet.description}
            </p>
          </div>

          {/* محاكاة كروية للملامح مدهشة ومستقرة 100% */}
          <div className="relative w-full h-full flex items-center justify-center py-8">
            
            {/* النجوم الخلفية المتحركة */}
            <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:40px_40px] opacity-20 animate-[pulse_3s_infinite]" />
            
            {/* الحلقات المضيئة لزحل كمثال مميز جداً واقعي */}
            {selectedPlanet.id === "saturn" && (
              <div className="absolute w-72 h-12 border-[8px] border-amber-500/30 rounded-full rotate-[-15deg] blur-[2px] z-20 pointer-events-none animate-[pulse_4s_infinite]" />
            )}

            {/* الكرة المجسمة مع التضاريس والملامح الفاخرة */}
            <div 
              style={{
                transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                transition: "transform 0.1s ease-out"
              }}
              className={`w-48 h-48 md:w-56 md:h-56 rounded-full relative overflow-hidden transition-all duration-500 shadow-[20px_20px_50px_rgba(0,0,0,0.9)_inset,-10px_-10px_30px_rgba(255,255,255,0.1)_inset] border border-white/5 ${selectedPlanet.gradientClass}`}
            >
              {/* تأثير السحب والغلاف الجوي المتحرك بشكل واقعي */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-thread.png')] opacity-20 animate-[spin_60s_linear_infinite]" />
              
              {/* تدرج الظل الكوني لإعطاء الملمس الكروي الحقيقي ثلاثي الأبعاد */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15)_0%,transparent_50%,rgba(0,0,0,0.85)_100%)]" />
            </div>
          </div>
        </GlassCard>

        {/* كروت البيانات السريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard className="p-4 text-center flex flex-col justify-center">
            <span className="text-[9px] uppercase text-gray-400 tracking-widest block mb-1 font-bold">Gravity</span>
            <span className="text-base font-bold text-white">{selectedPlanet.gravity} m/s²</span>
          </GlassCard>
          <GlassCard className="p-4 text-center flex flex-col justify-center">
            <span className="text-[9px] uppercase text-gray-400 tracking-widest block mb-1 font-bold">Density</span>
            <span className="text-base font-bold text-white">{selectedPlanet.density} g/cm³</span>
          </GlassCard>
          <GlassCard className="p-4 text-center flex flex-col justify-center">
            <span className="text-[9px] uppercase text-gray-400 tracking-widest block mb-1 font-bold">Mass Value</span>
            <span className="text-base font-bold text-white">{selectedPlanet.massValue} x 10^{selectedPlanet.massExponent} kg</span>
          </GlassCard>
          <GlassCard className="p-4 text-center flex flex-col justify-center">
            <span className="text-[9px] uppercase text-gray-400 tracking-widest block mb-1 font-bold">Moons</span>
            <span className="text-base font-bold text-space-purple">{selectedPlanet.moonsCount}</span>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}