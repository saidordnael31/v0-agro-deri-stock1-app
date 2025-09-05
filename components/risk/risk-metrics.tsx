"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const riskMetrics = [
  {
    name: "Value at Risk (1D)",
    value: "$234,567",
    percentage: 2.8,
    confidence: 95,
    trend: "down",
    status: "normal",
  },
  {
    name: "Expected Shortfall",
    value: "$456,789",
    percentage: 4.2,
    confidence: 95,
    trend: "up",
    status: "warning",
  },
  {
    name: "Beta (Market)",
    value: "1.24",
    percentage: 24,
    confidence: null,
    trend: "up",
    status: "normal",
  },
  {
    name: "Sharpe Ratio",
    value: "1.67",
    percentage: 67,
    confidence: null,
    trend: "up",
    status: "good",
  },
]

const positionRisks = [
  { asset: "SOJA", exposure: 2500000, limit: 3000000, risk: 83.3, status: "warning" },
  { asset: "MILHO", exposure: 1800000, limit: 2500000, risk: 72.0, status: "normal" },
  { asset: "CAFE", exposure: 1200000, limit: 2000000, risk: 60.0, status: "normal" },
  { asset: "ACUCAR", exposure: 800000, limit: 1500000, risk: 53.3, status: "normal" },
]

export function RiskMetrics() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "normal":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "danger":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  return (
    <div className="space-y-4">
      {/* Risk Metrics */}
      <div className="space-y-3">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="bg-muted/30">
            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    )}
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{metric.value}</span>
                  {metric.confidence && (
                    <span className="text-xs text-muted-foreground">{metric.confidence}% confidence</span>
                  )}
                </div>
                {metric.percentage && (
                  <div className="space-y-1">
                    <Progress value={metric.percentage} className="h-1" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>{metric.percentage}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Position Risk Limits */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-[#00FFD1]" />
              <span className="font-medium text-sm">Position Limits</span>
            </div>
            {positionRisks.map((position, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{position.asset}</span>
                  <div className="flex items-center gap-2">
                    <span>${(position.exposure / 1000000).toFixed(1)}M</span>
                    <Badge
                      variant="outline"
                      className={
                        position.risk > 80
                          ? "text-red-500 bg-red-500/10 border-red-500/20"
                          : position.risk > 60
                            ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                            : "text-green-500 bg-green-500/10 border-green-500/20"
                      }
                    >
                      {position.risk.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={position.risk} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Exposure: ${(position.exposure / 1000000).toFixed(1)}M</span>
                  <span>Limit: ${(position.limit / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
