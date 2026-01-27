export interface NewsFormValues {
  title: string
  excerpt: string
  category: string
  featured: boolean
  content: string
  images: string[]
}

export interface NewsFormPayload extends NewsFormValues {
  uploadPathnames?: string[]
}
