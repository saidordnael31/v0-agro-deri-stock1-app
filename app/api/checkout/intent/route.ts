import { type NextRequest, NextResponse } from "next/server"

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true"
const CHECKOUT_BASE = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://agroderi.in/checkout"
const CHECKOUT_API_KEY = process.env.CHECKOUT_API_KEY ?? ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() // CheckoutIntent (validar no front com Zod)

    const intentId = `agroderi_${Math.random().toString(36).slice(2)}_${Date.now()}`
    const checkoutUrl = `https://agroderi.in/checkout?intent=${intentId}&type=${body?.type ?? "BUY_AGD"}&amount=${body?.amount ?? 100}&asset=${body?.asset ?? "AGD"}`

    return NextResponse.json(
      {
        intentId,
        checkoutUrl,
        gateway: "agroderi.in",
        message: "Redirecionando para gateway oficial AgroDeri",
      },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unexpected error" }, { status: 500 })
  }
}
