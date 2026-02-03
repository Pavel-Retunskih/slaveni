import { loadVacancies } from "@/shared/helpers/loadVacancies"
import type { VacancyArticle } from "@/widgets/vacancy-admin-table/columns"
import { VacancyAdminTable } from "@/widgets/vacancy-admin-table/VacancyAdminTable"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { checkAuth } from "@/shared/helpers/checkAuth"

export type NormalizedVacancyArticle = Omit<VacancyArticle, 'urgent'> & { urgent: string }

export default async function VacanciesPage() {
    await checkAuth()

    const rawVacancies = await loadVacancies()
    const vacancies: NormalizedVacancyArticle[] = rawVacancies.map((item) => ({
        id: item.id,
        title: item.title,
        department: item.department ?? "",
        type: item.type ?? "",
        urgent: item.urgent ? "Да" : "Нет",
        createdAt: new Date(item.createdAt).toLocaleDateString('ru-RU'),
        updatedAt: new Date(item.updatedAt).toLocaleDateString('ru-RU'),
    }))
    return <>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Страница создания и редактирования вакансий</h2>
            <Button asChild >
                <Link href="/admin/vacancies/create">Создать вакансию</Link>
            </Button>
        </div>

        <VacancyAdminTable data={vacancies} />
    </>
}