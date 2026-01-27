"use client"

import { useState, useRef } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { SimpleEditor } from "@/shared/components/ui/tiptap-templates/simple/simple-editor"
import { ImagePlus, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Validator } from "@/shared/helpers/Validator"
import { uploadFile } from "@/shared/helpers/uploadFile"
import type { NewsFormValues, NewsFormPayload } from "@/shared/types/news"

export type NewsCreateData = NewsFormValues

type TempImage = {
  file: File
  url: string
}

const newsSchema = z.object({
  title: z.string().min(10, "Название должно содержать не менее 10 символов"),
  excerpt: z.string().min(30, "Краткое описание должно содержать не менее 30 символов"),
  category: z.string().min(3, "Категория должна содержать не менее 3 символов"),
  featured: z.boolean(),
  content: z.string().min(100, "Содержимое должно содержать не менее 100 символов"),
})

interface NewsFormProps {
  initialData?: Partial<NewsCreateData>
  onSubmitAction: (data: NewsFormPayload) => Promise<void>
  isSubmitting?: boolean
}

export function NewsForm({ initialData, onSubmitAction, isSubmitting = false }: NewsFormProps) {
  const defaultValues: NewsCreateData = {
    title: "",
    excerpt: "",
    category: "",
    featured: false,
    content: "",
    images: [],
  }

  const { register, handleSubmit, watch, formState: { isSubmitting: formSubmitting, errors }, setValue, getValues, setError, clearErrors } = useForm<NewsCreateData>({
    defaultValues: { ...defaultValues, ...initialData },
    resolver: zodResolver(newsSchema),
    mode: "onSubmit",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tempImages, setTempImages] = useState<TempImage[]>([])
  const watchedImages = watch("images") ?? []

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (!files?.length) return
    if (!Validator.validateImageUpload(files)) {
      setError("images", {
        type: "manual",
        message: "Неверный формат файла",
      })
      return
    }
    setTempImages((prev) => [
      ...prev,
      ...files.map<TempImage>((file) => ({ file, url: URL.createObjectURL(file) })),
    ])
  }
  const removePersistedImage = (index: number) => {
    setValue("images", getValues("images").filter((_, i) => i !== index))
  }

  const removeTempImage = (index: number) => {
    const { url } = tempImages[index]
    URL.revokeObjectURL(url)
    setTempImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: NewsCreateData) => {
    const persistedImages = getValues("images")
    const uploads = await Promise.all(tempImages.map(({ file }) => uploadFile(file)))
    await onSubmitAction({
      ...data,
      images: [...persistedImages, ...uploads.map(({ url }) => url)],
      uploadPathnames: uploads.map(({ pathname }) => pathname),
    })
    tempImages.forEach(({ url }) => URL.revokeObjectURL(url))
    setTempImages([])
    if (fileInputRef.current) fileInputRef.current.value = ""
    clearErrors("images")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-foreground">
          Заголовок
        </label>
        <Input
          {...register("title")}
          id="title"
          required
          placeholder="Введите заголовок новости"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium text-foreground">
          Категория
        </label>
        <Input
          {...register("category")}
          id="category"
          required
          placeholder="Введите категорию"
        />
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <label htmlFor="excerpt" className="block text-sm font-medium text-foreground">
          Краткое описание
        </label>
        <Textarea
          {...register("excerpt")}
          id="excerpt"
          required
          placeholder="Введите краткое описание для превью"
          rows={3}
        />
      </div>

      {/* Featured toggle */}
      <div className="flex items-center gap-3">
        <Input
          type="checkbox"
          id="featured"
          {...register("featured")}
          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
        />
        <label htmlFor="featured" className="text-sm font-medium text-foreground">
          Отображать на главной странице
        </label>
      </div>

      {/* Image upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Изображения, формат: .jpg, .png, размер: до 5 МБ
        </label>
        <div className="flex flex-wrap gap-4">
          {watchedImages.map((url, index) => (
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
                onClick={() => removePersistedImage(index)}
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
                onClick={() => removeTempImage(index)}
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
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Content editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Содержимое
        </label>
        <div className="border border-border rounded-lg overflow-hidden">
          <SimpleEditor
            content={getValues("content")}
            onChange={(html) => setValue("content", html)}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" disabled={(isSubmitting || formSubmitting) || Object.keys(errors).length > 0}>
          {(isSubmitting || formSubmitting) ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Сохранение...
            </>
          ) : (
            "Сохранить"
          )}
        </Button>
      </div>
    </form>
  )
}
