"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── GLSL Shaders ─── */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Subtle noise for film grain
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;

    // Sample depth map for displacement
    float depth = texture2D(uDepthMap, uv).r;

    // Parallax displacement based on mouse & scroll
    float strength = 0.035;
    vec2 displacement = vec2(
      (uMouse.x - 0.5) * strength * depth,
      (uMouse.y - 0.5) * strength * depth + uScroll * 0.02
    );

    vec2 distortedUv = uv + displacement;

    // Clamp to bounds
    distortedUv = clamp(distortedUv, 0.0, 1.0);

    // Sample the poster image
    vec4 color = texture2D(uImage, distortedUv);

    // GTA-style color grading: slight warm tint + contrast boost
    color.r = pow(color.r, 0.95);
    color.g = pow(color.g, 1.0);
    color.b = pow(color.b, 1.05);

    // Vignette
    float vignette = smoothstep(0.0, 0.7, length(uv - 0.5));
    color.rgb *= 1.0 - vignette * 0.6;

    // Film grain
    float grain = hash(uv * uResolution + uTime) * 0.06;
    color.rgb += grain - 0.03;

    // Subtle chromatic aberration at edges
    float caStrength = 0.002;
    vec2 caDir = (uv - 0.5) * caStrength;
    float r = texture2D(uImage, distortedUv + caDir).r;
    float b = texture2D(uImage, distortedUv - caDir).b;
    color.r = mix(color.r, r, 0.5);
    color.b = mix(color.b, b, 0.5);

    // Slight desaturation for GTA vibe
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(gray), color.rgb, 0.85);

    // Warm color overlay
    color.rgb += vec3(0.03, 0.01, -0.02);

    gl_FragColor = color;
  }
`;

/* ─── Full-screen Quad with Shader Material ─── */
function DepthQuad() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uImage: { value: null as THREE.Texture | null },
      uDepthMap: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  // Load textures
  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load("/api/assets/gta-me-poster.jpg?v=new", (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      uniforms.uImage.value = tex;
    });

    loader.load("/api/assets/gta-me-depth.jpg?v=new", (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      uniforms.uDepthMap.value = tex;
    });
  }, [uniforms]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = window.scrollY / (maxScroll || 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    // Smooth mouse interpolation
    mouseRef.current.x += (targetMouse.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouse.current.y - mouseRef.current.y) * 0.05;

    uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    uniforms.uScroll.value = scrollRef.current;
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ─── Exported Canvas Component ─── */
export default function BackgroundDepthCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false }}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        style={{ width: "100%", height: "100%" }}
        dpr={Math.min(window?.devicePixelRatio || 1, 1.5)}
      >
        <DepthQuad />
      </Canvas>
    </div>
  );
}
