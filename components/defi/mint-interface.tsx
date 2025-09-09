"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { mintStablecoinSchema, type MintStablecoinForm } from "@/lib/validation"

const CoinsIcon = () => (
  <svg className="h-8 w-8 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-5 w-5 text-[#00FFD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg className="h-5 w-5 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
)

const Loader2Icon = () => (
  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const stablecoins = [
  { symbol: "USSA", name: "US Soy Stablecoin", collateral: "Soja + Crypto", ratio: "150%", apy: "4.2%" },
  { symbol: "BRSA", name: "Brazil Soy Stablecoin", collateral: "Soja BR + Crypto", ratio: "150%", apy: "5.1%" },
  {
    symbol: "GLDA",
    name: "Global Agriculture Stablecoin",
    collateral: "Multi-commodity + Crypto",
    ratio: "200%",
    apy: "3.8%",
  },
]

export function MintInterface() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<MintStablecoinForm>({
    resolver: zodResolver(mintStablecoinSchema),
    defaultValues: {
      selectedCoin: "USSA",
      mintAmount: "",
      collateralAmount: "",
    },
  })

  const selectedCoin = form.watch("selectedCoin")
  const mintAmount = form.watch("mintAmount")
  const selectedStablecoin = stablecoins.find((coin) => coin.symbol === selectedCoin)

  const calculateCollateral = (amount: string) => {
    if (!amount || !selectedStablecoin) return ""
    const ratio = Number.parseFloat(selectedStablecoin.ratio.replace("%", "")) / 100
    return (Number.parseFloat(amount) * ratio).toFixed(2)
  }

  const handleMintAmountChange = (value: string) => {
    form.setValue("mintAmount", value)
    const collateral = calculateCollateral(value)
    if (collateral) {
      form.setValue("collateralAmount", collateral)
    }
  }

  const onSubmit = async (data: MintStablecoinForm) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/defi/stablecoins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "mint",
          stablecoin: data.selectedCoin,
          amount: data.mintAmount,
          collateralAmount: data.collateralAmount,
        }),
      })

      if (!response.ok) throw new Error("Minting failed")

      const result = await response.json()

      toast({
        title: "Stablecoin Minted Successfully",
        description: `Minted ${data.mintAmount} ${data.selectedCoin}. Transaction ID: ${result.data.transactionId}`,
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: error.message || "Please check your collateral and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <CoinsIcon />
        <div>
          <h1 className="text-2xl font-bold">Mint Stablecoins</h1>
          <p className="text-gray-400">Cunhe stablecoins lastreadas em commodities agrícolas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle>Cunhar Stablecoin Hipercolateralizada</CardTitle>
              <CardDescription>
                Selecione a stablecoin e forneça colateral em commodities ou criptomoedas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="p-4 bg-[#00FFD1]/10 border border-[#00FFD1]/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
                      <span className="text-sm font-medium text-[#00FFD1]">Sistema Hipercolateralizado</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Aceita BTC, ETH, USDC e WBTC como colateral adicional às commodities agrícolas
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="selectedCoin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stablecoin</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mintAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade a Cunhar</FormLabel>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => handleMintAmountChange(e.target.value)}
                          />
                          <p className="text-xs text-gray-500">{selectedCoin} tokens</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="collateralAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Colateral Necessário</FormLabel>
                          <Input type="number" placeholder="0.00" {...field} readOnly />
                          <p className="text-xs text-gray-500">USD equivalente</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircleIcon />
                      <div>
                        <p className="text-sm font-medium text-yellow-500">Ratio de Colateralização</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Mantenha pelo menos {selectedStablecoin?.ratio} de colateral para evitar liquidação
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#00FFD1] text-black hover:bg-[#00E6BC]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon />
                        Cunhando...
                      </>
                    ) : (
                      `Cunhar ${selectedCoin}`
                    )}
                  </Button>
                </form>
              </Form>
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
                <TrendingUpIcon />
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
