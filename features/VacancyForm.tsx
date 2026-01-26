"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

interface Props {
    vacancyTitle: string
}

export function VacancyForm({ vacancyTitle }: Props) {
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Заявка отправлена</h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" aria-label={`Форма отклика на вакансию ${vacancyTitle}`}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    ФИО
                </label>
                <Input
                    id="name"
                    required
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Телефон
                </label>
                <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+375 XX XXX-XX-XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Сопроводительное письмо
                </label>
                <Textarea
                    id="message"
                    placeholder="Расскажите о себе и вашем опыте работы..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Отправить заявку
            </Button>
        </form>
    )
}
