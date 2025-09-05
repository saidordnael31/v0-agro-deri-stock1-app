"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Vault, TrendingUp, Target, Loader2, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const vaultStrategies = [
  {
    id: "soja-yield-pro",
    name: "SOJA Yield Pro",
    asset: "SOJA",
    baseApy: 12.5,
    boostedApy: 18.7,
    tvl: 2456789,
    strategy: "Liquidity Mining + Futures Arbitrage",
    risk: "Medium",
    lockPeriod: "30 days",
    minDeposit: 100,
    userDeposit: 245.78,
    userEarnings: 12.34,
    autoCompound: true,
    features: ["Auto-compound", "Yield Boost", "Insurance"],
  },
  {
    id: "stable-farm-plus",
    name: "Multi-Stable Farm+",
    asset: "USSA/BRSA/GLDA",
    baseApy: 8.2,
    boostedApy: 12.1,
    tvl: 3567890,
    strategy: "Multi-Protocol Lending",
    risk: "Low",
    lockPeriod: "Flexible",
    minDeposit: 1000,
    userDeposit: 5234.56,
    userEarnings: 187.23,
    autoCompound: true,
    features: ["Flexible withdrawal", "Multi-asset", "Low risk"],
  },
  {
    id: "agro-index-alpha",
    name: "Agro Index Alpha",
    asset: "Diversified",
    baseApy: 15.8,
    boostedApy: 24.3,
    tvl: 1234567,
    strategy: "Dynamic Rebalancing + Yield Farming",
    risk: "High",
    lockPeriod: "90 days",
    minDeposit: 500,
    userDeposit: 0,
    userEarnings: 0,
    autoCompound: true,
    features: ["High yield", "Auto-rebalance", "Advanced strategies"],
  },
]

const yieldBoosts = [
  { name: "Base Yield", multiplier: 1.0, requirement: "None" },
  { name: "Loyalty Boost", multiplier: 1.2, requirement: "30+ days staked" },
  { name: "Volume Boost", multiplier: 1.3, requirement: "$10k+ deposited" },
  { name: "VIP Boost", multiplier: 1.5, requirement: "VIP tier" },
]

