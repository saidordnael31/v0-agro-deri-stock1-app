"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const spotPairs = [
  { symbol: "SOJA/USSA", price: 1456.78, change: 2.34, volume: "1.2M" },
  { symbol: "MILHO/USSA", price: 687.45, change: -5.67, volume: "890K" },
  { symbol: "CAFE/USSA", price: 2134.56, change: 12.45, volume: "567K" },
]

export function SpotInterface() {
  const [selectedPair, setSelectedPair] = useState("SOJA/USSA")
  const [orderType, setOrderType] = useState("market")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const currentPair = spotPairs.find((p) => p.symbol === selectedPair)

  const handlePercentageClick = (percentage: number) => {
    const mockBalance = 1000 // Mock user balance
    const calculatedAmount = ((mockBalance * percentage) / 100).toString()
    setAmount(calculatedAmount)
  }

  const executeOrder = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Order Placed",
        description: `${side.toUpperCase()} order for ${amount} ${selectedPair.split("/")[0]} placed successfully`,
      })

      setAmount("")
      setPrice("")
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Please check your balance and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Pair Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Trading Pair</Label>
        <Select value={selectedPair} onValueChange={setSelectedPair}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {spotPairs.map((pair) => (
              <SelectItem key={pair.symbol} value={pair.symbol}>
                <div className="flex items-center justify-between w-full">
                  <span>{pair.symbol}</span>
                  <span className={`ml-2 ${pair.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ${pair.price.toFixed(2)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Price */}
      {currentPair && (
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-lg font-semibold">${currentPair.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${currentPair.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {currentPair.change >= 0 ? "+" : ""}
                {currentPair.change.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">24h Volume: {currentPair.volume}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Order Form */}
      <Tabs value={side} onValueChange={(value) => setSide(value as "buy" | "sell")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
            Sell
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
                <SelectItem value="stop">Stop Order</SelectItem>
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

          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Amount</Label>
            <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handlePercentageClick(25)}>
                25%
              </Button>
              <Button variant="outline" size="sm" onClick={() => handlePercentageClick(50)}>
                50%
              </Button>
              <Button variant="outline" size="sm" onClick={() => handlePercentageClick(75)}>
                75%
              </Button>
              <Button variant="outline" size="sm" onClick={() => handlePercentageClick(100)}>
                100%
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="p-3 bg-muted/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Value</span>
                <span>
                  ${amount && currentPair ? (Number.parseFloat(amount) * currentPair.price).toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trading Fee (0.1%)</span>
                <span>
                  ${amount && currentPair ? (Number.parseFloat(amount) * currentPair.price * 0.001).toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            className={`w-full ${side === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
            disabled={!amount || Number.parseFloat(amount) <= 0 || isLoading}
            onClick={executeOrder}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Order...
              </>
            ) : (
              `${side === "buy" ? "Buy" : "Sell"} ${selectedPair.split("/")[0]}`
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
