export interface ManagementFormValues {
  name: string
  position: string
  department: string
  description: string
  phone?: string
  email?: string
  image?: string
  responsibilities: string[]
  isDirector: boolean
}

export interface ManagementFormPayload extends ManagementFormValues {
  uploadKey?: string
}
