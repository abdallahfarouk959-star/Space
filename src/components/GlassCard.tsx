import { cn } from "../lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col text-gray-100 relative",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
