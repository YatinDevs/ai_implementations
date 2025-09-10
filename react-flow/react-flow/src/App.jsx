import React from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowContext } from "./context/FlowContext";
import { ProductPreview } from "./components/ProductPreview";
import { ColorSelector } from "./components/ColorSelector";
import { MaterialSelector } from "./components/MaterialSelector";
import { StyleSelector } from "./components/StyleSelector";

const nodeTypes = {
  ProductPreview: ProductPreview,
  ColorSelector: ColorSelector,
  MaterialSelector: MaterialSelector,
  StyleSelector: StyleSelector,
};

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowContext();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
