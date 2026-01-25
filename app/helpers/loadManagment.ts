import { dbConnect } from "@/shared/api/db/client"
import { Management } from "@/shared/api/db/models/Management"

export async function loadManagment() {
    await dbConnect()

    const managementDocs = await Management.find()
    const managenentCount = await Management.countDocuments()
    console.log(managenentCount)

    const management = managementDocs.map((doc) => doc.toJSON())
    const director = management.find((m) => m.isDirector)
    const specialists = management.filter((m) => !m.isDirector)

    return { director, specialists }
}