import { dbConnect } from "@/shared/api/db/client"
import { Vacancy, VacancyDocument } from "@/shared/api/db/models/Vacancy"

export async function loadVacancyById(id: string): Promise<VacancyDocument> {
    await dbConnect()

    const vacancy = await Vacancy.findById(id)

    if (!vacancy) {
        throw new Error("Vacancy not found")
    }

    return vacancy
}
