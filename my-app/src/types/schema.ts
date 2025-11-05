import { Node, Edge, Viewport } from "@xyflow/react";

// types/schema.ts
export interface FlowSchema {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  temperature: number;
}

export interface SavedSchema {
  id: string;
  name: string;
  schema: FlowSchema;
  createdAt: string;
  updatedAt: string;
}
