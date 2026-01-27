import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { redirect } from "next/navigation"

export async function checkAuth() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/admin/login")
    }
}