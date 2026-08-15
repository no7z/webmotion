import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp, smoothstep, useReducedMotion } from "./motion.js";

const damp = (current, target, delta, speed = 4) => THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta));

function SystemMorph({ progress, reduced }) {
  const root = useRef();
  const positions = useMemo(() => Array.from({ length: 12 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    return [(column - 1.5) * 2.25, (1 - row) * 2.1, (index % 2 ? -0.35 : 0.35)];
  }), []);
  const spread = smoothstep(clamp((progress - 0.18) / 0.58));
  useFrame((state, delta) => {
    if (!root.current) return;
    root.current.rotation.y = reduced ? progress * 0.18 : root.current.rotation.y + delta * (0.12 + progress * 0.2);
    root.current.rotation.x = reduced ? -0.16 + progress * 0.18 : damp(root.current.rotation.x, -0.16 + progress * 0.18, delta);
  });
  return (
    <group ref={root}>
      {positions.map((position, index) => (
        <mesh key={index} position={position.map((value) => value * spread)} scale={0.55 + spread * 0.18}>
          <icosahedronGeometry args={[1, 5]} />
          <meshPhysicalMaterial color={index % 3 === 0 ? "#e7ff6b" : index % 3 === 1 ? "#6ed8ff" : "#ff7e52"} roughness={0.18} metalness={0.35} clearcoat={1} />
        </mesh>
      ))}
    </group>
  );
}

