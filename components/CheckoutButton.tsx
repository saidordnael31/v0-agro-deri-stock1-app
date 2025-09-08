"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

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
  const pollRef = useRef<number | null>(null)

  async function createIntent() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          userWallet: "", // opcional: preencher do state auth/wallet
          amount,
          asset,
          metadata,
          redirectUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      const { intentId, checkoutUrl } = await res.json()
      setIntentId(intentId)

      // abre em modal simples (nova aba ou iframe – aqui: nova aba p/ evitar CSP)
      window.open(checkoutUrl, "_blank", "noopener,noreferrer")

      // inicia polling de status
      startPolling(intentId)
    } catch (e) {
      console.error(e)
      alert("Falha ao iniciar checkout.")
    } finally {
      setLoading(false)
    }
  }

  function startPolling(id: string) {
    stopPolling()
    pollRef.current = window.setInterval(async () => {
      try {
        const r = await fetch(`/api/checkout/status?intentId=${encodeURIComponent(id)}`, { cache: "no-store" })
        if (!r.ok) return
        const data = await r.json()
        if (data.status === "SETTLED" || data.status === "FAILED") {
          stopPolling()
          if (data.status === "SETTLED") {
            onSettled?.({ intentId: id, txHash: data.txHash })
            alert("Checkout concluído com sucesso.")
          } else {
            alert("Checkout falhou.")
          }
        }
      } catch {}
    }, 2000)
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }

  useEffect(() => () => stopPolling(), [])

  return (
    <button
      onClick={createIntent}
      disabled={loading}
      className={className ?? "px-4 py-2 rounded-2xl bg-cyan-300/20 hover:bg-cyan-300/30 border border-cyan-400/40"}
      title={type}
    >
      {loading ? "Abrindo checkout..." : (children ?? label ?? defaultLabel(type, asset))}
    </button>
  )
}

export default CheckoutButton

function defaultLabel(type: CheckoutType, asset: string) {
  if (type === "BUY_AGD") return "Comprar AGD"
  if (type === "CUSTODY_DEPOSIT") return `Depositar ${asset}`
  return `Sacar ${asset}`
}
