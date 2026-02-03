import { dbConnect, dbDisconnect } from "../shared/api/db/client"
import { Vacancy } from "../shared/api/db/models/Vacancy"
import { Honorees } from "../shared/api/db/models/Honorees"
import { Management } from "../shared/api/db/models/Management"
import { News } from "../shared/api/db/models/News"

async function addTimestampsToExistingDocs() {
    await dbConnect()

    const now = new Date()

    try {
        // Update Vacancies without timestamps
        const vacanciesResult = await Vacancy.updateMany(
            { createdAt: { $exists: false } },
            { 
                $set: { 
                    createdAt: now,
                    updatedAt: now 
                } 
            }
        )
        console.log(`Updated ${vacanciesResult.modifiedCount} vacancy documents`)

        // Update Honorees without timestamps
        const honoreesResult = await Honorees.updateMany(
            { createdAt: { $exists: false } },
            { 
                $set: { 
                    createdAt: now,
                    updatedAt: now 
                } 
            }
        )
        console.log(`Updated ${honoreesResult.modifiedCount} honorees documents`)

        // Update Management without timestamps
        const managementResult = await Management.updateMany(
            { createdAt: { $exists: false } },
            { 
                $set: { 
                    createdAt: now,
                    updatedAt: now 
                } 
            }
        )
        console.log(`Updated ${managementResult.modifiedCount} management documents`)

        // Update News without timestamps
        const newsResult = await News.updateMany(
            { createdAt: { $exists: false } },
            { 
                $set: { 
                    createdAt: now,
                    updatedAt: now 
                } 
            }
        )
        console.log(`Updated ${newsResult.modifiedCount} news documents`)

        console.log('\nTimestamps migration completed successfully!')
    } catch (error) {
        console.error('Error during migration:', error)
        process.exit(1)
    } finally {
        await dbDisconnect()
    }
}

addTimestampsToExistingDocs()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error)
        process.exit(1)
    })
