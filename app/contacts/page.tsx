import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Building2, FileText, ShoppingCart, Scale, Users } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const contactSections = [
    {
        title: "Приемная",
        icon: Building2,
        description: "Общие вопросы и обращения к руководству",
        contacts: [
            { type: "phone", value: "+375 (2239) 7-79-44" },
            { type: "email", value: "greater_slaveni@udp.gov.by" },
        ],
    },
    {
        title: "Бухгалтерия",
        icon: FileText,
        description: "Финансовые вопросы и документооборот",
        contacts: [
            { type: "phone", value: "+375 (2239) 7-79-45" },
            { type: "email", value: "accounting@slaveni.by" },
        ],
    },
    {
        title: "Отдел закупок",
        icon: ShoppingCart,
        description: "Вопросы снабжения и закупок",
        contacts: [
            { type: "phone", value: "+375 (2239) 7-79-46" },
            { type: "email", value: "procurement@slaveni.by" },
        ],
    },
    {
        title: "Юрисконсульт",
        icon: Scale,
        description: "Правовые вопросы и консультации",
        contacts: [
            { type: "phone", value: "+375 (2239) 7-79-47" },
            { type: "email", value: "legal@slaveni.by" },
        ],
    },
    {
        title: "Диспетчерская",
        icon: Users,
        description: "Производственные и технические вопросы",
        contacts: [
            { type: "phone", value: "+375 (2239) 7-79-48" },
            { type: "email", value: "dispatch@slaveni.by" },
        ],
    },
    {
        title: "Профсоюз",
        icon: Users,
        description: "Представительство профсоюза",
        contacts: [
            { type: "phone", value: "+375 (2239) 7-79-48" },
            { type: "email", value: "union@slaveni.by" },
        ],
    },
]

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-primary py-8 md:py-12">
                    <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                            Контакты
                        </h1>
                        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                            Свяжитесь с нами по любым вопросам — мы всегда готовы помочь
                        </p>
                    </FadeIn>
                </section>

                {/* Address Section */}
                <section className="py-12 bg-secondary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn delay={0.1}>
                            <Card className="border-primary/20">
                                <CardContent className="py-8">
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                                <MapPin className="w-8 h-8 text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                                                Наш адрес
                                            </h2>
                                            <p className="text-muted-foreground text-lg mb-2">
                                                Республика Беларусь, Могилевская область
                                            </p>
                                            <p className="text-muted-foreground text-lg mb-4">
                                                223710, Шкловский район, аг. Малые Славени, ул. Юбилейная, д. 12
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Phone className="w-5 h-5 text-primary" />
                                                    <span className="font-medium">+375 (2239) 7-79-44</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Mail className="w-5 h-5 text-primary" />
                                                    <span className="font-medium">greater_slaveni@udp.gov.by</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>
                </section>

                {/* Contact Sections */}
                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-primary font-medium text-sm tracking-wider uppercase">
                                Отделы и службы
                            </span>
                            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                                Контактная информация
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                Выберите нужный отдел для получения консультации
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contactSections.map((section, index) => {
                                const Icon = section.icon
                                return (
                                    <FadeIn key={section.title} delay={0.1 * (index + 1)}>
                                        <Card className="h-full hover:shadow-lg transition-shadow border-border hover:border-primary/40">
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <CardTitle className="font-serif text-xl text-foreground">
                                                    {section.title}
                                                </CardTitle>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    {section.description}
                                                </p>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {section.contacts.map((contact) => (
                                                    <div
                                                        key={contact.value}
                                                        className="flex items-center gap-3 text-muted-foreground group"
                                                    >
                                                        {contact.type === "phone" ? (
                                                            <>
                                                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                                                <a
                                                                    href={`tel:${contact.value.replace(/\s/g, "")}`}
                                                                    className="text-sm hover:text-primary transition-colors"
                                                                >
                                                                    {contact.value}
                                                                </a>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                                                <a
                                                                    href={`mailto:${contact.value}`}
                                                                    className="text-sm hover:text-primary transition-colors break-all"
                                                                >
                                                                    {contact.value}
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </FadeIn>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Working Hours Section */}
                <section className="py-16 bg-secondary">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn delay={0.2}>
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle className="font-serif text-2xl text-center text-foreground">
                                        Режим работы
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 gap-6 text-center">
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Рабочие дни</h3>
                                            <p className="text-muted-foreground">Понедельник - Пятница</p>
                                            <p className="text-primary font-medium mt-1">8:00 - 17:00</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Обеденный перерыв</h3>
                                            <p className="text-muted-foreground">Ежедневно</p>
                                            <p className="text-primary font-medium mt-1">13:00 - 14:00</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-border text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Выходные дни: <span className="font-medium">Суббота, Воскресенье</span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>
                </section>
            </main>
        </div>
    )
}
