"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Shared scroll state — written by hero-section, read by scene ─── */
export const scrollState = { progress: 0 };

/* ─── Color palettes: dusk → night ─── */
const DUSK = {
  ambient: new THREE.Color("#2a1808"),
  hemi_sky: new THREE.Color("#4a2010"),
  hemi_ground: new THREE.Color("#1a0c04"),
  fog: new THREE.Color("#1a0e08"),
  sun: new THREE.Color("#e08040"),
  ground: new THREE.Color("#0a0604"),
};
const NIGHT = {
  ambient: new THREE.Color("#101830"),
  hemi_sky: new THREE.Color("#1a2040"),
  hemi_ground: new THREE.Color("#080810"),
  fog: new THREE.Color("#060a18"),
  sun: new THREE.Color("#4068b0"),
  ground: new THREE.Color("#040810"),
};

function lerpColor(a: THREE.Color, b: THREE.Color, t: number, out: THREE.Color) {
  out.r = a.r + (b.r - a.r) * t;
  out.g = a.g + (b.g - a.g) * t;
  out.b = a.b + (b.b - a.b) * t;
  return out;
}

/* ─── Building palette ─── */
const C = {
  bDark: "#0c1422",
  bMid: "#141e38",
  bLight: "#1c2a4a",
  bSteel: "#283860",
  bGlass: "#162040",
  winWarm: "#ffc060",
  winBright: "#fff0d0",
  winCool: "#8ab0e0",
};

/* ─── Deterministic random ─── */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ─── Building definition ─── */
interface BDef {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  col: string;
  glow?: boolean;
}

/* ─── City layout — 3 depth layers ─── */
function createCity() {
  const r = seeded(42);
  const far: BDef[] = [];
  const mid: BDef[] = [];
  const fore: BDef[] = [];

  for (let i = 0; i < 24; i++) {
    far.push({
      x: (i - 12) * 1.2 + (r() - 0.5) * 0.5,
      z: -7 - r() * 3,
      w: 0.3 + r() * 0.5,
      d: 0.3 + r() * 0.4,
      h: 0.3 + r() * 1.2,
      col: C.bDark,
    });
  }

  for (let i = 0; i < 18; i++) {
    const h = 0.8 + r() * 3.0;
    mid.push({
      x: (i - 9) * 1.4 + (r() - 0.5) * 0.8,
      z: -4 - r() * 3,
      w: 0.3 + r() * 0.6,
      d: 0.3 + r() * 0.5,
      h,
      col: i % 3 === 0 ? C.bLight : C.bMid,
      glow: h > 2.0 && r() > 0.6,
    });
  }

  const fgDefs: [number, number, number, number, number][] = [
    [-9.0, -2.8, 0.6, 0.6, 1.6],
    [-7.5, -3.2, 0.7, 0.6, 2.4],
    [-6.2, -2.5, 0.6, 0.55, 3.0],
    [-5.0, -3.0, 0.65, 0.6, 2.2],
    [-4.0, -3.5, 0.5, 0.5, 3.2],
    [-2.5, -2.8, 0.6, 0.6, 1.8],
    [2.5, -3.2, 0.6, 0.55, 1.8],
    [3.5, -3.5, 0.55, 0.6, 2.4],
    [5.0, -2.8, 0.6, 0.6, 3.0],
    [6.2, -3.2, 0.7, 0.6, 2.4],
    [7.2, -2.5, 0.6, 0.55, 2.8],
    [8.2, -3.0, 0.65, 0.6, 2.0],
    [9.2, -3.2, 0.5, 0.5, 1.6],
  ];
  for (const [x, z, w, d, h] of fgDefs) {
    fore.push({ x, z, w, d, h, col: r() > 0.5 ? C.bLight : C.bSteel });
  }

  return { far, mid, fore };
}

/* ═══════════════════════════════════════════
 *  CAMERA PATH — CatmullRom spline
 * ═══════════════════════════════════════════ */
