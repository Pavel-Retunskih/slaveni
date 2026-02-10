"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MapPin, Phone, Mail, Clock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { contactFormSchema, type ContactFormValues } from "@/shared/types/contact"

export function Contact() {
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // TODO: replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      toast.success("Сообщение отправлено", {
        description: "Мы свяжемся с вами в ближайшее время",
      })
      reset()
    } catch {
      toast.error("Ошибка отправки", {
        description: "Попробуйте ещё раз позже",
      })
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Адрес",
      content: "213015, Могилевская обл., Шкловский р-н, аг. Малые Словени, ул. Юбилейная, 12",
    },
    {
      icon: Phone,
      title: "Телефон/факс",
      content: "+375 (2239) 7-79-44",
    },
    {
      icon: Mail,
      title: "Email",
      content: "greater_slaveni@udp.gov.by",
    },
    {
      icon: Clock,
      title: "Режим работы",
      content: "Пн-Пт: 8:00 - 17:00",
    },
  ]

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Контакты</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Свяжитесь с нами
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Готовы ответить на ваши вопросы и обсудить сотрудничество
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-lg p-6 md:p-8">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                Отправить сообщение
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Имя</FieldLabel>
                      <Input
                        {...field}
                        id="name"
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
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="email"
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
              <div className="mb-4">
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="organization">
                        Организация <span className="text-muted-foreground font-normal">(необязательно)</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="organization"
                        placeholder="Название компании"
                        className="bg-background"
                      />
                    </Field>
                  )}
                />
              </div>
              <div className="mb-6">
                <Controller
                  name="message"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="message">Сообщение</FieldLabel>
                      <Textarea
                        {...field}
                        id="message"
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
              </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}
