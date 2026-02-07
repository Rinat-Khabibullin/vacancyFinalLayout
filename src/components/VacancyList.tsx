import { Group, Pagination, Stack, Tabs, Text } from '@mantine/core'
import type { HhVacancy } from '../types/hh'
import { VacancyCard } from './VacancyCard'

type CityTabValue = 'moscow' | 'petersburg'

type VacancyListProps = {
  items: HhVacancy[]
  loading: boolean
  error: string | null
  activeCity: CityTabValue
  page: number
  totalPages: number
  onCityChange: (value: CityTabValue) => void
  onPageChange: (value: number) => void
}

export function VacancyList({
  items,
  loading,
  error,
  activeCity,
  page,
  totalPages,
  onCityChange,
  onPageChange,
}: VacancyListProps) {
  return (
    <div className="list">
      <Tabs
        value={activeCity}
        onChange={(value) => {
          if (!value) return
          onCityChange(value as CityTabValue)
        }}
        className="city-tabs"
        variant="unstyled"
      >
        <Tabs.List className="city-tabs-list">
          <Tabs.Tab value="moscow" className="city-tab">
            Москва
          </Tabs.Tab>
          <Tabs.Tab value="petersburg" className="city-tab">
            Санкт-Петербург
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {loading && <Text>Загрузка...</Text>}
      {error && (
        <Text c="red" role="alert">
          {error}
        </Text>
      )}

      <Stack gap={16}>
        {items.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </Stack>

      <Group justify="center" mt={24}>
        <Pagination value={page} onChange={onPageChange} total={totalPages} />
      </Group>
    </div>
  )
}
