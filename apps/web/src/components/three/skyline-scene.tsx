"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Palette: nighttime city — lighter buildings for contrast ─── */
const C = {
  bDark: "#0c1422",
  bMid: "#141e38",
  bLight: "#1c2a4a",
  bSteel: "#283860",
  bGlass: "#162040",
  bEdge: "#304070",     // lighter edge for rim definition
  winWarm: "#ffc060",
  winBright: "#fff0d0",
  winCool: "#8ab0e0",
  ground: "#040810",
  fog: "#060a18",
};

/* ─── Deterministic random ─── */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ─── Building layout ─── */
interface BDef {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  col: string;
}

function createCity(): BDef[] {
  const r = seeded(42);
  const bs: BDef[] = [];

  // Far background (z -7 to -10) — silhouettes
  for (let i = 0; i < 24; i++) {
    bs.push({
      x: (i - 12) * 1.2 + (r() - 0.5) * 0.5,
      z: -7 - r() * 3,
      w: 0.3 + r() * 0.5,
      d: 0.3 + r() * 0.4,
      h: 0.3 + r() * 1.2,
      col: C.bDark,
    });
  }

  // Mid layer (z -4 to -7)
  for (let i = 0; i < 18; i++) {
    bs.push({
      x: (i - 9) * 1.4 + (r() - 0.5) * 0.8,
      z: -4 - r() * 3,
      w: 0.3 + r() * 0.6,
      d: 0.3 + r() * 0.5,
      h: 0.8 + r() * 3.0,
      col: i % 3 === 0 ? C.bLight : C.bMid,
    });
  }

  // Foreground (z -2.5 to -4) — gap at x=-2 to x=2 for Petronas view
  const fg: [number, number, number, number, number][] = [
    [-9.0, -2.8, 0.6, 0.6, 1.6],
    [-7.5, -3.2, 0.7, 0.6, 2.4],
    [-6.2, -2.5, 0.6, 0.55, 3.0],
    [-5.0, -3.0, 0.65, 0.6, 2.2],
    [-4.0, -3.5, 0.5, 0.5, 3.2],
    [-2.5, -2.8, 0.6, 0.6, 1.8],
    // Clear lane for Petronas ↕ (wider gap)
    [2.5, -3.2, 0.6, 0.55, 1.8],
    [3.5, -3.5, 0.55, 0.6, 2.4],
    [5.0, -2.8, 0.6, 0.6, 3.0],
    [6.2, -3.2, 0.7, 0.6, 2.4],
    [7.2, -2.5, 0.6, 0.55, 2.8],
    [8.2, -3.0, 0.65, 0.6, 2.0],
    [9.2, -3.2, 0.5, 0.5, 1.6],
  ];
  for (const [x, z, w, d, h] of fg) {
    bs.push({ x, z, w, d, h, col: r() > 0.5 ? C.bLight : C.bSteel });
  }

  return bs;
}

/* ═══════════════════════════════════════════
 *  PETRONAS TWIN TOWERS — the centerpiece
 * ═══════════════════════════════════════════ */
const TOWER_SEGS: [number, number, number][] = [
  // [bottomR, topR, height] — stacked, each segment tapers (scaled 1.4x)
  [0.40, 0.37, 1.95],
  [0.37, 0.34, 0.85],
  [0.34, 0.30, 0.70],
  [0.30, 0.26, 0.56],
  [0.26, 0.22, 0.49],
  [0.22, 0.19, 0.35],
];
const TOWER_BODY_H = TOWER_SEGS.reduce((s, [, , h]) => s + h, 0); // ~3.5

function SingleTower({ xOff }: { xOff: number }) {
  // Pre-compute Y positions for each segment
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
      {/* Main body: stacked octagonal cylinders */}
      {TOWER_SEGS.map(([br, tr, h], i) => (
        <mesh key={i} position={[0, yOffsets[i]!, 0]}>
          <cylinderGeometry args={[tr, br, h, 8]} />
          <meshStandardMaterial
            color={C.bSteel}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Crown ornamental ring */}
      <mesh position={[0, TOWER_BODY_H + 0.06, 0]}>
        <cylinderGeometry args={[0.22, 0.19, 0.12, 8]} />
        <meshStandardMaterial color={C.bSteel} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 4 Crown pinnacles */}
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
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}

      {/* Spire base + spire */}
      <mesh position={[0, TOWER_BODY_H + 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 6]} />
        <meshStandardMaterial
          color="#2a3555"
          metalness={0.9}
          roughness={0.1}
          emissive={C.winBright}
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0, TOWER_BODY_H + 0.9, 0]}>
        <cylinderGeometry args={[0.015, 0.05, 0.7, 4]} />
        <meshStandardMaterial
          color="#2a3555"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
      <pointLight
        position={[0, TOWER_BODY_H + 1.3, 0]}
        intensity={1.0}
        color="#ffffff"
        distance={6}
        decay={2}
      />
    </group>
  );
}

