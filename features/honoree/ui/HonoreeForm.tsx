"use client"

import { useState, useCallback } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import type { HonoreeFormValues, HonoreeFormPayload } from "@/shared/types/honoree"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Separator } from "@/shared/components/ui/separator"
import { ImageUpload } from "@/shared/components/image-upload"
import { uploadFile } from "@/shared/helpers/uploadFile"
import type { ReactNode } from "react"

type TempImage = {
  file: File
  url: string
}

interface HonoreeFormProps {
  initialData?: Partial<HonoreeFormValues>
  onSubmitAction: (data: HonoreeFormPayload) => Promise<void>
  onDeleteAction?: ReactNode
}

export function HonoreeForm({ initialData, onSubmitAction, onDeleteAction }: HonoreeFormProps) {
  const { control, handleSubmit, formState: { isSubmitting, errors }, setValue, setError } = useFormContext<HonoreeFormValues>()

  const [tempImage, setTempImage] = useState<TempImage | null>(null)

  const isLocalImage = useCallback((url: string) => tempImage?.url === url, [tempImage])

  const handleImageSelect = (file: File, previewUrl: string) => {
    if (tempImage) {
      URL.revokeObjectURL(tempImage.url)
    }
    setTempImage({ file, url: previewUrl })
    setValue("photo", previewUrl, { shouldDirty: true })
  }

  const handleImageRemove = () => {
    if (tempImage) {
      URL.revokeObjectURL(tempImage.url)
      setTempImage(null)
    }
    setValue("photo", "", { shouldDirty: true })
  }

  const onSubmit = async (data: HonoreeFormValues) => {
    try {
      let photoUrl = data.photo ?? ""
      const uploadKeys: string[] = []

      if (tempImage && isLocalImage(photoUrl)) {
        const result = await uploadFile(tempImage.file)
        photoUrl = result.url
        uploadKeys.push(result.key)
      }

      await onSubmitAction({
        ...data,
        photo: photoUrl,
        uploadKeys,
      })

      if (tempImage) {
        URL.revokeObjectURL(tempImage.url)
        setTempImage(null)
      }
    } catch (error) {
      if (error instanceof Error && error.name === "ValidationError" && "fields" in error && typeof error.fields === "object" && error.fields !== null) {
        Object.entries(error.fields).forEach(([name, { message }]) => setError(name as keyof HonoreeFormValues, {
          type: "manual",
          message,
        }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">
                ФИО
              </FieldLabel>
              <FieldDescription className="text-xs">Полное имя сотрудника</FieldDescription>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Введите ФИО"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Position */}
        <Controller
          name="position"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="position">
                Должность
              </FieldLabel>
              <FieldDescription className="text-xs">Должность сотрудника</FieldDescription>
              <Input
                {...field}
                id="position"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Введите должность"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Department */}
        <Controller
          name="department"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="department">
                Отдел
              </FieldLabel>
              <FieldDescription className="text-xs">Название отдела</FieldDescription>
              <Input
                {...field}
                id="department"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Введите название отдела"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Achievement */}
        <Controller
          name="achievement"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="achievement">
                Достижение
              </FieldLabel>
              <FieldDescription className="text-xs">Описание заслуг и достижений</FieldDescription>
              <Textarea
                {...field}
                id="achievement"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Опишите достижения сотрудника"
                rows={4}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Years */}
        <Controller
          name="years"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="years">
                Стаж работы
              </FieldLabel>
              <FieldDescription className="text-xs">Например: 15 лет, 3 года</FieldDescription>
              <Input
                {...field}
                id="years"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Введите стаж работы"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Photo */}
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="photo">
                Фотография
              </FieldLabel>
              <FieldDescription className="text-xs">Загрузите фотографию сотрудника (необязательно)</FieldDescription>
              <ImageUpload
                value={field.value}
                onFileSelect={handleImageSelect}
                onRemove={handleImageRemove}
                isLocal={!!field.value && isLocalImage(field.value)}
                aspectRatio={1}
                cropShape="round"
              />
            </Field>
          )}
        />
      </FieldGroup>

      {/* Submit button */}
      <div className="flex justify-between gap-4 pt-4">
        {onDeleteAction}
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
