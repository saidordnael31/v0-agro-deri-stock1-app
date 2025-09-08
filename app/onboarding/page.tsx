"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, User, Building, Tractor, Factory, ArrowRight, Shield, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import CheckoutButton from "@/components/CheckoutButton"

type UserType = "trader-retail" | "trader-institutional" | "farmer" | "buyer"

interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const router = useRouter()

  const userTypes = [
    {
      id: "trader-retail" as UserType,
      title: "Trader Pessoa Física",
      description: "Gere stablecoins, acesse yields e faça hedge com cripto como garantia",
      icon: User,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      features: ["Mint sUSD/sBRL", "Yield 5-8% APY", "Hedge commodities", "Colateral BTC/ETH"],
      flow: [
        {
          id: "kyc",
          title: "Verificação KYC",
          description: "Complete sua verificação de identidade",
          completed: false,
        },
        {
          id: "agd",
          title: "Comprar AGD",
          description: "Adquira tokens AGD para acessar a plataforma",
          completed: false,
        },
        {
          id: "collateral",
          title: "Depositar Colateral",
          description: "Deposite BTC/ETH como garantia",
          completed: false,
        },
        {
          id: "mint",
          title: "Gerar Stablecoins",
          description: "Mint sUSD ou sBRL usando seu colateral",
          completed: false,
        },
        {
          id: "yield",
          title: "Explorar Yields",
          description: "Descubra oportunidades de rendimento",
          completed: false,
        },
      ],
    },
    {
      id: "trader-institutional" as UserType,
      title: "Trader Institucional",
      description: "Fundos, bancos e instituições com acesso a dados RT e analytics avançados",
      icon: Building,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/30",
      features: ["Dados RT multi-exchange", "Analytics avançados", "API institucional", "Limites elevados"],
      flow: [
        {
          id: "institutional-kyc",
          title: "KYC Institucional",
          description: "Verificação corporativa completa",
          completed: false,
        },
        {
          id: "agd-bulk",
          title: "Compra em Volume",
          description: "Adquira AGD com desconto por volume",
          completed: false,
        },
        { id: "api-access", title: "Acesso API", description: "Configure integração via API", completed: false },
        {
          id: "risk-setup",
          title: "Configurar Risco",
          description: "Defina limites e controles de risco",
          completed: false,
        },
        { id: "pro-features", title: "Recursos PRO", description: "Ative dados RT e analytics", completed: false },
      ],
    },
    {
      id: "farmer" as UserType,
      title: "Agricultor/Cooperativa",
      description: "Tokenize terra, emita WR, faça hedge da safra e acesse crédito rural",
      icon: Tractor,
      color: "bg-green-500/10 text-green-500 border-green-500/30",
      features: ["Tokenização de terra", "Warehouse Receipts", "Hedge de safra", "Crédito rural"],
      flow: [
        { id: "rural-kyc", title: "KYC Rural", description: "Verificação de produtor rural", completed: false },
        {
          id: "land-register",
          title: "Cadastrar Propriedade",
          description: "Registre seus lotes e propriedades",
          completed: false,
        },
        {
          id: "wr-setup",
          title: "Configurar WR",
          description: "Configure emissão de warehouse receipts",
          completed: false,
        },
        {
          id: "hedge-intro",
          title: "Introdução ao Hedge",
          description: "Aprenda a proteger sua safra",
          completed: false,
        },
        {
          id: "tokenize-land",
          title: "Tokenizar Terra",
          description: "Transforme terra em ativo digital",
          completed: false,
        },
      ],
    },
    {
      id: "buyer" as UserType,
      title: "Indústria Compradora",
      description: "Crie RFQs, gerencie contratos e otimize sua cadeia de suprimentos",
      icon: Factory,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/30",
      features: ["RFQ automatizado", "Gestão de contratos", "Rastreamento logístico", "Escrow inteligente"],
      flow: [
        { id: "corporate-kyc", title: "KYC Corporativo", description: "Verificação empresarial", completed: false },
        {
          id: "supply-setup",
          title: "Configurar Suprimentos",
          description: "Defina suas necessidades de commodities",
          completed: false,
        },
        {
          id: "rfq-training",
          title: "Treinamento RFQ",
          description: "Aprenda a criar RFQs eficientes",
          completed: false,
        },
        {
          id: "escrow-setup",
          title: "Configurar Escrow",
          description: "Configure pagamentos seguros",
          completed: false,
        },
        {
          id: "logistics-integration",
          title: "Integração Logística",
          description: "Conecte sistemas de rastreamento",
          completed: false,
        },
      ],
    },
  ]

  const selectedType = userTypes.find((type) => type.id === selectedUserType)
  const totalSteps = selectedType ? selectedType.flow.length + 1 : 1 // +1 for user type selection
  const progress = selectedType ? ((completedSteps.length + 1) / totalSteps) * 100 : (currentStep / 1) * 100

  const handleUserTypeSelection = (userType: UserType) => {
    setSelectedUserType(userType)
    setCurrentStep(1)
    setCompletedSteps(["user-type"])
  }

  const completeStep = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const finishOnboarding = () => {
    // Redirect to appropriate dashboard based on user type
    const dashboardRoutes = {
      "trader-retail": "/trader/overview",
      "trader-institutional": "/trader/overview",
      farmer: "/farmer/overview",
      buyer: "/buyer/overview",
    }

    if (selectedUserType) {
      router.push(dashboardRoutes[selectedUserType])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo ao AgroDeri</h1>
          <p className="text-gray-400">Configure sua conta em poucos passos simples</p>
          <div className="mt-4">
            <Progress value={progress} className="h-2 max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">
              {selectedType ? `${completedSteps.length} de ${totalSteps} passos concluídos` : "Selecione seu perfil"}
            </p>
          </div>
        </div>

        {/* Step 0: User Type Selection */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Qual é o seu perfil?</h2>
              <p className="text-gray-400">Escolha a opção que melhor descreve como você pretende usar a plataforma</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className="bg-gray-900 border-gray-800 hover:border-[#00FFD1]/50 cursor-pointer transition-all duration-200 hover:scale-105"
                    onClick={() => handleUserTypeSelection(type.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${type.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-white">{type.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400">{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-[#00FFD1]" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                        Selecionar <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Steps 1+: Onboarding Flow */}
        {currentStep > 0 && selectedType && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-lg ${selectedType.color}`}>
                <selectedType.icon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedType.title}</h2>
                <p className="text-gray-400">{selectedType.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Steps List */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Próximos Passos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedType.flow.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          completedSteps.includes(step.id)
                            ? "bg-green-500/10 border border-green-500/30"
                            : "bg-gray-800"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            completedSteps.includes(step.id) ? "bg-green-500 text-black" : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {completedSteps.includes(step.id) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{step.title}</p>
                          <p className="text-xs text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Current Step Content */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Configure sua conta</CardTitle>
                    <CardDescription className="text-gray-400">
                      Complete os passos abaixo para começar a usar a plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* KYC Step */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-[#00FFD1]" />
                        <h3 className="text-lg font-semibold text-white">Verificação de Identidade</h3>
                      </div>
                      <p className="text-gray-400">
                        Complete sua verificação KYC para acessar todos os recursos da plataforma.
                      </p>
                      <Button
                        onClick={() => completeStep("kyc")}
                        disabled={completedSteps.includes("kyc")}
                        className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                      >
                        {completedSteps.includes("kyc") ? "KYC Concluído" : "Iniciar KYC"}
                      </Button>
                    </div>

                    {/* AGD Purchase Step */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-[#00FFD1]" />
                        <h3 className="text-lg font-semibold text-white">Comprar Tokens AGD</h3>
                      </div>
                      <p className="text-gray-400">
                        Adquira tokens AGD para acessar a plataforma e suas funcionalidades.
                      </p>
                      <div className="flex gap-3">
                        <CheckoutButton
                          type="BUY_AGD"
                          amount={100}
                          label="Comprar AGD"
                          className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-4 py-2 rounded-lg"
                          onSettled={() => completeStep("agd")}
                        />
                        {completedSteps.includes("agd") && (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/30">Concluído</Badge>
                        )}
                      </div>
                    </div>

                    {/* Role-specific steps */}
                    {selectedUserType === "trader-retail" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Próximos Passos para Trader</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            onClick={() => completeStep("collateral")}
                            disabled={completedSteps.includes("collateral")}
                          >
                            Depositar Colateral
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => completeStep("mint")}
                            disabled={completedSteps.includes("mint")}
                          >
                            Gerar Stablecoins
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedUserType === "farmer" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Próximos Passos para Produtor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            onClick={() => completeStep("land-register")}
                            disabled={completedSteps.includes("land-register")}
                          >
                            Cadastrar Propriedade
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => completeStep("wr-setup")}
                            disabled={completedSteps.includes("wr-setup")}
                          >
                            Configurar WR
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Finish Button */}
                    {completedSteps.length >= 3 && (
                      <div className="pt-6 border-t border-gray-800">
                        <Button
                          onClick={finishOnboarding}
                          className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                        >
                          Finalizar Configuração <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
