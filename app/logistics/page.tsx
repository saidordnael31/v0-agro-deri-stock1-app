"use client"

import { Topbar } from "@/components/topbar"
import { LogisticsInterface } from "@/components/logistics/logistics-interface"

export default function LogisticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-6">
        <LogisticsInterface />
      </main>
    </div>
  )
}
