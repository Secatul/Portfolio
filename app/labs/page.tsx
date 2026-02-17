import { getAllLabs, getAllTags } from "@/lib/labs"
import { LabsPageClient } from "./labs-page-client"

export const metadata = {
  title: "Labs | Secatul",
  description: "Writeups de CTFs, TryHackMe, HackTheBox e outros desafios de segurança.",
}

export default function LabsPage() {
  const labs = getAllLabs()
  const allTags = getAllTags()

  return <LabsPageClient labs={labs} allTags={allTags} />
}
