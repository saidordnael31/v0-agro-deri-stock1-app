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
import { CalendarIcon, Shield, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

const wizardSteps = [
  { id: 1, title: "Basic Information", description: "Applicant and beneficiary details" },
  { id: 2, title: "Financial Terms", description: "Amount, currency, and commodity" },
  { id: 3, title: "Documentation", description: "Required documents and compliance" },
  { id: 4, title: "Review & Submit", description: "Final review and tokenization" },
]

const commodityTypes = [
  { value: "soybeans", label: "Soybeans", code: "SOJA", minAmount: 50000 },
  { value: "corn", label: "Corn", code: "MILHO", minAmount: 40000 },
  { value: "coffee", label: "Coffee", code: "CAFE", minAmount: 75000 },
  { value: "sugar", label: "Sugar", code: "ACUCAR", minAmount: 60000 },
  { value: "wheat", label: "Wheat", code: "TRIGO", minAmount: 45000 },
]

const bankingPartners = [
  { value: "hsbc", label: "HSBC Trade Finance", fee: 0.5, rating: "AAA" },
  { value: "citi", label: "Citibank Global", fee: 0.45, rating: "AA+" },
  { value: "jp-morgan", label: "JP Morgan Chase", fee: 0.55, rating: "AAA" },
  { value: "santander", label: "Banco Santander", fee: 0.6, rating: "AA" },
]

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
]

