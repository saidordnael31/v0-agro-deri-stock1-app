import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const SBLCApplicationSchema = z.object({
  applicantName: z.string(),
  beneficiaryName: z.string(),
  amount: z.string(),
  currency: z.string(),
  commodity: z.string(),
  expiryDate: z.string(),
  terms: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const application = SBLCApplicationSchema.parse(body)

    const sblcId = `SBLC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const fee = Number.parseFloat(application.amount) * 0.02 // 2% fee

    return NextResponse.json({
      success: true,
      data: {
        sblcId,
        status: "pending_review",
        applicationDate: new Date().toISOString(),
        estimatedProcessingTime: "3-5 business days",
        fee: fee.toFixed(2),
        requiredDocuments: [
          "Commercial Invoice",
          "Bill of Lading",
          "Certificate of Origin",
          "Phytosanitary Certificate",
        ],
        ...application,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid application" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      activeSBLCs: [
        {
          id: "SBLC-001",
          applicant: "AgroExport Ltd",
          beneficiary: "Global Commodities Inc",
          amount: "500000",
          currency: "USD",
          commodity: "Soja",
          status: "active",
          expiryDate: "2024-12-31",
          utilization: "65%",
        },
        {
          id: "SBLC-002",
          applicant: "Brasil Grains SA",
          beneficiary: "European Trading Co",
          amount: "750000",
          currency: "EUR",
          commodity: "Milho",
          status: "pending",
          expiryDate: "2025-01-15",
          utilization: "0%",
        },
      ],
    },
  })
}
