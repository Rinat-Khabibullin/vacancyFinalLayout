import type { HhVacancy } from "../types/hh";

const numberFormatter = new Intl.NumberFormat("ru-RU");

export const formatSalary = (salary: HhVacancy["salary"]) => {
  if (!salary || (salary.from == null && salary.to == null))
    return "з/п не указана";

  const currency = salary.currency ?? ''
  if (salary.from != null && salary.to != null) {
    return `от ${numberFormatter.format(salary.from)} до ${numberFormatter.format(
      salary.to,
    )} ${currency}`
  }

  if (salary.from != null) {
    return `от ${numberFormatter.format(salary.from)} ${currency}`
  }

  if (salary.from != null) {
    return `до ${numberFormatter.format(salary.from)} ${currency}`
  }
  return `до ${numberFormatter.format(salary.to as number)} ${currency}`
}

export const getWorkFormat = (scheduleName?: string | null) => {
  if (!scheduleName) return 'Офис'
  const lower = scheduleName.toLowerCase()
  if (lower.includes('удален')) return 'Можно удаленно'
  if (lower.includes('гиб')) return 'Гибрид'
  return 'Офис'
}