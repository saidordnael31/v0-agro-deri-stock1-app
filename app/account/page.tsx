"use client"

import { Topbar } from "@/components/topbar"
import { AccountDashboard } from "@/components/account/account-dashboard"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <AccountDashboard />
      </main>
    </div>
  )
}
