import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")?.split(",") || []
  const latency = searchParams.get("latency") || "delayed15"

  // Generate mock quotes for requested symbols
  const quotes = symbols.map((symbol) => {
    const basePrice = getBasePriceForSymbol(symbol)
    const variation = (Math.random() - 0.5) * basePrice * 0.05 // 5% variation
    const currentPrice = basePrice + variation

    return {
      instrument_id: symbol,
      exchange: getExchangeForSymbol(symbol),
      ts: Date.now(),
      last: Number(currentPrice.toFixed(2)),
      bid: Number((currentPrice - Math.random() * 2).toFixed(2)),
      ask: Number((currentPrice + Math.random() * 2).toFixed(2)),
      mark: Number(currentPrice.toFixed(2)),
      vol24h: Math.floor(Math.random() * 1000000),
      open: Number((currentPrice - (Math.random() - 0.5) * 10).toFixed(2)),
      high: Number((currentPrice + Math.random() * 15).toFixed(2)),
      low: Number((currentPrice - Math.random() * 15).toFixed(2)),
      unit: getUnitForSymbol(symbol),
      currency: getCurrencyForSymbol(symbol),
    }
  })

  return NextResponse.json({
    success: true,
    data: {
      latency,
      quotes,
      timestamp: new Date().toISOString(),
    },
  })
}

function getBasePriceForSymbol(symbol: string): number {
  const priceMap: Record<string, number> = {
    ZCZ5: 450.25, // Corn
    ZSZ5: 1150.5, // Soybean
    ZWZ5: 650.75, // Wheat
    KCZ5: 180.3, // Coffee
    CLEZ5: 185.2, // Coffee C
    SBZ5: 22.45, // Sugar
    CTZ5: 75.8, // Cotton
    SOJZ5: 1580.0, // Soja BRL
    MILZ5: 890.25, // Milho BRL
    CAFZ5: 2340.8, // Café BRL
    C2501: 2850.0, // Corn CNY
    A2501: 4200.0, // Soybean CNY
    AU2501: 520.5, // Gold CNY
    GOLD25JAN: 72500.0, // Gold INR
  }
  return priceMap[symbol] || 100.0
}

function getExchangeForSymbol(symbol: string): string {
  if (symbol.startsWith("Z") || symbol.startsWith("KC")) return "CME"
  if (symbol.startsWith("CLE") || symbol.startsWith("SB") || symbol.startsWith("CT")) return "ICE"
  if (symbol.includes("SOJ") || symbol.includes("MIL") || symbol.includes("CAF")) return "B3"
  if (symbol.includes("C25") || symbol.includes("A25")) return "DCE"
  if (symbol.includes("AU25")) return "SHFE"
  if (symbol.includes("GOLD")) return "MCX"
  return "UNKNOWN"
}

function getUnitForSymbol(symbol: string): string {
  if (symbol.startsWith("Z")) return "bushel"
  if (symbol.includes("SOJ") || symbol.includes("MIL") || symbol.includes("CAF")) return "saca"
  if (symbol.includes("25")) return "ton"
  if (symbol.includes("GOLD") || symbol.includes("AU")) return "gram"
  return "pound"
}

function getCurrencyForSymbol(symbol: string): string {
  if (symbol.includes("SOJ") || symbol.includes("MIL") || symbol.includes("CAF")) return "BRL"
  if (symbol.includes("25") && (symbol.includes("C") || symbol.includes("A") || symbol.includes("AU"))) return "CNY"
  if (symbol.includes("GOLD") && symbol.includes("JAN")) return "INR"
  return "USD"
}
