import { loadNewsById } from "@/shared/helpers/loadNews"
import { loadNews } from "@/shared/helpers/loadNews"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { NewsFullDescriptionCard } from "@/entities/news/NewsFullDescriptionCard"
import { JSDOM } from "jsdom"
import createDOMPurify from "dompurify"

const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

export async function generateStaticParams() {
    const news = await loadNews()
    return news.featuredNews.map((news) => ({
        id: news.id
    }))
}

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)
    const safeContent = DOMPurify.sanitize(news.content)
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button variant="ghost" size="sm" asChild className="mb-8">
                    <Link href="/news">
                        <ArrowLeft className="w-4 h-4" />
                        Назад к новостям
                    </Link>
                </Button>

                <NewsFullDescriptionCard
                    news={news}
                    newsId={id}
                    safeContent={safeContent}
                />
            </div>
        </div>
    )
}