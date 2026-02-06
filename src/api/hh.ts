const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const withLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`)

const defaultBase = import.meta.env.PROD ? 'https://api.hh.ru' : '/hh'
const hhBase = trimTrailingSlash(import.meta.env.VITE_HH_API_BASE ?? defaultBase)

export const buildHhUrl = (path: string) => `${hhBase}${withLeadingSlash(path)}`
