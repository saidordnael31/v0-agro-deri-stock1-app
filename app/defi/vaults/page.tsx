"use client"

import { Topbar } from "@/components/topbar"
import { EnhancedVaultInterface } from "@/components/defi/enhanced-vault-interface"

export default function VaultsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <EnhancedVaultInterface />
      </main>
    </div>
  )
}
