"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, TrendingDown, Activity } from "lucide-react"
import { RiskMetrics } from "@/components/risk/risk-metrics"
import { PortfolioAnalysis } from "@/components/risk/portfolio-analysis"
import { ComplianceMonitor } from "@/components/risk/compliance-monitor"
import { AlertsCenter } from "@/components/risk/alerts-center"

const riskStats = [
  { label: "Portfolio VaR", value: "$234K", change: "-12.5%", positive: true, icon: Shield, risk: "medium" },
  { label: "Active Alerts", value: "7", change: "+2", positive: false, icon: AlertTriangle, risk: "high" },
  { label: "Compliance Score", value: "94.2%", change: "+1.8%", positive: true, icon: Activity, risk: "low" },
  { label: "Max Drawdown", value: "8.7%", change: "-2.1%", positive: true, icon: TrendingDown, risk: "medium" },
]

const riskAlerts = [
  {
    id: "RISK-001",
    type: "Position Limit",
    severity: "high",
    message: "SOJA position exceeds 15% portfolio limit",
    timestamp: "2 minutes ago",
    status: "active",
  },
  {
    id: "RISK-002",
    type: "Volatility",
    severity: "medium",
    message: "MILHO volatility increased by 25% in last 24h",
    timestamp: "15 minutes ago",
    status: "acknowledged",
  },
  {
    id: "RISK-003",
    type: "Correlation",
    severity: "low",
    message: "Portfolio correlation with weather patterns elevated",
    timestamp: "1 hour ago",
    status: "resolved",
  },
]

export function RiskDashboard() {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Risk Management</h1>
            <p className="text-muted-foreground">Portfolio risk analytics and compliance monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Risk Report
            </Button>
            <Button size="sm" className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
              Set Limits
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Risk Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {riskStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-[#00FFD1]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className={getRiskColor(stat.risk)}>
                      {stat.risk}
                    </Badge>
                    <p className={`text-xs font-medium ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-[#00FFD1]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{alert.id}</p>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          alert.status === "active"
                            ? "text-red-500 bg-red-500/10 border-red-500/20"
                            : alert.status === "acknowledged"
                              ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                              : "text-green-500 bg-green-500/10 border-green-500/20"
                        }
                      >
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="metrics" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>
                <TabsContent value="metrics" className="mt-4">
                  <RiskMetrics />
                </TabsContent>
                <TabsContent value="analysis" className="mt-4">
                  <PortfolioAnalysis />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Additional Risk Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ComplianceMonitor />
          <AlertsCenter />
        </div>
      </div>
    </div>
  )
}
