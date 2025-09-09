"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Wifi, WifiOff, RefreshCw } from "lucide-react"
import { SwapInterface } from "@/components/trading/swap-interface"
import { SpotInterface } from "@/components/trading/spot-interface"
import { FuturesInterface } from "@/components/trading/futures-interface"
import { OptionsInterface } from "@/components/trading/options-interface"
import { MarketTicker } from "@/components/MarketTicker"
import { useToast } from "@/hooks/use-toast"

const portfolioStats = [
  { label: "Total Balance", value: "$124,567.89", change: "+2.34%", positive: true },
  { label: "P&L Today", value: "$2,456.78", change: "+1.89%", positive: true },
  { label: "Open Positions", value: "12", change: "+3", positive: true },
  { label: "Available Margin", value: "$45,678.90", change: "-5.2%", positive: false },
]

export function TradingDashboard() {
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab") || "swap"
  const { toast } = useToast()

  const [marketData, setMarketData] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [selectedExchange, setSelectedExchange] = useState("CME")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    fetchMarketData()

    console.log("[v0] Trading Dashboard: Using REST API polling only")
    setIsConnected(false)
    const interval = setInterval(fetchMarketData, 30000)
    return () => clearInterval(interval)
  }, [selectedExchange])

  const fetchMarketData = async () => {
    setIsLoading(true)
    try {
      const symbols = ["SOJA", "MILHO", "CAFE", "ZCZ5", "ZSZ5"]
      const response = await fetch(`/api/markets/quotes?symbols=${symbols.join(",")}&exchange=${selectedExchange}`)
      const data = await response.json()

      if (data.success) {
        setMarketData(data.data.quotes || [])
        setLastUpdate(new Date())
      } else {
        throw new Error(data.error || "Failed to fetch market data")
      }
    } catch (error) {
      console.error("Failed to fetch market data:", error)
      toast({
        title: "Market Data Error",
        description: "Failed to fetch latest market data. Using cached data.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshData = () => {
    fetchMarketData()
    toast({
      title: "Data Refreshed",
      description: "Market data has been updated successfully.",
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trading Dashboard</h1>
            <p className="text-muted-foreground">Agricultural derivatives trading platform</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <div className="flex items-center gap-1">
                {isConnected ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-muted-foreground">{isConnected ? "Live" : "Demo Mode"}</span>
                {lastUpdate && (
                  <span className="text-xs text-muted-foreground ml-2">{lastUpdate.toLocaleTimeString()}</span>
                )}
              </div>
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
                className="text-sm bg-background border border-border rounded px-2 py-1"
              >
                <option value="CME">CME</option>
                <option value="ICE">ICE</option>
                <option value="B3">B3</option>
                <option value="DCE">DCE</option>
              </select>
              <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
            <Button size="sm" className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
              Start Trading
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <MarketTicker />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {portfolioStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                    {stat.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Overview - {selectedExchange}
                <Badge variant="secondary" className="ml-2">
                  Demo Data
                </Badge>
                {isLoading && <RefreshCw className="h-4 w-4 animate-spin ml-2" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData.length > 0 ? (
                  marketData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-[#00FFD1]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{item.symbol}</p>
                            <Badge variant="outline" className="text-xs">
                              {item.exchange}
                            </Badge>
                            {item.latency && (
                              <Badge variant="secondary" className="text-xs">
                                {item.latency}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${item.price?.toFixed(2)} {item.currency}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${(item.change || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {(item.change || 0) >= 0 ? "+" : ""}
                          {(item.change || 0).toFixed(2)}
                        </p>
                        <p className={`text-sm ${(item.changePercent || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {(item.changePercent || 0) >= 0 ? "+" : ""}
                          {(item.changePercent || 0).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {isLoading ? "Loading market data..." : "No market data available"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={tabFromUrl} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="swap">Swap</TabsTrigger>
                  <TabsTrigger value="spot">Spot</TabsTrigger>
                  <TabsTrigger value="futures">Futures</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                </TabsList>
                <TabsContent value="swap" className="mt-4">
                  <SwapInterface marketData={marketData} />
                </TabsContent>
                <TabsContent value="spot" className="mt-4">
                  <SpotInterface marketData={marketData} />
                </TabsContent>
                <TabsContent value="futures" className="mt-4">
                  <FuturesInterface marketData={marketData} />
                </TabsContent>
                <TabsContent value="options" className="mt-4">
                  <OptionsInterface marketData={marketData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
