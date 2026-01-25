"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Banknote, Clock, Briefcase, Phone, Mail, CheckCircle2 } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const vacancies = [
  {
    id: 1,
    title: "Оператор машинного доения",
    department: "МТК «Беланово»",
    type: "Полная занятость",
    salary: "от 1 200 BYN",
    requirements: [
      "Опыт работы в животноводстве приветствуется",
      "Ответственность и трудолюбие",
      "Готовность к сменному графику работы",
    ],
    duties: [
      "Доение коров на современном оборудовании",
      "Соблюдение санитарных норм",
      "Уход за доильным оборудованием",
    ],
    benefits: ["Официальное трудоустройство", "Обучение на рабочем месте", "Социальный пакет"],
    urgent: true,
  },
  {
    id: 2,
    title: "Тракторист-машинист",
    department: "Механизация",
    type: "Полная занятость",
    salary: "от 1 500 BYN",
    requirements: [
      "Удостоверение тракториста-машиниста категории B, C, D",
      "Опыт работы на сельхозтехнике от 2 лет",
      "Знание устройства тракторов и комбайнов",
    ],
    duties: [
      "Выполнение полевых работ",
      "Техническое обслуживание техники",
      "Участие в уборочных кампаниях",
    ],
    benefits: ["Конкурентная зарплата", "Премии по результатам", "Предоставление жилья"],
    urgent: false,
  },
  {
    id: 3,
    title: "Ветеринарный врач",
    department: "Ветеринарная служба",
    type: "Полная занятость",
    salary: "от 1 800 BYN",
    requirements: [
      "Высшее ветеринарное образование",
      "Опыт работы с КРС от 1 года",
      "Знание современных методов диагностики и лечения",
    ],
    duties: [
      "Профилактика и лечение заболеваний КРС",
      "Проведение вакцинации",
      "Контроль санитарного состояния",
    ],
    benefits: ["Профессиональный рост", "Современное оборудование", "Достойная оплата труда"],
    urgent: true,
  },
  {
    id: 4,
    title: "Скотник",
    department: "Комплекс откорма",
    type: "Полная занятость",
    salary: "от 1 000 BYN",
    requirements: [
      "Опыт работы в животноводстве приветствуется",
      "Физическая выносливость",
      "Ответственное отношение к работе",
    ],
    duties: [
      "Кормление и уход за молодняком КРС",
      "Поддержание чистоты в помещениях",
      "Наблюдение за состоянием животных",
    ],
    benefits: ["Стабильная зарплата", "Социальные гарантии", "Возможность обучения"],
    urgent: false,
  },
  {
    id: 5,
    title: "Агроном",
    department: "Растениеводство",
    type: "Полная занятость",
    salary: "от 1 600 BYN",
    requirements: [
      "Высшее агрономическое образование",
      "Опыт работы от 2 лет",
      "Знание современных агротехнологий",
    ],
    duties: [
      "Планирование севооборота",
      "Контроль состояния посевов",
      "Организация уборочных работ",
    ],
    benefits: ["Карьерный рост", "Служебный транспорт", "Премирование"],
    urgent: false,
  },
]

function ApplicationForm({ vacancyTitle }: { vacancyTitle: string }) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
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

export default function VacanciesPage() {
  return (
    <main className="font-sans">
      <Header />
      
      <section className="pt-32 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Карьера</span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Вакансии
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Присоединяйтесь к команде ЗАО «Большие Славени». Мы предлагаем стабильную 
              работу и достойные условия труда.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {vacancies.map((vacancy, index) => (
              <FadeIn key={vacancy.id} delay={0.1 * index}>
                <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {vacancy.urgent && (
                            <Badge className="bg-destructive text-white">Срочно</Badge>
                          )}
                          <Badge variant="secondary">{vacancy.department}</Badge>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {vacancy.title}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Banknote className="w-4 h-4" />
                        {vacancy.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {vacancy.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Шкловский р-н
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Требования:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {vacancy.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5 text-xs">&#9679;</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {vacancy.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Откликнуться
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-serif">Отклик на вакансию</DialogTitle>
                          <DialogDescription>{vacancy.title}</DialogDescription>
                        </DialogHeader>
                        <ApplicationForm vacancyTitle={vacancy.title} />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6} className="mt-16">
            <div className="bg-secondary rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Не нашли подходящую вакансию?
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Отправьте ваше резюме на нашу почту. Мы рассмотрим вашу кандидатуру и 
                    свяжемся с вами при появлении подходящей вакансии.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Телефон</p>
                      <p className="font-medium text-foreground">+375 (2239) 7-79-44</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">greater_slaveni@udp.gov.by</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
