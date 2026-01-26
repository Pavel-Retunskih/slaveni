"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"

interface LenisContextType {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    ;(window as unknown as { lenis: Lenis }).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  )
}
