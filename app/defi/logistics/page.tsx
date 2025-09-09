"use client"

import { Topbar } from "@/components/topbar"
import { LogisticsInterface } from "@/components/logistics/logistics-interface"

export default function LogisticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Logística</h1>
          <p className="text-muted-foreground mt-2">Gestão completa da cadeia logística para commodities agrícolas</p>
        </div>
        <LogisticsInterface />
      </div>
    </div>
  )
}
