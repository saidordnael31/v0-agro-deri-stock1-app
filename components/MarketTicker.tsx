"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { marketDataService, type Quote, type LatencyTier } from "@/lib/markets"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selectedExchange, setSelectedExchange] = useState<string>("ALL")
  const [latency, setLatency] = useState<LatencyTier>("delayed15")
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initial load of quotes
    loadQuotes()

    // Setup WebSocket connection
    marketDataService.connectWebSocket(
      (newQuotes) => {
        setQuotes(newQuotes)
        setIsConnected(true)
      },
      () => setIsConnected(false),
    )

    return () => {
      marketDataService.disconnect()
    }
  }, [])

  const loadQuotes = async () => {
    try {
      const symbols = ["ZCZ5", "ZSZ5", "SOJZ5", "MILZ5", "CLEZ5"]
      const quotesData = await marketDataService.getQuotes(symbols, latency)
      setQuotes(quotesData)
    } catch (error) {
      console.error("[v0] Failed to load quotes:", error)
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
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency === "BRL" ? "BRL" : "USD",
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
              <SelectItem value="CME">CME</SelectItem>
              <SelectItem value="ICE">ICE</SelectItem>
              <SelectItem value="B3">B3</SelectItem>
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
              {(quote.last || 0) > (quote.open || 0) ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
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
