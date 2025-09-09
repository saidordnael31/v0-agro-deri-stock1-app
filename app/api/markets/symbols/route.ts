import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exchange = searchParams.get("exchange")

  const symbolsByExchange = {
    // Chicago Mercantile Exchange (CME)
    CME: [
      // Grãos
      { symbol: "ZCZ5", name: "Corn Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "ZSZ5", name: "Soybean Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "ZWZ5", name: "Wheat Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "ZOZ5", name: "Oats Dec 2025", unit: "bushel", currency: "USD", tick_size: 0.25 },
      { symbol: "ZRZ5", name: "Rice Dec 2025", unit: "cwt", currency: "USD", tick_size: 0.005 },
      // Pecuários
      { symbol: "LEZ5", name: "Live Cattle Dec 2025", unit: "pound", currency: "USD", tick_size: 0.00025 },
      { symbol: "FCZ5", name: "Feeder Cattle Dec 2025", unit: "pound", currency: "USD", tick_size: 0.00025 },
      { symbol: "HEZ5", name: "Lean Hogs Dec 2025", unit: "pound", currency: "USD", tick_size: 0.00025 },
      // Energia
      { symbol: "CLZ5", name: "Crude Oil Dec 2025", unit: "barrel", currency: "USD", tick_size: 0.01 },
      { symbol: "NGZ5", name: "Natural Gas Dec 2025", unit: "mmbtu", currency: "USD", tick_size: 0.001 },
      { symbol: "RBZ5", name: "RBOB Gasoline Dec 2025", unit: "gallon", currency: "USD", tick_size: 0.0001 },
      { symbol: "HOZ5", name: "Heating Oil Dec 2025", unit: "gallon", currency: "USD", tick_size: 0.0001 },
      // Metais
      { symbol: "GCZ5", name: "Gold Dec 2025", unit: "ounce", currency: "USD", tick_size: 0.1 },
      { symbol: "SIZ5", name: "Silver Dec 2025", unit: "ounce", currency: "USD", tick_size: 0.005 },
      { symbol: "HGZ5", name: "Copper Dec 2025", unit: "pound", currency: "USD", tick_size: 0.0005 },
      { symbol: "PLZ5", name: "Platinum Dec 2025", unit: "ounce", currency: "USD", tick_size: 0.1 },
      { symbol: "PAZ5", name: "Palladium Dec 2025", unit: "ounce", currency: "USD", tick_size: 0.05 },
    ],

    // Intercontinental Exchange (ICE)
    ICE: [
      // Soft Commodities
      { symbol: "CLEZ5", name: "Coffee C Dec 2025", unit: "pound", currency: "USD", tick_size: 0.05 },
      { symbol: "SBZ5", name: "Sugar #11 Dec 2025", unit: "pound", currency: "USD", tick_size: 0.01 },
      { symbol: "CTZ5", name: "Cotton Dec 2025", unit: "pound", currency: "USD", tick_size: 0.01 },
      { symbol: "CCZ5", name: "Cocoa Dec 2025", unit: "ton", currency: "USD", tick_size: 1.0 },
      { symbol: "OJZ5", name: "Orange Juice Dec 2025", unit: "pound", currency: "USD", tick_size: 0.05 },
      // Energia
      { symbol: "BZ5", name: "Brent Crude Dec 2025", unit: "barrel", currency: "USD", tick_size: 0.01 },
      { symbol: "GASZ5", name: "UK Natural Gas Dec 2025", unit: "therm", currency: "GBP", tick_size: 0.001 },
      { symbol: "COALZ5", name: "Newcastle Coal Dec 2025", unit: "ton", currency: "USD", tick_size: 0.01 },
    ],

    // Brasil Bolsa Balcão (B3)
    B3: [
      // Grãos
      { symbol: "SOJZ5", name: "Soja Dec 2025", unit: "saca", currency: "BRL", tick_size: 0.5 },
      { symbol: "MILZ5", name: "Milho Dec 2025", unit: "saca", currency: "BRL", tick_size: 0.25 },
      { symbol: "CAFZ5", name: "Café Dec 2025", unit: "saca", currency: "BRL", tick_size: 1.0 },
      { symbol: "ACUZ5", name: "Açúcar Dec 2025", unit: "saca", currency: "BRL", tick_size: 0.01 },
      { symbol: "ALGZ5", name: "Algodão Dec 2025", unit: "arroba", currency: "BRL", tick_size: 0.01 },
      // Pecuários
      { symbol: "BOIZ5", name: "Boi Gordo Dec 2025", unit: "arroba", currency: "BRL", tick_size: 0.05 },
      { symbol: "ETAZ5", name: "Etanol Dec 2025", unit: "m3", currency: "BRL", tick_size: 1.0 },
    ],

    // Dalian Commodity Exchange (DCE)
    DCE: [
      { symbol: "C2501", name: "Corn Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
      { symbol: "A2501", name: "Soybean Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
      { symbol: "M2501", name: "Soybean Meal Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
      { symbol: "Y2501", name: "Soybean Oil Jan 2025", unit: "ton", currency: "CNY", tick_size: 2.0 },
      { symbol: "P2501", name: "Palm Oil Jan 2025", unit: "ton", currency: "CNY", tick_size: 2.0 },
      { symbol: "I2501", name: "Iron Ore Jan 2025", unit: "ton", currency: "CNY", tick_size: 0.5 },
      { symbol: "J2501", name: "Coking Coal Jan 2025", unit: "ton", currency: "CNY", tick_size: 0.5 },
    ],

    // Shanghai Futures Exchange (SHFE)
    SHFE: [
      { symbol: "AU2501", name: "Gold Jan 2025", unit: "gram", currency: "CNY", tick_size: 0.02 },
      { symbol: "AG2501", name: "Silver Jan 2025", unit: "kg", currency: "CNY", tick_size: 1.0 },
      { symbol: "CU2501", name: "Copper Jan 2025", unit: "ton", currency: "CNY", tick_size: 10.0 },
      { symbol: "AL2501", name: "Aluminum Jan 2025", unit: "ton", currency: "CNY", tick_size: 5.0 },
      { symbol: "ZN2501", name: "Zinc Jan 2025", unit: "ton", currency: "CNY", tick_size: 5.0 },
      { symbol: "PB2501", name: "Lead Jan 2025", unit: "ton", currency: "CNY", tick_size: 5.0 },
      { symbol: "NI2501", name: "Nickel Jan 2025", unit: "ton", currency: "CNY", tick_size: 10.0 },
      { symbol: "SN2501", name: "Tin Jan 2025", unit: "ton", currency: "CNY", tick_size: 10.0 },
      { symbol: "RB2501", name: "Rebar Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
      { symbol: "HC2501", name: "Hot Rolled Coil Jan 2025", unit: "ton", currency: "CNY", tick_size: 1.0 },
      { symbol: "SC2501", name: "Crude Oil Jan 2025", unit: "barrel", currency: "CNY", tick_size: 0.1 },
    ],

    // Multi Commodity Exchange (MCX)
    MCX: [
      { symbol: "GOLD25JAN", name: "Gold Jan 2025", unit: "gram", currency: "INR", tick_size: 1.0 },
      { symbol: "SILVER25JAN", name: "Silver Jan 2025", unit: "kg", currency: "INR", tick_size: 1.0 },
      { symbol: "COPPER25JAN", name: "Copper Jan 2025", unit: "kg", currency: "INR", tick_size: 0.05 },
      { symbol: "ZINC25JAN", name: "Zinc Jan 2025", unit: "kg", currency: "INR", tick_size: 0.05 },
      { symbol: "LEAD25JAN", name: "Lead Jan 2025", unit: "kg", currency: "INR", tick_size: 0.05 },
      { symbol: "NICKEL25JAN", name: "Nickel Jan 2025", unit: "kg", currency: "INR", tick_size: 1.0 },
      { symbol: "CRUDE25JAN", name: "Crude Oil Jan 2025", unit: "barrel", currency: "INR", tick_size: 1.0 },
      { symbol: "NATGAS25JAN", name: "Natural Gas Jan 2025", unit: "mmbtu", currency: "INR", tick_size: 0.1 },
    ],

    // London Metal Exchange (LME)
    LME: [
      { symbol: "LMCAD03", name: "LME Copper 3M", unit: "ton", currency: "USD", tick_size: 0.5 },
      { symbol: "LMAHD03", name: "LME Aluminum 3M", unit: "ton", currency: "USD", tick_size: 0.5 },
      { symbol: "LMZSD03", name: "LME Zinc 3M", unit: "ton", currency: "USD", tick_size: 0.5 },
      { symbol: "LMPBD03", name: "LME Lead 3M", unit: "ton", currency: "USD", tick_size: 0.5 },
      { symbol: "LMNID03", name: "LME Nickel 3M", unit: "ton", currency: "USD", tick_size: 5.0 },
      { symbol: "LMSND03", name: "LME Tin 3M", unit: "ton", currency: "USD", tick_size: 5.0 },
    ],

    // Tokyo Commodity Exchange (TOCOM)
    TOCOM: [
      { symbol: "TGOLD25", name: "TOCOM Gold 2025", unit: "gram", currency: "JPY", tick_size: 1.0 },
      { symbol: "TSILVER25", name: "TOCOM Silver 2025", unit: "kg", currency: "JPY", tick_size: 1.0 },
      { symbol: "TPLAT25", name: "TOCOM Platinum 2025", unit: "gram", currency: "JPY", tick_size: 1.0 },
      { symbol: "TPALL25", name: "TOCOM Palladium 2025", unit: "gram", currency: "JPY", tick_size: 1.0 },
      { symbol: "TRUBBER25", name: "TOCOM Rubber 2025", unit: "kg", currency: "JPY", tick_size: 0.1 },
    ],

    // European Energy Exchange (EEX)
    EEX: [
      { symbol: "EPOWER25", name: "EEX Power 2025", unit: "mwh", currency: "EUR", tick_size: 0.01 },
      { symbol: "EGAS25", name: "EEX Gas 2025", unit: "mwh", currency: "EUR", tick_size: 0.001 },
      { symbol: "ECOAL25", name: "EEX Coal 2025", unit: "ton", currency: "EUR", tick_size: 0.01 },
      { symbol: "ECO225", name: "EEX CO2 2025", unit: "ton", currency: "EUR", tick_size: 0.01 },
    ],

    // Australian Securities Exchange (ASX)
    ASX: [
      { symbol: "WHEAT25", name: "ASX Wheat 2025", unit: "ton", currency: "AUD", tick_size: 0.1 },
      { symbol: "BARLEY25", name: "ASX Barley 2025", unit: "ton", currency: "AUD", tick_size: 0.1 },
      { symbol: "CANOLA25", name: "ASX Canola 2025", unit: "ton", currency: "AUD", tick_size: 0.1 },
      { symbol: "CATTLE25", name: "ASX Cattle 2025", unit: "kg", currency: "AUD", tick_size: 0.001 },
    ],
  }

  const allSymbols = Object.values(symbolsByExchange).flat()
  const symbols = exchange ? symbolsByExchange[exchange as keyof typeof symbolsByExchange] || [] : allSymbols

  return NextResponse.json({
    success: true,
    data: {
      exchange: exchange || "ALL",
      symbols,
      count: symbols.length,
      exchanges: Object.keys(symbolsByExchange),
    },
  })
}
