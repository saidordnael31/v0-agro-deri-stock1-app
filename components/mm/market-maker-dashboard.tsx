"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Activity, Settings, Play, Pause } from "lucide-react"

export function MarketMakerDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Market Maker Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-600 text-white">
            Active
          </Badge>
          <Button size="sm" className="bg-[#00FFD1] text-black hover:bg-[#00E6BC]">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold text-[#00FFD1]">$2.4M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#00FFD1]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily PnL</p>
                <p className="text-2xl font-bold text-green-500">+$12,450</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold text-foreground">247</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Spread</p>
                <p className="text-2xl font-bold text-foreground">0.05%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "SOJA Grid Strategy", status: "Active", pnl: "+$2,340", volume: "$450K" },
                  { name: "MILHO Arbitrage", status: "Active", pnl: "+$1,890", volume: "$320K" },
                  { name: "CAFE Delta Neutral", status: "Paused", pnl: "-$120", volume: "$180K" },
                ].map((strategy, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {strategy.status === "Active" ? (
                          <Play className="h-4 w-4 text-green-500" />
                        ) : (
                          <Pause className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="font-medium text-foreground">{strategy.name}</span>
                      </div>
                      <Badge variant={strategy.status === "Active" ? "secondary" : "outline"}>{strategy.status}</Badge>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">PnL</p>
                        <p
                          className={`font-medium ${strategy.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                        >
                          {strategy.pnl}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Volume</p>
                        <p className="font-medium text-foreground">{strategy.volume}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { asset: "SOJA/USSA", size: "1,250", side: "Long", pnl: "+$890", exposure: "$125K" },
                  { asset: "MILHO/BRSA", size: "2,100", side: "Short", pnl: "-$340", exposure: "$84K" },
                  { asset: "CAFE/GLDA", size: "850", side: "Long", pnl: "+$1,240", exposure: "$67K" },
                ].map((position, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-foreground">{position.asset}</span>
                      <Badge variant={position.side === "Long" ? "secondary" : "outline"}>{position.side}</Badge>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium text-foreground">{position.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">PnL</p>
                        <p
                          className={`font-medium ${position.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                        >
                          {position.pnl}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Exposure</p>
                        <p className="font-medium text-foreground">{position.exposure}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-foreground mb-4">Risk Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sharpe Ratio</span>
                      <span className="font-medium text-foreground">2.34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Drawdown</span>
                      <span className="font-medium text-red-500">-3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-medium text-green-500">68.5%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-4">Trading Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Trades</span>
                      <span className="font-medium text-foreground">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Trade Size</span>
                      <span className="font-medium text-foreground">$1,920</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Hold Time</span>
                      <span className="font-medium text-foreground">4.2h</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
