"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { spotTradingSchema, type SpotTradingForm } from "@/lib/validation"

const spotPairs = [
  { symbol: "SOJA/USSA", price: 1456.78, change: 2.34, volume: "1.2M" },
  { symbol: "MILHO/USSA", price: 687.45, change: -5.67, volume: "890K" },
  { symbol: "CAFE/USSA", price: 2134.56, change: 12.45, volume: "567K" },
]

export function SpotInterface() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<SpotTradingForm>({
    resolver: zodResolver(spotTradingSchema),
    defaultValues: {
      selectedPair: "SOJA/USSA",
      orderType: "market",
      side: "buy",
      amount: "",
      price: "",
    },
  })

  const selectedPair = form.watch("selectedPair")
  const orderType = form.watch("orderType")
  const side = form.watch("side")
  const amount = form.watch("amount")

  const currentPair = spotPairs.find((p) => p.symbol === selectedPair)

  const handlePercentageClick = (percentage: number) => {
    const mockBalance = 1000
    const calculatedAmount = ((mockBalance * percentage) / 100).toString()
    form.setValue("amount", calculatedAmount)
  }

  const onSubmit = async (data: SpotTradingForm) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/trading/spot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: data.selectedPair,
          side: data.side,
          type: data.orderType,
          quantity: data.amount,
          price: data.price,
        }),
      })

      if (!response.ok) throw new Error("Order failed")

      const result = await response.json()

      toast({
        title: "Order Placed Successfully",
        description: `${data.side.toUpperCase()} order for ${data.amount} ${data.selectedPair.split("/")[0]} placed. Order ID: ${result.data.orderId}`,
      })

      form.reset({
        selectedPair: data.selectedPair,
        orderType: data.orderType,
        side: data.side,
        amount: "",
        price: "",
      })
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Pair Selection */}
          <FormField
            control={form.control}
            name="selectedPair"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Trading Pair</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

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
          <Tabs value={side} onValueChange={(value) => form.setValue("side", value as "buy" | "sell")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="buy"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
                Sell
              </TabsTrigger>
            </TabsList>

            <TabsContent value={side} className="space-y-4 mt-4">
              {/* Order Type */}
              <FormField
                control={form.control}
                name="orderType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Order Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Order</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price (for limit orders) */}
              {orderType === "limit" && (
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Price (USSA)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => handlePercentageClick(25)}>
                        25%
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => handlePercentageClick(50)}>
                        50%
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => handlePercentageClick(75)}>
                        75%
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => handlePercentageClick(100)}>
                        100%
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      $
                      {amount && currentPair
                        ? (Number.parseFloat(amount) * currentPair.price * 0.001).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full ${side === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                disabled={isLoading}
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
        </form>
      </Form>
    </div>
  )
}
