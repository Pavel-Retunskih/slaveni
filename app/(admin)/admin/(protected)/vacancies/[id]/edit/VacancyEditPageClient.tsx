"use client"
import { useRouter } from "next/navigation"
import type { VacancyFormPayload } from "@/shared/types/vacancy"
import { VacancyFormShell } from "@/widgets/vacancy-form-shell/VacancyFormShell"
import { IVacancy } from "@/shared/api/db/models/Vacancy"

type Props = {
    vacancy: IVacancy
}

export const VacancyEditPageClient = ({ vacancy }: Props) => {
    const router = useRouter()

    const onSubmit = async (data: VacancyFormPayload) => {
        try {
            const response = await fetch(`/api/vacancies/${vacancy.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            }

            router.push("/admin/vacancies")
            router.refresh()
        } catch (error) {
            throw error
        }
    }

    const onDelete = async () => {
        try {
            const response = await fetch(`/api/vacancies/${vacancy.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            }

            router.push("/admin/vacancies")
            router.refresh()
        } catch (error) {
            console.error("Error deleting vacancy:", error)
            throw error
        }
    }

    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <VacancyFormShell
                title="Редактирование вакансии"
                initialData={vacancy}
                onSubmitAction={onSubmit}
                onDeleteAction={onDelete}
            />
        </div>
    </div>
}
