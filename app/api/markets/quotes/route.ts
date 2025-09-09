import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")?.split(",") || []
  const latency = searchParams.get("latency") || "delayed15"
  const exchange = searchParams.get("exchange")

  const filteredSymbols =
    exchange && exchange !== "ALL" ? symbols.filter((symbol) => getExchangeForSymbol(symbol) === exchange) : symbols

  if (filteredSymbols.length === 0) {
    return NextResponse.json({
      success: false,
      error: "No valid symbols provided",
      data: { quotes: [], latency, timestamp: new Date().toISOString() },
    })
  }

  const quotes = filteredSymbols.map((symbol) => {
    const basePrice = getBasePriceForSymbol(symbol)
    const variation = (Math.random() - 0.5) * basePrice * 0.05 // 5% variation
    const currentPrice = basePrice + variation
    const openPrice = basePrice + (Math.random() - 0.5) * basePrice * 0.02

    return {
      instrument_id: symbol,
      symbol: symbol,
      exchange: getExchangeForSymbol(symbol),
      ts: Date.now(),
      last: Number(currentPrice.toFixed(2)),
      price: Number(currentPrice.toFixed(2)),
      bid: Number((currentPrice - Math.random() * 2).toFixed(2)),
      ask: Number((currentPrice + Math.random() * 2).toFixed(2)),
      mark: Number(currentPrice.toFixed(2)),
      vol24h: Math.floor(Math.random() * 1000000),
      open: Number(openPrice.toFixed(2)),
      high: Number((Math.max(currentPrice, openPrice) + Math.random() * 15).toFixed(2)),
      low: Number((Math.min(currentPrice, openPrice) - Math.random() * 15).toFixed(2)),
      change: Number((currentPrice - openPrice).toFixed(2)),
      changePercent: Number((((currentPrice - openPrice) / openPrice) * 100).toFixed(2)),
      unit: getUnitForSymbol(symbol),
      currency: getCurrencyForSymbol(symbol),
      latency: latency,
    }
  })

  return NextResponse.json({
    success: true,
    data: {
      latency,
      quotes,
      timestamp: new Date().toISOString(),
      exchange: exchange || "ALL",
    },
  })
}

function getBasePriceForSymbol(symbol: string): number {
  const priceMap: Record<string, number> = {
    // CME - Grãos
    ZCZ5: 450.25,
    ZSZ5: 1150.5,
    ZWZ5: 650.75,
    ZOZ5: 380.5,
    ZRZ5: 15.25,
    // CME - Pecuários
    LEZ5: 1.85,
    FCZ5: 2.45,
    HEZ5: 0.85,
    // CME - Energia
    CLZ5: 75.5,
    NGZ5: 3.25,
    RBZ5: 2.15,
    HOZ5: 2.35,
    // CME - Metais
    GCZ5: 2050.5,
    SIZ5: 24.75,
    HGZ5: 4.25,
    PLZ5: 950.25,
    PAZ5: 1850.75,

    // ICE - Soft Commodities
    CLEZ5: 185.2,
    SBZ5: 22.45,
    CTZ5: 75.8,
    CCZ5: 2850.0,
    OJZ5: 125.5,
    // ICE - Energia
    BZ5: 78.25,
    GASZ5: 85.5,
    COALZ5: 125.75,

    // B3 - Commodities Brasileiras
    SOJZ5: 1580.0,
    MILZ5: 890.25,
    CAFZ5: 2340.8,
    ACUZ5: 85.5,
    ALGZ5: 145.75,
    BOIZ5: 285.5,
    ETAZ5: 2850.0,

    // DCE - China
    C2501: 2850.0,
    A2501: 4200.0,
    M2501: 3150.0,
    Y2501: 8500.0,
    P2501: 7850.0,
    I2501: 850.0,
    J2501: 1950.0,

    // SHFE - China
    AU2501: 520.5,
    AG2501: 6850.0,
    CU2501: 75500.0,
    AL2501: 19500.0,
    ZN2501: 25500.0,
    PB2501: 16500.0,
    NI2501: 125500.0,
    SN2501: 245500.0,
    RB2501: 3850.0,
    HC2501: 4150.0,
    SC2501: 585.0,

    // MCX - Índia
    GOLD25JAN: 72500.0,
    SILVER25JAN: 85500.0,
    COPPER25JAN: 785.0,
    ZINC25JAN: 285.0,
    LEAD25JAN: 195.0,
    NICKEL25JAN: 1850.0,
    CRUDE25JAN: 6250.0,
    NATGAS25JAN: 285.0,

    // LME - Londres
    LMCAD03: 8500.0,
    LMAHD03: 2150.0,
    LMZSD03: 2850.0,
    LMPBD03: 2050.0,
    LMNID03: 18500.0,
    LMSND03: 28500.0,

    // TOCOM - Tóquio
    TGOLD25: 9850.0,
    TSILVER25: 3250.0,
    TPLAT25: 4850.0,
    TPALL25: 3650.0,
    TRUBBER25: 285.0,

    // EEX - Europa
    EPOWER25: 85.5,
    EGAS25: 45.25,
    ECOAL25: 125.75,
    ECO225: 85.25,

    // ASX - Austrália
    WHEAT25: 385.0,
    BARLEY25: 285.0,
    CANOLA25: 685.0,
    CATTLE25: 4.85,
  }
  return priceMap[symbol] || 100.0
}

