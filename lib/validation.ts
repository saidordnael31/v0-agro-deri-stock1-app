import { z } from "zod"

export const mintStablecoinSchema = z.object({
  selectedCoin: z.enum(["USSA", "BRSA", "GLDA"], {
    required_error: "Please select a stablecoin",
  }),
  mintAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  collateralAmount: z
    .string()
    .min(1, "Collateral amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Collateral amount must be a positive number",
    }),
})

export const spotTradingSchema = z.object({
  selectedPair: z.string().min(1, "Trading pair is required"),
  orderType: z.enum(["market", "limit", "stop"], {
    required_error: "Order type is required",
  }),
  side: z.enum(["buy", "sell"], {
    required_error: "Order side is required",
  }),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  price: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
      message: "Price must be a positive number",
    }),
})

export const warehouseReceiptSchema = z.object({
  commodity: z.string().min(1, "Commodity selection is required"),
  volume: z
    .string()
    .min(1, "Volume is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Volume must be a positive number",
    }),
  unit: z.string().min(1, "Unit selection is required"),
  warehouse: z.string().min(1, "Warehouse selection is required"),
  grade: z.string().min(1, "Grade selection is required"),
  expiry: z.string().min(1, "Expiry date is required"),
  observations: z.string().optional(),
})

export const landRegistrationSchema = z.object({
  propertyName: z.string().min(2, "Property name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  coordinates: z.string().optional(),
  totalArea: z
    .string()
    .min(1, "Total area is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Total area must be a positive number",
    }),
  landType: z.string().min(1, "Land type selection is required"),
  titleDeedNumber: z.string().min(1, "Title deed number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  ownershipType: z.string().min(1, "Ownership type is required"),
  soilType: z.string().min(1, "Soil type is required"),
  irrigationSystem: z.string().optional(),
  currentCrops: z.string().min(1, "Current crops information is required"),
  annualYield: z.string().optional(),
  estimatedValue: z
    .string()
    .min(1, "Estimated value is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Estimated value must be a positive number",
    }),
  lastAppraisal: z.string().optional(),
})

export type MintStablecoinForm = z.infer<typeof mintStablecoinSchema>
export type SpotTradingForm = z.infer<typeof spotTradingSchema>
export type WarehouseReceiptForm = z.infer<typeof warehouseReceiptSchema>
export type LandRegistrationForm = z.infer<typeof landRegistrationSchema>
