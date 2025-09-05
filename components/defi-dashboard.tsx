"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, Vault, Zap, Shield } from "lucide-react"
import { StablecoinManager } from "@/components/defi/stablecoin-manager"
import { VaultInterface } from "@/components/defi/vault-interface"
import { OracleMonitor } from "@/components/defi/oracle-monitor"

const defiStats = [
  { label: "Total Value Locked", value: "$2.4M", change: "+12.5%", positive: true, icon: Vault },
  { label: "Stablecoins Minted", value: "1.8M USSA", change: "+8.2%", positive: true, icon: Coins },
  { label: "Active Vaults", value: "24", change: "+3", positive: true, icon: Shield },
  { label: "Oracle Updates", value: "1,247", change: "+156", positive: true, icon: Zap },
]

const stablecoinData = [
  { symbol: "USSA", name: "USD Stablecoin Agro", supply: "1,234,567", price: 1.0, collateral: 105.2 },
  { symbol: "BRSA", name: "BRL Stablecoin Agro", supply: "6,789,123", price: 0.2, collateral: 108.7 },
  { symbol: "GLDA", name: "Global Agro Dollar", supply: "890,456", price: 1.02, collateral: 112.3 },
]

export function DefiDashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">DeFi Protocol</h1>
            <p className="text-muted-foreground">Decentralized finance for agricultural markets</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Protocol Stats
            </Button>
            <Button size="sm" className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">
              Governance
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* DeFi Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {defiStats.map((stat, index) => (
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

        {/* DeFi Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stablecoin Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Stablecoin Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stablecoinData.map((coin, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#00FFD1]">{coin.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{coin.name}</p>
                        <p className="text-sm text-muted-foreground">Supply: {coin.supply}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">${coin.price.toFixed(2)}</span>
                        <Badge variant="outline" className="text-xs">
                          {coin.collateral}% CR
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-muted-foreground">Stable</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* DeFi Actions */}
          <Card>
            <CardHeader>
              <CardTitle>DeFi Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stablecoins" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stablecoins">Mint</TabsTrigger>
                  <TabsTrigger value="vaults">Vaults</TabsTrigger>
                  <TabsTrigger value="oracles">Oracles</TabsTrigger>
                </TabsList>
                <TabsContent value="stablecoins" className="mt-4">
                  <StablecoinManager />
                </TabsContent>
                <TabsContent value="vaults" className="mt-4">
                  <VaultInterface />
                </TabsContent>
                <TabsContent value="oracles" className="mt-4">
                  <OracleMonitor />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
