import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const StablecoinActionSchema = z.object({
  action: z.enum(["mint", "burn"]),
  stablecoin: z.enum(["USSA", "BRSA", "GLDA"]),
  amount: z.string(),
  collateralToken: z.string().optional(),
  collateralAmount: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, stablecoin, amount, collateralToken, collateralAmount } = StablecoinActionSchema.parse(body)

    const collateralRatio = Math.random() * 50 + 150 // 150-200%
    const txId = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json({
      success: true,
      data: {
        transactionId: txId,
        action,
        stablecoin,
        amount,
        collateralRatio: collateralRatio.toFixed(2),
        fee: (Number.parseFloat(amount) * 0.005).toFixed(6),
        timestamp: new Date().toISOString(),
        status: "confirmed",
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
      stablecoins: [
        {
          symbol: "USSA",
          name: "USD Stablecoin Agro",
          totalSupply: "12500000",
          collateralRatio: "175.5",
          price: "1.00",
          backing: "USD + Agricultural Assets",
        },
        {
          symbol: "BRSA",
          name: "BRL Stablecoin Agro",
          totalSupply: "62500000",
          collateralRatio: "168.2",
          price: "0.20",
          backing: "BRL + Agricultural Assets",
        },
        {
          symbol: "GLDA",
          name: "Gold Stablecoin Agro",
          totalSupply: "850000",
          collateralRatio: "185.8",
          price: "2340.80",
          backing: "Gold + Agricultural Assets",
        },
      ],
    },
  })
}
