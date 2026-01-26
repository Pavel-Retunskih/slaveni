import { ManagementDocument } from "@/shared/api/db/models/Management"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"

export const DirectorCard = ({ director }: { director: ManagementDocument }) => {
    return (
        <Card className="max-w-4xl mx-auto p-0 overflow-hidden">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-auto bg-muted">
                        <Image
                            src={director.image || "/placeholder.svg"}
                            alt={director.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-8">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            {director.department}
                        </Badge>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                            {director.name}
                        </h3>
                        <p className="text-primary font-medium mb-4">{director.position}</p>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            {director.description}
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary" />
                                <span>{director.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>{director.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}