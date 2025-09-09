"use client"

import { Topbar } from "@/components/topbar"
import { MintInterface } from "@/components/defi/mint-interface"
import { CryptoCollateralManager } from "@/components/defi/crypto-collateral-manager"

export default function MintPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MintInterface />
          </div>
          <div className="space-y-6">
            <CryptoCollateralManager />
          </div>
        </div>
      </main>
    </div>
  )
}
