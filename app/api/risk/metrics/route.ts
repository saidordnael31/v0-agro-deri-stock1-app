import { NextResponse } from "next/server"

export async function GET() {
  // Generate realistic risk metrics
  const portfolioValue = 2500000 + (Math.random() - 0.5) * 500000
  const var95 = portfolioValue * (0.02 + Math.random() * 0.03) // 2-5% VaR
  const expectedShortfall = var95 * (1.2 + Math.random() * 0.3) // 120-150% of VaR

  return NextResponse.json({
    success: true,
    data: {
      portfolioMetrics: {
        totalValue: portfolioValue.toFixed(2),
        dailyPnL: ((Math.random() - 0.5) * 50000).toFixed(2),
        var95: var95.toFixed(2),
        expectedShortfall: expectedShortfall.toFixed(2),
        sharpeRatio: (0.5 + Math.random() * 1.5).toFixed(2),
        beta: (0.8 + Math.random() * 0.4).toFixed(2),
        maxDrawdown: (Math.random() * 15).toFixed(2),
      },
      positionLimits: {
        singlePosition: "500000",
        sectorConcentration: "30%",
        leverageRatio: "3:1",
        correlationLimit: "0.7",
      },
      alerts: [
        {
          id: "ALERT-001",
          type: "position_limit",
          severity: "medium",
          message: "SOJA position approaching 80% of limit",
          timestamp: new Date().toISOString(),
        },
        {
          id: "ALERT-002",
          type: "correlation",
          severity: "low",
          message: "High correlation detected between MILHO and SOJA positions",
          timestamp: new Date().toISOString(),
        },
      ],
    },
  })
}
