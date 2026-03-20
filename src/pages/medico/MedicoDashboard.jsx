import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'

const MEDICO_MOCK = {
  nombre: 'Dr. Juan Pérez',
  cedula: '9876543210',
  correo: 'juan.perez@clinica.com',
  especialidad: 'Cardiología',
  institucion: 'Clínica Las Américas',
  numeroRethus: '12345',
  estadoVerificacion: 'VERIFICADO',
}

const PACIENTES_MOCK = [
  { id: 1, nombre: 'Abraham García', cedula: '1234567890',
    edad: 35, ciudad: 'Medellín', tipoSangre: 'O_POSITIVO',
    ultimaConsulta: '2025-03-10', totalConsultas: 5,
    diagnosticoActivo: 'Hipertensión arterial', alergias: 'Penicilina' },
  { id: 2, nombre: 'María Rodríguez', cedula: '9876543210',
    edad: 28, ciudad: 'Bogotá', tipoSangre: 'A_POSITIVO',
    ultimaConsulta: '2025-03-05', totalConsultas: 2,
    diagnosticoActivo: null, alergias: null },
  { id: 3, nombre: 'Carlos Martínez', cedula: '5678901234',
    edad: 52, ciudad: 'Cali', tipoSangre: 'B_NEGATIVO',
    ultimaConsulta: '2025-02-28', totalConsultas: 8,
    diagnosticoActivo: 'Diabetes tipo 2', alergias: 'AINEs' },
]

const CONSULTAS_MOCK = [
  { id: 1, paciente: 'Abraham García', fecha: '2025-03-10',
    tipo: 'CONTROL', motivo: 'Control hipertensión',
    estado: 'FINALIZADA', diagnostico: 'I10 - Hipertensión esencial' },
  { id: 2, paciente: 'María Rodríguez', fecha: '2025-03-05',
    tipo: 'PRIMERA_VEZ', motivo: 'Dolor precordial',
    estado: 'FINALIZADA', diagnostico: 'R07.9 - Dolor torácico' },
  { id: 3, paciente: 'Carlos Martínez', fecha: '2025-02-28',
    tipo: 'CONTROL', motivo: 'Control glicemia',
    estado: 'FINALIZADA', diagnostico: 'E11 - Diabetes mellitus tipo 2' },
]

const ALERTAS_MOCK = [
  { id: 1, tipo: 'CRITICA', paciente: 'Carlos Martínez',
    mensaje: 'Glucemia en ayunas 320 mg/dL — valor crítico detectado en último examen.',
    fecha: '2025-03-08', revisada: false },
  { id: 2, tipo: 'ADVERTENCIA', paciente: 'Abraham García',
    mensaje: 'Paciente alérgico a Penicilina — verificar prescripción actual.',
    fecha: '2025-03-06', revisada: false },
  { id: 3, tipo: 'INFO', paciente: 'María Rodríguez',
    mensaje: 'Seguimiento pendiente por opacidad en radiografía de tórax.',
    fecha: '2025-03-01', revisada: true },
]

const TIPO_CONSULTA_LABEL = {
  PRIMERA_VEZ: 'Primera vez', CONTROL: 'Control',
  URGENCIA: 'Urgencia', TELEMEDICINA: 'Telemedicina',
}

