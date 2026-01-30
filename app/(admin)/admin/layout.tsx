import { getServerSession } from "next-auth/next"

import { AdminSessionProvider } from "./admin-session-provider"
import { authOptions } from "@/shared/auth/options"
import { InitTheme } from "./init-theme"


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <AdminSessionProvider session={session}>
            <InitTheme />
            <main className="h-dvh bg-background dark:bg-gray-950 text-foreground dark:text-white px-4 py-2" >
                {children}
            </main>
        </AdminSessionProvider>
    )
}