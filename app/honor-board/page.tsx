import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Medal, Trophy } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const honorees = [
  {
    name: "Барташевич Иван Николаевич",
    position: "Директор",
    department: "Руководство",
    achievement: "Руководство предприятием, обеспечение стабильного развития и модернизации производства",
    years: "Более 10 лет",
    icon: Trophy,
  },
  {
    name: "Ковалева Мария Александровна",
    position: "Главный зоотехник",
    department: "Животноводство",
    achievement: "Внедрение современных методов содержания КРС, повышение продуктивности стада",
    years: "15 лет",
    icon: Star,
  },
  {
    name: "Сидорович Петр Михайлович",
    position: "Главный агроном",
    department: "Растениеводство",
    achievement: "Оптимизация севооборота, повышение урожайности зерновых культур",
    years: "20 лет",
    icon: Medal,
  },
  {
    name: "Новикова Елена Владимировна",
    position: "Оператор машинного доения",
    department: "МТК «Славени-1»",
    achievement: "Высокие показатели по надою молока, бережное отношение к животным",
    years: "12 лет",
    icon: Award,
  },
  {
    name: "Козлов Андрей Сергеевич",
    position: "Механизатор",
    department: "Механизация",
    achievement: "Отличное обслуживание техники, высокая производительность на полевых работах",
    years: "18 лет",
    icon: Medal,
  },
  {
    name: "Михайлова Татьяна Петровна",
    position: "Ветеринарный врач",
    department: "Ветеринарная служба",
    achievement: "Обеспечение здоровья поголовья, профилактика заболеваний",
    years: "10 лет",
    icon: Star,
  },
  {
    name: "Борисов Виктор Иванович",
    position: "Бригадир животноводов",
    department: "МТК «Беланово»",
    achievement: "Организация работы бригады, ввод в эксплуатацию нового комплекса",
    years: "8 лет",
    icon: Award,
  },
  {
    name: "Федорова Анна Николаевна",
    position: "Телятница",
    department: "МТК «Славени-2»",
    achievement: "Высокие показатели сохранности молодняка, ответственный подход к работе",
    years: "14 лет",
    icon: Medal,
  },
]

export default function HonorBoardPage() {
  return (
    <main className="font-sans">
      <Header />
      
      <section className="pt-32 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Наши люди</span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Доска почета
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Лучшие работники ЗАО «Большие Славени», чей труд и преданность делу 
              обеспечивают успех нашего предприятия
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {honorees.map((person, index) => (
              <FadeIn key={person.name} delay={0.1 * index}>
                <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-border/50 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <person.icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {person.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-2">{person.position}</p>
                    <Badge variant="secondary" className="mb-4">{person.department}</Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {person.achievement}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">Стаж работы: {person.years}</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.8} className="mt-16">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Признание заслуг
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                ЗАО «Большие Славени» ценит каждого работника. Лучшие сотрудники регулярно 
                отмечаются благодарностями, премиями и наградами за высокие производственные 
                показатели и добросовестный труд.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
