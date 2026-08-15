import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { media } from "./assets.js";
import { motionTrajectories } from "./motion.config.js";

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smooth = (start, end, value) => {
  const x = clamp01((value - start) / Math.max(0.001, end - start));
  return x * x * (3 - 2 * x);
};

const portalVertexShader = `
  uniform float uMorph;
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    vUv = uv;
    vec3 p = position;
    float ridge = sin(p.x * 0.72) * 0.55 + cos(p.y * 0.64) * 0.42;
    float detail = sin((p.x + p.y) * 2.1) * 0.13 + cos((p.x - p.y) * 2.7) * 0.09;
    float valley = -exp(-p.x * p.x * 0.2) * 1.15;
    p.z += (ridge + detail + valley) * uMorph;
    p.x += sin(p.y * 0.7) * 0.22 * uMorph;
    vHeight = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const portalFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uMorph;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    vec3 photo = texture2D(uTexture, vUv).rgb;
    vec3 terrainTint = mix(vec3(0.19, 0.29, 0.27), vec3(0.64, 0.72, 0.67), smoothstep(-1.0, 1.0, vHeight));
    vec3 color = mix(photo, photo * 0.58 + terrainTint * 0.62, uMorph * 0.72);
    float gridX = 1.0 - smoothstep(0.455, 0.5, abs(fract(vUv.x * 34.0) - 0.5));
    float gridY = 1.0 - smoothstep(0.455, 0.5, abs(fract(vUv.y * 22.0) - 0.5));
    float grid = max(gridX, gridY) * uMorph * 0.18;
    color = mix(color, vec3(0.82, 0.94, 0.92), grid);
    gl_FragColor = vec4(color, uOpacity);
  }
`;

function windowOpacity(progress, start, peakIn, peakOut, end) {
  const fadeIn = clamp01((progress - start) / Math.max(0.001, peakIn - start));
  const fadeOut = 1 - clamp01((progress - peakOut) / Math.max(0.001, end - peakOut));
  return Math.min(fadeIn, fadeOut);
}

