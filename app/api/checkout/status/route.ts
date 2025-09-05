import { type NextRequest, NextResponse } from "next/server"

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true"
const CHECKOUT_BASE = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://agroderi.in/checkout"
const CHECKOUT_API_KEY = process.env.CHECKOUT_API_KEY ?? ""

// mock storage em memória (apenas p/ dev no edge é volátil; serve p/ demo)
const mockStatuses = new Map<string, { status: string; txHash?: string }>()

export async function GET(req: NextRequest) {
  const intentId = req.nextUrl.searchParams.get("intentId")
  if (!intentId) {
    return NextResponse.json({ error: "Missing intentId" }, { status: 400 })
  }

  if (USE_MOCKS) {
    // evolui de PENDING → APPROVED → SETTLED (aleatório)
    const prev = mockStatuses.get(intentId)
    const roll = Math.random()
    const next = !prev
      ? { status: "PENDING" }
      : prev.status === "PENDING" && roll > 0.5
        ? { status: "APPROVED" }
        : prev.status === "APPROVED" && roll > 0.6
          ? { status: "SETTLED", txHash: `0xmock${intentId.slice(-6)}` }
          : prev

    mockStatuses.set(intentId, next ?? { status: "PENDING" })
    return NextResponse.json(mockStatuses.get(intentId) ?? { status: "PENDING" }, { status: 200 })
  }

  // proxy → agroderi.in
  const res = await fetch(`${CHECKOUT_BASE}/api/status?intentId=${encodeURIComponent(intentId)}`, {
    headers: { Authorization: `Bearer ${CHECKOUT_API_KEY}` },
  })

  if (!res.ok) {
    const msg = await res.text()
    return NextResponse.json({ error: msg || "Status fetch failed" }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 200 })
}
