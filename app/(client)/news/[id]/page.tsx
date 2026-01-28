import { loadNewsById } from "@/shared/helpers/loadNews"
import { loadNews } from "@/shared/helpers/loadNews"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"

export async function generateStaticParams() {
    const news = await loadNews()
    return news.featuredNews.map((news) => ({
        id: news.id
    }))
}

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button variant="ghost" size="sm" asChild className="mb-8">
                    <Link href="/news">
                        <ArrowLeft className="w-4 h-4" />
                        Назад к новостям
                    </Link>
                </Button>

                <Card className="overflow-hidden">
                    <CardHeader className="border-b">
                        <CardTitle className="text-3xl sm:text-4xl font-serif">
                            {news.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                            <time dateTime={news.createdAt.toISOString()}>
                                {new Date(news.createdAt).toLocaleDateString("ru-RU", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <Badge variant="secondary">{news.category}</Badge>
                        </div>
                    </CardHeader>

                    {news.excerpt && (
                        <>
                            <CardContent className="bg-muted/30">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {news.excerpt}
                                </p>
                            </CardContent>
                            <Separator />
                        </>
                    )}

                    {news.images && news.images.length > 0 && (
                        <>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {news.images.slice(0, 4).map((image, index) => (
                                        <div
                                            key={image}
                                            className={`relative aspect-video rounded-lg overflow-hidden bg-muted ${index === 0 && news.images.length > 1 ? "sm:col-span-2" : ""
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${news.title} - изображение ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <Separator />
                        </>
                    )}

                    <CardContent>
                        <div
                            className="ck-content prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}