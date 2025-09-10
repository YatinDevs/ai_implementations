import { Handle, Position } from "@xyflow/react";
import { useFlowContext } from "../context/FlowContext";

const colors = ["#ff6b35", "#2a9d8f", "#e63946", "#457b9d", "#fca311"];

export function ColorSelector({ data, id }) {
  const { updateProductConfig } = useFlowContext();

  const handleColorChange = (color) => {
    // Update the preview node when color changes
    updateProductConfig("preview-node", { color });
  };

  return (
    <div className="w-48 bg-white rounded-lg border-2 border-gray-300 p-3">
      <div className="font-bold mb-2">{data.label}</div>

      <div className="grid grid-cols-3 gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
            title={color}
          />
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="color-out"
        style={{ top: 30 }}
      />
    </div>
  );
}
