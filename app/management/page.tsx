import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Building2 } from "lucide-react"
import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

const director = {
  name: "Барташевич Иван Николаевич",
  position: "Директор",
  department: "Руководство предприятия",
  description: "Осуществляет общее руководство деятельностью ЗАО «Большие Славени». Отвечает за стратегическое развитие предприятия, координацию работы всех подразделений и выполнение производственных показателей.",
  phone: "+375 (2239) 7-79-44",
  email: "greater_slaveni@udp.gov.by",
  image: "/images/director.jpg",
}

const specialists = [
  {
    name: "Главный зоотехник",
    position: "Главный зоотехник",
    department: "Животноводство",
    description: "Руководит зоотехнической службой предприятия. Отвечает за организацию племенной работы, кормление и содержание животных, повышение продуктивности стада.",
    responsibilities: ["Племенная работа", "Кормление КРС", "Контроль продуктивности"],
    image: "/images/specialist-1.jpg",
  },
  {
    name: "Главный ветеринарный врач",
    position: "Главный ветврач",
    department: "Ветеринарная служба",
    description: "Обеспечивает ветеринарно-санитарное благополучие хозяйства. Организует профилактические и лечебные мероприятия, контролирует качество продукции.",
    responsibilities: ["Профилактика заболеваний", "Лечебная работа", "Ветсанконтроль"],
    image: "/images/specialist-2.jpg",
  },
  {
    name: "Главный агроном",
    position: "Главный агроном",
    department: "Растениеводство",
    description: "Руководит растениеводческой отраслью хозяйства. Планирует севообороты, контролирует агротехнические мероприятия, обеспечивает кормовую базу для животноводства.",
    responsibilities: ["Планирование севооборотов", "Агротехника", "Кормопроизводство"],
    image: "/images/specialist-3.jpg",
  },
  {
    name: "Главный инженер",
    position: "Главный инженер",
    department: "Инженерная служба",
    description: "Отвечает за техническое обеспечение производства. Руководит эксплуатацией и ремонтом техники, оборудования молочно-товарных комплексов.",
    responsibilities: ["Техническое обеспечение", "Ремонт техники", "Эксплуатация МТК"],
    image: "/images/specialist-4.jpg",
  },
  {
    name: "Главный бухгалтер",
    position: "Главный бухгалтер",
    department: "Бухгалтерия",
    description: "Организует бухгалтерский учет хозяйственной деятельности. Обеспечивает своевременное составление отчетности, контролирует финансовую дисциплину.",
    responsibilities: ["Бухгалтерский учет", "Финансовая отчетность", "Налоговый учет"],
    image: "/images/specialist-5.jpg",
  },
  {
    name: "Главный экономист",
    position: "Главный экономист",
    department: "Экономическая служба",
    description: "Осуществляет экономическое планирование и анализ деятельности предприятия. Разрабатывает бизнес-планы, контролирует себестоимость продукции.",
    responsibilities: ["Экономический анализ", "Планирование", "Контроль затрат"],
    image: "/images/specialist-6.jpg",
  },
]

export default function ManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-8 md:py-12">
          <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Руководство предприятия
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Команда профессионалов, обеспечивающая эффективную работу ЗАО «Большие Славени»
            </p>
          </FadeIn>
        </section>

        {/* Director Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-12">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Директор</span>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Руководитель предприятия
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-auto bg-muted">
                      <Image
                        src={director.image || "/placeholder.svg"}
                        alt={director.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                        {director.department}
                      </Badge>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                        {director.name}
                      </h3>
                      <p className="text-primary font-medium mb-4">{director.position}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {director.description}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Phone className="w-5 h-5 text-primary" />
                          <span>{director.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Mail className="w-5 h-5 text-primary" />
                          <span>{director.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        {/* Specialists Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Специалисты</span>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Главные специалисты
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Квалифицированные руководители служб, обеспечивающие высокие производственные показатели
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map((specialist) => (
                <FadeIn key={specialist.position} delay={0.2}>
                  <Card className="overflow-hidden hover:shadow-lg pt-0 transition-shadow">
                    <div className="relative bg-muted">
                      <Image
                        src={specialist.image || "/placeholder.svg"}
                        alt={specialist.position}
                        width={800}
                        height={534}
                        className="w-full h-auto object-contain"
                      />
                      <Badge className="bg-white/90 absolute bottom-4 left-4 right-4 text-foreground hover:bg-white">
                        {specialist.department}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                        {specialist.name}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-3">{specialist.position}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {specialist.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {specialist.responsibilities.map((resp) => (
                          <span
                            key={resp}
                            className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                          >
                            {resp}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn delay={0.6}>
              <div className="bg-card border border-border rounded-lg p-8">
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Связаться с руководством
                </h3>
                <p className="text-muted-foreground mb-4">
                  По вопросам сотрудничества и партнерства обращайтесь в приемную директора
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+375 (2239) 7-79-44</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>greater_slaveni@udp.gov.by</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

    </div>
  )
}
