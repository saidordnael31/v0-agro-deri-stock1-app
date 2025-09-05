import { type NextRequest, NextResponse } from "next/server"

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true"
const CHECKOUT_BASE = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://agroderi.in/checkout"
const CHECKOUT_API_KEY = process.env.CHECKOUT_API_KEY ?? ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() // CheckoutIntent (validar no front com Zod)

    if (USE_MOCKS) {
      const intentId = `mock_${Math.random().toString(36).slice(2)}`
      const checkoutUrl = `${CHECKOUT_BASE}?intent=${intentId}&type=${body?.type ?? "BUY_AGD"}`
      return NextResponse.json({ intentId, checkoutUrl }, { status: 200 })
    }

    // proxy → agroderi.in
    const res = await fetch(`${CHECKOUT_BASE}/api/intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHECKOUT_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const msg = await res.text()
      return NextResponse.json({ error: msg || "Checkout intent failed" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unexpected error" }, { status: 500 })
  }
}
