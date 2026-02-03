import { loadHonorees } from "@/shared/helpers/loadHonorees"
import type { HonoreeArticle } from "@/widgets/honoree-admin-table/columns"
import { HonoreeAdminTable } from "@/widgets/honoree-admin-table/HonoreeAdminTable"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { checkAuth } from "@/shared/helpers/checkAuth"

export type NormalizedHonoreeArticle = HonoreeArticle

export default async function HonoreesPage() {
    await checkAuth()

    const rawHonorees = await loadHonorees()
    const honorees: NormalizedHonoreeArticle[] = rawHonorees.map((item) => ({
        id: item.id ?? "",
        name: item.name ?? "",
        position: item.position ?? "",
        department: item.department ?? "",
        years: item.years ?? "",
        createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString('ru-RU') : "",
        updatedAt: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ru-RU') : "",
    }))
    return <>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Страница создания и редактирования доски почета</h2>
            <Button asChild >
                <Link href="/admin/honorees/create">Создать запись</Link>
            </Button>
        </div>

        <HonoreeAdminTable data={honorees} />
    </>
}
