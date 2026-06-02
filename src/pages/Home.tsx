import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { NeonButton } from "../components/NeonButton";
import { GlassCard } from "../components/GlassCard";
import { Rocket, Satellite, Camera, Calendar, ShieldCheck, Map } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
  };

  const features = [
    {
      icon: <Satellite className="w-8 h-8 text-space-cyan" />,
      title: "Real-time Telemetry",
      description: "Direct feed from NASA's deep space networks providing up-to-the-minute mission status.",
      accent: "cyan"
    },
    {
      icon: <Camera className="w-8 h-8 text-space-purple" />,
      title: "High-Res Archives",
      description: "Explore gigapixels of Martian surface photography captured by active rovers.",
      accent: "purple"
    },
    {
      icon: <Rocket className="w-8 h-8 text-space-cyan" />,
      title: "Virtual Tours",
      description: "Experience Olympus Mons and Valles Marineris through guided holographic projections.",
      accent: "cyan"
    },
    {
      icon: <Calendar className="w-8 h-8 text-space-purple" />,
      title: "Expedition Planning",
      description: "Schedule your orbital deployment with our advanced departure tracking system.",
      accent: "purple"
    },
    {
      icon: <Map className="w-8 h-8 text-space-cyan" />,
      title: "Topographic Mapping",
      description: "Navigate the diverse terrain of the Red Planet using our 3D integrated maps.",
      accent: "cyan"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-space-purple" />,
      title: "Secure Comm Links",
      description: "All visitor data is quantum-encrypted for maximum security across the solar system.",
      accent: "purple"
    }
  ];

  return (
    <div className="flex flex-col gap-12 pb-12 w-full">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-gradient-to-br from-space-card to-space-bg border border-space-purple/30 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col justify-center items-start relative overflow-hidden min-h-[60vh]"
      >
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-space-purple rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-space-cyan rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-space-cyan mb-4 block">
              Gateway to the stars
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
              Limitless <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan to-space-purple">Exploration</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-sm md:max-w-md mb-10 font-light leading-relaxed">
              Embark on a digital odyssey through the cosmos. Interface directly with NASA telemetry, track active rovers, and book virtual orbital tours across the solar system.
            </p>
            <div className="flex flex-wrap gap-4">
              <NeonButton variant="primary" onClick={() => navigate('/explore')}>
                Explore Mars
              </NeonButton>
              <NeonButton variant="secondary" onClick={() => navigate('/book')}>
                Book Tour
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="w-full">
        <div className="mb-10 pl-2 border-l-4 border-space-purple">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
            Platform Capabilities
          </h2>
          <p className="text-gray-400 text-sm font-light mt-2 tracking-wide">
            Powered by direct interplanetary data links.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={featureVariants}>
              <GlassCard className={`h-full group transition-colors duration-500 ${feature.accent === 'cyan' ? 'hover:border-space-cyan/50' : 'hover:border-space-purple/50'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${feature.accent === 'cyan' ? 'bg-space-cyan/10' : 'bg-space-purple/10'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2 uppercase">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
