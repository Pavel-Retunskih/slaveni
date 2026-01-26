import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { redirect } from "next/navigation"
import { loadNews } from "@/shared/helpers/loadNews"
import type { NewsArticle } from "@/widgets/news-admin-table/columns"
import { NewsAdminTable } from "@/widgets/news-admin-table/NewsAdminTable"

export default async function NewsPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/admin/login")
    }

    const { featuredNews, regularNews } = await loadNews()
    const rawNews = [...featuredNews, ...regularNews]
    const news: NewsArticle[] = rawNews.map((item) => ({
        id: item.id ?? (typeof item._id === "string" ? item._id : item._id?.toString()) ?? "",
        title: item.title ?? "",
        category: item.category ?? "",
        excerpt: item.excerpt ?? "",
        featured: Boolean(item.featured),
        createdAt: item.createdAt?.toString() ?? "",
        updatedAt: item.updatedAt?.toString() ?? "",
    }))
    return <div>
        <h2>News</h2>
        <NewsAdminTable data={news} />
    </div>
}