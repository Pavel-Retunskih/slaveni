import Link from "next/link"
import { Wheat } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wheat className="w-10 h-10 text-primary" />
                    </div>
                </div>

                <h1 className="font-serif text-7xl sm:text-8xl font-bold text-primary mb-4">
                    404
                </h1>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Страница не найдена
                </h2>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    К сожалению, запрашиваемая страница не существует или была перемещена.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/">На главную</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/contacts">Контакты</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
