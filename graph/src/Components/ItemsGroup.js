import React, { useEffect, useState } from "react";
import { Group, Text } from "react-konva";
import { Item } from "./Item";

export function ItemsGroup(props) {
  const { handleOnDragEnd } = props;
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const [color, setColor] = useState(props.color);
  return (
    <>
      <Group
        id={id}
        x={x}
        y={y}
        draggable
        onDragEnd={(e) => {
          console.log(e.target.getStage());
          handleOnDragEnd(
            id,
            e.target.getStage().findOne("#" + id).attrs.x,
            e.target.getStage().findOne("#" + id).attrs.y
          );
        }}
      >
        <Item x={0} y={0} color={color} />
        <Text
          x={-(name.length * 4)}
          y={50}
          text={name}
          fontSize={18}
          align="center"
        />
      </Group>
    </>
  );
}
