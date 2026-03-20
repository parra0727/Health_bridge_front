import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'

const ADMIN_MOCK = {
  nombre: 'Admin HealthBridge',
  correo: 'admin@healthbridge.com',
}

const MEDICOS_PENDIENTES_MOCK = [
  { id: 1, nombre: 'Dr. Pedro Sánchez', cedula: '1122334455',
    correo: 'pedro@clinica.com', especialidad: 'Neurología',
    institucion: 'Hospital San Vicente', numeroRethus: '98765',
    fechaRegistro: '2025-03-18', estadoVerificacion: 'PENDIENTE' },
  { id: 2, nombre: 'Dra. Laura Gómez', cedula: '5544332211',
    correo: 'laura@medica.com', especialidad: 'Pediatría',
    institucion: 'Clínica del Norte', numeroRethus: '54321',
    fechaRegistro: '2025-03-17', estadoVerificacion: 'PENDIENTE' },
]

const MEDICOS_VERIFICADOS_MOCK = [
  { id: 3, nombre: 'Dr. Juan Pérez', cedula: '9876543210',
    correo: 'juan@clinica.com', especialidad: 'Cardiología',
    institucion: 'Clínica Las Américas', numeroRethus: '12345',
    fechaRegistro: '2025-02-10', estadoVerificacion: 'VERIFICADO',
    fechaVerificacion: '2025-02-11' },
  { id: 4, nombre: 'Dra. María López', cedula: '1234509876',
    correo: 'maria@medica.com', especialidad: 'Medicina General',
    institucion: 'Centro Médico Sura', numeroRethus: '11111',
    fechaRegistro: '2025-01-20', estadoVerificacion: 'VERIFICADO',
    fechaVerificacion: '2025-01-21' },
]

const MEDICOS_RECHAZADOS_MOCK = [
  { id: 5, nombre: 'Dr. Falso Ejemplo', cedula: '0000000000',
    correo: 'falso@mail.com', especialidad: 'Cirugía',
    institucion: 'Desconocida', numeroRethus: '00000',
    fechaRegistro: '2025-03-01', estadoVerificacion: 'RECHAZADO',
    notaVerificacion: 'Número ReTHUS no encontrado en el registro oficial.' },
]

const USUARIOS_MOCK = [
  { id: 1, nombre: 'Abraham García', correo: 'abraham@gmail.com',
    rol: 'PACIENTE', proveedor: 'LOCAL', activo: true, fechaRegistro: '2025-03-10' },
  { id: 2, nombre: 'Dr. Juan Pérez', correo: 'juan@clinica.com',
    rol: 'MEDICO', proveedor: 'GOOGLE', activo: true, fechaRegistro: '2025-02-10' },
  { id: 3, nombre: 'María Rodríguez', correo: 'maria@gmail.com',
    rol: 'PACIENTE', proveedor: 'GITHUB', activo: true, fechaRegistro: '2025-03-05' },
  { id: 4, nombre: 'Dr. Falso Ejemplo', correo: 'falso@mail.com',
    rol: 'MEDICO', proveedor: 'LOCAL', activo: false, fechaRegistro: '2025-03-01' },
]

