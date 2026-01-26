"use client"

import type { ReactNode } from "react"
import { cn } from "@/shared/lib/utils"

interface StackedSectionProps {
  children: ReactNode
  index: number
  totalSections: number
  className?: string
}

export function StackedSection({ children, index, totalSections, className }: StackedSectionProps) {
  const zIndex = totalSections - index

  return (
    <section
      className={cn("sticky top-0 min-h-screen w-full", className)}
      style={{ zIndex }}
    >
      <div className="h-full w-full">{children}</div>
    </section>
  )
}
