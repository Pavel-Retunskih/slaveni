import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Medal, Shield, Star, Trophy } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { loadHonorees } from "@/helpers/loadHonorees"

const departmentIconMap: { test: (value: string) => boolean; icon: typeof Award }[] = [
  { test: (value) => /руковод/i.test(value), icon: Trophy },
  { test: (value) => /агро|раст/i.test(value), icon: Medal },
  { test: (value) => /животн|мтк|ферм/i.test(value), icon: Star },
  { test: (value) => /ветерин|безопас/i.test(value), icon: Shield },
]

function pickDepartmentIcon(department?: string | null) {
  if (!department) {
    return Award
  }

  const normalized = department.trim()
  const match = departmentIconMap.find(({ test }) => test(normalized))

  return match?.icon ?? Award
}

export default async function HonorBoardPage() {
  const honorees = await loadHonorees()

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
                      {(() => {
                        const Icon = pickDepartmentIcon(person.department)
                        return <Icon className="w-10 h-10 text-primary" />
                      })()}
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

    </main>
  )
}
