"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Clock, Zap, AlertTriangle, CheckCircle } from "lucide-react"

const oracles = [
  {
    id: "soja-price",
    name: "SOJA Price Oracle",
    asset: "SOJA",
    currentPrice: 1456.78,
    lastUpdate: "2 minutes ago",
    updateFrequency: "5 minutes",
    deviation: 0.12,
    status: "active",
    sources: 5,
    confidence: 98.5,
  },
  {
    id: "milho-price",
    name: "MILHO Price Oracle",
    asset: "MILHO",
    currentPrice: 687.45,
    lastUpdate: "1 minute ago",
    updateFrequency: "5 minutes",
    deviation: 0.08,
    status: "active",
    sources: 4,
    confidence: 97.2,
  },
  {
    id: "weather-data",
    name: "Weather Oracle",
    asset: "Weather",
    currentPrice: null,
    lastUpdate: "30 seconds ago",
    updateFrequency: "1 hour",
    deviation: null,
    status: "active",
    sources: 3,
    confidence: 95.8,
  },
  {
    id: "supply-chain",
    name: "Supply Chain Oracle",
    asset: "Logistics",
    currentPrice: null,
    lastUpdate: "5 minutes ago",
    updateFrequency: "15 minutes",
    deviation: null,
    status: "warning",
    sources: 2,
    confidence: 89.3,
  },
]

export function OracleMonitor() {
  const [selectedOracle, setSelectedOracle] = useState(oracles[0])
  const [refreshing, setRefreshing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "error":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />
      case "warning":
        return <AlertTriangle className="h-3 w-3" />
      case "error":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  return (
    <div className="space-y-4">
      {/* Oracle List */}
      <div className="space-y-2">
        {oracles.map((oracle) => (
          <Card
            key={oracle.id}
            className={`cursor-pointer transition-all ${
              selectedOracle.id === oracle.id ? "ring-2 ring-[#00FFD1] bg-[#00FFD1]/5" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedOracle(oracle)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{oracle.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {oracle.currentPrice ? `$${oracle.currentPrice.toFixed(2)}` : oracle.asset}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(oracle.status)}>
                    {getStatusIcon(oracle.status)}
                    <span className="ml-1 capitalize">{oracle.status}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Oracle Details */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {selectedOracle.name}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Oracle Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last Update</p>
              <p className="font-medium">{selectedOracle.lastUpdate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Update Frequency</p>
              <p className="font-medium">{selectedOracle.updateFrequency}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data Sources</p>
              <p className="font-medium">{selectedOracle.sources} sources</p>
            </div>
            <div>
              <p className="text-muted-foreground">Confidence</p>
              <p className="font-medium">{selectedOracle.confidence}%</p>
            </div>
          </div>

          {/* Confidence Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Data Confidence</span>
              <span>{selectedOracle.confidence}%</span>
            </div>
            <Progress value={selectedOracle.confidence} className="h-2" />
          </div>

          {/* Price Deviation (if applicable) */}
          {selectedOracle.deviation !== null && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Price Deviation</span>
                <span className={selectedOracle.deviation < 0.5 ? "text-green-500" : "text-yellow-500"}>
                  ±{selectedOracle.deviation}%
                </span>
              </div>
              <Progress value={Math.min(selectedOracle.deviation * 20, 100)} className="h-2" />
            </div>
          )}

          {/* Current Value */}
          {selectedOracle.currentPrice && (
            <Card className="p-3 bg-background/50">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-2xl font-bold text-[#00FFD1]">${selectedOracle.currentPrice.toFixed(2)}</p>
              </div>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
