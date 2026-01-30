"use client"
import { useRouter } from "next/navigation"
import { NewsForm } from "@/features/news/NewsForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { resolveApiResponse } from "@/shared/helpers/apiResponse"
import { NewsJSON } from "@/shared/api/db/models/News"
import { NewsFormPayload } from "@/shared/types/news"
import { NewsFormShell } from "@/widgets/news-form-shell/NewsFormShell"

interface NewsEditPageClientProps {
    news: NewsJSON
}

export function NewsEditPageClient({ news }: NewsEditPageClientProps) {
    const router = useRouter()

    const onSubmit = async (data: NewsFormPayload) => {
        const response = await fetch(`/api/news/${news.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        await resolveApiResponse<{ news: unknown }>(response)

        router.push("/admin/news")
        router.refresh()
    }

    return (
        <div className="w-full flex flex-col">
            <div className="flex-1 overflow-auto">
                <NewsFormShell
                    title="Редактирование новости"
                    initialData={news}
                    onSubmitAction={onSubmit}
                />
            </div>
        </div>
    )
}
