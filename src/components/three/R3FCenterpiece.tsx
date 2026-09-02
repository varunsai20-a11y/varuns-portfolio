"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Interactive3DSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Continuous rotation
    meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    // Mouse tracking rotation tilt
    meshRef.current.rotation.z = (state.pointer.x * Math.PI) * 0.15;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.3}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#ffcc00"
          emissive="#ff0080"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.9}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function R3FCenterpiece() {
  return (
    <div className="w-24 h-24 sm:w-32 sm:h-32 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00ffcc" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#ff0080" />
        <Interactive3DSculpture />
      </Canvas>
    </div>
  );
}
