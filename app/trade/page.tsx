"use client"

import { Topbar } from "@/components/topbar"
import { TradingDashboard } from "@/components/trading-dashboard"

export default function TradePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Topbar />
      <main className="container mx-auto px-4 py-6">
        <TradingDashboard />
      </main>
    </div>
  )
}
