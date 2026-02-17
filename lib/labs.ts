import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface LabFrontmatter {
  title: string
  date: string
  tags: string[]
  summary: string
  difficulty: "Easy" | "Medium" | "Hard" | "Insane"
  platform: "TryHackMe" | "HackTheBox" | "PortSwigger" | "CTF" | "Other"
  cover?: string
}

export interface LabPost {
  slug: string
  frontmatter: LabFrontmatter
  content: string
}

export interface LabMeta {
  slug: string
  frontmatter: LabFrontmatter
}

const LABS_DIR = path.join(process.cwd(), "content", "labs")

function ensureLabsDir(): void {
  if (!fs.existsSync(LABS_DIR)) {
    fs.mkdirSync(LABS_DIR, { recursive: true })
  }
}

export function parseFrontmatter(fileContent: string): { data: LabFrontmatter; content: string } | null {
  try {
    const { data, content } = matter(fileContent)
    
    if (!data.title || !data.date || !data.tags || !data.summary || !data.difficulty || !data.platform) {
      console.warn("Frontmatter incompleto, campos obrigatórios faltando")
      return null
    }
    
    return {
      data: data as LabFrontmatter,
      content,
    }
  } catch {
    return null
  }
}

export function getAllLabs(): LabMeta[] {
  ensureLabsDir()
  
  const files = fs.readdirSync(LABS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
  
  const labs: LabMeta[] = []
  
  for (const file of files) {
    const filePath = path.join(LABS_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const parsed = parseFrontmatter(fileContent)
    
    if (parsed) {
      const slug = file.replace(/\.mdx?$/, "")
      labs.push({
        slug,
        frontmatter: parsed.data,
      })
    }
  }
  
  labs.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  
  return labs
}

export function getLabBySlug(slug: string): LabPost | null {
  ensureLabsDir()
  
  // Tenta .mdx primeiro, depois .md
  const mdxPath = path.join(LABS_DIR, `${slug}.mdx`)
  const mdPath = path.join(LABS_DIR, `${slug}.md`)
  
  let filePath: string | null = null
  
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath
  }
  
  if (!filePath) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const parsed = parseFrontmatter(fileContent)
  
  if (!parsed) {
    return null
  }
  
  return {
    slug,
    frontmatter: parsed.data,
    content: parsed.content,
  }
}

export function getAllTags(): string[] {
  const labs = getAllLabs()
  const tagsSet = new Set<string>()
  
  for (const lab of labs) {
    for (const tag of lab.frontmatter.tags) {
      tagsSet.add(tag)
    }
  }
  
  return Array.from(tagsSet).sort()
}

export function getAllLabSlugs(): string[] {
  ensureLabsDir()
  
  const files = fs.readdirSync(LABS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
  
  return files.map((f) => f.replace(/\.mdx?$/, ""))
}
