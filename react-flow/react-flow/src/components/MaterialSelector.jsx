import { Handle, Position } from "@xyflow/react";
import { useFlowContext } from "../context/FlowContext";

const materials = [
  { id: "leather", name: "Leather", color: "#8B4513" },
  { id: "rubber", name: "Rubber", color: "#36454F" },
  { id: "canvas", name: "Canvas", color: "#F5F5DC" },
];

export function MaterialSelector({ data, id }) {
  const { updateProductConfig } = useFlowContext();

  const handleMaterialChange = (material) => {
    updateProductConfig("preview-node", { material });
  };

  return (
    <div className="w-48 bg-white rounded-lg border-2 border-gray-300 p-3">
      <div className="font-bold mb-2">{data.label}</div>

      <div className="space-y-2">
        {materials.map((material) => (
          <button
            key={material.id}
            className="w-full p-2 rounded border border-gray-300 text-left hover:bg-gray-100"
            onClick={() => handleMaterialChange(material.id)}
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                style={{ backgroundColor: material.color }}
              />
              {material.name}
            </div>
          </button>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="material-out"
        style={{ top: 50 }}
      />
    </div>
  );
}
