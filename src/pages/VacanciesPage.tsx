import { useEffect, useMemo, useState } from 'react'
import { Container, Group } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addSkill, removeSkill, setArea, setFilters, setPage, setSearchText } from '../store/filtersSlice'
import { fetchVacancies } from '../store/vacanciesSlice'
import { AppHeader } from '../components/AppHeader'
import { HeroSearch } from '../components/HeroSearch'
import { SkillsFilter } from '../components/SkillsFilter'
import { VacancyList } from '../components/VacancyList'
import type { AreaOption } from '../store/filtersSlice'

const AREA_OPTIONS: AreaOption[] = ['Все', 'Москва', 'Санкт-Петербург']

const isValidArea = (value: string | null): value is AreaOption =>
  !!value && AREA_OPTIONS.includes(value as AreaOption)

const parseSkills = (value: string | null) =>
  value
    ? value
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)
    : null


export function VacanciesPage() {
  const dispatch = useAppDispatch()
  const { searchText, area, skills, page } = useAppSelector((state) => state.filters)
  const { items, pages, loading, error } = useAppSelector((state) => state.vacancies)
  const [newSkill, setNewSkill] = useState('')
  const [searchDraft, setSearchDraft] = useState(searchText)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsString = searchParams.toString()

  useEffect(() => {
    dispatch(fetchVacancies())
  }, [dispatch, searchText, area, skills, page])

  useEffect(() => {
    if (!searchParamsString) {
      return
    }

    const params = new URLSearchParams(searchParamsString)
    const nextSearchText = params.get('text') ?? ''
    const areaParam = params.get('area')
    const nextArea = isValidArea(areaParam) ? areaParam : 'Все'
    const nextSkills = parseSkills(params.get('skills')) ?? []

    dispatch(
      setFilters({
        searchText: nextSearchText,
        area: nextArea as AreaOption,
        skills: nextSkills,
      }),
    )
  }, [dispatch, searchParamsString])

  useEffect(() => {
    const params = new URLSearchParams()

    if (searchText.trim()) {
      params.set('text', searchText.trim())
    }

    if (area !== 'Все') {
      params.set('area', area)
    }

    if (skills.length > 0) {
      params.set('skills', skills.join(','))
    }

    setSearchParams(params, { replace: true })
  }, [area, searchText, skills, setSearchParams])

  useEffect(() => {
    setSearchDraft(searchText)
  }, [searchText])

  const totalPages = useMemo(() => Math.max(pages, 1), [pages])

  const handleAddSkill = () => {
    if (!newSkill.trim()) return
    dispatch(addSkill(newSkill))
    setNewSkill('')
  }

  const handleSearch = () => {
    dispatch(setSearchText(searchDraft))
  }

  return (
    <div>
      <AppHeader />

      <HeroSearch value={searchDraft} onChange={setSearchDraft} onSubmit={handleSearch} />

      <Container size="lg" className="content">
        <Group align="flex-start" wrap="wrap" className="layout">
          <SkillsFilter
            skills={skills}
            newSkill={newSkill}
            onNewSkillChange={setNewSkill}
            onAddSkill={handleAddSkill}
            onRemoveSkill={(skill) => dispatch(removeSkill(skill))}
          />

          <VacancyList
            items={items}
            loading={loading}
            error={error}
            area={area}
            page={page}
            totalPages={totalPages}
            onAreaChange={(value) => dispatch(setArea(value))}
            onPageChange={(value) => dispatch(setPage(value))}
          />
        </Group>
      </Container>
    </div>
  )
}
