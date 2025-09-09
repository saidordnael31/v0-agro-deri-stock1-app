import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Factory, Calendar, MapPin, Package } from "lucide-react"

export default function BuyerSetupPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Topbar />

      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Factory className="h-8 w-8 text-[#00FFD1]" />
            <h1 className="text-3xl font-bold text-white">Configuração de Necessidades</h1>
          </div>
          <p className="text-gray-400">Configure suas necessidades de commodities para receber ofertas automatizadas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="h-5 w-5" />
                Commodities Necessárias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Commodity</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Selecione a commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soja">Soja</SelectItem>
                    <SelectItem value="milho">Milho</SelectItem>
                    <SelectItem value="cafe">Café</SelectItem>
                    <SelectItem value="acucar">Açúcar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Volume (ton)</Label>
                  <Input className="bg-gray-800 border-gray-700" placeholder="1000" />
                </div>
                <div>
                  <Label className="text-gray-300">Qualidade</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Grau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="basic">Básico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Cronograma de Entrega</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <Input type="date" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Local de Entrega</Label>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <Input className="bg-gray-800 border-gray-700" placeholder="Porto de Santos, SP" />
                </div>
              </div>

              <Button className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">Adicionar Commodity</Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Resumo das Necessidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Soja Premium</div>
                    <div className="text-sm text-gray-400">1.000 ton - Santos/SP</div>
                  </div>
                  <Badge variant="outline" className="text-[#00FFD1] border-[#00FFD1]">
                    Mar/2024
                  </Badge>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-white font-medium mb-3">Próximos Passos</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>1. Criar RFQ automatizado</div>
                  <div>2. Receber ofertas de fornecedores</div>
                  <div>3. Configurar pagamento escrow</div>
                  <div>4. Acompanhar entrega</div>
                </div>
              </div>

              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">Criar RFQ Automatizado</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
