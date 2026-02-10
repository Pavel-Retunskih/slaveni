export interface CroppedAreaPixels {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Creates a cropped image File from a source image and crop area.
 * Uses canvas to draw the cropped region and exports as JPEG blob.
 */
export async function getCroppedImage(
  imageSrc: string,
  croppedAreaPixels: CroppedAreaPixels,
  quality = 0.9,
): Promise<File> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  )

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))),
      "image/jpeg",
      quality,
    )
  })

  return new File([blob], "cropped.jpg", { type: "image/jpeg" })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
    img.src = src
  })
}
