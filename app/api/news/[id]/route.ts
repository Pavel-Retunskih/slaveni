import { dbConnect } from "@/shared/api/db/client"
import { News } from "@/shared/api/db/models/News"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { NextRequest } from "next/server"
import { checkAuth } from "@/shared/helpers/checkAuth"

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await checkAuth()

    const { id } = await params

    try {
        await dbConnect()

        const body = await request.json()
        const { title, excerpt, content, category, featured, images } = body

        const updatedNews = await News.findByIdAndUpdate(
            id,
            {
                title,
                excerpt,
                content,
                category,
                featured,
                images,
                updatedAt: new Date().toISOString(),
            },
            { new: true }
        )

        if (!updatedNews) {
            return Response.json(
                { error: "News not found" },
                { status: 404 }
            )
        }

        return Response.json({
            success: true,
            news: updatedNews.toJSON(),
        })
    } catch (error) {
        console.error("Error updating news:", error)
        return Response.json(
            { error: "Failed to update news" },
            { status: 500 }
        )
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        await dbConnect()
        const news = await News.findById(id)

        if (!news) {
            return Response.json(
                { error: "News not found" },
                { status: 404 }
            )
        }

        return Response.json({
            news: news.toJSON(),
        })
    } catch (error) {
        console.error("Error fetching news:", error)
        return Response.json(
            { error: "Failed to fetch news" },
            { status: 500 }
        )
    }
}
