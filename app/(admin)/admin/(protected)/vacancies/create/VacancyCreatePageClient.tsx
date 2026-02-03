"use client"
import { useRouter } from "next/navigation"
import type { VacancyFormPayload } from "@/shared/types/vacancy"
import { VacancyFormShell } from "@/widgets/vacancy-form-shell/VacancyFormShell"

export const VacancyCreatePageClient = () => {
    const router = useRouter()

    const onSubmit = async (data: VacancyFormPayload) => {
        try {
            const response = await fetch("/api/vacancies/create", {
                method: "POST",
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
    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <VacancyFormShell
                title="Создание вакансии"
                onSubmitAction={onSubmit}
            />
        </div>
    </div>
}
