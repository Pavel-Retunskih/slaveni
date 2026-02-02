export interface UploadResult {
    url: string
    key: string
}

export async function uploadFile(file: File): Promise<UploadResult> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("filename", file.name)

    const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({})) as { error?: string }
        throw new Error(error?.error ?? "Failed to upload file")
    }

    const data = await response.json() as UploadResult
    return data
}