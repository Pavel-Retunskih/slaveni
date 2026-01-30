import { loadNews } from "@/shared/helpers/loadNews"
import type { NewsArticle } from "@/widgets/news-admin-table/columns"
import { NewsAdminTable } from "@/widgets/news-admin-table/NewsAdminTable"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { checkAuth } from "@/shared/helpers/checkAuth"

export type NormalizedNewsArticle = Omit<NewsArticle, 'featured' | 'isPublished'> & { featured: string, isPublished: { title: string, value: boolean } }

export default async function NewsPage() {
    await checkAuth()

    const { featuredNews, regularNews } = await loadNews()
    const rawNews = [...featuredNews, ...regularNews]
    console.log("rawNews", rawNews)
    const news: NormalizedNewsArticle[] = rawNews.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        excerpt: item.excerpt,
        featured: item.featured ? "Да" : "Нет",
        createdAt: item.createdAt.toLocaleDateString('ru-RU'),
        updatedAt: item.updatedAt.toLocaleDateString('ru-RU'),
        isPublished: item.isPublished ? { title: "Да", value: true } : { title: "Нет", value: false },
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