export default function MedicoDashboard() {
  const [tabActiva, setTabActiva] = useState('inicio')
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
  const [codigoInput, setCodigoInput] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [alertas, setAlertas] = useState(ALERTAS_MOCK)

  const buscarPaciente = () => {
    if (!codigoInput.trim()) return
    setBuscando(true)
    // Simula búsqueda — con axios será GET /api/pacientes/codigo/{codigo}
    setTimeout(() => {
      setPacienteSeleccionado(PACIENTES_MOCK[0])
      setBuscando(false)
    }, 1000)
  }

  const marcarAlertaRevisada = (id) => {
    setAlertas(alertas.map(a =>
      a.id === id ? { ...a, revisada: true } : a
    ))
  }

  const alertasSinRevisar = alertas.filter(a => !a.revisada).length

  return (
    <div className="flex h-screen overflow-hidden bg-hb-dark">
      <Sidebar rol="MEDICO" usuario={MEDICO_MOCK} />

      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <div className="bg-hb-darkMid border-b border-hb-darkCard px-8 py-5
                        flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-white">
              {tabActiva === 'inicio'      && 'Panel Médico'}
              {tabActiva === 'pacientes'   && 'Mis Pacientes'}
              {tabActiva === 'consultas'   && 'Consultas Recientes'}
              {tabActiva === 'alertas'     && 'Alertas Clínicas'}
              {tabActiva === 'nuevo'       && 'Nueva Consulta'}
            </h1>
            <p className="text-hb-textDim text-sm">
              {MEDICO_MOCK.especialidad} · {MEDICO_MOCK.institucion}
            </p>
          </div>

          {/* Badge verificado */}
          <div className="flex items-center gap-2 bg-hb-mint/10 border border-hb-mint/20
                          rounded-xl px-4 py-2">
            <svg className="w-4 h-4 text-hb-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
                   11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824
                   10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-hb-mint text-sm font-medium">
              ReTHUS Verificado
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-8 pt-6 pb-0 border-b border-hb-darkCard">
          {[
            { id: 'inicio',    label: 'Inicio' },
            { id: 'pacientes', label: 'Pacientes' },
            { id: 'consultas', label: 'Consultas' },
            { id: 'alertas',   label: `Alertas ${alertasSinRevisar > 0 ? `(${alertasSinRevisar})` : ''}` },
            { id: 'nuevo',     label: '+ Nueva Consulta' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setTabActiva(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200
                          ${tabActiva === tab.id
                            ? tab.id === 'nuevo'
                              ? 'border-hb-accent text-hb-accent'
                              : 'border-hb-mint text-white'
                            : tab.id === 'alertas' && alertasSinRevisar > 0
                              ? 'border-transparent text-red-400 hover:text-red-300'
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
                  { label: 'Pacientes activos', valor: PACIENTES_MOCK.length,
                    icon: '👥', bg: 'bg-hb-teal/10 border-hb-teal/20' },
                  { label: 'Consultas este mes', valor: CONSULTAS_MOCK.length,
                    icon: '📋', bg: 'bg-hb-mint/10 border-hb-mint/20' },
                  { label: 'Alertas pendientes', valor: alertasSinRevisar,
                    icon: '⚠️', bg: alertasSinRevisar > 0
                      ? 'bg-red-500/10 border-red-500/20'
                      : 'bg-hb-darkCard border-hb-darkCard' },
                  { label: 'Número ReTHUS', valor: MEDICO_MOCK.numeroRethus,
                    icon: '🏥', bg: 'bg-hb-accent/10 border-hb-accent/20' },
                ].map((stat) => (
                  <div key={stat.label} className={`card border ${stat.bg} flex items-center gap-4`}>
                    <span className="text-3xl">{stat.icon}</span>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.valor}</p>
                      <p className="text-hb-textDim text-xs mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buscar paciente por código */}
              <div className="card border-hb-teal/20">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-hb-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Acceder a historial de paciente
                </h3>
                <p className="text-hb-textDim text-sm mb-4">
                  Ingresa el código de acceso que te compartió el paciente
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={codigoInput}
                    onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
                    placeholder="K7M-P9R-4NQ"
                    className="input-field font-mono tracking-wider flex-1"
                    maxLength={11}
                  />
                  <button onClick={buscarPaciente} disabled={buscando || !codigoInput.trim()}
                    className="btn-primary flex items-center gap-2 px-6">
                    {buscando ? (
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                    Buscar
                  </button>
                </div>

                {/* Resultado búsqueda */}
                {pacienteSeleccionado && (
                  <div className="mt-4 bg-hb-dark rounded-xl p-4 border border-hb-mint/20
                                  animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-hb-mint/10 rounded-full flex items-center
                                      justify-center border-2 border-hb-mint/30 flex-shrink-0">
                        <span className="text-hb-mint font-bold text-lg">
                          {pacienteSeleccionado.nombre.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">
                            {pacienteSeleccionado.nombre}
                          </h4>
                          <span className="badge-teal">
                            {pacienteSeleccionado.tipoSangre.replace('_', ' ')}
                          </span>
                          {pacienteSeleccionado.alergias && (
                            <span className="badge-danger">
                              ⚠️ Alérgico: {pacienteSeleccionado.alergias}
                            </span>
                          )}
                        </div>
                        <p className="text-hb-textDim text-xs">
                          CC {pacienteSeleccionado.cedula} · {pacienteSeleccionado.edad} años · {pacienteSeleccionado.ciudad}
                        </p>
                        {pacienteSeleccionado.diagnosticoActivo && (
                          <p className="text-hb-accent text-xs mt-1">
                            Dx activo: {pacienteSeleccionado.diagnosticoActivo}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setTabActiva('nuevo')}
                          className="btn-mint text-sm">
                          Nueva consulta
                        </button>
                        <button className="btn-secondary text-sm">
                          Ver historial
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Alertas recientes */}
              {alertasSinRevisar > 0 && (
                <div className="card border-red-500/20 bg-red-500/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <span>⚠️</span>
                      {alertasSinRevisar} alerta{alertasSinRevisar > 1 ? 's' : ''} pendiente{alertasSinRevisar > 1 ? 's' : ''}
                    </h3>
                    <button onClick={() => setTabActiva('alertas')}
                      className="text-red-400 hover:text-red-300 text-sm transition-colors">
                      Ver todas →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {alertas.filter(a => !a.revisada).slice(0, 2).map((a) => (
                      <div key={a.id}
                        className="bg-hb-dark rounded-lg p-3 border border-red-500/20
                                   flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                                        ${a.tipo === 'CRITICA' ? 'bg-red-400' : 'bg-hb-accent'}`} />
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{a.paciente}</p>
                          <p className="text-hb-textDim text-xs mt-0.5">{a.mensaje}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Últimas consultas */}
              <div className="card">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-semibold">Últimas consultas</h3>
                  <button onClick={() => setTabActiva('consultas')}
                    className="text-hb-teal hover:text-hb-mint text-sm transition-colors">
                    Ver todas →
                  </button>
                </div>
                <div className="space-y-3">
                  {CONSULTAS_MOCK.slice(0, 2).map((c) => (
                    <div key={c.id}
                      className="flex items-center gap-4 bg-hb-dark rounded-xl p-4
                                 border border-hb-darkCard hover:border-hb-teal/30 transition-all">
                      <div className="w-10 h-10 bg-hb-teal/10 rounded-lg flex items-center
                                      justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-hb-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{c.paciente}</p>
                        <p className="text-hb-textDim text-xs">{c.diagnostico}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="badge-teal">{TIPO_CONSULTA_LABEL[c.tipo]}</span>
                        <p className="text-hb-textDim text-xs mt-1">{c.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ TAB PACIENTES ══ */}
          {tabActiva === 'pacientes' && (
            <div className="space-y-4 animate-fade-in">
              {PACIENTES_MOCK.map((p) => (
                <div key={p.id} className="card hover:border-hb-teal/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-hb-teal/10 rounded-full flex items-center
                                    justify-center border-2 border-hb-teal/20 flex-shrink-0">
                      <span className="text-hb-mint font-bold text-lg">
                        {p.nombre.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-semibold">{p.nombre}</h3>
                        <span className="badge-teal">
                          {p.tipoSangre.replace('_', ' ')}
                        </span>
                        {p.alergias && (
                          <span className="badge-danger">⚠️ {p.alergias}</span>
                        )}
                      </div>
                      <p className="text-hb-textDim text-xs">
                        CC {p.cedula} · {p.edad} años · {p.ciudad}
                      </p>
                      {p.diagnosticoActivo && (
                        <p className="text-hb-accent text-xs mt-1">
                          Dx: {p.diagnosticoActivo}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0 space-y-1">
                      <p className="text-hb-textDim text-xs">
                        Última consulta: {p.ultimaConsulta}
                      </p>
                      <p className="text-hb-textDim text-xs">
                        {p.totalConsultas} consultas totales
                      </p>
                      <div className="flex gap-2 justify-end mt-2">
                        <button className="btn-secondary text-xs py-1.5 px-3">
                          Historial
                        </button>
                        <button onClick={() => setTabActiva('nuevo')}
                          className="btn-mint text-xs py-1.5 px-3">
                          Consulta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ TAB CONSULTAS ══ */}
          {tabActiva === 'consultas' && (
            <div className="space-y-4 animate-fade-in">
              {CONSULTAS_MOCK.map((c) => (
                <div key={c.id} className="card hover:border-hb-teal/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-hb-teal/10 rounded-xl flex items-center
                                    justify-center flex-shrink-0 border border-hb-teal/20 text-xl">
                      📋
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-white font-semibold">{c.paciente}</h3>
                        <span className="badge-teal">{TIPO_CONSULTA_LABEL[c.tipo]}</span>
                        <span className="badge-success">{c.estado}</span>
                      </div>
                      <p className="text-hb-textMuted text-sm mb-1">
                        {c.diagnostico}
                      </p>
                      <p className="text-hb-textDim text-sm italic">"{c.motivo}"</p>
                    </div>
                    <p className="text-hb-textMuted text-sm flex-shrink-0">{c.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ TAB ALERTAS ══ */}
          {tabActiva === 'alertas' && (
            <div className="space-y-4 animate-fade-in">
              {alertas.map((a) => (
                <div key={a.id}
                  className={`card transition-all
                              ${a.revisada ? 'opacity-50' : ''}
                              ${a.tipo === 'CRITICA' && !a.revisada
                                ? 'border-red-500/30 bg-red-500/5'
                                : a.tipo === 'ADVERTENCIA' && !a.revisada
                                  ? 'border-hb-accent/30 bg-hb-accent/5'
                                  : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                    flex-shrink-0 text-xl
                                    ${a.tipo === 'CRITICA' ? 'bg-red-500/20'
                                    : a.tipo === 'ADVERTENCIA' ? 'bg-hb-accent/20'
                                    : 'bg-hb-teal/20'}`}>
                      {a.tipo === 'CRITICA' ? '🚨' : a.tipo === 'ADVERTENCIA' ? '⚠️' : 'ℹ️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-sm">{a.paciente}</h3>
                        {a.revisada
                          ? <span className="badge-success">Revisada</span>
                          : a.tipo === 'CRITICA'
                            ? <span className="badge-danger">Crítica</span>
                            : <span className="badge-warning">Pendiente</span>
                        }
                      </div>
                      <p className="text-hb-textMuted text-sm leading-relaxed">
                        🤖 {a.mensaje}
                      </p>
                      <p className="text-hb-textDim text-xs mt-2">{a.fecha}</p>
                    </div>
                    {!a.revisada && (
                      <button onClick={() => marcarAlertaRevisada(a.id)}
                        className="btn-secondary text-sm flex-shrink-0">
                        Marcar revisada
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ TAB NUEVA CONSULTA ══ */}
          {tabActiva === 'nuevo' && (
            <div className="max-w-3xl animate-fade-in">
              <div className="card">
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                  <span>📋</span> Registrar nueva consulta
                </h3>

                <div className="space-y-5">

                  {/* Paciente */}
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Paciente
                    </label>
                    <select className="input-field">
                      <option value="">Selecciona un paciente</option>
                      {PACIENTES_MOCK.map((p) => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tipo y especialidad */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                        Tipo de consulta
                      </label>
                      <select className="input-field">
                        <option value="PRIMERA_VEZ">Primera vez</option>
                        <option value="CONTROL">Control</option>
                        <option value="URGENCIA">Urgencia</option>
                        <option value="TELEMEDICINA">Telemedicina</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                        Especialidad
                      </label>
                      <input type="text" placeholder="Cardiología"
                        defaultValue={MEDICO_MOCK.especialidad}
                        className="input-field" />
                    </div>
                  </div>

                  {/* Motivo */}
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Motivo de consulta
                    </label>
                    <input type="text" placeholder="Ej: Control hipertensión arterial"
                      className="input-field" />
                  </div>

                  {/* Signos vitales */}
                  <div>
                    <p className="text-sm font-medium text-hb-textMuted mb-3 flex items-center gap-2">
                      <span>❤️</span> Signos vitales
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Peso (kg)',    name: 'pesoKg',              placeholder: '70' },
                        { label: 'Talla (cm)',   name: 'tallaCm',             placeholder: '170' },
                        { label: 'T/A Sistólica',name: 'presionSistolica',    placeholder: '120' },
                        { label: 'T/A Diastólica',name:'presionDiastolica',   placeholder: '80' },
                        { label: 'FC (lpm)',     name: 'frecuenciaCardiaca',  placeholder: '72' },
                        { label: 'Temp (°C)',    name: 'temperatura',         placeholder: '36.5' },
                        { label: 'FR (rpm)',     name: 'frecuenciaRespiratoria', placeholder: '16' },
                        { label: 'SpO2 (%)',     name: 'saturacionOxigeno',   placeholder: '98' },
                        { label: 'Glucemia',     name: 'glucemia',            placeholder: '90' },
                      ].map((campo) => (
                        <div key={campo.name}>
                          <label className="block text-xs text-hb-textDim mb-1">
                            {campo.label}
                          </label>
                          <input type="number" placeholder={campo.placeholder}
                            className="input-field text-sm py-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examen físico */}
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Examen físico y hallazgos
                    </label>
                    <textarea rows={3} placeholder="Describa los hallazgos del examen físico..."
                      className="input-field resize-none" />
                  </div>

                  {/* Diagnóstico CIE-10 */}
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5 flex items-center gap-2">
                      Diagnóstico CIE-10
                      <span className="badge-teal">Res. 3374/2000</span>
                    </label>
                    <div className="flex gap-3">
                      <input type="text" placeholder="Código CIE-10 (ej: I10)"
                        className="input-field w-40 font-mono uppercase" />
                      <input type="text" placeholder="Nombre del diagnóstico"
                        className="input-field flex-1" />
                    </div>
                  </div>

                  {/* Plan de manejo */}
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Plan de manejo
                    </label>
                    <textarea rows={3}
                      placeholder="Tratamiento indicado, medicamentos, recomendaciones..."
                      className="input-field resize-none" />
                  </div>

                  {/* Incapacidad */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                        Días de incapacidad
                      </label>
                      <input type="number" placeholder="0" min="0"
                        className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                        Remisión a especialidad
                      </label>
                      <input type="text" placeholder="Ej: Cardiología"
                        className="input-field" />
                    </div>
                  </div>

                  {/* Alerta IA */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span>🤖</span>
                      <p className="text-purple-300 text-sm font-medium">
                        Análisis Gemini AI
                      </p>
                      <span className="ml-auto text-purple-400 text-xs">Automático al guardar</span>
                    </div>
                    <p className="text-hb-textDim text-xs">
                      Al guardar la consulta, Gemini analizará el diagnóstico contra el
                      historial del paciente y generará alertas de interacciones medicamentosas,
                      alergias y valores críticos.
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setTabActiva('inicio')}
                      className="btn-secondary flex-1">
                      Cancelar
                    </button>
                    <button type="button"
                      className="btn-mint flex-1 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Guardar consulta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}