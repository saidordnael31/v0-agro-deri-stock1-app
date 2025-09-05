"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wheat, FileText, Shield, TrendingUp, Coins, Umbrella, ArrowRight } from "lucide-react"

const flowSteps = [
  {
    id: "production",
    title: "Produção",
    icon: Wheat,
    description: "Cultivo e colheita de commodities agrícolas",
    explanation:
      "Tudo começa na fazenda. O produtor cultiva soja, milho, café ou açúcar. Durante o ciclo produtivo, ele enfrenta riscos climáticos, pragas e volatilidade de preços que podem afetar sua rentabilidade.",
  },
  {
    id: "wr",
    title: "Recibo de Armazém (WR)",
    icon: FileText,
    description: "Tokenização da commodity armazenada",
    explanation:
      "Após a colheita, a commodity é armazenada em armazéns certificados. O Warehouse Receipt (WR) é um token que representa a propriedade física da commodity, permitindo negociação sem movimentação física.",
  },
  {
    id: "guarantee",
    title: "Garantia (SBLC/CPR)",
    icon: Shield,
    description: "Criação de garantias bancárias tokenizadas",
    explanation:
      "SBLC (Standby Letter of Credit) e CPR (Cédula de Produto Rural) são instrumentos financeiros que garantem pagamento. Na AgroDeri, eles são tokenizados, permitindo fracionamento e negociação.",
  },
  {
    id: "hedge",
    title: "Hedge",
    icon: TrendingUp,
    description: "Proteção contra volatilidade de preços",
    explanation:
      "O hedge protege contra oscilações de preço. Usando futuros e opções, o produtor pode fixar preços de venda antecipadamente, reduzindo riscos de mercado.",
  },
  {
    id: "settlement",
    title: "Liquidação (Spot/Swap)",
    icon: Coins,
    description: "Conversão em stablecoins ou moeda fiduciária",
    explanation:
      "Na liquidação, as posições são convertidas em stablecoins (USSA, BRSA, GLDA) ou moeda tradicional. O swap permite troca eficiente entre diferentes ativos.",
  },
  {
    id: "vaults",
    title: "Vaults",
    icon: Umbrella,
    description: "Yield farming e gestão de risco",
    explanation:
      "Os vaults são pools de liquidez que geram rendimento. Oferecem estratégias conservadoras, balanceadas e agressivas, permitindo que investidores participem do ecossistema agrícola.",
  },
]

export function FlowCards() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Como Funciona o Ecossistema AgroDeri</h2>
          <p className="text-gray-200 text-lg">
            Entenda o fluxo completo da produção agrícola até os instrumentos DeFi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowSteps.map((step, index) => (
            <Card key={step.id} className="border-gray-800 bg-gray-900/50 hover:bg-gray-900/70 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#00FFD1]/10 border border-[#00FFD1]/20">
                    <step.icon className="h-6 w-6 text-[#00FFD1]" />
                  </div>
                  <div className="text-sm text-[#00FFD1] font-medium">Etapa {index + 1}</div>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between text-[#00FFD1] hover:bg-[#00FFD1]/10">
                      Saiba mais
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-3">
                        <step.icon className="h-6 w-6 text-[#00FFD1]" />
                        {step.title}
                      </SheetTitle>
                      <SheetDescription className="text-left pt-4">{step.explanation}</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
