import { dbConnect } from "@/shared/api/db/client"
import { Honorees } from "@/shared/api/db/models/Honorees"

export async function loadHonorees() {
    await dbConnect()

    const honoreesDocs = await Honorees.find()
    const honorees = honoreesDocs.map((doc) => doc.toJSON())

    return honorees
}