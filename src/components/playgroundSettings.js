// Playground settings, mutated by the panel sliders and read every frame by
// the R3F components in Background3D. Module-level so reads in useFrame
// don't trigger React re-renders. Exported as a separate file so the
// Playground component file can stay fast-refresh clean (only exports
// components / hooks).
export const playgroundSettings = {
  connectionDistance: 0.5,
  cameraRadius: 3,
  cameraOrbitSpeed: 0.12,
  rotationSpeed: 0.03,
  // null = particles rest on the shared sphere; otherwise the shape key
  // ('sphere' | 'cube') the user picked in the panel. Both shapes share
  // the same 294 indices.
  currentShape: null,
}

export const playgroundDefaults = { ...playgroundSettings }
