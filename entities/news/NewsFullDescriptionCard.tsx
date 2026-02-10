import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { INews } from "@/shared/api/db/models/News"
import { Badge } from "@/shared/components/ui/badge"
import { ImageCarousel } from "@/shared/components/ui/image-carousel"
import { ImageCarouselPreview } from "@/shared/components/ui/image-carousel-preview"

export const NewsFullDescriptionCard = ({ news, newsId, safeContent, isPreview = false }: { news: INews; newsId: string; safeContent: string; isPreview?: boolean }) => {
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
                        {isPreview ? (
                            <ImageCarouselPreview
                                images={news.images}
                                newsTitle={news.title}
                            />
                        ) : (
                            <ImageCarousel
                                images={news.images}
                                newsId={newsId}
                                newsTitle={news.title}
                            />
                        )}
                    </CardContent>
                    <Separator />
                </>
            )}

            <CardContent>
                <div
                    className="ck-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: safeContent }}
                />
            </CardContent>
        </Card>
    )
}