export interface HonoreeFormValues {
  name: string
  position: string
  department: string
  achievement: string
  years: string
  photo?: string
}

export interface HonoreeFormPayload extends HonoreeFormValues {
  uploadKeys?: string[]
}
