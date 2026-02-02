"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

type ImageCarouselProps = {
  images: string[]
  newsId: string
  newsTitle: string
}

export function ImageCarousel({ images, newsId, newsTitle }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  if (!images.length) return null

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {images.map((image, index) => (
            <div
              key={image}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <Link
                href={`/news/${newsId}/photo/${index}`}
                className="block relative aspect-video rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity"
              >
                <Image
                  src={image}
                  alt={`${newsTitle} - изображение ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
                  }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
