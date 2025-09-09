"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const stablecoins = [
  { symbol: "USSA", name: "USD Stablecoin Agro", minCR: 150, currentCR: 205.2 },
  { symbol: "BRSA", name: "BRL Stablecoin Agro", minCR: 150, currentCR: 208.7 },
  { symbol: "GLDA", name: "Global Agro Dollar", minCR: 160, currentCR: 212.3 },
]

const collateralAssets = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.45", price: 67234.56, type: "crypto" },
  { symbol: "ETH", name: "Ethereum", balance: "12.34", price: 3456.78, type: "crypto" },
  { symbol: "USDC", name: "USD Coin", balance: "5000.00", price: 1.0, type: "crypto" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: "0.23", price: 67180.45, type: "crypto" },
  { symbol: "SOJA", name: "Soybean Tokens", balance: "45.78", price: 1456.78, type: "commodity" },
  { symbol: "MILHO", name: "Corn Tokens", balance: "123.45", price: 687.45, type: "commodity" },
  { symbol: "CAFE", name: "Coffee Tokens", balance: "23.67", price: 2134.56, type: "commodity" },
]

export function StablecoinManager() {
  const [action, setAction] = useState<"mint" | "burn">("mint")
  const [selectedStablecoin, setSelectedStablecoin] = useState("USSA")
  const [selectedCollateral, setSelectedCollateral] = useState("SOJA")
  const [collateralAmount, setCollateralAmount] = useState("")
  const [stablecoinAmount, setStablecoinAmount] = useState("")

  const currentStablecoin = stablecoins.find((s) => s.symbol === selectedStablecoin)
  const currentCollateral = collateralAssets.find((c) => c.symbol === selectedCollateral)

  const calculateMintAmount = () => {
    if (!collateralAmount || !currentCollateral || !currentStablecoin) return ""
    const collateralValue = Number.parseFloat(collateralAmount) * currentCollateral.price
    const mintableAmount = (collateralValue / currentStablecoin.minCR) * 100
    return mintableAmount.toFixed(2)
  }

  const calculateCollateralRatio = () => {
    if (!collateralAmount || !stablecoinAmount || !currentCollateral) return 0
    const collateralValue = Number.parseFloat(collateralAmount) * currentCollateral.price
    const stablecoinValue = Number.parseFloat(stablecoinAmount)
    return stablecoinValue > 0 ? (collateralValue / stablecoinValue) * 100 : 0
  }

  return (
    <div className="space-y-4">
      {/* Action Type */}
      <Tabs value={action} onValueChange={(value) => setAction(value as "mint" | "burn")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mint">Mint</TabsTrigger>
          <TabsTrigger value="burn">Burn</TabsTrigger>
        </TabsList>

        <TabsContent value={action} className="space-y-4 mt-4">
          {/* Stablecoin Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Stablecoin</Label>
            <Select value={selectedStablecoin} onValueChange={setSelectedStablecoin}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stablecoins.map((coin) => (
                  <SelectItem key={coin.symbol} value={coin.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <span>{coin.symbol}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {coin.currentCR.toFixed(1)}% CR
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {action === "mint" && (
            <>
              {/* Collateral Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Collateral Asset</Label>
                <Select value={selectedCollateral} onValueChange={setSelectedCollateral}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Criptomoedas</div>
                    {collateralAssets
                      .filter((asset) => asset.type === "crypto")
                      .map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <span>{asset.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{asset.balance} available</span>
                          </div>
                        </SelectItem>
                      ))}
                    <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-t mt-1 pt-2">
                      Commodities Agrícolas
                    </div>
                    {collateralAssets
                      .filter((asset) => asset.type === "commodity")
                      .map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <span>{asset.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{asset.balance} available</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Collateral Amount */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Collateral Amount</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={collateralAmount}
                  onChange={(e) => {
                    setCollateralAmount(e.target.value)
                    setStablecoinAmount(calculateMintAmount())
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Available: {currentCollateral?.balance}</span>
                  <span>Price: ${currentCollateral?.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Mintable Amount */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Mintable {selectedStablecoin}</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stablecoinAmount}
                  onChange={(e) => setStablecoinAmount(e.target.value)}
                />
              </div>

              {/* Collateral Ratio */}
              {collateralAmount && stablecoinAmount && (
                <Card className="p-3 bg-muted/30">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Collateral Ratio</span>
                      <span
                        className={
                          calculateCollateralRatio() >= (currentStablecoin?.minCR || 150)
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {calculateCollateralRatio().toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Math.min(calculateCollateralRatio() / 3, 100)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: {currentStablecoin?.minCR}%</span>
                      <span>Safe: 200%+</span>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}

          {action === "burn" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount to Burn</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={stablecoinAmount}
                onChange={(e) => setStablecoinAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Burning will return your collateral proportionally</p>
            </div>
          )}

          {/* Action Button */}
          <Button
            className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
            disabled={!stablecoinAmount || Number.parseFloat(stablecoinAmount) <= 0}
          >
            {action === "mint" ? "Mint" : "Burn"} {selectedStablecoin}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
