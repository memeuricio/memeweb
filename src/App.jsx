import { useEffect } from 'react'
import Background3D from './components/three/Background3D.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Experience from './components/sections/Experience.jsx'
import Projects from './components/sections/Projects.jsx'
import Skills from './components/sections/Skills.jsx'
import Contact from './components/sections/Contact.jsx'
import { scrollState } from './components/three/scrollState.js'
import { PlaygroundProvider } from './components/playgroundContext.jsx'
import { PlaygroundPanel } from './components/Playground.jsx'
import { usePlayground } from './components/playgroundContext.js'

function App() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollState.target = max > 0 ? window.scrollY / max : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <PlaygroundProvider>
      <div className="relative">
        <Background3D />
        <Navbar />
        <AppContent />
        <PlaygroundPanel />
      </div>
    </PlaygroundProvider>
  )
}

function AppContent() {
  const { active } = usePlayground()
  return (
    <div
      className={`relative z-10 transition-all duration-500 ease-out ${
        active
          ? 'pointer-events-none -translate-x-12 scale-[0.98] opacity-0 blur-sm'
          : 'translate-x-0 scale-100 opacity-100 blur-0'
      }`}
    >
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
