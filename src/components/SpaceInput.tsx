import { forwardRef, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export interface SpaceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const SpaceInput = forwardRef<HTMLInputElement, SpaceInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    // Generate a unique ID if one isn't provided, ensuring accessible label linking
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full flex flex-col items-start gap-1.5">
        <label
          htmlFor={inputId}
          className="text-[9px] uppercase font-bold text-gray-500 tracking-[0.2em] ml-1"
        >
          {label}
        </label>
        
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs outline-none transition-all duration-300 text-gray-100 placeholder:text-gray-600",
            error
              ? "border-red-500 focus:border-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              : "focus:border-space-cyan focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:border-white/20",
            className
          )}
          {...props}
        />

        {/* Animated Error Message Container */}
        <div className="min-h-[20px] ml-1 overflow-hidden">
          <AnimatePresence>
            {error && (
              <motion.p
                id={errorId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] text-red-500 uppercase font-bold tracking-wider m-0"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);
SpaceInput.displayName = "SpaceInput";
