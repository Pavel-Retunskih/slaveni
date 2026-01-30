import { loadNewsById } from "@/shared/helpers/loadNews"
import { NewsEditPageClient } from "./NewsEditPageClient"

export default async function NewsIdEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)
    const newsJSON = news.toJSON()

    return <NewsEditPageClient news={newsJSON} />
}