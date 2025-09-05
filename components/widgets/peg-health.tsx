"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PegData {
  symbol: string
  name: string
  targetPrice: number
  currentPrice: number
  deviation: number
  status: "healthy" | "warning" | "critical"
  collateralRatio: number
  backstopFund: number
}

const pegData: PegData[] = [
  {
    symbol: "USSA",
    name: "USD Soy Stablecoin",
    targetPrice: 1.0,
    currentPrice: 0.998,
    deviation: -0.2,
    status: "healthy",
    collateralRatio: 125.5,
    backstopFund: 2.1,
  },
  {
    symbol: "BRSA",
    name: "BRL Soy Stablecoin",
    targetPrice: 5.2,
    currentPrice: 5.18,
    deviation: -0.38,
    status: "warning",
    collateralRatio: 118.2,
    backstopFund: 1.8,
  },
  {
    symbol: "GLDA",
    name: "Gold Agricultural",
    targetPrice: 2100.0,
    currentPrice: 2095.5,
    deviation: -0.21,
    status: "healthy",
    collateralRatio: 132.1,
    backstopFund: 3.2,
  },
]

export function PegHealth() {
  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#00FFD1]" />
          Peg Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pegData.map((peg) => (
          <div key={peg.symbol} className="p-4 rounded-lg border border-gray-800 bg-gray-950/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{peg.symbol}</span>
                  <Badge
                    variant={
                      peg.status === "healthy" ? "secondary" : peg.status === "warning" ? "destructive" : "destructive"
                    }
                    className={
                      peg.status === "healthy"
                        ? "bg-green-600/20 text-green-400 border-green-600/30"
                        : peg.status === "warning"
                          ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                          : "bg-red-600/20 text-red-400 border-red-600/30"
                    }
                  >
                    {peg.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">{peg.name}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono text-white">
                  ${peg.currentPrice.toFixed(peg.symbol === "GLDA" ? 2 : 3)}
                </div>
                <div
                  className={`text-sm flex items-center gap-1 ${peg.deviation >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {peg.deviation >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {peg.deviation >= 0 ? "+" : ""}
                  {peg.deviation.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">Collateral Ratio</div>
                <div className="text-white font-mono">{peg.collateralRatio}%</div>
                <Progress value={Math.min(peg.collateralRatio, 150)} className="h-2 mt-1" />
              </div>
              <div>
                <div className="text-gray-400 mb-1">Backstop Fund</div>
                <div className="text-white font-mono">${peg.backstopFund}M</div>
                <Progress value={(peg.backstopFund / 5) * 100} className="h-2 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
