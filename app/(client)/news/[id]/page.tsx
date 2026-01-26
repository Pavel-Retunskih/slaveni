import { loadNewsById } from "@/shared/helpers/loadNews"
import { loadNews } from "@/shared/helpers/loadNews"

export async function generateStaticParams() {
    const news = await loadNews()
    return news.featuredNews.map((news) => ({
        id: news.id
    }))
}

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)

    return (
        <>
            <div>{news.title}</div>
            <div>{news.id}</div>
        </>
    )
}