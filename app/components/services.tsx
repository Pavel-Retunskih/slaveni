import { Milk, Beef, Sprout, Warehouse } from "lucide-react"

const services = [
  {
    icon: Milk,
    title: "Молочное скотоводство",
    description: "Производство молока на современных молочно-товарных комплексах «Славени-1», «Славени-2» и «Беланово» общей мощностью более 2 500 голов коров.",
  },
  {
    icon: Beef,
    title: "Мясное скотоводство",
    description: "Выращивание и откорм молодняка КРС на комплексе мощностью 3 400 голов. Доля реализации мяса КРС составляет 28,5% от общего объема.",
  },
  {
    icon: Sprout,
    title: "Растениеводство",
    description: "Выращивание сельскохозяйственных культур на 4 430 га пашни. Развитое зерновое хозяйство обеспечивает кормовую базу для животноводства.",
  },
  {
    icon: Warehouse,
    title: "Производственные комплексы",
    description: "4 современных молочно-товарных комплекса: МТК «Славени-1» (2006 г.), МТК «Славени-2» (2011 г.), МТК «Беланово» (2024 г.) и комплекс откорма (2019 г.).",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Направления</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Полный цикл агропроизводства
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы контролируем каждый этап — от посева до поставки готовой продукции
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
