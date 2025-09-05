"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, FileCheck } from "lucide-react"

const complianceChecks = [
  {
    category: "Position Limits",
    status: "compliant",
    score: 95,
    checks: [
      { name: "Single Asset Limit", status: "pass", value: "12.5% < 15%" },
      { name: "Sector Concentration", status: "pass", value: "Agricultural 100%" },
      { name: "Leverage Ratio", status: "warning", value: "2.1x < 3.0x" },
    ],
  },
  {
    category: "Regulatory",
    status: "compliant",
    score: 98,
    checks: [
      { name: "KYC Verification", status: "pass", value: "All counterparties verified" },
      { name: "AML Screening", status: "pass", value: "Daily screening active" },
      { name: "Reporting", status: "pass", value: "All reports submitted" },
    ],
  },
  {
    category: "Risk Controls",
    status: "warning",
    score: 87,
    checks: [
      { name: "VaR Limit", status: "pass", value: "$234K < $500K" },
      { name: "Drawdown Limit", status: "warning", value: "8.7% < 10%" },
      { name: "Correlation Limit", status: "pass", value: "0.72 < 0.80" },
    ],
  },
]

const auditTrail = [
  {
    timestamp: "2024-01-15 14:30:22",
    action: "Position Limit Override",
    user: "Risk Manager",
    details: "SOJA limit increased to 18% for 24h",
    status: "approved",
  },
  {
    timestamp: "2024-01-15 12:15:45",
    action: "Compliance Check",
    user: "System",
    details: "Daily regulatory compliance scan completed",
    status: "completed",
  },
  {
    timestamp: "2024-01-15 09:00:00",
    action: "Risk Report",
    user: "System",
    details: "Daily risk report generated and distributed",
    status: "completed",
  },
]

export function ComplianceMonitor() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
      case "compliant":
      case "completed":
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "fail":
      case "violation":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
      case "compliant":
      case "completed":
      case "approved":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "fail":
      case "violation":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          Compliance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compliance Categories */}
        <div className="space-y-3">
          {complianceChecks.map((category, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="p-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{category.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{category.score}%</span>
                      <Badge variant="outline" className={getStatusColor(category.status)}>
                        {getStatusIcon(category.status)}
                        <span className="ml-1">{category.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.score} className="h-2" />
                  <div className="space-y-1">
                    {category.checks.map((check, checkIndex) => (
                      <div key={checkIndex} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(check.status)}
                          <span>{check.name}</span>
                        </div>
                        <span className="text-muted-foreground">{check.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Audit Trail */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Activity</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {auditTrail.map((entry, index) => (
              <div key={index} className="flex items-start gap-2 text-xs p-2 rounded bg-muted/50">
                {getStatusIcon(entry.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{entry.action}</span>
                    <span className="text-muted-foreground">{entry.timestamp.split(" ")[1]}</span>
                  </div>
                  <p className="text-muted-foreground truncate">{entry.details}</p>
                  <p className="text-muted-foreground">by {entry.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          View Full Audit Log
        </Button>
      </CardContent>
    </Card>
  )
}
