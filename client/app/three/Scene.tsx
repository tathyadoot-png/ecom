"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Cylinder, Cone, MeshWobbleMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FountainPen() {
  const penRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    penRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    penRef.current.rotation.y = t * 0.3;
    penRef.current.position.y = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <group ref={penRef} rotation={[0.5, 0, 0.5]}>
      {/* Pen Body - Midnight Blue */}
      <Cylinder args={[0.12, 0.12, 3, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#001F3F" roughness={0.1} metalness={0.8} />
      </Cylinder>

      {/* Pen Cap Detail - Chrome/Silver */}
      <Cylinder args={[0.13, 0.13, 1, 32]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#C0C0C0" roughness={0} metalness={1} />
      </Cylinder>

      {/* Pen Tip (The Nib) - Gold/Silver */}
      <group position={[0, -1.8, 0]} rotation={[Math.PI, 0, 0]}>
        <Cone args={[0.12, 0.5, 4]}>
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} />
        </Cone>
      </group>

      {/* Clip Detail */}
      <mesh position={[0.15, 1.2, 0]}>
        <boxGeometry args={[0.05, 0.8, 0.1]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-[60vh] lg:h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#001F3F" intensity={2} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <FountainPen />
        </Float>

        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.2} 
          scale={10} 
          blur={3} 
          far={4.5} 
        />
      </Canvas>
    </div>
  );
}