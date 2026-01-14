import { Box, Container, Group, Text } from '@mantine/core'

export function AppHeader() {
  return (
    <Box component='header' className='app-header'>
      <Container size='lg' py={16}> 
        <div className='app-header-inner'>
          <Group gap={12}>
            <Box className='app-logo'>hh</Box>
            <Text fw={700}>.FrontEnd</Text>
          </Group>
          <Group gap={32} className='app-nav'>
            <Group gap={10} className='app-nav-item'>
              <Text>Вакансии FE</Text>
              <Box className='app-nav-dot' />
            </Group>
            <Group gap={8} className='app-nav-item'>
              <Box className='app-nav-icon'></Box>
              <Text>обо мне</Text>
            </Group>
          </Group>
          <div className='app-header-spacer' />
        </div>
      </Container>
    </Box>
  )
}