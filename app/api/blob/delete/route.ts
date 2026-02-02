import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { deleteUploadsByKeys } from "@/shared/lib/server/storage"
import { extractLegacyBlobPath, extractUploadKeyFromUrl, isLegacyBlobUrl } from "@/shared/lib/uploads"

export async function POST(request: Request): Promise<NextResponse> {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { urls } = await request.json() as { urls: string | string[] }

        if (!urls || (Array.isArray(urls) && urls.length === 0)) {
            return NextResponse.json({ error: "No URLs provided" }, { status: 400 })
        }

        const list = Array.isArray(urls) ? urls : [urls]

        const legacyPaths = list
            .filter(isLegacyBlobUrl)
            .map((url) => extractLegacyBlobPath(url))
            .filter((path): path is string => Boolean(path))

        const s3Keys = list
            .map((url) => extractUploadKeyFromUrl(url))
            .filter((key): key is string => Boolean(key))

        if (legacyPaths.length > 0 || s3Keys.length > 0) {
            await deleteUploadsByKeys([...legacyPaths, ...s3Keys])
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Delete error:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Delete failed" },
            { status: 400 }
        )
    }
}
