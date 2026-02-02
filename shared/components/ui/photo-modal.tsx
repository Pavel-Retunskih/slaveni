"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogTitle } from "../dialog"

type PhotoModalProps = {
  images: string[]
  initialIndex: number
  newsTitle: string
  newsId: string
}

export function PhotoModal({ images, initialIndex, newsTitle, newsId }: PhotoModalProps) {
  const router = useRouter()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: initialIndex,
    skipSnaps: false,
    duration: 20
  })
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  const handleClose = useCallback(() => {
    router.back()
  }, [router])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") scrollPrev()
      if (e.key === "ArrowRight") scrollNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleClose, scrollPrev, scrollNext])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="max-w-none max-h-none w-screen h-screen p-0 bg-black border-none rounded-none"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          {newsTitle} - изображение {selectedIndex + 1} из {images.length}
        </DialogTitle>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={scrollNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}

        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((image, index) => (
              <div key={image} className="flex-[0_0_100%] min-w-0 h-full relative">
                <Image
                  src={image}
                  alt={`${newsTitle} - изображение ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={index === initialIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full z-50">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