export function SblcWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    applicantName: "",
    applicantCountry: "",
    beneficiaryName: "",
    beneficiaryCountry: "",

    // Step 2: Financial Terms
    amount: "",
    currency: "USD",
    commodity: "",
    bank: "",
    expiryDate: undefined as Date | undefined,

    // Step 3: Documentation
    terms: "",
    documents: [] as string[],
    compliance: false,

    // Calculated fields
    processingFee: 0,
    tokenAmount: 0,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Recalculate fees and tokens when amount or bank changes
      if (field === "amount" || field === "bank") {
        const amount = Number.parseFloat(updated.amount || "0")
        const bank = bankingPartners.find((b) => b.value === updated.bank)
        updated.processingFee = (amount * (bank?.fee || 0.5)) / 100
        updated.tokenAmount = amount / 1000 // 1 token = $1000
      }

      return updated
    })
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.applicantName && formData.beneficiaryName && formData.applicantCountry && formData.beneficiaryCountry
        )
      case 2:
        const commodity = commodityTypes.find((c) => c.value === formData.commodity)
        const minAmount = commodity?.minAmount || 50000
        return (
          formData.amount &&
          Number.parseFloat(formData.amount) >= minAmount &&
          formData.currency &&
          formData.commodity &&
          formData.bank &&
          formData.expiryDate
        )
      case 3:
        return formData.terms && formData.terms.length >= 50 && formData.compliance
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const submitApplication = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "SBLC Application Submitted",
        description: `Application for ${formData.tokenAmount.toLocaleString()} SBLC tokens submitted successfully`,
      })

      // Reset form
      setFormData({
        applicantName: "",
        applicantCountry: "",
        beneficiaryName: "",
        beneficiaryCountry: "",
        amount: "",
        currency: "USD",
        commodity: "",
        bank: "",
        expiryDate: undefined,
        terms: "",
        documents: [],
        compliance: false,
        processingFee: 0,
        tokenAmount: 0,
      })
      setCurrentStep(1)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please review your information and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCommodity = commodityTypes.find((c) => c.value === formData.commodity)
  const selectedBank = bankingPartners.find((b) => b.value === formData.bank)
  const selectedCurrency = currencies.find((c) => c.code === formData.currency)

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">SBLC Tokenization Wizard</h2>
          <Badge variant="outline" className="text-[#00FFD1] border-[#00FFD1]">
            Step {currentStep} of 4
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={(currentStep / 4) * 100} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            {wizardSteps.map((step) => (
              <span key={step.id} className={currentStep >= step.id ? "text-[#00FFD1]" : ""}>
                {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card className="min-h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#00FFD1]" />
            {wizardSteps[currentStep - 1].title}
          </CardTitle>
          <p className="text-muted-foreground">{wizardSteps[currentStep - 1].description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Applicant Information</h3>
                <div className="space-y-2">
                  <Label>Company/Individual Name</Label>
                  <Input
                    placeholder="Enter applicant name"
                    value={formData.applicantName}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select
                    value={formData.applicantCountry}
                    onValueChange={(value) => handleInputChange("applicantCountry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BR">Brazil</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="UY">Uruguay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Beneficiary Information</h3>
                <div className="space-y-2">
                  <Label>Company/Individual Name</Label>
                  <Input
                    placeholder="Enter beneficiary name"
                    value={formData.beneficiaryName}
                    onChange={(e) => handleInputChange("beneficiaryName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select
                    value={formData.beneficiaryCountry}
                    onValueChange={(value) => handleInputChange("beneficiaryCountry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CN">China</SelectItem>
                      <SelectItem value="EU">European Union</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Terms */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>SBLC Amount</Label>
                  <div className="flex gap-2">
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  {selectedCommodity && (
                    <p className="text-xs text-muted-foreground">
                      Minimum: {selectedCurrency?.symbol}
                      {selectedCommodity.minAmount.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Commodity Type</Label>
                  <Select value={formData.commodity} onValueChange={(value) => handleInputChange("commodity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      {commodityTypes.map((commodity) => (
                        <SelectItem key={commodity.value} value={commodity.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{commodity.label}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {commodity.code}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Banking Partner</Label>
                  <Select value={formData.bank} onValueChange={(value) => handleInputChange("bank", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankingPartners.map((bank) => (
                        <SelectItem key={bank.value} value={bank.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{bank.label}</span>
                            <div className="flex gap-1">
                              <Badge variant="outline" className="text-xs">
                                {bank.rating}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {bank.fee}%
                              </Badge>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.expiryDate ? format(formData.expiryDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.expiryDate}
                        onSelect={(date) => handleInputChange("expiryDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Financial Summary */}
              {formData.amount && formData.bank && (
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Financial Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SBLC Amount:</span>
                        <span>
                          {selectedCurrency?.symbol}
                          {Number.parseFloat(formData.amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee:</span>
                        <span>
                          {selectedCurrency?.symbol}
                          {formData.processingFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SBLC Tokens:</span>
                        <span className="text-[#00FFD1]">{formData.tokenAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Cost:</span>
                        <span>
                          {selectedCurrency?.symbol}
                          {(Number.parseFloat(formData.amount) + formData.processingFee).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Documentation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Terms & Conditions</Label>
                <Textarea
                  placeholder="Enter specific terms, conditions, and requirements for this SBLC..."
                  value={formData.terms}
                  onChange={(e) => handleInputChange("terms", e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">{formData.terms.length}/50 characters minimum</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Required Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Commercial Invoice",
                    "Bill of Lading",
                    "Certificate of Origin",
                    "Phytosanitary Certificate",
                    "Insurance Certificate",
                    "Quality Certificate",
                  ].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 p-3 border rounded-lg">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc}</span>
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-muted/30 rounded-lg">
                <input
                  type="checkbox"
                  id="compliance"
                  checked={formData.compliance}
                  onChange={(e) => handleInputChange("compliance", e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="compliance" className="text-sm">
                  I confirm that all information provided is accurate and that I have read and agree to the terms and
                  conditions of the SBLC tokenization process. I understand the risks involved and acknowledge that this
                  is a legally binding agreement.
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Application Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applicant:</span>
                      <span>{formData.applicantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Beneficiary:</span>
                      <span>{formData.beneficiaryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commodity:</span>
                      <span>{selectedCommodity?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank:</span>
                      <span>{selectedBank?.label}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Financial Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>
                        {selectedCurrency?.symbol}
                        {Number.parseFloat(formData.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee:</span>
                      <span>
                        {selectedCurrency?.symbol}
                        {formData.processingFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-[#00FFD1]">
                      <span>SBLC Tokens:</span>
                      <span>{formData.tokenAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-500">Processing Timeline</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your SBLC application will be reviewed within 3-5 business days. Upon approval, tokens will be
                      minted and transferred to your wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={submitApplication}
            disabled={!validateStep(currentStep) || isLoading}
            className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
