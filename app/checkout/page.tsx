"use client"

import { useEffect, useState } from "react"

export default function CheckoutPage() {
  const [intent, setIntent] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("PENDING")

  useEffect(() => {
    const url = new URL(window.location.href)
    const intentId = url.searchParams.get("intent")
    if (intentId) {
      setIntent(intentId)
      const iv = setInterval(async () => {
        const r = await fetch(`/api/checkout/status?intentId=${intentId}`, { cache: "no-store" })
        if (r.ok) {
          const data = await r.json()
          setStatus(data.status)
          if (data.status === "SETTLED" || data.status === "FAILED") {
            clearInterval(iv)
          }
        }
      }, 1500)
      return () => clearInterval(iv)
    }
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-semibold mb-3">Checkout agroderi.in</h1>
      <p className="text-sm opacity-75 mb-6">Finalize sua compra de AGD ou depósito/saque de custódia.</p>

      <div className="rounded-2xl border border-cyan-400/30 p-4 bg-neutral-900">
        <div className="flex items-center justify-between">
          <span>Intent</span>
          <code className="text-xs opacity-80">{intent ?? "-"}</code>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span>Status</span>
          <span className="text-sm font-medium">{status}</span>
        </div>

        {!intent && (
          <p className="text-xs mt-4 opacity-75">
            Abra um fluxo que exija depósito/compra de AGD. Você será redirecionado para cá automaticamente.
          </p>
        )}
      </div>
    </div>
  )
}
