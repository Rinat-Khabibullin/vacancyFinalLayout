import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyDetailPage } from './pages/VacancyDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

function VacanciesRedirect() {
  const location = useLocation()

  return <Navigate to={{ pathname: '/vacancies/moscow', search: location.search }} replace />
}

function VacanciesLayout() {
  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
      <Route path="/vacancies" element={<VacanciesLayout />}>
        <Route index element={<VacanciesRedirect />} />
        <Route path="moscow" element={<VacanciesPage city="moscow" />} />
        <Route path="petersburg" element={<VacanciesPage city="petersburg" />} />
        <Route path=":id" element={<VacancyDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
