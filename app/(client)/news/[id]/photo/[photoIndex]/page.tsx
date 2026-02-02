import { loadNewsById } from "@/shared/helpers/loadNews"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { notFound } from "next/navigation"

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string; photoIndex: string }>
}) {
  const { id, photoIndex } = await params
  const news = await loadNewsById(id)
  const index = parseInt(photoIndex, 10)

  if (isNaN(index) || !news.images || index >= news.images.length) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={`/news/${id}`}>
            <ArrowLeft className="w-4 h-4" />
            Назад к новости
          </Link>
        </Button>

        <div className="relative w-full h-[80vh] bg-muted rounded-lg overflow-hidden">
          <Image
            src={news.images[index]}
            alt={`${news.title} - изображение ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Изображение {index + 1} из {news.images.length}
        </div>
      </div>
    </div>
  )
}
