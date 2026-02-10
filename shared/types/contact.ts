import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(100, "Имя не должно превышать 100 символов"),
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  organization: z.string().optional(),
  message: z
    .string()
    .min(10, "Сообщение должно содержать не менее 10 символов")
    .max(2000, "Сообщение не должно превышать 2000 символов"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
