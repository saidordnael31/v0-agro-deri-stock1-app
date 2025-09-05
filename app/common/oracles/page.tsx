"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketTicker } from "@/components/MarketTicker"
import { DynamicHeader } from "@/components/DynamicHeader"
import { Activity, Database, TrendingUp, AlertCircle, CheckCircle, Clock, Eye } from "lucide-react"

// Mock user claims for demo
const mockClaims = {
  role: "trader" as const,
  tier: "pro" as const,
  kyc: true,
  features: ["oracles_readonly", "markets_rt"],
}

export default function OraclesPage() {
  const [oracles, setOracles] = useState([
    {
      id: "ORACLE-SOJA-001",
      name: "Soja Price Oracle",
      type: "price",
      status: "active",
      confidence: 98.5,
      lastUpdate: new Date().toISOString(),
      sources: 5,
      value: "1580.50",
      unit: "BRL/saca",
      deviation: 0.2,
    },
    {
      id: "ORACLE-MILHO-001",
      name: "Milho Price Oracle",
      type: "price",
      status: "active",
      confidence: 96.8,
      lastUpdate: new Date(Date.now() - 300000).toISOString(),
      sources: 4,
      value: "890.25",
      unit: "BRL/saca",
      deviation: 0.5,
    },
    {
      id: "ORACLE-WEATHER-001",
      name: "Weather Oracle MT",
      type: "weather",
      status: "warning",
      confidence: 85.2,
      lastUpdate: new Date(Date.now() - 600000).toISOString(),
      sources: 3,
      value: "Seco",
      unit: "condição",
      deviation: 1.2,
    },
    {
      id: "ORACLE-SUPPLY-001",
      name: "Supply Chain Oracle",
      type: "supply",
      status: "active",
      confidence: 92.1,
      lastUpdate: new Date(Date.now() - 180000).toISOString(),
      sources: 6,
      value: "Normal",
      unit: "status",
      deviation: 0.8,
    },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setOracles((prev) =>
        prev.map((oracle) => ({
          ...oracle,
          confidence: Math.max(80, Math.min(99, oracle.confidence + (Math.random() - 0.5) * 2)),
          lastUpdate: new Date().toISOString(),
          deviation: Math.max(0, oracle.deviation + (Math.random() - 0.5) * 0.2),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/30"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-500"
    if (confidence >= 85) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader claims={mockClaims} />
      <MarketTicker />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Oracles & Data Feeds</h1>
            <p className="text-gray-400 mt-2">
              Monitore feeds de preços, bases, unidades e dados externos em tempo real
            </p>
          </div>
          <Badge variant="outline" className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30">
            <Eye className="h-4 w-4 mr-2" />
            Acesso Universal
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <Activity className="h-4 w-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="price" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <TrendingUp className="h-4 w-4 mr-2" />
              Preços
            </TabsTrigger>
            <TabsTrigger value="external" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <Database className="h-4 w-4 mr-2" />
              Dados Externos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Oracles Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    {oracles.filter((o) => o.status === "active").length}
                  </div>
                  <p className="text-xs text-gray-500">de {oracles.length} total</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Confiança Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#00FFD1]">
                    {(oracles.reduce((acc, o) => acc + o.confidence, 0) / oracles.length).toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-500">últimas 24h</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Fontes Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">
                    {oracles.reduce((acc, o) => acc + o.sources, 0)}
                  </div>
                  <p className="text-xs text-gray-500">feeds conectados</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">
                    {oracles.filter((o) => o.status === "warning").length}
                  </div>
                  <p className="text-xs text-gray-500">requerem atenção</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4">
              {oracles.map((oracle) => (
                <Card key={oracle.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(oracle.status)}
                          <h3 className="text-lg font-semibold text-white">{oracle.name}</h3>
                          <Badge variant="outline" className={getStatusColor(oracle.status)}>
                            {oracle.status}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                            {oracle.type}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Valor Atual</p>
                            <p className="text-white font-medium">
                              {oracle.value} {oracle.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Confiança</p>
                            <p className={`font-medium ${getConfidenceColor(oracle.confidence)}`}>
                              {oracle.confidence.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Fontes</p>
                            <p className="text-white font-medium">{oracle.sources} ativas</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Desvio</p>
                            <p className="text-white font-medium">{oracle.deviation.toFixed(2)}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Última atualização: {new Date(oracle.lastUpdate).toLocaleTimeString("pt-BR")}</span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        Ver Histórico
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="price" className="space-y-6">
            <div className="grid gap-4">
              {oracles
                .filter((oracle) => oracle.type === "price")
                .map((oracle) => (
                  <Card key={oracle.id} className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-[#00FFD1]" />
                        {oracle.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Oracle de preços com {oracle.sources} fontes de dados
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#00FFD1]">{oracle.value}</p>
                          <p className="text-sm text-gray-400">{oracle.unit}</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${getConfidenceColor(oracle.confidence)}`}>
                            {oracle.confidence.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-400">Confiança</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{oracle.deviation.toFixed(2)}%</p>
                          <p className="text-sm text-gray-400">Desvio</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="external" className="space-y-6">
            <div className="grid gap-4">
              {oracles
                .filter((oracle) => oracle.type !== "price")
                .map((oracle) => (
                  <Card key={oracle.id} className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Database className="h-5 w-5 text-blue-500" />
                        {oracle.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Dados externos de {oracle.type} com {oracle.sources} fontes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-xl font-bold text-white">{oracle.value}</p>
                          <p className="text-sm text-gray-400">{oracle.unit}</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xl font-bold ${getConfidenceColor(oracle.confidence)}`}>
                            {oracle.confidence.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-400">Confiança</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className={getStatusColor(oracle.status)}>
                            {oracle.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
