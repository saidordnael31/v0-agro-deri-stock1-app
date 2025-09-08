"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckoutButton } from "@/components/CheckoutButton"
import { ArrowRight, TrendingUp, Wheat, Factory, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

const personas = [
  {
    id: "retail-trader",
    title: "Trader Pessoa Física",
    icon: TrendingUp,
    description: "Especulação e hedge pessoal em commodities",
    agdAmount: "100 AGD",
    agdPrice: "R$ 50",
    stablecoins: ["USSA", "BRSA"],
    products: ["Spot Trading", "Futures", "Options", "Yield Farming"],
    fees: "0.1% trading + 2% yield",
    flow: [
      "1. Comprar 100 AGD (R$ 50)",
      "2. Escolher stablecoin (USSA/BRSA)",
      "3. Fazer mint da stablecoin",
      "4. Operar derivativos ou yield",
    ],
    cta: "Começar como Trader PF",
    route: "/trader/overview",
  },
  {
    id: "institutional-trader",
    title: "Trader Institucional",
    icon: Building2,
    description: "Fundos, bancos e gestoras",
    agdAmount: "10,000 AGD",
    agdPrice: "R$ 5,000",
    stablecoins: ["USSA", "BRSA", "GLDA"],
    products: ["Market Making", "Arbitrage", "Structured Products", "Vaults"],
    fees: "0.05% trading + 1.5% yield",
    flow: [
      "1. Comprar 10,000+ AGD (R$ 5,000+)",
      "2. Acesso a todas stablecoins",
      "3. Market making e arbitrage",
      "4. Produtos estruturados",
    ],
    cta: "Acesso Institucional",
    route: "/trader/overview?tier=pro",
  },
  {
    id: "farmer",
    title: "Agricultor/Cooperativa",
    icon: Wheat,
    description: "Hedge de produção e financiamento",
    agdAmount: "500 AGD",
    agdPrice: "R$ 250",
    stablecoins: ["BRSA"],
    products: ["SBLC/CPR", "Warehouse Receipts", "Hedge Positions", "Pre-financing"],
    fees: "0.2% + spread bancário",
    flow: [
      "1. Comprar 500 AGD (R$ 250)",
      "2. Mint BRSA para operações locais",
      "3. Criar SBLC/CPR para financiamento",
      "4. Hedge da produção futura",
    ],
    cta: "Proteger Safra",
    route: "/farmer/overview",
  },
  {
    id: "buyer",
    title: "Indústria Compradora",
    icon: Factory,
    description: "Compra de commodities e gestão de risco",
    agdAmount: "2,000 AGD",
    agdPrice: "R$ 1,000",
    stablecoins: ["USSA", "BRSA"],
    products: ["Spot Purchase", "Forward Contracts", "Supply Chain Finance", "Logistics"],
    fees: "0.15% + logistics fee",
    flow: [
      "1. Comprar 2,000 AGD (R$ 1,000)",
      "2. Mint stablecoin para região",
      "3. Contratos forward com produtores",
      "4. Gestão logística integrada",
    ],
    cta: "Comprar Commodities",
    route: "/buyer/overview",
  },
]

export function PersonaSelector() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const router = useRouter()

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId)
  }

  const handleStartFlow = (route: string) => {
    router.push(route)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Escolha Seu Perfil para Começar</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Cada tipo de cliente tem um fluxo otimizado desde a compra do AGD até os produtos finais. Selecione seu
            perfil para ver o caminho completo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona) => {
            const Icon = persona.icon
            const isSelected = selectedPersona === persona.id

            return (
              <Card
                key={persona.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected ? "ring-2 ring-[#00FFD1] bg-gray-800/80" : "bg-gray-900/50 hover:bg-gray-800/70"
                }`}
                onClick={() => handlePersonaSelect(persona.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-6 w-6 text-[#00FFD1]" />
                    <CardTitle className="text-white text-lg">{persona.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">{persona.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* AGD Entry Point */}
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Entrada AGD</span>
                      <Badge variant="outline" className="text-[#00FFD1] border-[#00FFD1]">
                        Utility Token
                      </Badge>
                    </div>
                    <div className="text-white font-semibold">{persona.agdAmount}</div>
                    <div className="text-sm text-gray-400">{persona.agdPrice}</div>
                  </div>

                  {/* Stablecoins Available */}
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Stablecoins</div>
                    <div className="flex flex-wrap gap-1">
                      {persona.stablecoins.map((coin) => (
                        <Badge key={coin} variant="secondary" className="text-xs">
                          {coin}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Produtos</div>
                    <div className="text-sm text-gray-300 space-y-1">
                      {persona.products.slice(0, 2).map((product) => (
                        <div key={product}>• {product}</div>
                      ))}
                      {persona.products.length > 2 && (
                        <div className="text-gray-500">+{persona.products.length - 2} mais</div>
                      )}
                    </div>
                  </div>

                  {/* Fees */}
                  <div className="text-xs text-gray-500">Taxas: {persona.fees}</div>

                  {/* Expanded Flow */}
                  {isSelected && (
                    <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-[#00FFD1]/20">
                      <div className="text-sm font-medium text-[#00FFD1] mb-2">Fluxo Completo:</div>
                      <div className="space-y-2">
                        {persona.flow.map((step, index) => (
                          <div key={index} className="text-xs text-gray-300 flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#00FFD1]/20 flex items-center justify-center mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFD1]" />
                            </div>
                            {step}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 space-y-2">
                        <CheckoutButton
                          amount={persona.agdAmount.split(" ")[0]}
                          currency="AGD"
                          description={`Comprar ${persona.agdAmount} para ${persona.title}`}
                          className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                        >
                          Comprar {persona.agdAmount}
                        </CheckoutButton>

                        <Button
                          onClick={() => handleStartFlow(persona.route)}
                          variant="outline"
                          className="w-full border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1]/10"
                        >
                          {persona.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {!selectedPersona && (
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">👆 Clique em um perfil para ver o fluxo completo e começar</p>
          </div>
        )}
      </div>
    </section>
  )
}
