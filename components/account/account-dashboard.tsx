"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Wallet, Shield, Bell, Key } from "lucide-react"

export function AccountDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
        <Badge variant="secondary" className="bg-green-600 text-white">
          Verified
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground">João Silva Santos</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">joao.santos@agroderi.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CPF/CNPJ</label>
                  <p className="text-foreground">123.456.789-00</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">+55 11 99999-9999</p>
                </div>
              </div>
              <Button className="bg-[#00FFD1] text-black hover:bg-[#00E6BC]">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">API Keys</p>
                  <p className="text-sm text-muted-foreground">Manage your API access</p>
                </div>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Manage Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Connected Wallet</p>
                  <p className="text-sm text-muted-foreground font-mono">0x742d...4e2f</p>
                </div>
                <Badge variant="secondary" className="bg-[#00FFD1] text-black">
                  Polygon
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#00FFD1]">$12,450</p>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">$8,320</p>
                  <p className="text-sm text-muted-foreground">Available</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">$4,130</p>
                  <p className="text-sm text-muted-foreground">Locked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Trade Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified about your trades</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Price Alerts</p>
                    <p className="text-sm text-muted-foreground">Market price movements</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Account security events</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    Enabled
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
