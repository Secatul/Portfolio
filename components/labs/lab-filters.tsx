"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface LabFiltersProps {
  allTags: string[]
}

/**
 * Componente de filtros para a lista de labs.
 * Usa query params para manter estado na URL (?tag=Web&q=search).
 * Decisão: Filtros via URL para permitir compartilhamento de buscas.
 */
export function LabFilters({ allTags }: LabFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get("q") || "")
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || "")

  // Atualiza URL quando filtros mudam
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set("q", search)
    if (activeTag) params.set("tag", activeTag)
    
    const queryString = params.toString()
    router.push(queryString ? `/labs?${queryString}` : "/labs", { scroll: false })
  }, [search, activeTag, router])

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? "" : tag)
  }

  const clearFilters = () => {
    setSearch("")
    setActiveTag("")
  }

  const hasFilters = search || activeTag

  return (
    <div className="lab-filters">
      {/* Search Input */}
      <div className="search-container">
        <label htmlFor="lab-search" className="sr-only">
          Buscar labs
        </label>
        <input
          id="lab-search"
          type="text"
          placeholder="Buscar writeups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="clear-button"
            aria-label="Limpar filtros"
            type="button"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Tags Filter */}
      <div className="tags-container" role="group" aria-label="Filtrar por tag">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`tag-button ${activeTag === tag ? "active" : ""}`}
            aria-pressed={activeTag === tag}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>

      <style jsx>{`
        .lab-filters {
          margin-bottom: 30px;
        }

        .search-container {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .search-input {
          flex: 1;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid #333;
          padding: 10px 15px;
          font-family: inherit;
          font-size: 0.9rem;
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: #555;
        }

        .search-input::placeholder {
          color: #666;
        }

        .clear-button {
          background: transparent;
          border: 1px solid #444;
          padding: 10px 15px;
          font-family: inherit;
          font-size: 0.8rem;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-button:hover,
        .clear-button:focus {
          border-color: #666;
          color: #ccc;
          outline: none;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-button {
          background: transparent;
          border: 1px solid #444;
          padding: 4px 12px;
          font-family: inherit;
          font-size: 0.75rem;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tag-button:hover,
        .tag-button:focus {
          border-color: #666;
          color: #ccc;
          outline: none;
        }

        .tag-button.active {
          border-color: #888;
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  )
}
