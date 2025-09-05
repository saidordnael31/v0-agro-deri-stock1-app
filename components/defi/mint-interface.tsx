"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, AlertCircle } from "lucide-react"

const stablecoins = [
  { symbol: "USSA", name: "US Soy Stablecoin", collateral: "Soja", ratio: "150%", apy: "4.2%" },
  { symbol: "BRSA", name: "Brazil Soy Stablecoin", collateral: "Soja BR", ratio: "150%", apy: "5.1%" },
  { symbol: "GLDA", name: "Global Agriculture Stablecoin", collateral: "Multi-commodity", ratio: "200%", apy: "3.8%" },
]

export function MintInterface() {
  const [selectedCoin, setSelectedCoin] = useState("USSA")
  const [mintAmount, setMintAmount] = useState("")
  const [collateralAmount, setCollateralAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleMint = async () => {
    setIsLoading(true)
    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Reset form
    setMintAmount("")
    setCollateralAmount("")
  }

  const selectedStablecoin = stablecoins.find((coin) => coin.symbol === selectedCoin)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Coins className="h-8 w-8 text-[#00FFD1]" />
        <div>
          <h1 className="text-2xl font-bold">Mint Stablecoins</h1>
          <p className="text-gray-400">Cunhe stablecoins lastreadas em commodities agrícolas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle>Cunhar Stablecoin</CardTitle>
              <CardDescription>Selecione a stablecoin e forneça o colateral necessário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Stablecoin</Label>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stablecoins.map((coin) => (
                      <SelectItem key={coin.symbol} value={coin.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{coin.symbol}</span>
                          <span className="text-sm text-gray-400">- {coin.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quantidade a Cunhar</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">{selectedCoin} tokens</p>
                </div>

                <div className="space-y-2">
                  <Label>Colateral Necessário</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">USD equivalente</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-500">Ratio de Colateralização</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Mantenha pelo menos {selectedStablecoin?.ratio} de colateral para evitar liquidação
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleMint}
                disabled={!mintAmount || !collateralAmount || isLoading}
                className="w-full bg-[#00FFD1] text-black hover:bg-[#00E6BC]"
              >
                {isLoading ? "Cunhando..." : `Cunhar ${selectedCoin}`}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Stablecoins Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stablecoins.map((coin) => (
                <div key={coin.symbol} className="p-3 border border-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{coin.symbol}</span>
                    <Badge variant="outline" className="text-[#00FFD1] border-[#00FFD1]">
                      APY {coin.apy}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{coin.name}</p>
                  <p className="text-xs text-gray-500">Colateral: {coin.collateral}</p>
                  <p className="text-xs text-gray-500">Ratio: {coin.ratio}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#00FFD1]" />
                Seus Saldos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">USSA</span>
                <span className="text-sm font-medium">1,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">BRSA</span>
                <span className="text-sm font-medium">850.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">GLDA</span>
                <span className="text-sm font-medium">2,100.75</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
