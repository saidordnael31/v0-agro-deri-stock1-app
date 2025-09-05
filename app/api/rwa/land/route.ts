import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const LandRegistrationSchema = z.object({
  propertyName: z.string(),
  location: z.string(),
  coordinates: z.string().optional(),
  totalArea: z.string(),
  landType: z.string(),
  titleDeedNumber: z.string(),
  registrationNumber: z.string(),
  ownershipType: z.string(),
  soilType: z.string(),
  irrigationSystem: z.string().optional(),
  currentCrops: z.string(),
  annualYield: z.string().optional(),
  estimatedValue: z.string(),
  lastAppraisal: z.string().optional(),
})

const LandPledgeSchema = z.object({
  landId: z.string(),
  pledgeAmount: z.string(),
  loanPurpose: z.string(),
  loanTerm: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "register") {
      const registration = LandRegistrationSchema.parse(body.data)

      const landId = `LAND-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const tokenSupply = Math.floor(Number.parseFloat(registration.estimatedValue) / 1000)

      return NextResponse.json({
        success: true,
        data: {
          landId,
          status: "pending_verification",
          tokenSupply,
          tokenSymbol: `LAND-${landId.split("-")[1]}`,
          estimatedProcessingTime: "5-7 business days",
          requiredVerifications: [
            "Title deed verification",
            "Property survey validation",
            "Soil quality assessment",
            "Environmental compliance check",
            "Legal ownership confirmation",
          ],
          ...registration,
        },
      })
    }

    if (action === "pledge") {
      const pledge = LandPledgeSchema.parse(body.data)

      const pledgeId = `PLEDGE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const maxLoanAmount = Number.parseFloat(pledge.pledgeAmount) * 0.75 // 75% LTV

      return NextResponse.json({
        success: true,
        data: {
          pledgeId,
          status: "active",
          maxLoanAmount: maxLoanAmount.toFixed(2),
          interestRate: "8.5",
          liquidationThreshold: "85",
          collateralRatio: "133.33",
          createdAt: new Date().toISOString(),
          ...pledge,
        },
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action === "registered-lands") {
    return NextResponse.json({
      success: true,
      data: [
        {
          id: "LAND-001",
          propertyName: "Fazenda São Paulo",
          location: "São Paulo, Brazil",
          totalArea: "500",
          landType: "cropland",
          estimatedValue: "2500000",
          tokenSupply: "2500",
          tokenSymbol: "LAND-001",
          status: "verified",
          registrationDate: "2024-01-15",
        },
        {
          id: "LAND-002",
          propertyName: "Estância Rio Grande",
          location: "Rio Grande do Sul, Brazil",
          totalArea: "750",
          landType: "mixed",
          estimatedValue: "3750000",
          tokenSupply: "3750",
          tokenSymbol: "LAND-002",
          status: "verified",
          registrationDate: "2024-02-20",
        },
      ],
    })
  }

  if (action === "pledged-assets") {
    return NextResponse.json({
      success: true,
      data: [
        {
          pledgeId: "PLEDGE-001",
          landId: "LAND-001",
          propertyName: "Fazenda São Paulo",
          pledgeAmount: "500000",
          maxLoanAmount: "375000",
          currentLoan: "300000",
          interestRate: "8.5",
          status: "active",
          createdAt: "2024-03-01T10:00:00Z",
        },
      ],
    })
  }

  return NextResponse.json({
    success: true,
    data: {
      totalRegisteredLands: 2,
      totalLandValue: "6250000",
      totalTokenizedValue: "4687500", // 75% of total value
      activePledges: 1,
      totalPledgedValue: "500000",
    },
  })
}
