import React from "react";
import { CardGridProps } from "@/types/props";

const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = "auto",
  gap = "md",
  className = "",
  minCardWidth = "280px",
  maxCardWidth,
}) => {
  // Gap size mapping
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  // Column configuration mapping
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
  };

  // Build grid template columns for auto mode
  const getGridStyle = () => {
    if (columns === "auto") {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}, ${maxCardWidth || "1fr"}))`,
      };
    }
    return {};
  };

  return (
    <div
      className={`grid ${columns === "auto" ? "" : columnClasses[columns]} ${gapClasses[gap]} ${className}`}
      style={columns === "auto" ? getGridStyle() : undefined}
    >
      {children}
    </div>
  );
};

export default CardGrid;
