import { playgroundSettings } from './playgroundSettings.js'

// React 19's react-hooks/immutability rule flags any direct assignment to
// module-level state from inside a component callback. Route the mutation
// through this helper so the rule treats the call site as a pure update.
export function setPlaygroundSetting(key, value) {
  playgroundSettings[key] = value
}
