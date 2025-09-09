import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, FileText, Camera, Building, CheckCircle } from "lucide-react"

export default function AccountKYCPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Topbar />

      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#00FFD1]" />
            <h1 className="text-3xl font-bold text-white">Verificação KYC</h1>
          </div>
          <p className="text-gray-400">Complete sua verificação para acessar todos os recursos da plataforma</p>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Progresso da Verificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Progresso Geral</span>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    Em Andamento
                  </Badge>
                </div>
                <Progress value={60} className="h-2" />
                <div className="text-sm text-gray-400">3 de 5 etapas concluídas</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "Informações Pessoais",
                status: "completed",
                description: "Dados básicos e contato",
              },
              {
                icon: Camera,
                title: "Documento com Foto",
                status: "completed",
                description: "RG ou CNH válidos",
              },
              {
                icon: FileText,
                title: "Comprovante de Renda",
                status: "completed",
                description: "Últimos 3 contracheques",
              },
              {
                icon: Building,
                title: "Dados Empresariais",
                status: "pending",
                description: "CNPJ e documentos corporativos",
              },
              {
                icon: Shield,
                title: "Verificação Final",
                status: "pending",
                description: "Análise e aprovação",
              },
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${step.status === "completed" ? "bg-green-600/20" : "bg-gray-700"}`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <Icon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">{step.description}</p>
                        {step.status === "completed" ? (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            Concluído
                          </Badge>
                        ) : (
                          <Button size="sm" className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
                            Completar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
