import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, useTexture } from "@react-three/drei";
import { GlassCard } from "../components/GlassCard";

interface Planet {
  id: string;
  englishName: string;
  gravity: number;
  density: number;
  moonsCount: number;
  massValue: number;
  massExponent: number;
  textureUrl: string;
}

const SOLAR_SYSTEM_DATA: Planet[] = [
  { id: "earth", englishName: "Earth", gravity: 9.8, density: 5.51, moonsCount: 1, massValue: 5.97, massExponent: 24, textureUrl: "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg" },
  { id: "mars", englishName: "Mars", gravity: 3.71, density: 3.93, moonsCount: 2, massValue: 6.41, massExponent: 23, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg" },
  { id: "jupiter", englishName: "Jupiter", gravity: 24.79, density: 1.32, moonsCount: 95, massValue: 1.89, massExponent: 27, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/jupiter_1k_color.jpg" },
  { id: "venus", englishName: "Venus", gravity: 8.87, density: 5.24, moonsCount: 0, massValue: 4.86, massExponent: 24, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/venus_surface.jpg" },
  { id: "saturn", englishName: "Saturn", gravity: 10.44, density: 0.68, moonsCount: 146, massValue: 5.68, massExponent: 26, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn.png" },
  { id: "uranus", englishName: "Uranus", gravity: 8.69, density: 1.27, moonsCount: 28, massValue: 8.68, massExponent: 25, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/uranus.png" },
  { id: "neptune", englishName: "Neptune", gravity: 11.15, density: 1.63, moonsCount: 16, massValue: 1.02, massExponent: 26, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/neptune.png" },
  { id: "mercury", englishName: "Mercury", gravity: 3.7, density: 5.42, moonsCount: 0, massValue: 3.3, massExponent: 23, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mercury.png" },
  { id: "moon", englishName: "Moon", gravity: 1.62, density: 3.34, moonsCount: 0, massValue: 7.34, massExponent: 22, textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1k_color.jpg" }
];

const PlanetMesh = ({ textureUrl }: { textureUrl: string }) => {
  const texture = useTexture(textureUrl);
  return (
    <Sphere args={[1.25, 64, 64]}>
      <meshBasicMaterial map={texture} />
    </Sphere>
  );
};

export default function Planets() {
  const [planets] = useState<Planet[]>(SOLAR_SYSTEM_DATA);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(SOLAR_SYSTEM_DATA[0]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-2 select-none">
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

      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        <GlassCard className="flex-1 relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] bg-black/60 border border-white/10 rounded-[2rem] p-0">
          <div className="absolute top-6 left-6 z-30 pointer-events-none">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              {selectedPlanet.englishName}
            </h1>
            <p className="text-space-cyan uppercase tracking-widest text-xs mt-1 font-bold">
              True Satellite Imagery
            </p>
          </div>

          <div style={{ width: "100%", height: "450px", position: "relative" }}>
            <Canvas camera={{ position: [0, 0, 3.0], fov: 45 }}>
              <Stars radius={100} depth={50} count={2500} factor={4} saturation={0.5} fade speed={1} />
              <Suspense fallback={null}>
                <PlanetMesh textureUrl={selectedPlanet.textureUrl} />
              </Suspense>
              <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
          </div>
        </GlassCard>

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