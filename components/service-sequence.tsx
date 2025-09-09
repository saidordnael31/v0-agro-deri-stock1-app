"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckoutButton } from "@/components/CheckoutButton"
import { ArrowRight, Check, Clock, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface ServiceStep {
  id: string
  title: string
  description: string
  cost: string
  duration: string
  status: "available" | "locked" | "completed"
  route?: string
}

interface ServiceSequenceProps {
  persona: "retail-trader" | "institutional-trader" | "farmer" | "buyer"
}

const serviceSequences = {
  "retail-trader": [
    {
      id: "agd-purchase",
      title: "1. Comprar AGD Token",
      description: "Adquirir 100 AGD para desbloquear acesso à plataforma",
      cost: "R$ 50",
      duration: "Imediato",
      status: "available" as const,
      route: "/checkout?type=BUY_AGD&amount=100",
    },
    {
      id: "stablecoin-mint",
      title: "2. Mint Stablecoin",
      description: "Escolher USSA ou BRSA e fazer mint com colateral",
      cost: "0.1% taxa",
      duration: "5 min",
      status: "locked" as const,
      route: "/defi/mint",
    },
    {
      id: "trading-access",
      title: "3. Operar Derivativos",
      description: "Spot, Futures e Options em commodities",
      cost: "0.1% por trade",
      duration: "Contínuo",
      status: "locked" as const,
      route: "/trade",
    },
    {
      id: "yield-farming",
      title: "4. Yield Farming",
      description: "Depositar em vaults para rendimento passivo",
      cost: "2% taxa anual",
      duration: "Flexível",
      status: "locked" as const,
      route: "/defi/vaults",
    },
  ],
  "institutional-trader": [
    {
      id: "agd-purchase",
      title: "1. Comprar AGD Token",
      description: "Adquirir 10,000+ AGD para acesso institucional",
      cost: "R$ 5,000+",
      duration: "Imediato",
      status: "available" as const,
      route: "/checkout?type=BUY_AGD&amount=10000",
    },
    {
      id: "kyc-verification",
      title: "2. Verificação KYC",
      description: "Processo de verificação institucional completo",
      cost: "Gratuito",
      duration: "24-48h",
      status: "locked" as const,
      route: "/account/kyc",
    },
    {
      id: "market-making",
      title: "3. Market Making",
      description: "Acesso a ferramentas de market making e arbitrage",
      cost: "0.05% taxa",
      duration: "Contínuo",
      status: "locked" as const,
      route: "/analytics/mm",
    },
    {
      id: "structured-products",
      title: "4. Produtos Estruturados",
      description: "Criação de produtos financeiros complexos",
      cost: "Negociável",
      duration: "Sob demanda",
      status: "locked" as const,
      route: "/trader/structured",
    },
  ],
  farmer: [
    {
      id: "agd-purchase",
      title: "1. Comprar AGD Token",
      description: "Adquirir 500 AGD para acesso aos serviços agrícolas",
      cost: "R$ 250",
      duration: "Imediato",
      status: "available" as const,
      route: "/checkout?type=BUY_AGD&amount=500",
    },
    {
      id: "land-tokenization",
      title: "2. Tokenizar Terra",
      description: "Registrar e tokenizar propriedade rural como colateral",
      cost: "0.5% do valor",
      duration: "7-14 dias",
      status: "locked" as const,
      route: "/rwa/land-register",
    },
    {
      id: "sblc-creation",
      title: "3. Criar SBLC/CPR",
      description: "Emitir garantias bancárias para financiamento",
      cost: "2-4% ao ano",
      duration: "3-5 dias",
      status: "locked" as const,
      route: "/defi/sblc",
    },
    {
      id: "hedge-position",
      title: "4. Hedge da Safra",
      description: "Proteger preços futuros da produção",
      cost: "0.2% + spread",
      duration: "Até colheita",
      status: "locked" as const,
      route: "/farmer/hedge",
    },
  ],
  buyer: [
    {
      id: "agd-purchase",
      title: "1. Comprar AGD Token",
      description: "Adquirir 2,000 AGD para acesso industrial",
      cost: "R$ 1,000",
      duration: "Imediato",
      status: "available" as const,
      route: "/checkout?type=BUY_AGD&amount=2000",
    },
    {
      id: "supply-setup",
      title: "2. Setup Cadeia de Suprimentos",
      description: "Configurar fornecedores e rotas logísticas",
      cost: "Taxa setup",
      duration: "1-2 semanas",
      status: "locked" as const,
      route: "/logistics",
    },
    {
      id: "forward-contracts",
      title: "3. Contratos Forward",
      description: "Estabelecer contratos futuros com produtores",
      cost: "0.15% + logistics",
      duration: "Safra completa",
      status: "locked" as const,
      route: "/buyer/forward",
    },
    {
      id: "logistics-management",
      title: "4. Gestão Logística",
      description: "Rastreamento e otimização da cadeia",
      cost: "Por operação",
      duration: "Contínuo",
      status: "locked" as const,
      route: "/common/logistics",
    },
  ],
}

export function ServiceSequence({ persona }: ServiceSequenceProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const router = useRouter()
  const steps = serviceSequences[persona]

  const handleStepAction = (step: ServiceStep) => {
    if (step.status === "available") {
      if (step.route) {
        router.push(step.route)
      }
    } else if (step.status === "locked") {
      // Check if previous steps are completed
      const currentIndex = steps.findIndex((s) => s.id === step.id)
      const previousStepsCompleted = steps.slice(0, currentIndex).every((s) => completedSteps.includes(s.id))

      if (previousStepsCompleted && step.route) {
        router.push(step.route)
      }
    }
  }

  const getStepIcon = (step: ServiceStep) => {
    if (completedSteps.includes(step.id)) {
      return <Check className="h-4 w-4 text-green-500" />
    } else if (step.status === "available") {
      return <Clock className="h-4 w-4 text-[#00FFD1]" />
    } else {
      return <Lock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStepStatus = (step: ServiceStep) => {
    if (completedSteps.includes(step.id)) {
      return "completed"
    }
    return step.status
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Sequência de Serviços</h3>
        <p className="text-gray-400 text-sm">Siga os passos em ordem para aproveitar todos os benefícios</p>
      </div>

      {steps.map((step, index) => {
        const status = getStepStatus(step)
        const isClickable =
          status === "available" ||
          (status === "locked" && steps.slice(0, index).every((s) => completedSteps.includes(s.id)))

        return (
          <Card
            key={step.id}
            className={`transition-all cursor-pointer ${
              status === "completed"
                ? "bg-green-500/10 border-green-500/30"
                : status === "available"
                  ? "bg-[#00FFD1]/10 border-[#00FFD1]/30 hover:bg-[#00FFD1]/20"
                  : "bg-gray-800/30 border-gray-700/50"
            }`}
            onClick={() => isClickable && handleStepAction(step)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStepIcon(step)}
                  <CardTitle className="text-sm text-white">{step.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      status === "completed"
                        ? "text-green-500 border-green-500/50"
                        : status === "available"
                          ? "text-[#00FFD1] border-[#00FFD1]/50"
                          : "text-gray-500 border-gray-500/50"
                    }
                  >
                    {step.cost}
                  </Badge>
                  {isClickable && <ArrowRight className="h-4 w-4 text-gray-400" />}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-300 mb-2">{step.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Duração: {step.duration}</span>
                {step.id === "agd-purchase" && status === "available" && (
                  <CheckoutButton
                    type="BUY_AGD"
                    amount={Number.parseInt(step.cost.replace(/[^\d]/g, ""))}
                    className="text-xs px-2 py-1 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Comprar Agora
                  </CheckoutButton>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
