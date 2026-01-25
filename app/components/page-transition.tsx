"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const overlayVariants = {
  initial: {
    scaleY: 0,
    originY: 0,
  },
  enter: {
    scaleY: [0, 1, 1, 0],
    originY: [0, 0, 1, 1],
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      times: [0, 0.4, 0.6, 1],
    },
  },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="enter"
          className="fixed inset-0 z-50 bg-primary pointer-events-none"
        />
        <motion.main
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.main>
      </motion.div>
    </AnimatePresence>
  )
}
