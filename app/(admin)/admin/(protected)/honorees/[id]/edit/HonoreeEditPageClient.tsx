"use client"
import { useRouter } from "next/navigation"
import type { HonoreeFormPayload } from "@/shared/types/honoree"
import { HonoreeFormShell } from "@/widgets/honoree-form-shell/HonoreeFormShell"
import { IHonoree } from "@/shared/api/db/models/Honorees"

type Props = {
    honoree: IHonoree
}

export const HonoreeEditPageClient = ({ honoree }: Props) => {
    const router = useRouter()

    const onSubmit = async (data: HonoreeFormPayload) => {
        try {
            const response = await fetch(`/api/honorees/${honoree.id}`, {
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

            router.push("/admin/honorees")
            router.refresh()
        } catch (error) {
            throw error
        }
    }

    const onDelete = async () => {
        try {
            const response = await fetch(`/api/honorees/${honoree.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            }

            router.push("/admin/honorees")
            router.refresh()
        } catch (error) {
            console.error("Error deleting honoree:", error)
            throw error
        }
    }

    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <HonoreeFormShell
                title="Редактирование записи на доске почета"
                initialData={honoree}
                onSubmitAction={onSubmit}
                onDeleteAction={onDelete}
            />
        </div>
    </div>
}
