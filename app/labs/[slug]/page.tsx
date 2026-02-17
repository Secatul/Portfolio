import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getLabBySlug, getAllLabSlugs } from "@/lib/labs"
import { LabPostLayout } from "@/components/labs/lab-post-layout"
import { mdxComponents } from "@/components/labs/mdx-components"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllLabSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const lab = getLabBySlug(slug)
  
  if (!lab) {
    return { title: "Post não encontrado" }
  }
  
  return {
    title: `${lab.frontmatter.title} | Labs | Secatul`,
    description: lab.frontmatter.summary,
  }
}

export default async function LabPostPage({ params }: PageProps) {
  const { slug } = await params
  const lab = getLabBySlug(slug)

  if (!lab) {
    notFound()
  }

  return (
    <LabPostLayout frontmatter={lab.frontmatter}>
      <MDXRemote source={lab.content} components={mdxComponents} />
    </LabPostLayout>
  )
}