const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 9, 22),    // 0.0 — elevated, distant
  new THREE.Vector3(0, 6.5, 16),  // ~0.3 — descending
  new THREE.Vector3(0, 4.2, 11),  // ~0.6 — approaching
  new THREE.Vector3(0, 3.0, 6.5), // 1.0 — street level, immersed
]);

const lookAtPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.5, -5),  // looking at skyline from afar
  new THREE.Vector3(0, 2.5, -4),  // looking slightly up at growing buildings
  new THREE.Vector3(0, 2.0, -3),  // centering on landmarks
  new THREE.Vector3(0, 1.5, -3),  // street level gaze
]);

/* ═══════════════════════════════════════════
 *  CITY BUILDINGS
 * ═══════════════════════════════════════════ */
function CityBuildings({ buildings }: { buildings: BDef[] }) {
  return (
    <>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color={b.col}
            metalness={0.55}
            roughness={0.45}
            emissive={b.glow ? "#1a2848" : undefined}
            emissiveIntensity={b.glow ? 0.15 : 0}
          />
        </mesh>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════
 *  PETRONAS TWIN TOWERS
 * ═══════════════════════════════════════════ */
const TOWER_SEGS: [number, number, number][] = [
  [0.40, 0.37, 1.95],
  [0.37, 0.34, 0.85],
  [0.34, 0.30, 0.70],
  [0.30, 0.26, 0.56],
  [0.26, 0.22, 0.49],
  [0.22, 0.19, 0.35],
];
const TOWER_BODY_H = TOWER_SEGS.reduce((s, [, , h]) => s + h, 0);

function SingleTower({ xOff }: { xOff: number }) {
  const yOffsets = useMemo(() => {
    const ys: number[] = [];
    let y = 0;
    for (const [, , h] of TOWER_SEGS) {
      ys.push(y + h / 2);
      y += h;
    }
    return ys;
  }, []);

  return (
    <group position={[xOff, 0, 0]}>
      {TOWER_SEGS.map(([br, tr, h], i) => (
        <mesh key={i} position={[0, yOffsets[i]!, 0]}>
          <cylinderGeometry args={[tr, br, h, 8]} />
          <meshStandardMaterial
            color={C.bSteel}
            metalness={0.85}
            roughness={0.15}
            emissive="#1a2848"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
      <mesh position={[0, TOWER_BODY_H + 0.06, 0]}>
        <cylinderGeometry args={[0.22, 0.19, 0.12, 8]} />
        <meshStandardMaterial color={C.bSteel} metalness={0.8} roughness={0.2} />
      </mesh>
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh
            key={deg}
            position={[
              Math.cos(rad) * 0.16,
              TOWER_BODY_H + 0.3,
              Math.sin(rad) * 0.16,
            ]}
          >
            <coneGeometry args={[0.02, 0.3, 4]} />
            <meshStandardMaterial
              color="#2a3555"
              metalness={0.9}
              roughness={0.1}
              emissive={C.winBright}
              emissiveIntensity={0.25}
            />
          </mesh>
        );
      })}
      <mesh position={[0, TOWER_BODY_H + 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 6]} />
        <meshStandardMaterial
          color="#2a3555"
          metalness={0.9}
          roughness={0.1}
          emissive={C.winBright}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, TOWER_BODY_H + 0.9, 0]}>
        <cylinderGeometry args={[0.015, 0.05, 0.7, 4]} />
        <meshStandardMaterial
          color="#2a3555"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight
        position={[0, TOWER_BODY_H + 1.3, 0]}
        intensity={1.2}
        color="#ffffff"
        distance={6}
        decay={2}
      />
    </group>
  );
}

