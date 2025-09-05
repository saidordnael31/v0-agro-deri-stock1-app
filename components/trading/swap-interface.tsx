"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Loader2, TrendingUp, TrendingDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const tokens = [
  { symbol: "USSA", name: "USD Stablecoin Agro", balance: "1,234.56", price: 1.0 },
  { symbol: "BRSA", name: "BRL Stablecoin Agro", balance: "6,789.12", price: 0.2 },
  { symbol: "SOJA", name: "Soybean Token", balance: "45.78", price: 1456.78 },
  { symbol: "MILHO", name: "Corn Token", balance: "123.45", price: 687.45 },
]

export function SwapInterface({ marketData = [] }) {
  const [fromToken, setFromToken] = useState("USSA")
  const [toToken, setToToken] = useState("SOJA")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [realTimePrices, setRealTimePrices] = useState({})
  const { toast } = useToast()

  useEffect(() => {
    const priceMap = {}
    if (Array.isArray(marketData)) {
      marketData.forEach((item) => {
        priceMap[item.symbol] = item.price
      })
    }
    setRealTimePrices(priceMap)
  }, [marketData])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const getCurrentPrice = (symbol) => {
    return realTimePrices[symbol] || tokens.find((t) => t.symbol === symbol)?.price || 1
  }

  const calculateSwap = (amount: string) => {
    if (!amount) return ""
    const fromPrice = getCurrentPrice(fromToken)
    const toPrice = getCurrentPrice(toToken)
    const result = (Number.parseFloat(amount) * fromPrice) / toPrice
    return result.toFixed(6)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(calculateSwap(value))
  }

  const executeSwap = async () => {
    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/trading/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromToken,
          toToken,
          fromAmount,
          toAmount,
          fromPrice: getCurrentPrice(fromToken),
          toPrice: getCurrentPrice(toToken),
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Swap Successful",
          description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
        })

        setFromAmount("")
        setToAmount("")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Swap Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMarketInfo = (symbol) => {
    if (!Array.isArray(marketData)) return null
    return marketData.find((item) => item.symbol === symbol)
  }

  return (
    <div className="space-y-4">
      {/* From Token */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">From</Label>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center gap-2">
                      <span>{token.symbol}</span>
                      {getMarketInfo(token.symbol) && (
                        <div className="flex items-center gap-1">
                          {getMarketInfo(token.symbol).change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-sm font-medium">{tokens.find((t) => t.symbol === fromToken)?.balance}</p>
              <p className="text-xs text-muted-foreground">${getCurrentPrice(fromToken).toFixed(2)}</p>
            </div>
          </div>
          <Input
            type="number"
            placeholder="0.00"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            className="text-lg font-semibold"
          />
        </Card>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSwapTokens}
          className="rounded-full p-2 h-8 w-8 bg-transparent"
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      {/* To Token */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">To</Label>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center gap-2">
                      <span>{token.symbol}</span>
                      {getMarketInfo(token.symbol) && (
                        <div className="flex items-center gap-1">
                          {getMarketInfo(token.symbol).change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-sm font-medium">{tokens.find((t) => t.symbol === toToken)?.balance}</p>
              <p className="text-xs text-muted-foreground">${getCurrentPrice(toToken).toFixed(2)}</p>
            </div>
          </div>
          <Input
            type="number"
            placeholder="0.00"
            value={toAmount}
            readOnly
            className="text-lg font-semibold bg-muted/50"
          />
        </Card>
      </div>

      {/* Swap Details */}
      <Card className="p-3 bg-muted/30">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span>
              1 {fromToken} = {calculateSwap("1")} {toToken}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market Spread</span>
            <span>0.1%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network Fee</span>
            <span>~$0.50</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Slippage</span>
            <span>0.5%</span>
          </div>
          {marketData.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Source</span>
              <Badge variant="outline" className="text-xs">
                Live Market
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Swap Button */}
      <Button
        className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
        disabled={!fromAmount || Number.parseFloat(fromAmount) <= 0 || isLoading}
        onClick={executeSwap}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Swapping...
          </>
        ) : !fromAmount ? (
          "Enter Amount"
        ) : (
          "Swap Tokens"
        )}
      </Button>
    </div>
  )
}
