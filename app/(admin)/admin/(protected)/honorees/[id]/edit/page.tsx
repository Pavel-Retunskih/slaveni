import { loadHonoreeById } from "@/shared/helpers/loadHonoreeById"
import { HonoreeEditPageClient } from "./HonoreeEditPageClient"

export default async function HonoreeIdEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const honoree = await loadHonoreeById(id)
    const honoreeJSON = honoree.toJSON()

    return <HonoreeEditPageClient honoree={honoreeJSON} />
}
