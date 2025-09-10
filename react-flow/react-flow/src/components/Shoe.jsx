import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Shoe({ color, material, style }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const getMaterialProps = () => {
    switch (material) {
      case "rubber":
        return { roughness: 0.9, metalness: 0.1 };
      case "canvas":
        return { roughness: 0.7, metalness: 0, color: "#F5F5DC" };
      default: // leather
        return { roughness: 0.3, metalness: 0.1 };
    }
  };

  const getSoleColor = () => {
    return material === "rubber" ? "#2C3E50" : "#34495E";
  };

  // Render different shoe styles
  const renderSneakers = () => (
    <group>
      {/* Sole */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.2, 0.2, 2.8]} />
        <meshStandardMaterial color={getSoleColor()} roughness={0.8} />
      </mesh>

      {/* Midsole */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.1, 0.1, 2.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>

      {/* Upper */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.0, 0.6, 2.4]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      {/* Toe cap */}
      <mesh position={[0, 0.3, -1.0]}>
        <boxGeometry args={[1.0, 0.2, 0.4]} />
        <meshStandardMaterial
          color={material === "canvas" ? color : "#FFFFFF"}
          roughness={0.5}
        />
      </mesh>

      {/* Heel counter */}
      <mesh position={[0, 0.3, 1.0]}>
        <boxGeometry args={[0.8, 0.3, 0.3]} />
        <meshStandardMaterial
          color={material === "canvas" ? color : "#FFFFFF"}
          roughness={0.5}
        />
      </mesh>

      {/* Laces */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.05, 1.2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>

      {/* Tongue */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.15, 0.4]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      {/* Logo */}
      <mesh position={[0.5, 0.4, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#FF0000" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );

  const renderBoots = () => (
    <group>
      {/* Sole */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.0, 0.3, 2.5]} />
        <meshStandardMaterial color={getSoleColor()} roughness={0.9} />
      </mesh>

      {/* Boot shaft */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.2, 16]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      {/* Boot upper */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.9, 0.8, 2.2]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      {/* Heel */}
      <mesh position={[0, -0.3, 1.1]}>
        <boxGeometry args={[0.7, 0.2, 0.3]} />
        <meshStandardMaterial color={getSoleColor()} roughness={0.9} />
      </mesh>

      {/* Lace hooks */}
      {[-0.3, 0, 0.3].map((yPos, index) => (
        <mesh
          key={index}
          position={[0.45, yPos + 0.6, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.05, 0.02, 8, 12]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );

  const renderSandals = () => (
    <group>
      {/* Sole */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.0, 0.1, 2.8]} />
        <meshStandardMaterial color={getSoleColor()} roughness={0.7} />
      </mesh>

      {/* Footbed */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.9, 0.08, 2.6]} />
        <meshStandardMaterial color="#DEB887" roughness={0.6} />
      </mesh>

      {/* Straps */}
      <mesh position={[0, 0.1, -0.5]}>
        <boxGeometry args={[0.7, 0.05, 0.1]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      <mesh position={[0, 0.1, 0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.1]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      {/* Toe post */}
      <mesh position={[0, 0.15, -1.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color={color} {...getMaterialProps()} />
      </mesh>

      {/* Buckle */}
      <mesh position={[0.3, 0.1, 0.7]}>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef}>
      {/* Ambient lighting helper */}
      <pointLight position={[2, 2, 2]} intensity={0.5} />

      {style === "boots" && renderBoots()}
      {style === "sandals" && renderSandals()}
      {style === "sneakers" && renderSneakers()}

      {/* Ground plane for reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#444" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}
