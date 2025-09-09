"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"

type CheckoutType = "BUY_AGD" | "CUSTODY_DEPOSIT" | "CUSTODY_WITHDRAW"

type Props = {
  type: CheckoutType
  asset?: string // AGD, BTC, ETH, USDT...
  amount?: number // valor sugerido
  metadata?: Record<string, any>
  label?: string // texto do botão
  className?: string
  onSettled?: (info: { intentId: string; txHash?: string }) => void
  children?: React.ReactNode // Added children prop for button content
}

export function CheckoutButton({
  type,
  asset = "AGD",
  amount = 0,
  metadata,
  label,
  className,
  onSettled,
  children,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [intentId, setIntentId] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("idle")
  const pollRef = useRef<number | null>(null)
  const { toast } = useToast()

  async function createIntent() {
    setLoading(true)
    setStatus("creating")

    try {
      const checkoutUrl = `https://agroderi.in/checkout?type=${type}&amount=${amount}&asset=${asset}`

      toast({
        title: "Redirecionando para AgroDeri",
        description: `Abrindo gateway oficial para compra de ${amount} ${asset}`,
      })

      window.open(checkoutUrl, "_blank", "noopener,noreferrer")

      setStatus("pending")

      setTimeout(() => {
        setStatus("SETTLED")
        onSettled?.({ intentId: `agroderi_${Date.now()}` })
        toast({
          title: "Redirecionamento Concluído",
          description: "Continue o processo no gateway oficial AgroDeri",
        })
      }, 2000)
    } catch (e) {
      console.error("[v0] Checkout error:", e)
      setStatus("error")
      toast({
        title: "Erro no Redirecionamento",
        description: "Não foi possível abrir o gateway AgroDeri",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  function startPolling(id: string) {
    stopPolling()
    pollRef.current = window.setInterval(async () => {
      try {
        const r = await fetch(`/api/checkout/status?intentId=${encodeURIComponent(id)}`, {
          cache: "no-store",
        })

        if (!r.ok) {
          console.warn("[v0] Status polling failed:", r.status)
          return
        }

        const data = await r.json()
        setStatus(data.status)

        if (data.status === "SETTLED" || data.status === "FAILED") {
          stopPolling()

          if (data.status === "SETTLED") {
            onSettled?.({ intentId: id, txHash: data.txHash })
            toast({
              title: "Checkout Complete",
              description: `Successfully processed ${amount} ${asset}`,
            })
          } else {
            toast({
              title: "Checkout Failed",
              description: "Transaction was not completed successfully",
              variant: "destructive",
            })
          }
        }
      } catch (error) {
        console.error("[v0] Polling error:", error)
      }
    }, 2000)
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }

  useEffect(() => () => stopPolling(), [])

  const getButtonText = () => {
    if (loading) return "Abrindo AgroDeri..."
    if (status === "pending") return "Continue no AgroDeri.in"
    if (status === "SETTLED") return "✓ Redirecionado"
    return children ?? label ?? defaultLabel(type, asset)
  }

  const getButtonClass = () => {
    const baseClass = className ?? "px-4 py-2 rounded-2xl border transition-colors"

    if (loading || status === "pending") {
      return `${baseClass} bg-yellow-500/20 border-yellow-400/40 text-yellow-200`
    }

    if (status === "SETTLED") {
      return `${baseClass} bg-green-500/20 border-green-400/40 text-green-200`
    }

    if (status === "error" || status === "FAILED") {
      return `${baseClass} bg-red-500/20 border-red-400/40 text-red-200`
    }

    return `${baseClass} bg-cyan-300/20 hover:bg-cyan-300/30 border-cyan-400/40`
  }

  return (
    <button
      onClick={createIntent}
      disabled={loading || status === "pending" || status === "APPROVED"}
      className={getButtonClass()}
      title={`${type} - Status: ${status}`}
    >
      {getButtonText()}
    </button>
  )
}

export default CheckoutButton

function defaultLabel(type: CheckoutType, asset: string) {
  if (type === "BUY_AGD") return "Comprar AGD"
  if (type === "CUSTODY_DEPOSIT") return `Depositar ${asset}`
  return `Sacar ${asset}`
}
