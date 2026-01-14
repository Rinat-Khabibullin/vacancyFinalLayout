import { Box, Button, Container, Group, Text, TextInput, Title } from '@mantine/core'

type HeroSearchProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export function HeroSearch({ value, onChange, onSubmit }: HeroSearchProps) {
  return (
    <Box className='hero'>
      <Container size='lg' py={24}>
        <Group justify='space-beetween' align='flex-end' wrap='wrap'>
          <Box>
            <Title order={2}>Список вакансий</Title>
            <Text c='dimmed'>по профессии Frontend-разработчик</Text>
          </Box>
          <Group className='search-group' wrap='wrap'>
            <TextInput 
              className="search-input"
              placeholder='Должность или название компании'
              value={value}
              onChange={(e) => onChange(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onSubmit()
                }
              }}
            />
            <Button onClick={onSubmit}>Найти</Button>
          </Group>
        </Group>
      </Container>
    </Box>
  )
}