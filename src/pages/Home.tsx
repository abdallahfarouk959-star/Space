import React, { Component, ReactNode, Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NeonButton } from "../components/NeonButton";
import { GlassCard } from "../components/GlassCard";
import { Globe, Image as ImageIcon, Calendar, ArrowRight, Activity, Satellite, Star, Zap, Send } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

// 🛡️ جدار الحماية: بيلقط أي إيرور في كارت الشاشة ويمنع الموقع يقع
class WebGLBoundary extends Component<{children: ReactNode, fallback: ReactNode}, {hasError: boolean}> {
  constructor(props: any) { 
    super(props); 
    this.state = { hasError: false }; 
  }
  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }
  render() { 
    if (this.state.hasError) return this.props.fallback;
    return this.props.children; 
  }
}

// 🌍 مكون النظام الشمسي المصغر
const MiniSolarSystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // تحميل الـ 8 صور اللي في فولدر public/textures
  const textures = useTexture([
    "/textures/mercury.jpg",
    "/textures/venus_surface.jpg",
    "/textures/earth_daymap.jpg",
    "/textures/mars.jpg",
    "/textures/jupiter.jpg",
    "/textures/saturn.jpg",
    "/textures/uranus.jpg",
    "/textures/neptune.jpg"
  ]);

  // مصفوفة البيانات لكل الكواكب
  const planetsData = [
    { map: textures[0], size: 0.2, distance: 2.5, angle: 0, yOffset: 0 },
    { map: textures[1], size: 0.3, distance: 3.5, angle: 1, yOffset: 0.2 },
    { map: textures[2], size: 0.4, distance: 4.8, angle: 2, yOffset: -0.2 },
    { map: textures[3], size: 0.25, distance: 6.0, angle: 3.5, yOffset: 0.4 },
    { map: textures[4], size: 0.8, distance: 8.5, angle: 5, yOffset: -0.5 },
    { map: textures[5], size: 0.65, distance: 11.0, angle: 0.5, yOffset: 0.3 },
    { map: textures[6], size: 0.5, distance: 13.5, angle: 2.5, yOffset: -0.4 },
    { map: textures[7], size: 0.45, distance: 16.0, angle: 4.2, yOffset: 0.1 },
  ];

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* الشمس */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#fcd34d" />
        <pointLight intensity={3} distance={50} color="#ffffff" />
      </Sphere>

      {/* رسم كل الكواكب بـ map بسيط */}
      {planetsData.map((p, i) => (
        <group key={i} rotation={[0, p.angle, 0]}>
          
          {/* إضافة المدار (Ring) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[p.distance - 0.02, p.distance + 0.02, 64]} />
            <meshBasicMaterial color="#ffffff" opacity={0.15} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* الكوكب */}
          <Sphere args={[p.size, 32, 32]} position={[p.distance, p.yOffset, 0]}>
            <meshStandardMaterial map={p.map} roughness={0.6} />
          </Sphere>
          
        </group>
      ))}
    </group>
  );
};

