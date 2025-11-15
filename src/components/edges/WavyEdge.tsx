interface WavyEdgeProps {
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
  color?: string;
}

export const WavyEdge = ({
  position = "left",
  className = "",
  color = "currentColor",
}: WavyEdgeProps) => {
  const getPath = () => {
    switch (position) {
      case "left":
        return "M0,0 Q10,50 0,100 T0,200 T0,300 T0,400 T0,500 T0,600 T0,700 T0,800 T0,900 T0,1000 L0,0 Z";
      case "right":
        return "M0,0 Q-10,50 0,100 T0,200 T0,300 T0,400 T0,500 T0,600 T0,700 T0,800 T0,900 T0,1000 L0,0 Z";
      case "top":
        return "M0,0 Q50,10 100,0 T200,0 T300,0 T400,0 T500,0 T600,0 T700,0 T800,0 T900,0 T1000,0 L0,0 Z";
      case "bottom":
        return "M0,0 Q50,-10 100,0 T200,0 T300,0 T400,0 T500,0 T600,0 T700,0 T800,0 T900,0 T1000,0 L0,0 Z";
      default:
        return "";
    }
  };

  const getViewBox = () => {
    switch (position) {
      case "left":
      case "right":
        return "0 0 10 1000";
      case "top":
      case "bottom":
        return "0 0 1000 10";
      default:
        return "0 0 10 1000";
    }
  };

  const getStyles = () => {
    switch (position) {
      case "left":
        return {
          position: "absolute" as const,
          left: 0,
          top: 0,
          height: "100%",
          width: "10px",
        };
      case "right":
        return {
          position: "absolute" as const,
          right: 0,
          top: 0,
          height: "100%",
          width: "10px",
        };
      case "top":
        return {
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100%",
          height: "10px",
        };
      case "bottom":
        return {
          position: "absolute" as const,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "10px",
        };
      default:
        return {};
    }
  };

  return (
    <svg
      className={className}
      style={getStyles()}
      viewBox={getViewBox()}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={getPath()} fill={color} />
    </svg>
  );
};

