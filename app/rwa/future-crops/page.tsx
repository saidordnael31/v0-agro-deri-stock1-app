"use client"

import { RoleGate } from "@/components/RoleGate"
import { CropTokenizationWizard } from "@/components/rwa/crop-tokenization-wizard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, TrendingUp, Calendar } from "lucide-react"

export default function FutureCropsPage() {
  return (
    <RoleGate allowedRoles={["farmer"]} requiredTier="retail">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Sprout className="h-8 w-8 text-[#00FFD1]" />
          <div>
            <h1 className="text-3xl font-bold">Future Crops Tokenization</h1>
            <p className="text-muted-foreground">Tokenize your future harvest for pre-season financing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CropTokenizationWizard />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#00FFD1]" />
                  Market Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Access capital before harvest season</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Lock in favorable commodity prices</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Reduce weather and market risks</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Global buyer access through tokenization</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#00FFD1]" />
                  Seasonal Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Planting Season:</span>
                    <span>Sep - Nov</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Growing Period:</span>
                    <span>Dec - Feb</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harvest Season:</span>
                    <span>Mar - May</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Maturity:</span>
                    <span>At Harvest</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Crop Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Soybeans (SOJA)</span>
                  <span className="text-green-500">$14.56/bu</span>
                </div>
                <div className="flex justify-between">
                  <span>Corn (MILHO)</span>
                  <span className="text-red-500">$6.87/bu</span>
                </div>
                <div className="flex justify-between">
                  <span>Coffee (CAFE)</span>
                  <span className="text-green-500">$2.13/lb</span>
                </div>
                <div className="flex justify-between">
                  <span>Sugar (ACUCAR)</span>
                  <span className="text-red-500">$0.46/lb</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleGate>
  )
}
