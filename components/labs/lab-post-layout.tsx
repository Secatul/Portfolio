"use client"

import React from "react"

import Link from "next/link"
import type { LabFrontmatter } from "@/lib/labs"
import { TerminalBackground } from "./terminal-background"

interface LabPostLayoutProps {
  frontmatter: LabFrontmatter
  children: React.ReactNode
}

export function LabPostLayout({ frontmatter, children }: LabPostLayoutProps) {
  const { title, date, tags, difficulty, platform, cover } = frontmatter

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const difficultyColors: Record<string, string> = {
    Easy: "#4ade80",
    Medium: "#facc15",
    Hard: "#f87171",
    Insane: "#c084fc",
  }

  const platformColors: Record<string, string> = {
    TryHackMe: "#88cc14",
    HackTheBox: "#9fef00",
    PortSwigger: "#ff6633",
    CTF: "#06b6d4",
    Other: "#888",
  }

  return (
    <div className="portfolio-root">
      <TerminalBackground />

      <main className="container">
        {/* Back Button */}
        <Link href="/labs" className="back-button">
          ← Voltar para Labs
        </Link>

        {/* Header */}
        <header className="post-header">
          <div className="post-meta">
            <span
              className="post-platform"
              style={{ borderColor: platformColors[platform] || "#888", color: platformColors[platform] || "#888" }}
            >
              {platform}
            </span>
            <span
              className="post-difficulty"
              style={{ borderColor: difficultyColors[difficulty], color: difficultyColors[difficulty] }}
            >
              {difficulty}
            </span>
          </div>

          <h1 className="post-title">{title}</h1>

          <div className="post-date">{formattedDate}</div>

          <div className="post-tags">
            {tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="divider" />

        <aside className="disclaimer" role="note" aria-label="Aviso de segurança">
          <strong>Aviso:</strong> Este writeup não contém flags, credenciais, tokens ou payloads perigosos.
          O objetivo é educacional e respeita as políticas das plataformas.
        </aside>

        <hr className="divider" />

        {/* Cover Image */}
        {cover && (
          <>
            <div className="cover-container">
              <img src={cover || "/placeholder.svg"} alt={`Cover de ${title}`} className="cover-image" />
            </div>
            <hr className="divider" />
          </>
        )}

        <article className="post-content">{children}</article>

        <footer className="post-footer">
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

        .back-button {
          display: inline-block;
          color: #888;
          text-decoration: none;
          font-size: 0.85rem;
          margin-bottom: 20px;
          transition: color 0.2s;
        }

        .back-button:hover,
        .back-button:focus {
          color: #fff;
          outline: none;
        }

        .post-header {
          margin-bottom: 10px;
        }

        .post-meta {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .post-platform,
        .post-difficulty {
          font-size: 0.7rem;
          padding: 2px 8px;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .post-title {
          font-size: 1.8rem;
          font-weight: 400;
          margin: 0 0 10px 0;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .post-date {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 15px;
        }

        .post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .post-tag {
          font-size: 0.7rem;
          padding: 2px 10px;
          border: 1px solid #444;
          color: #777;
        }

        .divider {
          border: none;
          border-top: 1px solid #333;
          margin: 25px 0;
        }

        .disclaimer {
          background: rgba(255, 200, 50, 0.05);
          border: 1px solid #554400;
          padding: 15px 20px;
          font-size: 0.85rem;
          color: #aa9944;
          line-height: 1.5;
        }

        .disclaimer strong {
          color: #ccaa44;
        }

        .cover-container {
          margin: 0 -20px;
        }

        .cover-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .post-content {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #bbb;
        }

        .post-content h1 {
  font-size: 1.8rem;
  color: #fff;
  margin-top: 40px;
  margin-bottom: 15px;
}

.post-content h2 {
  font-size: 1.5rem;
  color: #fff;
  margin-top: 35px;
  margin-bottom: 12px;
}

.post-content h3 {
  font-size: 1.2rem;
  color: #eee;
  margin-top: 25px;
  margin-bottom: 10px;
}

.post-content p {
  margin: 15px 0;
}

.post-content ul {
  margin: 15px 0;
  padding-left: 25px;
  list-style-type: disc;
}

.post-content ol {
  margin: 15px 0;
  padding-left: 25px;
  list-style-type: decimal;
}

.post-content li {
  margin: 5px 0;
}

.post-content pre {
  background: #0a0a0a;
  border: 1px solid #333;
  padding: 15px;
  overflow-x: auto;
  margin: 20px 0;
}

.post-content code {
  color: #9fef00;
}

.post-content blockquote {
  border-left: 3px solid #9fef00;
  padding-left: 15px;
  margin: 20px 0;
  color: #aaa;
}

        .post-footer {
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

          .post-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  )
}
