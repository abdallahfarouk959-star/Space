import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../lib/utils';

export interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300",
          variant === 'primary' &&
            "bg-space-cyan text-[#050209] shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] hover:bg-[#33ddff]",
          variant === 'secondary' &&
            "border-2 border-space-purple text-white shadow-[0_0_15px_rgba(125,0,255,0.15)] hover:bg-space-purple/20 hover:shadow-[0_0_25px_rgba(125,0,255,0.5)] hover:border-space-purple",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
NeonButton.displayName = "NeonButton";
