"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, MapPin, Package, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function LogisticsInterface() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Logistics Management</h1>
        <Button className="bg-[#00FFD1] text-black hover:bg-[#00E6BC]">
          <Package className="h-4 w-4 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold text-[#00FFD1]">24</p>
              </div>
              <Truck className="h-8 w-8 text-[#00FFD1]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-orange-500">18</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-green-500">156</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-red-500">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input placeholder="Search by tracking number..." className="flex-1" />
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Shipments</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: "LOG-2024-001",
                    commodity: "Soja",
                    quantity: "25 tons",
                    origin: "Mato Grosso",
                    destination: "Santos Port",
                    status: "In Transit",
                    eta: "2 days",
                    progress: 65,
                  },
                  {
                    id: "LOG-2024-002",
                    commodity: "Milho",
                    quantity: "40 tons",
                    origin: "Goiás",
                    destination: "Paranaguá Port",
                    status: "Loading",
                    eta: "5 days",
                    progress: 15,
                  },
                  {
                    id: "LOG-2024-003",
                    commodity: "Café",
                    quantity: "15 tons",
                    origin: "Minas Gerais",
                    destination: "Rio de Janeiro",
                    status: "Delivered",
                    eta: "Completed",
                    progress: 100,
                  },
                ].map((shipment, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-foreground">{shipment.id}</span>
                        <Badge
                          variant={
                            shipment.status === "Delivered"
                              ? "secondary"
                              : shipment.status === "In Transit"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">ETA: {shipment.eta}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Commodity</p>
                        <p className="font-medium text-foreground">{shipment.commodity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium text-foreground">{shipment.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Origin</p>
                        <p className="font-medium text-foreground">{shipment.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Destination</p>
                        <p className="font-medium text-foreground">{shipment.destination}</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#00FFD1] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "08:00", location: "Warehouse A", activity: "Loading - Soja 25t", status: "completed" },
                  { time: "10:30", location: "Highway BR-163", activity: "Transit checkpoint", status: "completed" },
                  { time: "14:00", location: "Fuel Station", activity: "Refuel & Rest", status: "current" },
                  { time: "18:00", location: "Santos Port", activity: "Delivery - Soja 25t", status: "pending" },
                  { time: "20:00", location: "Return Journey", activity: "Empty return", status: "pending" },
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        event.status === "completed"
                          ? "bg-green-500"
                          : event.status === "current"
                            ? "bg-[#00FFD1]"
                            : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{event.activity}</span>
                        <span className="text-sm text-muted-foreground">{event.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-foreground mb-4">Active Routes</h3>
                  <div className="space-y-3">
                    {[
                      { name: "MT → Santos", distance: "1,247 km", time: "18h", cost: "$2,340" },
                      { name: "GO → Paranaguá", distance: "1,089 km", time: "16h", cost: "$1,890" },
                      { name: "MG → Rio", distance: "432 km", time: "6h", cost: "$890" },
                    ].map((route, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{route.name}</span>
                          <span className="text-sm font-medium text-[#00FFD1]">{route.cost}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{route.distance}</span>
                          <span>{route.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-4">Route Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Distance</span>
                      <span className="font-medium text-foreground">956 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Time</span>
                      <span className="font-medium text-foreground">13.3h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Efficiency</span>
                      <span className="font-medium text-green-500">8.2 km/L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">On-Time Rate</span>
                      <span className="font-medium text-green-500">94.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
