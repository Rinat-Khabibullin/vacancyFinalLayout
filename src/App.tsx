import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyDetailPage } from './pages/VacancyDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/vacancies" replace />} />
      <Route path="/vacancies" element={<VacanciesPage />} />
      <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
    </Routes>
  )
}

export default App
