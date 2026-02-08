import { Box, Container, Group, Text } from '@mantine/core'
import { Link, useMatch } from 'react-router-dom'

export function AppHeader() {
  const vacanciesMatch = useMatch('/vacancies/*')
  const aboutMatch = useMatch('/about')
  const isVacanciesActive = Boolean(vacanciesMatch)
  const isAboutActive = Boolean(aboutMatch)

  return (
    <Box component="header" className="app-header">
      <Container size="lg" py={16}>
        <div className="app-header-inner">
          <Group gap={12}>
            <Box className="app-logo">hh</Box>
            <Text fw={700}>.FrontEnd</Text>
          </Group>
          <Group gap={32} className="app-nav">
            <Link
              to="/vacancies"
              className={`app-nav-link${isVacanciesActive ? ' app-nav-link--active' : ''}`}
              aria-current={isVacanciesActive ? 'page' : undefined}
            >
              <Group gap={10} className="app-nav-item">
                <Text c="inherit">Вакансии FE</Text>
                {isVacanciesActive && <Box className="app-nav-dot" />}
              </Group>
            </Link>
            <Link
              to="/about"
              className={`app-nav-link${isAboutActive ? ' app-nav-link--active' : ''}`}
              aria-current={isAboutActive ? 'page' : undefined}
            >
              <Group gap={8} className="app-nav-item">
                <Box className="app-nav-icon" />
                <Text c="inherit">Обо мне</Text>
                {isAboutActive && <Box className="app-nav-dot" />}
              </Group>
            </Link>
          </Group>
          <div className="app-header-spacer" />
        </div>
      </Container>
    </Box>
  )
}
