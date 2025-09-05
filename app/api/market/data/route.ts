import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol") || "SOJA"

  // Generate realistic market data
  const basePrice = symbol === "SOJA" ? 1580 : symbol === "MILHO" ? 890 : 2340
  const currentPrice = basePrice + (Math.random() - 0.5) * 100
  const change = (Math.random() - 0.5) * 50
  const changePercent = (change / currentPrice) * 100

  return NextResponse.json({
    success: true,
    data: {
      symbol,
      price: currentPrice.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(2),
      volume: (Math.random() * 1000000).toFixed(0),
      high24h: (currentPrice + Math.random() * 50).toFixed(2),
      low24h: (currentPrice - Math.random() * 50).toFixed(2),
      marketCap: (currentPrice * 10000000).toFixed(0),
      lastUpdate: new Date().toISOString(),
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        price: (currentPrice + (Math.random() - 0.5) * 20).toFixed(2),
        volume: (Math.random() * 100000).toFixed(0),
      })),
    },
  })
}