function PetronasTowers() {
  return (
    <group position={[0.3, 0, -3.2]}>
      <SingleTower xOff={-0.55} />
      <SingleTower xOff={0.55} />

      {/* Skybridge at ~40% height — the iconic feature */}
      <group position={[0, 2.1, 0]}>
        <mesh>
          <boxGeometry args={[0.85, 0.08, 0.15]} />
          <meshStandardMaterial
            color={C.bSteel}
            metalness={0.65}
            roughness={0.3}
            emissive="#a0c0e0"
            emissiveIntensity={0.08}
          />
        </mesh>
        {/* Support legs */}
        {[-0.22, 0.22].map((xo) => (
          <mesh key={xo} position={[xo, -0.15, 0]}>
            <boxGeometry args={[0.025, 0.25, 0.05]} />
            <meshStandardMaterial color={C.bSteel} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* Subtle skybridge accent light */}
        <pointLight
          position={[0, 0, 0.2]}
          intensity={0.3}
          color="#c0d8f0"
          distance={2}
          decay={2}
        />
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════
 *  KL TOWER (Menara KL)
 * ═══════════════════════════════════════════ */
function KLTower() {
  return (
    <group position={[-3, 0, -3.5]}>
      {/* Tripod base — 3 legs, scaled 1.3x */}
      {[0, 120, 240].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const lx = Math.cos(rad) * 0.2;
        const lz = Math.sin(rad) * 0.2;
        return (
          <mesh key={deg} position={[lx, 0.55, lz]}>
            <cylinderGeometry args={[0.05, 0.12, 1.1, 6]} />
            <meshStandardMaterial color={C.bSteel} metalness={0.6} roughness={0.35} />
          </mesh>
        );
      })}

      {/* Main shaft — tapers upward */}
      <mesh position={[0, 2.7, 0]}>
        <cylinderGeometry args={[0.08, 0.13, 4.2, 8]} />
        <meshStandardMaterial color={C.bSteel} metalness={0.65} roughness={0.3} />
      </mesh>

      {/* Observation pod — distinctive wider bulge */}
      <mesh position={[0, 3.8, 0]}>
        <cylinderGeometry args={[0.32, 0.16, 0.45, 12]} />
        <meshStandardMaterial
          color="#1e2a50"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 4.05, 0]}>
        <cylinderGeometry args={[0.16, 0.32, 0.2, 12]} />
        <meshStandardMaterial
          color="#1e2a50"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Upper shaft */}
      <mesh position={[0, 4.4, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.6, 6]} />
        <meshStandardMaterial color={C.bSteel} metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Antenna */}
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

      {/* Red aviation warning light */}
      <pointLight
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
 *  MERDEKA 118 — triangular supertall
 * ═══════════════════════════════════════════ */
function Merdeka118() {
  return (
    <group position={[3.5, 0, -3.8]}>
      {/* Main body — triangular prism, scaled 1.3x */}
      <mesh position={[0, 3.25, 0]}>
        <cylinderGeometry args={[0.16, 0.30, 6.5, 3]} />
        <meshStandardMaterial
          color={C.bGlass}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Tapered crown */}
      <mesh position={[0, 6.75, 0]}>
        <cylinderGeometry args={[0.04, 0.16, 0.65, 3]} />
        <meshStandardMaterial color={C.bGlass} metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Spire */}
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

      <pointLight
        position={[0, 7.7, 0]}
        intensity={0.5}
        color="#ffffff"
        distance={4}
        decay={2}
      />
    </group>
  );
}

/* ═══════════════════════════════════════════
 *  CITY BUILDINGS (generic)
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
          />
        </mesh>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════
 *  WINDOW LIGHTS — instanced, warm colors
 *  Placed ON building faces, not random in space
 * ═══════════════════════════════════════════ */
