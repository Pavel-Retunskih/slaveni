import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(sectionId?: string, offset = 96) {
  if (typeof window === "undefined" || !sectionId) {
    return
  }

  const normalized = sectionId.startsWith("#") ? sectionId.slice(1) : sectionId
  const target = document.getElementById(normalized)

  if (!target) {
    return
  }

  const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options: { offset: number }) => void } }).lenis

  if (lenis) {
    lenis.scrollTo(target, { offset: -offset })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }
}
