import { Handle, Position } from "@xyflow/react";
import { Canvas } from "@react-three/fiber";
import { Shoe } from "./Shoe";
import { useFlowContext } from "../context/FlowContext";
import { OrbitControls } from "@react-three/drei";

export function ProductPreview({ data, id }) {
  const { updateProductConfig } = useFlowContext();

  return (
    <div className="w-96 h-120 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300 p-6 shadow-lg">
      <div className="text-center font-bold text-lg mb-4 text-gray-800">
        🎯 3D Product Preview
      </div>

      {/* Input handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="color-in"
        style={{ top: 60 }}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="material-in"
        style={{ top: 100 }}
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="style-in"
        style={{ top: 140 }}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />

      {/* 3D Preview Container */}
      <div className="h-80 w-full bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg overflow-hidden shadow-inner">
        <Canvas
          camera={{
            position: [4, 2, 4],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          shadows
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#0077FF" />

          <Shoe
            color={data.color}
            material={data.material}
            style={data.style}
          />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Current configuration */}
      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">
          Current Configuration
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <span className="w-20 text-gray-600">Color:</span>
            <div
              className="w-4 h-4 rounded-full border border-gray-300 ml-2"
              style={{ backgroundColor: data.color }}
            />
            <span className="ml-2 text-gray-800">
              {data.color.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-gray-600">Material:</span>
            <span className="ml-2 capitalize text-gray-800">
              {data.material}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-gray-600">Style:</span>
            <span className="ml-2 capitalize text-gray-800">{data.style}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
