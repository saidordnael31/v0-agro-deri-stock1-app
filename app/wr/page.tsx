"use client"

import { Topbar } from "@/components/topbar"
import { WrForm } from "@/components/finance/wr-form"

export default function WarehouseReceiptsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Topbar />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Warehouse Receipts</h1>
          <p className="text-gray-400">Registre e consulte seus recibos de armazém para commodities estocadas</p>
        </div>
        <WrForm />
      </main>
    </div>
  )
}
