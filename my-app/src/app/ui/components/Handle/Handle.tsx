import { Handle, Position, useNodeId, useStore } from "@xyflow/react";
import "./Handle.css";
import React from "react";
import { Connection } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

interface HandleCustomProps {
  position: Position;
  type: "source" | "target";
}

export const HandleCustom: React.FC<HandleCustomProps> = ({
  position,
  type,
}) => {
  const nodeId = useNodeId();
  const edges = useStore((state) => state.edges);

  const validateConnection = (connection: Connection) => {
    const { source, target } = connection;

    if (source === target) return false;
    return true;
  };

  const isConnected = edges.some((e) =>
    type === "source" ? e.source === nodeId : e.target === nodeId
  );

  let dynamicClass = "handle";
  if (isConnected) {
    dynamicClass += " handle_connected";
  } else {
    dynamicClass += type === "source" ? " handle_output" : " handle_input";
  }

  return (
    <Handle
      isValidConnection={(connection) => validateConnection(connection)}
      className={dynamicClass}
      type={type}
      position={position}
    />
  );
};
