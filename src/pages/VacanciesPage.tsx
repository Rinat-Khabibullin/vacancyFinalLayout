import { useEffect, useMemo, useState } from 'react'
import { Container, Group } from '@mantine/core'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addSkill, removeSkill, setArea, setFilters, setPage, setSearchText } from '../store/filtersSlice'
import { fetchVacancies } from '../store/vacanciesSlice'
import { AppHeader } from '../components/AppHeader'
import { HeroSearch } from '../components/HeroSearch'
import { SkillsFilter } from '../components/SkillsFilter'
import { VacancyList } from '../components/VacancyList'
const CITY_TABS = {
  moscow: 'Москва',
  petersburg: 'Санкт-Петербург',
} as const

const parseSkills = (value: string | null) =>
  value
    ? value
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)
    : null

type CityTab = keyof typeof CITY_TABS

type VacanciesPageProps = {
  city?: CityTab
}

export function VacanciesPage({ city }: VacanciesPageProps) {
  const dispatch = useAppDispatch()
  const { searchText, area, skills, page } = useAppSelector((state) => state.filters)
  const { items, pages, loading, error } = useAppSelector((state) => state.vacancies)
  const [newSkill, setNewSkill] = useState('')
  const [searchDraft, setSearchDraft] = useState(searchText)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsString = searchParams.toString()
  const navigate = useNavigate()
  const location = useLocation()
  const routeArea = city ? CITY_TABS[city] : 'Все'

  useEffect(() => {
    if (area !== routeArea) {
      dispatch(setArea(routeArea))
    }
  }, [area, dispatch, routeArea])

  useEffect(() => {
    if (area !== routeArea) {
      return
    }

    dispatch(fetchVacancies())
  }, [dispatch, searchText, area, skills, page, routeArea])

  useEffect(() => {
    if (!searchParamsString) {
      return
    }

    const params = new URLSearchParams(searchParamsString)
    const nextSearchText = params.get('text') ?? ''
    const nextSkills = parseSkills(params.get('skills')) ?? []

    dispatch(
      setFilters({
        searchText: nextSearchText,
        area: routeArea,
        skills: nextSkills,
      }),
    )
  }, [dispatch, routeArea, searchParamsString])

  useEffect(() => {
    const params = new URLSearchParams()

    if (searchText.trim()) {
      params.set('text', searchText.trim())
    }

    if (skills.length > 0) {
      params.set('skills', skills.join(','))
    }

    setSearchParams(params, { replace: true })
  }, [searchText, skills, setSearchParams])

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

  const handleCityChange = (value: CityTab | null) => {
    const nextPath = value ? `/vacancies/${value}` : '/vacancies/all'
    navigate({ pathname: nextPath, search: location.search })
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
            activeCity={city ?? null}
            page={page}
            totalPages={totalPages}
            onCityChange={handleCityChange}
            onPageChange={(value) => dispatch(setPage(value))}
          />
        </Group>
      </Container>
    </div>
  )
}
