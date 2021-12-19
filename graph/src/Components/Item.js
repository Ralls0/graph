import React from "react";
import { RegularPolygon } from "react-konva";

export function Item(props) {
  const { x, y, color } = props;
  return (
    <>
      <RegularPolygon
        x={x}
        y={y}
        fill="#2F3339"
        radius={40}
        sides={6}
        rotation={0}
        opacity={1}
        shadowColor={color}
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={2}
        shadowOffsetY={2}
        stroke={color}
        strokeWidth={8}
      />
    </>
  );
}
