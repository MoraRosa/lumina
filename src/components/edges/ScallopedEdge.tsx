interface ScallopedEdgeProps {
  color?: string;
  position?: "top" | "bottom";
  className?: string;
}

export const ScallopedEdge = ({ 
  color = "hsl(var(--pastel-green))", 
  position = "bottom",
  className = ""
}: ScallopedEdgeProps) => {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden leading-none ${className}`}
      style={{ 
        transform: isTop ? "none" : "rotate(180deg)",
        height: "80px"
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <path
          d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,120 L0,120 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
};
