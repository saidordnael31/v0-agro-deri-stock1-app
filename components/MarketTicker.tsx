"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const TrendingUpIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

const TrendingDownIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
)

type Quote = {
  instrument_id: string
  last?: number
  open?: number
  currency?: string
  exchange?: string
}

type LatencyTier = "realtime" | "delayed15" | "eod"

export function MarketTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selectedExchange, setSelectedExchange] = useState<string>("ALL")
  const [latency, setLatency] = useState<LatencyTier>("delayed15")
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    console.log("[v0] MarketTicker: Using REST API only - no WebSocket")
    loadQuotes()

    const interval = setInterval(loadQuotes, 30000)
    return () => clearInterval(interval)
  }, [selectedExchange])

  const loadQuotes = async () => {
    try {
      const symbolsByExchange = {
        ALL: ["ZCZ5", "ZSZ5", "SOJZ5", "MILZ5", "CLEZ5", "GCZ5", "CLZ5", "AU2501", "GOLD25JAN"],
        CME: ["ZCZ5", "ZSZ5", "ZWZ5", "LEZ5", "GCZ5", "SIZ5", "CLZ5", "NGZ5"],
        ICE: ["CLEZ5", "SBZ5", "CTZ5", "CCZ5", "BZ5"],
        B3: ["SOJZ5", "MILZ5", "CAFZ5", "BOIZ5", "ETAZ5"],
        DCE: ["C2501", "A2501", "M2501", "I2501"],
        SHFE: ["AU2501", "AG2501", "CU2501", "AL2501"],
        MCX: ["GOLD25JAN", "SILVER25JAN", "COPPER25JAN", "CRUDE25JAN"],
        LME: ["LMCAD03", "LMAHD03", "LMZSD03"],
        TOCOM: ["TGOLD25", "TSILVER25", "TPLAT25"],
        EEX: ["EPOWER25", "EGAS25", "ECOAL25"],
        ASX: ["WHEAT25", "BARLEY25", "CANOLA25"],
      }

      const symbols = symbolsByExchange[selectedExchange as keyof typeof symbolsByExchange] || symbolsByExchange.ALL

      const response = await fetch(`/api/markets/quotes?symbols=${symbols.join(",")}&latency=${latency}`)
      const data = await response.json()

      if (data.success && data.data?.quotes) {
        setQuotes(data.data.quotes)
        setIsConnected(false) // Always false in demo mode
      }
    } catch (error) {
      console.error("[v0] Failed to load quotes:", error)
      setIsConnected(false)
    }
  }

  const getLatencyBadge = (latency: LatencyTier) => {
    const variants = {
      realtime: "bg-green-500/10 text-green-500 border-green-500/30",
      delayed15: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
      eod: "bg-gray-500/10 text-gray-500 border-gray-500/30",
    }

    const labels = {
      realtime: "RT",
      delayed15: "D15",
      eod: "EOD",
    }

    return (
      <Badge variant="outline" className={variants[latency]}>
        {labels[latency]}
      </Badge>
    )
  }

  const formatPrice = (price: number, currency: string) => {
    const currencyMap = {
      USD: "USD",
      BRL: "BRL",
      CNY: "CNY",
      INR: "INR",
      EUR: "EUR",
      GBP: "GBP",
      JPY: "JPY",
      AUD: "AUD",
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currencyMap[currency as keyof typeof currencyMap] || "USD",
      minimumFractionDigits: 2,
    })
    return formatter.format(price)
  }

  return (
    <div className="bg-gray-950 border-b border-gray-800 p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger className="w-32 h-8 bg-gray-900 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas</SelectItem>
              <SelectItem value="CME">CME (Chicago)</SelectItem>
              <SelectItem value="ICE">ICE (NY/Londres)</SelectItem>
              <SelectItem value="B3">B3 (Brasil)</SelectItem>
              <SelectItem value="DCE">DCE (Dalian)</SelectItem>
              <SelectItem value="SHFE">SHFE (Shanghai)</SelectItem>
              <SelectItem value="MCX">MCX (Mumbai)</SelectItem>
              <SelectItem value="LME">LME (Londres)</SelectItem>
              <SelectItem value="TOCOM">TOCOM (Tóquio)</SelectItem>
              <SelectItem value="EEX">EEX (Europa)</SelectItem>
              <SelectItem value="ASX">ASX (Austrália)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={latency} onValueChange={(value) => setLatency(value as LatencyTier)}>
            <SelectTrigger className="w-32 h-8 bg-gray-900 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Tempo Real</SelectItem>
              <SelectItem value="delayed15">Delay 15min</SelectItem>
              <SelectItem value="eod">Fim do Dia</SelectItem>
            </SelectContent>
          </Select>

          {getLatencyBadge(latency)}

          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-xs text-gray-400">{isConnected ? "Conectado" : "Desconectado"}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={loadQuotes}>
          Atualizar
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1">
        {quotes.map((quote) => (
          <div key={quote.instrument_id} className="flex items-center gap-2 min-w-fit bg-gray-900 rounded px-3 py-1">
            <span className="text-sm font-medium text-white">{quote.instrument_id}</span>
            <span className="text-sm text-gray-300">{formatPrice(quote.last || 0, quote.currency || "USD")}</span>
            <div className="flex items-center gap-1">
              {(quote.last || 0) > (quote.open || 0) ? <TrendingUpIcon /> : <TrendingDownIcon />}
              <span className={`text-xs ${(quote.last || 0) > (quote.open || 0) ? "text-green-500" : "text-red-500"}`}>
                {((((quote.last || 0) - (quote.open || 0)) / (quote.open || 1)) * 100).toFixed(2)}%
              </span>
            </div>
            <Badge variant="outline" className="text-xs bg-gray-800 border-gray-700">
              {quote.exchange}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
