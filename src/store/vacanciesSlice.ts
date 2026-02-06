import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { HhVacancy, HhVacancyResponse } from '../types/hh'
import type { RootState } from './store'
import { buildHhUrl } from '../api/hh'

export type VacanciesState = {
  items: HhVacancy[]
  pages: number
  found: number
  loading: boolean
  error: string | null
}

const initialState: VacanciesState = {
  items: [],
  pages: 1,
  found: 0,
  loading: false,
  error: null,
}

const AREA_MAP: Record<string, string> = {
  Москва: '1',
  'Санкт-Петербург': '2',
}

export const fetchVacancies = createAsyncThunk<HhVacancyResponse, void, { state: RootState }>(
  'vacancies/fetchVacancies',
  async (_arg, thunkApi) => {
    const state = thunkApi.getState()
    const { searchText, area, skills, page } = state.filters

    const params = new URLSearchParams({
      industry: '7',
      professional_role: '96',
      per_page: '10',
      page: String(Math.max(page - 1, 0)),
    })

    if (searchText.trim()) {
      params.append('search_field', 'name')
      params.append('search_field', 'company_name')
      params.set('text', searchText.trim())
    }

    if (area !== 'Все') {
      params.set('area', AREA_MAP[area])
    }

    if (skills.length > 0) {
      params.set('skill_set', skills.join(','))
    }

    const response = await fetch(buildHhUrl(`/vacancies?${params.toString()}`))

    if (!response.ok) {
      throw new Error('Не удалось загрузить вакансии')
    }

    return (await response.json()) as HhVacancyResponse
  },
)

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.pages = action.payload.pages || 1
        state.found = action.payload.found
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Неизвестная ошибка'
      })
  },
})

export default vacanciesSlice.reducer
