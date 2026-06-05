import { useEffect, useRef, useState } from 'react'

// Pool of candidate chars. Tunables at the top:
//   IDLE_MS              how long the settled phrase stays readable
//   TRANSITION_MS        how long the scramble → reveal animation takes
//   MAX_SETTLE           max fraction of the transition a char may stay scrambled (0..1)
//   BIAS                 left-to-right bias on the per-char settle time
//   SCRAMBLE_INTERVAL_MS how often scrambling chars update (lower = faster tick)
const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+-={}[]<>?/'
const IDLE_MS = 10000
const TRANSITION_MS = 900
const MAX_SETTLE = 0.7
const BIAS = 0.3
const SCRAMBLE_INTERVAL_MS = 50

// Pre-mixed pool of random chars, computed once at module load. The hot
// path (per char, per tick) just hashes (tick, position) into this pool,
// so we never call Math.random() during the animation loop.
const POOL = (() => {
  const arr = new Array(4096)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }
  return arr
})()

function scrambleChar(tick, position) {
  const h = (tick * 2654435761 + position * 40503) >>> 0
  return POOL[h % POOL.length]
}

function buildDisplay(target, progress, settleTimes, tick) {
  let next = ''
  for (let i = 0; i < target.length; i++) {
    const ch = target[i]
    if (ch === ' ') {
      next += ' '
      continue
    }
    if (progress >= settleTimes[i]) {
      next += ch
    } else {
      next += scrambleChar(tick, i)
    }
  }
  return next
}

export default function MatrixTagline({ phrases, className }) {
  const [display, setDisplay] = useState(phrases[0])
  const [settled, setSettled] = useState(phrases[0])
  const state = useRef({
    index: 0,
    phase: 'idle',
    lastChange: 0,
    transitionStart: 0,
    settleTimes: [],
  })

  useEffect(() => {
    let raf
    let scrambleTick = 0
    let lastScrambleAt = 0
    state.current.lastChange = performance.now()

    const animate = (now) => {
      const s = state.current
      const target = phrases[s.index]

      if (s.phase === 'idle') {
        if (now - s.lastChange >= IDLE_MS) {
          const len = target.length
          s.settleTimes = new Array(len)
          for (let i = 0; i < len; i++) {
            const t = (i / Math.max(1, len)) * BIAS + Math.random() * MAX_SETTLE
            s.settleTimes[i] = Math.min(MAX_SETTLE, t)
          }
          s.transitionStart = now
          s.phase = 'scrambling'

          // Immediate first scramble tick so the break is visible right away
          scrambleTick++
          setDisplay(buildDisplay(target, 0, s.settleTimes, scrambleTick))
          lastScrambleAt = now
        }
      } else {
        const elapsed = now - s.transitionStart
        const progress = Math.min(1, elapsed / TRANSITION_MS)

        // Throttle: only rebuild the display every SCRAMBLE_INTERVAL_MS,
        // decoupled from the rAF frame rate. Settle progress is still
        // time-based so the reveal wave stays accurate.
        if (now - lastScrambleAt >= SCRAMBLE_INTERVAL_MS) {
          lastScrambleAt = now
          scrambleTick++
          setDisplay(buildDisplay(target, progress, s.settleTimes, scrambleTick))
        }

        if (progress >= 1) {
          setSettled(target)
          setDisplay(target)
          s.lastChange = now
          s.index = (s.index + 1) % phrases.length
          s.phase = 'idle'
        }
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [phrases])

  return (
    <>
      <p aria-hidden="true" className={className}>
        {display}
      </p>
      <span className="sr-only">{settled}</span>
    </>
  )
}
