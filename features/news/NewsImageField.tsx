import Image from "next/image"
import { ImagePlus, X } from "lucide-react"

import { Field, FieldDescription, FieldLabel } from "@/shared/components/ui/field"
import { ChangeEvent, MutableRefObject, RefObject } from "react"

interface NewsImagesFieldProps {
    images: string[]
    onRemoveImage: (index: number) => void
    onSelectImages: (event: ChangeEvent<HTMLInputElement>) => void
    fileInputRef: RefObject<HTMLInputElement> | MutableRefObject<HTMLInputElement | null>
    isLocalImage: (url: string) => boolean
}

export function NewsImagesField({
    images,
    onRemoveImage,
    onSelectImages,
    fileInputRef,
    isLocalImage,
}: NewsImagesFieldProps) {
    return (
        <Field>
            <FieldLabel>
                Изображения
            </FieldLabel>
            <FieldDescription>Изображения до 5 МБ, формат: .jpg, .png</FieldDescription>
            <div className="flex flex-wrap gap-4">
                {images.map((url, index) => {
                    const local = isLocalImage(url)
                    return (
                        <div key={`${url}-${index}`} className="relative group">
                            <div className={`w-32 h-32 rounded-lg overflow-hidden border ${local ? "border-dashed border-border/80 bg-muted/40" : "border-border"}`}>
                                <Image
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    width={128}
                                    height={128}
                                    className={`w-full h-full object-cover ${local ? "opacity-80" : ""}`}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemoveImage(index)}
                                className={`absolute -top-2 -right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${local ? "bg-muted text-foreground" : "bg-destructive text-white"}`}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )
                })}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <>
                        <ImagePlus className="w-6 h-6" />
                        <span className="text-xs">Добавить</span>
                    </>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onSelectImages}
                    className="hidden"
                />
            </div>
        </Field>
    )
}
