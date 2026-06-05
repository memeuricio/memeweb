import { useCallback, useEffect, useState } from 'react'
import { PlaygroundContext } from './playgroundContext.js'

export function PlaygroundProvider({ children }) {
  const [active, setActive] = useState(false)
  const toggle = useCallback(() => setActive((v) => !v), [])
  const close = useCallback(() => setActive(false), [])

  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <PlaygroundContext.Provider value={{ active, toggle, setActive, close }}>
      {children}
    </PlaygroundContext.Provider>
  )
}
