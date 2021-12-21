import React from "react";
import { Text, RegularPolygon, Layer } from "react-konva";

const fillColor = "#2F3339";

export function Item(props) {
  const { x, y, fill, radius, opacity, stroke, strokeWidth, handleMouse } = props;
  return (
    <>
      <RegularPolygon
        x={x}
        y={y}
        fill={fill}
        radius={radius}
        sides={6}
        rotation={0}
        opacity={opacity}
        shadowColor={stroke}
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={2}
        shadowOffsetY={2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        onMouseMove={() => {
          handleMouse(true);
        }}
        onMouseOut={
          ()=>{
            handleMouse(false);
          }
        }
      />
    </>
  );
}
