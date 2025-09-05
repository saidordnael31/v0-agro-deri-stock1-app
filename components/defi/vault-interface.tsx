"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vault, Shield, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const vaults = [
  {
    id: "soja-yield",
    name: "SOJA Yield Vault",
    asset: "SOJA",
    apy: 12.5,
    tvl: 1234567,
    strategy: "Liquidity Mining",
    risk: "Medium",
    userDeposit: 45.78,
    userEarnings: 2.34,
  },
  {
    id: "stable-farm",
    name: "Stablecoin Farm",
    asset: "USSA",
    apy: 8.2,
    tvl: 2345678,
    strategy: "Lending Protocol",
    risk: "Low",
    userDeposit: 1234.56,
    userEarnings: 45.67,
  },
  {
    id: "agro-index",
    name: "Agro Index Vault",
    asset: "Mixed",
    apy: 15.8,
    tvl: 890123,
    strategy: "Index Rebalancing",
    risk: "High",
    userDeposit: 0,
    userEarnings: 0,
  },
]

export function VaultInterface() {
  const [selectedVault, setSelectedVault] = useState(vaults[0])
  const [action, setAction] = useState<"deposit" | "withdraw">("deposit")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "Medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "High":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  const handleMaxClick = () => {
    const maxAmount = action === "deposit" ? "1234.56" : selectedVault.userDeposit.toString()
    setAmount(maxAmount)
  }

  const executeVaultAction = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: `${action === "deposit" ? "Deposit" : "Withdrawal"} Successful`,
        description: `${action === "deposit" ? "Deposited" : "Withdrew"} ${amount} ${selectedVault.asset} ${action === "deposit" ? "to" : "from"} ${selectedVault.name}`,
      })

      setAmount("")
    } catch (error) {
      toast({
        title: `${action === "deposit" ? "Deposit" : "Withdrawal"} Failed`,
        description: "Please check your balance and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Vault Selection */}
      <div className="space-y-3">
        {vaults.map((vault) => (
          <Card
            key={vault.id}
            className={`cursor-pointer transition-all ${
              selectedVault.id === vault.id ? "ring-2 ring-[#00FFD1] bg-[#00FFD1]/5" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedVault(vault)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center">
                    <Vault className="h-4 w-4 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{vault.name}</p>
                    <p className="text-xs text-muted-foreground">{vault.strategy}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getRiskColor(vault.risk)}>
                      {vault.risk}
                    </Badge>
                    <span className="text-sm font-medium text-green-500">{vault.apy}% APY</span>
                  </div>
                  <p className="text-xs text-muted-foreground">TVL: ${(vault.tvl / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Vault Details */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {selectedVault.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Your Deposit</p>
              <p className="font-medium">
                {selectedVault.userDeposit} {selectedVault.asset}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Earnings</p>
              <p className="font-medium text-green-500">
                +{selectedVault.userEarnings} {selectedVault.asset}
              </p>
            </div>
          </div>

          {selectedVault.userDeposit > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Yield Progress</span>
                <span>{((selectedVault.userEarnings / selectedVault.userDeposit) * 100).toFixed(2)}%</span>
              </div>
              <Progress value={(selectedVault.userEarnings / selectedVault.userDeposit) * 100} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Form */}
      <div className="space-y-4">
        {/* Action Type */}
        <div className="flex gap-2">
          <Button
            variant={action === "deposit" ? "default" : "outline"}
            size="sm"
            onClick={() => setAction("deposit")}
            className="flex-1"
          >
            Deposit
          </Button>
          <Button
            variant={action === "withdraw" ? "default" : "outline"}
            size="sm"
            onClick={() => setAction("withdraw")}
            className="flex-1"
          >
            Withdraw
          </Button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Amount ({selectedVault.asset})</Label>
          <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {action === "deposit" ? "Available" : "Deposited"}:
              {action === "deposit" ? " 1,234.56" : ` ${selectedVault.userDeposit}`}
            </span>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={handleMaxClick}>
              Max
            </Button>
          </div>
        </div>

        {/* Projected Returns */}
        {amount && action === "deposit" && (
          <Card className="p-3 bg-muted/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projected Annual Yield</span>
                <span className="text-green-500">
                  {((Number.parseFloat(amount) * selectedVault.apy) / 100).toFixed(2)} {selectedVault.asset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Estimate</span>
                <span>
                  {((Number.parseFloat(amount) * selectedVault.apy) / 100 / 12).toFixed(4)} {selectedVault.asset}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Submit Button */}
        <Button
          className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
          disabled={!amount || Number.parseFloat(amount) <= 0 || isLoading}
          onClick={executeVaultAction}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `${action === "deposit" ? "Deposit to" : "Withdraw from"} Vault`
          )}
        </Button>
      </div>
    </div>
  )
}
