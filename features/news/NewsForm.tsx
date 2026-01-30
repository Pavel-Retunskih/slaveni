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
import { Badge } from "@/shared/components/ui/badge"

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
  isPublished: z.boolean(),
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
    isPublished: false,
  }

  const { control, handleSubmit, watch, formState: { isSubmitting, errors }, setValue, getValues, setError, clearErrors } = useForm<NewsCreateData>({
    defaultValues: { ...defaultValues, ...initialData },
    resolver: zodResolver(newsSchema),
    mode: "onSubmit",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tempImages, setTempImages] = useState<TempImage[]>([])
  const watchedImages = watch("images") ?? []

  const initialIsPublished = initialData?.isPublished ?? defaultValues.isPublished
  const watchedIsPublished = watch("isPublished")
  const publicationHint = watchedIsPublished === initialIsPublished
    ? null
    : watchedIsPublished
      ? { title: "Новость будет опубликована после сохранения", action: "save" }
      : { title: "Новость будет снята с публикации после сохранения", action: "delete" }

  const initialFeatured = initialData?.featured ?? defaultValues.featured
  const watchedFeatured = watch("featured")
  const featuredHint = watchedFeatured === initialFeatured
    ? null
    : watchedFeatured
      ? { title: "Новость отобразится как главная после сохранения", action: "save" }
      : { title: "Новость не будет отображаться как главная после сохранения", action: "delete" }


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
        <div className="flex items-start justify-between">
          {/* Featured toggle */}
          <Controller name="featured" control={control} render={({ field }) => (
            <Field>
              <FieldDescription>
                <span>Отображает новость как главную на странице</span>
                {initialFeatured && (
                  <Badge className="ml-2">
                    Отображается
                  </Badge>
                )}
              </FieldDescription>
              <div className="flex items-center gap-2 relative">
                <Switch onCheckedChange={field.onChange} checked={field.value} />
                <FieldLabel htmlFor="featured">
                  Отображать как главную новость
                </FieldLabel>
                {featuredHint && (
                  <FieldDescription className={(featuredHint.action === 'save' ? 'text-green-500' : 'text-red-500') + ' absolute top-5 left-0'}>
                    {featuredHint.title}
                  </FieldDescription>
                )}
              </div>

            </Field>
          )} />

          {/* Published toggle */}
          <Controller
            name="isPublished"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldDescription className="flex items-center gap-2">
                  <span>Публикация новости на сайте</span>
                  {initialIsPublished && <Badge className="ml-2">
                    {"Опубликовано"}
                  </Badge>}
                </FieldDescription>

                <div className="flex items-center gap-2 relative">
                  <Switch onCheckedChange={field.onChange} checked={field.value} />
                  <FieldLabel htmlFor="isPublished">
                    Опубликовать новость
                  </FieldLabel>
                  {publicationHint && (
                    <FieldDescription className={(publicationHint.action === 'save' ? 'text-green-500' : 'text-red-500') + ' absolute top-5 left-0'}>
                      {publicationHint.title}
                    </FieldDescription>
                  )}
                </div>
              </Field>
            )}
          />
        </div>

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
    </form >
  )
}

