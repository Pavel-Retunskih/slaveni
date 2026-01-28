import Image from "next/image"
import { ImagePlus, X } from "lucide-react"

import { Field, FieldDescription, FieldLabel } from "@/shared/components/ui/field"
import { ChangeEvent, MutableRefObject, RefObject } from "react"

interface NewsImagesFieldProps {
    images: string[]
    tempImages: Array<{ url: string }>
    onRemoveImage: (index: number) => void
    onRemoveTempImage: (index: number) => void
    onSelectImages: (event: ChangeEvent<HTMLInputElement>) => void
    fileInputRef: RefObject<HTMLInputElement> | MutableRefObject<HTMLInputElement | null>
}

export function NewsImagesField({
    images,
    tempImages,
    onRemoveImage,
    onRemoveTempImage,
    onSelectImages,
    fileInputRef,
}: NewsImagesFieldProps) {
    return (
        <Field>
            <FieldLabel>
                Изображения
            </FieldLabel>
            <FieldDescription>Изображения до 5 МБ, формат: .jpg, .png</FieldDescription>
            <div className="flex flex-wrap gap-4">
                {images.map((url, index) => (
                    <div key={`${url}-${index}`} className="relative group">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border border-border">
                            <Image
                                src={url}
                                alt={`Image ${index + 1}`}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => onRemoveImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {tempImages.map(({ url }, index) => (
                    <div key={`temp-${index}`} className="relative group">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border border-dashed border-border">
                            <Image
                                src={url}
                                alt={`Temp image ${index + 1}`}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => onRemoveTempImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-muted text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

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