function getExchangeForSymbol(symbol: string): string {
  if (
    symbol.startsWith("Z") ||
    symbol.startsWith("LE") ||
    symbol.startsWith("FC") ||
    symbol.startsWith("HE") ||
    symbol.startsWith("CL") ||
    symbol.startsWith("NG") ||
    symbol.startsWith("RB") ||
    symbol.startsWith("HO") ||
    symbol.startsWith("GC") ||
    symbol.startsWith("SI") ||
    symbol.startsWith("HG") ||
    symbol.startsWith("PL") ||
    symbol.startsWith("PA")
  )
    return "CME"
  if (
    symbol.startsWith("CLE") ||
    symbol.startsWith("SB") ||
    symbol.startsWith("CT") ||
    symbol.startsWith("CC") ||
    symbol.startsWith("OJ") ||
    symbol.startsWith("B") ||
    symbol.startsWith("GAS") ||
    symbol.startsWith("COAL")
  )
    return "ICE"
  if (
    symbol.includes("SOJ") ||
    symbol.includes("MIL") ||
    symbol.includes("CAF") ||
    symbol.includes("ACU") ||
    symbol.includes("ALG") ||
    symbol.includes("BOI") ||
    symbol.includes("ETA")
  )
    return "B3"
  if (
    symbol.includes("25") &&
    (symbol.includes("C") ||
      symbol.includes("A") ||
      symbol.includes("M") ||
      symbol.includes("Y") ||
      symbol.includes("P") ||
      symbol.includes("I") ||
      symbol.includes("J"))
  )
    return "DCE"
  if (
    symbol.includes("25") &&
    (symbol.includes("AU") ||
      symbol.includes("AG") ||
      symbol.includes("CU") ||
      symbol.includes("AL") ||
      symbol.includes("ZN") ||
      symbol.includes("PB") ||
      symbol.includes("NI") ||
      symbol.includes("SN") ||
      symbol.includes("RB") ||
      symbol.includes("HC") ||
      symbol.includes("SC"))
  )
    return "SHFE"
  if (
    symbol.includes("25JAN") ||
    symbol.includes("GOLD") ||
    symbol.includes("SILVER") ||
    symbol.includes("COPPER") ||
    symbol.includes("ZINC") ||
    symbol.includes("LEAD") ||
    symbol.includes("NICKEL") ||
    symbol.includes("CRUDE") ||
    symbol.includes("NATGAS")
  )
    return "MCX"
  if (symbol.startsWith("LM")) return "LME"
  if (symbol.startsWith("T")) return "TOCOM"
  if (symbol.startsWith("E")) return "EEX"
  if (symbol.includes("WHEAT") || symbol.includes("BARLEY") || symbol.includes("CANOLA") || symbol.includes("CATTLE"))
    return "ASX"
  return "UNKNOWN"
}

