"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WarehouseReceipt {
  id: string
  commodity: string
  volume: number
  unit: string
  warehouse: string
  grade: string
  issueDate: string
  expiryDate: string
  status: "active" | "expired" | "used"
}

export function WrForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [receipts] = useState<WarehouseReceipt[]>([
    {
      id: "WR-2024-001",
      commodity: "Soja",
      volume: 1000,
      unit: "sacas",
      warehouse: "Armazém Central SP",
      grade: "A",
      issueDate: "2024-01-15",
      expiryDate: "2024-07-15",
      status: "active",
    },
    {
      id: "WR-2024-002",
      commodity: "Milho",
      volume: 500,
      unit: "toneladas",
      warehouse: "Cooperativa Vale Verde",
      grade: "B+",
      issueDate: "2024-02-01",
      expiryDate: "2024-08-01",
      status: "active",
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Warehouse Receipt Registrado",
      description: "Seu recibo de armazém foi registrado com sucesso.",
    })

    setIsLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Ativo</Badge>
      case "expired":
        return <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Expirado</Badge>
      case "used":
        return <Badge className="bg-gray-600/20 text-gray-200 border-gray-600/30">Utilizado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Registrar WR</TabsTrigger>
          <TabsTrigger value="consult">Consultar WRs</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Novo Warehouse Receipt</span>
              </CardTitle>
              <CardDescription>Registre um novo recibo de armazém para suas commodities estocadas</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commodity">Commodity</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soja">Soja</SelectItem>
                        <SelectItem value="milho">Milho</SelectItem>
                        <SelectItem value="trigo">Trigo</SelectItem>
                        <SelectItem value="cafe">Café</SelectItem>
                        <SelectItem value="algodao">Algodão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <Input id="volume" type="number" placeholder="1000" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidade</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sacas">Sacas (60kg)</SelectItem>
                        <SelectItem value="toneladas">Toneladas</SelectItem>
                        <SelectItem value="bushels">Bushels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="warehouse">Armazém</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o armazém" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="central-sp">Armazém Central SP</SelectItem>
                        <SelectItem value="cooperativa-vale">Cooperativa Vale Verde</SelectItem>
                        <SelectItem value="graos-brasil">Grãos Brasil Ltda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Classificação</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a classificação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A - Premium</SelectItem>
                        <SelectItem value="B+">B+ - Superior</SelectItem>
                        <SelectItem value="B">B - Padrão</SelectItem>
                        <SelectItem value="C">C - Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Data de Vencimento</Label>
                    <Input id="expiry" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea id="observations" placeholder="Informações adicionais sobre a commodity..." rows={3} />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Registrando..." : "Registrar Warehouse Receipt"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consult">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Consultar Warehouse Receipts</span>
              </CardTitle>
              <CardDescription>Visualize e gerencie seus recibos de armazém registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input placeholder="Buscar por ID, commodity ou armazém..." className="flex-1" />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>

                <div className="space-y-4">
                  {receipts.map((receipt) => (
                    <Card key={receipt.id} className="border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-[#00FFD1]" />
                              <span className="font-medium">{receipt.id}</span>
                              {getStatusBadge(receipt.status)}
                            </div>
                            <p className="text-sm text-gray-200">
                              {receipt.volume} {receipt.unit} de {receipt.commodity} - Classificação {receipt.grade}
                            </p>
                            <p className="text-xs text-gray-300">
                              {receipt.warehouse} • Vence em {new Date(receipt.expiryDate).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                            <Button variant="outline" size="sm">
                              Detalhes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
