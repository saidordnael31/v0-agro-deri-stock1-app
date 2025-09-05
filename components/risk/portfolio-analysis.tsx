"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, BarChart3, TrendingUp } from "lucide-react"

const portfolioBreakdown = [
  { asset: "SOJA", allocation: 35.2, value: 2500000, risk: "medium", color: "#00FFD1" },
  { asset: "MILHO", allocation: 28.4, value: 1800000, risk: "low", color: "#10B981" },
  { asset: "CAFE", allocation: 21.3, value: 1200000, risk: "high", color: "#F59E0B" },
  { asset: "ACUCAR", allocation: 15.1, value: 800000, risk: "medium", color: "#EF4444" },
]

const correlationMatrix = [
  { asset1: "SOJA", asset2: "MILHO", correlation: 0.72, strength: "high" },
  { asset1: "SOJA", asset2: "CAFE", correlation: 0.34, strength: "medium" },
  { asset1: "SOJA", asset2: "ACUCAR", correlation: 0.18, strength: "low" },
  { asset1: "MILHO", asset2: "CAFE", correlation: 0.45, strength: "medium" },
  { asset1: "MILHO", asset2: "ACUCAR", correlation: 0.23, strength: "low" },
  { asset1: "CAFE", asset2: "ACUCAR", correlation: 0.67, strength: "high" },
]

const scenarioAnalysis = [
  { scenario: "Base Case", probability: 60, pnl: 125000, impact: "positive" },
  { scenario: "Weather Shock", probability: 25, pnl: -89000, impact: "negative" },
  { scenario: "Supply Disruption", probability: 10, pnl: 234000, impact: "positive" },
  { scenario: "Demand Collapse", probability: 5, pnl: -156000, impact: "negative" },
]

export function PortfolioAnalysis() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  const getCorrelationColor = (strength: string) => {
    switch (strength) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {/* Portfolio Allocation */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Portfolio Allocation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {portfolioBreakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.asset}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{item.allocation}%</span>
                  <Badge variant="outline" className={getRiskColor(item.risk)}>
                    {item.risk}
                  </Badge>
                </div>
              </div>
              <Progress value={item.allocation} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${(item.value / 1000000).toFixed(1)}M</span>
                <span>{item.allocation}% of portfolio</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Correlation Matrix */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Asset Correlations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {correlationMatrix.map((corr, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {corr.asset1} × {corr.asset2}
              </span>
              <div className="flex items-center gap-2">
                <span className={getCorrelationColor(corr.strength)}>{corr.correlation.toFixed(2)}</span>
                <Badge variant="outline" className={`text-xs ${getCorrelationColor(corr.strength)}`}>
                  {corr.strength}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scenario Analysis */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Scenario Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scenarioAnalysis.map((scenario, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{scenario.scenario}</span>
                <div className="flex items-center gap-2">
                  <span className={scenario.impact === "positive" ? "text-green-500" : "text-red-500"}>
                    {scenario.pnl >= 0 ? "+" : ""}${(scenario.pnl / 1000).toFixed(0)}K
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {scenario.probability}%
                  </Badge>
                </div>
              </div>
              <Progress value={scenario.probability} className="h-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
