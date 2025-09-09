"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Topbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-white">
            AgroDeri
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/trade" className="text-gray-300 hover:text-white transition-colors">
              Trading
            </Link>
            <Link href="/defi/mint" className="text-gray-300 hover:text-white transition-colors">
              Mint
            </Link>
            <Link href="/defi/vaults" className="text-gray-300 hover:text-white transition-colors">
              Vaults
            </Link>
            <Link href="/defi/sblc" className="text-gray-300 hover:text-white transition-colors">
              SBLC
            </Link>
            <Link href="/wr" className="text-gray-300 hover:text-white transition-colors">
              WR
            </Link>
            <Link href="/logistics" className="text-gray-300 hover:text-white transition-colors">
              Logística
            </Link>
            <Link href="/analytics/risk" className="text-gray-300 hover:text-white transition-colors">
              Risk
            </Link>
            <Link href="/account" className="text-gray-300 hover:text-white transition-colors">
              Conta
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsWalletConnected(!isWalletConnected)}
            className="flex items-center space-x-2"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{isWalletConnected ? "0x1234...5678" : "Conectar"}</span>
            {isWalletConnected && (
              <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                Conectado
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
