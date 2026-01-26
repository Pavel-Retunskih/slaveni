import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { redirect } from "next/navigation"

export default async function VacanciesPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/admin/login")
    }
    return <div>Vacancies</div>
}