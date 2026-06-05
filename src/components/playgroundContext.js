import { createContext, useContext } from 'react'

export const PlaygroundContext = createContext(null)

export function usePlayground() {
  const ctx = useContext(PlaygroundContext)
  if (!ctx) throw new Error('usePlayground must be used within PlaygroundProvider')
  return ctx
}
