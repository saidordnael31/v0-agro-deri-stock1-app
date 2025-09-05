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
import { MapPin, Upload, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const landTypes = [
  { value: "cropland", label: "Cropland", description: "Agricultural land for crop production" },
  { value: "pasture", label: "Pasture", description: "Grazing land for livestock" },
  { value: "mixed", label: "Mixed Use", description: "Combined crop and livestock operations" },
  { value: "orchard", label: "Orchard", description: "Fruit and nut tree cultivation" },
]

const soilTypes = [
  { value: "clay", label: "Clay", fertility: "High" },
  { value: "loam", label: "Loam", fertility: "Very High" },
  { value: "sand", label: "Sandy", fertility: "Medium" },
  { value: "silt", label: "Silt", fertility: "High" },
]

export function LandRegisterForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Basic Information
    propertyName: "",
    location: "",
    coordinates: "",
    totalArea: "",
    landType: "",

    // Legal Information
    titleDeedNumber: "",
    registrationNumber: "",
    ownershipType: "",

    // Agricultural Details
    soilType: "",
    irrigationSystem: "",
    currentCrops: "",
    annualYield: "",

    // Valuation
    estimatedValue: "",
    lastAppraisal: "",

    // Documentation
    documents: [] as string[],
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.propertyName && formData.location && formData.totalArea && formData.landType
      case 2:
        return formData.titleDeedNumber && formData.registrationNumber && formData.ownershipType
      case 3:
        return formData.soilType && formData.currentCrops
      case 4:
        return formData.estimatedValue
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

  const submitRegistration = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Land Registration Submitted",
        description: `${formData.propertyName} has been submitted for tokenization review`,
      })

      // Reset form
      setFormData({
        propertyName: "",
        location: "",
        coordinates: "",
        totalArea: "",
        landType: "",
        titleDeedNumber: "",
        registrationNumber: "",
        ownershipType: "",
        soilType: "",
        irrigationSystem: "",
        currentCrops: "",
        annualYield: "",
        estimatedValue: "",
        lastAppraisal: "",
        documents: [],
      })
      setStep(1)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please review your information and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#00FFD1]" />
            Land Registration - Step {step} of 5
          </CardTitle>
          <Badge variant="outline">{Math.round((step / 5) * 100)}% Complete</Badge>
        </div>
        <Progress value={(step / 5) * 100} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Property Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Property Name</Label>
                <Input
                  placeholder="e.g., Fazenda São Paulo"
                  value={formData.propertyName}
                  onChange={(e) => handleInputChange("propertyName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="City, State, Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>GPS Coordinates (Optional)</Label>
                <Input
                  placeholder="Latitude, Longitude"
                  value={formData.coordinates}
                  onChange={(e) => handleInputChange("coordinates", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Total Area (hectares)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.totalArea}
                  onChange={(e) => handleInputChange("totalArea", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Land Type</Label>
              <Select value={formData.landType} onValueChange={(value) => handleInputChange("landType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select land type" />
                </SelectTrigger>
                <SelectContent>
                  {landTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <p className="font-medium">{type.label}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Legal Information */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal Documentation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title Deed Number</Label>
                <Input
                  placeholder="Official title deed number"
                  value={formData.titleDeedNumber}
                  onChange={(e) => handleInputChange("titleDeedNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Government Registration Number</Label>
                <Input
                  placeholder="Official registration number"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ownership Type</Label>
              <Select
                value={formData.ownershipType}
                onValueChange={(value) => handleInputChange("ownershipType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ownership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual Ownership</SelectItem>
                  <SelectItem value="corporate">Corporate Ownership</SelectItem>
                  <SelectItem value="cooperative">Cooperative</SelectItem>
                  <SelectItem value="family">Family Trust</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Agricultural Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Agricultural Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{soil.label}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {soil.fertility}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Irrigation System</Label>
                <Select
                  value={formData.irrigationSystem}
                  onValueChange={(value) => handleInputChange("irrigationSystem", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select irrigation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Rain-fed</SelectItem>
                    <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                    <SelectItem value="drip">Drip Irrigation</SelectItem>
                    <SelectItem value="flood">Flood Irrigation</SelectItem>
                    <SelectItem value="center-pivot">Center Pivot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current/Planned Crops</Label>
              <Textarea
                placeholder="List the crops currently grown or planned for this land..."
                value={formData.currentCrops}
                onChange={(e) => handleInputChange("currentCrops", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Annual Yield (tons/hectare)</Label>
              <Input
                type="number"
                placeholder="Average annual yield"
                value={formData.annualYield}
                onChange={(e) => handleInputChange("annualYield", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 4: Valuation */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Valuation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estimated Market Value (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.estimatedValue}
                  onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Last Professional Appraisal Date</Label>
                <Input
                  type="date"
                  value={formData.lastAppraisal}
                  onChange={(e) => handleInputChange("lastAppraisal", e.target.value)}
                />
              </div>
            </div>

            {formData.estimatedValue && formData.totalArea && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Valuation Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Value:</span>
                      <span>${Number.parseFloat(formData.estimatedValue).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value per Hectare:</span>
                      <span>
                        $
                        {(
                          Number.parseFloat(formData.estimatedValue) / Number.parseFloat(formData.totalArea)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tokenizable Value (75%):</span>
                      <span className="text-[#00FFD1]">
                        ${(Number.parseFloat(formData.estimatedValue) * 0.75).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Token Supply:</span>
                      <span>{(Number.parseFloat(formData.estimatedValue) / 1000).toLocaleString()} tokens</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 5: Document Upload */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Upload</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Title Deed",
                "Property Survey",
                "Soil Analysis Report",
                "Environmental Certificate",
                "Tax Records",
                "Insurance Documents",
              ].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{doc}</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </div>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Registration Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property:</span>
                    <span>{formData.propertyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span>{formData.totalArea} hectares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Value:</span>
                    <span>${Number.parseFloat(formData.estimatedValue || "0").toLocaleString()}</span>
                  </div>
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
              onClick={submitRegistration}
              disabled={!validateStep(step) || isLoading}
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
