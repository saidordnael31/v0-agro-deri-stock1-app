import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exchange = searchParams.get("exchange")

  // Mock symbols data for different exchanges
  const symbolsByExchange = {
    CME: [
      { symbol: "ZCZ5", name: "Corn Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "ZSZ5", name: "Soybean Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "ZWZ5", name: "Wheat Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "KCZ5", name: "Coffee Dec 2025", unit: "pound", currency: "USD", tick_size: 0.05 },
    ],
    ICE: [
      { symbol: "CLEZ5", name: "Coffee C Dec 2025", unit: "pound", currency: "USD", tick_size: 0.05 },
      { symbol: "SBZ5", name: "Sugar #11 Dec 2025", unit: "pound", currency: "USD", tick_size: 0.01 },
      { symbol: "CTZ5", name: "Cotton Dec 2025", unit: "pound", currency: "USD", tick_size: 0.01 },
    ],
    B3: [
      { symbol: "SOJZ5", name: "Soja Dec 2025", unit: "saca", currency: "BRL", tick_size: 0.5 },
      { symbol: "MILZ5", name: "Milho Dec 2025", unit: "saca", currency: "BRL", tick_size: 0.25 },
      { symbol: "CAFZ5", name: "Café Dec 2025", unit: "saca", currency: "BRL", tick_size: 1.0 },
    ],
    DCE: [
      { symbol: "C2501", name: "Corn Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
      { symbol: "A2501", name: "Soybean Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
    ],
    SHFE: [{ symbol: "AU2501", name: "Gold Jan 2025", unit: "gram", currency: "CNY", tick_size: 0.02 }],
    MCX: [{ symbol: "GOLD25JAN", name: "Gold Jan 2025", unit: "gram", currency: "INR", tick_size: 1.0 }],
  }

  const allSymbols = Object.values(symbolsByExchange).flat()
  const symbols = exchange ? symbolsByExchange[exchange as keyof typeof symbolsByExchange] || [] : allSymbols

  return NextResponse.json({
    success: true,
    data: {
      exchange: exchange || "ALL",
      symbols,
      count: symbols.length,
    },
  })
}