function getUnitForSymbol(symbol: string): string {
  // Grãos em bushel (CME)
  if (symbol.startsWith("Z")) return "bushel"
  // Pecuários em pound
  if (symbol.startsWith("LE") || symbol.startsWith("FC") || symbol.startsWith("HE")) return "pound"
  // Energia
  if (symbol.includes("CL") || symbol.includes("B") || symbol.includes("CRUDE")) return "barrel"
  if (symbol.includes("NG") || symbol.includes("GAS")) return "mmbtu"
  if (symbol.includes("RB") || symbol.includes("HO")) return "gallon"
  // Metais preciosos em ounce (CME/COMEX)
  if (symbol.includes("GC") || symbol.includes("SI") || symbol.includes("PL") || symbol.includes("PA")) return "ounce"
  // Metais industriais em pound/ton
  if (symbol.includes("HG") || symbol.includes("CU")) return "pound"
  // Soft commodities em pound
  if (symbol.includes("CLE") || symbol.includes("SB") || symbol.includes("CT") || symbol.includes("OJ")) return "pound"
  // Cacau em ton
  if (symbol.includes("CC")) return "ton"
  // Brasil - saca/arroba
  if (symbol.includes("SOJ") || symbol.includes("MIL") || symbol.includes("CAF") || symbol.includes("ACU"))
    return "saca"
  if (symbol.includes("BOI") || symbol.includes("ALG")) return "arroba"
  if (symbol.includes("ETA")) return "m3"
  // China - ton/kg/gram
  if (
    symbol.includes("25") &&
    (symbol.includes("C") ||
      symbol.includes("A") ||
      symbol.includes("M") ||
      symbol.includes("Y") ||
      symbol.includes("P") ||
      symbol.includes("I") ||
      symbol.includes("J") ||
      symbol.includes("CU") ||
      symbol.includes("AL") ||
      symbol.includes("ZN") ||
      symbol.includes("PB") ||
      symbol.includes("NI") ||
      symbol.includes("SN") ||
      symbol.includes("RB") ||
      symbol.includes("HC"))
  )
    return "ton"
  if (symbol.includes("AU") || symbol.includes("GOLD")) return "gram"
  if (symbol.includes("AG") || symbol.includes("SILVER")) return "kg"
  // Índia - gram/kg
  if (
    symbol.includes("GOLD") ||
    symbol.includes("SILVER") ||
    symbol.includes("COPPER") ||
    symbol.includes("ZINC") ||
    symbol.includes("LEAD") ||
    symbol.includes("NICKEL")
  )
    return "kg"
  // Europa - mwh/ton
  if (symbol.includes("POWER") || symbol.includes("GAS")) return "mwh"
  if (symbol.includes("COAL") || symbol.includes("CO2")) return "ton"
  // Austrália - ton/kg
  if (symbol.includes("WHEAT") || symbol.includes("BARLEY") || symbol.includes("CANOLA")) return "ton"
  if (symbol.includes("CATTLE")) return "kg"

  return "unit"
}

function getCurrencyForSymbol(symbol: string): string {
  // Brasil - BRL
  if (
    symbol.includes("SOJ") ||
    symbol.includes("MIL") ||
    symbol.includes("CAF") ||
    symbol.includes("ACU") ||
    symbol.includes("ALG") ||
    symbol.includes("BOI") ||
    symbol.includes("ETA")
  )
    return "BRL"
  // China - CNY
  if (
    symbol.includes("25") &&
    (symbol.includes("C") ||
      symbol.includes("A") ||
      symbol.includes("M") ||
      symbol.includes("Y") ||
      symbol.includes("P") ||
      symbol.includes("I") ||
      symbol.includes("J") ||
      symbol.includes("AU") ||
      symbol.includes("AG") ||
      symbol.includes("CU") ||
      symbol.includes("AL") ||
      symbol.includes("ZN") ||
      symbol.includes("PB") ||
      symbol.includes("NI") ||
      symbol.includes("SN") ||
      symbol.includes("RB") ||
      symbol.includes("HC") ||
      symbol.includes("SC"))
  )
    return "CNY"
  // Índia - INR
  if (
    symbol.includes("25JAN") ||
    (symbol.includes("GOLD") && !symbol.includes("GC")) ||
    symbol.includes("SILVER") ||
    symbol.includes("COPPER") ||
    symbol.includes("ZINC") ||
    symbol.includes("LEAD") ||
    symbol.includes("NICKEL") ||
    symbol.includes("CRUDE") ||
    symbol.includes("NATGAS")
  )
    return "INR"
  // Reino Unido - GBP
  if (symbol.includes("GAS") && symbol.includes("Z5")) return "GBP"
  // Europa - EUR
  if (symbol.startsWith("E")) return "EUR"
  // Japão - JPY
  if (symbol.startsWith("T")) return "JPY"
  // Austrália - AUD
  if (symbol.includes("WHEAT") || symbol.includes("BARLEY") || symbol.includes("CANOLA") || symbol.includes("CATTLE"))
    return "AUD"
  // Padrão - USD
  return "USD"
}
