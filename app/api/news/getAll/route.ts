import { dbConnect } from "@/shared/api/db/client";
import { News } from "@/shared/api/db/models/News";

export async function GET() {

    try {
        await dbConnect()
        const newsDocs = await News.find()
        const news = newsDocs.map((doc) => doc.toJSON())

        return Response.json({
            news
        })

    } catch (error) {
        return Response.json({
            error: "Failed to load news"
        }, {
            status: 500
        })
    }

}