import React, { useState } from "react";
import { Group, Text, Ring } from "react-konva";
import { Pod } from "./Pod";

export function Service(props) {
  const { handleOnDrag } = props;
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const [pods, setPods] = useState(props.pods);

  const [fill, setFill] = useState(props.fill || "#2F3339");
  const [radius, setRadius] = useState(props.radius || 20);
  const [opacity, setOpacity] = useState(props.opacity || 1);
  const [stroke, setStroke] = useState(props.stroke || "#2F3339");
  const [strokeItem, setStrokeItem] = useState(fill);
  const [strokeWidth, setStrokeWidth] = useState(props.strokeWidth || 5);

  const [ip, setIp] = useState(props.ip || "0.0.0.0");
  const [eip, setEip] = useState(props.ip || "<none>");
  const [visible, setVisible] = useState(false);
  let i = 0;
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
        draggable
        onMouseMove={() => {
          handleMouse(true);
        }}
        onMouseOut={() => {
          handleMouse(false);
        }}
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
        {/* <Ring
          x={35}
          y={5}
          innerRadius={pods.length * 30}
          outerRadius={pods.length * 30 + 5}
          fill={strokeItem}
          stroke="#ffffff"
        /> */}
        {pods.map((p) => (
          <Pod
            key={p.id}
            id={p.id}
            name={p.podName}
            x={(i++ * radius) % (radius * 6)} // FIXME
            y={Math.round((i++ * radius) / (radius * 3))}
            fill={fill}
            radius={radius}
            opacity={opacity}
            stroke={stroke}
            strokeItem={strokeItem}
            strokeWidth={strokeWidth}
            ip={p.ip}
            drag={false}
            handleOnDrag={handleOnDrag}
          />
        ))}
        <Text
          x={-(name.length * 4)}
          y={pods.length * radius - 30}
          text={name}
          fontSize={18}
          align="center"
          visible={true}
        />
        <Text
          x={-(name.length * 4)}
          y={pods.length * radius - 12}
          text={ip}
          fontSize={18}
          align="center"
          visible={visible}
        />
        <Text
          x={-(name.length * 4)}
          y={pods.length * radius + 6}
          text={eip}
          fontSize={18}
          align="center"
          visible={visible}
        />
      </Group>
    </>
  );
}
