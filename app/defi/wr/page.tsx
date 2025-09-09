"use client"

import { Topbar } from "@/components/topbar"
import { WarehouseReceipts } from "@/components/finance/warehouse-receipts"

export default function WarehouseReceiptsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <WarehouseReceipts />
      </main>
    </div>
  )
}
