"use client"

import type { ReactNode } from "react"

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  bgColor?: string
}

export function ScrollSection({
  children,
  className = "",
  bgColor = "bg-background",
}: ScrollSectionProps) {
  return (
    <section className={`relative min-h-screen py-16 ${bgColor} ${className}`}>
      {children}
    </section>
  )
}
