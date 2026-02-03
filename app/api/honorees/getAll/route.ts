import { dbConnect } from "@/shared/api/db/client"
import { Honorees } from "@/shared/api/db/models/Honorees"

export async function GET() {
    try {
        await dbConnect()
        const honorees = await Honorees.find().sort({ createdAt: -1 })

        return Response.json({
            honorees: honorees.map((honoree) => honoree.toJSON()),
        })
    } catch (error) {
        console.error("Error fetching honorees:", error)
        return Response.json(
            { error: "Failed to fetch honorees" },
            { status: 500 }
        )
    }
}
