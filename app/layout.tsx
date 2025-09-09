import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "AgroDeri Stock - Agricultural Derivatives Trading",
  description: "Advanced agricultural derivatives trading platform with DeFi integration",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
