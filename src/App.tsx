/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer"; // 👈 استيراد الفوتر هنا
import { motion } from "motion/react";

const Home = lazy(() => import("./pages/Home"));
const ExploreMars = lazy(() => import("./pages/ExploreMars"));
const BookTour = lazy(() => import("./pages/BookTour"));
const Planets = lazy(() => import("./pages/Planets")); 

const CosmicLoader = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-6">
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-24 h-24 rounded-full border-2 border-space-purple"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-12 h-12 rounded-full bg-space-purple shadow-[0_0_30px_rgba(125,0,255,0.8)]"
      />
    </div>
    <p className="text-space-purple font-bold uppercase tracking-[0.2em] text-xs animate-pulse">
      Establishing Uplink...
    </p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen p-6 overflow-x-hidden relative">
        <Navigation />
        <main className="flex-1 max-w-7xl w-full mx-auto mt-8 flex flex-col">
          <Suspense fallback={<CosmicLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExploreMars />} />
              <Route path="/planets" element={<Planets />} /> {/* مسار صفحة الكواكب الـ 3D */}
              <Route path="/book" element={<BookTour />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* 👈 الفوتر اتحط هنا عشان يظهر في كل الصفحات تحت خالص */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}