"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketTicker } from "@/components/MarketTicker"
import { DynamicHeader } from "@/components/DynamicHeader"
import { Truck, Ship, Plane, MapPin, Clock, AlertTriangle, CheckCircle, Eye } from "lucide-react"

// Mock user claims for demo
const mockClaims = {
  role: "farmer" as const,
  tier: "retail" as const,
  kyc: true,
  features: ["logistics_readonly"],
}

export default function LogisticsPage() {
  const [trackingNumber, setTrackingNumber] = useState("")

  const mockShipments = [
    {
      id: "LOG-2024-001",
      commodity: "Soja",
      origin: "Rondonópolis, MT",
      destination: "Porto de Santos, SP",
      status: "Em Trânsito",
      progress: 65,
      transport: "truck",
      eta: "2024-02-15",
      carrier: "TransAgro Logística",
    },
    {
      id: "LOG-2024-002",
      commodity: "Milho",
      origin: "Cascavel, PR",
      destination: "Porto de Paranaguá, PR",
      status: "Entregue",
      progress: 100,
      transport: "truck",
      eta: "2024-02-10",
      carrier: "Cooperativa Logística",
    },
    {
      id: "LOG-2024-003",
      commodity: "Café",
      origin: "Santos, SP",
      destination: "Hamburg, Alemanha",
      status: "Embarcado",
      progress: 30,
      transport: "ship",
      eta: "2024-03-01",
      carrier: "Global Shipping Co",
    },
  ]

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case "truck":
        return <Truck className="h-4 w-4" />
      case "ship":
        return <Ship className="h-4 w-4" />
      case "plane":
        return <Plane className="h-4 w-4" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Trânsito":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
      case "Entregue":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "Embarcado":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader claims={mockClaims} />
      <MarketTicker />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Logística & Rastreamento</h1>
            <p className="text-gray-400 mt-2">Acompanhe status de BL, containers, seguros e movimentação portuária</p>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
            <Eye className="h-4 w-4 mr-2" />
            Somente Leitura
          </Badge>
        </div>

        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="tracking" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <MapPin className="h-4 w-4 mr-2" />
              Rastreamento
            </TabsTrigger>
            <TabsTrigger value="ports" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <Ship className="h-4 w-4 mr-2" />
              Status Portuário
            </TabsTrigger>
            <TabsTrigger value="insurance" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Seguros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Rastrear Embarque</CardTitle>
                <CardDescription className="text-gray-400">
                  Digite o número de rastreamento ou BL para acompanhar sua carga
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Digite o número de rastreamento..."
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="bg-gray-950 border-gray-700 text-white"
                  />
                  <Button className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                    <MapPin className="h-4 w-4 mr-2" />
                    Rastrear
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {mockShipments.map((shipment) => (
                <Card key={shipment.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-white">{shipment.id}</h3>
                            <Badge variant="outline" className={getStatusColor(shipment.status)}>
                              {shipment.status}
                            </Badge>
                            <div className="flex items-center gap-1 text-gray-400">
                              {getTransportIcon(shipment.transport)}
                              <span className="text-sm">{shipment.carrier}</span>
                            </div>
                          </div>
                          <p className="text-gray-400">{shipment.commodity}</p>
                        </div>

                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="text-gray-400">Origem:</span>
                            <span className="text-white">{shipment.origin}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="text-gray-400">Destino:</span>
                            <span className="text-white">{shipment.destination}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-400">ETA:</span>
                            <span className="text-white">{shipment.eta}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-[#00FFD1]" />
                            <span className="text-gray-400">Progresso:</span>
                            <span className="text-white">{shipment.progress}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progresso da Entrega</span>
                          <span className="text-white">{shipment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#00FFD1] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Porto de Santos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      Operacional
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fila de Navios:</span>
                    <span className="text-white">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tempo Médio:</span>
                    <span className="text-white">3.2 dias</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Porto de Paranaguá</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                      Congestionado
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fila de Navios:</span>
                    <span className="text-white">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tempo Médio:</span>
                    <span className="text-white">5.1 dias</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Porto do Rio Grande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      Operacional
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fila de Navios:</span>
                    <span className="text-white">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tempo Médio:</span>
                    <span className="text-white">2.8 dias</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Status de Seguros Ativos</CardTitle>
                <CardDescription className="text-gray-400">
                  Acompanhe a cobertura de seguros para suas cargas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Seguro de Transporte</h4>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cobertura Total:</span>
                      <span className="text-white">R$ 2.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cargas Ativas:</span>
                      <span className="text-white">15</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Seguro de Armazenagem</h4>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cobertura Total:</span>
                      <span className="text-white">R$ 1.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Armazéns Cobertos:</span>
                      <span className="text-white">8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
