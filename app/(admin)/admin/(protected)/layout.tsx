import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { redirect } from "next/navigation"
import { AdminAside } from "@/widgets/admin-aside/AdminAside"
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/admin/login")
    }
    return <div className="flex w-full h-full min-h-full gap-8 p-4">
        <AdminAside />

        <div className="flex-1 min-w-0">
            {children}
        </div>
        <div />
    </div>
}