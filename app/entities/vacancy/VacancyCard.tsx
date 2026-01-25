
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Banknote, Clock, Briefcase, MapPin } from "lucide-react"
import { VacancyDTO } from "@/helpers/loadVacancies"
import { ReactNode } from "react"
type Props = {
    vacancy: VacancyDTO
    action: ReactNode
}
export const VacancyCard = ({ vacancy, action }: Props) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {vacancy.urgent && (
                                <Badge className="bg-destructive text-white">Срочно</Badge>
                            )}
                            {vacancy.department && <Badge variant="secondary">{vacancy.department}</Badge>}
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                            {vacancy.title}
                        </h3>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {vacancy.salary && (
                        <div className="flex items-center gap-1">
                            <Banknote className="w-4 h-4" />
                            {vacancy.salary}
                        </div>
                    )}
                    {vacancy.type && (
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {vacancy.type}
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Шкловский р-н
                    </div>
                </div>

                {Boolean(vacancy.requirements?.length) && (
                    <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Требования:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            {vacancy.requirements?.map((req, idx) => (
                                <li key={`${vacancy.id}-req-${idx}`} className="flex items-start gap-2">
                                    <span className="text-primary mt-1.5 text-xs">&#9679;</span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {Boolean(vacancy.benefits?.length) && (
                    <div className="flex flex-wrap gap-2">
                        {vacancy.benefits?.map((benefit, idx) => (
                            <Badge key={`${vacancy.id}-benefit-${idx}`} variant="outline" className="text-xs">
                                {benefit}
                            </Badge>
                        ))}
                    </div>
                )}

                {action}
            </CardContent>
        </Card>
    )
}
