import PodObj from "./Components/models/pods";
import ServiceObj from "./Components/models/services";
import ConnectionObj from "./Components/models/connections";
import { getConnectorPoints } from "./utils";

async function getAllPods() {
  let podJson = [
    {
      id: "pod-bastion-operator-56dd44cb8c-2wqcj",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "bastion-operator-56dd44cb8c-2wqcj",
      ip: "172.16.100.99",
      parentServiceId: "service-bastion-operator",
    },
    {
      id: "pod-bastion-operator-56dd44c000-2wqcj",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "bastion-operator-56dd44c000-2wqcj",
      ip: "172.16.100.230",
      parentServiceId: "service-bastion-operator",
    },
    {
      id: "pod-bastion-operator-56dd44c111-2wqcj",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "bastion-operator-56dd44c111-2wqcj",
      ip: "172.16.101.2",
      parentServiceId: "service-bastion-operator",
    },
    {
      id: "pod-frontend-app-65f6447b95-lqgfq",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "frontend-app-65f6447b95-lqgfq",
      ip: "172.16.101.22",
      parentServiceId: "service-frontend-app",
    },
    {
      id: "pod-frontend-app-1001047b95-lqgfq",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "frontend-app-1001047b95-lqgfq",
      ip: "172.16.101.25",
      parentServiceId: "service-frontend-app",
    },
    {
      id: "pod-frontend-app-90f6447b95-lqgfq",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "frontend-app-90f6447b95-lqgfq",
      ip: "172.16.101.27",
      parentServiceId: "service-frontend-app",
    },
    {
      id: "pod-backend-app-90f6447b95-lqgfq",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "backend-app-90f6447b95-lqgfq",
      ip: "172.16.101.199",
      parentServiceId: "service-backend-app",
    },
    {
      id: "pod-backend-app-90f6447b95-fffff",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "backend-app-90f6447b95-fffff",
      ip: "172.16.101.149",
      parentServiceId: "service-backend-app",
    },
    {
      id: "pod-backend-app-90f6447b95-aaaaa",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "backend-app-90f6447b95-aaaaa",
      ip: "172.16.101.129",
      parentServiceId: "service-backend-app",
    },
    {
      id: "pod-image-list-88df45c968-wj2gc",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      podName: "image-list-88df45c968-wj2gc",
      ip: "172.16.101.207",
    },
  ];
  return podJson.map((pod) => PodObj.from(pod));
}

async function getAllServices() {
  let serviceJson = [
    {
      id: "service-bastion-operator",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      serviceName: "bastion-operator",
      ip: "10.105.36.80",
      eip: "130.192.220.200",
    },
    {
      id: "service-frontend-app",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      serviceName: "frontend-app",
      ip: "10.105.36.88",
      eip: "<none>",
    },
    {
      id: "service-backend-app",
      x: Math.floor(Math.random() * (window.innerWidth / 3) * 1.5),
      y: Math.floor((Math.random() * window.innerHeight) / 2.5),
      serviceName: "backend-app",
      ip: "10.105.36.98",
      eip: "<none>",
    },
  ];
  return serviceJson.map((service) => ServiceObj.from(service));
}

function getAllConnections(pods, services) {
  let connJson = [
    {
      id: "connector-1",
      points: getConnectorPoints(
        services.filter((s) => {
          return s.id === "service-bastion-operator";
        })[0],
        services.filter((s) => {
          return s.id === "service-frontend-app";
        })[0]
      ),
      from: "service-bastion-operator",
      to: "service-frontend-app",
    },
    {
      id: "connector-2",
      points: getConnectorPoints(
        services.filter((s) => {
          return s.id === "service-bastion-operator";
        })[0],
        services.filter((s) => {
          return s.id === "service-backend-app";
        })[0]
      ),
      from: "service-bastion-operator",
      to: "service-backend-app",
    },
    {
      id: "connector-3",
      points: getConnectorPoints(
        services.filter((s) => {
          return s.id === "service-frontend-app";
        })[0],
        services.filter((s) => {
          return s.id === "service-backend-app";
        })[0]
      ),
      from: "service-frontend-app",
      to: "service-backend-app",
    },
    {
      id: "connector-4",
      points: getConnectorPoints(
        services.filter((s) => {
          return s.id === "service-backend-app";
        })[0],
        pods.filter((p) => {
          return p.id === "pod-image-list-88df45c968-wj2gc";
        })[0]
      ),
      from: "service-backend-app",
      to: "pod-image-list-88df45c968-wj2gc",
    },
  ];
  return connJson.map((conn) => ConnectionObj.from(conn));
}

const API = {
  getAllPods,
  getAllServices,
  getAllConnections,
};

export default API;
