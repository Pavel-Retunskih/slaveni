import { loadManagment } from "@/shared/helpers/loadManagment"
import type { ManagementArticle } from "@/widgets/management-admin-table/columns"
import { ManagementAdminTable } from "@/widgets/management-admin-table/ManagementAdminTable"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { checkAuth } from "@/shared/helpers/checkAuth"

export type NormalizedManagementArticle = ManagementArticle

export default async function ManagementPage() {
    await checkAuth()

    const { director, specialists } = await loadManagment()
    const rawManagement = [...(director ? [director] : []), ...specialists]
    
    const management: NormalizedManagementArticle[] = rawManagement.map((item) => ({
        id: item.id,
        name: item.name,
        position: item.position,
        department: item.department,
        role: item.isDirector ? "Директор" : "Специалист",
        createdAt: new Date(item.createdAt).toLocaleDateString('ru-RU'),
        updatedAt: new Date(item.updatedAt).toLocaleDateString('ru-RU'),
    }))
    
    return <>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Страница управления руководством</h2>
            <div className="flex gap-2">
                {!director && (
                    <Button asChild>
                        <Link href="/admin/management/create-director">Добавить директора</Link>
                    </Button>
                )}
                <Button asChild variant="outline">
                    <Link href="/admin/management/create-specialist">Добавить специалиста</Link>
                </Button>
            </div>
        </div>

        <ManagementAdminTable data={management} />
    </>
}
