"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Leaf } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 px-6 text-center bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="h-12 w-12 text-[#00FFD1] mr-3" />
          <h1 className="text-4xl md:text-6xl font-bold text-white">AgroDeri Stock</h1>
        </div>

        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          A primeira plataforma DeFi para derivativos agrícolas do Brasil. Proteja sua safra, tokenize garantias e
          acesse liquidez global.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/trade">
            <Button size="lg" className="bg-[#00FFD1] text-black hover:bg-[#00E6BC] font-semibold">
              Começar a Negociar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/defi/sblc">
            <Button
              size="lg"
              variant="outline"
              className="border-[#00FFD1] text-white hover:bg-[#00FFD1] hover:text-black bg-gray-900"
            >
              <Shield className="mr-2 h-5 w-5" />
              Criar Garantia (SBLC)
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <TrendingUp className="h-8 w-8 text-[#00FFD1] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Hedge Inteligente</h3>
            <p className="text-gray-400">Proteja sua safra contra volatilidade com derivativos descentralizados</p>
          </div>

          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <Shield className="h-8 w-8 text-[#00FFD1] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Garantias Tokenizadas</h3>
            <p className="text-gray-400">Transforme SBLC e CPR em tokens negociáveis na blockchain</p>
          </div>

          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <Leaf className="h-8 w-8 text-[#00FFD1] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Stablecoins Agrícolas</h3>
            <p className="text-gray-400">USSA, BRSA e GLDA lastreadas em commodities reais</p>
          </div>
        </div>
      </div>
    </section>
  )
}
