export interface NewsFormValues {
  title: string
  excerpt: string
  category: string
  featured: boolean
  content: string
  images: string[]
  isPublished: boolean
}

export interface NewsFormPayload extends NewsFormValues {
  uploadPathnames?: string[]
}