function PetronasTowers() {
  const skybridgeRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (skybridgeRef.current) {
      skybridgeRef.current.intensity =
        0.4 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <group position={[0.3, 0, -3.2]}>
      <SingleTower xOff={-0.55} />
      <SingleTower xOff={0.55} />
      <group position={[0, 2.1, 0]}>
        <mesh>
          <boxGeometry args={[0.85, 0.08, 0.15]} />
          <meshStandardMaterial
            color={C.bSteel}
            metalness={0.65}
            roughness={0.3}
            emissive="#a0c0e0"
            emissiveIntensity={0.12}
          />
        </mesh>
        {[-0.22, 0.22].map((xo) => (
          <mesh key={xo} position={[xo, -0.15, 0]}>
            <boxGeometry args={[0.025, 0.25, 0.05]} />
            <meshStandardMaterial color={C.bSteel} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        <pointLight
          ref={skybridgeRef}
          position={[0, 0, 0.2]}
          intensity={0.4}
          color="#c0d8f0"
          distance={3}
          decay={2}
        />
      </group>
      <pointLight
        position={[0, 0.2, 0.5]}
        intensity={0.6}
        color="#d4a040"
        distance={4}
        decay={2}
      />
    </group>
  );
}

/* ═══════════════════════════════════════════
 *  KL TOWER
 * ═══════════════════════════════════════════ */
function KLTower() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity =
        Math.sin(clock.getElapsedTime() * 2.0) > 0.3 ? 0.8 : 0.1;
    }
  });

  return (
    <group position={[-3, 0, -3.5]}>
      {[0, 120, 240].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={deg} position={[Math.cos(rad) * 0.2, 0.55, Math.sin(rad) * 0.2]}>
            <cylinderGeometry args={[0.05, 0.12, 1.1, 6]} />
            <meshStandardMaterial color={C.bSteel} metalness={0.6} roughness={0.35} />
          </mesh>
        );
      })}
      <mesh position={[0, 2.7, 0]}>
        <cylinderGeometry args={[0.08, 0.13, 4.2, 8]} />
        <meshStandardMaterial color={C.bSteel} metalness={0.65} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.8, 0]}>
        <cylinderGeometry args={[0.32, 0.16, 0.45, 12]} />
        <meshStandardMaterial color="#1e2a50" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4.05, 0]}>
        <cylinderGeometry args={[0.16, 0.32, 0.2, 12]} />
        <meshStandardMaterial color="#1e2a50" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.6, 6]} />
        <meshStandardMaterial color={C.bSteel} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 5.1, 0]}>
        <cylinderGeometry args={[0.01, 0.03, 1.0, 4]} />
        <meshStandardMaterial
          color={C.bSteel}
          metalness={0.8}
          roughness={0.15}
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 5.65, 0]}
        intensity={0.8}
        color="#ff2020"
        distance={4}
        decay={2}
      />
    </group>
  );
}

/* ═══════════════════════════════════════════
 *  MERDEKA 118
 * ═══════════════════════════════════════════ */
function Merdeka118() {
  return (
    <group position={[3.5, 0, -3.8]}>
      <mesh position={[0, 3.25, 0]}>
        <cylinderGeometry args={[0.16, 0.30, 6.5, 3]} />
        <meshStandardMaterial
          color={C.bGlass}
          metalness={0.8}
          roughness={0.2}
          emissive="#101828"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0, 6.75, 0]}>
        <cylinderGeometry args={[0.04, 0.16, 0.65, 3]} />
        <meshStandardMaterial color={C.bGlass} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 7.35, 0]}>
        <cylinderGeometry args={[0.008, 0.03, 0.6, 4]} />
        <meshStandardMaterial
          color="#2a3555"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight position={[0, 7.7, 0]} intensity={0.5} color="#ffffff" distance={4} decay={2} />
    </group>
  );
}

/* ═══════════════════════════════════════════
 *  WINDOW LIGHTS — progressive turn-on
 * ═══════════════════════════════════════════ */
