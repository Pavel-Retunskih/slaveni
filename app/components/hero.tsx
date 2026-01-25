"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ParallaxLayer } from "@/components/parallax-layer"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxLayer speed={-0.05} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-field.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.05} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
          ЗАО «Большие Славени»
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto text-pretty">
          Сельскохозяйственное предприятие Могилевской области, специализирующееся на производстве 
          продукции мясомолочного скотоводства с развитым зерновым хозяйством.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base"
          >
            Наша продукция
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-base bg-transparent"
          >
            Узнать больше
          </Button>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.01} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </ParallaxLayer>
    </section>
  )
}
