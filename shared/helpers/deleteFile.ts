export async function deleteFile(urls: string | string[]): Promise<void> {
    const response = await fetch("/api/blob/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete file")
    }
}