function makeParticles(count, spread, seed = 1) {
  const positions = new Float32Array(count * 3);
  let state = seed;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    positions[stride] = (random() - 0.5) * spread[0];
    positions[stride + 1] = (random() - 0.5) * spread[1];
    positions[stride + 2] = (random() - 0.5) * spread[2];
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function makeTerrain(width = 20, depth = 20, segments = 100) {
  const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
  const position = geometry.attributes.position;
  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    const ridge = Math.sin(x * 0.62) * 0.6 + Math.cos(y * 0.52) * 0.48;
    const folds = Math.sin((x + y) * 1.8) * 0.15 + Math.cos((x - y) * 2.4) * 0.1;
    const valley = -Math.exp(-(x * x) * 0.17) * 1.45;
    position.setZ(index, ridge + folds + valley);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function makeRiver() {
  const points = [
    new THREE.Vector3(-0.2, 0.3, -10),
    new THREE.Vector3(-1.1, 0.16, -7),
    new THREE.Vector3(0.9, 0.08, -4),
    new THREE.Vector3(-0.7, 0, -1),
    new THREE.Vector3(1.2, -0.1, 2),
    new THREE.Vector3(-0.4, -0.18, 6),
    new THREE.Vector3(0.6, -0.25, 10),
  ];
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 120, 0.17, 10, false);
}

function World({ progressRef, reducedMotion }) {
  const { scene, camera, size } = useThree();
  const smoothProgress = useRef(0);
  const starGroup = useRef();
  const starsMaterial = useRef();
  const mountainGroup = useRef();
  const mountainMaterial = useRef();
  const contourMaterial = useRef();
  const riverMaterial = useRef();
  const forestGroup = useRef();
  const forestMaterial = useRef();
  const rainGroup = useRef();
  const rainMaterial = useRef();
  const estuaryGroup = useRef();
  const estuaryMaterial = useRef();
  const portalGroup = useRef();
  const portalMaterial = useRef();

  const stars = useMemo(() => makeParticles(1800, [28, 16, 28], 17), []);
  const forest = useMemo(() => makeParticles(6200, [18, 8, 20], 41), []);
  const rain = useMemo(() => makeParticles(2600, [16, 16, 18], 91), []);
  const estuary = useMemo(() => makeParticles(4200, [24, 2.2, 25], 121), []);
  const terrain = useMemo(() => makeTerrain(), []);
  const river = useMemo(() => makeRiver(), []);
  const portalGeometry = useMemo(() => new THREE.PlaneGeometry(14, 9, 100, 64), []);
  const portalTexture = useLoader(THREE.TextureLoader, media.glacialSource);
  const frameColor = useMemo(() => new THREE.Color(), []);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const dampedLookTarget = useMemo(() => new THREE.Vector3(), []);
  const portalUniforms = useMemo(() => ({
    uTexture: { value: portalTexture },
    uMorph: { value: 0 },
    uOpacity: { value: 0 },
  }), [portalTexture]);
  portalTexture.colorSpace = THREE.SRGBColorSpace;
  portalTexture.anisotropy = 8;

  const palette = useMemo(
    () => [
      new THREE.Color("#061019"),
      new THREE.Color("#0b1722"),
      new THREE.Color("#d8dfd5"),
      new THREE.Color("#111a18"),
      new THREE.Color("#210e12"),
      new THREE.Color("#071713"),
      new THREE.Color("#e4dfcf"),
      new THREE.Color("#061019"),
    ],
    [],
  );

  useFrame(({ clock }, delta) => {
    const rawProgress = progressRef.current.global || 0;
    const target = reducedMotion ? rawProgress : THREE.MathUtils.damp(smoothProgress.current, rawProgress, 4.2, delta);
    smoothProgress.current = target;
    const progress = target;
    const time = clock.getElapsedTime();
    const sourceState = progressRef.current.stages.source || { local: 0, presence: 0 };
    const cloudState = progressRef.current.stages.cloud || { local: 0, presence: 0 };
    const sourceLocal = sourceState.local;
    const cloudLocal = cloudState.local;
    const sourceMorph = smooth(0.12, 0.78, sourceLocal);
    const trajectory = size.width <= 760 ? motionTrajectories.mobile : motionTrajectories.desktop;

    const scaled = progress * (palette.length - 1);
    const paletteIndex = Math.min(palette.length - 2, Math.floor(scaled));
    frameColor.lerpColors(palette[paletteIndex], palette[paletteIndex + 1], scaled - paletteIndex);
    scene.background = frameColor;
    if (!(scene.fog instanceof THREE.FogExp2)) scene.fog = new THREE.FogExp2(frameColor, 0.024);
    scene.fog.color.copy(frameColor);
    scene.fog.density = progress > 0.7 && progress < 0.93 ? 0.045 : 0.024;

    let cameraX = Math.sin(progress * Math.PI * 4) * 1.5;
    let cameraY = 2.8 + Math.sin(progress * Math.PI * 2) * 1.1;
    let cameraZ = 9.4 - Math.sin(progress * Math.PI) * 1.4;
    lookTarget.set(0, 0, 0);

    if (sourceState.presence > 0.02) {
      const { start, end } = trajectory.source;
      cameraX = THREE.MathUtils.lerp(start.position[0], end.position[0], sourceMorph);
      cameraY = THREE.MathUtils.lerp(start.position[1], end.position[1], sourceMorph);
      cameraZ = THREE.MathUtils.lerp(start.position[2], end.position[2], sourceMorph);
      lookTarget.set(
        THREE.MathUtils.lerp(start.lookAt[0], end.lookAt[0], sourceMorph),
        THREE.MathUtils.lerp(start.lookAt[1], end.lookAt[1], sourceMorph),
        THREE.MathUtils.lerp(start.lookAt[2], end.lookAt[2], sourceMorph),
      );
    }

    if (cloudState.presence > 0.02) {
      const { start, cruiseStart, end, entryEnd } = trajectory.cloud;
      const entry = smooth(0, entryEnd, cloudLocal);
      const traverse = smooth(0.02, 0.99, cloudLocal);
      const cruiseX = THREE.MathUtils.lerp(cruiseStart.position[0], end.position[0], traverse);
      const cruiseY = THREE.MathUtils.lerp(cruiseStart.position[1], end.position[1], traverse)
        + Math.sin(traverse * Math.PI * 2.2) * 0.72;
      const cruiseZ = THREE.MathUtils.lerp(cruiseStart.position[2], end.position[2], traverse)
        + Math.cos(traverse * Math.PI * 1.4) * 0.24;
      const cruiseLookX = cruiseX + THREE.MathUtils.lerp(cruiseStart.lookOffset[0], end.lookOffset[0], traverse);
      const cruiseLookY = THREE.MathUtils.lerp(cruiseStart.lookOffset[1], end.lookOffset[1], traverse)
        + Math.sin(traverse * Math.PI) * 0.4;
      const cruiseLookZ = THREE.MathUtils.lerp(cruiseStart.lookOffset[2], end.lookOffset[2], traverse);

      cameraX = THREE.MathUtils.lerp(start.position[0], cruiseX, entry);
      cameraY = THREE.MathUtils.lerp(start.position[1], cruiseY, entry);
      cameraZ = THREE.MathUtils.lerp(start.position[2], cruiseZ, entry);
      lookTarget.set(
        THREE.MathUtils.lerp(start.lookAt[0], cruiseLookX, entry),
        THREE.MathUtils.lerp(start.lookAt[1], cruiseLookY, entry),
        THREE.MathUtils.lerp(start.lookAt[2], cruiseLookZ, entry),
      );
    }

    cameraTarget.set(cameraX, cameraY, cameraZ);
    if (reducedMotion) {
      camera.position.copy(cameraTarget);
      dampedLookTarget.copy(lookTarget);
    } else {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTarget.x, motionTrajectories.damping.camera, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTarget.y, motionTrajectories.damping.camera, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTarget.z, motionTrajectories.damping.camera, delta);
      dampedLookTarget.x = THREE.MathUtils.damp(dampedLookTarget.x, lookTarget.x, motionTrajectories.damping.lookAt, delta);
      dampedLookTarget.y = THREE.MathUtils.damp(dampedLookTarget.y, lookTarget.y, motionTrajectories.damping.lookAt, delta);
      dampedLookTarget.z = THREE.MathUtils.damp(dampedLookTarget.z, lookTarget.z, motionTrajectories.damping.lookAt, delta);
    }
    camera.lookAt(dampedLookTarget);

    const night = Math.max(windowOpacity(progress, 0, 0.01, 0.11, 0.2), windowOpacity(progress, 0.88, 0.96, 1, 1));
    starsMaterial.current.opacity = night * 0.9;
    starGroup.current.rotation.y = time * 0.006 + progress * 0.45;
    starGroup.current.rotation.x = Math.sin(time * 0.05) * 0.04;

    const dimensionalTerrain = Math.max(
      sourceState.presence * smooth(0.5, 0.9, sourceLocal),
      cloudState.presence,
    );
    const mountain = Math.max(windowOpacity(progress, 0.06, 0.12, 0.34, 0.43), dimensionalTerrain);
    mountainMaterial.current.opacity = mountain * 0.86;
    contourMaterial.current.opacity = mountain * 0.23;
    riverMaterial.current.opacity = mountain * 0.9;
    mountainGroup.current.position.z = THREE.MathUtils.lerp(3.5, -3.8, clamp01((progress - 0.06) / 0.37));
    mountainGroup.current.rotation.y = -0.18 + progress * 0.9;
    mountainGroup.current.rotation.z = Math.sin(progress * 8) * 0.035;

    const portalFade = 1 - smooth(0.74, 0.96, sourceLocal);
    portalMaterial.current.uniforms.uMorph.value = sourceMorph;
    portalMaterial.current.uniforms.uOpacity.value = sourceState.presence * portalFade * 0.98;
    portalGroup.current.rotation.x = THREE.MathUtils.lerp(0, -1.08, sourceMorph);
    portalGroup.current.rotation.y = THREE.MathUtils.lerp(0, 0.18, sourceMorph);
    portalGroup.current.position.set(
      THREE.MathUtils.lerp(0, -0.8, sourceMorph),
      THREE.MathUtils.lerp(-0.1, -1.15, sourceMorph),
      THREE.MathUtils.lerp(0, -1.5, sourceMorph),
    );

    const cloudForest = windowOpacity(progress, 0.22, 0.32, 0.61, 0.69);
    forestMaterial.current.opacity = cloudForest * 0.82;
    forestGroup.current.rotation.y = progress * 0.7 + time * 0.01;
    forestGroup.current.position.y = THREE.MathUtils.lerp(-1.6, 1.2, clamp01((progress - 0.25) / 0.42));
    forestGroup.current.scale.setScalar(0.8 + cloudForest * 0.36);

    const rainfall = windowOpacity(progress, 0.55, 0.64, 0.78, 0.86);
    rainMaterial.current.opacity = rainfall * 0.62;
    rainGroup.current.position.y = -((time * 1.8) % 2.8);
    rainGroup.current.rotation.y = -0.2 + progress * 0.5;

    const coast = windowOpacity(progress, 0.73, 0.8, 0.92, 0.98);
    estuaryMaterial.current.opacity = coast * 0.74;
    estuaryGroup.current.rotation.y = progress * -0.35;
    estuaryGroup.current.position.y = THREE.MathUtils.lerp(-2.2, 0.4, clamp01((progress - 0.73) / 0.22));
  });

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 8, 5]} intensity={2.2} color="#d8ecff" />
      <directionalLight position={[-5, 2, -3]} intensity={1.2} color="#ffba7b" />

      <group ref={portalGroup}>
        <mesh geometry={portalGeometry}>
          <shaderMaterial
            ref={portalMaterial}
            uniforms={portalUniforms}
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group ref={starGroup}>
        <points geometry={stars}>
          <pointsMaterial ref={starsMaterial} color="#bfd4df" size={0.035} sizeAttenuation transparent depthWrite={false} />
        </points>
      </group>

      <group ref={mountainGroup} rotation={[-Math.PI / 2.25, 0, 0]}>
        <mesh geometry={terrain}>
          <meshStandardMaterial ref={mountainMaterial} color="#8397a2" roughness={0.94} metalness={0.02} transparent depthWrite />
        </mesh>
        <mesh geometry={terrain} position={[0, 0, 0.035]}>
          <meshBasicMaterial ref={contourMaterial} color="#d9f0f4" wireframe transparent depthWrite={false} />
        </mesh>
        <mesh geometry={river} position={[0, 0.17, 0]} rotation={[Math.PI / 2.25, 0, 0]}>
          <meshStandardMaterial ref={riverMaterial} color="#d9f7ff" emissive="#438fa8" emissiveIntensity={0.75} roughness={0.24} transparent />
        </mesh>
      </group>

      <group ref={forestGroup}>
        <points geometry={forest}>
          <pointsMaterial ref={forestMaterial} color="#9fd0a3" size={0.035} sizeAttenuation transparent depthWrite={false} />
        </points>
      </group>

      <group ref={rainGroup} rotation={[0, 0, -0.08]}>
        <points geometry={rain}>
          <pointsMaterial ref={rainMaterial} color="#cfefff" size={0.018} sizeAttenuation transparent depthWrite={false} />
        </points>
      </group>

      <group ref={estuaryGroup} rotation={[-0.15, 0, 0]}>
        <points geometry={estuary}>
          <pointsMaterial ref={estuaryMaterial} color="#a8c7aa" size={0.05} sizeAttenuation transparent depthWrite={false} />
        </points>
      </group>
    </>
  );
}

export default function WorldScene({ progressRef, reducedMotion }) {
  return (
    <div className="world" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.8, 9.4], fov: 48, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <World progressRef={progressRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
