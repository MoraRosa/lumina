interface ScallopedCircleEdgeProps {
  color?: string;
  position?: "top" | "bottom";
  className?: string;
}

export const ScallopedCircleEdge = ({ 
  color = "hsl(var(--pastel-green))", 
  position = "bottom",
  className = ""
}: ScallopedCircleEdgeProps) => {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden leading-none ${className}`}
      style={{ 
        transform: isTop ? "rotate(180deg)" : "none",
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-20 md:h-24"
      >
        <path
          d="M0,40 Q60,0 120,40 Q180,0 240,40 Q300,0 360,40 Q420,0 480,40 Q540,0 600,40 Q660,0 720,40 Q780,0 840,40 Q900,0 960,40 Q1020,0 1080,40 Q1140,0 1200,40 L1200,120 L0,120 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
