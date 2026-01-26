"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
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
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                Отправить сообщение
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Имя
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background"
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
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                  Организация
                </label>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Название компании"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  placeholder="Ваше сообщение..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Отправить
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
