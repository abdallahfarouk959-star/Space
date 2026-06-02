import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // تم التعديل إلى framer-motion لتجنب أخطاء الاستيراد
import { GlassCard } from "../components/GlassCard";

interface ApodPhoto {
  title: string;
  date: string;
  url: string;
  explanation: string;
  media_type: string;
}

export default function ExploreMars() {
  const [photos, setPhotos] = useState<ApodPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        
        // استدعاء المفتاح السري من ملف البيئة بأمان تام
        const apiKey = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
        
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?count=12&api_key=${apiKey}`
        );

        const imageOnlyData = response.data.filter((item: ApodPhoto) => item.media_type === 'image');

        setPhotos(imageOnlyData);
        setError("");
      } catch (err) {
        setError("Failed to establish telemetry link with NASA servers. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Space <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan to-space-purple">Gallery</span></h2>
          <p className="text-gray-400 text-sm font-light mt-3 tracking-wide">Breathtaking daily astronomy imagery directly from NASA.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative w-full border-t border-white/10 pt-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-h-[400px] flex flex-col items-center justify-center gap-6"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-24 h-24 rounded-full border-2 border-space-cyan"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-space-cyan shadow-[0_0_30px_rgba(0,212,255,0.8)]"
                />
              </div>
              <p className="text-space-cyan font-bold uppercase tracking-[0.2em] text-xs animate-pulse">
                Syncing Telemetry...
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard className="min-h-[300px] flex flex-col items-center justify-center border-red-500/50">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-red-400 font-bold tracking-widest text-sm text-center max-w-md">
                  {error}
                </p>
              </GlassCard>
            </motion.div>
          ) : photos.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard className="min-h-[300px] flex items-center justify-center border-l-2 border-l-space-cyan">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No telemetry data found.</p>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
            >
              {photos.map((photo, index) => (
                <motion.div key={index} variants={itemVariants} className="h-full">
                  <GlassCard className="p-0 overflow-hidden group h-full flex flex-col hover:border-space-cyan/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300">
                    <div className="relative h-48 md:h-56 overflow-hidden bg-black/50">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050209] via-transparent to-transparent opacity-90 pointer-events-none" />
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3 bg-white/5">
                      <h3 className="text-lg font-bold leading-tight text-white line-clamp-1" title={photo.title}>
                        {photo.title}
                      </h3>

                      <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed flex-1">
                        {photo.explanation}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                        <span className="text-[9px] text-space-cyan uppercase tracking-widest font-bold">
                          Capture Date
                        </span>
                        <span className="text-xs font-mono text-gray-300">
                          {photo.date}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}