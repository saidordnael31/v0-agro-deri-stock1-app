export interface OracleData {
  id: string
  name: string
  type: "price" | "weather" | "supply" | "basis" | "unit"
  status: "active" | "warning" | "error" | "offline"
  confidence: number
  lastUpdate: string
  sources: number
  value: string
  unit: string
  deviation: number
}

export interface BasisData {
  region: string
  commodity: string
  basis: number
  currency: string
  lastUpdate: string
}

export interface UnitConversion {
  from: string
  to: string
  rate: number
  commodity: string
}

export class OracleService {
  async getOracleData(type?: string): Promise<OracleData[]> {
    // Mock implementation - replace with actual API calls
    const response = await fetch(`/api/oracles${type ? `?type=${type}` : ""}`)
    const data = await response.json()
    return data.oracles
  }

  async getBasisData(region?: string, commodity?: string): Promise<BasisData[]> {
    const params = new URLSearchParams()
    if (region) params.append("region", region)
    if (commodity) params.append("commodity", commodity)

    const response = await fetch(`/api/oracles/basis?${params}`)
    const data = await response.json()
    return data.basis
  }

  async getUnitConversions(commodity?: string): Promise<UnitConversion[]> {
    const params = commodity ? `?commodity=${commodity}` : ""
    const response = await fetch(`/api/oracles/units${params}`)
    const data = await response.json()
    return data.conversions
  }

  calculateLocalPrice(cmePrice: number, basis: number, exchangeRate: number, unitRate: number): number {
    return (cmePrice + basis) * exchangeRate * unitRate
  }

  convertUnits(amount: number, fromUnit: string, toUnit: string, commodity: string): number {
    // Mock conversion rates - replace with actual oracle data
    const conversionRates: Record<string, Record<string, number>> = {
      soja: {
        "bushel-saca": 0.727,
        "saca-bushel": 1.375,
        "bushel-ton": 0.0272,
        "ton-bushel": 36.74,
      },
      milho: {
        "bushel-saca": 0.714,
        "saca-bushel": 1.4,
        "bushel-ton": 0.0254,
        "ton-bushel": 39.37,
      },
    }

    const key = `${fromUnit}-${toUnit}`
    const rate = conversionRates[commodity]?.[key] || 1
    return amount * rate
  }
}

export const oracleService = new OracleService()
