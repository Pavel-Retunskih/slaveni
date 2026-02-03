import { dbConnect } from "@/shared/api/db/client"
import { Honorees } from "@/shared/api/db/models/Honorees"

export async function loadHonoreeById(id: string) {
    await dbConnect()

    const honoree = await Honorees.findById(id)

    if (!honoree) {
        throw new Error("Honoree not found")
    }

    return honoree
}
