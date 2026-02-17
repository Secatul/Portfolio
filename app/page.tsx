"use client"

import { useEffect, useRef, useState } from "react"

const CONFIG = {
  name: "Secatul",

  navLinks: [
    // { label: "LABS", url: "/labs", internal: true },
    { label: "YOUTUBE", url: "https://youtube.com/@secatul_com" },
    { label: "GITHUB", url: "https://github.com/secatul" },
  ],

  about: `Olá! Sou Secatul, desenvolvedor web. Já fiz diversos projetos com React, JavaScript, NodeJS e React Native, Estou sempre buscando aprender algo novo. Atualmente em busca de uma oportunidade em Cybersegurança, venho aprendendo técnicas de SOC e também pentesting, atualmente aprendendo redes, linux e conceitos de cyber.`,

  languages: ["Python", "JavaScript", "TypeScript"],

  tools: ["Git", "Linux", "OpenGL", "Node.js", "React", "Docker"],

  education: [
    {
      institution: "Universidade UNESA",
      course: "Ciência da Computação",
      period: "2022 - 2026",
      status: "Concluído",
    },
  ],

  certificates: [
    {
      name: "Responsive Web Design Developer Certification",
      issuer: "FreeCodeCamp",
      year: "2022",
      url: "",
    },
    {
      name: "Pre Security Certificate",
      issuer: "TryHackMe",
      year: "2025",
      url: "",
    },
    {
      name: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      year: "2025",
      url: "",
    },
    {
      name: "Network Technician Career Path",
      issuer: "Cisco",
      year: "2025",
      url: "",
    },
  ],

  projects: [
    {
      id: "fast-free-tools",
      title: "FastFreeTools",
      shortDescription: "Diversas ferramentas úteis para o dia dia.",
      longAbout: "Criado usando Next e internacionalização, FastFreeTools tem ferramentas como, Counter, Base64 encoder, Word counter, Gerador de senhas e diversas outras ferramentas",
      features: [
        "Paginas geradas dinamicamente",
        "Design responsivo",
        "Internacionalização",
        "Acessibilidade e sanitização",
      ],
      githubUrl: "https://github.com/Secatul/FastFreeTools",
      demoUrl: "https://fast-free-tools.vercel.app/en",
    },
    {
      id: "password-generator",
      title: "Gerador de senhas",
      shortDescription: "Gerador de senhas criado usando electron.",
      longAbout: "Criei um gerador de senhas simples como App usando o Electron, você pode gerar uma senha aleatória com letras maiúsculas, minúsculas, caracteres, números e do tamanho que quiser, deixando ela o mais forte possível",
      features: [
        "Gera senhas automaticamente",
        "Senhas de tamanhos diferentes melhorando a segurança",
        "Acese pelo PC como App",
      ],
      githubUrl: "https://github.com/Secatul/PassGen",
      demoUrl: "",
    },
    {
      id: "pos-inventory",
      title: "POS Inventory",
      shortDescription: "Aplicativo mobile de controle de vendas e estoque com checkout via Pix.",
      longAbout: "Aplicativo desenvolvido em React Native para gerenciar vendas e estoque de uma cliente que produz e vende peças de macramê. O app possui autenticação exclusiva, seleção de produtos para venda com checkout integrado via Pix, controle de lucros com base nos custos dos materiais e uma área dedicada ao gerenciamento de recursos necessários para produção. A solução facilita o controle financeiro e operacional em um único lugar, diretamente pelo celular.",
      features: [
        "Sistema de login com acesso restrito",
        "Seleção de produtos com checkout integrado via Pix",
        "Cálculo automático de lucros baseado nos custos",
        "Controle de estoque e recursos necessários",
        "Interface mobile responsiva e intuitiva",
        "Desenvolvido com React Native para uso em dispositivos móveis",
      ],
      githubUrl: "https://github.com/Secatul/pos-inventory-app",
      demoUrl: "",
    },
  ],
}

