"use client"

import { useState } from "react"
import { RoleGate } from "@/components/RoleGate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Landmark, TrendingUp, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const registeredLands = [
  {
    id: "LAND-001",
    name: "Fazenda São Paulo",
    location: "São Paulo, Brazil",
    area: "500 hectares",
    value: 2500000,
    tokenized: true,
    availableCollateral: 1875000, // 75% LTV
    currentPledged: 500000,
  },
  {
    id: "LAND-002",
    name: "Estância Rio Grande",
    location: "Rio Grande do Sul, Brazil",
    area: "750 hectares",
    value: 3750000,
    tokenized: true,
    availableCollateral: 2812500,
    currentPledged: 0,
  },
]

export default function LandPledgePage() {
  const [selectedLand, setSelectedLand] = useState("")
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [loanPurpose, setLoanPurpose] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const selectedLandData = registeredLands.find((land) => land.id === selectedLand)

  const handlePledge = async () => {
    if (!selectedLand || !pledgeAmount || !loanPurpose) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      toast({
        title: "Land Pledged Successfully",
        description: `Pledged $${Number.parseFloat(pledgeAmount).toLocaleString()} worth of ${selectedLandData?.name}`,
      })

      setPledgeAmount("")
      setLoanPurpose("")
    } catch (error) {
      toast({
        title: "Pledge Failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RoleGate allowedRoles={["farmer", "trader"]} requiredTier="pro">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Landmark className="h-8 w-8 text-[#00FFD1]" />
          <div>
            <h1 className="text-3xl font-bold">Land Pledge</h1>
            <p className="text-muted-foreground">Use your tokenized land as collateral for loans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pledge Land Collateral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Land Property</Label>
                  <Select value={selectedLand} onValueChange={setSelectedLand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a registered property" />
                    </SelectTrigger>
                    <SelectContent>
                      {registeredLands.map((land) => (
                        <SelectItem key={land.id} value={land.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{land.name}</span>
                            <Badge variant="outline" className="ml-2">
                              ${(land.value / 1000000).toFixed(1)}M
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedLandData && (
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{selectedLandData.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Area</p>
                          <p className="font-medium">{selectedLandData.area}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Value</p>
                          <p className="font-medium">${selectedLandData.value.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Available Collateral</p>
                          <p className="font-medium text-[#00FFD1]">
                            ${(selectedLandData.availableCollateral - selectedLandData.currentPledged).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Collateral Utilization</span>
                          <span>
                            {((selectedLandData.currentPledged / selectedLandData.availableCollateral) * 100).toFixed(
                              1,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(selectedLandData.currentPledged / selectedLandData.availableCollateral) * 100}
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pledge Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                    />
                    {selectedLandData && pledgeAmount && (
                      <p className="text-xs text-muted-foreground">
                        Max available: $
                        {(selectedLandData.availableCollateral - selectedLandData.currentPledged).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Loan Purpose</Label>
                    <Select value={loanPurpose} onValueChange={setLoanPurpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crop-financing">Crop Financing</SelectItem>
                        <SelectItem value="equipment-purchase">Equipment Purchase</SelectItem>
                        <SelectItem value="land-expansion">Land Expansion</SelectItem>
                        <SelectItem value="working-capital">Working Capital</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {pledgeAmount && selectedLandData && (
                  <Card className="bg-blue-500/10 border-blue-500/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Loan Terms Preview
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Collateral Value:</span>
                          <span>${Number.parseFloat(pledgeAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Loan (75% LTV):</span>
                          <span className="text-[#00FFD1]">
                            ${(Number.parseFloat(pledgeAmount) * 0.75).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Interest Rate:</span>
                          <span>8.5% APR</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Liquidation Threshold:</span>
                          <span>85% LTV</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={handlePledge}
                  disabled={!selectedLand || !pledgeAmount || !loanPurpose || isLoading}
                  className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Pledge...
                    </>
                  ) : (
                    "Pledge Land Collateral"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Pledged Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {registeredLands
                  .filter((land) => land.currentPledged > 0)
                  .map((land) => (
                    <div key={land.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{land.name}</p>
                          <p className="text-xs text-muted-foreground">{land.location}</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pledged:</span>
                          <span>${land.currentPledged.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Loan Outstanding:</span>
                          <span>${(land.currentPledged * 0.75).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {registeredLands.filter((land) => land.currentPledged > 0).length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">No active pledges</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Risk Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Land values may fluctuate based on market conditions</p>
                <p>• Failure to repay loans may result in liquidation</p>
                <p>• Maintain adequate collateral ratios to avoid margin calls</p>
                <p>• Consider insurance for additional protection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleGate>
  )
}
