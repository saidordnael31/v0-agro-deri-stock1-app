"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface BasisData {
  cmePrice: number
  basis: number
  unitConversion: number
  localPrice: number
  trend: "up" | "down" | "neutral"
  commodity: string
  unit: string
}

export function BasisUnitWidget() {
  const [basisData, setBasisData] = useState<BasisData>({
    cmePrice: 1245.5,
    basis: -15.25,
    unitConversion: 1.08,
    localPrice: 1332.87,
    trend: "up",
    commodity: "Soja",
    unit: "R$/saca",
  })

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setBasisData((prev) => {
        const newBasis = prev.basis + (Math.random() - 0.5) * 2
        const newCmePrice = prev.cmePrice + (Math.random() - 0.5) * 10
        const newLocalPrice = (newCmePrice + newBasis) * prev.unitConversion

        return {
          ...prev,
          cmePrice: newCmePrice,
          basis: newBasis,
          localPrice: newLocalPrice,
          trend: newLocalPrice > prev.localPrice ? "up" : newLocalPrice < prev.localPrice ? "down" : "neutral",
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = () => {
    switch (basisData.trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = () => {
    switch (basisData.trend) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
          Basis & Unidade Oracle
          <Badge variant="secondary" className="bg-[#00FFD1]/20 text-[#00FFD1] border-[#00FFD1]/30">
            Ao vivo
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formula Display */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-xs text-gray-400 mb-2">Fórmula de Precificação:</div>
          <div className="text-sm font-mono text-white">Preço Local = CME ± Basis × Conversão</div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">CME ({basisData.commodity})</span>
            <span className="text-sm font-medium text-white">${basisData.cmePrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Basis Local</span>
            <span className={`text-sm font-medium ${basisData.basis >= 0 ? "text-green-400" : "text-red-400"}`}>
              {basisData.basis >= 0 ? "+" : ""}
              {basisData.basis.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Conversão USD→BRL</span>
            <span className="text-sm font-medium text-white">{basisData.unitConversion.toFixed(4)}x</span>
          </div>

          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Preço Final</span>
              <div className="flex items-center space-x-2">
                {getTrendIcon()}
                <span className={`text-lg font-bold ${getTrendColor()}`}>
                  {basisData.localPrice.toFixed(2)} {basisData.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 bg-gray-800/50 p-2 rounded">
          <div className="flex justify-between">
            <span>Última atualização:</span>
            <span>{new Date().toLocaleTimeString("pt-BR")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
