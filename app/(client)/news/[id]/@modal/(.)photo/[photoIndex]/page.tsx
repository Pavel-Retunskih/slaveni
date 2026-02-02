import { loadNewsById } from "@/shared/helpers/loadNews"
import { PhotoModal } from "@/shared/components/ui/photo-modal"
import { notFound } from "next/navigation"

export default async function PhotoModalPage({
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
    <PhotoModal
      images={news.images}
      initialIndex={index}
      newsTitle={news.title}
      newsId={id}
    />
  )
}
