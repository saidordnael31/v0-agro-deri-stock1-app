"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MarketTicker } from "@/components/MarketTicker"
import { DynamicHeader } from "@/components/DynamicHeader"
import { RoleGate } from "@/components/RoleGate"
import { ShoppingCart, FileText, Clock, CheckCircle, AlertCircle, Ship, DollarSign, Package } from "lucide-react"

// Mock user claims for buyer
const mockClaims = {
  role: "buyer" as const,
  tier: "retail" as const,
  kyc: false,
  features: ["rfq_create", "term_accept"],
}

export default function BuyerOverviewPage() {
  return (
    <RoleGate role="buyer">
      <div className="min-h-screen bg-black text-white">
        <DynamicHeader claims={mockClaims} />
        <MarketTicker />

        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Painel do Comprador</h1>
              <p className="text-gray-400 mt-2">Crie RFQs, aceite termos e acompanhe suas compras de commodities</p>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Comprador
            </Badge>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* RFQs Ativos */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#00FFD1]" />
                  RFQs Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-white">7</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Aguardando</span>
                    <span className="text-yellow-500">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Com Ofertas</span>
                    <span className="text-green-500">3</span>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                  Criar RFQ
                </Button>
              </CardContent>
            </Card>

            {/* Contratos Aceitos */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Contratos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-white">15</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ativos</span>
                    <span className="text-white">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Finalizados</span>
                    <span className="text-green-500">3</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Ver Contratos
                </Button>
              </CardContent>
            </Card>

            {/* Volume Comprado */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-500" />
                  Volume 2024
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-white">45,200</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Soja</span>
                    <span className="text-white">28,500 t</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Milho</span>
                    <span className="text-white">16,700 t</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Ver Histórico
                </Button>
              </CardContent>
            </Card>

            {/* Valor Investido */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  Valor Total
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-white">$2.8M</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Comprometido</span>
                    <span className="text-white">$1.2M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Disponível</span>
                    <span className="text-green-500">$1.6M</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Gerenciar Escrow
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RFQs & Offers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">RFQs Recentes</CardTitle>
                <CardDescription className="text-gray-400">Suas solicitações de cotação mais recentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">Soja Premium - 5,000t</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                          3 Ofertas
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">Entrega: Mar/2025 • Porto de Santos</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs text-gray-500">Expira em 2 dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">Milho Grau A - 3,000t</p>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                          Aguardando
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">Entrega: Abr/2025 • Porto de Paranaguá</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-gray-500">Expira em 5 dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">Café Especial - 500t</p>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                          Aceito
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">Entrega: Fev/2025 • Armazém MG</p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-gray-500">Contrato assinado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Status de Entregas</CardTitle>
                <CardDescription className="text-gray-400">Acompanhe suas compras em andamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <Ship className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Soja Premium - 2,000t</p>
                      <p className="text-sm text-gray-400">Santos → Hamburg</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">ETA: 15/03/2025</span>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                          Em Trânsito
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <Package className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Milho Grau A - 1,500t</p>
                      <p className="text-sm text-gray-400">Armazém Paraná</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">Pronto para retirada</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                          Disponível
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Café Especial - 300t</p>
                      <p className="text-sm text-gray-400">Atraso na documentação</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">Requer atenção</span>
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                          Pendente
                        </Badge>
                      </div>
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
                Acesse rapidamente as principais funcionalidades do comprador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col gap-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                  <FileText className="h-6 w-6" />
                  Criar RFQ
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <CheckCircle className="h-6 w-6" />
                  Aceitar Termo
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Ship className="h-6 w-6" />
                  Rastrear Carga
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <DollarSign className="h-6 w-6" />
                  Gerenciar Escrow
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGate>
  )
}
