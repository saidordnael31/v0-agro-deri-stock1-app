"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getHeaderCTAs } from "@/lib/roles"
import type { Claims } from "@/components/RoleGate"
import Link from "next/link"

interface DynamicHeaderProps {
  claims: Claims
}

export function DynamicHeader({ claims }: DynamicHeaderProps) {
  const ctas = getHeaderCTAs(claims.role)

  const getRoleLabel = (role: string) => {
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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-950 border-b border-gray-800">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30">
            {getRoleLabel(claims.role)}
          </Badge>
          {claims.tier && (
            <Badge
              variant="outline"
              className={
                claims.tier === "pro"
                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                  : "bg-gray-500/10 text-gray-500 border-gray-500/30"
              }
            >
              {claims.tier === "pro" ? "PRO" : "Retail"}
            </Badge>
          )}
          {claims.kyc && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
              KYC ✓
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {ctas.map((cta, index) => (
          <Button
            key={index}
            variant={cta.variant || "default"}
            size="sm"
            asChild
            className={cta.variant === "default" ? "bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90" : ""}
          >
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
