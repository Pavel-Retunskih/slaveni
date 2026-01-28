"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { NewsForm } from "@/features/news/NewsForm"
import { resolveApiResponse } from "@/shared/helpers/apiResponse"
import type { NewsFormPayload } from "@/shared/types/news"

export const NewsCreatePageClient = () => {
    const router = useRouter()

    const onSubmit = async (data: NewsFormPayload) => {
        const response = await fetch("/api/news/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        await resolveApiResponse<{ news: unknown }>(response)

        router.push("/admin/news")
        router.refresh()
    }
    return <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
            <Link
                href="/admin/news"
                className="p-2 hover:bg-accent rounded-md transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-semibold">Создание новости</h1>
        </div>

        <div className="flex-1 overflow-auto">
            <NewsForm
                onSubmitAction={onSubmit}
            />
        </div>
    </div>
}