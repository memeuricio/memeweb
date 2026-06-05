// Shared scroll progress for the 3D background camera.
// `target` is updated by the App scroll handler (window scroll).
// `progress` is the smoothed value updated every frame by the ScrollCamera
// component. Module-level so multiple components can read it without
// re-rendering.
export const scrollState = {
  progress: 0,
  target: 0,
}