export function EnhancedVaultInterface() {
  const [selectedVault, setSelectedVault] = useState(vaultStrategies[0])
  const [action, setAction] = useState<"deposit" | "withdraw">("deposit")
  const [amount, setAmount] = useState("")
  const [selectedBoost, setSelectedBoost] = useState("base")
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const { toast } = useToast()

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "Medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "High":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  const calculateProjectedYield = () => {
    if (!amount) return 0
    const boost = yieldBoosts.find((b) => b.name.toLowerCase().includes(selectedBoost))
    const effectiveApy = selectedVault.baseApy * (boost?.multiplier || 1)
    return (Number.parseFloat(amount) * effectiveApy) / 100
  }

  const executeVaultAction = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      toast({
        title: `${action === "deposit" ? "Deposit" : "Withdrawal"} Successful`,
        description: `${action === "deposit" ? "Deposited" : "Withdrew"} ${amount} ${selectedVault.asset} ${action === "deposit" ? "to" : "from"} ${selectedVault.name}`,
      })

      setAmount("")
    } catch (error) {
      toast({
        title: `${action === "deposit" ? "Deposit" : "Withdrawal"} Failed`,
        description: "Please check your balance and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Vault Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {vaultStrategies.map((vault) => (
          <Card
            key={vault.id}
            className={`cursor-pointer transition-all ${
              selectedVault.id === vault.id ? "ring-2 ring-[#00FFD1] bg-[#00FFD1]/5" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedVault(vault)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Vault className="h-5 w-5 text-[#00FFD1]" />
                  <CardTitle className="text-lg">{vault.name}</CardTitle>
                </div>
                <Badge variant="outline" className={getRiskColor(vault.risk)}>
                  {vault.risk}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Base APY</span>
                  <span className="font-semibold text-green-500">{vault.baseApy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Boosted APY</span>
                  <span className="font-semibold text-[#00FFD1]">{vault.boostedApy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">TVL</span>
                  <span className="text-sm">${(vault.tvl / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{vault.strategy}</p>
                <div className="flex flex-wrap gap-1">
                  {vault.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {vault.userDeposit > 0 && (
                <div className="pt-2 border-t space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your Position</span>
                    <span>
                      {vault.userDeposit} {vault.asset}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Earnings</span>
                    <span className="text-green-500">+{vault.userEarnings}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Vault Details */}
      <Tabs defaultValue="deposit" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#00FFD1]" />
                Deposit to {selectedVault.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label>Deposit Amount ({selectedVault.asset})</Label>
                <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Min: {selectedVault.minDeposit} {selectedVault.asset}
                  </span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Max: 10,000
                  </Button>
                </div>
              </div>

              {/* Yield Boost Selection */}
              <div className="space-y-2">
                <Label>Yield Boost</Label>
                <Select value={selectedBoost} onValueChange={setSelectedBoost}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {yieldBoosts.map((boost) => (
                      <SelectItem key={boost.name} value={boost.name.toLowerCase().replace(" ", "-")}>
                        <div className="flex items-center justify-between w-full">
                          <span>{boost.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {boost.multiplier}x
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Projected Returns */}
              {amount && (
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Projected Returns
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Yield:</span>
                        <span className="text-green-500">
                          {calculateProjectedYield().toFixed(2)} {selectedVault.asset}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Est:</span>
                        <span>
                          {(calculateProjectedYield() / 12).toFixed(4)} {selectedVault.asset}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lock Period:</span>
                        <span>{selectedVault.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Auto-compound:</span>
                        <span className="text-[#00FFD1]">{selectedVault.autoCompound ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Advanced Options */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-muted-foreground"
                >
                  Advanced Options {showAdvanced ? "▼" : "▶"}
                </Button>

                {showAdvanced && (
                  <Card className="p-4 bg-muted/20">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-compound rewards</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reinvest threshold</span>
                        <Input className="w-20 h-8" placeholder="100" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Slippage tolerance</span>
                        <Select defaultValue="0.5">
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.1">0.1%</SelectItem>
                            <SelectItem value="0.5">0.5%</SelectItem>
                            <SelectItem value="1.0">1.0%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              <Button
                onClick={executeVaultAction}
                disabled={!amount || Number.parseFloat(amount) < selectedVault.minDeposit || isLoading}
                className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Deposit to ${selectedVault.name}`
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw from {selectedVault.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Withdrawal Amount</Label>
                <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Available: {selectedVault.userDeposit} {selectedVault.asset}
                  </span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Max
                  </Button>
                </div>
              </div>

              {selectedVault.lockPeriod !== "Flexible" && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-500">Early Withdrawal</p>
                      <p className="text-muted-foreground">
                        Withdrawing before {selectedVault.lockPeriod} incurs a 2% penalty fee.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={executeVaultAction}
                disabled={!amount || Number.parseFloat(amount) <= 0 || isLoading}
                className="w-full bg-transparent"
                variant="outline"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Withdraw"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Deposited</span>
                    <span className="font-semibold">
                      {selectedVault.userDeposit} {selectedVault.asset}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earned</span>
                    <span className="font-semibold text-green-500">
                      +{selectedVault.userEarnings} {selectedVault.asset}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current APY</span>
                    <span className="font-semibold text-[#00FFD1]">{selectedVault.boostedApy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROI</span>
                    <span className="font-semibold">
                      {selectedVault.userDeposit > 0
                        ? ((selectedVault.userEarnings / selectedVault.userDeposit) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress to next boost</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strategy Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Strategy:</strong> {selectedVault.strategy}
                  </p>
                  <p>
                    <strong>Risk Level:</strong> {selectedVault.risk}
                  </p>
                  <p>
                    <strong>Lock Period:</strong> {selectedVault.lockPeriod}
                  </p>
                  <p>
                    <strong>Auto-compound:</strong> {selectedVault.autoCompound ? "Enabled" : "Disabled"}
                  </p>
                </div>

                <div className="pt-3 border-t">
                  <h5 className="font-semibold mb-2">Features</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedVault.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
