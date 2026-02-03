import { Card, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Award } from "lucide-react"
import Image from "next/image"

type HonoreeCardProps = {
    honoree: {
        name: string
        position: string
        department: string
        achievement: string
        years: string
        photo?: string
    }
}

export function HonoreeCard({ honoree }: HonoreeCardProps) {
    return (
        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-border/50 h-full">
            <CardContent className="p-6 text-center">
                {honoree.photo ? (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden relative">
                        <Image
                            src={honoree.photo}
                            alt={honoree.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Award className="w-10 h-10 text-primary" />
                    </div>
                )}
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                    {honoree.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">{honoree.position}</p>
                <Badge variant="secondary" className="mb-4">{honoree.department}</Badge>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {honoree.achievement}
                </p>
                <div className="pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Стаж работы: {honoree.years}</span>
                </div>
            </CardContent>
        </Card>
    )
}
