import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import PacienteDashboard from '../pages/paciente/PacienteDashboard'
import MedicoDashboard from '../pages/medico/MedicoDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige raiz a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboards */}
        <Route path="/dashboard/paciente" element={<PacienteDashboard />} />
        <Route path="/dashboard/medico"   element={<MedicoDashboard />} />
        <Route path="/dashboard/admin"    element={<AdminDashboard />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}