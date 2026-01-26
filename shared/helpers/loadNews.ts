import { dbConnect } from "@/shared/api/db/client"
import { News } from "@/shared/api/db/models/News"
import { notFound } from "next/navigation"

export async function loadNews() {
    await dbConnect()

    const newsDocs = await News.find()

    const news = newsDocs.map((doc) => doc.toJSON())

    const featuredNews = news.filter((item) => item.featured)
    const regularNews = news.filter((item) => !item.featured)

    return {
        featuredNews,
        regularNews,
    }
}

export async function loadNewsById(id: string) {
    await dbConnect()
    const news = await News.findById(id)
    if (!news) {
        return notFound()
    }
    return news
}