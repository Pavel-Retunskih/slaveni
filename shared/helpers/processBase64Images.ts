import { uploadFile, type UploadResult } from "./uploadFile"

export interface Base64Image {
  dataUrl: string
  mimeType: string
  data: string
}

export function extractBase64Images(html: string): Base64Image[] {
  const imgRegex = /<img[^>]+src="(data:image\/([^;]+);base64,([^"]+))"/g
  const images: Base64Image[] = []
  let match: RegExpExecArray | null

  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1] && match[2] && match[3]) {
      images.push({
        dataUrl: match[1],
        mimeType: `image/${match[2]}`,
        data: match[3],
      })
    }
  }

  return images
}

export function base64ToFile(base64Data: string, mimeType: string, filename: string): File {
  const byteString = atob(base64Data)
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  const blob = new Blob([uint8Array], { type: mimeType })
  return new File([blob], filename, { type: mimeType })
}

export async function uploadBase64Images(images: Base64Image[]): Promise<Map<string, UploadResult>> {
  const uploadMap = new Map<string, UploadResult>()

  const uploadPromises = images.map(async (image, index) => {
    const extension = image.mimeType.split("/")[1] || "png"
    const filename = `image-${Date.now()}-${index}.${extension}`
    const file = base64ToFile(image.data, image.mimeType, filename)
    const result = await uploadFile(file)
    uploadMap.set(image.dataUrl, result)
  })

  await Promise.all(uploadPromises)
  return uploadMap
}

export function replaceBase64WithUrls(html: string, uploadMap: Map<string, UploadResult>): string {
  let result = html

  uploadMap.forEach((uploadResult, dataUrl) => {
    result = result.replace(new RegExp(escapeRegExp(dataUrl), "g"), uploadResult.url)
  })

  return result
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
