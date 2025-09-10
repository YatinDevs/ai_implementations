import { useEdgesState, useNodesState, addEdge } from "@xyflow/react";
import { createContext, useContext, useCallback } from "react";

const FlowContext = createContext();

const initialNodes = [
  {
    id: "color-node",
    type: "ColorSelector",
    position: { x: 100, y: 50 },
    data: { label: "Color" },
  },
  {
    id: "material-node",
    type: "MaterialSelector",
    position: { x: 100, y: 200 },
    data: { label: "Material" },
  },
  {
    id: "style-node",
    type: "StyleSelector",
    position: { x: 100, y: 350 },
    data: { label: "Style" },
  },
  {
    id: "preview-node",
    type: "ProductPreview",
    position: { x: 400, y: 200 },
    data: {
      color: "#ff6b35",
      material: "leather",
      style: "sneakers",
    },
  },
];

const initialEdges = [
  {
    id: "color-preview",
    source: "color-node",
    sourceHandle: "color-out",
    target: "preview-node",
    targetHandle: "color-in",
  },
  {
    id: "material-preview",
    source: "material-node",
    sourceHandle: "material-out",
    target: "preview-node",
    targetHandle: "material-in",
  },
  {
    id: "style-preview",
    source: "style-node",
    sourceHandle: "style-out",
    target: "preview-node",
    targetHandle: "style-in",
  },
];

export function FlowProvider({ children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateProductConfig = useCallback(
    (nodeId, updates) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const value = {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateProductConfig,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlowContext() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlowContext must be used within a FlowProvider");
  }
  return context;
}
