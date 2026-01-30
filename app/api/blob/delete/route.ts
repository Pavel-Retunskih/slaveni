import { del } from "@vercel/blob"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/shared/auth/options"

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

        await del(urls, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Delete error:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Delete failed" },
            { status: 400 }
        )
    }
}
