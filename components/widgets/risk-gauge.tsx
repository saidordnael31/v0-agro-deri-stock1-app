"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, TrendingUp } from "lucide-react"

interface RiskMetric {
  label: string
  value: number
  threshold: number
  status: "low" | "medium" | "high"
  unit: string
}

const riskMetrics: RiskMetric[] = [
  {
    label: "Portfolio VaR (1d)",
    value: 2.3,
    threshold: 5.0,
    status: "low",
    unit: "%",
  },
  {
    label: "Leverage Ratio",
    value: 3.2,
    threshold: 5.0,
    status: "medium",
    unit: "x",
  },
  {
    label: "Liquidation Risk",
    value: 8.5,
    threshold: 15.0,
    status: "low",
    unit: "%",
  },
  {
    label: "Correlation Risk",
    value: 0.72,
    threshold: 0.8,
    status: "medium",
    unit: "",
  },
]

export function RiskGauge() {
  const overallRisk =
    riskMetrics.reduce((acc, metric) => {
      const riskScore = metric.status === "low" ? 1 : metric.status === "medium" ? 2 : 3
      return acc + riskScore
    }, 0) / riskMetrics.length

  const overallStatus = overallRisk <= 1.5 ? "low" : overallRisk <= 2.5 ? "medium" : "high"

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#00FFD1]" />
          Risk Gauge
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall Risk Score */}
        <div className="text-center mb-6 p-4 rounded-lg border border-gray-800 bg-gray-950/50">
          <div className="text-2xl font-bold text-white mb-2">{overallRisk.toFixed(1)}/3.0</div>
          <Badge
            variant="secondary"
            className={
              overallStatus === "low"
                ? "bg-green-600/20 text-green-400 border-green-600/30"
                : overallStatus === "medium"
                  ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                  : "bg-red-600/20 text-red-400 border-red-600/30"
            }
          >
            {overallStatus.toUpperCase()} RISK
          </Badge>
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          {riskMetrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-gray-950/30"
            >
              <div className="flex items-center gap-3">
                {metric.status === "high" && <AlertTriangle className="h-4 w-4 text-red-400" />}
                {metric.status === "medium" && <TrendingUp className="h-4 w-4 text-yellow-400" />}
                {metric.status === "low" && <Shield className="h-4 w-4 text-green-400" />}
                <span className="text-sm text-gray-300">{metric.label}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-mono">
                  {metric.value}
                  {metric.unit}
                </div>
                <div className="text-xs text-gray-500">
                  Limit: {metric.threshold}
                  {metric.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
