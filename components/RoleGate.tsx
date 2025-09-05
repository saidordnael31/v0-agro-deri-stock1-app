"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock, User } from "lucide-react"

export type Role = "farmer" | "buyer" | "trader"
export type Tier = "retail" | "pro"

export interface Claims {
  role: Role
  tier?: Tier
  kyc?: boolean
  features: string[]
}

interface RoleGateProps {
  role: Role
  tier?: Tier
  children: ReactNode
}

// Mock hook - replace with actual auth implementation
function useUserClaims(): Claims {
  // For demo purposes, return trader pro with all features
  return {
    role: "trader",
    tier: "pro",
    kyc: true,
    features: [
      "pro_dash",
      "rwa_module",
      "yield_details",
      "basis_readonly",
      "markets_rt",
      "exch_cme",
      "exch_ice",
      "exch_b3",
    ],
  }
}

function NoAccess({ role, tier }: { role: Role; tier?: Tier }) {
  const getRoleLabel = (role: Role) => {
    switch (role) {
      case "farmer":
        return "Produtor"
      case "buyer":
        return "Comprador"
      case "trader":
        return "Trader"
      default:
        return role
    }
  }

  const getTierLabel = (tier?: Tier) => {
    if (!tier) return ""
    return tier === "pro" ? "Profissional" : "Retail"
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="max-w-md w-full bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gray-800 rounded-full w-fit">
            <Lock className="h-6 w-6 text-gray-400" />
          </div>
          <CardTitle className="text-white">Acesso Restrito</CardTitle>
          <CardDescription className="text-gray-400">
            Esta área é exclusiva para {getRoleLabel(role)} {getTierLabel(tier)}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            Para acessar este módulo, você precisa ter o perfil adequado e as permissões necessárias.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Alterar Perfil
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Fazer KYC
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function RoleGate({ role, tier, children }: RoleGateProps) {
  const claims = useUserClaims()

  const okRole = claims.role === role
  const okTier = !tier || claims.tier === tier

  return okRole && okTier ? <>{children}</> : <NoAccess role={role} tier={tier} />
}