function Instrument({ progress, active, reduced }) {
  const root = useRef();
  useFrame((state, delta) => {
    if (!root.current) return;
    const targetY = [-0.45, 0.14, 0.62][active] || 0;
    const targetX = [-0.12, 0.08, -0.22][active] || 0;
    root.current.rotation.y = reduced ? targetY : damp(root.current.rotation.y, targetY, delta, 5);
    root.current.rotation.x = reduced ? targetX : damp(root.current.rotation.x, targetX, delta, 5);
  });
  return (
    <group ref={root} rotation={[0, -0.4, 0]}>
      <mesh scale={[2.4, 0.42, 0.5]}>
        <capsuleGeometry args={[0.72, 3.6, 12, 28]} />
        <meshPhysicalMaterial color="#15191a" roughness={0.28} metalness={0.7} clearcoat={1} />
      </mesh>
      {Array.from({ length: 7 }, (_, index) => {
        const selected = index === [1, 3, 5][active];
        return (
          <mesh key={index} position={[0, (index - 3) * 0.17, 0.53]} scale={[2.1, selected ? 0.026 : 0.012, 0.014]}>
            <boxGeometry />
            <meshBasicMaterial color={selected ? "#ff5b42" : "#9fa6a3"} />
          </mesh>
        );
      })}
      <mesh position={[-2.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.9, 0.14, 18, 80]} />
        <meshStandardMaterial color="#2c3334" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
}

function CameraRoute({ progress, reduced }) {
  const root = useRef();
  const { camera } = useThree();
  useFrame((state, delta) => {
    const p = smoothstep(progress);
    const targetZ = 8 - p * 27;
    const targetX = Math.sin(p * Math.PI * 2.2) * 1.65;
    const targetY = 1.2 + Math.sin(p * Math.PI * 3) * 0.55;
    camera.position.x = reduced ? targetX : damp(camera.position.x, targetX, delta, 4.5);
    camera.position.y = reduced ? targetY : damp(camera.position.y, targetY, delta, 4.5);
    camera.position.z = reduced ? targetZ : damp(camera.position.z, targetZ, delta, 4.5);
    camera.lookAt(Math.sin(p * 5) * 0.55, 0.4, targetZ - 5);
    if (root.current) root.current.rotation.y = Math.sin(p * 4) * 0.05;
  });
  return (
    <group ref={root}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, -6]}>
        <planeGeometry args={[18, 44, 1, 1]} />
        <meshStandardMaterial color="#0d1719" roughness={0.82} />
      </mesh>
      {Array.from({ length: 11 }, (_, index) => (
        <group key={index} position={[0, 0, 5 - index * 3.3]}>
          <mesh position={[-4.2, 1.8, 0]} scale={[0.12, 3.5, 1]}><boxGeometry /><meshStandardMaterial color="#617276" /></mesh>
          <mesh position={[4.2, 1.8, 0]} scale={[0.12, 3.5, 1]}><boxGeometry /><meshStandardMaterial color="#617276" /></mesh>
          <mesh position={[0, 5.2, 0]} scale={[4.3, 0.12, 1]}><boxGeometry /><meshStandardMaterial color="#617276" /></mesh>
        </group>
      ))}
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[index === 1 ? 1.2 : -1.3, 0.2 + index * 0.3, 1 - index * 9]} rotation={[0.2, index * 0.9, 0.1]}>
          {index === 1 ? <torusKnotGeometry args={[1.05, 0.25, 160, 18]} /> : <icosahedronGeometry args={[1.35, 2]} />}
          <meshPhysicalMaterial color={["#eb6b46", "#b7e5d9", "#f1cf6a"][index]} roughness={0.32} metalness={0.18} clearcoat={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Globe({ active = 0, reduced }) {
  const root = useRef();
  useFrame((state, delta) => {
    if (!root.current) return;
    const targetY = active * 1.2 + (reduced ? 0 : state.clock.elapsedTime * 0.025);
    const targetX = -0.18 + active * 0.08;
    root.current.rotation.y = reduced ? targetY : damp(root.current.rotation.y, targetY, delta, 3.2);
    root.current.rotation.x = reduced ? targetX : damp(root.current.rotation.x, targetX, delta, 3.2);
  });
  return (
    <group ref={root}>
      <mesh><sphereGeometry args={[2.7, 48, 32]} /><meshStandardMaterial color="#173c3a" roughness={0.72} metalness={0.2} /></mesh>
      <mesh scale={1.01}><sphereGeometry args={[2.7, 22, 14]} /><meshBasicMaterial color="#f0c96c" wireframe transparent opacity={0.42} /></mesh>
      {[[1.9,1.3,1.2],[-1.6,.7,2],[.4,-1.8,1.9],[-1.3,-1.5,-1.7]].map((position, index) => (
        <mesh key={index} position={position} scale={index === active ? 0.2 : 0.1}><sphereGeometry args={[1, 18, 18]} /><meshBasicMaterial color={index === active ? "#ffdd78" : "#e9e2cf"} /></mesh>
      ))}
    </group>
  );
}

function EmbeddedObject({ reduced }) {
  const root = useRef();
  useFrame((state, delta) => {
    if (!root.current) return;
    if (!reduced) {
      root.current.rotation.x += delta * 0.08;
      root.current.rotation.y += delta * 0.14;
    }
  });
  return <mesh ref={root}><torusKnotGeometry args={[1.8, 0.48, 200, 24]} /><meshPhysicalMaterial color="#d6c3ff" roughness={0.22} metalness={0.62} clearcoat={1} /></mesh>;
}

function ProductArch({ reduced }) {
  const root = useRef();
  useFrame((state, delta) => {
    if (!root.current) return;
    root.current.rotation.y = reduced ? 0.4 : root.current.rotation.y + delta * 0.08;
    root.current.rotation.x = reduced ? -0.42 : -0.42 + Math.sin(state.clock.elapsedTime * 0.4) * 0.035;
  });
  return (
    <group ref={root} rotation={[-0.42, 0.4, 0]}>
      {Array.from({ length: 14 }, (_, index) => {
        const angle = -Math.PI * 0.78 + (index / 13) * Math.PI * 1.56;
        return (
          <mesh key={index} position={[Math.cos(angle) * 2.6, Math.sin(angle) * 1.5, Math.abs(index - 6.5) * -0.08]} rotation={[0, 0, angle + Math.PI / 2]} scale={[0.36, 0.75, 0.48]}>
            <capsuleGeometry args={[0.48, 0.8, 10, 18]} />
            <meshPhysicalMaterial color="#eee7da" roughness={0.3} clearcoat={1} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.2, 0.08, 14, 100, Math.PI * 1.65]} /><meshBasicMaterial color="#ff714f" /></mesh>
    </group>
  );
}

function Building({ active = 0, reduced }) {
  const root = useRef();
  const { camera } = useThree();
  useFrame((state, delta) => {
    const targets = [4.3 + active * 0.72, 6.8 - active * 0.55, 8.2 - active * 0.25];
    camera.position.y = reduced ? targets[0] : damp(camera.position.y, targets[0], delta, 4);
    camera.position.x = reduced ? targets[1] : damp(camera.position.x, targets[1], delta, 4);
    camera.position.z = reduced ? targets[2] : damp(camera.position.z, targets[2], delta, 4);
    camera.lookAt(0, 1.2 + active * 0.45, 0);
    if (root.current) root.current.rotation.y = reduced ? -0.45 + active * 0.24 : damp(root.current.rotation.y, -0.45 + active * 0.24, delta, 4);
  });
  return (
    <group ref={root}>
      {[0, 1, 2].map((floor) => (
        <group key={floor} position={[0, floor * 1.18, 0]}>
          <mesh scale={[3.5, 0.12, 2.65]}><boxGeometry /><meshPhysicalMaterial color={floor === active ? "#75e1ca" : "#d8d2c2"} transparent opacity={floor === active ? 0.98 : 0.42} roughness={0.5} /></mesh>
          {Array.from({ length: 6 }, (_, index) => <mesh key={index} position={[(index % 3 - 1) * 2.1, 0.55, (Math.floor(index / 3) - .5) * 2.8]} scale={[0.08, 0.58, 1.2]}><boxGeometry /><meshStandardMaterial color="#e9e4d8" transparent opacity={0.64} /></mesh>)}
        </group>
      ))}
    </group>
  );
}

function World({ type, progress = 0, active = 0, reduced = false }) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    if (type === "route" || type === "building") return;
    const targetZ = type === "globe" ? 7.4 : type === "system" ? 9.4 - progress * 1.5 : 7.2;
    camera.position.z = reduced ? targetZ : damp(camera.position.z, targetZ, delta, 4);
    camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[5, 8, 7]} intensity={2.8} color="#fff4df" />
      <pointLight position={[-5, 1, 4]} intensity={26} color="#6fded0" distance={16} />
      {type === "system" && <SystemMorph progress={progress} reduced={reduced} />}
      {type === "instrument" && <Instrument progress={progress} active={active} reduced={reduced} />}
      {type === "route" && <CameraRoute progress={progress} reduced={reduced} />}
      {type === "globe" && <Globe active={active} reduced={reduced} />}
      {type === "embedded" && <EmbeddedObject reduced={reduced} />}
      {type === "arch" && <ProductArch reduced={reduced} />}
      {type === "building" && <Building active={active} reduced={reduced} />}
    </>
  );
}

export default function Scene({ type, progress = 0, active = 0, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <div className={`scene ${className}`} aria-hidden="true">
      <Canvas dpr={[1, 1.55]} gl={{ antialias: true, powerPreference: "high-performance", alpha: true }} camera={{ position: type === "building" ? [6.8, 4.3, 8.2] : [0, 0, 8], fov: type === "route" ? 58 : 45 }}>
        <World type={type} progress={progress} active={active} reduced={reduced} />
      </Canvas>
    </div>
  );
}
