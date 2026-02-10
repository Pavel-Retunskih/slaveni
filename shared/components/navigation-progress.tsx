"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function NavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevPathRef = useRef(pathname)

  const stopProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setProgress(100)
    const timeout = setTimeout(() => {
      setIsNavigating(false)
      setProgress(0)
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const startProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setIsNavigating(true)
    setProgress(10)

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90
        const increment = Math.max(1, (90 - prev) * 0.1)
        return Math.min(90, prev + increment)
      })
    }, 150)
  }, [])

  // Detect navigation completion via pathname change
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      stopProgress()
    }
  }, [pathname, stopProgress])

  // Detect navigation start via link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link || !link.href || link.target === "_blank") return

      try {
        const url = new URL(link.href)
        if (
          url.origin === window.location.origin &&
          url.pathname !== pathname &&
          !url.hash
        ) {
          startProgress()
        }
      } catch {
        // ignore invalid URLs
      }
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [pathname, startProgress])

  if (!isNavigating) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-100 h-0.5">
      <div
        className="h-full bg-primary shadow-[0_0_8px_var(--primary)] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
