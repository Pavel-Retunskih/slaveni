"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Молоко",
    category: "Молочная продукция",
    description: "Высококачественное молоко от коров дойного стада. Доля реализации молока составляет 58,2% от общего объема продукции предприятия.",
    image: "/images/milk.jpg",
    stat: "58,2%",
  },
  {
    id: 2,
    name: "Мясо КРС",
    category: "Мясная продукция",
    description: "Говядина от молодняка КРС, выращенного на современном комплексе откорма мощностью 3 400 голов.",
    image: "/images/cattle.jpg",
    stat: "28,5%",
  },
  {
    id: 3,
    name: "Зерновые культуры",
    category: "Растениеводство",
    description: "Зерновые культуры, выращенные на 4 430 га пашни. Обеспечивают кормовую базу животноводства.",
    image: "/images/grain.jpg",
    stat: "4 430 га",
  },
]

export function Products() {
  const [activeProduct, setActiveProduct] = useState(0)

  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Продукция</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Наша продукция
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы производим широкий ассортимент сельскохозяйственной продукции высочайшего качества
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div
            className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] rounded-lg overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('${products[activeProduct].image}')` }}
          >
            <div className="absolute inset-0 bg-foreground/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-3">
                {products[activeProduct].category}
              </span>
              <h3 className="font-serif text-3xl font-bold text-white">{products[activeProduct].name}</h3>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setActiveProduct(index)}
                className={`flex items-start gap-4 p-6 rounded-lg border text-left transition-all ${
                  activeProduct === index
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div
                  className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl font-semibold text-foreground">{product.name}</h4>
                    <Plus className={`w-5 h-5 transition-transform ${activeProduct === index ? "rotate-45 text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className="text-sm text-primary font-medium">{product.category}</span>
                  <p className="mt-2 text-muted-foreground text-sm">{product.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
