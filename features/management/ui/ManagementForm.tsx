"use client"

import { useState, useCallback } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Loader2, Plus, X } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import type { ManagementFormValues, ManagementFormPayload } from "@/shared/types/management"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Separator } from "@/shared/components/ui/separator"
import type { ReactNode } from "react"
import { ImageUpload } from "@/shared/components/image-upload"
import { uploadFile } from "@/shared/helpers/uploadFile"

type TempImage = {
  file: File
  url: string
}

interface ManagementFormProps {
  initialData?: Partial<ManagementFormValues>
  onSubmitAction: (data: ManagementFormPayload) => Promise<void>
  onDeleteAction?: ReactNode
}

export function ManagementForm({ initialData, onSubmitAction, onDeleteAction }: ManagementFormProps) {
  const { control, watch, handleSubmit, formState: { isSubmitting, errors }, setValue, getValues, setError } = useFormContext<ManagementFormValues>()

  const [newResponsibility, setNewResponsibility] = useState("")
  const [tempImage, setTempImage] = useState<TempImage | null>(null)

  const isLocalImage = useCallback((url: string) => tempImage?.url === url, [tempImage])

  const handleImageSelect = (file: File, previewUrl: string) => {
    if (tempImage) {
      URL.revokeObjectURL(tempImage.url)
    }
    setTempImage({ file, url: previewUrl })
    setValue("image", previewUrl, { shouldDirty: true })
  }

  const handleImageRemove = () => {
    if (tempImage) {
      URL.revokeObjectURL(tempImage.url)
      setTempImage(null)
    }
    setValue("image", "", { shouldDirty: true })
  }

  const watchedResponsibilities = watch("responsibilities") ?? []
  const isDirector = watch("isDirector")

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      const current = getValues("responsibilities") ?? []
      setValue("responsibilities", [...current, newResponsibility.trim()], { shouldDirty: true })
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    const current = [...(getValues("responsibilities") ?? [])]
    current.splice(index, 1)
    setValue("responsibilities", current, { shouldDirty: true })
  }

  const onSubmit = async (data: ManagementFormValues) => {
    try {
      let imageUrl = data.image ?? ""
      let uploadKey: string | undefined

      if (tempImage && isLocalImage(imageUrl)) {
        const result = await uploadFile(tempImage.file)
        imageUrl = result.url
        uploadKey = result.key
      }

      await onSubmitAction({
        ...data,
        image: imageUrl,
        uploadKey,
      })

      if (tempImage) {
        URL.revokeObjectURL(tempImage.url)
        setTempImage(null)
      }
    } catch (error) {
      if (error instanceof Error && error.name === "ValidationError" && "fields" in error && typeof error.fields === "object" && error.fields !== null) {
        Object.entries(error.fields).forEach(([name, { message }]) => setError(name as keyof ManagementFormValues, {
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
                Имя
              </FieldLabel>
              <FieldDescription className="text-xs">Полное имя должно содержать не менее 3 символов</FieldDescription>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Введите полное имя"
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
              <FieldDescription className="text-xs">Должность должна содержать не менее 3 символов</FieldDescription>
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
              <FieldDescription className="text-xs">Отдел должен содержать не менее 2 символов</FieldDescription>
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

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="description">
                Описание
              </FieldLabel>
              <FieldDescription className="text-xs">Краткое описание или биография</FieldDescription>
              <Textarea
                {...field}
                id="description"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Введите описание"
                rows={4}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Image Upload */}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="image">
                Фотография
              </FieldLabel>
              <FieldDescription className="text-xs">Загрузите фотографию сотрудника</FieldDescription>
              <ImageUpload
                value={field.value}
                onFileSelect={handleImageSelect}
                onRemove={handleImageRemove}
                isLocal={!!field.value && isLocalImage(field.value)}
                aspectRatio={isDirector ? 3 / 4 : 3 / 2}
                cropShape="rect"
              />
            </Field>
          )}
        />
        <Separator />

        {/* Director-specific fields */}
        {isDirector && (
          <>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="phone">
                    Телефон
                  </FieldLabel>
                  <FieldDescription className="text-xs">Контактный телефон директора</FieldDescription>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Например: +375 (29) 123-45-67"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Separator />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
                  <FieldDescription className="text-xs">Контактный email директора</FieldDescription>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Например: director@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Separator />
          </>
        )}

        {/* Specialist-specific fields */}
        {!isDirector && (
          <>
            <Field>
              <FieldLabel>Обязанности</FieldLabel>
              <FieldDescription className="text-xs">Добавьте основные обязанности специалиста</FieldDescription>
              <div className="space-y-2">
                {watchedResponsibilities.map((resp, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={resp} disabled className="flex-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeResponsibility(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    placeholder="Добавить обязанность"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addResponsibility()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addResponsibility}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Field>
            <Separator />
          </>
        )}
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
