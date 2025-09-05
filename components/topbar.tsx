"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface TopbarProps {
  onMobileMenuToggle?: () => void
}

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const router = useRouter()

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Main Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-white">
            AgroDeri
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/trade" className="text-gray-300 hover:text-white transition-colors">
              Trading
            </Link>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors">DeFi</button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/defi/mint"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Mint Stablecoins
                </Link>
                <Link
                  href="/defi/vaults"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Vaults
                </Link>
                <Link
                  href="/defi/sblc"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  SBLC
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors">Analytics</button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/analytics/risk"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Risk Management
                </Link>
                <Link
                  href="/analytics/mm"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Market Maker
                </Link>
              </div>
            </div>
            <Link href="/wr" className="text-gray-300 hover:text-white transition-colors">
              WR
            </Link>
            <Link href="/logistics" className="text-gray-300 hover:text-white transition-colors">
              Logística
            </Link>
            <Link href="/account" className="text-gray-300 hover:text-white transition-colors">
              Carteira
            </Link>
          </nav>
        </div>

        {/* CTAs and Wallet */}
        <div className="flex items-center space-x-4">
          {/* Primary CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:text-black bg-transparent"
              onClick={() => router.push("/trade?tab=futures")}
            >
              Proteger minha safra
            </Button>
            <Button
              size="sm"
              className="bg-[#00FFD1] text-black hover:bg-[#00B8A0]"
              onClick={() => router.push("/defi/sblc")}
            >
              Criar garantia (SBLC)
            </Button>
          </div>

          {/* Wallet Connection */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsWalletConnected(!isWalletConnected)}
            className="flex items-center space-x-2"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{isWalletConnected ? "0x1234...5678" : "Conectar Carteira"}</span>
            {isWalletConnected && (
              <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                Conectado
              </Badge>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={onMobileMenuToggle}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
