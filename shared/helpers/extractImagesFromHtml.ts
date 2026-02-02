import { isManagedUploadUrl } from "../lib/uploads"

export function extractImageUrls(html: string): string[] {
    const imgRegex = /<img[^>]+src="([^">]+)"/g
    const urls: string[] = []
    let match: RegExpExecArray | null

    while ((match = imgRegex.exec(html)) !== null) {
        if (match[1]) {
            urls.push(match[1])
        }
    }

    return urls
}

export function findRemovedImages(oldHtml: string, newHtml: string): string[] {
    const oldUrls = extractImageUrls(oldHtml).filter(isManagedUploadUrl)
    const newUrls = extractImageUrls(newHtml).filter(isManagedUploadUrl)

    return oldUrls.filter(url => !newUrls.includes(url))
}

export { isManagedUploadUrl }
