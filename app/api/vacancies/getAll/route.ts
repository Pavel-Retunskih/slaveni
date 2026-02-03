import { dbConnect } from "@/shared/api/db/client";
import { Vacancy } from "@/shared/api/db/models/Vacancy";

export async function GET() {

    try {
        await dbConnect()
        const vacancyDocs = await Vacancy.find().sort({ createdAt: -1 })
        const vacancies = vacancyDocs.map((doc) => doc.toJSON())

        return Response.json({
            vacancies
        })

    } catch (error) {
        return Response.json({
            error: "Failed to load vacancies"
        }, {
            status: 500
        })
    }

}
