"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Loader2, Plus, X } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import type { VacancyFormValues, VacancyFormPayload } from "@/shared/types/vacancy"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Separator } from "@/shared/components/ui/separator"
import { Switch } from "@/shared/components/ui/switch"
import type { ReactNode } from "react"

interface VacancyFormProps {
  initialData?: Partial<VacancyFormValues>
  onSubmitAction: (data: VacancyFormPayload) => Promise<void>
  onDeleteAction?: ReactNode
}

export function VacancyForm({ initialData, onSubmitAction, onDeleteAction }: VacancyFormProps) {
  const { control, watch, handleSubmit, formState: { isSubmitting, errors }, setValue, getValues, setError } = useFormContext<VacancyFormValues>()

  const [newRequirement, setNewRequirement] = useState("")
  const [newDuty, setNewDuty] = useState("")
  const [newBenefit, setNewBenefit] = useState("")

  const watchedRequirements = watch("requirements") ?? []
  const watchedDuties = watch("duties") ?? []
  const watchedBenefits = watch("benefits") ?? []

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const current = getValues("requirements") ?? []
      setValue("requirements", [...current, newRequirement.trim()], { shouldDirty: true })
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    const current = [...(getValues("requirements") ?? [])]
    current.splice(index, 1)
    setValue("requirements", current, { shouldDirty: true })
  }

  const addDuty = () => {
    if (newDuty.trim()) {
      const current = getValues("duties") ?? []
      setValue("duties", [...current, newDuty.trim()], { shouldDirty: true })
      setNewDuty("")
    }
  }

  const removeDuty = (index: number) => {
    const current = [...(getValues("duties") ?? [])]
    current.splice(index, 1)
    setValue("duties", current, { shouldDirty: true })
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const current = getValues("benefits") ?? []
      setValue("benefits", [...current, newBenefit.trim()], { shouldDirty: true })
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    const current = [...(getValues("benefits") ?? [])]
    current.splice(index, 1)
    setValue("benefits", current, { shouldDirty: true })
  }

  const onSubmit = async (data: VacancyFormValues) => {
    try {
      await onSubmitAction(data)
    } catch (error) {
      if (error instanceof Error && error.name === "ValidationError" && "fields" in error && typeof error.fields === "object" && error.fields !== null) {
        Object.entries(error.fields).forEach(([name, { message }]) => setError(name as keyof VacancyFormValues, {
          type: "manual",
          message,
        }))
      }
    }
  }

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
                Название вакансии
              </FieldLabel>
              <FieldDescription className="text-xs">Название должно содержать не менее 3 символов</FieldDescription>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Введите название вакансии"
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

        {/* Type */}
        <Controller
          name="type"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="type">
                Тип занятости
              </FieldLabel>
              <Input
                {...field}
                id="type"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Например: Полная занятость, Частичная занятость"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Salary */}
        <Controller
          name="salary"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="salary">
                Заработная плата (необязательно)
              </FieldLabel>
              <Input
                {...field}
                id="salary"
                aria-invalid={fieldState.invalid}
                placeholder="Например: от 1000 BYN"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Separator />

        {/* Requirements */}
        <Field>
          <FieldLabel>Требования</FieldLabel>
          <FieldDescription className="text-xs">Добавьте требования к кандидату</FieldDescription>
          <div className="space-y-2">
            {watchedRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={req} disabled className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Добавить требование"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addRequirement()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addRequirement}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Field>
        <Separator />

        {/* Duties */}
        <Field>
          <FieldLabel>Обязанности</FieldLabel>
          <FieldDescription className="text-xs">Добавьте обязанности сотрудника</FieldDescription>
          <div className="space-y-2">
            {watchedDuties.map((duty, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={duty} disabled className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDuty(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newDuty}
                onChange={(e) => setNewDuty(e.target.value)}
                placeholder="Добавить обязанность"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addDuty()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addDuty}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Field>
        <Separator />

        {/* Benefits */}
        <Field>
          <FieldLabel>Преимущества</FieldLabel>
          <FieldDescription className="text-xs">Добавьте преимущества работы</FieldDescription>
          <div className="space-y-2">
            {watchedBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={benefit} disabled className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Добавить преимущество"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addBenefit()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addBenefit}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Field>
        <Separator />

        {/* Urgent toggle */}
        <Controller name="urgent" control={control} render={({ field }) => (
          <Field>
            <FieldDescription>
              <span>Отметить вакансию как срочную</span>
            </FieldDescription>
            <div className="flex items-center gap-2">
              <Switch id="urgent" onCheckedChange={field.onChange} checked={field.value} />
              <FieldLabel htmlFor="urgent">
                Срочная вакансия
              </FieldLabel>
            </div>
          </Field>
        )} />
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
