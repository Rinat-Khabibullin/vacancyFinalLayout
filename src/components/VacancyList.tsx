import { Group, Pagination, SegmentedControl, Stack, Text } from '@mantine/core'
import type { AreaOption } from '../store/filtersSlice'
import type { HhVacancy } from '../types/hh'
import { VacancyCard } from './VacancyCard'

const CITY_OPTIONS: AreaOption[] = ['Все', 'Москва', 'Санкт-Петербург']

type VacancyListProps = {
  items: HhVacancy[]
  loading: boolean
  error: string | null
  area: AreaOption
  page: number
  totalPages: number
  onAreaChange: (value: AreaOption) => void
  onPageChange: (value: number) => void
}

export function VacancyList({
  items,
  loading,
  error,
  area,
  page,
  totalPages,
  onAreaChange,
  onPageChange,
}: VacancyListProps) {
  return (
    <div className="list">
      <Group justify="space-between" align="center" mb={16} wrap="wrap">
        <SegmentedControl
          data={CITY_OPTIONS}
          value={area}
          onChange={(value) => onAreaChange(value as AreaOption)}
        />
      </Group>

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
