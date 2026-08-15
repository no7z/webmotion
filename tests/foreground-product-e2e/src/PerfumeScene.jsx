import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { experience } from "./experience.config";

const palette = ["#7752ff", "#2ec4b6", "#ff9f5a", "#d74f91", "#6d45ff"];

function sampleTrajectory(points, progress) {
  const last = points.length - 1;
  let index = points.findIndex((point) => point.progress >= progress);
  if (index <= 0) return { from: points[0], to: points[0], mix: 0 };
  if (index < 0) index = last;
  const from = points[index - 1];
  const to = points[index];
  const span = Math.max(to.progress - from.progress, 0.0001);
  const raw = THREE.MathUtils.clamp((progress - from.progress) / span, 0, 1);
  return { from, to, mix: raw * raw * (3 - 2 * raw) };
}

function Bottle({ reducedMotion }) {
  const group = useRef();
  const liquid = useRef();
  const glow = useRef();
  const fadeMaterials = useRef([]);
  const visibility = useRef(1);
  const colorStops = useMemo(() => palette.map((color) => new THREE.Color(color)), []);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetRotation = useMemo(() => new THREE.Euler(), []);

  useEffect(() => {
    const materials = [];
    group.current.traverse((object) => {
      if (!object.material) return;
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of objectMaterials) {
        material.transparent = true;
        material.userData.webmotionBaseOpacity = material.opacity;
        materials.push(material);
      }
    });
    fadeMaterials.current = materials;
  }, []);

  useFrame((state, delta) => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    let progress = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    if (reducedMotion) {
      const stops = [0, 0.24, 0.49, 0.72, 0.94, 1];
      progress = stops.reduce((best, stop) => Math.abs(stop - progress) < Math.abs(best - progress) ? stop : best, 0);
    }

    const mobile = window.innerWidth < 760;
    const trajectory = mobile ? experience.motion.mobile : experience.motion.desktop;
    const { from, to, mix } = sampleTrajectory(trajectory, progress);
    targetPosition.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], mix),
      THREE.MathUtils.lerp(from.position[1], to.position[1], mix),
      THREE.MathUtils.lerp(from.position[2], to.position[2], mix),
    );
    const pointerWeight = mobile || reducedMotion ? 0 : 0.08;
    targetPosition.x += state.pointer.x * pointerWeight;
    targetPosition.y += state.pointer.y * pointerWeight;
    targetRotation.set(
      THREE.MathUtils.lerp(from.rotation[0], to.rotation[0], mix),
      THREE.MathUtils.lerp(from.rotation[1], to.rotation[1], mix),
      THREE.MathUtils.lerp(from.rotation[2], to.rotation[2], mix),
    );
    const targetScale = THREE.MathUtils.lerp(from.scale, to.scale, mix);
    const damping = reducedMotion ? 18 : 5.5;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetPosition.x, damping, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetPosition.y, damping, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetPosition.z, damping, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotation.x, damping, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotation.y, damping, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotation.z, damping, delta);
    const scale = THREE.MathUtils.damp(group.current.scale.x, targetScale, damping, delta);
    group.current.scale.setScalar(scale);

    const fadeProgress = THREE.MathUtils.smoothstep(progress, 0.94, 1);
    const targetVisibility = Math.pow(1 - fadeProgress, 2.8);
    visibility.current = THREE.MathUtils.damp(visibility.current, targetVisibility, reducedMotion ? 12 : 7, delta);
    group.current.visible = visibility.current > 0.008;
    for (const material of fadeMaterials.current) {
      material.opacity = material.userData.webmotionBaseOpacity * visibility.current;
      material.depthWrite = visibility.current > 0.18;
    }

    const colorProgress = Math.min(progress * (colorStops.length - 1), colorStops.length - 1.001);
    const colorIndex = Math.floor(colorProgress);
    const colorMix = colorProgress - colorIndex;
    liquid.current.color.lerpColors(colorStops[colorIndex], colorStops[colorIndex + 1], colorMix);
    glow.current.color.copy(liquid.current.color);
    glow.current.intensity = (2.2 + Math.sin(progress * Math.PI * 4) * 0.35) * visibility.current;
  });

  return (
    <group ref={group} scale={0.92}>
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={reducedMotion ? 0 : 0.04} floatIntensity={reducedMotion ? 0 : 0.08}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.82, 0.94, 2.55, 64, 1]} />
          <meshPhysicalMaterial
            color="#d8d4ff"
            roughness={0.08}
            metalness={0.02}
            transmission={0.82}
            thickness={0.9}
            transparent
            opacity={0.96}
            ior={1.45}
          />
        </mesh>
        <mesh position={[0, -0.31, 0]} scale={[0.91, 0.82, 0.91]}>
          <cylinderGeometry args={[0.78, 0.87, 2.25, 64]} />
          <meshPhysicalMaterial ref={liquid} color={palette[0]} roughness={0.28} metalness={0.05} transparent opacity={0.72} />
        </mesh>
        <mesh position={[0, 1.34, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.52, 0.42, 48]} />
          <meshStandardMaterial color="#17121e" roughness={0.18} metalness={0.82} />
        </mesh>
        <mesh position={[0, 1.76, 0]} castShadow>
          <cylinderGeometry args={[0.58, 0.48, 0.68, 8]} />
          <meshStandardMaterial color="#201628" roughness={0.22} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.08, 0.87]}>
          <planeGeometry args={[1.12, 0.8]} />
          <meshPhysicalMaterial color="#f4eee5" roughness={0.7} clearcoat={0.25} />
        </mesh>
        <group position={[0, 0.08, 0.89]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.54, 0.035, 0.02]} />
            <meshStandardMaterial color="#17121e" />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <ringGeometry args={[0.12, 0.15, 32]} />
            <meshStandardMaterial color="#17121e" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -0.24, 0]}>
            <boxGeometry args={[0.32, 0.025, 0.02]} />
            <meshStandardMaterial color="#17121e" />
          </mesh>
        </group>
        <pointLight ref={glow} position={[0.2, -0.3, 1.2]} color={palette[0]} intensity={2.2} distance={5} />
      </Float>
    </group>
  );
}

export default function PerfumeScene({ reducedMotion }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={3.2} color="#f8e8ff" />
        <directionalLight position={[-5, 1, 3]} intensity={2.1} color="#79d9ff" />
        <Sparkles count={reducedMotion ? 0 : 34} scale={[7, 7, 3]} size={1.5} speed={0.25} opacity={0.35} color="#d6c7ff" />
        <Bottle reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
