"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Interactive3DSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.z = (state.pointer.x * Math.PI) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = time * -0.4;
      ringRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <group>
        {/* Core Distorted Glowing Crystal Mesh */}
        <mesh ref={meshRef} scale={1.2}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#F5C518"
            emissive="#ff0066"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.9}
            distort={0.3}
            speed={2.2}
          />
        </mesh>

        {/* Outer Orbiting Cyber Ring Wireframe */}
        <mesh ref={ringRef} scale={1.6}>
          <torusGeometry args={[1, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function R3FCenterpiece() {
  return (
    <div className="w-24 h-24 sm:w-32 sm:h-32 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#00D4FF" />
        <pointLight position={[-5, -5, -5]} intensity={2.5} color="#F5C518" />
        <Interactive3DSculpture />
      </Canvas>
    </div>
  );
}
