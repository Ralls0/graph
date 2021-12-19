import { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import { ItemsGroup } from "./Components/ItemsGroup";
import { Connection } from "./Components/Connection";

const colorHex = ["#7CD855", "#FDC921", "#5FFDFF", "#F453A3", "#B43C29"];

function generateTargets() {
  let number = 5;
  let result = [];
  while (result.length < number) {
    result.push({
      id: "pod-" + result.length,
      x: window.innerWidth * Math.random(),
      y: window.innerHeight * Math.random(),
    });
  }
  return result;
}

// function to generate arrows between targets
function generateConnectors(targets) {
  let number = 10;
  let result = [];
  while (result.length < number) {
    let from = "pod-" + Math.floor(Math.random() * targets.length);
    let to = "pod-" + Math.floor(Math.random() * targets.length);
    if (from === to) {
      continue;
    }
    result.push({
      id: "connector-" + result.length,
      from: from,
      to: to,
      points: getConnectorPoints(
        targets.filter((t) => {
          return t.id === from;
        })[0],
        targets.filter((t) => {
          return t.id === to;
        })[0]
      ),
    });
  }
  return result;
}

function getConnectorPoints(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle),
  ];
}

function getConnectorPointsTo(from, x, y) {
  const dx = x - from.x;
  const dy = y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    x + -radius * Math.cos(angle),
    y + radius * Math.sin(angle),
  ];
}

function getConnectorPointsFrom(x, y, to) {
  const dx = to.x - x;
  const dy = to.y - y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    x + -radius * Math.cos(angle + Math.PI),
    y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle),
  ];
}

function App() {
  const [targets, setTargets] = useState([]);
  const [connectors, setConnectors] = useState([]);

  useEffect(() => {
    setTargets(generateTargets());
  }, []);

  useEffect(() => {
    if (targets.length > 0 && connectors.length === 0) {
      setConnectors(generateConnectors(targets));
    }
  }, [targets]);

  function handleOnDragEnd(id, x, y) {
    let newConnector = [];
    let newTargets = [];
    targets.forEach((t) => {
      if (t.id === id) {
        newTargets.push({
          id: id,
          x: x,
          y: y,
        });
      } else {
        newTargets.push(t);
      }
    });
    connectors.forEach((c) => {
      if (c.from === id) {
        newConnector.push({
          id: c.id,
          from: c.from,
          to: c.to,
          points: getConnectorPointsFrom(
            x,
            y,
            targets.filter((t) => {
              return t.id === c.to;
            })[0]
          ),
        });
      } else if (c.to === id) {
        newConnector.push({
          id: c.id,
          from: c.from,
          to: c.to,
          points: getConnectorPointsTo(
            targets.filter((t) => {
              return t.id === c.from;
            })[0],
            x,
            y
          ),
        });
      } else {
        newConnector.push(c);
      }
    });
    setTargets(newTargets);
    setConnectors(newConnector);
  }

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {targets &&
            targets.map((t) => (
              <ItemsGroup
                key={t.id}
                id={t.id}
                name={t.id}
                x={t.x}
                y={t.y}
                color={colorHex[Math.floor(Math.random() * (4 + 1))]}
                handleOnDragEnd={handleOnDragEnd}
              />
            ))}
          {connectors &&
            connectors.map((c) => (
              <Connection
                key={c.id}
                id={c.id}
                points={c.points}
                strokeWidth={Math.round(Math.random() * 10)}
              />
            ))}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
