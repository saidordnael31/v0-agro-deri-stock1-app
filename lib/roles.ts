import type { Claims, Role, Tier } from "@/components/RoleGate"

export function hasFeature(claims: Claims, feature: string): boolean {
  return claims.features.includes(feature)
}

export function requiresKYC(claims: Claims): boolean {
  return claims.kyc === true
}

export function getRolePermissions(role: Role, tier?: Tier): string[] {
  const basePermissions: Record<Role, string[]> = {
    farmer: ["lot_register", "hedge_access", "wr_create", "barter_create"],
    buyer: ["rfq_create", "term_accept", "logistics_view"],
    trader: ["mint_stable", "yield_access", "term_create", "vault_access"],
  }

  const permissions = [...basePermissions[role]]

  if (tier === "pro") {
    permissions.push("markets_rt", "pro_dash", "advanced_analytics")
  }

  return permissions
}

export function getHeaderCTAs(role: Role): Array<{ label: string; href: string; variant?: "default" | "outline" }> {
  switch (role) {
    case "trader":
      return [
        { label: "Depositar Colateral", href: "/defi/mint", variant: "outline" },
        { label: "Gerar sUSD/sBRL", href: "/defi/mint" },
        { label: "Abrir Termo", href: "/trader/term" },
        { label: "Ver Yield", href: "/trader/yield" },
      ]
    case "farmer":
      return [
        { label: "Cadastrar Lote", href: "/farmer/lot", variant: "outline" },
        { label: "Fazer Hedge", href: "/farmer/hedge" },
        { label: "Tokenizar Terra", href: "/rwa/land-register" },
      ]
    case "buyer":
      return [
        { label: "Criar RFQ", href: "/buyer/rfq", variant: "outline" },
        { label: "Aceitar Termo", href: "/buyer/accept" },
      ]
    default:
      return []
  }
}
