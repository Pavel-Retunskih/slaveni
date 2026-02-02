"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

type ImageCarouselPreviewProps = {
  images: string[]
  newsTitle: string
}

export function ImageCarouselPreview({ images, newsTitle }: ImageCarouselPreviewProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
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
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={image}
                  alt={`${newsTitle} - изображение ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
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
