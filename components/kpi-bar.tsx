"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Shield } from "lucide-react"

interface KpiData {
  tvl: number
  backstopFund: number
  backstopHealth: "healthy" | "warning" | "critical"
}

export function KpiBar() {
  const [kpiData, setKpiData] = useState<KpiData>({
    tvl: 0,
    backstopFund: 0,
    backstopHealth: "healthy",
  })

  useEffect(() => {
    // Simulate fetching KPI data
    const fetchKpiData = () => {
      setKpiData({
        tvl: 12500000, // $12.5M
        backstopFund: 2100000, // $2.1M
        backstopHealth: "healthy",
      })
    }

    fetchKpiData()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-success"
      case "warning":
        return "text-warning"
      case "critical":
        return "text-error"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-primary" />
              <span className="text-sm text-gray-400">TVL Stablecoins:</span>
              <span className="font-semibold text-brand-primary">{formatCurrency(kpiData.tvl)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-info" />
              <span className="text-sm text-gray-400">Backstop Fund:</span>
              <span className="font-semibold text-info">{formatCurrency(kpiData.backstopFund)}</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  kpiData.backstopHealth === "healthy"
                    ? "bg-success"
                    : kpiData.backstopHealth === "warning"
                      ? "bg-warning"
                      : "bg-error"
                }`}
              />
              <span className="text-sm text-gray-400">Status:</span>
              <span className={`font-semibold capitalize ${getHealthColor(kpiData.backstopHealth)}`}>
                {kpiData.backstopHealth === "healthy"
                  ? "Saudável"
                  : kpiData.backstopHealth === "warning"
                    ? "Atenção"
                    : "Crítico"}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500">Atualizado em tempo real • Dados da blockchain Polygon</div>
        </div>
      </div>
    </div>
  )
}
