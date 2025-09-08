"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, DollarSign, Shield, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface PersonaFlowGuideProps {
  userType: "trader-retail" | "trader-institutional" | "farmer" | "buyer"
}

export function PersonaFlowGuide({ userType }: PersonaFlowGuideProps) {
  const router = useRouter()

  const flows = {
    "trader-retail": {
      title: "Fluxo do Trader Pessoa Física",
      description: "Seu caminho para gerar renda com cripto como garantia",
      steps: [
        {
          id: "buy-agd",
          title: "1. Comprar AGD",
          description: "Adquira tokens AGD via PIX ou cripto",
          action: "Comprar AGD",
          route: "/checkout",
          icon: DollarSign,
          color: "text-green-500",
        },
        {
          id: "choose-stable",
          title: "2. Escolher Stablecoin",
          description: "sUSD para mercado global ou sBRL para Brasil",
          action: "Ver Stablecoins",
          route: "/defi/mint",
          icon: Shield,
          color: "text-blue-500",
        },
        {
          id: "deposit-collateral",
          title: "3. Depositar Colateral",
          description: "Deposite BTC/ETH como garantia (LTV até 80%)",
          action: "Depositar",
          route: "/defi/mint?step=collateral",
          icon: Shield,
          color: "text-purple-500",
        },
        {
          id: "mint-stable",
          title: "4. Gerar Stablecoins",
          description: "Mint sUSD/sBRL usando seu colateral cripto",
          action: "Gerar",
          route: "/defi/mint?step=mint",
          icon: CheckCircle,
          color: "text-[#00FFD1]",
        },
        {
          id: "explore-yield",
          title: "5. Explorar Yields",
          description: "Coloque stablecoins para render 5-8% APY",
          action: "Ver Yields",
          route: "/defi/vaults",
          icon: TrendingUp,
          color: "text-yellow-500",
        },
        {
          id: "hedge-commodities",
          title: "6. Hedge Commodities",
          description: "Use derivativos para proteção ou especulação",
          action: "Fazer Hedge",
          route: "/trade?tab=futures",
          icon: Shield,
          color: "text-orange-500",
        },
      ],
      fees: [
        { service: "Mint sUSD/sBRL", fee: "0.5% do valor" },
        { service: "Yield Vaults", fee: "10% do lucro" },
        { service: "Trading Futures", fee: "0.1% por trade" },
        { service: "Saque Colateral", fee: "0.2% + gas" },
      ],
    },
    "trader-institutional": {
      title: "Fluxo do Trader Institucional",
      description: "Acesso profissional com dados RT e limites elevados",
      steps: [
        {
          id: "kyc-institutional",
          title: "1. KYC Institucional",
          description: "Verificação corporativa completa",
          action: "Iniciar KYC",
          route: "/onboarding?step=kyc",
          icon: Shield,
          color: "text-red-500",
        },
        {
          id: "bulk-agd",
          title: "2. Compra em Volume",
          description: "Desconto progressivo para volumes >$100k",
          action: "Comprar Volume",
          route: "/checkout?type=institutional",
          icon: DollarSign,
          color: "text-green-500",
        },
        {
          id: "api-access",
          title: "3. Acesso API",
          description: "Integração via REST/WebSocket para trading",
          action: "Configurar API",
          route: "/account/api",
          icon: CheckCircle,
          color: "text-blue-500",
        },
        {
          id: "rt-data",
          title: "4. Dados Real-Time",
          description: "CME/ICE/B3 com latência <100ms",
          action: "Ativar RT",
          route: "/analytics/market-data",
          icon: TrendingUp,
          color: "text-[#00FFD1]",
        },
        {
          id: "risk-controls",
          title: "5. Controles de Risco",
          description: "Limites automáticos e alertas personalizados",
          action: "Configurar",
          route: "/analytics/risk",
          icon: Shield,
          color: "text-purple-500",
        },
      ],
      fees: [
        { service: "Dados Real-Time", fee: "$500/mês" },
        { service: "API Access", fee: "$200/mês" },
        { service: "Trading (>$1M)", fee: "0.05% por trade" },
        { service: "Suporte Dedicado", fee: "Incluído" },
      ],
    },
    farmer: {
      title: "Fluxo do Agricultor/Cooperativa",
      description: "Tokenize ativos rurais e acesse crédito DeFi",
      steps: [
        {
          id: "register-land",
          title: "1. Cadastrar Propriedade",
          description: "Registre lotes com coordenadas GPS",
          action: "Cadastrar",
          route: "/rwa/land-register",
          icon: CheckCircle,
          color: "text-green-500",
        },
        {
          id: "tokenize-land",
          title: "2. Tokenizar Terra",
          description: "Transforme hectares em tokens negociáveis",
          action: "Tokenizar",
          route: "/rwa/land-pledge",
          icon: Shield,
          color: "text-blue-500",
        },
        {
          id: "issue-wr",
          title: "3. Emitir WR",
          description: "Warehouse Receipts para grãos armazenados",
          action: "Emitir WR",
          route: "/wr",
          icon: CheckCircle,
          color: "text-purple-500",
        },
        {
          id: "hedge-crop",
          title: "4. Hedge da Safra",
          description: "Proteja preços futuros da sua produção",
          action: "Fazer Hedge",
          route: "/trade?tab=futures&commodity=soja",
          icon: Shield,
          color: "text-orange-500",
        },
        {
          id: "future-crops",
          title: "5. Tokenizar Safra Futura",
          description: "Acesse crédito usando safra como garantia",
          action: "Tokenizar",
          route: "/rwa/future-crops",
          icon: TrendingUp,
          color: "text-[#00FFD1]",
        },
      ],
      fees: [
        { service: "Tokenização Terra", fee: "R$ 50/hectare" },
        { service: "Emissão WR", fee: "0.3% do valor" },
        { service: "Hedge Safra", fee: "0.2% por contrato" },
        { service: "Crédito Rural", fee: "CDI + 2% a.a." },
      ],
    },
    buyer: {
      title: "Fluxo da Indústria Compradora",
      description: "Otimize compras com RFQs automatizados e escrow",
      steps: [
        {
          id: "setup-supply",
          title: "1. Configurar Necessidades",
          description: "Defina commodities, volumes e cronograma",
          action: "Configurar",
          route: "/buyer/setup",
          icon: CheckCircle,
          color: "text-blue-500",
        },
        {
          id: "create-rfq",
          title: "2. Criar RFQ",
          description: "Request for Quote automatizado",
          action: "Criar RFQ",
          route: "/buyer/rfq",
          icon: DollarSign,
          color: "text-green-500",
        },
        {
          id: "accept-terms",
          title: "3. Aceitar Termos",
          description: "Compare ofertas e aceite melhores condições",
          action: "Ver Ofertas",
          route: "/buyer/offers",
          icon: CheckCircle,
          color: "text-purple-500",
        },
        {
          id: "escrow-payment",
          title: "4. Pagamento Escrow",
          description: "Pagamento seguro liberado na entrega",
          action: "Configurar",
          route: "/buyer/escrow",
          icon: Shield,
          color: "text-orange-500",
        },
        {
          id: "track-delivery",
          title: "5. Rastrear Entrega",
          description: "Acompanhe logística em tempo real",
          action: "Rastrear",
          route: "/logistics",
          icon: TrendingUp,
          color: "text-[#00FFD1]",
        },
      ],
      fees: [
        { service: "RFQ Automático", fee: "Gratuito" },
        { service: "Escrow Service", fee: "0.5% do valor" },
        { service: "Rastreamento", fee: "R$ 100/container" },
        { service: "Seguro Carga", fee: "0.8% do valor" },
      ],
    },
  }

  const currentFlow = flows[userType]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{currentFlow.title}</h2>
        <p className="text-gray-400">{currentFlow.description}</p>
      </div>

      {/* Process Flow */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Processo Passo a Passo</CardTitle>
          <CardDescription className="text-gray-400">
            Siga este fluxo para aproveitar ao máximo a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFlow.steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="relative">
                  <Card className="bg-gray-800 border-gray-700 hover:border-[#00FFD1]/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gray-700`}>
                          <Icon className={`h-5 w-5 ${step.color}`} />
                        </div>
                        <CardTitle className="text-white text-sm">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-400">{step.description}</p>
                      <Button
                        size="sm"
                        className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                        onClick={() => router.push(step.route)}
                      >
                        {step.action} <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                  {index < currentFlow.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Fees & Services */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Transparência de Taxas</CardTitle>
          <CardDescription className="text-gray-400">Todas as taxas são transparentes e competitivas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFlow.fees.map((fee, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">{fee.service}</span>
                <Badge variant="outline" className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30">
                  {fee.fee}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
