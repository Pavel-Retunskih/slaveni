import { checkAuth } from "@/shared/helpers/checkAuth"
import { ManagementCreateDirectorPageClient } from "./ManagementCreateDirectorPageClient"

export default async function ManagementCreateDirectorPage() {
    await checkAuth()

    return <ManagementCreateDirectorPageClient />
}
