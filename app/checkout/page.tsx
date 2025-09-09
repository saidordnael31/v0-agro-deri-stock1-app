"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const [intent, setIntent] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("PENDING")
  const [txHash, setTxHash] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    const intentId = url.searchParams.get("intent")
    const checkoutType = url.searchParams.get("type")

    if (intentId) {
      setIntent(intentId)
      setType(checkoutType)

      const iv = setInterval(async () => {
        try {
          const r = await fetch(`/api/checkout/status?intentId=${intentId}`, { cache: "no-store" })
          if (r.ok) {
            const data = await r.json()
            setStatus(data.status)
            if (data.txHash) setTxHash(data.txHash)

            if (data.status === "SETTLED" || data.status === "FAILED") {
              clearInterval(iv)
            }
          }
        } catch (error) {
          console.error("[v0] Status check failed:", error)
        }
      }, 1500)

      return () => clearInterval(iv)
    }
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case "SETTLED":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "FAILED":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return <Clock className="h-6 w-6 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "SETTLED":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "FAILED":
        return "bg-red-500/10 text-red-500 border-red-500/30"
      case "APPROVED":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "PENDING":
        return "Aguardando confirmação do pagamento..."
      case "APPROVED":
        return "Pagamento aprovado, processando transação..."
      case "SETTLED":
        return "Transação concluída com sucesso!"
      case "FAILED":
        return "Falha no processamento da transação."
      default:
        return "Processando..."
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">AgroDeri Checkout</h1>
          <p className="text-muted-foreground">Finalize sua transação</p>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">{getStatusIcon()}</div>
            <CardTitle className="text-lg">Status da Transação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge variant="outline" className={getStatusColor()}>
                {status}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">{getStatusMessage()}</p>
            </div>

            {intent && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Intent ID:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {intent.slice(0, 8)}...{intent.slice(-8)}
                  </code>
                </div>

                {type && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">{type}</span>
                  </div>
                )}

                {txHash && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">TX Hash:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {txHash.slice(0, 6)}...{txHash.slice(-6)}
                    </code>
                  </div>
                )}
              </div>
            )}

            {status === "SETTLED" && (
              <div className="pt-4 border-t">
                <Button onClick={() => router.back()} className="w-full" variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao App
                </Button>
              </div>
            )}

            {status === "FAILED" && (
              <div className="pt-4 border-t space-y-2">
                <Button onClick={() => window.location.reload()} className="w-full" variant="outline">
                  Tentar Novamente
                </Button>
                <Button onClick={() => router.back()} className="w-full" variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao App
                </Button>
              </div>
            )}

            {!intent && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Nenhuma transação encontrada. Inicie um processo de checkout no app principal.
                </p>
                <Button onClick={() => router.push("/")} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Ir para o App
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Powered by AgroDeri • Secure Agricultural Finance</p>
        </div>
      </div>
    </div>
  )
}
