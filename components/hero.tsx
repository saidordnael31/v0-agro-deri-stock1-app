"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const ArrowRight = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
)

const Shield = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const TrendingUp = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
    <polyline points="16,7 22,7 22,13" />
  </svg>
)

const Leaf = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

export function Hero() {
  return (
    <section className="relative py-20 px-6 text-center bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="h-12 w-12 text-brand-primary mr-3" />
          <h1 className="text-4xl md:text-6xl font-bold text-white">AgroDeri Stock</h1>
        </div>

        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          A primeira plataforma DeFi para derivativos agrícolas do Brasil. Proteja sua safra, tokenize garantias e
          acesse liquidez global.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/trade">
            <Button
              size="lg"
              className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-secondary font-semibold"
            >
              Começar a Negociar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/defi/sblc">
            <Button
              size="lg"
              variant="outline"
              className="border-brand-primary text-white hover:bg-brand-primary hover:text-brand-primary-foreground bg-gray-900"
            >
              <Shield className="mr-2 h-5 w-5" />
              Criar Garantia (SBLC)
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <TrendingUp className="h-8 w-8 text-brand-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Hedge Inteligente</h3>
            <p className="text-gray-400">Proteja sua safra contra volatilidade com derivativos descentralizados</p>
          </div>

          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <Shield className="h-8 w-8 text-brand-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Garantias Tokenizadas</h3>
            <p className="text-gray-400">Transforme SBLC e CPR em tokens negociáveis na blockchain</p>
          </div>

          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <Leaf className="h-8 w-8 text-brand-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Stablecoins Agrícolas</h3>
            <p className="text-gray-400">USSA, BRSA e GLDA lastreadas em commodities reais</p>
          </div>
        </div>
      </div>
    </section>
  )
}
