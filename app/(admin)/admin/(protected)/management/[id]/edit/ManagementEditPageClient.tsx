"use client"
import { useRouter } from "next/navigation"
import type { ManagementFormPayload } from "@/shared/types/management"
import { ManagementFormShell } from "@/widgets/management-form-shell/ManagementFormShell"
import { IManagement } from "@/shared/api/db/models/Management"

type Props = {
    management: IManagement
}

export const ManagementEditPageClient = ({ management }: Props) => {
    const router = useRouter()

    const onSubmit = async (data: ManagementFormPayload) => {
        try {
            const response = await fetch(`/api/management/${management.id}`, {
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

            router.push("/admin/management")
            router.refresh()
        } catch (error) {
            throw error
        }
    }

    const onDelete = async () => {
        try {
            const response = await fetch(`/api/management/${management.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            }

            router.push("/admin/management")
            router.refresh()
        } catch (error) {
            console.error("Error deleting management:", error)
            throw error
        }
    }

    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <ManagementFormShell
                title={`Редактирование: ${management.name}`}
                initialData={management}
                onSubmitAction={onSubmit}
                onDeleteAction={onDelete}
                isDirector={management.isDirector}
            />
        </div>
    </div>
}
