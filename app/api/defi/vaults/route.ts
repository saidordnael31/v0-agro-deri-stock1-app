import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const VaultActionSchema = z.object({
  vaultId: z.string(),
  action: z.enum(["deposit", "withdraw"]),
  amount: z.number().positive(),
  asset: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vaultId, action, amount, asset } = VaultActionSchema.parse(body)

    // Mock vault operation processing
    const txHash = `0x${Math.random().toString(16).slice(2, 18)}`
    const fee = amount * 0.001 // 0.1% fee
    const timestamp = new Date().toISOString()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      data: {
        transactionId: `VAULT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        txHash,
        vaultId,
        action,
        amount,
        asset,
        fee: fee.toFixed(6),
        timestamp,
        status: "confirmed",
        estimatedGas: "0.002",
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof z.ZodError ? "Invalid request parameters" : "Vault operation failed",
      },
      { status: 400 },
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const vaultId = searchParams.get("vaultId")

  // Mock vault data
  const vaults = [
    {
      id: "soja-yield",
      name: "SOJA Yield Vault",
      asset: "SOJA",
      apy: 12.5,
      tvl: 1234567,
      strategy: "Liquidity Mining",
      risk: "Medium",
      totalDeposits: 567890,
      totalWithdrawals: 123456,
      performance: {
        daily: 0.034,
        weekly: 0.24,
        monthly: 1.04,
        yearly: 12.5,
      },
    },
    {
      id: "stable-farm",
      name: "Stablecoin Farm",
      asset: "USSA",
      apy: 8.2,
      tvl: 2345678,
      strategy: "Lending Protocol",
      risk: "Low",
      totalDeposits: 1234567,
      totalWithdrawals: 234567,
      performance: {
        daily: 0.022,
        weekly: 0.16,
        monthly: 0.68,
        yearly: 8.2,
      },
    },
    {
      id: "agro-index",
      name: "Agro Index Vault",
      asset: "Mixed",
      apy: 15.8,
      tvl: 890123,
      strategy: "Index Rebalancing",
      risk: "High",
      totalDeposits: 456789,
      totalWithdrawals: 89012,
      performance: {
        daily: 0.043,
        weekly: 0.3,
        monthly: 1.32,
        yearly: 15.8,
      },
    },
  ]

  if (vaultId) {
    const vault = vaults.find((v) => v.id === vaultId)
    if (!vault) {
      return NextResponse.json({ success: false, error: "Vault not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: vault })
  }

  return NextResponse.json({
    success: true,
    data: {
      vaults,
      totalTvl: vaults.reduce((sum, vault) => sum + vault.tvl, 0),
      averageApy: vaults.reduce((sum, vault) => sum + vault.apy, 0) / vaults.length,
    },
  })
}
