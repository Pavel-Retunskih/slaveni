import { checkAuth } from "@/shared/helpers/checkAuth"

import { dbConnect } from "@/shared/api/db/client"
import { Management } from "@/shared/api/db/models/Management"
import { notFound } from "next/navigation"
import { ManagementEditPageClient } from "./ManagementEditPageClient"

export default async function ManagementEditPage({ params }: { params: Promise<{ id: string }> }) {
    await checkAuth()
    const { id } = await params

    await dbConnect()
    const managementDoc = await Management.findById(id)

    if (!managementDoc) {
        notFound()
    }

    const management = managementDoc.toJSON()

    return <ManagementEditPageClient management={management} />
}
