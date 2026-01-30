"use client"
import { useRouter } from "next/navigation"
import type { NewsFormPayload } from "@/shared/types/news"
import { NewsFormShell } from "@/widgets/news-form-shell/NewsFormShell"

export const NewsCreatePageClient = () => {
    const router = useRouter()

    const onSubmit = async (data: NewsFormPayload) => {
        try {
            const response = await fetch("/api/news/create", {
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

            router.push("/admin/news")
            router.refresh()
        } catch (error) {
            throw error
        }
    }
    return <div className="w-full flex flex-col">
        <div className="flex-1 overflow-auto">
            <NewsFormShell
                title="Создание новости"
                onSubmitAction={onSubmit}
            />
        </div>
    </div>
}