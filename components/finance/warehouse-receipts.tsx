"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Truck, Package, MapPin } from "lucide-react"

const warehouses = [
  { id: "WH-001", name: "Santos Port Warehouse", location: "Santos, Brazil", capacity: 50000, occupied: 35000 },
  { id: "WH-002", name: "Chicago Grain Terminal", location: "Chicago, USA", capacity: 75000, occupied: 45000 },
  { id: "WH-003", name: "Rotterdam Agri Hub", location: "Rotterdam, Netherlands", capacity: 60000, occupied: 28000 },
]

const warehouseReceipts = [
  {
    id: "WR-2024-001",
    commodity: "Soybeans",
    quantity: 5000,
    unit: "MT",
    warehouse: "Santos Port Warehouse",
    grade: "Grade A",
    status: "stored",
    tokenized: true,
    value: 7280000,
  },
  {
    id: "WR-2024-002",
    commodity: "Corn",
    quantity: 3500,
    unit: "MT",
    warehouse: "Chicago Grain Terminal",
    grade: "Grade B",
    status: "in-transit",
    tokenized: false,
    value: 2405750,
  },
  {
    id: "WR-2024-003",
    commodity: "Coffee",
    quantity: 1200,
    unit: "MT",
    warehouse: "Santos Port Warehouse",
    grade: "Premium",
    status: "stored",
    tokenized: true,
    value: 2561280,
  },
]

export function WarehouseReceipts() {
  const [selectedWarehouse, setSelectedWarehouse] = useState("")
  const [newReceipt, setNewReceipt] = useState({
    commodity: "",
    quantity: "",
    grade: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stored":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "in-transit":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "delivered":
        return "text-purple-500 bg-purple-500/10 border-purple-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  return (
    <div className="space-y-4">
      {/* Warehouse Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Select Warehouse</Label>
        <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
          <SelectTrigger>
            <SelectValue placeholder="Choose warehouse facility" />
          </SelectTrigger>
          <SelectContent>
            {warehouses.map((warehouse) => (
              <SelectItem key={warehouse.id} value={warehouse.id}>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="font-medium">{warehouse.name}</p>
                    <p className="text-xs text-muted-foreground">{warehouse.location}</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {((warehouse.occupied / warehouse.capacity) * 100).toFixed(0)}% full
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Warehouse Details */}
      {selectedWarehouse && (
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            {(() => {
              const warehouse = warehouses.find((w) => w.id === selectedWarehouse)
              if (!warehouse) return null
              const occupancyRate = (warehouse.occupied / warehouse.capacity) * 100

              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#00FFD1]" />
                    <span className="font-medium">{warehouse.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity Utilization</span>
                      <span>{occupancyRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={occupancyRate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{warehouse.occupied.toLocaleString()} MT occupied</span>
                      <span>{warehouse.capacity.toLocaleString()} MT total</span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* New Receipt Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Commodity</Label>
          <Select
            value={newReceipt.commodity}
            onValueChange={(value) => setNewReceipt((prev) => ({ ...prev, commodity: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select commodity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soybeans">Soybeans</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
              <SelectItem value="sugar">Sugar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Quantity (MT)</Label>
            <Input
              type="number"
              placeholder="0"
              value={newReceipt.quantity}
              onChange={(e) => setNewReceipt((prev) => ({ ...prev, quantity: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Grade</Label>
            <Select
              value={newReceipt.grade}
              onValueChange={(value) => setNewReceipt((prev) => ({ ...prev, grade: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="grade-a">Grade A</SelectItem>
                <SelectItem value="grade-b">Grade B</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90"
          disabled={!selectedWarehouse || !newReceipt.commodity || !newReceipt.quantity || !newReceipt.grade}
        >
          Issue Warehouse Receipt
        </Button>
      </div>

      {/* Recent Receipts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Package className="h-4 w-4" />
            Recent Warehouse Receipts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {warehouseReceipts.map((receipt) => (
              <div key={receipt.id} className="flex items-center justify-between p-3 hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center">
                    <Truck className="h-4 w-4 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{receipt.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {receipt.quantity} {receipt.unit} {receipt.commodity}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(receipt.status)}>
                      {receipt.status}
                    </Badge>
                    {receipt.tokenized && (
                      <Badge variant="outline" className="text-[#00FFD1] bg-[#00FFD1]/10 border-[#00FFD1]/20">
                        Tokenized
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">${receipt.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
