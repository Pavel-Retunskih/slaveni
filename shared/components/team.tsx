import { Building, Warehouse, Factory } from "lucide-react"

const complexes = [
  {
    name: "МТК «Славени-1»",
    capacity: "1 000 голов, в т.ч. 450 коров",
    year: "2006",
    icon: Building,
  },
  {
    name: "МТК «Славени-2»",
    capacity: "1 134 головы дойного стада",
    year: "2011",
    icon: Building,
  },
  {
    name: "МТК «Беланово»",
    capacity: "1 100 коров + 1 300 ремонтного молодняка",
    year: "2024",
    icon: Warehouse,
  },
  {
    name: "Комплекс откорма",
    capacity: "3 400 голов молодняка КРС",
    year: "2019 (реконструкция)",
    icon: Factory,
  },
]

export function Team() {
  return (
    <section id="team" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Инфраструктура</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Производственные комплексы
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Современные молочно-товарные комплексы, обеспечивающие высокую продуктивность 
            и качество продукции
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {complexes.map((complex) => (
            <div
              key={complex.name}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1 group text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <complex.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{complex.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{complex.capacity}</p>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Введен: {complex.year}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Руководство предприятия</h3>
          <p className="text-primary font-medium mb-1">Барташевич Иван Николаевич</p>
          <p className="text-muted-foreground">Директор ЗАО «Большие Славени»</p>
        </div>
      </div>
    </section>
  )
}
