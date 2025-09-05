"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Sprout, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

const cropTypes = [
  { value: "soybeans", label: "Soybeans", symbol: "SOJA", avgPrice: 14.56, unit: "bushel" },
  { value: "corn", label: "Corn", symbol: "MILHO", avgPrice: 6.87, unit: "bushel" },
  { value: "coffee", label: "Coffee", symbol: "CAFE", avgPrice: 2.13, unit: "pound" },
  { value: "sugar", label: "Sugar Cane", symbol: "ACUCAR", avgPrice: 0.46, unit: "pound" },
  { value: "wheat", label: "Wheat", symbol: "TRIGO", avgPrice: 8.45, unit: "bushel" },
]

const riskFactors = [
  { name: "Weather Risk", level: "Medium", description: "Drought, flood, extreme temperatures" },
  { name: "Market Risk", level: "High", description: "Price volatility, demand fluctuations" },
  { name: "Operational Risk", level: "Low", description: "Equipment failure, labor issues" },
  { name: "Regulatory Risk", level: "Low", description: "Policy changes, trade restrictions" },
]

export function CropTokenizationWizard() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Crop Details
    cropType: "",
    plantingArea: "",
    expectedYield: "",
    qualityGrade: "",

    // Timeline
    plantingDate: undefined as Date | undefined,
    harvestDate: undefined as Date | undefined,

    // Financial Terms
    tokenPrice: "",
    totalTokens: "",
    minimumPurchase: "",

    // Risk Management
    insuranceCoverage: "",
    weatherDerivatives: false,

    // Delivery Terms
    deliveryLocation: "",
    storageOptions: "",
    qualitySpecs: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-calculate tokens when area and yield change
      if (field === "plantingArea" || field === "expectedYield" || field === "cropType") {
        const crop = cropTypes.find((c) => c.value === updated.cropType)
        if (updated.plantingArea && updated.expectedYield && crop) {
          const totalProduction = Number.parseFloat(updated.plantingArea) * Number.parseFloat(updated.expectedYield)
          updated.totalTokens = Math.floor(totalProduction).toString()
          updated.tokenPrice = crop.avgPrice.toString()
        }
      }

      return updated
    })
  }

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.cropType && formData.plantingArea && formData.expectedYield && formData.qualityGrade
      case 2:
        return formData.plantingDate && formData.harvestDate
      case 3:
        return formData.tokenPrice && formData.totalTokens && formData.minimumPurchase
      case 4:
        return formData.deliveryLocation && formData.storageOptions
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const submitTokenization = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Crop Tokenization Submitted",
        description: `${formData.totalTokens} ${cropTypes.find((c) => c.value === formData.cropType)?.symbol} tokens created`,
      })

      // Reset form
      setFormData({
        cropType: "",
        plantingArea: "",
        expectedYield: "",
        qualityGrade: "",
        plantingDate: undefined,
        harvestDate: undefined,
        tokenPrice: "",
        totalTokens: "",
        minimumPurchase: "",
        insuranceCoverage: "",
        weatherDerivatives: false,
        deliveryLocation: "",
        storageOptions: "",
        qualitySpecs: "",
      })
      setStep(1)
    } catch (error) {
      toast({
        title: "Tokenization Failed",
        description: "Please review your information and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCrop = cropTypes.find((c) => c.value === formData.cropType)
  const totalValue =
    formData.totalTokens && formData.tokenPrice
      ? Number.parseFloat(formData.totalTokens) * Number.parseFloat(formData.tokenPrice)
      : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-[#00FFD1]" />
            Crop Tokenization - Step {step} of 5
          </CardTitle>
          <Badge variant="outline">{Math.round((step / 5) * 100)}% Complete</Badge>
        </div>
        <Progress value={(step / 5) * 100} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Crop Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crop Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Crop Type</Label>
                <Select value={formData.cropType} onValueChange={(value) => handleInputChange("cropType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{crop.label}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            ${crop.avgPrice}/{crop.unit}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Planting Area (hectares)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.plantingArea}
                  onChange={(e) => handleInputChange("plantingArea", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Expected Yield ({selectedCrop?.unit}s/hectare)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.expectedYield}
                  onChange={(e) => handleInputChange("expectedYield", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Quality Grade</Label>
                <Select
                  value={formData.qualityGrade}
                  onValueChange={(value) => handleInputChange("qualityGrade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">Premium Grade</SelectItem>
                    <SelectItem value="standard">Standard Grade</SelectItem>
                    <SelectItem value="commercial">Commercial Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.plantingArea && formData.expectedYield && selectedCrop && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Production Estimate</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Production:</span>
                      <span>
                        {(
                          Number.parseFloat(formData.plantingArea) * Number.parseFloat(formData.expectedYield)
                        ).toLocaleString()}{" "}
                        {selectedCrop.unit}s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Value:</span>
                      <span className="text-[#00FFD1]">
                        $
                        {(
                          Number.parseFloat(formData.plantingArea) *
                          Number.parseFloat(formData.expectedYield) *
                          selectedCrop.avgPrice
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Timeline */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crop Timeline</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Planting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.plantingDate ? format(formData.plantingDate, "PPP") : "Select planting date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.plantingDate}
                      onSelect={(date) => handleInputChange("plantingDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Expected Harvest Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.harvestDate ? format(formData.harvestDate, "PPP") : "Select harvest date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.harvestDate}
                      onSelect={(date) => handleInputChange("harvestDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {formData.plantingDate && formData.harvestDate && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Growing Season</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growing Period:</span>
                      <span>
                        {Math.ceil(
                          (formData.harvestDate.getTime() - formData.plantingDate.getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token Maturity:</span>
                      <span>{format(formData.harvestDate, "MMM yyyy")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Financial Terms */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Token Economics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Token Price (USD per {selectedCrop?.unit})</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.tokenPrice}
                  onChange={(e) => handleInputChange("tokenPrice", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Total Tokens</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.totalTokens}
                  onChange={(e) => handleInputChange("totalTokens", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Minimum Purchase</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.minimumPurchase}
                  onChange={(e) => handleInputChange("minimumPurchase", e.target.value)}
                />
              </div>
            </div>

            {totalValue > 0 && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Financial Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Token Value:</span>
                      <span className="text-[#00FFD1]">${totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Fee (2%):</span>
                      <span>${(totalValue * 0.02).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Proceeds:</span>
                      <span>${(totalValue * 0.98).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token Symbol:</span>
                      <span>
                        {selectedCrop?.symbol}-{format(formData.harvestDate || new Date(), "MMyy")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 4: Risk Management & Delivery */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Risk Management & Delivery</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Insurance Coverage (%)</Label>
                <Select
                  value={formData.insuranceCoverage}
                  onValueChange={(value) => handleInputChange("insuranceCoverage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50% Coverage</SelectItem>
                    <SelectItem value="75">75% Coverage</SelectItem>
                    <SelectItem value="90">90% Coverage</SelectItem>
                    <SelectItem value="100">100% Coverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Delivery Location</Label>
                <Input
                  placeholder="Farm gate, warehouse, or port"
                  value={formData.deliveryLocation}
                  onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Storage Options</Label>
                <Select
                  value={formData.storageOptions}
                  onValueChange={(value) => handleInputChange("storageOptions", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farm">On-Farm Storage</SelectItem>
                    <SelectItem value="warehouse">Commercial Warehouse</SelectItem>
                    <SelectItem value="cooperative">Cooperative Storage</SelectItem>
                    <SelectItem value="port">Port Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="weather-derivatives"
                  checked={formData.weatherDerivatives}
                  onChange={(e) => handleInputChange("weatherDerivatives", e.target.checked)}
                />
                <Label htmlFor="weather-derivatives" className="text-sm">
                  Include weather derivatives protection
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Quality Specifications</Label>
              <Textarea
                placeholder="Detailed quality specifications and grading standards..."
                value={formData.qualitySpecs}
                onChange={(e) => handleInputChange("qualitySpecs", e.target.value)}
                rows={3}
              />
            </div>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Risk Assessment
                </h4>
                <div className="space-y-2">
                  {riskFactors.map((risk) => (
                    <div key={risk.name} className="flex items-center justify-between text-sm">
                      <span>{risk.name}</span>
                      <Badge
                        variant={
                          risk.level === "High" ? "destructive" : risk.level === "Medium" ? "default" : "secondary"
                        }
                      >
                        {risk.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review & Submit</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-3">Crop Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crop:</span>
                    <span>{selectedCrop?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span>{formData.plantingArea} hectares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Yield:</span>
                    <span>
                      {formData.expectedYield} {selectedCrop?.unit}s/ha
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality:</span>
                    <span>{formData.qualityGrade}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3">Token Economics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tokens:</span>
                    <span>{formData.totalTokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Price:</span>
                    <span>${formData.tokenPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="text-[#00FFD1]">${totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maturity:</span>
                    <span>{formData.harvestDate ? format(formData.harvestDate, "MMM yyyy") : "TBD"}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                <div className="text-sm space-y-1">
                  <p>• Tokens represent future delivery of physical commodities</p>
                  <p>• Settlement occurs at harvest based on actual production</p>
                  <p>• Insurance coverage protects against production shortfalls</p>
                  <p>• Quality specifications must be met for full settlement</p>
                  <p>• Platform fee of 2% applies to total token value</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>

          {step < 5 ? (
            <Button
              onClick={nextStep}
              disabled={!validateStep(step)}
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={submitTokenization}
              disabled={!validateStep(step) || isLoading}
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Tokens...
                </>
              ) : (
                "Create Crop Tokens"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
