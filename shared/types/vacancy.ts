export interface VacancyFormValues {
  title: string
  department: string
  type: string
  salary?: string
  requirements: string[]
  duties: string[]
  benefits: string[]
  urgent: boolean
}

export interface VacancyFormPayload extends VacancyFormValues {}
