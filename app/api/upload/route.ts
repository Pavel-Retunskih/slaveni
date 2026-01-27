import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"

export async function POST(request: Request): Promise<NextResponse> {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as HandleUploadBody

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {
                return {
                    allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
                    addRandomSuffix: true,
                }
            },
        })

        return NextResponse.json(jsonResponse)
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Upload failed" },
            { status: 400 }
        )
    }
}
