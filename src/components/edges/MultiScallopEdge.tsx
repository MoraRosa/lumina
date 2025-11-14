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
          d="M0,30 C50,10 100,30 150,30 C200,30 250,10 300,30 C350,50 400,30 450,30 C500,30 550,50 600,30 C650,10 700,30 750,30 C800,30 850,10 900,30 C950,50 1000,30 1050,30 C1100,30 1150,50 1200,30 L1200,120 L0,120 Z"
          style={{ fill: color }}
          opacity="0.5"
        />
        <path
          d="M0,50 C75,30 150,50 225,50 C300,50 375,30 450,50 C525,70 600,50 675,50 C750,50 825,70 900,50 C975,30 1050,50 1125,50 C1150,50 1175,70 1200,50 L1200,120 L0,120 Z"
          style={{ fill: color }}
          opacity="0.7"
        />
        <path
          d="M0,70 C100,50 200,70 300,70 C400,70 500,50 600,70 C700,90 800,70 900,70 C1000,70 1100,90 1200,70 L1200,120 L0,120 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
