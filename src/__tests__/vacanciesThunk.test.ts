import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { createAppStore } from '../store/store'
import { fetchVacancies } from '../store/vacanciesSlice'
import { setArea, setSearchText } from '../store/filtersSlice'

const mockVacancyResponse = {
  items: [],
  page: 0,
  pages: 1,
  found: 0,
  per_page: 10,
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockVacancyResponse),
      }),
    ),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('vacancies thunk', () => {
  it('includes skills and search params in request', async () => {
    const store = createAppStore()
    store.dispatch(setSearchText('Kata'))

    await store.dispatch(fetchVacancies())

    const url = (fetch as typeof globalThis.fetch).mock.calls[0][0] as string
    expect(url).toContain('skill_set=TypeScript%2CReact%2CRedux')
    expect(url).toContain('search_field=name')
    expect(url).toContain('search_field=company_name')
    expect(url).toContain('text=Kata')
  })

  it('adds area filter when selected', async () => {
    const store = createAppStore()
    store.dispatch(setArea('Москва'))

    await store.dispatch(fetchVacancies())

    const url = (fetch as typeof globalThis.fetch).mock.calls[0][0] as string
    expect(url).toContain('area=1')
  })
})
