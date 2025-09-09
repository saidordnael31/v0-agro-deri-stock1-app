import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Activity, Globe, Zap } from "lucide-react"

export default function MarketDataPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Topbar />

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="h-8 w-8 text-[#00FFD1]" />
            <h1 className="text-3xl font-bold text-white">Market Data Analytics</h1>
          </div>
          <p className="text-gray-400">Dados de mercado em tempo real de múltiplas exchanges globais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Exchanges Conectadas", value: "12", icon: Globe, color: "text-blue-400" },
            { title: "Símbolos Ativos", value: "847", icon: TrendingUp, color: "text-green-400" },
            { title: "Latência Média", value: "45ms", icon: Zap, color: "text-[#00FFD1]" },
            { title: "Uptime", value: "99.9%", icon: Activity, color: "text-purple-400" },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Exchanges Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "CME Group", region: "Chicago", latency: "Real-time", status: "connected" },
                { name: "ICE Futures", region: "London", latency: "Real-time", status: "connected" },
                { name: "B3 Brasil", region: "São Paulo", latency: "15min delay", status: "connected" },
                { name: "DCE China", region: "Dalian", latency: "Real-time", status: "connected" },
              ].map((exchange, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{exchange.name}</div>
                    <div className="text-sm text-gray-400">{exchange.region}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-400 border-green-400 mb-1">
                      {exchange.latency}
                    </Badge>
                    <div className="text-xs text-gray-400">Conectado</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Configurações de Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Dados Real-time</span>
                  <Badge variant="outline" className="text-[#00FFD1] border-[#00FFD1]">
                    Ativo
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">WebSocket Streaming</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Conectado
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Backup Polling</span>
                  <Badge variant="outline" className="text-gray-400 border-gray-400">
                    Standby
                  </Badge>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">Configurar Alertas</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
