import React, { useEffect, useState } from "react";
import { Line } from "react-konva";

export function Connection(props) {
  const { strokeWidth } = props;
  console.log(strokeWidth);
  const [id, setId] = useState(props.id);
  const [points, setPoints] = useState(props.points);
  useEffect(() => {
    setPoints(props.points);
  }, [props]);
  return (
    <>
      <Line
        id={id}
        points={points}
        strokeWidth={strokeWidth}
        stroke="#2F3339"
        pointerLength={10}
        pointerWidth={12}
        opacity={1.1 - strokeWidth / 10}
      />
    </>
  );
}
