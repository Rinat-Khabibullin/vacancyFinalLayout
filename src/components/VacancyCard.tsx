import { Badge, Box, Button, Group, Text } from '@mantine/core'
import type { HhVacancy } from '../types/hh'
import { formatSalary, getWorkFormat } from '../utils/formatters'

type VacancyCardProps = {
  vacancy: HhVacancy
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  return (
    <Box className='vacancy-card' p={20}>
      <Text fw={600} size='lg' c='blue'>
        {vacancy.name}
      </Text>
      <Group mt={8} gap={12} wrap='wrap'>
        <Text>{formatSalary(vacancy.salary)}</Text>
        <Text c='dimmed'>{vacancy.experience?.name ?? 'Опыт не указан'}</Text>
      </Group>

      <Badge mt={10} variant='light'>
        {getWorkFormat(vacancy.schedule?.name)}
      </Badge>

      <Text mt={12} c='dimmed'>
        {vacancy.employer?.name ?? 'Компания не указана'}
      </Text>
      <Text>{vacancy.area?.name ?? 'Город не указан'}</Text>

      <Group mt={16} className='vacancy-actions'>
        <Button color='dark'>Смотреть вакансии</Button>
        <Button 
          variant='light'
          component='a'
          href={vacancy.alternate_url}
          target='_blank'
          rel='noreferrer'
        >
          Откликнуться</Button>
      </Group>
    </Box>
  )
}