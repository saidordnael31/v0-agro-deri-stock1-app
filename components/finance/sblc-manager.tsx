"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Shield } from "lucide-react"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const commodityTypes = [
  { value: "soybeans", label: "Soybeans", code: "SOJA" },
  { value: "corn", label: "Corn", code: "MILHO" },
  { value: "coffee", label: "Coffee", code: "CAFE" },
  { value: "sugar", label: "Sugar", code: "ACUCAR" },
]

const bankingPartners = [
  { value: "hsbc", label: "HSBC Trade Finance" },
  { value: "citi", label: "Citibank Global" },
  { value: "jp-morgan", label: "JP Morgan Chase" },
  { value: "santander", label: "Banco Santander" },
]

export function SblcManager() {
  const [formData, setFormData] = useState({
    beneficiary: "",
    amount: "",
    commodity: "",
    bank: "",
    terms: "",
    expiryDate: undefined as Date | undefined,
  })

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTokens = () => {
    if (!formData.amount) return 0
    // 1 SBLC token = $1000 USD equivalent
    return Number.parseFloat(formData.amount) / 1000
  }

  const calculateFees = () => {
    if (!formData.amount) return 0
    // 0.5% processing fee
    return Number.parseFloat(formData.amount) * 0.005
  }

  const isStep1Valid = formData.beneficiary && formData.amount && formData.commodity && formData.bank
  const isStep2Valid = formData.terms && formData.terms.length >= 10

  const executeSblcTokenization = async () => {
    if (!isStep2Valid) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "SBLC Tokenized Successfully",
        description: `${calculateTokens().toLocaleString()} SBLC tokens have been minted for ${formData.beneficiary}`,
      })

      // Reset form
      setFormData({
        beneficiary: "",
        amount: "",
        commodity: "",
        bank: "",
        terms: "",
        expiryDate: undefined,
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

  return (
    <div className="space-y-4">
      {step === 1 && (
        <>
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Beneficiary</Label>
              <Input
                placeholder="Company or individual name"
                value={formData.beneficiary}
                onChange={(e) => handleInputChange("beneficiary", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">SBLC Amount (USD)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Commodity Type</Label>
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
              <Label className="text-sm font-medium">Banking Partner</Label>
              <Select value={formData.bank} onValueChange={(value) => handleInputChange("bank", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {bankingPartners.map((bank) => (
                    <SelectItem key={bank.value} value={bank.value}>
                      {bank.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Expiry Date</Label>
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

            <Button className="w-full" onClick={() => setStep(2)} disabled={!isStep1Valid}>
              Continue to Terms
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Terms & Conditions</Label>
              <Textarea
                placeholder="Enter specific terms, conditions, and requirements..."
                value={formData.terms}
                onChange={(e) => handleInputChange("terms", e.target.value)}
                rows={4}
              />
            </div>

            {/* SBLC Summary */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  SBLC Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Beneficiary</p>
                    <p className="font-medium">{formData.beneficiary}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">${Number.parseFloat(formData.amount || "0").toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Commodity</p>
                    <p className="font-medium">{commodityTypes.find((c) => c.value === formData.commodity)?.label}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bank</p>
                    <p className="font-medium">{bankingPartners.find((b) => b.value === formData.bank)?.label}</p>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SBLC Tokens</span>
                    <span>{calculateTokens().toLocaleString()} tokens</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span>${calculateFees().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Cost</span>
                    <span>${(Number.parseFloat(formData.amount || "0") + calculateFees()).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                className="flex-1 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                disabled={!isStep2Valid || isLoading}
                onClick={executeSblcTokenization}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tokenizing...
                  </>
                ) : (
                  "Tokenize SBLC"
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
