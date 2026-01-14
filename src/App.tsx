import { useEffect, useMemo, useState } from 'react'
import { Box, Container, Group } from '@mantine/core'
import './App.css'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { addSkill, removeSkill, setArea, setPage, setSearchText } from './store/filtersSlice'
import { fetchVacancies } from './store/vacanciesSlice'
import { AppHeader } from './components/AppHeader'
import { HeroSearch } from './components/HeroSearch'
import { SkillsFilter } from './components/SkillsFilter'
import { VacancyList } from './components/VacancyList'

function App() {
  const dispatch = useAppDispatch()
  const { searchText, area, skills, page } = useAppSelector((state) => state.filters)
  const { items, pages, loading, error } = useAppSelector((state) => state.vacancies)
  const [newSkill, setNewSkill] = useState('')
  const [searchDraft, setSearchDraft] = useState(searchText)

  useEffect(() => {
    dispatch(fetchVacancies())
  }, [dispatch, searchText, area, skills, page])

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
    <Box>
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
    </Box>
  )
}

export default App
