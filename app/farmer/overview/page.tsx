"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MarketTicker } from "@/components/MarketTicker"
import { Topbar } from "@/components/topbar"
import { Sprout, Warehouse, MapPin, Calendar, Truck, FileText, Shield, Coins } from "lucide-react"

// Mock user claims for farmer
const mockClaims = {
  role: "farmer" as const,
  tier: "retail" as const,
  kyc: true,
  features: ["lot_register", "hedge_access", "wr_create"],
}

export default function FarmerOverviewPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar />
      <MarketTicker />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Painel do Produtor</h1>
            <p className="text-gray-400 mt-2">
              Gerencie seus lotes, faça hedge de preços e tokenize seus ativos rurais
            </p>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
            <Sprout className="h-4 w-4 mr-2" />
            Produtor Rural
          </Badge>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Lotes Cadastrados */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                Lotes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Área Total</span>
                  <span className="text-white">1,250 ha</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tokenizados</span>
                  <span className="text-green-500">5 lotes</span>
                </div>
              </div>
              <Button size="sm" className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                Cadastrar Lote
              </Button>
            </CardContent>
          </Card>

          {/* Safra Atual */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Sprout className="h-5 w-5 text-yellow-500" />
                Safra 2024/25
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">85%</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Plantado</span>
                  <span className="text-white">1,062 ha</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimativa</span>
                  <span className="text-white">3,800 sacas</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>

          {/* Warehouse Receipts */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-blue-500" />
                WR Ativos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Volume</span>
                  <span className="text-white">2,450 sacas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Valor</span>
                  <span className="text-white">R$ 387,200</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Emitir WR
              </Button>
            </CardContent>
          </Card>

          {/* Hedge Positions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                Hedge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-white">65%</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Protegido</span>
                  <span className="text-white">2,470 sacas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Preço Médio</span>
                  <span className="text-white">R$ 158/saca</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Fazer Hedge
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Safra Progress & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Progresso da Safra</CardTitle>
              <CardDescription className="text-gray-400">Acompanhe o desenvolvimento da safra 2024/25</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Plantio</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                    Concluído
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Desenvolvimento</span>
                  <span className="text-white font-medium">V6 - 6 folhas</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Colheita Prevista</span>
                  <span className="text-white font-medium">Mar/2025</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Dias para Colheita</p>
                  <p className="text-lg font-bold text-[#00FFD1]">127</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Produtividade Est.</p>
                  <p className="text-lg font-bold text-green-500">62 sc/ha</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Próximas Atividades</CardTitle>
              <CardDescription className="text-gray-400">Agenda de atividades da propriedade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#00FFD1] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-white">Aplicação Defensivo</p>
                    <p className="text-sm text-gray-400">Lote 3 - Soja • Amanhã, 06:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                  <Truck className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-white">Transporte WR</p>
                    <p className="text-sm text-gray-400">2,000 sacas • 15/02/2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                  <FileText className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-white">Renovar Seguro</p>
                    <p className="text-sm text-gray-400">Lotes 1-4 • 20/02/2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Ações Rápidas</CardTitle>
            <CardDescription className="text-gray-400">
              Acesse rapidamente as principais funcionalidades do produtor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                <MapPin className="h-6 w-6" />
                Cadastrar Lote
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Shield className="h-6 w-6" />
                Fazer Hedge
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Warehouse className="h-6 w-6" />
                Emitir WR
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Coins className="h-6 w-6" />
                Tokenizar Terra
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
