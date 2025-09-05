"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Shield } from "lucide-react"

const tradeFinanceProducts = [
  {
    id: "letter-of-credit",
    name: "Letter of Credit",
    description: "Traditional LC with blockchain verification",
    minAmount: 100000,
    maxAmount: 10000000,
    fee: 0.75,
    processingTime: "3-5 days",
  },
  {
    id: "trade-credit",
    name: "Trade Credit Line",
    description: "Revolving credit for agricultural trades",
    minAmount: 50000,
    maxAmount: 5000000,
    fee: 1.25,
    processingTime: "1-2 days",
  },
  {
    id: "invoice-finance",
    name: "Invoice Financing",
    description: "Advance against agricultural invoices",
    minAmount: 25000,
    maxAmount: 2000000,
    fee: 2.5,
    processingTime: "24 hours",
  },
]

const activeFinancing = [
  {
    id: "TF-2024-001",
    type: "Letter of Credit",
    counterparty: "Brazilian Soy Exports",
    amount: 2500000,
    commodity: "Soybeans",
    status: "active",
    utilization: 75,
    maturity: "2024-06-15",
  },
  {
    id: "TF-2024-002",
    type: "Trade Credit Line",
    counterparty: "Midwest Grain Co.",
    amount: 1800000,
    commodity: "Corn",
    status: "pending",
    utilization: 45,
    maturity: "2024-08-20",
  },
]

export function TradeFinance() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [application, setApplication] = useState({
    counterparty: "",
    amount: "",
    commodity: "",
    terms: "",
  })

  const currentProduct = tradeFinanceProducts.find((p) => p.id === selectedProduct)

  const calculateFees = () => {
    if (!application.amount || !currentProduct) return 0
    return Number.parseFloat(application.amount) * (currentProduct.fee / 100)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="apply">Apply</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>

        <TabsContent value="apply" className="space-y-4 mt-4">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Finance Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select financing product" />
              </SelectTrigger>
              <SelectContent>
                {tradeFinanceProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.description}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Details */}
          {currentProduct && (
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[#00FFD1]" />
                    <span className="font-medium">{currentProduct.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount Range</p>
                      <p className="font-medium">
                        ${(currentProduct.minAmount / 1000).toLocaleString()}K - $
                        {(currentProduct.maxAmount / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fee Rate</p>
                      <p className="font-medium">{currentProduct.fee}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Processing Time</p>
                      <p className="font-medium">{currentProduct.processingTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <Badge variant="outline">Trade Finance</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Counterparty</Label>
              <Input
                placeholder="Trading partner name"
                value={application.counterparty}
                onChange={(e) => setApplication((prev) => ({ ...prev, counterparty: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Amount (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={application.amount}
                  onChange={(e) => setApplication((prev) => ({ ...prev, amount: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Commodity</Label>
                <Select
                  value={application.commodity}
                  onValueChange={(value) => setApplication((prev) => ({ ...prev, commodity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="sugar">Sugar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fee Calculation */}
            {application.amount && currentProduct && (
              <Card className="p-3 bg-muted/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Financing Amount</span>
                    <span>${Number.parseFloat(application.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee ({currentProduct.fee}%)</span>
                    <span>${calculateFees().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Cost</span>
                    <span>${(Number.parseFloat(application.amount) + calculateFees()).toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            )}

            <Button
              className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
              disabled={!selectedProduct || !application.counterparty || !application.amount || !application.commodity}
            >
              Submit Application
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-4">
          {/* Active Financing */}
          <div className="space-y-3">
            {activeFinancing.map((finance) => (
              <Card key={finance.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-[#00FFD1]" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{finance.id}</p>
                          <p className="text-xs text-muted-foreground">{finance.type}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          finance.status === "active"
                            ? "text-green-500 bg-green-500/10 border-green-500/20"
                            : "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                        }
                      >
                        {finance.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Counterparty</p>
                        <p className="font-medium">{finance.counterparty}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">${(finance.amount / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Commodity</p>
                        <p className="font-medium">{finance.commodity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity</p>
                        <p className="font-medium">{finance.maturity}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Utilization</span>
                        <span>{finance.utilization}%</span>
                      </div>
                      <Progress value={finance.utilization} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
