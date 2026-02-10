import { Skeleton } from "@/shared/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"

export default function NewsLoading() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back button skeleton */}
                <div className="mb-8">
                    <Skeleton className="h-9 w-32" />
                </div>

                {/* News card skeleton */}
                <Card className="overflow-hidden">
                    <CardHeader className="border-b">
                        {/* Title skeleton */}
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-10 w-4/5" />

                        {/* Date and badge skeleton */}
                        <div className="flex items-center gap-4 pt-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </CardHeader>

                    {/* Excerpt skeleton */}
                    <CardContent className="bg-muted/30">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-4/5" />
                    </CardContent>
                    <Separator />

                    {/* Image carousel skeleton */}
                    <CardContent>
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </CardContent>
                    <Separator />

                    {/* Content skeleton */}
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-4/5" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-5/6" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
