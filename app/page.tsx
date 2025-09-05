"use client"

import { Topbar } from "@/components/topbar"
import { Hero } from "@/components/hero"
import { FlowCards } from "@/components/flow-cards"
import { KpiBar } from "@/components/kpi-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <KpiBar />
      <Hero />
      <FlowCards />
    </div>
  )
}
