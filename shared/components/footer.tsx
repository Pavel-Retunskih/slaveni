import Link from "next/link"
import { Wheat } from "lucide-react"
const footerLinks = {
  company: [
    { href: "/", label: "О предприятии" },
    { href: "/management", label: "Руководство" },
    { href: "/news", label: "Новости" },
  ],
  services: [
    { href: "/honor-board", label: "Доска почета" },
    { href: "/vacancies", label: "Вакансии" },
    { href: "/contacts", label: "Контакты" },
  ],
  legal: [
    { href: "/", label: "Политика конфиденциальности" },
  ],
}

export function Footer() {


  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Wheat className="h-8 w-8 text-accent" />
              <span className="font-serif text-xl font-semibold">Большие Славени</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Сельскохозяйственное предприятие Шкловского района Могилевской области.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>+375 (2239) 7-79-44</li>
              <li>greater_slaveni@udp.gov.by</li>
              <li>аг. Малые Словени</li>
              <li>Шкловский р-н</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2025 ЗАО «Большие Славени». Все права защищены.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
