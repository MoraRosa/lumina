interface ZigzagEdgeProps {
  color?: string;
  position?: "top" | "bottom";
  className?: string;
}

export const ZigzagEdge = ({ 
  color = "hsl(var(--pastel-purple))", 
  position = "bottom",
  className = ""
}: ZigzagEdgeProps) => {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden leading-none ${className}`}
      style={{ 
        transform: isTop ? "rotate(180deg)" : "none",
        height: "60px"
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <path
          d="M0,0 L100,80 L200,0 L300,80 L400,0 L500,80 L600,0 L700,80 L800,0 L900,80 L1000,0 L1100,80 L1200,0 L1200,120 L0,120 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
