"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BasisUnitWidget } from "@/components/widgets/basis-unit-widget"
import { MarketTicker } from "@/components/MarketTicker"
import { DynamicHeader } from "@/components/DynamicHeader"
import { Calculator, TrendingUp, Globe, BookOpen } from "lucide-react"

// Mock user claims for demo
const mockClaims = {
  role: "trader" as const,
  tier: "pro" as const,
  kyc: true,
  features: ["basis_readonly", "markets_rt"],
}

export default function BasisPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader claims={mockClaims} />
      <MarketTicker />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Basis & Conversão de Unidades</h1>
            <p className="text-gray-400 mt-2">
              Sistema universal de cálculo de basis e conversão entre unidades de commodities
            </p>
          </div>
          <Badge variant="outline" className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30">
            <Globe className="h-4 w-4 mr-2" />
            Acesso Universal
          </Badge>
        </div>

        {/* Main Basis Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BasisUnitWidget />
          </div>

          <div className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#00FFD1]" />
                  Fórmula Base
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-700">
                  <p className="text-center text-lg font-mono text-[#00FFD1]">Preço Local = CME ± Basis + Conversão</p>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>
                    • <strong>CME:</strong> Preço de referência da bolsa
                  </p>
                  <p>
                    • <strong>Basis:</strong> Diferencial regional
                  </p>
                  <p>
                    • <strong>Conversão:</strong> Taxa de câmbio + unidade
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Mercados Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">CME Soja</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                    Ativo
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">B3 Soja</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                    Ativo
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">ICE Café</span>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                    D15
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#00FFD1]" />
              Como Funciona o Sistema de Basis
            </CardTitle>
            <CardDescription className="text-gray-400">
              Entenda como calculamos preços locais a partir de referências internacionais
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">1. Preço de Referência</h3>
              <p className="text-sm text-gray-400">
                Utilizamos preços das principais bolsas mundiais (CME, ICE, B3) como referência base para cada
                commodity.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-white">2. Basis Regional</h3>
              <p className="text-sm text-gray-400">
                Aplicamos o diferencial regional (basis) que reflete custos logísticos, qualidade e demanda local.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-white">3. Conversão Final</h3>
              <p className="text-sm text-gray-400">
                Convertemos unidades (bushel → saca) e moedas (USD → BRL) para obter o preço local final.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
