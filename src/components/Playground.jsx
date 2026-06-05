import { useEffect, useState } from 'react'
import { playgroundSettings, playgroundDefaults as DEFAULTS } from './playgroundSettings.js'
import { setPlaygroundSetting } from './playgroundActions.js'
import { usePlayground } from './playgroundContext.js'
import { SHAPE_KEYS, SHAPE_LABELS, onTuxStateChange } from './playground/shapes.js'

// --- Toggle button (gamepad icon) ---

export function PlaygroundToggle({ className = '' }) {
  const { active, toggle } = usePlayground()
  return (
    <button
      onClick={toggle}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent-500/30 bg-bg-800/60 text-accent-300 transition-all hover:border-accent-400 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] ${
        active
          ? 'border-accent-400 text-accent-300 shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]'
          : ''
      } ${className}`}
      aria-label={active ? 'Salir del playground' : 'Abrir playground'}
      title="Playground"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="11" x2="10" y2="11" />
        <line x1="8" y1="9" x2="8" y2="13" />
        <line x1="15" y1="12" x2="15.01" y2="12" />
        <line x1="18" y1="10" x2="18.01" y2="10" />
        <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258A4 4 0 0 0 17.32 5z" />
      </svg>
    </button>
  )
}

// --- Side panel ---

export function PlaygroundPanel() {
  const { active, close } = usePlayground()
  const [settings, setSettings] = useState({ ...playgroundSettings })
  const [tuxState, setTuxState] = useState({ loaded: false, count: 0, failed: false })
  useEffect(() => onTuxStateChange(setTuxState), [])

  const update = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }))
    setPlaygroundSetting(key, value)
  }

  const reset = () => {
    setSettings({ ...DEFAULTS })
    Object.assign(playgroundSettings, DEFAULTS)
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-500 ${
          active ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-40 flex h-screen w-full flex-col border-l border-accent-500/20 bg-bg-800 shadow-2xl transition-transform duration-500 ease-out sm:w-96 ${
          active ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!active}
      >
        <header className="flex items-center justify-between border-b border-slate-800/60 px-5 py-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent-400">
              [playground]
            </div>
            <h2 className="mt-1 text-lg font-semibold text-slate-100">Controles del fondo</h2>
          </div>
          <button
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-700/60 text-slate-300 transition-all hover:border-accent-400 hover:text-accent-300"
            aria-label="Cerrar playground"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-4">
            <ControlGroup
              label="Formas"
              hint="Esfera y cubo comparten 600 puntos. Tux carga vértices y aristas desde /tux.obj."
            >
              <div className="flex flex-col gap-2">
                {SHAPE_KEYS.map((key) => {
                  const tuxHint =
                    key === 'tux'
                      ? tuxState.failed
                        ? ' (no disponible)'
                        : tuxState.loaded
                          ? ` (${tuxState.count} pts)`
                          : ' (cargando...)'
                      : ''
                  return (
                    <button
                      key={key}
                      onClick={() => update('currentShape', key)}
                      className={`rounded-lg border px-3 py-2 font-mono text-xs transition-all ${
                        settings.currentShape === key
                          ? 'border-accent-400 bg-accent-500/20 text-accent-300 shadow-[0_0_16px_-6px_rgba(34,211,238,0.6)]'
                          : 'border-slate-700/60 bg-bg-800/40 text-slate-300 hover:border-accent-400/60 hover:text-accent-300'
                      }`}
                    >
                      {SHAPE_LABELS[key]}
                      <span className="text-slate-500">{tuxHint}</span>
                    </button>
                  )
                })}
                <button
                  onClick={() => update('currentShape', null)}
                  className="mt-1 rounded-lg border border-slate-700/60 bg-bg-800/40 px-3 py-2 font-mono text-xs text-slate-300 transition-all hover:border-accent-400/60 hover:text-accent-300"
                >
                  ↺ C H A O S
                </button>
              </div>
            </ControlGroup>

            <ControlGroup
              label="Conexiones"
              hint="Distancia máxima entre partículas para conectar"
            >
              <Slider
                label="Distancia"
                value={settings.connectionDistance}
                min={0.5}
                max={3}
                step={0.05}
                onChange={(v) => update('connectionDistance', v)}
              />
            </ControlGroup>

            <ControlGroup label="Cámara" hint="Distancia al centro de la escena">
              <Slider
                label="Radio"
                value={settings.cameraRadius}
                min={3}
                max={12}
                step={0.25}
                onChange={(v) => update('cameraRadius', v)}
              />
            </ControlGroup>

            <ControlGroup
              label="Auto-órbita"
              hint="Velocidad de rotación automática (solo activa en playground)"
            >
              <Slider
                label="Velocidad"
                value={settings.cameraOrbitSpeed}
                min={0}
                max={0.5}
                step={0.01}
                onChange={(v) => update('cameraOrbitSpeed', v)}
              />
            </ControlGroup>

            <ControlGroup
              label="Rotación ambient"
              hint="Velocidad de rotación lenta del grupo de partículas"
            >
              <Slider
                label="Velocidad"
                value={settings.rotationSpeed}
                min={0}
                max={0.1}
                step={0.005}
                onChange={(v) => update('rotationSpeed', v)}
              />
            </ControlGroup>

            <button
              onClick={reset}
              className="w-full rounded-xl border border-slate-700/60 bg-bg-800/40 px-4 py-2.5 font-mono text-xs text-slate-300 transition-all hover:border-accent-400 hover:text-accent-300"
            >
              ↺ Reset a defaults
            </button>
          </div>
        </div>

        <footer className="border-t border-slate-800/60 px-5 py-3 font-mono text-[10px] text-slate-600">
          <span className="text-accent-glow">●</span> playground mode · cambios en vivo
        </footer>
      </aside>
    </>
  )
}

// --- Internal components ---

function ControlGroup({ label, hint, children }) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-bg-800/40 p-4">
      <div className="mb-3">
        <div className="font-mono text-[11px] uppercase tracking-widest text-accent-400">
          {label}
        </div>
        {hint && <div className="mt-0.5 text-xs text-slate-500">{hint}</div>}
      </div>
      {children}
    </div>
  )
}

function Slider({ label, value, min, max, step, onChange, format = (v) => v.toFixed(2) }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-mono text-xs">
        <span className="text-slate-300">{label}</span>
        <span className="text-accent-300">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="pg-slider w-full"
      />
    </div>
  )
}
