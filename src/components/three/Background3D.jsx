/* eslint-disable react-hooks/immutability */
// R3F's `useFrame` callback intentionally mutates three.js typed-array buffers
// in place each frame for performance. React 19's immutability rules don't model
// imperative render-loop patterns, so we disable them for this file only.
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from './scrollState.js'
import { playgroundSettings } from '../playgroundSettings.js'
import { usePlayground } from '../playgroundContext.js'
import {
  SHAPE_COLORS,
  SHAPE_POSITIONS,
  SHAPE_CONNECTIONS,
  SHAPE_CONNECTION_PAIRS,
  SHAPE_PARTICLE_COUNT,
  parseObj,
  setTuxData,
  setTuxFailed,
} from '../playground/shapes.js'

const PARTICLE_COUNT = SHAPE_PARTICLE_COUNT
const MAX_LINES = PARTICLE_COUNT * PARTICLE_COUNT

// Camera orbits around the Y axis. Tunable at the top:
//   MAX_ANGLE   total rotation in radians for scroll-based orbit (Math.PI = 180°)
//   Y_DIP       small vertical lift at the middle of the page
//   SMOOTHING   how fast the camera catches up to the scroll target (0..1)
const MAX_ANGLE = Math.PI
const Y_DIP = 0.45
const SMOOTHING = 0.06

// Per-frame interpolation speeds. Lower = slower transition between
// states. At 60fps, 0.03 reaches ~99% closure in ~2.5s.
const POS_LERP = 0.03
const COLOR_LERP = 0.015

// Cyan home color (when no shape is active — the scattered cloud)
const HOME_R = 0.4
const HOME_G = 0.91
const HOME_B = 0.98

// Reused empty pair-map for the "at home" branch — avoids re-allocating
// an empty Map every frame.
const EMPTY_MAP = new Map()

function ScrollCamera() {
  const { active } = usePlayground()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const radius = playgroundSettings.cameraRadius
    const cam = state.camera

    if (active) {
      const angle = t * playgroundSettings.cameraOrbitSpeed
      cam.position.x = Math.sin(angle) * radius
      cam.position.z = Math.cos(angle) * radius
      cam.position.y = Math.sin(t * 0.4) * 0.3
    } else {
      scrollState.progress += (scrollState.target - scrollState.progress) * SMOOTHING
      const angle = scrollState.progress * MAX_ANGLE
      cam.position.x = Math.sin(angle) * radius
      cam.position.z = Math.cos(angle) * radius
      cam.position.y = Math.sin(scrollState.progress * Math.PI) * Y_DIP
    }

    cam.lookAt(0, 0, 0)
  })
  return null
}

