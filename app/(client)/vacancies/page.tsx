import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Phone, Mail } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { loadVacancies } from "@/helpers/loadVacancies"
import { VacancyCard } from "@/entities/vacancy/VacancyCard"
import { VacancyForm } from "@/features/VacancyForm"

export default async function VacanciesPage() {
  const vacancies = await loadVacancies()

  const hasVacancies = vacancies.length > 0

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
          {hasVacancies ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {vacancies.map((vacancy, index) => (
                <FadeIn key={vacancy.id} delay={0.1 * index}>
                  <VacancyCard vacancy={vacancy} action={
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
                        <VacancyForm vacancyTitle={vacancy.title} />
                      </DialogContent>
                    </Dialog>
                  } />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">Актуальные вакансии скоро появятся. Следите за обновлениями.</p>
            </div>
          )}
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
