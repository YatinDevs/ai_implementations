import { Handle, Position } from "@xyflow/react";
import { Canvas } from "@react-three/fiber";
import { Box } from "./Box"; // You'll need to create this component

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}

export function Output({ data }) {
  return (
    <div className="h-80 w-70 rounded-md bg-black overflow-hidden border border-solid border-black relative">
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="p"
        style={{ top: 60 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="r"
        style={{ top: 100 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="s"
        style={{ top: 140 }}
      />

      {/* Handle labels */}
      <div className="absolute left-2 top-12 text-white text-xs">p</div>
      <div className="absolute left-2 top-20 text-white text-xs">r</div>
      <div className="absolute left-2 top-28 text-white text-xs">s</div>

      {/* Header */}
      <div className="p-2 bg-orange-500 text-white">Output</div>

      {/* 3D Canvas */}
      <div className="h-64 w-full">
        <Scene />
      </div>
    </div>
  );
}
