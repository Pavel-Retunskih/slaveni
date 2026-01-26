export function About() {
  const stats = [
    { number: "6 526", label: "Га земель" },
    { number: "4 430", label: "Га пашни" },
    { number: "4", label: "Комплекса" },
    { number: "58%", label: "Доля молока" },
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">О предприятии</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            ЗАО «Большие Славени»
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              За ЗАО «Большие Славени» закреплено 6 526 га земель, из них 6 015 га сельскохозяйственных 
              угодий, в том числе 4 430 га пашни. Предприятие является частью структуры Управления 
              делами Президента Республики Беларусь.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Закрытое акционерное общество «Большие Славени» является сельскохозяйственным 
              предприятием, специализирующимся на производстве продукции мясомолочного скотоводства 
              с развитым зерновым хозяйством. Доля реализации молока составляет 58,2%, крупного 
              рогатого скота — 28,5%.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Расположено в Шкловском районе Могилевской области. Директор предприятия — 
              Барташевич Иван Николаевич.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="font-serif text-4xl md:text-5xl font-bold text-primary">{stat.number}</div>
                <div className="mt-2 text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
