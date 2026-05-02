import { cn } from "@/lib/utils";

/**
 * BackgroundGlow provides a subtle, radial yellow glow effect
 * designed to add depth and warmth to the underlying layout.
 */
export const BackgroundGlow = ({ 
  children, 
  className 
}: { 
  children?: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={cn("min-h-screen w-full relative", className)}>
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #FFF991 0%, transparent 70%)
          `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      {children}
    </div>
  );
};

export default BackgroundGlow;
