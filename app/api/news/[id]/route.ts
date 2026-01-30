import { dbConnect } from "@/shared/api/db/client"
import { News } from "@/shared/api/db/models/News"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { NextRequest } from "next/server"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { extractImageUrls, isBlobUrl } from "@/shared/helpers/extractImagesFromHtml"
import { del } from "@vercel/blob"

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

        const existingNews = await News.findById(id)
        if (!existingNews) {
            return Response.json(
                { error: "News not found" },
                { status: 404 }
            )
        }

        const oldContentImages = extractImageUrls(existingNews.content).filter(isBlobUrl)
        const oldGalleryImages = (existingNews.images || []).filter(isBlobUrl)
        const oldImages = [...new Set([...oldContentImages, ...oldGalleryImages])]

        const newContentImages = extractImageUrls(content).filter(isBlobUrl)
        const newGalleryImages = (images || []).filter(isBlobUrl)
        const newImages = [...new Set([...newContentImages, ...newGalleryImages])]

        const imagesToDelete = oldImages.filter(url => !newImages.includes(url))

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
                { error: "Failed to update news" },
                { status: 500 }
            )
        }

        if (imagesToDelete.length > 0) {
            try {
                await del(imagesToDelete, {
                    token: process.env.BLOB_READ_WRITE_TOKEN,
                })
            } catch (deleteError) {
                console.error("Failed to delete unused images:", deleteError)
            }
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
