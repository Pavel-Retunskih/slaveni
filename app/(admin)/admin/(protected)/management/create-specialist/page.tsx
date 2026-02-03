import { checkAuth } from "@/shared/helpers/checkAuth"
import { ManagementCreateSpecialistPageClient } from "./ManagementCreateSpecialistPageClient"

export default async function ManagementCreateSpecialistPage() {
    await checkAuth()

    return <ManagementCreateSpecialistPageClient />
}