function WindowLights({ buildings }: { buildings: BDef[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const { positions, baseColors, speeds, count } = useMemo(() => {
    const pos: [number, number, number][] = [];
    const cols: THREE.Color[] = [];
    const spds: number[] = [];
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

    // Windows on generic buildings (front face — visible to camera)
    // Denser grid: smaller spacing, 45% lit
    for (const b of buildings) {
      const floorH = 0.10;
      const colW = 0.065;
      const floors = Math.max(2, Math.floor(b.h / floorH));
      const cols_per = Math.max(1, Math.floor(b.w / colW));
      for (let f = 1; f < floors; f++) {
        for (let c = 0; c < cols_per; c++) {
          if (r() > 0.45) continue; // 45% of windows lit
          pos.push([
            b.x + (c - cols_per / 2) * colW + colW / 2,
            f * floorH + 0.04,
            b.z + b.d / 2 + 0.003,
          ]);
          cols.push(pickColor());
          spds.push(0.2 + r() * 1.2);
        }
      }
    }

    // Windows on Petronas Towers — denser grid on front face
    const ptx = [0.3 - 0.55, 0.3 + 0.55];
    for (const tx of ptx) {
      for (let f = 0; f < 40; f++) {
        // Narrower columns closer together for octagonal look
        for (let c = -4; c <= 4; c++) {
          if (r() > 0.5) continue;
          // Taper width based on height (octagonal narrowing)
          const heightRatio = f / 40;
          const maxC = Math.ceil(4 * (1 - heightRatio * 0.35));
          if (Math.abs(c) > maxC) continue;
          pos.push([tx + c * 0.06, f * 0.12 + 0.1, -3.2 + 0.38]);
          cols.push(pickColor());
          spds.push(0.15 + r() * 0.8);
        }
      }
    }

    // Windows on Merdeka 118 — triangular taper
    for (let f = 0; f < 50; f++) {
      const heightRatio = f / 50;
      const maxC = Math.ceil(3 * (1 - heightRatio * 0.45));
      for (let c = -3; c <= 3; c++) {
        if (Math.abs(c) > maxC) continue;
        if (r() > 0.45) continue;
        pos.push([3.5 + c * 0.05, f * 0.13 + 0.1, -3.8 + 0.28]);
        cols.push(r() > 0.5 ? coolCol.clone() : warmCol.clone());
        spds.push(0.15 + r() * 0.8);
      }
    }

    // Windows on KL Tower pod — ring of windows
    for (let a = 0; a < 16; a++) {
      const angle = (a / 16) * Math.PI * 2;
      if (Math.cos(angle) < -0.2) continue;
      pos.push([
        -3 + Math.cos(angle) * 0.30,
        3.9,
        -3.5 + Math.sin(angle) * 0.30,
      ]);
      cols.push(warmCol.clone());
      spds.push(0.3 + r() * 0.5);
    }

    return { positions: pos, baseColors: cols, speeds: spds, count: pos.length };
  }, [buildings]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i]!;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Soft twinkle: mostly bright, occasionally dims
      const flicker = 0.5 + Math.sin(t * speeds[i]! + i * 0.7) * 0.5;
      // Multiply by 2.0 to push values > 1.0 for bloom trigger
      tempColor
        .copy(baseColors[i]!)
        .multiplyScalar(Math.max(0.1, flicker) * 2.0);
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
 *  CAMERA RIG — smooth mouse tracking
 * ═══════════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    smoothRef.current.x +=
      (mouseRef.current.x - smoothRef.current.x) * 0.03;
    smoothRef.current.y +=
      (mouseRef.current.y - smoothRef.current.y) * 0.03;
    camera.position.x = smoothRef.current.x * 1.2;
    camera.position.y = 3.2 + smoothRef.current.y * 0.5;
    camera.lookAt(0, 1.0, -3);
  });

  return null;
}

/* ═══════════════════════════════════════════
 *  SCENE — main export
 * ═══════════════════════════════════════════ */
export function SkylineScene() {
  const buildings = useMemo(() => createCity(), []);
  const { scene } = useThree();

  useMemo(() => {
    scene.fog = new THREE.FogExp2(C.fog, 0.025);
  }, [scene]);

  return (
    <>
      <CameraRig />

      {/* ─── Lighting: cinematic moonlight ─── */}
      <ambientLight intensity={0.15} color="#101830" />

      {/* Moonlight from behind-right (backlight/rim) — strong for silhouettes */}
      <directionalLight
        position={[6, 12, -6]}
        intensity={0.7}
        color="#4068b0"
      />

      {/* Rim light from behind-left — defines building edges */}
      <directionalLight
        position={[-6, 8, -8]}
        intensity={0.4}
        color="#3050a0"
      />

      {/* Fill from front-left — subtle */}
      <directionalLight
        position={[-5, 4, 4]}
        intensity={0.1}
        color="#304080"
      />

      {/* Hemisphere light for sky/ground color */}
      <hemisphereLight
        args={["#1a2040", "#080810", 0.12]}
      />

      {/* City ambient glow — warm from below */}
      <pointLight
        position={[0, 0.3, -3]}
        intensity={0.8}
        color="#1a1008"
        distance={16}
        decay={2}
      />
      <pointLight
        position={[-4, 0.3, -3]}
        intensity={0.4}
        color="#100c04"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[4, 0.3, -3]}
        intensity={0.4}
        color="#100c04"
        distance={12}
        decay={2}
      />

      {/* ─── Ground plane — wet asphalt feel ─── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial
          color={C.ground}
          metalness={0.7}
          roughness={0.5}
        />
      </mesh>

      {/* ─── City ─── */}
      <CityBuildings buildings={buildings} />

      {/* ─── Landmarks ─── */}
      <PetronasTowers />
      <KLTower />
      <Merdeka118 />

      {/* ─── Window lights ─── */}
      <WindowLights buildings={buildings} />
    </>
  );
}
