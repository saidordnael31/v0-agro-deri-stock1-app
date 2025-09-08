"use client"

import { Topbar } from "@/components/topbar"
import { PersonaSelector } from "@/components/persona-selector"
import { AgdUtilityExplainer } from "@/components/agd-utility-explainer"
import { KpiBar } from "@/components/kpi-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <KpiBar />
      <AgdUtilityExplainer />
      <PersonaSelector />
    </div>
  )
}
