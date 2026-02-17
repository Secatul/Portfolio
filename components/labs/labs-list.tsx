"use client"

import { useSearchParams } from "next/navigation"
import { LabCard } from "./lab-card"
import type { LabMeta } from "@/lib/labs"

interface LabsListProps {
  labs: LabMeta[]
}

export function LabsList({ labs }: LabsListProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q")?.toLowerCase() || ""
  const tagFilter = searchParams.get("tag") || ""

  const filteredLabs = labs.filter((lab) => {
    const { title, summary, tags } = lab.frontmatter

    if (searchQuery) {
      const matchesSearch =
        title.toLowerCase().includes(searchQuery) ||
        summary.toLowerCase().includes(searchQuery) ||
        tags.some((t) => t.toLowerCase().includes(searchQuery))
      if (!matchesSearch) return false
    }

    if (tagFilter) {
      if (!tags.includes(tagFilter)) return false
    }

    return true
  })

  if (filteredLabs.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum writeup encontrado.</p>
        <style jsx>{`
          .empty-state {
            text-align: center;
            padding: 40px;
            color: #666;
            border: 1px dashed #333;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="labs-grid">
      {filteredLabs.map((lab) => (
        <LabCard key={lab.slug} lab={lab} />
      ))}

      <style jsx>{`
        .labs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        @media (max-width: 700px) {
          .labs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
