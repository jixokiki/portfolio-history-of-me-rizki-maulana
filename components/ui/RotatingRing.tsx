"use client";

/**
 * RotatingRing3D — a slowly spinning gold ring rendered with react-three-fiber.
 * Ported from the Jual Emas Indonesia remake (components/ui/RotatingRing.tsx).
 * Fits the gold/parchment identity this portfolio already borrows from that
 * project — used here as a decorative accent rather than a product shot.
 */
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";
import type { Group } from "three";

interface GoldRingModelProps {
  /** Path to the .obj file, served from /public/models/ */
  src?: string;
  /** Rotation speed in radians per second */
  speed?: number;
  running?: boolean;
  onReady?: () => void;
}

function RingMesh({ src = "/models/gold-ring.obj", speed = 0.5, running = true, onReady }: GoldRingModelProps) {
  const group = useRef<Group>(null);
  const obj = useLoader(OBJLoader, src);

  // The .obj ships with no material, so every mesh is overridden with a gold
  // MeshStandardMaterial that can actually catch light from the Environment,
  // then centred + rescaled since the source units don't line up with the camera.
  const ring = useMemo(() => {
    const cloned = obj.clone();
    cloned.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#d4af37",
          metalness: 1,
          roughness: 0.28,
          envMapIntensity: 1.4,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    cloned.scale.setScalar(2.2 / maxDim);

    return cloned;
  }, [obj]);

  useEffect(() => {
    onReady?.();
  }, [ring, onReady]);

  useFrame((_, delta) => {
    if (group.current && running) {
      group.current.rotation.y += delta * speed;
    }
  });

  return <primitive ref={group} object={ring} />;
}

export default function RotatingRing3D(props: GoldRingModelProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={2.2} color="#fff3da" />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#ffd98f" />
      <Suspense fallback={null}>
        <RingMesh {...props} />
        {/* Environment matters for a metalness:1 material — without it the ring looks dead/dark. */}
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
