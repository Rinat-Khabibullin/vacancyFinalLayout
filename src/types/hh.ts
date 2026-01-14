export type HhArea = {
  id: string
  name: string
}

export type  HhEmployer = {
  name: string
}

export type HhSalary = {
  from: number | null
  to: number | null
  currency: string | null
  gross: boolean | null
}

export type HhExperience = {
  name: string
}

export type HhShedule = {
  name: string
}

export type HhVacancy = {
  id: string
  name: string
  salary: HhSalary | null
  experience: HhExperience | null
  schedule: HhShedule | null
  employer: HhEmployer | null
  area: HhArea | null
  alternate_url: string
}

export type HhVacancyResponse = {
  items: HhVacancy[]
  page: number
  pages: number
  found: number
  per_page: number
}