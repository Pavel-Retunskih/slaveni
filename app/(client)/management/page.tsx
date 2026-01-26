import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Building2 } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { loadManagment } from "@/helpers/loadManagment"
import { SpecialistCard } from "@/entities/managment/SpecialistCard"
import { DirectorCard } from "@/entities/managment/DirectorCard"

export default async function ManagementPage() {
  const { director, specialists } = await loadManagment()
  console.log(specialists)

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

            {director ? (
              <FadeIn delay={0.2}>
                <DirectorCard director={director} />
              </FadeIn>
            ) : (
              <FadeIn delay={0.2}>
                <Card className="max-w-3xl mx-auto border-dashed border-primary/40">
                  <CardContent className="py-10 text-center space-y-4">
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      Информация о директоре временно недоступна
                    </h3>
                    <p className="text-muted-foreground">
                      Мы обновляем данные руководства. Пожалуйста, загляните позже или свяжитесь с нами для уточнения информации.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            )}
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
            {specialists.length > 0 ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map((specialist) => (
                <FadeIn key={specialist.position} delay={0.2}>
                  <SpecialistCard specialist={specialist} />
                </FadeIn>
              ))}
            </div> : (
              <FadeIn delay={0.2}>
                <Card className="max-w-3xl mx-auto border-dashed border-primary/40">
                  <CardContent className="py-10 text-center space-y-4">
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      Специалисты пока не добавлены
                    </h3>
                    <p className="text-muted-foreground">
                      Мы обновляем данные руководства. Пожалуйста, загляните позже или свяжитесь с нами для уточнения информации.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            )}

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
