import { cn } from "@/lib/utils";

/**
 * DiagonalGrid provides a sophisticated background layer with 
 * a fine, semi-transparent diagonal grid pattern, 
 * perfect for neobrutalist and high-tech designs.
 */
export const DiagonalGrid = ({ 
  children, 
  className 
}: { 
  children?: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={cn("min-h-screen w-full relative text-gray-900", className)}>
      {/* Diagonal Grid with Light */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {children}
    </div>
  );
};

export default DiagonalGrid;
