"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const cryptoAssets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.45",
    price: 67234.56,
    minCR: 150,
    liquidationThreshold: 130,
    volatilityRisk: "High",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "12.34",
    price: 3456.78,
    minCR: 160,
    liquidationThreshold: 140,
    volatilityRisk: "High",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "5000.00",
    price: 1.0,
    minCR: 105,
    liquidationThreshold: 102,
    volatilityRisk: "Low",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: "0.23",
    price: 67180.45,
    minCR: 150,
    liquidationThreshold: 130,
    volatilityRisk: "High",
  },
]

export function CryptoCollateralManager() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [collateralAmount, setCollateralAmount] = useState("")
  const [borrowAmount, setBorrowAmount] = useState("")

  const currentCrypto = cryptoAssets.find((c) => c.symbol === selectedCrypto)

  const calculateMaxBorrow = () => {
    if (!collateralAmount || !currentCrypto) return ""
    const collateralValue = Number.parseFloat(collateralAmount) * currentCrypto.price
    const maxBorrow = (collateralValue / currentCrypto.minCR) * 100
    return maxBorrow.toFixed(2)
  }

  const calculateHealthFactor = () => {
    if (!collateralAmount || !borrowAmount || !currentCrypto) return 0
    const collateralValue = Number.parseFloat(collateralAmount) * currentCrypto.price
    const borrowValue = Number.parseFloat(borrowAmount)
    const healthFactor = (collateralValue / borrowValue) * (100 / currentCrypto.liquidationThreshold)
    return Math.min(healthFactor, 3) // Cap at 3 for display
  }

  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
          Hipercolateralização Cripto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Crypto Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Criptomoeda Colateral</Label>
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cryptoAssets.map((crypto) => (
                <SelectItem key={crypto.symbol} value={crypto.symbol}>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{crypto.symbol}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          crypto.volatilityRisk === "High"
                            ? "border-red-500 text-red-500"
                            : crypto.volatilityRisk === "Medium"
                              ? "border-yellow-500 text-yellow-500"
                              : "border-green-500 text-green-500"
                        }`}
                      >
                        {crypto.volatilityRisk}
                      </Badge>
                      <span className="text-xs text-muted-foreground">${crypto.price.toLocaleString()}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Collateral Amount */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quantidade Colateral</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={collateralAmount}
            onChange={(e) => {
              setCollateralAmount(e.target.value)
              setBorrowAmount(calculateMaxBorrow())
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              Disponível: {currentCrypto?.balance} {selectedCrypto}
            </span>
            <span>
              Valor: $
              {currentCrypto && collateralAmount
                ? (Number.parseFloat(collateralAmount) * currentCrypto.price).toLocaleString()
                : "0.00"}
            </span>
          </div>
        </div>

        {/* Borrow Amount */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Valor a Emprestar (USD)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={borrowAmount}
            onChange={(e) => setBorrowAmount(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Máximo: ${calculateMaxBorrow()} (CR mínimo: {currentCrypto?.minCR}%)
          </p>
        </div>

        {/* Health Factor */}
        {collateralAmount && borrowAmount && (
          <Card className="p-3 bg-muted/30">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Health Factor</span>
                <span
                  className={
                    calculateHealthFactor() > 1.5
                      ? "text-green-500"
                      : calculateHealthFactor() > 1.2
                        ? "text-yellow-500"
                        : "text-red-500"
                  }
                >
                  {calculateHealthFactor().toFixed(2)}
                </span>
              </div>
              <Progress value={Math.min(calculateHealthFactor() * 33.33, 100)} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Liquidação: &lt;1.0</span>
                <span>Seguro: &gt;1.5</span>
              </div>
            </div>
          </Card>
        )}

        {/* Risk Warning */}
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-500 font-medium">⚠️ Risco de Volatilidade</p>
          <p className="text-xs text-muted-foreground mt-1">
            Criptomoedas são altamente voláteis. Mantenha health factor &gt;1.5 para evitar liquidação.
          </p>
        </div>

        <Button className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90">Depositar Colateral</Button>
      </CardContent>
    </Card>
  )
}
