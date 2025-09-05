export interface LandProperty {
  id: string
  propertyName: string
  location: string
  coordinates?: string
  totalArea: number
  landType: "cropland" | "pasture" | "mixed" | "orchard"
  titleDeedNumber: string
  registrationNumber: string
  ownershipType: string
  soilType: string
  irrigationSystem?: string
  currentCrops: string
  annualYield?: number
  estimatedValue: number
  lastAppraisal?: string
  tokenSupply: number
  tokenSymbol: string
  status: "pending" | "verified" | "rejected"
  registrationDate: string
}

export interface LandPledge {
  pledgeId: string
  landId: string
  propertyName: string
  pledgeAmount: number
  maxLoanAmount: number
  currentLoan: number
  interestRate: number
  liquidationThreshold: number
  collateralRatio: number
  loanPurpose: string
  status: "active" | "liquidated" | "repaid"
  createdAt: string
}

export interface CropToken {
  tokenId: string
  cropType: string
  cropSymbol: string
  plantingArea: number
  expectedYield: number
  qualityGrade: string
  plantingDate: string
  harvestDate: string
  tokenPrice: number
  totalTokens: number
  minimumPurchase: number
  totalValue: number
  insuranceCoverage: number
  weatherDerivatives: boolean
  deliveryLocation: string
  storageOptions: string
  qualitySpecs: string
  status: "active" | "matured" | "defaulted"
  createdAt: string
}

export const CROP_TYPES = [
  { value: "soybeans", label: "Soybeans", symbol: "SOJA", avgPrice: 14.56, unit: "bushel" },
  { value: "corn", label: "Corn", symbol: "MILHO", avgPrice: 6.87, unit: "bushel" },
  { value: "coffee", label: "Coffee", symbol: "CAFE", avgPrice: 2.13, unit: "pound" },
  { value: "sugar", label: "Sugar Cane", symbol: "ACUCAR", avgPrice: 0.46, unit: "pound" },
  { value: "wheat", label: "Wheat", symbol: "TRIGO", avgPrice: 8.45, unit: "bushel" },
] as const

export const LAND_TYPES = [
  { value: "cropland", label: "Cropland", description: "Agricultural land for crop production" },
  { value: "pasture", label: "Pasture", description: "Grazing land for livestock" },
  { value: "mixed", label: "Mixed Use", description: "Combined crop and livestock operations" },
  { value: "orchard", label: "Orchard", description: "Fruit and nut tree cultivation" },
] as const

export const SOIL_TYPES = [
  { value: "clay", label: "Clay", fertility: "High" },
  { value: "loam", label: "Loam", fertility: "Very High" },
  { value: "sand", label: "Sandy", fertility: "Medium" },
  { value: "silt", label: "Silt", fertility: "High" },
] as const

export const RISK_FACTORS = [
  { name: "Weather Risk", level: "Medium", description: "Drought, flood, extreme temperatures" },
  { name: "Market Risk", level: "High", description: "Price volatility, demand fluctuations" },
  { name: "Operational Risk", level: "Low", description: "Equipment failure, labor issues" },
  { name: "Regulatory Risk", level: "Low", description: "Policy changes, trade restrictions" },
] as const

export function calculateLandTokens(estimatedValue: number): number {
  return Math.floor(estimatedValue / 1000) // 1 token = $1000
}

export function calculateMaxLoanAmount(pledgeAmount: number, ltv = 0.75): number {
  return pledgeAmount * ltv
}

export function calculateCollateralRatio(loanAmount: number, collateralValue: number): number {
  return (collateralValue / loanAmount) * 100
}

export function calculateCropTokenValue(totalTokens: number, tokenPrice: number): number {
  return totalTokens * tokenPrice
}

export function generateTokenSymbol(cropType: string, harvestDate: string): string {
  const crop = CROP_TYPES.find((c) => c.value === cropType)
  const date = new Date(harvestDate)
  const monthYear = date.toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" }).replace("/", "")
  return `${crop?.symbol || "CROP"}-${monthYear}`
}

export function validateLandRegistration(data: Partial<LandProperty>): string[] {
  const errors: string[] = []

  if (!data.propertyName) errors.push("Property name is required")
  if (!data.location) errors.push("Location is required")
  if (!data.totalArea || data.totalArea <= 0) errors.push("Valid total area is required")
  if (!data.landType) errors.push("Land type is required")
  if (!data.titleDeedNumber) errors.push("Title deed number is required")
  if (!data.registrationNumber) errors.push("Registration number is required")
  if (!data.estimatedValue || data.estimatedValue <= 0) errors.push("Valid estimated value is required")

  return errors
}

export function validateCropTokenization(data: Partial<CropToken>): string[] {
  const errors: string[] = []

  if (!data.cropType) errors.push("Crop type is required")
  if (!data.plantingArea || data.plantingArea <= 0) errors.push("Valid planting area is required")
  if (!data.expectedYield || data.expectedYield <= 0) errors.push("Valid expected yield is required")
  if (!data.plantingDate) errors.push("Planting date is required")
  if (!data.harvestDate) errors.push("Harvest date is required")
  if (!data.tokenPrice || data.tokenPrice <= 0) errors.push("Valid token price is required")
  if (!data.totalTokens || data.totalTokens <= 0) errors.push("Valid total tokens is required")

  return errors
}

export async function registerLand(
  data: Omit<LandProperty, "id" | "tokenSupply" | "tokenSymbol" | "status" | "registrationDate">,
): Promise<LandProperty> {
  const response = await fetch("/api/rwa/land", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "register", data }),
  })

  const result = await response.json()
  if (!result.success) throw new Error(result.error)

  return result.data
}

export async function pledgeLand(data: {
  landId: string
  pledgeAmount: number
  loanPurpose: string
}): Promise<LandPledge> {
  const response = await fetch("/api/rwa/land", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "pledge", data }),
  })

  const result = await response.json()
  if (!result.success) throw new Error(result.error)

  return result.data
}

export async function getRegisteredLands(): Promise<LandProperty[]> {
  const response = await fetch("/api/rwa/land?action=registered-lands")
  const result = await response.json()
  if (!result.success) throw new Error(result.error)

  return result.data
}

export async function getPledgedAssets(): Promise<LandPledge[]> {
  const response = await fetch("/api/rwa/land?action=pledged-assets")
  const result = await response.json()
  if (!result.success) throw new Error(result.error)

  return result.data
}
