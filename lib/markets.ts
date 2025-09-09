export interface Quote {
  instrument_id: string
  exchange: string
  ts: number
  last?: number
  bid?: number
  ask?: number
  mark?: number
  vol24h?: number
  open?: number
  high?: number
  low?: number
  unit?: "bushel" | "ton" | "kg" | "saca" | "pound" | "gram"
  currency?: "USD" | "BRL" | "CNY" | "INR" | "EUR"
}

export interface MarketSymbol {
  symbol: string
  name: string
  unit: string
  currency: string
  tick_size: number
}

export type LatencyTier = "realtime" | "delayed15" | "eod"

export class MarketDataService {
  private subscriptions = new Set<string>()
  private pollInterval: NodeJS.Timeout | null = null

  constructor() {
    console.log("[v0] MarketDataService: REST API only mode - WebSocket completely disabled")
  }

  async getSymbols(exchange?: string): Promise<MarketSymbol[]> {
    const params = exchange ? `?exchange=${exchange}` : ""
    const response = await fetch(`/api/markets/symbols${params}`)
    const data = await response.json()
    return data.data.symbols
  }

  async getQuotes(symbols: string[], latency: LatencyTier = "delayed15"): Promise<Quote[]> {
    const symbolsParam = symbols.join(",")
    const response = await fetch(`/api/markets/quotes?symbols=${symbolsParam}&latency=${latency}`)
    const data = await response.json()
    return data.data.quotes
  }

  startPolling(symbols: string[], onMessage: (quotes: Quote[]) => void, intervalMs = 30000) {
    console.log("[v0] Starting REST API polling for market data")

    symbols.forEach((symbol) => this.subscriptions.add(symbol))

    const poll = async () => {
      try {
        const quotes = await this.getQuotes(Array.from(this.subscriptions))
        onMessage(quotes)
      } catch (error) {
        console.error("[v0] Polling error:", error)
      }
    }

    // Initial load
    poll()

    // Set up interval
    this.pollInterval = setInterval(poll, intervalMs)
  }

  subscribe(symbols: string[], latency: LatencyTier = "delayed15") {
    console.log("[v0] Adding symbols to subscription list:", symbols)
    symbols.forEach((symbol) => this.subscriptions.add(symbol))
  }

  unsubscribe(symbols: string[]) {
    console.log("[v0] Removing symbols from subscription list:", symbols)
    symbols.forEach((symbol) => this.subscriptions.delete(symbol))
  }

  disconnect() {
    console.log("[v0] Disconnecting market data service")

    if (this.pollInterval) {
      clearInterval(this.pollInterval)
      this.pollInterval = null
    }

    this.subscriptions.clear()
  }

  getActiveSubscriptions(): string[] {
    return Array.from(this.subscriptions)
  }
}

export const marketDataService = new MarketDataService()
