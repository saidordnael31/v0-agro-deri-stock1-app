"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketTicker } from "@/components/MarketTicker"
import { DynamicHeader } from "@/components/DynamicHeader"
import { Search, FileText, MapPin, Package, Eye } from "lucide-react"

// Mock user claims for demo
const mockClaims = {
  role: "buyer" as const,
  tier: "retail" as const,
  kyc: false,
  features: ["wr_readonly"],
}

export default function WRPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCommodity, setSelectedCommodity] = useState("all")

  const mockWRs = [
    {
      id: "WR-2024-001",
      commodity: "Soja",
      quantity: "1,000",
      unit: "sacas",
      warehouse: "Armazém Santos SP",
      grade: "Premium",
      issueDate: "2024-01-15",
      status: "Armazenado",
      tokenized: true,
    },
    {
      id: "WR-2024-002",
      commodity: "Milho",
      quantity: "2,500",
      unit: "sacas",
      warehouse: "Cooperativa Paraná",
      grade: "Grau A",
      issueDate: "2024-01-20",
      status: "Em Trânsito",
      tokenized: false,
    },
    {
      id: "WR-2024-003",
      commodity: "Café",
      quantity: "500",
      unit: "sacas",
      warehouse: "Armazém Minas MG",
      grade: "Especial",
      issueDate: "2024-01-25",
      status: "Entregue",
      tokenized: true,
    },
  ]

  const filteredWRs = mockWRs.filter(
    (wr) =>
      wr.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wr.commodity.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicHeader claims={mockClaims} />
      <MarketTicker />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Warehouse Receipts (WR)</h1>
            <p className="text-gray-400 mt-2">Consulta universal de recibos de armazém e status de commodities</p>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
            <Eye className="h-4 w-4 mr-2" />
            Somente Leitura
          </Badge>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="search" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <Search className="h-4 w-4 mr-2" />
              Consultar WR
            </TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:bg-[#00FFD1] data-[state=active]:text-black">
              <Package className="h-4 w-4 mr-2" />
              Status Global
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Buscar Warehouse Receipts</CardTitle>
                <CardDescription className="text-gray-400">
                  Consulte informações de recibos de armazém por ID ou commodity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Digite o ID do WR ou nome da commodity..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-950 border-gray-700 text-white"
                    />
                  </div>
                  <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                    <SelectTrigger className="w-48 bg-gray-950 border-gray-700">
                      <SelectValue placeholder="Filtrar por commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="soja">Soja</SelectItem>
                      <SelectItem value="milho">Milho</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="acucar">Açúcar</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {filteredWRs.map((wr) => (
                <Card key={wr.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{wr.id}</h3>
                          <Badge
                            variant="outline"
                            className={
                              wr.status === "Armazenado"
                                ? "bg-green-500/10 text-green-500 border-green-500/30"
                                : wr.status === "Em Trânsito"
                                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                                  : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                            }
                          >
                            {wr.status}
                          </Badge>
                          {wr.tokenized && (
                            <Badge variant="outline" className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30">
                              Tokenizado
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Commodity</p>
                            <p className="text-white font-medium">{wr.commodity}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Quantidade</p>
                            <p className="text-white font-medium">
                              {wr.quantity} {wr.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Grau</p>
                            <p className="text-white font-medium">{wr.grade}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Data Emissão</p>
                            <p className="text-white font-medium">{wr.issueDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="h-4 w-4" />
                          <span>{wr.warehouse}</span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">WRs Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#00FFD1]">1,247</div>
                  <p className="text-sm text-gray-400">Total de recibos ativos</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Volume Armazenado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">85,420</div>
                  <p className="text-sm text-gray-400">Toneladas em estoque</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Taxa Tokenização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">67%</div>
                  <p className="text-sm text-gray-400">WRs tokenizados</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
