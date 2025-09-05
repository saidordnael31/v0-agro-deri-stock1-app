"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

const futuresContracts = [
  { symbol: "SOJA-MAR24", price: 1456.78, change: 2.34, expiry: "2024-03-15", volume: "2.1M" },
  { symbol: "MILHO-JUN24", price: 687.45, change: -5.67, expiry: "2024-06-15", volume: "1.8M" },
  { symbol: "CAFE-SEP24", price: 2134.56, change: 12.45, expiry: "2024-09-15", volume: "890K" },
]

export function FuturesInterface() {
  const [selectedContract, setSelectedContract] = useState("SOJA-MAR24")
  const [side, setSide] = useState<"long" | "short">("long")
  const [size, setSize] = useState("")
  const [leverage, setLeverage] = useState([5])
  const [orderType, setOrderType] = useState("market")
  const [price, setPrice] = useState("")

  const currentContract = futuresContracts.find((c) => c.symbol === selectedContract)

  const calculateMargin = () => {
    if (!size || !currentContract) return 0
    return (Number.parseFloat(size) * currentContract.price) / leverage[0]
  }

  const calculatePnL = () => {
    if (!size || !currentContract) return 0
    // Mock PnL calculation
    return Number.parseFloat(size) * currentContract.change
  }

  return (
    <div className="space-y-4">
      {/* Contract Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Futures Contract</Label>
        <Select value={selectedContract} onValueChange={setSelectedContract}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {futuresContracts.map((contract) => (
              <SelectItem key={contract.symbol} value={contract.symbol}>
                <div className="flex items-center justify-between w-full">
                  <span>{contract.symbol}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{contract.expiry}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contract Info */}
      {currentContract && (
        <Card className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Mark Price</p>
              <p className="text-lg font-semibold">${currentContract.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p className={`text-sm font-medium ${currentContract.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {currentContract.change >= 0 ? "+" : ""}
                {currentContract.change.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiry</p>
              <p className="text-sm font-medium">{currentContract.expiry}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="text-sm font-medium">{currentContract.volume}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Position Side */}
      <Tabs value={side} onValueChange={(value) => setSide(value as "long" | "short")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="long" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
            Long
          </TabsTrigger>
          <TabsTrigger value="short" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
            Short
          </TabsTrigger>
        </TabsList>

        <TabsContent value={side} className="space-y-4 mt-4">
          {/* Order Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Order Type</Label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market Order</SelectItem>
                <SelectItem value="limit">Limit Order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price (for limit orders) */}
          {orderType === "limit" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Price (USSA)</Label>
              <Input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          )}

          {/* Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Size (Contracts)</Label>
            <Input type="number" placeholder="0" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>

          {/* Leverage */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Leverage</Label>
              <Badge variant="outline">{leverage[0]}x</Badge>
            </div>
            <Slider value={leverage} onValueChange={setLeverage} max={20} min={1} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1x</span>
              <span>10x</span>
              <span>20x</span>
            </div>
          </div>

          {/* Position Summary */}
          <Card className="p-3 bg-muted/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Required Margin</span>
                <span>${calculateMargin().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. PnL</span>
                <span className={calculatePnL() >= 0 ? "text-green-500" : "text-red-500"}>
                  ${calculatePnL().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trading Fee</span>
                <span>$2.50</span>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            className={`w-full ${side === "long" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
            disabled={!size || Number.parseFloat(size) <= 0}
          >
            Open {side === "long" ? "Long" : "Short"} Position
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
