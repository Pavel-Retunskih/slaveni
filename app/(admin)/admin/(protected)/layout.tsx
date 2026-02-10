import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { redirect } from "next/navigation"
import { AdminAside } from "@/widgets/admin-aside/AdminAside"
import { NavigationProgressWrapper } from "./navigation-progress-wrapper"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/admin/login")
    }
    return <div className="flex w-full h-full min-h-dvh gap-8 p-4">
        <NavigationProgressWrapper />
        <AdminAside />

        <div className="flex flex-col grow overflow-auto" data-lenis-prevent>
            {children}
        </div>
    </div>
}