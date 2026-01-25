import { dbConnect } from "@/shared/api/db/client"
import { Vacancy } from "@/shared/api/db/models/Vacancy"

export type VacancyDTO = {
    id: string
    title: string
    department?: string | null
    type?: string | null
    salary?: string | null
    requirements?: string[]
    duties?: string[]
    benefits?: string[]
    urgent?: boolean
}

export async function loadVacancies(): Promise<VacancyDTO[]> {
    await dbConnect()

    const vacancyDocs = await Vacancy.find().sort({ createdAt: -1 })

    return vacancyDocs.map((doc) => doc.toJSON() as VacancyDTO)
}
