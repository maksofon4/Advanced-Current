import { Handle, Position, useNodeId, useStore } from "@xyflow/react";
import { useRef } from "react";
import "./Handle.css";

export function HandleCustom({ position, type }) {
  const nodeId = useNodeId();
  const edges = useStore((state) => state.edges);

  const isConnected = edges.some((e) =>
    type === "source" ? e.source === nodeId : e.target === nodeId
  );

  return (
    <Handle
      className={isConnected ? "handle_connected" : "handle"}
      type={type}
      position={position}
    />
  );
}
