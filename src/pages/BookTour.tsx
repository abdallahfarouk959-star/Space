import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, CheckCircle2 } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { SpaceInput } from "../components/SpaceInput";
import { NeonButton } from "../components/NeonButton";

export default function BookTour() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [tickets, setTickets] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation functions
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Real-time error evaluation
  const errors = {
    name: touched.name && formData.name.length < 3 ? "Name must be at least 3 characters" : "",
    email: touched.email && !validateEmail(formData.email) ? "Please enter a valid email format" : "",
    password: touched.password && formData.password.length < 6 ? "Password must be at least 6 characters" : "",
  };

  const isFormValid = 
    formData.name.length >= 3 && 
    validateEmail(formData.email) && 
    formData.password.length >= 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    
    if (isFormValid) {
      setIsSubmitted(true);
    }
  };

  const handleTicketChange = (action: 'increment' | 'decrement' | 'reset') => {
    if (action === 'increment') {
      setTickets(prev => prev + 1);
    } else if (action === 'decrement') {
      setTickets(prev => Math.max(1, prev - 1));
    } else if (action === 'reset') {
      setTickets(1);
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
          Virtual <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-purple to-space-cyan">Tour</span>
        </h2>
        <p className="text-gray-400 text-sm font-light mt-3 tracking-wide">
          Reserve your spot on our next orbital journey.
        </p>
      </div>

      <GlassCard className="min-h-[450px] border-l-2 border-l-space-cyan relative overflow-hidden flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="booking-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <SpaceInput
                label="Visitor Name"
                name="name"
                placeholder="Commander Shepard"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                error={errors.name}
              />
              
              <SpaceInput
                label="Comms Channel (Email)"
                name="email"
                type="email"
                placeholder="shepard@n7.earth"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                error={errors.email}
              />
              
              <SpaceInput
                label="Security Override (Password)"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                error={errors.password}
              />

              <div className="pt-2">
                <label className="text-[9px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-2 ml-1 block">
                  Passenger Count
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-2 flex-1">
                    <button 
                      type="button" 
                      onClick={() => handleTicketChange('decrement')}
                      className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center hover:bg-space-purple/30 text-white font-mono text-xl transition-colors cursor-pointer"
                      aria-label="Decrease tickets"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-xl text-space-cyan">
                      {tickets.toString().padStart(2, '0')}
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleTicketChange('increment')}
                      className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center hover:bg-space-cyan/30 text-white font-mono text-xl transition-colors cursor-pointer"
                      aria-label="Increase tickets"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleTicketChange('reset')}
                    className="px-5 py-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="pt-6">
                <NeonButton type="submit" variant="primary" className="w-full">
                  Confirm Reservation
                </NeonButton>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute inset-0 bg-space-cyan/20 rounded-full blur-xl" // Glow effect
                />
                <CheckCircle2 className="w-16 h-16 text-space-cyan relative z-10" />
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                Clearance Granted
              </h3>
              
              <p className="text-gray-400 text-sm mb-1 leading-relaxed">
                Welcome aboard, Commander <span className="text-white font-bold">{formData.name}</span>.
              </p>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Your manifest for <span className="text-space-cyan font-bold">{tickets}</span> passenger(s) is confirmed.
              </p>
              
              <NeonButton 
                variant="secondary" 
                onClick={() => {
                  setFormData({ name: "", email: "", password: "" });
                  setTouched({ name: false, email: false, password: false });
                  setTickets(1);
                  setIsSubmitted(false);
                }}
              >
                Plan Another Tour
              </NeonButton>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
