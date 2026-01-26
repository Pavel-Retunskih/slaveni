import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { loadNews } from "@/helpers/loadNews"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function NewsPage() {

  const { featuredNews, regularNews } = await loadNews()

  return (
    <main className="font-sans">
      <Header />

      <section className="pt-32 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Пресс-центр</span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Новости предприятия
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Актуальные события и достижения ЗАО «Большие Славени»
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredNews.map((item) => {
            return <FadeIn delay={0.2} key={item.id}>
              <Link href={`/news/${item.id}`}>
                <Card className="mb-12 overflow-hidden border-primary/20 bg-primary/5">
                  <CardContent className="p-8 md:p-12">
                    <Badge className="mb-4 bg-primary text-primary-foreground">{item.category}</Badge>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {item.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(item.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          })}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item, index) => (
              <FadeIn key={item.id} delay={0.1 * index}>
                <Link href={`/news/${item.id}`}>
                  <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6} className="mt-12 text-center">
            <Link
              href="https://udp.gov.by/ru/podchinennye-organizatsii-ru/getElement/5517"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Больше новостей на официальном сайте УДП
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
