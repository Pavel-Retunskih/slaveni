import { loadNews } from "@/shared/helpers/loadNews"
import type { NewsArticle } from "@/widgets/news-admin-table/columns"
import { NewsAdminTable } from "@/widgets/news-admin-table/NewsAdminTable"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { checkAuth } from "@/shared/helpers/checkAuth"

export default async function NewsPage() {
    await checkAuth()

    const { featuredNews, regularNews } = await loadNews()
    const rawNews = [...featuredNews, ...regularNews]
    const news: NewsArticle[] = rawNews.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        excerpt: item.excerpt,
        featured: item.featured,
        createdAt: item.createdAt.toString(),
        updatedAt: item.updatedAt.toString(),
    }))
    return <div>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Cтраница создания и редактирования новостей</h2>
            <Button asChild >
                <Link href="/admin/news/create">Создать новость</Link>
            </Button>
        </div>

        <NewsAdminTable data={news} />
    </div>
}