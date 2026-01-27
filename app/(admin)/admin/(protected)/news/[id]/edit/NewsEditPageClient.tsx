"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NewsForm } from "@/features/news/NewsForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface NewsData {
    id: string
    title: string
    excerpt: string
    category: string
    featured: boolean
    content: string
}

interface NewsEditPageClientProps {
    news: NewsData
}

export function NewsEditPageClient({ news }: NewsEditPageClientProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (data: {
        title: string
        excerpt: string
        content: string
        images: string[]
        category: string
        featured: boolean
    }) => {
        setIsSubmitting(true)
        console.log(data)
        try {
            const response = await fetch(`/api/news/${news.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to update news")
            }

            router.push("/admin/news")
            router.refresh()
        } catch (error) {
            console.error("Error updating news:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/news"
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-semibold">Редактирование новости</h1>
            </div>

            <div className="flex-1 overflow-auto">
                <NewsForm
                    initialData={{
                        title: news.title,
                        excerpt: news.excerpt,
                        content: news.content,
                        category: news.category,
                        featured: news.featured,
                        images: [],
                    }}
                    onSubmitAction={handleSubmit}
                />
            </div>
        </div>
    )
}
