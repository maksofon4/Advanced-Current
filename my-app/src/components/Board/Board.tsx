"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  BackgroundVariant,
  useReactFlow,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ResistorComponent from "../../electronicComponents/Resistor/resistor";
import { PowerSourceComponent } from "../../electronicComponents/PowerSource/PowerSource";
import { CustomEdge } from "../Edge/Edge";
import { ConnectionLineType } from "@xyflow/react";
import ComponentList from "../componentsList/list";
import Thermometer from "../Thermometer/Thermometer";

const initialNodes: any[] = [];

const initialEdges: any[] = [];

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const createNodeTypes = (
  temperature?: number,
  onDeleteNode?: (nodeId: string) => void
) => ({
  resistor: (props: any) => (
    <ResistorComponent
      {...props}
      data={{ ...props.data, temperature: temperature ?? 25 }}
      onDelete={onDeleteNode ? () => onDeleteNode(props.id) : undefined}
    />
  ),
  powerSource: (props: any) => (
    <PowerSourceComponent
      {...props}
      data={{ ...props.data, temperature: temperature ?? 25 }}
      onDelete={onDeleteNode ? () => onDeleteNode(props.id) : undefined}
    />
  ),
});

let nodeTypes = createNodeTypes();

const Board: React.FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [temperature, setTemperature] = useState<number>(25);

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

  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));

    // Also remove any edges connected to this node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, []);

  useEffect(() => {
    nodeTypes = createNodeTypes(temperature, onDeleteNode);
  }, [temperature, onDeleteNode]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <ComponentList />

      <ReactFlow
        style={{ background: "#fff" }}
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
        <Thermometer onTemperatureChange={(value) => setTemperature(value)} />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
};

export default Board;
