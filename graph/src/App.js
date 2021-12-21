import { useEffect, useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import { Pod } from "./Components/Pod";
import { Service } from "./Components/Service";
import { Connection } from "./Components/Connection";
import { getConnectorPointsTo, getConnectorPointsFrom } from "./utils";
import API from "./API";

const nunRand = Math.floor(Math.random() * (5 + 1));
const colorHex = ["#7CD855", "#FDC921", "#5FFDFF", "#F453A3", "#B43C29"];
const imgs = [
  "img/yuri-1.png",
  "img/yuri-2.png",
  "img/yuri-3.png",
  "img/yuri-4.png",
  "img/yuri-5.png",
];
const fill = "#2F3339";
const podRadius = 20;
const opacity = 1;
const stroke = colorHex[nunRand];
const strokeWidth = 5;

function App() {
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState([]);
  const [connectors, setConnectors] = useState([]);

  useEffect(() => {
    const getPods = async () => {
      const p = await API.getAllPods();
      setPods(p);
    };
    const getServices = async () => {
      const s = await API.getAllServices();
      setServices(s);
    };

    getPods().catch((err) => {
      console.error(err);
    });
    getServices().catch((err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (pods.length > 0 && services.length > 0 && connectors.length === 0) {
      const getConnectors = async () => {
        const c = await API.getAllConnections(pods, services);
        setConnectors(c);
      };

      getConnectors().catch((err) => {
        console.error(err);
      });
    }
  }, [pods.length, services.length]);

  useEffect(() => {
    console.log("[i] Connessioni: ", connectors);
  }, [connectors]);

  function handleOnDrag(id, rx, ry) {
    setPods((oldPods) => {
      return oldPods.map((ex) => {
        if (ex.id === id) return { ...ex, x: rx, y: ry };
        else return ex;
      });
    });
    setServices((oldServices) => {
      return oldServices.map((ex) => {
        if (ex.id === id) return { ...ex, x: rx, y: ry };
        else return ex;
      });
    });
    setConnectors((oldConnectors) => {
      return oldConnectors.map((ex) => {
        if (ex.from === id) {
          return {
            ...ex,
            points: getConnectorPointsFrom(
              rx,
              ry,
              ex.to.includes("pod")
                ? pods.filter((p) => {
                    return p.id === ex.to;
                  })[0]
                : services.filter((s) => {
                    return s.id === ex.to;
                  })[0]
            ),
          };
        } else if (ex.to === id) {
          return {
            ...ex,
            points: getConnectorPointsTo(
              ex.from.includes("pod")
                ? pods.filter((p) => {
                    return p.id === ex.from;
                  })[0]
                : services.filter((s) => {
                    return s.id === ex.from;
                  })[0],
              rx,
              ry
            ),
          };
        } else return ex;
      });
    });
  }

  return (
    <>
      <img
        src={imgs[nunRand]}
        alt="img"
        width={window.innerHeight / 3}
        height={window.innerHeight / 3}
        style={{
          position: "absolute",
          top: "30px",
          left: window.innerWidth / 2.5 + "px",
        }}
      />
      <div
        id="container"
        style={{
          position: "absolute",
          top: window.innerWidth / 6 + "px",
        }}
      ></div>
      <Stage
        container="container"
        width={window.innerWidth}
        height={(window.innerHeight / 3) * 2}
      >
        <Layer>
          {pods &&
            pods
              .filter((p) => {
                return !p.parentServiceId;
              })
              .map((p) => (
                <Pod
                  key={p.id}
                  id={p.id}
                  name={p.podName}
                  x={p.x}
                  y={p.y}
                  fill={fill}
                  radius={podRadius}
                  opacity={opacity}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  ip={p.ip}
                  drag={true}
                  handleOnDrag={handleOnDrag}
                />
              ))}
          {services &&
            services.map((s) => (
              <Service
                key={s.id}
                id={s.id}
                name={s.serviceName}
                x={s.x}
                y={s.y}
                fill={fill}
                radius={podRadius}
                opacity={opacity}
                stroke={stroke}
                strokeWidth={strokeWidth}
                ip={s.ip}
                eip={s.eip}
                handleOnDrag={handleOnDrag}
                pods={pods.filter((p) => {
                  return p.parentServiceId === s.id;
                })}
              />
            ))}
          {connectors &&
            connectors.map((c) => (
              <Connection
                key={c.id}
                id={c.id}
                points={c.points}
                stroke={fill}
                strokeWidth={2}
                opacity={opacity}
              />
            ))}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
