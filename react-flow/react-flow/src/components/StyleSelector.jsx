import { Handle, Position } from "@xyflow/react";
import { useFlowContext } from "../context/FlowContext";

const styles = [
  { id: "sneakers", name: "Sneakers", emoji: "👟" },
  { id: "boots", name: "Boots", emoji: "👢" },
  { id: "sandals", name: "Sandals", emoji: "👡" },
];

export function StyleSelector({ data, id }) {
  const { updateProductConfig } = useFlowContext();

  const handleStyleChange = (style) => {
    updateProductConfig("preview-node", { style });
  };

  return (
    <div className="w-48 bg-white rounded-lg border-2 border-gray-300 p-3">
      <div className="font-bold mb-2">{data.label}</div>

      <div className="space-y-2">
        {styles.map((style) => (
          <button
            key={style.id}
            className="w-full p-2 rounded border border-gray-300 text-left hover:bg-gray-100"
            onClick={() => handleStyleChange(style.id)}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">{style.emoji}</span>
              {style.name}
            </div>
          </button>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="style-out"
        style={{ top: 50 }}
      />
    </div>
  );
}
