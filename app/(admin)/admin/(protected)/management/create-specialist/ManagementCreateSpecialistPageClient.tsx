"use client"
import { useRouter } from "next/navigation"
import type { ManagementFormPayload } from "@/shared/types/management"
import { ManagementFormShell } from "@/widgets/management-form-shell/ManagementFormShell"

export const ManagementCreateSpecialistPageClient = () => {
    const router = useRouter()

    const onSubmit = async (data: ManagementFormPayload) => {
        try {
            const response = await fetch("/api/management/create", {
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

            router.push("/admin/management")
            router.refresh()
        } catch (error) {
            throw error
        }
    }
    
    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <ManagementFormShell
                title="Создание специалиста"
                onSubmitAction={onSubmit}
                isDirector={false}
            />
        </div>
    </div>
}
