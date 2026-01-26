"use client"

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { href: "/admin/news", label: "Новости" },
    { href: "/admin/vacancies", label: "Вакансии" },
]

export const AdminAside = () => {
    const pathname = usePathname()

    return (
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur h-full">
            <div className="mb-8 space-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Admin</p>
                <h1 className="text-2xl font-semibold">Большие Славени</h1>
                <p className="text-sm text-white/70">Управление новостями и вакансиями предприятия</p>
            </div>
            <NavigationMenu orientation="vertical">
                <NavigationMenuList className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

                        return (
                            <NavigationMenuItem key={item.href}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={item.href}
                                        className={`block rounded-xl px-4 py-2 text-sm font-medium transition ${isActive
                                            ? "bg-white/15 text-white"
                                            : "text-white/80 hover:bg-white/10 hover:text-white"
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
        </aside>
    )
}