import { loadNewsById } from "@/shared/helpers/loadNews"
import { NewsEditPageClient } from "./NewsEditPageClient"

export default async function NewsIdEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)

    const newsData = {
        id: news.id ?? news._id?.toString() ?? "",
        title: news.title ?? "",
        excerpt: news.excerpt ?? "",
        category: news.category ?? "",
        featured: Boolean(news.featured),
        content: news.content ?? "",
    }

    return <NewsEditPageClient news={newsData} />
}