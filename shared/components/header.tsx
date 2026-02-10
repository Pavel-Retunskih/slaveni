"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Wheat } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ContactModal } from "@/shared/components/contact-modal"

const navItems = [
  { href: "/", label: "О предприятии" },
  { href: "/management", label: "Руководство" },
  { href: "/news", label: "Новости" },
  { href: "/honor-board", label: "Доска почета" },
  { href: "/vacancies", label: "Вакансии" },
  { href: "/contacts", label: "Контакты" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Logo" width={64} height={64} className="h-10 md:h-12 w-auto" />
              <span className="font-serif text-lg md:text-xl font-semibold text-foreground">Большие Славени</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${isActive
                      ? "text-foreground border-b-2 border-primary pb-0.5"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden md:block">
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setContactOpen(true)}>
                Связаться
              </Button>
            </div>

            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Меню"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col px-4 py-4 gap-4">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-base font-medium transition-colors ${isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Button variant="default" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground w-full" onClick={() => { setIsOpen(false); setContactOpen(true) }}>
                Связаться
              </Button>
            </nav>
          </div>
        )}
      </header>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
}
