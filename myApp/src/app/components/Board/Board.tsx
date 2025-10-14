"use client";
import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  BackgroundVariant,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ResistorComponent from "../electronicComponents/Resistor/resistor";
import { CustomEdge } from "../Edge/Edge";
import { ConnectionLineType } from "@xyflow/react";
import ComponentList from "../componentsList/list";

const initialNodes = [];

const initialEdges = [];

const nodeTypes = {
  resistor: ResistorComponent,
};

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const Board: React.FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Component list drag and drop
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const nodeType = event.dataTransfer.getData("nodeType");
    if (!nodeType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    console.log(position);
    const newNode = {
      id: `${Date.now()}`,
      type: nodeType,
      position,
      data: { label: `${nodeType} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // Default React flow

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) =>
      setEdges((edgesSnapshot) =>
        addEdge(
          { ...params, type: "custom-edge", animated: true },
          edgesSnapshot
        )
      ),
    []
  );

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ComponentList />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineStyle={{ stroke: "blue", strokeWidth: 2 }}
        connectionLineType={ConnectionLineType.Straight}
      >
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
};

export default Board;
