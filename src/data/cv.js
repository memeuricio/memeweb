export const cv = {
  name: "Mauricio Flores",
  initials: "MF",
  role: "Full Stack Web Developer",
  taglines: [
    "Construyo experiencias web rápidas, accesibles y visualmente cuidadas.",
    "Apasionado por el frontend moderno, el código limpio y los productos que se sienten vivos.",
    "Disponible para nuevos proyectos, colaboraciones y retos interesantes.",
    "Buscando impulsar mi carrera con nuevos desafios y tecnologias.",
    "Fanatico del Open Source.",
    "In T U X we trust",
  ],
  location: "Chile · Remoto - Presencial",
  status: "Disponible para nuevos proyectos",
  email: "mauricio.floresbr@gmail.com",
  phone: "+529 7396 1688",
  socials: [
    { label: "GitHub", href: "https://github.com/memeuricio", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mauricio-flores-barros-20328b286/", icon: "linkedin" },
    { label: "Email", href: "mailto:mauricio.floresbr@gmail.com", icon: "mail" },
  ],
  about:
    "Soy desarrollador web con foco en el ecosistema JavaScript. Me gusta trabajar en la intersección entre diseño y código: interfaces que se ven bien, se sienten fluidas y están construidas sobre arquitecturas sólidas. Disfruto jugar con datos, integrar plataformas no convencionales y busco contribuir a proyectos open source.",
  experience: [
    {
      company: "Stade Francais",
      role: "Full Stack Developer",
      period: "Jun 2025 — Actualidad",
      location: "Presencial",
      bullets: [
        "Desarrollo de plataformas analiticas y de recolección de datos.",
        "Reportes automatizados y optimización de procesos.",
        "Modelado de base de datos",
        "Desarrollo backend enfocado en seguridad",
        "Integraciones API REST y SocketIO"
      ],
      stack: ["React", "Vite", "Tailwind", "Three.js", "Postgres", "Express"],
    },
    {
      company: "Freelance",
      role: "Full Stack Developer",
      period: "Jun 2024 — Jun 2025",
      location: "Remoto",
      bullets: [
        "Desarrollé plataformas SaaS para clientes en fintech y edtech, de discovery a producción.",
        "Implementé integraciones con Stripe, OAuth y pipelines de despliegue continuo en Vercel.",
        "Construí un CMS headless interno que redujo el time-to-market de landings en 60%.",
      ],
      stack: ["Next.js", "Node", "PostgreSQL", "Prisma", "AWS"],
    },
    {
      company: "Freelance",
      role: "Full Stack Developer",
      period: "Oct 2024 — 2024",
      location: "Remoto",
      bullets: [
        "Más de 20 proyectos entregados para pequeñas empresas y creativos.",
        "Sitios a medida, e-commerce en Shopify y webs interactivas con animaciones.",
        "Foco en accesibilidad, performance y SEO técnico.",
      ],
      stack: ["React", "Gatsby", "Shopify", "Sanity"],
    },
  ],
  skills: {
    Frontend: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Three.js / R3F", level: 70 },
    ],
    Backend: [
      { name: "Node.js", level: 85 },
      { name: "Express / Fastify", level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "Prisma / Drizzle", level: 82 },
      { name: "GraphQL", level: 70 },
    ],
    Herramientas: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 70 },
      { name: "Vercel / AWS", level: 80 },
      { name: "Figma", level: 75 },
      { name: "Testing (Vitest, Playwright)", level: 78 },
    ],
  },
  projects: [
    {
      title: "Atlas UI",
      description:
        "Sistema de diseño open source con +60 componentes accesibles, dark mode y theming por tokens.",
      tags: ["React", "Storybook", "Radix"],
      link: "#",
      repo: "#",
      highlight: "1.2k★ en GitHub",
    },
    {
      title: "Pulse Analytics",
      description:
        "Dashboard en tiempo real para visualizar métricas de producto con visualizaciones 3D interactivas.",
      tags: ["Next.js", "Three.js", "D3", "WebSockets"],
      link: "#",
      repo: "#",
      highlight: "Featured en Vercel Showcase",
    },
    {
      title: "Murmur",
      description:
        "Cliente de chat minimalista con cifrado end-to-end y sincronización offline-first.",
      tags: ["React Native", "WebCrypto", "IndexedDB"],
      link: "#",
      repo: "#",
      highlight: "Side project #1",
    },
    {
      title: "Field Notes",
      description:
        "Editor tipo Notion optimizado para escritura técnica, con bloques custom y export a MDX.",
      tags: ["Tiptap", "Remix", "SQLite"],
      link: "#",
      repo: "#",
      highlight: "10k usuarios activos",
    },
  ],
  education: [
    {
      school: "Ingeniería en Informatica",
      detail: "Duoc UC · 2019 — 2023",
    },
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "C1 Advanced" },
  ],
}

export const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contacto", href: "#contact" },
]
