import React, { useEffect, useState } from "react";
import { Line } from "react-konva";

export function Connection(props) {
  const [id, setId] = useState(props.id);
  const [points, setPoints] = useState(props.points);
  const [stroke, setStroke] = useState(props.stroke);
  const [strokeWidth, setStrokeWidth] = useState(props.strokeWidth);
  const [opacity, setOpacity] = useState(props.opacity);
  useEffect(() => {
    setPoints(props.points);
  }, [props.points]);
  return (
    <>
      <Line
        id={id}
        points={points}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    </>
  );
}
