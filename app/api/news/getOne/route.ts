import { dbConnect } from "@/shared/api/db/client"
import { News } from "@/shared/api/db/models/News"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
        return Response.json(
            { error: "Missing news id" },
            { status: 400 },
        )
    }

    try {
        await dbConnect()
        const currentNews = await News.findById(id)
        console.log(currentNews)
        if (!currentNews) {
            return Response.json(
                { error: "News not found" },
                { status: 404 },
            )
        }

        return Response.json({
            news: currentNews.toJSON(),
        })
    } catch (error) {
        return Response.json(
            { error: "Failed to load news" },
            { status: 500 },
        )
    }
}