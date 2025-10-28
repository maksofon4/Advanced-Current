import { useReactFlow } from "@xyflow/react";

export function useUpdateNodeData() {
  const { setNodes } = useReactFlow();

  return (id: string, newData: object) => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
      )
    );
  };
}
