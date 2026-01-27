"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { NewsForm } from "@/features/news/NewsForm"
import type { NewsFormPayload } from "@/shared/types/news"

export const NewsCreatePageClient = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: NewsFormPayload) => {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/news/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to create news")
            }

            router.push("/admin/news")
            router.refresh()
        } catch (error) {
            console.error("Error creating news:", error)
        } finally {
            setIsSubmitting(false)
        }
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
                isSubmitting={isSubmitting}
            />
        </div>
    </div>
}