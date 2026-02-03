import { dbConnect } from "@/shared/api/db/client"
import { Management } from "@/shared/api/db/models/Management"

export async function GET() {
    try {
        await dbConnect()
        
        const managementDocs = await Management.find().sort({ isDirector: -1, createdAt: -1 })
        const management = managementDocs.map((doc) => doc.toJSON())

        return Response.json({
            management
        })

    } catch (error) {
        return Response.json({
            error: "Failed to load management"
        }, {
            status: 500
        })
    }
}
