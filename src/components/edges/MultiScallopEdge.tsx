interface MultiScallopEdgeProps {
  color?: string;
  position?: "top" | "bottom";
  className?: string;
}

export const MultiScallopEdge = ({ 
  color = "hsl(var(--pastel-pink))", 
  position = "bottom",
  className = ""
}: MultiScallopEdgeProps) => {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden leading-none ${className}`}
      style={{ 
        transform: isTop ? "rotate(180deg)" : "none",
        height: "100px"
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <path
          d="M0,30 Q50,0 100,30 T200,30 T300,30 T400,30 T500,30 T600,30 T700,30 T800,30 T900,30 T1000,30 T1100,30 T1200,30 L1200,120 L0,120 Z"
          style={{ fill: color }}
          opacity="0.5"
        />
        <path
          d="M0,50 Q75,20 150,50 T300,50 T450,50 T600,50 T750,50 T900,50 T1050,50 T1200,50 L1200,120 L0,120 Z"
          style={{ fill: color }}
          opacity="0.7"
        />
        <path
          d="M0,70 Q100,40 200,70 T400,70 T600,70 T800,70 T1000,70 T1200,70 L1200,120 L0,120 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
