import { dbConnect } from "@/shared/api/db/client"
import { News } from "@/shared/api/db/models/News"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { Validator } from "@/shared/helpers/Validator"
import type { NewsFormPayload } from "@/shared/types/news"
import { del } from "@vercel/blob"

export async function POST(request: Request) {
    await checkAuth()
    let tempUploadPathnames: string[] = []

    try {
        await dbConnect()
        const body: NewsFormPayload = await request.json()

        if (!Validator.validateNewsCreate(body)) {
            return Response.json(
                { error: "Invalid news data" },
                { status: 400 },
            )
        }

        const { title, excerpt, content, category, featured, images = [], uploadPathnames = [] } = body
        tempUploadPathnames = uploadPathnames

        const news = await News.create({
            title,
            excerpt,
            content,
            category,
            featured,
            images,
        })

        return Response.json(
            {
                success: true,
                news: news.toJSON(),
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Failed to create news:", error)
        await Promise.all(
            tempUploadPathnames.map(async (pathname) => {
                try {
                    await del(pathname)
                } catch (cleanupError) {
                    console.error("Failed to delete blob:", cleanupError)
                }
            }),
        )

        return Response.json({
            error: "Failed to create news: " + (error instanceof Error ? error.message : String(error)),
        }, { status: 500 })
    }
}
