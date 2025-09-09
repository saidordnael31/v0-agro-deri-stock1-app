import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock oracle data with realistic updates
    const oracles = [
      {
        id: "soja-price",
        name: "SOJA Price Oracle",
        asset: "SOJA",
        currentPrice: 1456.78 + (Math.random() - 0.5) * 20, // Simulate price movement
        lastUpdate: "Just now",
        updateFrequency: "5 minutes",
        deviation: Math.random() * 0.5,
        status: "active",
        sources: 5,
        confidence: 95 + Math.random() * 5,
      },
      {
        id: "milho-price",
        name: "MILHO Price Oracle",
        asset: "MILHO",
        currentPrice: 687.45 + (Math.random() - 0.5) * 15,
        lastUpdate: "Just now",
        updateFrequency: "5 minutes",
        deviation: Math.random() * 0.3,
        status: "active",
        sources: 4,
        confidence: 94 + Math.random() * 6,
      },
      {
        id: "weather-data",
        name: "Weather Oracle",
        asset: "Weather",
        currentPrice: null,
        lastUpdate: "Just now",
        updateFrequency: "1 hour",
        deviation: null,
        status: Math.random() > 0.8 ? "warning" : "active",
        sources: 3,
        confidence: 90 + Math.random() * 10,
      },
      {
        id: "supply-chain",
        name: "Supply Chain Oracle",
        asset: "Logistics",
        currentPrice: null,
        lastUpdate: "Just now",
        updateFrequency: "15 minutes",
        deviation: null,
        status: Math.random() > 0.7 ? "warning" : "active",
        sources: 2,
        confidence: 85 + Math.random() * 10,
      },
    ]

    return NextResponse.json({
      success: true,
      oracles,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch oracle data" }, { status: 500 })
  }
}
