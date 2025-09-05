"use client"

import { Topbar } from "@/components/topbar"
import { MarketMakerDashboard } from "@/components/mm/market-maker-dashboard"

export default function MarketMakerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-6">
        <MarketMakerDashboard />
      </main>
    </div>
  )
}
