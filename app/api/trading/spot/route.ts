import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const SpotOrderSchema = z.object({
  symbol: z.string(),
  side: z.enum(["buy", "sell"]),
  type: z.enum(["market", "limit", "stop"]),
  quantity: z.string(),
  price: z.string().optional(),
  stopPrice: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const order = SpotOrderSchema.parse(body)

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const currentPrice = 1580.5 + (Math.random() - 0.5) * 100

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        status: order.type === "market" ? "filled" : "pending",
        symbol: order.symbol,
        side: order.side,
        type: order.type,
        quantity: order.quantity,
        price: order.price || currentPrice.toFixed(2),
        filledQuantity: order.type === "market" ? order.quantity : "0",
        timestamp: new Date().toISOString(),
        fee: (Number.parseFloat(order.quantity) * 0.001).toFixed(6),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid order" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      orderBook: {
        bids: Array.from({ length: 10 }, (_, i) => ({
          price: (1580 - i * 2).toFixed(2),
          quantity: (Math.random() * 1000).toFixed(2),
          total: ((1580 - i * 2) * Math.random() * 1000).toFixed(2),
        })),
        asks: Array.from({ length: 10 }, (_, i) => ({
          price: (1582 + i * 2).toFixed(2),
          quantity: (Math.random() * 1000).toFixed(2),
          total: ((1582 + i * 2) * Math.random() * 1000).toFixed(2),
        })),
      },
    },
  })
}
