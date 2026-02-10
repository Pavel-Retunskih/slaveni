"use client"

import { useRef, useEffect, useState, ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface StackingSectionProps {
  children: ReactNode
  index: number
  totalSections: number
  className?: string
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mql.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [breakpoint])

  return isMobile
}

export function StackingSection({
  children,
  index,
  totalSections,
  className = "",
}: StackingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Scale down slightly as user scrolls past
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  // Reduce opacity as user scrolls past
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5])

  // Add border radius as section goes behind
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "24px"])

  // Add shadow as next section approaches
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [
      "0 0 0 rgba(0,0,0,0)",
      "0 15px 40px rgba(0,0,0,0.12)",
      "0 25px 60px rgba(0,0,0,0.2)",
    ]
  )

  // z-index increases with index so later sections appear on top
  const zIndex = index + 1

  // First section (Hero) doesn't need sticky
  const isFirstSection = index === 0
  // Last section doesn't need scaling animation
  const isLastSection = index === totalSections - 1

  if (isMobile) {
    return (
      <div ref={sectionRef} className={`relative ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={sectionRef}
      className={`relative ${!isFirstSection ? "sticky top-0" : ""} ${className}`}
      style={{
        zIndex,
        scale: isLastSection ? 1 : scale,
        opacity: isLastSection ? 1 : opacity,
        borderRadius: isLastSection ? "0px" : borderRadius,
        boxShadow: isLastSection ? "none" : boxShadow,
        overflow: "hidden",
        transformOrigin: "center top",
      }}
    >
      {children}
    </motion.div>
  )
}
