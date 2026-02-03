"use client"
import { useRouter } from "next/navigation"
import type { HonoreeFormPayload } from "@/shared/types/honoree"
import { HonoreeFormShell } from "@/widgets/honoree-form-shell/HonoreeFormShell"

export const HonoreeCreatePageClient = () => {
    const router = useRouter()

    const onSubmit = async (data: HonoreeFormPayload) => {
        try {
            const response = await fetch("/api/honorees/create", {
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

            router.push("/admin/honorees")
            router.refresh()
        } catch (error) {
            throw error
        }
    }
    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <HonoreeFormShell
                title="Создание записи на доску почета"
                onSubmitAction={onSubmit}
            />
        </div>
    </div>
}
