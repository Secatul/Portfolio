'use client';

import Link from "next/link"
import type { LabMeta } from "@/lib/labs"

interface LabCardProps {
  lab: LabMeta
}


export function LabCard({ lab }: LabCardProps) {
  const { slug, frontmatter } = lab
  const { title, date, tags, summary, difficulty, platform } = frontmatter

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

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <Link href={`/labs/${slug}`} className="lab-card">
      <div className="lab-card-header">
        <span 
          className="lab-platform"
          style={{ borderColor: platformColors[platform] || "#888", color: platformColors[platform] || "#888" }}
        >
          {platform}
        </span>
        <span 
          className="lab-difficulty"
          style={{ borderColor: difficultyColors[difficulty], color: difficultyColors[difficulty] }}
        >
          {difficulty}
        </span>
      </div>

      <h3 className="lab-title">{title}</h3>
      <p className="lab-summary">{summary}</p>

      <div className="lab-tags">
        {tags.slice(0, 4).map((tag) => (
          <span key={tag} className="lab-tag">
            {tag}
          </span>
        ))}
        {tags.length > 4 && <span className="lab-tag">+{tags.length - 4}</span>}
      </div>

      <div className="lab-date">{formattedDate}</div>

      <style jsx>{`
        .lab-card {
          display: block;
          border: 1px solid #333;
          padding: 20px;
          background: rgba(20, 20, 20, 0.5);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .lab-card:hover,
        .lab-card:focus {
          border-color: #555;
          background: rgba(30, 30, 30, 0.7);
          outline: none;
        }

        .lab-card:focus-visible {
          outline: 2px solid #888;
          outline-offset: 2px;
        }

        .lab-card-header {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }

        .lab-platform,
        .lab-difficulty {
          font-size: 0.7rem;
          padding: 2px 8px;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .lab-title {
          font-size: 1rem;
          font-weight: 400;
          margin: 0 0 8px 0;
          color: #e0e0e0;
        }

        .lab-summary {
          font-size: 0.85rem;
          color: #888;
          margin: 0 0 12px 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .lab-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .lab-tag {
          font-size: 0.7rem;
          padding: 2px 8px;
          border: 1px solid #444;
          color: #777;
        }

        .lab-date {
          font-size: 0.75rem;
          color: #555;
        }
      `}</style>
    </Link>
  )
}
