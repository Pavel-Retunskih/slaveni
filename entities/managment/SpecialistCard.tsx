import { ManagementDocument } from "@/shared/api/db/models/Management"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import Image from "next/image"

export const SpecialistCard = ({ specialist }: { specialist: ManagementDocument }) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg h-full pt-0 transition-shadow">
            <div className="relative bg-muted">
                <Image
                    src={specialist?.image || "/placeholder.svg"}
                    alt={specialist?.position || ""}
                    width={800}
                    height={534}
                    className="w-full h-auto object-contain"
                />
                <Badge className="bg-white/90 absolute bottom-4 left-4 right-4 text-foreground hover:bg-white">
                    {specialist.department}
                </Badge>
            </div>
            <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                    {specialist.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{specialist.position}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {specialist.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {specialist?.responsibilities?.map((resp) => (
                        <span
                            key={resp}
                            className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                        >
                            {resp}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}