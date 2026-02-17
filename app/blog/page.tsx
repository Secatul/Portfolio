import { redirect } from "next/navigation"

/**
 * Redireciona /blog para /labs conforme solicitado.
 * Decisão: Redirect server-side para melhor SEO.
 */
export default function BlogPage() {
  redirect("/labs")
}
