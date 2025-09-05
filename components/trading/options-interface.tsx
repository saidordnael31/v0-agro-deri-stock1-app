"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const optionsChain = [
  { strike: 1400, call: { price: 78.5, iv: 0.25 }, put: { price: 21.3, iv: 0.23 } },
  { strike: 1450, call: { price: 45.2, iv: 0.24 }, put: { price: 38.7, iv: 0.24 } },
  { strike: 1500, call: { price: 23.8, iv: 0.23 }, put: { price: 67.3, iv: 0.25 } },
  { strike: 1550, call: { price: 12.4, iv: 0.22 }, put: { price: 105.9, iv: 0.26 } },
]

export function OptionsInterface() {
  const [underlying, setUnderlying] = useState("SOJA")
  const [expiry, setExpiry] = useState("2024-03-15")
  const [optionType, setOptionType] = useState<"call" | "put">("call")
  const [strike, setStrike] = useState("1450")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState("")

  const selectedOption = optionsChain.find((o) => o.strike.toString() === strike)
  const optionPrice = selectedOption ? selectedOption[optionType].price : 0
  const impliedVol = selectedOption ? selectedOption[optionType].iv : 0

  const calculatePremium = () => {
    if (!quantity) return 0
    return Number.parseFloat(quantity) * optionPrice
  }

  return (
    <div className="space-y-4">
      {/* Underlying Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Underlying</Label>
          <Select value={underlying} onValueChange={setUnderlying}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SOJA">SOJA</SelectItem>
              <SelectItem value="MILHO">MILHO</SelectItem>
              <SelectItem value="CAFE">CAFE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Expiry</Label>
          <Select value={expiry} onValueChange={setExpiry}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-03-15">Mar 15, 2024</SelectItem>
              <SelectItem value="2024-06-15">Jun 15, 2024</SelectItem>
              <SelectItem value="2024-09-15">Sep 15, 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Option Type */}
      <Tabs value={optionType} onValueChange={(value) => setOptionType(value as "call" | "put")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="call" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
            Call Options
          </TabsTrigger>
          <TabsTrigger value="put" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
            Put Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value={optionType} className="space-y-4 mt-4">
          {/* Options Chain */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Options Chain - {optionType.toUpperCase()}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {optionsChain.map((option) => (
                  <div
                    key={option.strike}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 ${
                      strike === option.strike.toString() ? "bg-[#00FFD1]/10 border-l-2 border-[#00FFD1]" : ""
                    }`}
                    onClick={() => setStrike(option.strike.toString())}
                  >
                    <div>
                      <p className="font-medium">${option.strike}</p>
                      <p className="text-xs text-muted-foreground">Strike</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">${option[optionType].price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Premium</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{(option[optionType].iv * 100).toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">IV</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <div className="space-y-4">
            {/* Buy/Sell */}
            <Tabs value={side} onValueChange={(value) => setSide(value as "buy" | "sell")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy to Open</TabsTrigger>
                <TabsTrigger value="sell">Sell to Open</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Quantity */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Quantity (Contracts)</Label>
              <Input type="number" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>

            {/* Option Summary */}
            <Card className="p-3 bg-muted/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Strike Price</span>
                  <span>${strike}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium per Contract</span>
                  <span>${optionPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Premium</span>
                  <span>${calculatePremium().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Implied Volatility</span>
                  <span>{(impliedVol * 100).toFixed(1)}%</span>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
              disabled={!quantity || Number.parseFloat(quantity) <= 0}
            >
              {side === "buy" ? "Buy" : "Sell"} {optionType.toUpperCase()} Option
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
