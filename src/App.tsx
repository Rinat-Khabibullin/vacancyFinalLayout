import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/AppLayout'
import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyDetailPage } from './pages/VacancyDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path="/vacancies" element={<Outlet />}>
          <Route index element={<VacanciesPage />} />
          <Route path="moscow" element={<VacanciesPage city="moscow" />} />
          <Route path="petersburg" element={<VacanciesPage city="petersburg" />} />
          <Route path=":id" element={<VacancyDetailPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
