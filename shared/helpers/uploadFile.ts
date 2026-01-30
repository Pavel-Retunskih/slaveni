import { upload } from "@vercel/blob/client"

export interface UploadResult {
    url: string
    downloadUrl: string
    pathname: string
}

export async function uploadFile(file: File): Promise<UploadResult> {
    const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
    })

    return {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
    }
}