/* ============================================ */

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentProject, setCurrentProject] = useState<string | null>(null)

  // Matrix Rain Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const fontSize = 14
    let columns = Math.floor(canvas.width / fontSize)
    let drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(50, 50, 50, 0.8)"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      resizeCanvas()
      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(1)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith("#projeto/")) {
        const projectId = hash.replace("#projeto/", "")
        setCurrentProject(projectId)
      } else {
        setCurrentProject(null)
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentProject) {
        window.location.hash = ""
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentProject])

  const openProject = (projectId: string) => {
    window.location.hash = `projeto/${projectId}`
  }

  const closeProject = () => {
    window.location.hash = ""
  }

  const project = currentProject
    ? CONFIG.projects.find((p) => p.id === currentProject)
    : null

  return (
    <div className="portfolio-root">
      <canvas ref={canvasRef} className="matrix-canvas" />

      <div className="scanlines" />

      <div className="noise" />

      <main className="container">
        {!currentProject ? (
          <>
            {/* Header */}
            <header className="header">
              <h1 className="name">{CONFIG.name}</h1>
              <nav className="nav">
                {CONFIG.navLinks.map((link, i) => (
                  <span key={link.label}>
                    {link.internal ? (
                      <a href={link.url} className="nav-link">
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link"
                      >
                        {link.label}
                      </a>
                    )}
                    {i < CONFIG.navLinks.length - 1 && (
                      <span className="nav-separator"> | </span>
                    )}
                  </span>
                ))}
              </nav>
            </header>

            <hr className="divider" />

            {/* About Section */}
            <section className="section">
              <h2 className="section-title">About</h2>
              <p className="about-text">{CONFIG.about}</p>
            </section>

            <hr className="divider" />

            {/* Skills Section */}
            <section className="section">
              <h2 className="section-title">Skills</h2>
              <div className="skills-grid">
                <div className="skills-card">
                  <h3 className="skills-card-title">Languages</h3>
                  <div className="tags">
                    {CONFIG.languages.map((lang) => (
                      <span key={lang} className="tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="skills-card">
                  <h3 className="skills-card-title">Tools & Frameworks</h3>
                  <div className="tags">
                    {CONFIG.tools.map((tool) => (
                      <span key={tool} className="tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider" />

            {/* Projects Section */}
            <section className="section">
              <h2 className="section-title">Main Projects</h2>
              <div className="projects-grid">
                {CONFIG.projects.map((proj) => (
                  <button
                    key={proj.id}
                    className="project-card"
                    onClick={() => openProject(proj.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openProject(proj.id)
                      }
                    }}
                    type="button"
                  >
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-description">{proj.shortDescription}</p>
                  </button>
                ))}
              </div>
            </section>

            <hr className="divider" />

            {/* Education & Certificates Section */}
            <section className="section">
              <h2 className="section-title">Education & Certificates</h2>
              <div className="education-grid">
                {/* Education */}
                <div className="education-card">
                  <h3 className="education-card-title">Faculdade</h3>
                  <div className="education-list">
                    {CONFIG.education.map((edu, i) => (
                      <div key={i} className="education-item">
                        <div className="education-main">
                          <span className="education-course">{edu.course}</span>
                          <span className="education-status">{edu.status}</span>
                        </div>
                        <div className="education-secondary">
                          <span className="education-institution">{edu.institution}</span>
                          <span className="education-period">{edu.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificates */}
                <div className="education-card">
                  <h3 className="education-card-title">Certificados</h3>
                  <div className="certificates-list">
                    {CONFIG.certificates.map((cert, i) => (
                      <div key={i} className="certificate-item">
                        {cert.url ? (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="certificate-name certificate-link"
                          >
                            {cert.name}
                          </a>
                        ) : (
                          <span className="certificate-name">{cert.name}</span>
                        )}
                        <div className="certificate-meta">
                          <span className="certificate-issuer">{cert.issuer}</span>
                          <span className="certificate-year">{cert.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="footer">
              <p>© {new Date().getFullYear()} {CONFIG.name}. Todos os direitos reservados.</p>
            </footer>
          </>
        ) : project ? (
          /* Project Detail View */
          <div className="project-detail">
            <button
              className="back-button"
              onClick={closeProject}
              type="button"
            >
              ← Voltar
            </button>

            <h1 className="project-detail-title">{project.title}</h1>

            <hr className="divider" />

            <section className="section">
              <h2 className="section-title">About</h2>
              <p className="about-text">{project.longAbout}</p>
            </section>

            <hr className="divider" />

            <section className="section">
              <h2 className="section-title">Features</h2>
              <ul className="features-list">
                {project.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-bullet">▸</span> {feature}
                  </li>
                ))}
              </ul>
            </section>

            <hr className="divider" />

            <div className="project-links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  [ Ver no GitHub ]
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  [ Ver Demo ]
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="not-found">
            <p>Projeto não encontrado.</p>
            <button className="back-button" onClick={closeProject} type="button">
              ← Voltar
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        .portfolio-root {
          min-height: 100vh;
          background: #000;
          color: #e0e0e0;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
          position: relative;
          overflow-x: hidden;
        }

        /* Matrix Canvas */
        .matrix-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        /* Scanlines */
        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        /* Noise */
        .noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Main Container */
        .container {
          position: relative;
          z-index: 10;
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 50px;
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid #333;
          min-height: 100vh;
          box-shadow: 0 0 60px rgba(0, 0, 0, 0.8);
        }

        /* Header */
        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .name {
          font-size: 2.5rem;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin: 0 0 15px 0;
          color: #fff;
        }

        .nav {
          font-size: 0.85rem;
          letter-spacing: 0.15em;
        }

        .nav-link {
          color: #888;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover,
        .nav-link:focus {
          color: #fff;
          outline: none;
        }

        .nav-separator {
          color: #444;
        }

        /* Divider */
        .divider {
          border: none;
          border-top: 1px solid #333;
          margin: 25px 0;
        }

        /* Sections */
        .section {
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          margin: 0 0 15px 0;
          color: #ccc;
        }

        .about-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #aaa;
          margin: 0;
        }

        /* Skills */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .skills-card {
          border: 1px solid #333;
          padding: 20px;
          background: rgba(20, 20, 20, 0.5);
        }

        .skills-card-title {
          font-size: 0.9rem;
          font-weight: 400;
          margin: 0 0 15px 0;
          color: #999;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          border: 1px solid #555;
          padding: 4px 12px;
          font-size: 0.8rem;
          color: #ccc;
          background: transparent;
          transition: all 0.2s;
        }

        .tag:hover {
          border-color: #888;
          color: #fff;
        }

        /* Projects */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .project-card {
          border: 1px solid #333;
          padding: 20px;
          background: rgba(20, 20, 20, 0.5);
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
          font-family: inherit;
          color: inherit;
        }

        .project-card:hover,
        .project-card:focus {
          border-color: #666;
          background: rgba(30, 30, 30, 0.7);
          outline: none;
        }

        .project-title {
          font-size: 1rem;
          font-weight: 400;
          margin: 0 0 10px 0;
          color: #ddd;
        }

        .project-description {
          font-size: 0.8rem;
          color: #777;
          margin: 0;
          line-height: 1.5;
        }

        /* Project Detail */
        .project-detail {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .back-button {
          background: transparent;
          border: 1px solid #444;
          color: #888;
          padding: 8px 16px;
          font-family: inherit;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 20px;
        }

        .back-button:hover,
        .back-button:focus {
          border-color: #888;
          color: #fff;
          outline: none;
        }

        .project-detail-title {
          font-size: 1.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          margin: 0;
          color: #fff;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          font-size: 0.9rem;
          color: #aaa;
          padding: 6px 0;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .feature-bullet {
          color: #666;
        }

        .project-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .project-link {
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .project-link:hover,
        .project-link:focus {
          color: #fff;
          outline: none;
        }

        /* Not Found */
        .not-found {
          text-align: center;
          padding: 60px 0;
        }

        .not-found p {
          color: #666;
          margin-bottom: 20px;
        }

        /* Education & Certificates */
        .education-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .education-card {
          border: 1px solid #333;
          padding: 20px;
          background: rgba(20, 20, 20, 0.5);
        }

        .education-card-title {
          font-size: 0.9rem;
          font-weight: 400;
          margin: 0 0 15px 0;
          color: #999;
        }

        .education-list,
        .certificates-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .education-item {
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 12px;
        }

        .education-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .education-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .education-course {
          font-size: 0.9rem;
          color: #ccc;
        }

        .education-status {
          font-size: 0.75rem;
          color: #666;
          border: 1px solid #444;
          padding: 2px 8px;
        }

        .education-secondary {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #666;
        }

        .education-institution {
          color: #777;
        }

        .education-period {
          color: #555;
        }

        .certificate-item {
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 12px;
        }

        .certificate-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .certificate-name {
          font-size: 0.9rem;
          color: #ccc;
          display: block;
          margin-bottom: 4px;
        }

        .certificate-link {
          text-decoration: none;
          transition: color 0.2s;
        }

        .certificate-link:hover {
          color: #fff;
        }

        .certificate-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }

        .certificate-issuer {
          color: #777;
        }

        .certificate-year {
          color: #555;
        }

        /* Footer */
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #222;
          text-align: center;
        }

        .footer p {
          font-size: 0.75rem;
          color: #444;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container {
            padding: 30px 25px;
          }

          .name {
            font-size: 1.8rem;
            letter-spacing: 0.2em;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .education-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 20px 15px;
          }

          .name {
            font-size: 1.5rem;
          }

          .nav {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}
