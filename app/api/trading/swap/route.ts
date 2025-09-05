import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const SwapRequestSchema = z.object({
  fromToken: z.string(),
  toToken: z.string(),
  amount: z.string(),
  slippage: z.number().min(0).max(50),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromToken, toToken, amount, slippage } = SwapRequestSchema.parse(body)

    // Mock swap calculation
    const rate = Math.random() * 2 + 0.5 // Random rate between 0.5-2.5
    const outputAmount = (Number.parseFloat(amount) * rate).toFixed(6)
    const priceImpact = Math.random() * 2 // Random impact 0-2%

    return NextResponse.json({
      success: true,
      data: {
        inputAmount: amount,
        outputAmount,
        rate: rate.toFixed(6),
        priceImpact: priceImpact.toFixed(2),
        minimumReceived: (Number.parseFloat(outputAmount) * (1 - slippage / 100)).toFixed(6),
        fee: (Number.parseFloat(amount) * 0.003).toFixed(6), // 0.3% fee
        route: [fromToken, toToken],
        estimatedGas: "0.002",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      supportedTokens: [
        { symbol: "SOJA", name: "Soja Token", price: 1580.5 },
        { symbol: "MILHO", name: "Milho Token", price: 890.25 },
        { symbol: "CAFE", name: "Café Token", price: 2340.8 },
        { symbol: "USSA", name: "USD Stablecoin Agro", price: 1.0 },
        { symbol: "BRSA", name: "BRL Stablecoin Agro", price: 0.2 },
      ],
    },
  })
}
