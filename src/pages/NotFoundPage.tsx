import { Box, Button, Container, Group, Image, Stack, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box>
      <AppHeader />

      <Container size="md" className="not-found">
        <Box className="not-found-card">
          <Group justify="space-between" align="flex-start" wrap="wrap" className="not-found-header">
            <Stack gap={6}>
              <Title order={2}>Упс! Такой страницы не существует</Title>
              <Text c="dimmed">Давайте перейдем к началу.</Text>
            </Stack>
            <Button color="indigo" onClick={() => navigate('/vacancies/moscow')}>
              На главную
            </Button>
          </Group>

          <Image
            src="https://media1.tenor.com/m/baBulgRz6XkAAAAd/sad-cat.gif"
            alt="Грустный котик"
            radius="md"
            className="not-found-image"
          />
        </Box>
      </Container>
    </Box>
  )
}
