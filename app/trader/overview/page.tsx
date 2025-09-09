"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MarketTicker } from "@/components/MarketTicker"
import { Topbar } from "@/components/topbar"
import { TrendingUp, DollarSign, PieChart, Shield, Zap, ArrowUpRight } from "lucide-react"

// Mock user claims for trader
const mockClaims = {
  role: "trader" as const,
  tier: "pro" as const,
  kyc: true,
  features: ["pro_dash", "yield_details", "markets_rt"],
}

export default function TraderOverviewPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar />
      <MarketTicker />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Trader Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Trave BTC, gere sUSD/sBRL e ponha seu capital para trabalhar — com controle de risco na sua mão.
            </p>
          </div>
          <Badge variant="outline" className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30">
            PRO Trader
          </Badge>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Collateral Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#00FFD1]" />
                Colateral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">$125,450</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">BTC</span>
                  <span className="text-white">$89,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ETH</span>
                  <span className="text-white">$36,250</span>
                </div>
              </div>
              <Button size="sm" className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                Depositar Colateral
              </Button>
            </CardContent>
          </Card>

          {/* Stablecoins Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Stablecoins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">$87,320</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">sUSD</span>
                  <span className="text-white">$52,100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">sBRL</span>
                  <span className="text-white">R$ 175,200</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Gerar sUSD/sBRL
              </Button>
            </CardContent>
          </Card>

          {/* Yield Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-500" />
                Yield
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-yellow-500">8.2%</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">APY Estimado</span>
                  <span className="text-white">5-8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Realizado 30d</span>
                  <span className="text-green-500">+6.8%</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Ver Breakdown
              </Button>
            </CardContent>
          </Card>

          {/* Positions Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-500" />
                Posições
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Abertas</span>
                  <span className="text-white">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">P&L Hoje</span>
                  <span className="text-green-500">+$2,450</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Abrir Termo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Risk & Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Controle de Risco</CardTitle>
              <CardDescription className="text-gray-400">
                Monitore seus limites e exposição em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">LTV Atual</span>
                  <span className="text-white font-medium">65.2%</span>
                </div>
                <Progress value={65.2} className="h-2" />
                <p className="text-xs text-gray-500">Limite máximo: 80%</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Margem Disponível</span>
                  <span className="text-white font-medium">$45,680</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-sm text-gray-400">VaR 95%</p>
                  <p className="text-lg font-bold text-red-500">$8,420</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Sharpe Ratio</p>
                  <p className="text-lg font-bold text-green-500">1.85</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Performance Recente</CardTitle>
              <CardDescription className="text-gray-400">Seus resultados dos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">P&L Total</p>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-xl font-bold text-green-500">+$12,450</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#00FFD1]" />
                    <span className="text-xl font-bold text-white">68.5%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-white">Trades Recentes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">SOJA/USD Long</span>
                    <span className="text-sm text-green-500">+$850</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">MILHO/USD Short</span>
                    <span className="text-sm text-red-500">-$320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">CAFE/USD Long</span>
                    <span className="text-sm text-green-500">+$1,200</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#00FFD1]" />
              Ações Rápidas
            </CardTitle>
            <CardDescription className="text-gray-400">
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                <DollarSign className="h-6 w-6" />
                Gerar sUSD
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                Abrir Termo
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <PieChart className="h-6 w-6" />
                Ver Vaults
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Shield className="h-6 w-6" />
                Análise de Risco
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-200">
              <strong>Aviso:</strong> Rendimentos variam com o mercado. Sem garantias. Leia os fatores de risco antes de
              investir. Produtos derivativos envolvem risco de perda total.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
