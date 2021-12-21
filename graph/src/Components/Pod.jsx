import React, { useEffect, useState } from "react";
import { Group, Text } from "react-konva";
import { Item } from "./Item";

export function Pod(props) {
  const { handleOnDrag, drag } = props;
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const [fill, setFill] = useState(props.fill || "#2F3339");
  const [radius, setRadius] = useState(props.radius || 20);
  const [opacity, setOpacity] = useState(props.opacity || 1);
  const [stroke, setStroke] = useState(props.stroke || "#2F3339");
  const [strokeItem, setStrokeItem] = useState(props.strokeItem || fill);
  const [strokeWidth, setStrokeWidth] = useState(props.strokeWidth || 5);
  const [ip, setIp] = useState(props.ip || "0.0.0.0");
  const [visible, setVisible] = useState(false);

  function handleMouse(newVisibility) {
    setVisible(newVisibility);
    setStrokeItem(newVisibility ? stroke : fill);
  }

  return (
    <>
      <Group
        id={id}
        x={x}
        y={y}
        draggable={drag}
        onDragMove={(e) => {
          handleOnDrag(
            id,
            e.target.getStage().findOne("#" + id).attrs.x,
            e.target.getStage().findOne("#" + id).attrs.y
          );
        }}
        onDragEnd={(e) => {
          handleOnDrag(
            id,
            e.target.getStage().findOne("#" + id).attrs.x,
            e.target.getStage().findOne("#" + id).attrs.y
          );
        }}
      >
        <Item
          x={0}
          y={0}
          fill={fill}
          radius={radius}
          opacity={opacity}
          stroke={strokeItem}
          strokeWidth={strokeWidth}
          handleMouse={handleMouse}
        />
        <Text
          x={-(name.length * 4)}
          y={-radius - 20}
          text={name}
          fontSize={18}
          align="center"
          visible={props.strokeItem ? visible : true}
        />
        <Text
          x={-(name.length * 4)}
          y={-radius - 38}
          text={ip}
          fontSize={18}
          align="center"
          visible={visible}
        />
      </Group>
    </>
  );
}
