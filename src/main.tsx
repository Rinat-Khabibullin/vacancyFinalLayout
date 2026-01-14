import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import { Provider } from 'react-redux'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.tsx'
import { store } from './store/store'

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Manrope, sans-serif',
  defaultRadius: 'md',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
