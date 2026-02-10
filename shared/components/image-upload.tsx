"use client"

import { useRef, useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { ImageCropDialog } from "@/shared/components/image-crop-dialog"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE_BYTES = 5 * 1024 * 1024

interface ImageUploadProps {
  value?: string
  onFileSelect: (file: File, previewUrl: string) => void
  onRemove: () => void
  isLocal?: boolean
  aspectRatio?: number
  cropShape?: "rect" | "round"
}

export function ImageUpload({
  value,
  onFileSelect,
  onRemove,
  isLocal,
  aspectRatio,
  cropShape = "rect",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [cropSrc, setCropSrc] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (inputRef.current) {
      inputRef.current.value = ""
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Допустимые форматы: JPEG, PNG, WebP")
      return
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError("Максимальный размер файла — 5 МБ")
      return
    }

    setError(null)

    if (aspectRatio) {
      const objectUrl = URL.createObjectURL(file)
      setCropSrc(objectUrl)
    } else {
      const previewUrl = URL.createObjectURL(file)
      onFileSelect(file, previewUrl)
    }
  }

  const handleCropComplete = (croppedFile: File, previewUrl: string) => {
    if (cropSrc) {
      URL.revokeObjectURL(cropSrc)
    }
    setCropSrc(null)
    onFileSelect(croppedFile, previewUrl)
  }

  const handleCropCancel = () => {
    if (cropSrc) {
      URL.revokeObjectURL(cropSrc)
    }
    setCropSrc(null)
  }

  const aspectStyle = aspectRatio
    ? { aspectRatio: String(aspectRatio) }
    : undefined

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-fit max-w-md">
          <div
            className={`relative w-fit max-w-full overflow-hidden border ${!aspectStyle ? "" : ""
              } ${isLocal ? "border-dashed border-border/80 bg-muted/40" : ""} ${cropShape === "round" ? "rounded-full max-w-[200px]" : "rounded-lg"
              }`}
            style={aspectStyle}
          >
            <Image
              src={value}
              alt="Uploaded image"
              width={0}
              height={0}
              sizes="100vw"
              className={`h-auto w-auto max-w-full max-h-[400px] object-cover ${isLocal ? "opacity-80" : ""}`}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className={`absolute top-[-15px] right-[-15px] ${cropShape === "round" ? "top-0 right-0" : ""}`}
            onClick={onRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Загрузить изображение
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      )}

      {cropSrc && aspectRatio && (
        <ImageCropDialog
          open={!!cropSrc}
          onOpenChange={(open) => {
            if (!open) handleCropCancel()
          }}
          imageSrc={cropSrc}
          aspect={aspectRatio}
          cropShape={cropShape}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  )
}
