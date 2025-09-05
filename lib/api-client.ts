class APIClient {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NODE_ENV === "production" ? "https://api.agroderi.com" : "/api"
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Trading APIs
  async swapTokens(data: {
    fromToken: string
    toToken: string
    amount: string
    slippage: number
  }) {
    return this.request("/trading/swap", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async createSpotOrder(data: {
    symbol: string
    side: "buy" | "sell"
    type: "market" | "limit" | "stop"
    quantity: string
    price?: string
    stopPrice?: string
  }) {
    return this.request("/trading/spot", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // DeFi APIs
  async getStablecoins() {
    return this.request("/defi/stablecoins")
  }

  async stablecoinAction(data: {
    action: "mint" | "burn"
    stablecoin: "USSA" | "BRSA" | "GLDA"
    amount: string
    collateralToken?: string
    collateralAmount?: string
  }) {
    return this.request("/defi/stablecoins", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // SBLC APIs
  async getSBLCs() {
    return this.request("/sblc")
  }

  async createSBLC(data: {
    applicantName: string
    beneficiaryName: string
    amount: string
    currency: string
    commodity: string
    expiryDate: string
    terms: string
  }) {
    return this.request("/sblc", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Risk APIs
  async getRiskMetrics() {
    return this.request("/risk/metrics")
  }

  // Market Data APIs
  async getMarketData(symbol?: string) {
    const params = symbol ? `?symbol=${symbol}` : ""
    return this.request(`/market/data${params}`)
  }
}

export const apiClient = new APIClient()
