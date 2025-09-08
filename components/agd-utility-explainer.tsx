"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Shield, Zap, Globe } from "lucide-react"

export function AgdUtilityExplainer() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/20 mb-4">Utility Token</Badge>
          <h1 className="text-4xl font-bold text-white mb-4">AGD: Seu Passaporte para DeFi Agrícola</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            O AGD é o token utilitário que desbloqueia todos os produtos da plataforma AgroDeri. Sem AGD, você não
            acessa stablecoins, derivativos ou yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-[#00FFD1] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Mint Stablecoins</h3>
              <p className="text-gray-400 text-sm">Use AGD como colateral para mintar USSA, BRSA ou GLDA</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-[#00FFD1] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Garantia SBLC</h3>
              <p className="text-gray-400 text-sm">Colateralize AGD para criar SBLCs e CPRs</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-[#00FFD1] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Yield Farming</h3>
              <p className="text-gray-400 text-sm">Stake AGD em vaults para ganhar yields em commodities</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-[#00FFD1] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Acesso Global</h3>
              <p className="text-gray-400 text-sm">Opere em mercados globais de commodities 24/7</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-900/30 border border-[#00FFD1]/20 rounded-lg p-6">
          <h3 className="text-[#00FFD1] font-semibold mb-3">Como Funciona o AGD:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-300">
              <span className="text-white font-medium">1. Compra:</span> Adquira AGD via checkout integrado
            </div>
            <div className="text-gray-300">
              <span className="text-white font-medium">2. Colateral:</span> Use como garantia para produtos DeFi
            </div>
            <div className="text-gray-300">
              <span className="text-white font-medium">3. Utilidade:</span> Acesse todos os serviços da plataforma
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
