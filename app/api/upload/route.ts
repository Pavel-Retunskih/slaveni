import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"
import { generateUploadKey, uploadBufferToS3 } from "@/shared/lib/server/storage"
import { buildPublicUploadUrl } from "@/shared/lib/uploads"

const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export async function POST(request: Request): Promise<NextResponse> {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get("file")
        const providedName = formData.get("filename")

        if (!(file instanceof Blob)) {
            return NextResponse.json({ error: "File is required" }, { status: 400 })
        }

        const contentType = file.type || "application/octet-stream"
        if (ALLOWED_CONTENT_TYPES.length && !ALLOWED_CONTENT_TYPES.includes(contentType)) {
            return NextResponse.json({ error: "Unsupported file type" }, { status: 415 })
        }

        if (file.size === 0) {
            return NextResponse.json({ error: "Empty file" }, { status: 400 })
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            return NextResponse.json({ error: "File is too large" }, { status: 413 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const key = generateUploadKey(
            typeof providedName === "string" && providedName.length ? providedName : "upload"
        )

        await uploadBufferToS3(key, Buffer.from(arrayBuffer), contentType)
        const url = buildPublicUploadUrl(key)

        return NextResponse.json({ url, key })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Upload failed" },
            { status: 400 }
        )
    }
}
