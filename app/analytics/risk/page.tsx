"use client"

import { Topbar } from "@/components/topbar"
import { RiskDashboard } from "@/components/risk-dashboard"

export default function RiskAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <RiskDashboard />
      </main>
    </div>
  )
}
