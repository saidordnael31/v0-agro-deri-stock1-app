"use client"

import { Sidebar } from "@/components/sidebar"
import { SblcWizard } from "@/components/finance/sblc-wizard"
import { useRouter } from "next/navigation"

export default function SblcPage() {
  const router = useRouter()

  const handleSectionChange = (section: string) => {
    switch (section) {
      case "trading":
        router.push("/trade")
        break
      case "defi":
        router.push("/defi/mint")
        break
      case "sblc":
        router.push("/defi/sblc")
        break
      case "logistics":
        router.push("/defi/logistics")
        break
      case "risk":
        router.push("/analytics/risk")
        break
      case "settings":
        router.push("/account")
        break
      default:
        break
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection="sblc" onSectionChange={handleSectionChange} />
      <main className="flex-1 overflow-hidden p-6">
        <SblcWizard />
      </main>
    </div>
  )
}