export default function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <div className="flex flex-col gap-16 pb-12 w-full">
      
      {/* 1. Hero Section - مقسم لعمودين */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-gradient-to-br from-space-card to-space-bg border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden min-h-[70vh] flex items-center"
      >
        {/* إضاءات الخلفية */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-space-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-space-cyan/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* التقسيم لعمودين (كلام يمين - 3D شمال) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full z-10">
          
          {/* العمود الأول: النصوص */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-space-cyan mb-6 w-max">
              Cosmic Explorer Terminal
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[1.1] tracking-tighter mb-6 text-white drop-shadow-lg">
              Discover The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan to-space-purple">Universe</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl mb-10 leading-relaxed drop-shadow-md">
              Welcome to your personal space command center. Interact with photorealistic 3D planets, browse high-res NASA galleries, and schedule your next orbital adventure.
            </p>
            <div className="flex flex-wrap gap-4">
              <NeonButton variant="primary" onClick={() => navigate('/planets')}>
                Launch 3D Planets
              </NeonButton>
              <NeonButton variant="secondary" onClick={() => navigate('/explore')}>
                View Gallery
              </NeonButton>
            </div>
          </div>

          {/* العمود التاني: الـ 3D Canvas محمي بـ WebGLBoundary */}
          <div className="w-full h-[400px] lg:h-[500px] relative order-1 lg:order-2 flex items-center justify-center">
            <WebGLBoundary 
              fallback={
                <div className="w-full h-full rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-space-purple/20 via-space-cyan/5 to-transparent flex flex-col items-center justify-center text-center p-6 border border-white/5">
                  <Globe className="w-12 h-12 text-space-cyan mb-4 opacity-50" />
                  <span className="text-space-cyan/70 text-xs font-bold uppercase tracking-widest border border-space-cyan/20 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                    [3D Graphics Disabled - Hardware Limitation]
                  </span>
                </div>
              }
            >
              <Suspense 
                fallback={
                  <Html center>
                    <span className="text-space-cyan font-bold uppercase tracking-widest text-xs animate-pulse whitespace-nowrap bg-black/50 px-4 py-2 rounded-full border border-space-cyan/30">
                      Loading 3D Solar System...
                    </span>
                  </Html>
                }
              >
                <Canvas camera={{ position: [0, 4, 14], fov: 45 }} className="w-full h-full">
                  <ambientLight intensity={0.2} />
                  <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
                  <MiniSolarSystem />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </Suspense>
            </WebGLBoundary>
          </div>

        </div>
      </motion.div>

      {/* باقي الأقسام زي ما هي */}
      <div className="w-full">
        <div className="mb-8 pl-2 border-l-4 border-space-cyan">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">System Navigation</h2>
          <p className="text-gray-400 text-sm mt-1">Select your operational module</p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="h-full">
            <GlassCard className="h-full flex flex-col justify-between group cursor-pointer hover:border-space-cyan/40 transition-colors" onClick={() => navigate('/planets')}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-space-cyan/10 flex items-center justify-center mb-6 text-space-cyan group-hover:scale-110 transition-transform"><Globe size={24} /></div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Interactive Planets</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Rotate, zoom, and explore highly detailed 3D models of our solar system.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-space-cyan text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all"><span>Explore Now</span> <ArrowRight size={16} /></div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <GlassCard className="h-full flex flex-col justify-between group cursor-pointer hover:border-space-purple/40 transition-colors" onClick={() => navigate('/explore')}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-space-purple/10 flex items-center justify-center mb-6 text-space-purple group-hover:scale-110 transition-transform"><ImageIcon size={24} /></div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Cosmic Gallery</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Browse a curated collection of deep-space photography and planetary surfaces.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-space-purple text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all"><span>View Images</span> <ArrowRight size={16} /></div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <GlassCard className="h-full flex flex-col justify-between group cursor-pointer hover:border-white/30 transition-colors" onClick={() => navigate('/book')}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-gray-300 group-hover:scale-110 transition-transform"><Calendar size={24} /></div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Book a Tour</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Reserve your spot for upcoming virtual expeditions and prepare for liftoff.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-gray-300 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all"><span>Schedule</span> <ArrowRight size={16} /></div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="text-center p-6 hover:bg-white/5 transition-colors"><Activity className="w-6 h-6 text-space-cyan mx-auto mb-3" /><h4 className="text-3xl font-black text-white mb-1">99.9%</h4><p className="text-[10px] uppercase tracking-widest text-gray-400">Uptime Link</p></GlassCard>
        <GlassCard className="text-center p-6 hover:bg-white/5 transition-colors"><Satellite className="w-6 h-6 text-space-purple mx-auto mb-3" /><h4 className="text-3xl font-black text-white mb-1">4</h4><p className="text-[10px] uppercase tracking-widest text-gray-400">Active Rovers</p></GlassCard>
        <GlassCard className="text-center p-6 hover:bg-white/5 transition-colors"><Star className="w-6 h-6 text-yellow-500 mx-auto mb-3" /><h4 className="text-3xl font-black text-white mb-1">5.5k+</h4><p className="text-[10px] uppercase tracking-widest text-gray-400">Exoplanets</p></GlassCard>
        <GlassCard className="text-center p-6 hover:bg-white/5 transition-colors"><Zap className="w-6 h-6 text-green-400 mx-auto mb-3" /><h4 className="text-3xl font-black text-white mb-1">12ms</h4><p className="text-[10px] uppercase tracking-widest text-gray-400">Ping to ISS</p></GlassCard>
      </motion.div>

      <div className="w-full">
        <div className="mb-8 pl-2 border-l-4 border-space-purple">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Trending Expeditions</h2>
          <p className="text-gray-400 text-sm mt-1">Highly requested orbital routes this week</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-0 overflow-hidden group cursor-pointer border-white/10" onClick={() => navigate('/book')}>
            <div className="h-48 w-full relative overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
              <img src="/textures/mars.jpg" alt="Mars Surface" className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" />
              <div className="absolute bottom-4 left-6 z-20"><span className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] uppercase tracking-widest rounded-md mb-2 inline-block font-bold">Hot Destination</span><h3 className="text-2xl font-black text-white uppercase tracking-wider">Mars Olympus</h3></div>
            </div>
            <div className="p-6 flex justify-between items-center bg-black/40">
              <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Duration: 14 Days</p><p className="text-sm font-bold text-space-purple">Orbit & Surface</p></div>
              <button className="w-10 h-10 rounded-full bg-space-purple/20 flex items-center justify-center text-space-purple group-hover:bg-space-purple group-hover:text-white transition-colors"><ArrowRight size={18} /></button>
            </div>
          </GlassCard>
          <GlassCard className="p-0 overflow-hidden group cursor-pointer border-white/10" onClick={() => navigate('/book')}>
            <div className="h-48 w-full relative overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
              <img src="/textures/moon.jpg" alt="Lunar Surface" className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" />
              <div className="absolute bottom-4 left-6 z-20"><span className="px-2 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 text-[10px] uppercase tracking-widest rounded-md mb-2 inline-block font-bold">Classic Route</span><h3 className="text-2xl font-black text-white uppercase tracking-wider">Lunar Base Alpha</h3></div>
            </div>
            <div className="p-6 flex justify-between items-center bg-black/40">
              <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Duration: 3 Days</p><p className="text-sm font-bold text-gray-300">Low Orbit Pass</p></div>
              <button className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors"><ArrowRight size={18} /></button>
            </div>
          </GlassCard>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full mt-8">
        <GlassCard className="bg-gradient-to-r from-space-purple/10 to-space-cyan/10 border-space-cyan/20 p-8 md:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          <Send className="w-10 h-10 text-space-cyan mb-4" />
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">Join The Cosmic Vanguard</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed">Subscribe to our secure telemetry feed. Get notified about new exoplanet discoveries, orbital tour discounts, and platform updates.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto z-10">
            <input type="email" placeholder="Enter your comm-link (email)..." className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-space-cyan transition-colors" />
            <NeonButton variant="primary" onClick={() => {}}>Initialize</NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}