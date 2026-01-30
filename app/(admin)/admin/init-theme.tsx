"use client"

import { useEffect } from "react"

export function InitTheme() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    }
  }, [])

  return null
}
