// Shapes for the playground. Each shape has a fixed set of particle
// indices, target positions, color, and pre-computed connections — all
// baked at module load, never recalculated at runtime.
//
// Shared geometry: sphere and cube use the same 600 indices. The point
// count is 6 * N * N where N=10 is the cube's per-face resolution, so the
// cube owns 10×10 = 100 points per face × 6 faces = 600. The sphere
// distributes those same 600 indices on its surface using a Fibonacci
// spiral, in the same 0..599 order.
//
// Tux is loaded at runtime from /tux.obj (whatever vertex count Blender
// exported). When Tux is active, indices [count..599) are "padding" and
// stay at the scattered home cloud around the penguin.

const N = 10
const PARTICLE_COUNT = 6 * N * N // 600

const COLORS = {
  sphere: { r: 0.04, g: 0.22, b: 0.92 }, // blue (linear RGB)
  cube: { r: 0.86, g: 0.06, b: 0.06 }, // red (linear RGB)
  tux: { r: 0.95, g: 0.5, b: 0.1 }, // orange
}

const LABELS = {
  sphere: 'Esfera',
  cube: 'Cubo',
  tux: 'Tux',
}

const KEYS = ['sphere', 'cube', 'tux']

// Local index always equals global index for sphere and cube (they own
// [0..599]). Tux owns [0..count-1] of whatever count was loaded; the
// remaining indices (count..599) are unused by Tux.
const buildIndices = (count) => Array.from({ length: count }, (_, i) => i)
const buildLocalMap = (indices) => new Map(indices.map((gi, li) => [gi, li]))

const INDICES = {
  sphere: buildIndices(PARTICLE_COUNT),
  cube: buildIndices(PARTICLE_COUNT),
  tux: null, // filled in by setTuxData()
}

const LOCAL_INDICES = {
  sphere: buildLocalMap(INDICES.sphere),
  cube: buildLocalMap(INDICES.cube),
  tux: null,
}

// --- Generators (deterministic, no Math.random) ---

function generateSphere(count, radius) {
  const positions = new Float32Array(count * 3)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

function generateCube(size) {
  // 6 faces × N×N grid of points. Face 0 is +X, 1 is -X, 2 is +Y, 3 is -Y,
  // 4 is +Z, 5 is -Z. The (i, j) grid is mapped to the face's tangent
  // plane; this keeps consecutive local indices forming a clean wireframe
  // when connected with 4-neighbors.
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const half = size / 2
  for (let face = 0; face < 6; face++) {
    const base = face * N * N
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const tu = N === 1 ? 0 : (i / (N - 1)) * 2 - 1
        const tv = N === 1 ? 0 : (j / (N - 1)) * 2 - 1
        const u = tu * half
        const v = tv * half
        let x, y, z
        switch (face) {
          case 0:
            x = half; y = v; z = -u; break // +X
          case 1:
            x = -half; y = v; z = u; break // -X
          case 2:
            x = u; y = half; z = v; break // +Y
          case 3:
            x = u; y = -half; z = -v; break // -Y
          case 4:
            x = u; y = v; z = half; break // +Z
          default:
            x = -u; y = v; z = -half // -Z
        }
        const idx = base + j * N + i
        positions[idx * 3] = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z
      }
    }
  }
  return positions
}

function generateSphereConnections(positions, threshold) {
  // Distance-based sphere wireframe. Threshold tuned for 600 points:
  // sqrt(294/600) ≈ 0.7 of the 294-era 1.4 keeps the visual density
  // similar (≈5-6 neighbors per point).
  const connections = []
  const count = positions.length / 3
  const thresholdSq = threshold * threshold
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < thresholdSq) {
        connections.push([i, j])
      }
    }
  }
  return connections
}

function generateCubeConnections() {
  // 4-neighbor grid within each of the 6 faces. The 12 cube edges
  // between adjacent faces aren't bridged — the 6 face grids already
  // read as a clear cube at this resolution.
  const connections = []
  for (let face = 0; face < 6; face++) {
    const base = face * N * N
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const a = base + j * N + i
        if (i + 1 < N) connections.push([a, base + j * N + (i + 1)])
        if (j + 1 < N) connections.push([a, base + (j + 1) * N + i])
      }
    }
  }
  return connections
}

const POSITIONS = {
  sphere: generateSphere(PARTICLE_COUNT, 4),
  cube: generateCube(4),
  tux: null, // filled in by setTuxData()
}

const CONNECTIONS = {
  sphere: generateSphereConnections(POSITIONS.sphere, 1.0),
  cube: generateCubeConnections(),
  tux: [],
}

