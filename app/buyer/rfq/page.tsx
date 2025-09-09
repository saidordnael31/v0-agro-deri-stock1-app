import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Users } from "lucide-react"

export default function BuyerRFQPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Topbar />

      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Request for Quote (RFQ)</h1>
          <p className="text-gray-400">Gerencie suas solicitações de cotação automatizadas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">RFQs Ativas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "RFQ-001", commodity: "Soja Premium", volume: "1.000 ton", responses: 5, deadline: "2 dias" },
                  { id: "RFQ-002", commodity: "Milho Standard", volume: "500 ton", responses: 3, deadline: "5 dias" },
                ].map((rfq) => (
                  <div key={rfq.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-white font-medium">{rfq.id}</div>
                        <div className="text-sm text-gray-400">
                          {rfq.commodity} - {rfq.volume}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Ativa
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {rfq.responses} respostas
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {rfq.deadline} restantes
                      </div>
                    </div>

                    <Button size="sm" className="mt-3 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                      Ver Ofertas
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00FFD1]">8</div>
                  <div className="text-sm text-gray-400">RFQs Enviadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">23</div>
                  <div className="text-sm text-gray-400">Ofertas Recebidas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">R$ 2.1M</div>
                  <div className="text-sm text-gray-400">Volume Negociado</div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">
              <FileText className="h-4 w-4 mr-2" />
              Nova RFQ
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
