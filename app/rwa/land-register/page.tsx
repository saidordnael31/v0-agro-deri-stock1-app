"use client"

import { RoleGate } from "@/components/RoleGate"
import { LandRegisterForm } from "@/components/rwa/land-register-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield, FileText } from "lucide-react"

export default function LandRegisterPage() {
  return (
    <RoleGate allowedRoles={["farmer", "trader"]} requiredTier="pro">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="h-8 w-8 text-[#00FFD1]" />
          <div>
            <h1 className="text-3xl font-bold">Land Registration</h1>
            <p className="text-muted-foreground">Tokenize your agricultural land for DeFi collateral</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LandRegisterForm />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#00FFD1]" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Use land as collateral for loans and stablecoin minting</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Fractional ownership through tokenization</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Transparent ownership verification on blockchain</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2" />
                  <p>Access to global DeFi liquidity markets</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#00FFD1]" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Land title deed</p>
                <p>• Property survey report</p>
                <p>• Soil quality assessment</p>
                <p>• Environmental compliance certificate</p>
                <p>• Government registration documents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleGate>
  )
}
