import { AppProvider } from "./AppProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Experience from "./components/sections/Experience.jsx";
import Projects from "./components/sections/Projects.jsx";
import LiveProjects from "./components/sections/LiveProjects.jsx";
import Skills from "./components/sections/Skills.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <AppProvider>
      <div className="relative min-h-screen">
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <LiveProjects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