export default function AdminDashboard() {
  const [tabActiva, setTabActiva] = useState('inicio')
  const [filtroMedicos, setFiltroMedicos] = useState('PENDIENTE')
  const [medicos, setMedicos] = useState({
    pendientes: MEDICOS_PENDIENTES_MOCK,
    verificados: MEDICOS_VERIFICADOS_MOCK,
    rechazados: MEDICOS_RECHAZADOS_MOCK,
  })
  const [modalMedico, setModalMedico] = useState(null)
  const [notaRechazo, setNotaRechazo] = useState('')
  const [procesando, setProcesando] = useState(false)

  const verificarMedico = (medico) => {
    setProcesando(true)
    setTimeout(() => {
      setMedicos(prev => ({
        pendientes: prev.pendientes.filter(m => m.id !== medico.id),
        verificados: [...prev.verificados, {
          ...medico,
          estadoVerificacion: 'VERIFICADO',
          fechaVerificacion: new Date().toISOString().split('T')[0],
        }],
        rechazados: prev.rechazados,
      }))
      setModalMedico(null)
      setProcesando(false)
    }, 800)
  }

  const rechazarMedico = (medico) => {
    if (!notaRechazo.trim()) return
    setProcesando(true)
    setTimeout(() => {
      setMedicos(prev => ({
        pendientes: prev.pendientes.filter(m => m.id !== medico.id),
        verificados: prev.verificados,
        rechazados: [...prev.rechazados, {
          ...medico,
          estadoVerificacion: 'RECHAZADO',
          notaVerificacion: notaRechazo,
        }],
      }))
      setModalMedico(null)
      setNotaRechazo('')
      setProcesando(false)
    }, 800)
  }

  const medicosFiltrados = filtroMedicos === 'PENDIENTE'   ? medicos.pendientes
                         : filtroMedicos === 'VERIFICADO'  ? medicos.verificados
                         : medicos.rechazados

  return (
    <div className="flex h-screen overflow-hidden bg-hb-dark">
      <Sidebar rol="ADMINISTRADOR" usuario={ADMIN_MOCK} />

      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <div className="bg-hb-darkMid border-b border-hb-darkCard px-8 py-5
                        flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-white">
              {tabActiva === 'inicio'   && 'Panel de Administración'}
              {tabActiva === 'medicos'  && 'Verificación de Médicos'}
              {tabActiva === 'usuarios' && 'Gestión de Usuarios'}
            </h1>
            <p className="text-hb-textDim text-sm">
              {ADMIN_MOCK.correo}
            </p>
          </div>

          {/* Badge admin */}
          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20
                          rounded-xl px-4 py-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
                   11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824
                   10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-purple-400 text-sm font-medium">Administrador</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-8 pt-6 pb-0 border-b border-hb-darkCard">
          {[
            { id: 'inicio',   label: 'Inicio' },
            { id: 'medicos',  label: `Verificar Médicos ${medicos.pendientes.length > 0 ? `(${medicos.pendientes.length})` : ''}` },
            { id: 'usuarios', label: 'Usuarios' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setTabActiva(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200
                          ${tabActiva === tab.id
                            ? 'border-hb-mint text-white'
                            : tab.id === 'medicos' && medicos.pendientes.length > 0
                              ? 'border-transparent text-hb-accent hover:text-white'
                              : 'border-transparent text-hb-textMuted hover:text-white'
                          }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">

          {/* ══ TAB INICIO ══ */}
          {tabActiva === 'inicio' && (
            <div className="space-y-6 animate-fade-in">

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Usuarios totales', valor: USUARIOS_MOCK.length,
                    icon: '👥', bg: 'bg-hb-teal/10 border-hb-teal/20' },
                  { label: 'Médicos verificados', valor: medicos.verificados.length,
                    icon: '✅', bg: 'bg-hb-mint/10 border-hb-mint/20' },
                  { label: 'Pendientes verificación', valor: medicos.pendientes.length,
                    icon: '⏳', bg: medicos.pendientes.length > 0
                      ? 'bg-hb-accent/10 border-hb-accent/20'
                      : 'bg-hb-darkCard border-hb-darkCard' },
                  { label: 'Médicos rechazados', valor: medicos.rechazados.length,
                    icon: '❌', bg: 'bg-red-500/10 border-red-500/20' },
                ].map((stat) => (
                  <div key={stat.label} className={`card border ${stat.bg} flex items-center gap-4`}>
                    <span className="text-3xl">{stat.icon}</span>
                    <div>
                      <p className="text-3xl font-bold text-white">{stat.valor}</p>
                      <p className="text-hb-textDim text-xs mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alerta médicos pendientes */}
              {medicos.pendientes.length > 0 && (
                <div className="card border-hb-accent/30 bg-hb-accent/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span>⏳</span>
                      <h3 className="text-white font-semibold">
                        {medicos.pendientes.length} médico{medicos.pendientes.length > 1 ? 's' : ''} esperando verificación ReTHUS
                      </h3>
                    </div>
                    <button onClick={() => setTabActiva('medicos')}
                      className="text-hb-accent hover:text-white text-sm transition-colors">
                      Verificar ahora →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {medicos.pendientes.map((m) => (
                      <div key={m.id}
                        className="bg-hb-dark rounded-lg p-3 border border-hb-accent/20
                                   flex items-center gap-3">
                        <div className="w-8 h-8 bg-hb-accent/10 rounded-full flex items-center
                                        justify-center flex-shrink-0">
                          <span className="text-hb-accent font-bold text-sm">
                            {m.nombre.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">{m.nombre}</p>
                          <p className="text-hb-textDim text-xs">
                            {m.especialidad} · ReTHUS: {m.numeroRethus}
                          </p>
                        </div>
                        <p className="text-hb-textDim text-xs flex-shrink-0">
                          {m.fechaRegistro}
                        </p>
                        <button onClick={() => setModalMedico(m)}
                          className="btn-secondary text-xs py-1.5 px-3 flex-shrink-0">
                          Revisar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen usuarios */}
              <div className="card">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-semibold">Usuarios recientes</h3>
                  <button onClick={() => setTabActiva('usuarios')}
                    className="text-hb-teal hover:text-hb-mint text-sm transition-colors">
                    Ver todos →
                  </button>
                </div>
                <div className="space-y-3">
                  {USUARIOS_MOCK.slice(0, 3).map((u) => (
                    <div key={u.id}
                      className="flex items-center gap-3 bg-hb-dark rounded-xl p-3
                                 border border-hb-darkCard">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center
                                      flex-shrink-0 font-bold text-sm
                                      ${u.rol === 'PACIENTE'
                                        ? 'bg-hb-teal/20 text-hb-mint'
                                        : 'bg-hb-accent/20 text-hb-accent'}`}>
                        {u.nombre.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{u.nombre}</p>
                        <p className="text-hb-textDim text-xs truncate">{u.correo}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={u.rol === 'PACIENTE' ? 'badge-teal' : 'badge-warning'}>
                          {u.rol}
                        </span>
                        <span className={u.activo ? 'badge-success' : 'badge-danger'}>
                          {u.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ TAB MEDICOS ══ */}
          {tabActiva === 'medicos' && (
            <div className="space-y-6 animate-fade-in">

              {/* Filtro */}
              <div className="flex gap-2">
                {[
                  { id: 'PENDIENTE',  label: `Pendientes (${medicos.pendientes.length})`,  color: 'hb-accent' },
                  { id: 'VERIFICADO', label: `Verificados (${medicos.verificados.length})`, color: 'hb-mint' },
                  { id: 'RECHAZADO',  label: `Rechazados (${medicos.rechazados.length})`,  color: 'red-400' },
                ].map((f) => (
                  <button key={f.id} onClick={() => setFiltroMedicos(f.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all
                                ${filtroMedicos === f.id
                                  ? f.id === 'PENDIENTE'
                                    ? 'border-hb-accent bg-hb-accent/10 text-white'
                                    : f.id === 'VERIFICADO'
                                      ? 'border-hb-mint bg-hb-mint/10 text-white'
                                      : 'border-red-400 bg-red-400/10 text-white'
                                  : 'border-hb-darkCard bg-hb-darkMid text-hb-textMuted hover:border-hb-teal/50'
                                }`}>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Lista médicos */}
              <div className="space-y-4">
                {medicosFiltrados.length === 0 ? (
                  <div className="card text-center py-12">
                    <span className="text-4xl mb-3 block">✅</span>
                    <p className="text-hb-textMuted">
                      No hay médicos en estado {filtroMedicos.toLowerCase()}
                    </p>
                  </div>
                ) : (
                  medicosFiltrados.map((m) => (
                    <div key={m.id}
                      className={`card transition-all
                                  ${m.estadoVerificacion === 'PENDIENTE'
                                    ? 'border-hb-accent/20'
                                    : m.estadoVerificacion === 'VERIFICADO'
                                      ? 'border-hb-mint/20'
                                      : 'border-red-500/20'}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                        border-2 flex-shrink-0 font-bold text-lg
                                        ${m.estadoVerificacion === 'PENDIENTE'
                                          ? 'bg-hb-accent/10 border-hb-accent/30 text-hb-accent'
                                          : m.estadoVerificacion === 'VERIFICADO'
                                            ? 'bg-hb-mint/10 border-hb-mint/30 text-hb-mint'
                                            : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                          {m.nombre.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-white font-semibold">{m.nombre}</h3>
                            {m.estadoVerificacion === 'PENDIENTE' &&
                              <span className="badge-warning">⏳ Pendiente</span>}
                            {m.estadoVerificacion === 'VERIFICADO' &&
                              <span className="badge-success">✅ Verificado</span>}
                            {m.estadoVerificacion === 'RECHAZADO' &&
                              <span className="badge-danger">❌ Rechazado</span>}
                          </div>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                            {[
                              { label: 'Cédula',      valor: m.cedula },
                              { label: 'Correo',      valor: m.correo },
                              { label: 'Especialidad',valor: m.especialidad },
                              { label: 'Institución', valor: m.institucion },
                              { label: 'ReTHUS',      valor: m.numeroRethus },
                              { label: 'Registro',    valor: m.fechaRegistro },
                            ].map((item) => (
                              <div key={item.label}>
                                <span className="text-hb-textDim text-xs">{item.label}: </span>
                                <span className="text-hb-textMuted text-xs font-medium">
                                  {item.valor}
                                </span>
                              </div>
                            ))}
                          </div>
                          {m.notaVerificacion && (
                            <div className="mt-3 bg-red-900/20 border border-red-500/20
                                            rounded-lg p-2">
                              <p className="text-red-300 text-xs">
                                Motivo rechazo: {m.notaVerificacion}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Acciones solo para pendientes */}
                        {m.estadoVerificacion === 'PENDIENTE' && (
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            <a href={`https://www.rethus.gov.co/validar/${m.numeroRethus}`}
                              target="_blank" rel="noopener noreferrer"
                              className="btn-secondary text-xs py-1.5 px-3 text-center">
                              🔍 Ver ReTHUS
                            </a>
                            <button onClick={() => setModalMedico(m)}
                              className="btn-mint text-xs py-1.5 px-3">
                              Revisar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ══ TAB USUARIOS ══ */}
          {tabActiva === 'usuarios' && (
            <div className="space-y-4 animate-fade-in">
              {USUARIOS_MOCK.map((u) => (
                <div key={u.id}
                  className={`card transition-all
                              ${!u.activo ? 'opacity-60' : 'hover:border-hb-teal/30'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                    border-2 flex-shrink-0 font-bold text-lg
                                    ${u.rol === 'PACIENTE'
                                      ? 'bg-hb-teal/10 border-hb-teal/20 text-hb-mint'
                                      : 'bg-hb-accent/10 border-hb-accent/20 text-hb-accent'}`}>
                      {u.nombre.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-semibold">{u.nombre}</h3>
                        <span className={u.rol === 'PACIENTE' ? 'badge-teal' : 'badge-warning'}>
                          {u.rol}
                        </span>
                        <span className={u.activo ? 'badge-success' : 'badge-danger'}>
                          {u.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        {u.proveedor !== 'LOCAL' && (
                          <span className="badge-teal">
                            {u.proveedor === 'GOOGLE' ? '🔵 Google' : '⚫ GitHub'}
                          </span>
                        )}
                      </div>
                      <p className="text-hb-textDim text-xs">
                        {u.correo} · Registrado: {u.fechaRegistro}
                      </p>
                    </div>
                    <button
                      className={`text-xs py-1.5 px-3 rounded-lg border transition-all
                                  ${u.activo
                                    ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                                    : 'border-hb-mint/30 text-hb-mint hover:bg-hb-mint/10'}`}>
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ══ MODAL VERIFICACIÓN ══ */}
      {modalMedico && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center
                        justify-center z-50 p-4 animate-fade-in">
          <div className="bg-hb-darkMid rounded-2xl border border-hb-darkCard
                          w-full max-w-lg shadow-2xl">

            {/* Header modal */}
            <div className="flex items-center justify-between p-6 border-b border-hb-darkCard">
              <h3 className="text-white font-bold text-lg">
                Verificar médico
              </h3>
              <button onClick={() => { setModalMedico(null); setNotaRechazo('') }}
                className="text-hb-textDim hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido modal */}
            <div className="p-6 space-y-4">

              {/* Info médico */}
              <div className="bg-hb-dark rounded-xl p-4 border border-hb-darkCard space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-hb-accent/10 rounded-full flex items-center
                                  justify-center border-2 border-hb-accent/30">
                    <span className="text-hb-accent font-bold">
                      {modalMedico.nombre.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{modalMedico.nombre}</p>
                    <p className="text-hb-textDim text-xs">{modalMedico.correo}</p>
                  </div>
                </div>
                {[
                  { label: 'Especialidad', valor: modalMedico.especialidad },
                  { label: 'Institución',  valor: modalMedico.institucion },
                  { label: 'ReTHUS',       valor: modalMedico.numeroRethus },
                  { label: 'Cédula',       valor: modalMedico.cedula },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-hb-textDim text-sm">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.valor}</span>
                  </div>
                ))}
              </div>

              {/* Link ReTHUS */}
              <a href="https://www.rethus.gov.co" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-hb-teal hover:text-hb-mint
                           transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Verificar número {modalMedico.numeroRethus} en rethus.gov.co
              </a>

              {/* Nota de rechazo */}
              <div>
                <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                  Nota (requerida solo si rechazas)
                </label>
                <textarea rows={2} value={notaRechazo}
                  onChange={(e) => setNotaRechazo(e.target.value)}
                  placeholder="Motivo del rechazo..."
                  className="input-field resize-none" />
              </div>
            </div>

            {/* Botones modal */}
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => rechazarMedico(modalMedico)}
                disabled={procesando || !notaRechazo.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4
                           rounded-lg border-2 border-red-500/30 text-red-400
                           hover:bg-red-500/10 transition-all disabled:opacity-40 text-sm font-medium">
                {procesando ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : '❌'} Rechazar
              </button>
              <button onClick={() => verificarMedico(modalMedico)}
                disabled={procesando}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4
                           rounded-lg bg-hb-mint hover:opacity-90 text-hb-dark
                           transition-all disabled:opacity-40 text-sm font-semibold">
                {procesando ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : '✅'} Verificar ReTHUS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}