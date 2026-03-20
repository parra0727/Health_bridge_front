import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const MENU_PACIENTE = [
  {
    label: 'Inicio',
    path: '/dashboard/paciente',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    label: 'Mi Historial',
    path: '/dashboard/paciente/historial',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    label: 'Consultas',
    path: '/dashboard/paciente/consultas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    label: 'Exámenes',
    path: '/dashboard/paciente/examenes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    label: 'Médicos con acceso',
    path: '/dashboard/paciente/accesos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    label: 'EPS / ARL',
    path: '/dashboard/paciente/afiliaciones',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    )
  },
]

const MENU_MEDICO = [
  {
    label: 'Inicio',
    path: '/dashboard/medico',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    label: 'Mis Pacientes',
    path: '/dashboard/medico/pacientes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    label: 'Nueva Consulta',
    path: '/dashboard/medico/consulta',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4v16m8-8H4" />
      </svg>
    )
  },
  {
    label: 'Diagnósticos',
    path: '/dashboard/medico/diagnosticos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
]

const MENU_ADMIN = [
  {
    label: 'Inicio',
    path: '/dashboard/admin',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    label: 'Verificar Médicos',
    path: '/dashboard/admin/medicos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    label: 'Usuarios',
    path: '/dashboard/admin/usuarios',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
]

export default function Sidebar({ rol = 'PACIENTE', usuario = {} }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menu = rol === 'PACIENTE' ? MENU_PACIENTE
             : rol === 'MEDICO'   ? MENU_MEDICO
             : MENU_ADMIN

  const accentColor = rol === 'PACIENTE' ? 'hb-teal'
                    : rol === 'MEDICO'   ? 'hb-accent'
                    : 'purple-500'

  return (
    <aside className={`bg-hb-darkMid border-r border-hb-darkCard flex flex-col
                       transition-all duration-300 h-screen sticky top-0
                       ${collapsed ? 'w-16' : 'w-64'}`}>

      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-hb-darkCard">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-hb-teal rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-bold text-white text-sm">HealthBridge</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="text-hb-textDim hover:text-white transition-colors p-1 rounded-lg
                     hover:bg-hb-darkCard ml-auto">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      {/* Usuario info */}
      {!collapsed && (
        <div className="p-4 border-b border-hb-darkCard">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-hb-teal/20 rounded-full flex items-center
                            justify-center border-2 border-hb-teal/30 flex-shrink-0">
              <span className="text-hb-mint font-bold text-sm">
                {usuario.nombre?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">
                {usuario.nombre || 'Usuario'}
              </p>
              <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full
                              ${rol === 'PACIENTE' ? 'bg-hb-teal/20 text-hb-mint'
                              : rol === 'MEDICO'   ? 'bg-hb-accent/20 text-hb-accent'
                              : 'bg-purple-500/20 text-purple-400'}`}>
                {rol === 'MEDICO' && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {rol}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-200 text-left
                          ${isActive
                            ? `text-white bg-hb-teal/20 border-l-2 border-hb-mint font-medium`
                            : 'text-hb-textMuted hover:text-white hover:bg-hb-darkCard'
                          }
                          ${collapsed ? 'justify-center' : ''}`}>
              <span className={`flex-shrink-0 ${isActive ? 'text-hb-mint' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="text-sm truncate">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Cerrar sesión */}
      <div className="p-3 border-t border-hb-darkCard">
        <button onClick={() => navigate('/login')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-hb-textMuted hover:text-hb-danger hover:bg-red-900/10
                      transition-all duration-200
                      ${collapsed ? 'justify-center' : ''}`}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span className="text-sm">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}