"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Truck, DollarSign, CheckCircle } from "lucide-react"
import { SblcManager } from "@/components/finance/sblc-manager"
import { WarehouseReceipts } from "@/components/finance/warehouse-receipts"
import { TradeFinance } from "@/components/finance/trade-finance"

const financeStats = [
  { label: "Active SBLCs", value: "24", change: "+3", positive: true, icon: FileText },
  { label: "Total Value", value: "$12.4M", change: "+8.2%", positive: true, icon: DollarSign },
  { label: "Warehouse Receipts", value: "156", change: "+12", positive: true, icon: Truck },
  { label: "Completion Rate", value: "98.5%", change: "+1.2%", positive: true, icon: CheckCircle },
]

const recentSblcs = [
  {
    id: "SBLC-2024-001",
    beneficiary: "AgriCorp Brazil",
    amount: 2500000,
    commodity: "Soybeans",
    status: "active",
    expiry: "2024-06-15",
    progress: 75,
  },
  {
    id: "SBLC-2024-002",
    beneficiary: "GrainTrade LLC",
    amount: 1800000,
    commodity: "Corn",
    status: "pending",
    expiry: "2024-05-20",
    progress: 25,
  },
  {
    id: "SBLC-2024-003",
    beneficiary: "Coffee Exports SA",
    amount: 3200000,
    commodity: "Coffee",
    status: "completed",
    expiry: "2024-04-10",
    progress: 100,
  },
]

export function SblcDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "pending":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "completed":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "expired":
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
            <h1 className="text-2xl font-bold text-foreground">Agricultural Finance</h1>
            <p className="text-muted-foreground">SBLC tokenization and warehouse receipt management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button size="sm" className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
              New SBLC
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Finance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {financeStats.map((stat, index) => (
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
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Finance Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent SBLCs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent SBLCs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSblcs.map((sblc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-[#00FFD1]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{sblc.id}</p>
                        <p className="text-sm text-muted-foreground">{sblc.beneficiary}</p>
                        <p className="text-xs text-muted-foreground">{sblc.commodity}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">${(sblc.amount / 1000000).toFixed(1)}M</span>
                        <Badge variant="outline" className={getStatusColor(sblc.status)}>
                          {sblc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-[#00FFD1] transition-all" style={{ width: `${sblc.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{sblc.progress}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Exp: {sblc.expiry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Finance Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Finance Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sblc" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sblc">SBLC</TabsTrigger>
                  <TabsTrigger value="warehouse">WR</TabsTrigger>
                  <TabsTrigger value="trade">Trade</TabsTrigger>
                </TabsList>
                <TabsContent value="sblc" className="mt-4">
                  <SblcManager />
                </TabsContent>
                <TabsContent value="warehouse" className="mt-4">
                  <WarehouseReceipts />
                </TabsContent>
                <TabsContent value="trade" className="mt-4">
                  <TradeFinance />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
