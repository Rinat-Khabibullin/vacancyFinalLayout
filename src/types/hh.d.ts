type HhArea = {
  id: string
  name: string
}

type HhEmployer = {
  name: string
}

type HhSalary = {
  from: number | null
  to: number | null
  currency: string | null
  gross: boolean | null
}

type HhExperience = {
  name: string
}

type HhSchedule = {
  name: string
}

type HhSnippet = {
  requirement: string | null
  responsibility: string | null
}

type HhVacancy = {
  id: string
  name: string
  salary: HhSalary | null
  experience: HhExperience | null
  schedule: HhSchedule | null
  employer: HhEmployer | null
  area: HhArea | null
  alternate_url: string
  snippet?: HhSnippet | null
  url?: string
}

type HhVacancyResponse = {
  items: HhVacancy[]
  page: number
  pages: number
  found: number
  per_page: number
}

type HhVacancyDetail = HhVacancy & {
  description?: string | null
  snippet?: HhSnippet | null
  url?: string
}
