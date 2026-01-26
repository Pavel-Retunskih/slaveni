"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/shared/lib/utils"
import { useLenis } from "@/shared/components/lenis-provider"

interface ParallaxLayerProps {
  speed?: number
  className?: string
  children?: React.ReactNode
}

interface LenisScrollEvent {
  scroll: number
}

export function ParallaxLayer({ speed = 0.1, className, children }: ParallaxLayerProps) {
  const { lenis } = useLenis()
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lenis || !layerRef.current) {
      return
    }

    const element = layerRef.current

    const applyTransform = (scrollValue: number) => {
      const translate = scrollValue * speed
      element.style.transform = `translate3d(0, ${translate}px, 0)`
    }

    const handleScroll = (event: LenisScrollEvent) => {
      applyTransform(event?.scroll ?? 0)
    }

    lenis.on("scroll", handleScroll)
    applyTransform(((lenis as unknown as { scroll?: number }).scroll ?? window.scrollY))

    return () => {
      lenis.off("scroll", handleScroll)
      element.style.transform = ""
    }
  }, [lenis, speed])

  return (
    <div ref={layerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}
