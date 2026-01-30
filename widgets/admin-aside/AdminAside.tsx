"use client"

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { Button } from "@/shared/components/ui/button"

const navItems = [
    { href: "/admin/news", label: "Новости" },
    { href: "/admin/vacancies", label: "Вакансии" },
]

export const AdminAside = () => {
    const pathname = usePathname()

    return (
        <aside className="rounded-2xl border max-w-xs border-border bg-card dark:bg-white/10 p-6 backdrop-blur h-full flex flex-col shadow-sm">
            <div className="mb-8 space-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
                <h1 className="text-2xl font-semibold text-foreground">Большие Славени</h1>
                <p className="text-sm text-muted-foreground">Управление новостями и вакансиями предприятия</p>
            </div>

            <NavigationMenu orientation="vertical" className="flex-1">
                <NavigationMenuList className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

                        return (
                            <NavigationMenuItem key={item.href}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={item.href}
                                        className={`block rounded-xl px-4 py-2 text-sm font-medium transition ${isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>

            <div className="mt-auto pt-6 border-t border-border flex items-center justify-between gap-2">
                <ThemeToggle />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Выход</span>
                </Button>
            </div>
        </aside>
    )
}