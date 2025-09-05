"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Search, Filter, AlertTriangle, CheckCircle, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const alerts = [
  {
    id: "ALT-001",
    type: "Position Limit",
    severity: "high",
    message: "SOJA position exceeds 15% portfolio limit (current: 17.2%)",
    timestamp: "2024-01-15 14:45:00",
    status: "active",
    asset: "SOJA",
  },
  {
    id: "ALT-002",
    type: "Volatility",
    severity: "medium",
    message: "MILHO 24h volatility increased to 28.5% (threshold: 25%)",
    timestamp: "2024-01-15 13:20:00",
    status: "acknowledged",
    asset: "MILHO",
  },
  {
    id: "ALT-003",
    type: "Correlation",
    severity: "low",
    message: "Weather correlation factor elevated to 0.78",
    timestamp: "2024-01-15 11:15:00",
    status: "resolved",
    asset: "Portfolio",
  },
  {
    id: "ALT-004",
    type: "Liquidity",
    severity: "medium",
    message: "CAFE market depth below threshold in pre-market",
    timestamp: "2024-01-15 08:30:00",
    status: "active",
    asset: "CAFE",
  },
  {
    id: "ALT-005",
    type: "Compliance",
    severity: "high",
    message: "KYC verification required for new counterparty",
    timestamp: "2024-01-15 07:45:00",
    status: "pending",
    asset: "Compliance",
  },
]

export function AlertsCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "active":
      case "pending":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      case "acknowledged":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-3 w-3" />
      case "active":
      case "pending":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Bell className="h-3 w-3" />
    }
  }

  const handleAcknowledge = async (alertId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Alert Acknowledged",
        description: `Alert ${alertId} has been acknowledged`,
      })
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not acknowledge alert",
        variant: "destructive",
      })
    }
  }

  const handleResolve = async (alertId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Alert Resolved",
        description: `Alert ${alertId} has been resolved`,
      })
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not resolve alert",
        variant: "destructive",
      })
    }
  }

  const handleDismiss = async (alertId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Alert Dismissed",
        description: `Alert ${alertId} has been dismissed`,
      })
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not dismiss alert",
        variant: "destructive",
      })
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "All Alerts Marked as Read",
        description: "All active alerts have been acknowledged",
      })
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not mark all alerts as read",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alerts Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="bg-muted/30">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{alert.id}</span>
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        {getStatusIcon(alert.status)}
                        <span className="ml-1">{alert.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {alert.status === "active" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDismiss(alert.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      {alert.status === "acknowledged" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="h-6 w-6 p-0"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {alert.type} • {alert.asset}
                    </span>
                    <span>{alert.timestamp.split(" ")[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No alerts match your filters</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent" size="sm" onClick={handleMarkAllRead}>
            Mark All Read
          </Button>
          <Button className="flex-1 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90" size="sm">
            Configure Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
