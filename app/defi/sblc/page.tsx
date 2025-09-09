"use client"

import { Topbar } from "@/components/topbar"
import { SblcWizard } from "@/components/finance/sblc-wizard"

export default function SblcPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <SblcWizard />
      </main>
    </div>
  )
}
