import { loadVacancyById } from "@/shared/helpers/loadVacancyById"
import { VacancyEditPageClient } from "./VacancyEditPageClient"

export default async function VacancyIdEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const vacancy = await loadVacancyById(id)
    const vacancyJSON = vacancy.toJSON()

    return <VacancyEditPageClient vacancy={vacancyJSON} />
}
