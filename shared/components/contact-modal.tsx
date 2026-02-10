"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog"
import { contactFormSchema, type ContactFormValues } from "@/shared/types/contact"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      message: "",
    },
  })

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset()
    }
    onOpenChange(value)
  }

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // TODO: replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      toast.success("Сообщение отправлено", {
        description: "Мы свяжемся с вами в ближайшее время",
      })
      reset()
      onOpenChange(false)
    } catch {
      toast.error("Ошибка отправки", {
        description: "Попробуйте ещё раз позже",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Свяжитесь с нами</DialogTitle>
          <DialogDescription>
            Заполните форму и мы свяжемся с вами в ближайшее время
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="modal-name">Имя</FieldLabel>
                  <Input
                    {...field}
                    id="modal-name"
                    placeholder="Ваше имя"
                    aria-invalid={fieldState.invalid}
                    className="bg-background"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="modal-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="modal-email"
                    type="email"
                    placeholder="your@email.com"
                    aria-invalid={fieldState.invalid}
                    className="bg-background"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="organization"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="modal-organization">
                  Организация <span className="text-muted-foreground font-normal">(необязательно)</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="modal-organization"
                  placeholder="Название компании"
                  className="bg-background"
                />
              </Field>
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="modal-message">Сообщение</FieldLabel>
                <Textarea
                  {...field}
                  id="modal-message"
                  placeholder="Ваше сообщение..."
                  rows={4}
                  aria-invalid={fieldState.invalid}
                  className="bg-background resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Отправка...
              </>
            ) : (
              "Отправить"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
