"use client"

import { Suspense } from "react"
import Link from "next/link"
import { TerminalBackground } from "@/components/labs/terminal-background"
import { LabFilters } from "@/components/labs/lab-filters"
import { LabsList } from "@/components/labs/labs-list"
import type { LabMeta } from "@/lib/labs"

interface LabsPageClientProps {
  labs: LabMeta[]
  allTags: string[]
}

export function LabsPageClient({ labs, allTags }: LabsPageClientProps) {
  return (
    <div className="portfolio-root">
      <TerminalBackground />

      <main className="container">
        <header className="header">
          <h1 className="name">
            <Link href="/" className="name-link">
              Secatul
            </Link>
          </h1>
          <nav className="nav" aria-label="Navegação principal">
            <Link href="/labs" className="nav-link active">
              LABS
            </Link>
            <span className="nav-separator"> | </span>
            <a
              href="https://youtube.com/@secanal"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              YOUTUBE
            </a>
            <span className="nav-separator"> | </span>
            <a
              href="https://github.com/secatul"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GITHUB
            </a>
          </nav>
        </header>

        <hr className="divider" />

        {/* Page Title */}
        <section className="section">
          <h2 className="section-title">Labs & Writeups</h2>
          <p className="section-description">
            Writeups de CTFs, máquinas do TryHackMe, HackTheBox e outros desafios de segurança.
          </p>
        </section>

        <hr className="divider" />

        <Suspense fallback={<div>Carregando filtros...</div>}>
          <LabFilters allTags={allTags} />
        </Suspense>

        <Suspense fallback={<div>Carregando labs...</div>}>
          <LabsList labs={labs} />
        </Suspense>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Secatul. Todos os direitos reservados.</p>
        </footer>
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

        .name-link {
          color: inherit;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .name-link:hover,
        .name-link:focus {
          opacity: 0.8;
          outline: none;
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
        .nav-link:focus,
        .nav-link.active {
          color: #fff;
          outline: none;
        }

        .nav-separator {
          color: #444;
        }

        .divider {
          border: none;
          border-top: 1px solid #333;
          margin: 25px 0;
        }

        .section {
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          margin: 0 0 10px 0;
          color: #ccc;
        }

        .section-description {
          font-size: 0.9rem;
          color: #777;
          margin: 0;
        }

        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #222;
          text-align: center;
          font-size: 0.8rem;
          color: #555;
        }

        @media (max-width: 700px) {
          .container {
            padding: 20px;
          }

          .name {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  )
}
