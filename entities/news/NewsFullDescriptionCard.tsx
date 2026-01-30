import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { NewsJSON } from "@/shared/api/db/models/News"
import { Badge } from "@/shared/components/ui/badge"
import Image from "next/image"

export const NewsFullDescriptionCard = ({ news }: { news: NewsJSON }) => {
    return (
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
    )
}