// Pre-compute pair-key maps for fast "is this pair already in the shape
// wireframe?" checks in the render loop. Key = min(i,j) * count + max(i,j).
function buildConnectionPairs(connections) {
  const m = new Map()
  for (let c = 0; c < connections.length; c++) {
    const pair = connections[c]
    const a = pair[0]
    const b = pair[1]
    const k = (a < b ? a : b) * PARTICLE_COUNT + (a < b ? b : a)
    m.set(k, true)
  }
  return m
}

const CONNECTION_PAIRS = {
  sphere: buildConnectionPairs(CONNECTIONS.sphere),
  cube: buildConnectionPairs(CONNECTIONS.cube),
  tux: new Map(),
}

// --- Tux (runtime-loaded from /tux.obj) ---
//
// TUX_VERTEX_SCALE brings the imported ~4-unit model up to the same
// visual scale as sphere (radius 4) and cube (size 4).

const TUX_VERTEX_SCALE = 2.0

const TUX_STATE = { loaded: false, count: 0, failed: false }
const tuxListeners = new Set()

function emitTuxState() {
  for (const fn of tuxListeners) fn(TUX_STATE)
}

export function getTuxState() {
  return TUX_STATE
}

export function onTuxStateChange(fn) {
  tuxListeners.add(fn)
  return () => tuxListeners.delete(fn)
}

export function setTuxData(positions, edges) {
  // positions: Float32Array of length count * 3 (raw .obj coords)
  // edges:     Array<[i, j]> of unique undirected edges (0-indexed)
  const scaled = new Float32Array(positions.length)
  for (let i = 0; i < positions.length; i++) {
    scaled[i] = positions[i] * TUX_VERTEX_SCALE
  }
  const count = scaled.length / 3
  INDICES.tux = buildIndices(count)
  LOCAL_INDICES.tux = buildLocalMap(INDICES.tux)
  POSITIONS.tux = scaled
  CONNECTIONS.tux = edges
  CONNECTION_PAIRS.tux = buildConnectionPairs(edges)
  TUX_STATE.loaded = true
  TUX_STATE.count = count
  TUX_STATE.failed = false
  emitTuxState()
}

export function setTuxFailed() {
  TUX_STATE.failed = true
  emitTuxState()
}

// --- .obj parser (Wavefront) ---
// Reads vertices (`v x y z`) and faces (`f i j k` with optional `/vt/vn`),
// returns positions as a flat Float32Array and the unique undirected edges
// of each polygon's outline.
export function parseObj(text) {
  const vertices = []
  const edgeSet = new Set()
  const lines = text.split('\n')
  for (let n = 0; n < lines.length; n++) {
    const line = lines[n]
    const first = line.charCodeAt(0)
    // 'v' = 118, 'f' = 102, ' ' = 32 (skip "vn", "vt", "vn ", etc.)
    if (first === 118 && line.charCodeAt(1) === 32) {
      const parts = line.split(/\s+/)
      vertices.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]))
    } else if (first === 102 && line.charCodeAt(1) === 32) {
      // Face token can be "1", "1/2", "1/2/3", "1//3" — keep only the
      // vertex index (part before the first '/'), 0-based.
      const tokens = line.split(/\s+/).slice(1)
      const indices = []
      for (const tok of tokens) {
        const slash = tok.indexOf('/')
        const v = parseInt(slash >= 0 ? tok.substring(0, slash) : tok, 10) - 1
        if (!Number.isFinite(v) || v < 0) {
          indices.length = 0
          break
        }
        indices.push(v)
      }
      if (indices.length < 2) continue
      // Polygon outline: edge between every consecutive pair, closing
      // the loop from the last vertex back to the first.
      for (let i = 0; i < indices.length; i++) {
        const a = indices[i]
        const b = indices[(i + 1) % indices.length]
        if (a === b) continue
        const lo = a < b ? a : b
        const hi = a < b ? b : a
        edgeSet.add(lo * 1000000 + hi)
      }
    }
  }
  // Convert edge set to pair array
  const edges = new Array(edgeSet.size)
  let e = 0
  for (const key of edgeSet) {
    edges[e++] = [Math.floor(key / 1000000), key % 1000000]
  }
  return { positions: new Float32Array(vertices), edges }
}

export const SHAPE_KEYS = KEYS
export const SHAPE_LABELS = LABELS
export const SHAPE_COLORS = COLORS
export const SHAPE_INDICES = INDICES
export const SHAPE_LOCAL_INDICES = LOCAL_INDICES
export const SHAPE_POSITIONS = POSITIONS
export const SHAPE_CONNECTIONS = CONNECTIONS
export const SHAPE_CONNECTION_PAIRS = CONNECTION_PAIRS
export const SHAPE_PARTICLE_COUNT = PARTICLE_COUNT
