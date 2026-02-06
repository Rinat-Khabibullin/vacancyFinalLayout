import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AreaOption = 'Все' | 'Москва' | 'Санкт-Петербург'

export type FiltersState = {
  searchText: string
  area: AreaOption
  skills: string[]
  page: number
}

const initialState: FiltersState = {
  searchText: '',
  area: 'Все',
  skills: ['TypeScript', 'React', 'Redux'],
  page: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(
      state,
      action: PayloadAction<Pick<FiltersState, 'searchText' | 'area' | 'skills'>>,
    ) {
      state.searchText = action.payload.searchText
      state.area = action.payload.area
      state.skills = action.payload.skills
      state.page = 1
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload
      state.page = 1
    },
    setArea(state, action: PayloadAction<AreaOption>) {
      state.area = action.payload
      state.page = 1
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload
      state.page = 1
    },
    addSkill(state, action: PayloadAction<string>) {
      const value = action.payload.trim()
      if (!value) return
      const exist = state.skills.some((skill) => skill.toLowerCase() === value.toLowerCase())
      if (exist) return
      state.skills.push(value)
      state.page = 1
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((skill) => skill !== action.payload)
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
})

export default filterSlice.reducer
export const {
  setSearchText,
  setArea,
  addSkill,
  removeSkill,
  setPage,
  setFilters,
  setSkills,
} = filterSlice.actions
