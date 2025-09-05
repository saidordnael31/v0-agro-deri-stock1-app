"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Coins, FileText, Truck, Shield, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const menuItems = [
  { icon: TrendingUp, label: "Trading", id: "trading" },
  { icon: Coins, label: "DeFi", id: "defi" },
  { icon: FileText, label: "SBLC", id: "sblc" },
  { icon: Truck, label: "Logistics", id: "logistics" },
  { icon: Shield, label: "Risk", id: "risk" },
  { icon: Settings, label: "Settings", id: "settings" },
]

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Card
      className={`${collapsed ? "w-16" : "w-64"} h-full rounded-none border-r border-border bg-card transition-all duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00FFD1] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">AD</span>
                </div>
                <span className="font-semibold text-foreground">AgroDeri</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1 h-8 w-8">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 ${collapsed ? "px-2" : "px-3"} ${
                  activeSection === item.id ? "bg-[#00B8A0] text-white hover:bg-[#00A090]" : ""
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>

        {/* Status */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <Badge variant="secondary" className="bg-[#00FFD1] text-black border-[#00FFD1]">
                  Polygon
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary" className="bg-green-600 text-white border-green-600">
                  Connected
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