function ParticleNetwork() {
  const groupRef = useRef()
  const linesRef = useRef()
  const pointsGeomRef = useRef()
  const frameCount = useRef(0)

  // Load Tux mesh from /tux.obj on mount. Fills the SHAPE_POSITIONS.tux
  // (and friends) entries in shapes.js — if the fetch fails, Tux stays
  // unavailable and the panel shows a hint.
  useEffect(() => {
    let cancelled = false
    fetch('/tux.obj')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.text()
      })
      .then((text) => {
        if (cancelled) return
        const { positions, edges } = parseObj(text)
        setTuxData(positions, edges)
      })
      .catch((err) => {
        if (cancelled) return
        console.warn('Tux mesh not available:', err.message)
        setTuxFailed()
      })
    return () => {
      cancelled = true
    }
  }, [])

  const [buffers] = useState(() => {
    // Home positions: 294 particles scattered in a sphere of radius 4.5,
    // uniformly distributed in volume (cbrt for the radial bias). This
    // is the rest state — particles return here when no shape is active.
    const home = new Float32Array(PARTICLE_COUNT * 3)
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const homeRadius = 4.5
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const r = homeRadius * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      home[i3] = x
      home[i3 + 1] = y
      home[i3 + 2] = z
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
    }

    // Colors start at the cyan home color; the per-frame lerp moves each
    // particle to its active shape's color when one is selected.
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      colors[i * 3] = HOME_R
      colors[i * 3 + 1] = HOME_G
      colors[i * 3 + 2] = HOME_B
    }

    return {
      positions,
      home,
      colors,
      linePositions: new Float32Array(MAX_LINES * 3),
      lineColors: new Float32Array(MAX_LINES * 4),
    }
  })

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const { positions, home, colors, linePositions, lineColors } = buffers

    // Resolve active shape. `null` = scattered home (no shape wireframe).
    // Tux's positions may still be null while the .obj is loading — in
    // that case shapeCount is 0 and every particle stays at home.
    const requested = playgroundSettings.currentShape
    const atHome = !requested
    const activeColor = atHome ? null : SHAPE_COLORS[requested]
    const activePositions = atHome ? null : SHAPE_POSITIONS[requested]
    const shapeCount = activePositions ? activePositions.length / 3 : 0
    const activeConnections = atHome ? [] : SHAPE_CONNECTIONS[requested] || []
    const activePairMap = atHome
      ? EMPTY_MAP
      : SHAPE_CONNECTION_PAIRS[requested] || EMPTY_MAP

    // Move every particle to its target. Indices [0..shapeCount) belong
    // to the active shape; the rest fall back to the home cloud (this
    // handles both `currentShape === null` and shapes with fewer vertices
    // than the pool, like Tux with 568 of 600).
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      let tx, ty, tz, tr, tg, tb
      if (i < shapeCount) {
        tx = activePositions[i3]
        ty = activePositions[i3 + 1]
        tz = activePositions[i3 + 2]
        tr = activeColor.r
        tg = activeColor.g
        tb = activeColor.b
      } else {
        tx = home[i3]
        ty = home[i3 + 1] + Math.sin(t * 0.6 + i) * 0.05
        tz = home[i3 + 2]
        tr = HOME_R
        tg = HOME_G
        tb = HOME_B
      }
      positions[i3] += (tx - positions[i3]) * POS_LERP
      positions[i3 + 1] += (ty - positions[i3 + 1]) * POS_LERP
      positions[i3 + 2] += (tz - positions[i3 + 2]) * POS_LERP

      colors[i3] += (tr - colors[i3]) * COLOR_LERP
      colors[i3 + 1] += (tg - colors[i3 + 1]) * COLOR_LERP
      colors[i3 + 2] += (tb - colors[i3 + 2]) * COLOR_LERP
    }

    if (pointsGeomRef.current) {
      pointsGeomRef.current.attributes.position.needsUpdate = true
      pointsGeomRef.current.attributes.color.needsUpdate = true
    }

    if (groupRef.current) {
      const speed = playgroundSettings.rotationSpeed
      groupRef.current.rotation.y = t * speed
      groupRef.current.rotation.x = Math.sin(t * speed * 1.3) * 0.08
    }

    // Throttle line rebuild to 30Hz. Two sources of lines each frame:
    //   1) Pre-defined connections of the active shape (drawn in the
    //      shape's color, bright — these form the wireframe of the figure)
    //   2) Distance-based "background" connections (subtle) for pairs
    //      the shape wireframe doesn't already cover.
    frameCount.current++
    if (frameCount.current % 2 === 0 && linesRef.current) {
      let lineIndex = 0
      let colorIndex = 0
      const pos = positions
      const cols = colors

      // 1) Shape's pre-defined connections (always drawn, shape color)
      for (let c = 0; c < activeConnections.length; c++) {
        const pair = activeConnections[c]
        const i3 = pair[0] * 3
        const j3 = pair[1] * 3

        linePositions[lineIndex++] = pos[i3]
        linePositions[lineIndex++] = pos[i3 + 1]
        linePositions[lineIndex++] = pos[i3 + 2]
        linePositions[lineIndex++] = pos[j3]
        linePositions[lineIndex++] = pos[j3 + 1]
        linePositions[lineIndex++] = pos[j3 + 2]

        lineColors[colorIndex++] = activeColor.r
        lineColors[colorIndex++] = activeColor.g
        lineColors[colorIndex++] = activeColor.b
        lineColors[colorIndex++] = 0.85
        lineColors[colorIndex++] = activeColor.r
        lineColors[colorIndex++] = activeColor.g
        lineColors[colorIndex++] = activeColor.b
        lineColors[colorIndex++] = 0.85
      }

      // 2) Background connections (distance-based, subtle) — only between
      // pairs the active shape wireframe doesn't already cover.
      const dist = playgroundSettings.connectionDistance
      const distSq = dist * dist
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const ax = pos[i3], ay = pos[i3 + 1], az = pos[i3 + 2]
        const r1 = cols[i3], g1 = cols[i3 + 1], b1 = cols[i3 + 2]
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const j3 = j * 3
          const dx = ax - pos[j3]
          const dy = ay - pos[j3 + 1]
          const dz = az - pos[j3 + 2]
          const distSq2 = dx * dx + dy * dy + dz * dz
          if (distSq2 < distSq) {
            const pairKey = i * PARTICLE_COUNT + j
            if (activePairMap.has(pairKey)) continue

            const r2 = cols[j3], g2 = cols[j3 + 1], b2 = cols[j3 + 2]
            const avgR = (r1 + r2) * 0.5
            const avgG = (g1 + g2) * 0.5
            const avgB = (b1 + b2) * 0.5
            const distFalloff = 1 - Math.sqrt(distSq2) / dist
            const alpha = 0.18 * (0.5 + 0.5 * distFalloff)

            linePositions[lineIndex++] = ax
            linePositions[lineIndex++] = ay
            linePositions[lineIndex++] = az
            linePositions[lineIndex++] = pos[j3]
            linePositions[lineIndex++] = pos[j3 + 1]
            linePositions[lineIndex++] = pos[j3 + 2]

            lineColors[colorIndex++] = avgR
            lineColors[colorIndex++] = avgG
            lineColors[colorIndex++] = avgB
            lineColors[colorIndex++] = alpha
            lineColors[colorIndex++] = avgR
            lineColors[colorIndex++] = avgG
            lineColors[colorIndex++] = avgB
            lineColors[colorIndex++] = alpha
          }
        }
      }

      linesRef.current.geometry.setDrawRange(0, lineIndex / 3)
      linesRef.current.geometry.attributes.position.needsUpdate = true
      linesRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={pointsGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={buffers.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={buffers.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={MAX_LINES}
            array={buffers.linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={MAX_LINES}
            array={buffers.lineColors}
            itemSize={4}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

export default function Background3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ScrollCamera />
        <ParticleNetwork />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617]" />
    </div>
  )
}
