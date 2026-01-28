"use client"

import { useState, useRef } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Validator } from "@/shared/helpers/Validator"
import { uploadFile } from "@/shared/helpers/uploadFile"
import type { NewsFormValues, NewsFormPayload } from "@/shared/types/news"
import { BlobAccessError } from "@vercel/blob"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Separator } from "@/shared/components/ui/separator"
import { Switch } from "@/shared/components/ui/switch"
import { NewsImagesField } from "./NewsImageField"
import { RichTextEditor } from "@/shared/components/ui/rich-text-editor"

export type NewsCreateData = NewsFormValues

type TempImage = {
  file: File
  url: string
}

const newsSchema = z.object({
  title: z.string().min(1, "Название должно содержать не менее 10 символов"),
  excerpt: z.string().min(3, "Краткое описание должно содержать не менее 30 символов"),
  category: z.string().min(3, "Категория должна содержать не менее 3 символов"),
  featured: z.boolean(),
  content: z.string().min(10, "Содержимое должно содержать не менее 100 символов"),
})

interface NewsFormProps {
  initialData?: Partial<NewsCreateData>
  onSubmitAction: (data: NewsFormPayload) => Promise<void>
}

export function NewsForm({ initialData, onSubmitAction }: NewsFormProps) {
  const defaultValues: NewsCreateData = {
    title: "",
    excerpt: "",
    category: "",
    featured: false,
    content: "",
    images: [],
  }

  const { control, register, handleSubmit, watch, formState: { isSubmitting, errors }, setValue, getValues, setError, clearErrors } = useForm<NewsCreateData>({
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
    try {
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
    } catch (error) {
      if (error instanceof BlobAccessError) {
        setError("images", {
          type: "manual",
          message: error.message,
        })
      }
      if (error instanceof Error && error.name === "ValidationError" && "fields" in error && typeof error.fields === "object" && error.fields !== null) {
        Object.entries(error.fields).forEach(([name, { message }]) => setError(name as keyof NewsCreateData, {
          type: "manual",
          message,
        }))
      }
    }
  }
  console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <FieldGroup>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">
                Заголовок
              </FieldLabel>
              <FieldDescription className="text-xs">Заголовок новости должен содержать не менее 10 символов</FieldDescription>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Введите заголовок новости"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />
        {/* Category */}
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="category">
                Категория
              </FieldLabel>
              <FieldDescription className="text-xs">Категория новости должна содержать не менее 3 символов</FieldDescription>
              <Input
                {...field}
                id="category"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Введите категорию"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />
        {/* Excerpt */}
        <Controller name="excerpt" control={control} render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="excerpt">
              Краткое описание
            </FieldLabel>
            <FieldDescription className="text-xs">Краткое описание должно содержать не менее 30 символов</FieldDescription>
            <Textarea
              {...field}
              id="excerpt"
              required
              placeholder="Введите краткое описание для превью"
              rows={3}
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Separator />
        {/* Featured toggle */}
        <Controller name="featured" control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldDescription>Отображает новость как главную на странице</FieldDescription>
            <div className="flex items-center gap-2">
              <Switch onCheckedChange={(checked) => {
                field.onChange(checked)
              }} />
              <FieldLabel htmlFor="featured">
                Отображать как главную новость
              </FieldLabel>
            </div>

          </Field>
        )} />
        <Separator />
        {/* Image upload */}
        <Controller
          name="images"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <NewsImagesField
                images={watchedImages}
                tempImages={tempImages}
                onRemoveImage={removePersistedImage}
                onRemoveTempImage={removeTempImage}
                onSelectImages={handleImageSelect}
                fileInputRef={fileInputRef}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>

          )}
        />
        <Separator />
        {/* Content editor */}

        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="content">
                Главная часть новости с подробностями
              </FieldLabel>
              <FieldDescription className="text-xs">Содержимое новости должно содержать не менее 100 символов</FieldDescription>
              <div className="border border-border rounded-lg overflow-hidden">
                <RichTextEditor
                  value={field.value}
                  onChange={(html) => setValue("content", html)}
                />
              </div>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      {/* Submit button */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
          {isSubmitting ? (
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

