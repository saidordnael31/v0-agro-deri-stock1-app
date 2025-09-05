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
  private ws: WebSocket | null = null
  private subscriptions = new Set<string>()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private isWebSocketEnabled = false

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

  connectWebSocket(onMessage: (quotes: Quote[]) => void, onError?: (error: Event) => void) {
    if (!this.isWebSocketEnabled) {
      console.log("[v0] WebSocket disabled in demo mode, using polling fallback")
      this.fallbackToPolling(onMessage)
      return
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      return
    }

    if (typeof WebSocket === "undefined") {
      console.warn("[v0] WebSocket not supported in this environment")
      return
    }

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const wsUrl = `${protocol}//${window.location.host}/api/markets/ws`

    try {
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log("[v0] WebSocket connected to market data service")
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.quotes) {
            onMessage(data.quotes)
          }
        } catch (error) {
          console.error("[v0] Failed to parse WebSocket message:", error)
        }
      }

      this.ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
        this.handleConnectionError(onMessage, onError, error)
      }

      this.ws.onclose = (event) => {
        console.log("[v0] WebSocket disconnected", event.code, event.reason)
        this.ws = null
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnection(onMessage, onError)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to create WebSocket connection:", error)
      this.fallbackToPolling(onMessage)
    }
  }

  private attemptReconnection(onMessage: (quotes: Quote[]) => void, onError?: (error: Event) => void) {
    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

    console.log(
      `[v0] Attempting to reconnect WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`,
    )

    setTimeout(() => {
      this.connectWebSocket(onMessage, onError)
    }, delay)
  }

  private handleConnectionError(onMessage: (quotes: Quote[]) => void, onError?: (error: Event) => void, error: Event) {
    onError?.(error)

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn("[v0] Max reconnection attempts reached, falling back to polling")
      this.fallbackToPolling(onMessage)
    }
  }

  private fallbackToPolling(onMessage: (quotes: Quote[]) => void) {
    const activeSymbols = Array.from(this.subscriptions)
    if (activeSymbols.length === 0) return

    const pollInterval = setInterval(async () => {
      try {
        const quotes = await this.getQuotes(activeSymbols)
        onMessage(quotes)
      } catch (error) {
        console.error("[v0] Polling fallback error:", error)
        clearInterval(pollInterval)
      }
    }, 5000)
    ;(this as any).pollInterval = pollInterval
  }

  subscribe(symbols: string[], latency: LatencyTier = "delayed15") {
    symbols.forEach((symbol) => this.subscriptions.add(symbol))

    if (!this.isWebSocketEnabled) {
      console.log("[v0] WebSocket disabled, subscriptions will be handled by polling")
      return
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn("[v0] WebSocket not connected, subscriptions stored for when connection is ready")
      return
    }

    const message = {
      op: "sub",
      symbols,
      latency,
    }

    this.ws.send(JSON.stringify(message))
  }

  unsubscribe(symbols: string[]) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }

    const message = {
      op: "unsub",
      symbols,
    }

    this.ws.send(JSON.stringify(message))
    symbols.forEach((symbol) => this.subscriptions.delete(symbol))
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, "Manual disconnect")
      this.ws = null
    }

    if ((this as any).pollInterval) {
      clearInterval((this as any).pollInterval)
      delete (this as any).pollInterval
    }

    this.subscriptions.clear()
    this.reconnectAttempts = 0
  }

  getActiveSubscriptions(): string[] {
    return Array.from(this.subscriptions)
  }
}

export const marketDataService = new MarketDataService()
