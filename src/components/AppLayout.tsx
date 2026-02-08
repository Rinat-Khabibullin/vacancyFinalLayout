import { Box } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'

export function AppLayout() {
  return (
    <Box>
      <AppHeader />
      <Outlet />
    </Box>
  )
}