function WindowLights({
  buildings,
  seed,
  litChance = 0.45,
  turnOnBase = 0.1,
}: {
  buildings: BDef[];
  seed: number;
  litChance?: number;
  turnOnBase?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const { positions, baseColors, speeds, turnOnAt, count } = useMemo(() => {
    const pos: [number, number, number][] = [];
    const cols: THREE.Color[] = [];
    const spds: number[] = [];
    const turns: number[] = [];
    const r = seeded(seed);

    const warmCol = new THREE.Color(C.winWarm);
    const brightCol = new THREE.Color(C.winBright);
    const coolCol = new THREE.Color(C.winCool);

    function pickColor(): THREE.Color {
      const v = r();
      if (v < 0.55) return warmCol.clone();
      if (v < 0.80) return brightCol.clone();
      return coolCol.clone();
    }

    const floorH = 0.10;
    const colW = 0.065;
    for (const b of buildings) {
      const floors = Math.max(2, Math.floor(b.h / floorH));
      const cols_per = Math.max(1, Math.floor(b.w / colW));
      for (let f = 1; f < floors; f++) {
        for (let c = 0; c < cols_per; c++) {
          if (r() > litChance) continue;
          pos.push([
            b.x + (c - cols_per / 2) * colW + colW / 2,
            f * floorH + 0.04,
            b.z + b.d / 2 + 0.003,
          ]);
          cols.push(pickColor());
          spds.push(0.2 + r() * 1.2);
          // Lower floors turn on first, with randomness
          const heightNorm = f / floors;
          turns.push(turnOnBase + heightNorm * 0.25 + r() * 0.35);
        }
      }
    }

    return { positions: pos, baseColors: cols, speeds: spds, turnOnAt: turns, count: pos.length };
  }, [buildings, seed, litChance, turnOnBase]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const sp = scrollState.progress;

    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i]!;
      const isOn = sp > turnOnAt[i]!;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(isOn ? 1 : 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      if (isOn) {
        const flicker = 0.5 + Math.sin(t * speeds[i]! + i * 0.7) * 0.5;
        tempColor.copy(baseColors[i]!).multiplyScalar(Math.max(0.1, flicker) * 2.0);
      } else {
        tempColor.setRGB(0, 0, 0);
      }
      meshRef.current.setColorAt(i, tempColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.05, 0.025]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════
 *  LANDMARK WINDOWS — progressive turn-on
 * ═══════════════════════════════════════════ */
function LandmarkWindows() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const { positions, baseColors, speeds, turnOnAt, count } = useMemo(() => {
    const pos: [number, number, number][] = [];
    const cols: THREE.Color[] = [];
    const spds: number[] = [];
    const turns: number[] = [];
    const r = seeded(789);

    const warmCol = new THREE.Color(C.winWarm);
    const brightCol = new THREE.Color(C.winBright);
    const coolCol = new THREE.Color(C.winCool);

    function pickColor(): THREE.Color {
      const v = r();
      if (v < 0.55) return warmCol.clone();
      if (v < 0.80) return brightCol.clone();
      return coolCol.clone();
    }

    // Petronas Towers
    const ptx = [0.3 - 0.55, 0.3 + 0.55];
    for (const tx of ptx) {
      for (let f = 0; f < 40; f++) {
        for (let c = -4; c <= 4; c++) {
          if (r() > 0.5) continue;
          const heightRatio = f / 40;
          const maxC = Math.ceil(4 * (1 - heightRatio * 0.35));
          if (Math.abs(c) > maxC) continue;
          pos.push([tx + c * 0.06, f * 0.12 + 0.1, -3.2 + 0.38]);
          cols.push(pickColor());
          spds.push(0.15 + r() * 0.8);
          turns.push(0.15 + heightRatio * 0.3 + r() * 0.3);
        }
      }
    }

    // Merdeka 118
    for (let f = 0; f < 50; f++) {
      const heightRatio = f / 50;
      const maxC = Math.ceil(3 * (1 - heightRatio * 0.45));
      for (let c = -3; c <= 3; c++) {
        if (Math.abs(c) > maxC) continue;
        if (r() > 0.45) continue;
        pos.push([3.5 + c * 0.05, f * 0.13 + 0.1, -3.8 + 0.28]);
        cols.push(r() > 0.5 ? coolCol.clone() : warmCol.clone());
        spds.push(0.15 + r() * 0.8);
        turns.push(0.2 + heightRatio * 0.3 + r() * 0.3);
      }
    }

    // KL Tower pod
    for (let a = 0; a < 16; a++) {
      const angle = (a / 16) * Math.PI * 2;
      if (Math.cos(angle) < -0.2) continue;
      pos.push([-3 + Math.cos(angle) * 0.30, 3.9, -3.5 + Math.sin(angle) * 0.30]);
      cols.push(warmCol.clone());
      spds.push(0.3 + r() * 0.5);
      turns.push(0.35 + r() * 0.25);
    }

    return { positions: pos, baseColors: cols, speeds: spds, turnOnAt: turns, count: pos.length };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const sp = scrollState.progress;

    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i]!;
      const isOn = sp > turnOnAt[i]!;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(isOn ? 1 : 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      if (isOn) {
        const flicker = 0.5 + Math.sin(t * speeds[i]! + i * 0.7) * 0.5;
        tempColor.copy(baseColors[i]!).multiplyScalar(Math.max(0.1, flicker) * 2.0);
      } else {
        tempColor.setRGB(0, 0, 0);
      }
      meshRef.current.setColorAt(i, tempColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.05, 0.025]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════
 *  ANIMATED LIGHTING RIG
 * ═══════════════════════════════════════════ */
function LightingRig() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const moonRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const cityGlowRef = useRef<THREE.PointLight>(null);
  const cityGlowLRef = useRef<THREE.PointLight>(null);
  const cityGlowRRef = useRef<THREE.PointLight>(null);
  const hazeRef = useRef<THREE.PointLight>(null);
  const groundRef = useRef<THREE.MeshStandardMaterial>(null);
  const { scene } = useThree();

  const tmpCol = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const sp = scrollState.progress;
    // timeOfDay: 0=dusk, 1=night
    const tod = Math.min(1, sp * 1.5);

    // Ambient
    if (ambientRef.current) {
      lerpColor(DUSK.ambient, NIGHT.ambient, tod, ambientRef.current.color);
      ambientRef.current.intensity = 0.12 + tod * 0.06;
    }

    // Sun (dusk) → Moon (night)
    if (sunRef.current) {
      lerpColor(DUSK.sun, NIGHT.sun, tod, sunRef.current.color);
      sunRef.current.intensity = 0.6 - tod * 0.2;
      sunRef.current.position.y = 12 - tod * 4;
    }

    // Moon fades in
    if (moonRef.current) {
      moonRef.current.intensity = tod * 0.45;
    }

    // Hemisphere
    if (hemiRef.current) {
      lerpColor(DUSK.hemi_sky, NIGHT.hemi_sky, tod, hemiRef.current.color);
      lerpColor(DUSK.hemi_ground, NIGHT.hemi_ground, tod, hemiRef.current.groundColor);
      hemiRef.current.intensity = 0.12 + tod * 0.03;
    }

    // City ground glow — intensifies at night
    const glowI = 0.2 + tod * 1.0;
    if (cityGlowRef.current) cityGlowRef.current.intensity = glowI;
    if (cityGlowLRef.current) cityGlowLRef.current.intensity = glowI * 0.5;
    if (cityGlowRRef.current) cityGlowRRef.current.intensity = glowI * 0.5;

    // Light pollution haze — night only
    if (hazeRef.current) hazeRef.current.intensity = tod * 1.0;

    // Fog transition
    if (scene.fog instanceof THREE.FogExp2) {
      lerpColor(DUSK.fog, NIGHT.fog, tod, scene.fog.color);
      scene.fog.density = 0.035 - tod * 0.013;
    }

    // Ground color
    if (groundRef.current) {
      lerpColor(DUSK.ground, NIGHT.ground, tod, groundRef.current.color);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.12} color="#2a1808" />

      {/* Dusk sun → Night moonlight */}
      <directionalLight ref={sunRef} position={[6, 12, -6]} intensity={0.6} color="#e08040" />
      <directionalLight ref={moonRef} position={[-6, 8, -8]} intensity={0} color="#3050a0" />
      <directionalLight position={[-5, 4, 4]} intensity={0.12} color="#304080" />

      <hemisphereLight ref={hemiRef} args={["#4a2010", "#1a0c04", 0.12]} />

      {/* City glow — intensifies with night */}
      <pointLight ref={cityGlowRef} position={[0, 0.3, -3]} intensity={0.2} color="#1a1008" distance={20} decay={2} />
      <pointLight ref={cityGlowLRef} position={[-4, 0.3, -3]} intensity={0.1} color="#100c04" distance={14} decay={2} />
      <pointLight ref={cityGlowRRef} position={[4, 0.3, -3]} intensity={0.1} color="#100c04" distance={14} decay={2} />

      {/* Light pollution haze */}
      <pointLight ref={hazeRef} position={[0, -0.5, -4]} intensity={0} color="#2a1808" distance={22} decay={1.5} />
      <pointLight position={[-5, -0.3, -5]} intensity={0.4} color="#201008" distance={15} decay={1.5} />
      <pointLight position={[5, -0.3, -5]} intensity={0.4} color="#201008" distance={15} decay={1.5} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial ref={groundRef} color={DUSK.ground} metalness={0.7} roughness={0.5} />
      </mesh>
    </>
  );
}

/* ═══════════════════════════════════════════
 *  MAIN SCENE — cinematic scroll-driven
 * ═══════════════════════════════════════════ */
export function SkylineScene() {
  const { far, mid, fore } = useMemo(() => createCity(), []);
  const { scene, camera } = useThree();

  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const camPos = useMemo(() => new THREE.Vector3(), []);
  const lookPos = useMemo(() => new THREE.Vector3(), []);

  useMemo(() => {
    scene.fog = new THREE.FogExp2(DUSK.fog, 0.035);
  }, [scene]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useFrame(() => {
    const sp = scrollState.progress;
    const sm = smoothMouse.current;
    sm.x += (mouseRef.current.x - sm.x) * 0.03;
    sm.y += (mouseRef.current.y - sm.y) * 0.03;

    // ─── Camera follows spline path ───
    cameraPath.getPointAt(Math.min(1, sp), camPos);
    lookAtPath.getPointAt(Math.min(1, sp), lookPos);

    // Add mouse parallax (reduced at distance, stronger when close)
    const mouseStrength = 0.3 + sp * 0.5;
    camPos.x += sm.x * mouseStrength;
    camPos.y += sm.y * mouseStrength * 0.3;

    camera.position.copy(camPos);
    camera.lookAt(lookPos);
  });

  return (
    <>
      <LightingRig />

      {/* Far layer */}
      <group>
        <CityBuildings buildings={far} />
        <WindowLights buildings={far} seed={100} litChance={0.25} turnOnBase={0.05} />
      </group>

      {/* Mid layer — landmarks */}
      <group>
        <CityBuildings buildings={mid} />
        <PetronasTowers />
        <KLTower />
        <Merdeka118 />
        <WindowLights buildings={mid} seed={200} litChance={0.45} turnOnBase={0.15} />
        <LandmarkWindows />
      </group>

      {/* Fore layer */}
      <group>
        <CityBuildings buildings={fore} />
        <WindowLights buildings={fore} seed={300} litChance={0.5} turnOnBase={0.3} />
      </group>
    </>
  );
}
