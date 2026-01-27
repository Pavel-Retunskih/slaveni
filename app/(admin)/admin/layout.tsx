import { getServerSession } from "next-auth/next"

import { AdminSessionProvider } from "./admin-session-provider"
import { authOptions } from "@/shared/auth/options"
import { redirect } from "next/navigation"


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <AdminSessionProvider session={session}>
            <main className="h-dvh bg-gray-900 text-white px-4 py-2" >
                {children}
            </main>
        </AdminSessionProvider>
    )
}