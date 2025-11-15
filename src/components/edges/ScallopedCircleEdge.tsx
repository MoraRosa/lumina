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
          d="M0,40 Q30,0 60,40 Q90,0 120,40 Q150,0 180,40 Q210,0 240,40 Q270,0 300,40 Q330,0 360,40 Q390,0 420,40 Q450,0 480,40 Q510,0 540,40 Q570,0 600,40 Q630,0 660,40 Q690,0 720,40 Q750,0 780,40 Q810,0 840,40 Q870,0 900,40 Q930,0 960,40 Q990,0 1020,40 Q1050,0 1080,40 Q1110,0 1140,40 Q1170,0 1200,40 L1200,120 L0,120 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
