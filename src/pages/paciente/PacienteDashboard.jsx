import { useState, useEffect } from 'react'
import Sidebar from '../../components/common/Sidebar'

const USUARIO_MOCK = {
  nombre: 'Abraham García',
  cedula: '1234567890',
  correo: 'abraham@gmail.com',
  tipoSangre: 'O_POSITIVO',
  ciudad: 'Medellín',
  codigoAcceso: 'K7M-P9R-4NQ',
  codigoExpira: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 horas desde ahora
}

const CONSULTAS_MOCK = [
  { id: 1, fecha: '2025-03-10', tipo: 'CONTROL', especialidad: 'Cardiología',
    medico: 'Dr. Juan Pérez', institucion: 'Clínica Las Américas',
    motivo: 'Control hipertensión', estado: 'FINALIZADA' },
  { id: 2, fecha: '2025-02-20', tipo: 'PRIMERA_VEZ', especialidad: 'Medicina General',
    medico: 'Dra. María López', institucion: 'Centro Médico Sura',
    motivo: 'Dolor lumbar persistente', estado: 'FINALIZADA' },
  { id: 3, fecha: '2025-01-15', tipo: 'URGENCIA', especialidad: 'Urgencias',
    medico: 'Dr. Carlos Ruiz', institucion: 'Hospital San Vicente',
    motivo: 'Fiebre alta 39°C', estado: 'FINALIZADA' },
]

const EXAMENES_MOCK = [
  { id: 1, nombre: 'Hemograma completo', tipo: 'LABORATORIO',
    fecha: '2025-03-08', estado: 'DISPONIBLE',
    tieneValoresCriticos: false, alertaIa: null },
  { id: 2, nombre: 'Radiografía de tórax', tipo: 'IMAGEN',
    fecha: '2025-02-18', estado: 'DISPONIBLE',
    tieneValoresCriticos: false,
    alertaIa: 'Leve opacidad en lóbulo inferior derecho. Recomendable seguimiento.' },
  { id: 3, nombre: 'Electrocardiograma', tipo: 'ELECTROCARDIOGRAMA',
    fecha: '2025-01-10', estado: 'DISPONIBLE',
    tieneValoresCriticos: true,
    alertaIa: 'Frecuencia cardíaca elevada detectada. Consultar con cardiólogo.' },
]

const ACCESOS_MOCK = [
  { id: 1, medico: 'Dr. Juan Pérez', especialidad: 'Cardiología',
    institucion: 'Clínica Las Américas', ultimoAcceso: '2025-03-10',
    estado: 'ACTIVO', nivelPermiso: 'LECTURA_ESCRITURA' },
  { id: 2, medico: 'Dra. María López', especialidad: 'Medicina General',
    institucion: 'Centro Médico Sura', ultimoAcceso: '2025-02-20',
    estado: 'ACTIVO', nivelPermiso: 'LECTURA' },
]

const TIPO_CONSULTA_LABEL = {
  PRIMERA_VEZ: 'Primera vez', CONTROL: 'Control',
  URGENCIA: 'Urgencia', TELEMEDICINA: 'Telemedicina',
  PROCEDIMIENTO: 'Procedimiento',
}

const TIPO_EXAMEN_ICON = {
  LABORATORIO: '🧪', IMAGEN: '🩻', ELECTROCARDIOGRAMA: '❤️',
  PATOLOGIA: '🔬', ENDOSCOPIA: '🔭', OFTALMOLOGIA: '👁️', OTRO: '📄',
}

// ── Countdown hook ──
function useCountdown(expira) {
  const [restante, setRestante] = useState('')

  useEffect(() => {
    const calcular = () => {
      const diff = new Date(expira) - new Date()
      if (diff <= 0) { setRestante('Expirado'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setRestante(`${h}h ${m}m`)
    }
    calcular()
    const interval = setInterval(calcular, 60000)
    return () => clearInterval(interval)
  }, [expira])

  return restante
}

export default function PacienteDashboard() {
  const [tabActiva, setTabActiva] = useState('inicio')
  const [copiado, setCopiado] = useState(false)
  const [codigo, setCodigo] = useState(USUARIO_MOCK.codigoAcceso)
  const [expira, setExpira] = useState(USUARIO_MOCK.codigoExpira)
  const [regenerando, setRegenerando] = useState(false)
  const tiempoRestante = useCountdown(expira)

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigo)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  // Simula regenerar — cuando conectemos el back será axios.post
  const regenerarCodigo = () => {
    setRegenerando(true)
    setTimeout(() => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      const nuevo = Array.from({ length: 9 }, (_, i) =>
        i === 3 || i === 6 ? '-' : chars[Math.floor(Math.random() * chars.length)]
      ).join('')
      setCodigo(nuevo)
      setExpira(new Date(Date.now() + 24 * 60 * 60 * 1000))
      setRegenerando(false)
    }, 800)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-hb-dark">
      <Sidebar rol="PACIENTE" usuario={USUARIO_MOCK} />

      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <div className="bg-hb-darkMid border-b border-hb-darkCard px-8 py-5
                        flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-white">
              {tabActiva === 'inicio'    && 'Mi Panel'}
              {tabActiva === 'historial' && 'Mi Historial Clínico'}
              {tabActiva === 'consultas' && 'Mis Consultas'}
              {tabActiva === 'examenes'  && 'Mis Exámenes'}
              {tabActiva === 'accesos'   && 'Médicos con Acceso'}
            </h1>
            <p className="text-hb-textDim text-sm">
              Bienvenido, {USUARIO_MOCK.nombre.split(' ')[0]}
            </p>
          </div>

          {/* Código dinámico */}
          <div className="bg-hb-darkCard rounded-xl px-4 py-2.5 border border-hb-darkCard
                          flex items-center gap-3">
            <div>
              <p className="text-hb-textDim text-xs">Código de acceso</p>
              <p className="text-hb-mint font-bold font-mono tracking-wider text-sm">
                {codigo}
              </p>
              <p className={`text-xs mt-0.5 ${
                tiempoRestante === 'Expirado' ? 'text-red-400' : 'text-hb-textDim'
              }`}>
                ⏱ Expira en: {tiempoRestante}
              </p>
            </div>

            {/* Copiar */}
            <button onClick={copiarCodigo}
              className="text-hb-textDim hover:text-hb-mint transition-colors p-1"
              title="Copiar código">
              {copiado ? (
                <svg className="w-5 h-5 text-hb-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>

            {/* Regenerar */}
            <button onClick={regenerarCodigo} disabled={regenerando}
              className="text-hb-textDim hover:text-hb-accent transition-colors p-1
                         disabled:opacity-50"
              title="Regenerar código">
              <svg className={`w-5 h-5 ${regenerando ? 'animate-spin' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-8 pt-6 pb-0 border-b border-hb-darkCard">
          {[
            { id: 'inicio',    label: 'Inicio' },
            { id: 'historial', label: 'Historial' },
            { id: 'consultas', label: 'Consultas' },
            { id: 'examenes',  label: 'Exámenes' },
            { id: 'accesos',   label: 'Accesos' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setTabActiva(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200
                          ${tabActiva === tab.id
                            ? 'border-hb-mint text-white'
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
                  { label: 'Consultas totales', valor: CONSULTAS_MOCK.length,
                    icon: '📋', bg: 'bg-hb-teal/10 border-hb-teal/20' },
                  { label: 'Exámenes', valor: EXAMENES_MOCK.length,
                    icon: '🧪', bg: 'bg-hb-mint/10 border-hb-mint/20' },
                  { label: 'Médicos con acceso', valor: ACCESOS_MOCK.length,
                    icon: '👨‍⚕️', bg: 'bg-hb-accent/10 border-hb-accent/20' },
                  { label: 'Alertas IA', valor: EXAMENES_MOCK.filter(e => e.alertaIa).length,
                    icon: '🤖', bg: 'bg-purple-500/10 border-purple-500/20' },
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

              <div className="grid lg:grid-cols-2 gap-6">

                {/* Info personal */}
                <div className="card">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-hb-teal/20 rounded-full flex items-center
                                    justify-center border-2 border-hb-teal/30">
                      <span className="text-hb-mint font-bold text-lg">
                        {USUARIO_MOCK.nombre.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{USUARIO_MOCK.nombre}</h3>
                      <p className="text-hb-textDim text-sm">CC {USUARIO_MOCK.cedula}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Tipo de sangre', valor: USUARIO_MOCK.tipoSangre.replace('_', ' '), badge: true },
                      { label: 'Ciudad', valor: USUARIO_MOCK.ciudad },
                      { label: 'Correo', valor: USUARIO_MOCK.correo },
                    ].map((item) => (
                      <div key={item.label} className="bg-hb-dark rounded-lg p-3 border border-hb-darkCard">
                        <p className="text-hb-textDim text-xs mb-1">{item.label}</p>
                        {item.badge
                          ? <span className="badge-teal">{item.valor}</span>
                          : <p className="text-white text-sm font-medium truncate">{item.valor}</p>
                        }
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumen IA */}
                <div className="card border border-purple-500/20 bg-purple-500/5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Resumen IA</h3>
                      <p className="text-hb-textDim text-xs">Generado por Gemini Flash</p>
                    </div>
                    <span className="ml-auto badge-teal">Actualizado</span>
                  </div>
                  <p className="text-hb-textMuted text-sm leading-relaxed">
                    Paciente de historial sin patologías crónicas registradas.
                    Última consulta por control cardiológico sin hallazgos relevantes.
                    Radiografía con leve opacidad pendiente de seguimiento.
                    Se recomienda control en 3 meses.
                  </p>
                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <p className="text-hb-textDim text-xs">
                      ⚠️ Este resumen es orientativo. Consulta siempre con tu médico.
                    </p>
                  </div>
                </div>
              </div>

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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{c.especialidad}</p>
                        <p className="text-hb-textDim text-xs">{c.medico} · {c.institucion}</p>
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

          {/* ══ TAB HISTORIAL ══ */}
          {tabActiva === 'historial' && (
            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
              {[
                { titulo: 'Antecedentes Patológicos', icono: '🏥',
                  contenido: 'Hipertensión arterial diagnosticada 2020. Sin otras patologías crónicas registradas.',
                  color: 'border-red-500/20 bg-red-500/5' },
                { titulo: 'Antecedentes Familiares', icono: '👨‍👩‍👧',
                  contenido: 'Padre con diabetes tipo 2. Madre con hipertensión arterial.',
                  color: 'border-hb-accent/20 bg-hb-accent/5' },
                { titulo: 'Alergias', icono: '⚠️',
                  contenido: 'Alergia a Penicilina (reacción urticarial). Sin otras alergias medicamentosas conocidas.',
                  color: 'border-yellow-500/20 bg-yellow-500/5' },
                { titulo: 'Medicamentos Crónicos', icono: '💊',
                  contenido: 'Losartán 50mg cada 24 horas. Aspirina 100mg cada 24 horas.',
                  color: 'border-hb-teal/20 bg-hb-teal/5' },
                { titulo: 'Hábitos', icono: '🏃',
                  contenido: 'No fumador. Consumo ocasional de alcohol. Actividad física 3 veces por semana.',
                  color: 'border-hb-mint/20 bg-hb-mint/5' },
                { titulo: 'Información Religiosa', icono: '✝️',
                  contenido: 'Sin restricciones médico-religiosas registradas.',
                  color: 'border-purple-500/20 bg-purple-500/5' },
              ].map((item) => (
                <div key={item.titulo} className={`card border ${item.color}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icono}</span>
                    <h3 className="text-white font-semibold text-sm">{item.titulo}</h3>
                  </div>
                  <p className="text-hb-textMuted text-sm leading-relaxed">{item.contenido}</p>
                </div>
              ))}
            </div>
          )}

          {/* ══ TAB CONSULTAS ══ */}
          {tabActiva === 'consultas' && (
            <div className="space-y-4 animate-fade-in">
              {CONSULTAS_MOCK.map((c) => (
                <div key={c.id} className="card hover:border-hb-teal/30 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-hb-teal/10 rounded-xl flex items-center
                                    justify-center flex-shrink-0 border border-hb-teal/20">
                      <svg className="w-6 h-6 text-hb-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-white font-semibold">{c.especialidad}</h3>
                        <span className="badge-teal">{TIPO_CONSULTA_LABEL[c.tipo]}</span>
                        <span className="badge-success">{c.estado}</span>
                      </div>
                      <p className="text-hb-textMuted text-sm mb-1">{c.medico} · {c.institucion}</p>
                      <p className="text-hb-textDim text-sm italic">"{c.motivo}"</p>
                    </div>
                    <p className="text-hb-textMuted text-sm flex-shrink-0">{c.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ TAB EXÁMENES ══ */}
          {tabActiva === 'examenes' && (
            <div className="space-y-4 animate-fade-in">
              {EXAMENES_MOCK.map((e) => (
                <div key={e.id}
                  className={`card transition-all cursor-pointer
                              ${e.tieneValoresCriticos ? 'border-red-500/30 hover:border-red-500/50'
                              : e.alertaIa ? 'border-hb-accent/30 hover:border-hb-accent/50'
                              : 'hover:border-hb-teal/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-hb-darkCard rounded-xl flex items-center
                                    justify-center flex-shrink-0 text-2xl">
                      {TIPO_EXAMEN_ICON[e.tipo]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-white font-semibold">{e.nombre}</h3>
                        {e.tieneValoresCriticos && <span className="badge-danger">⚠️ Valores críticos</span>}
                        {!e.tieneValoresCriticos && e.alertaIa && <span className="badge-warning">🤖 Alerta IA</span>}
                        {!e.alertaIa && <span className="badge-success">✓ Normal</span>}
                      </div>
                      <p className="text-hb-textDim text-sm mb-2">{e.tipo} · {e.fecha}</p>
                      {e.alertaIa && (
                        <div className={`rounded-lg p-3 text-sm
                                        ${e.tieneValoresCriticos
                                          ? 'bg-red-900/20 border border-red-500/20 text-red-300'
                                          : 'bg-hb-accent/10 border border-hb-accent/20 text-hb-accent'}`}>
                          🤖 {e.alertaIa}
                        </div>
                      )}
                    </div>
                    <button className="btn-secondary text-sm flex-shrink-0">Ver PDF</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ TAB ACCESOS ══ */}
          {tabActiva === 'accesos' && (
            <div className="space-y-4 animate-fade-in">
              <div className="card border-hb-teal/20 bg-hb-teal/5 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-hb-mint flex-shrink-0 mt-0.5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-hb-textMuted text-sm">
                    Comparte tu código{' '}
                    <span className="text-hb-mint font-bold font-mono">{codigo}</span>
                    {' '}con tu médico para que pueda solicitar acceso.
                    Tú decides quién puede verlo y puedes revocar el acceso en cualquier momento.
                  </p>
                </div>
              </div>
              {ACCESOS_MOCK.map((a) => (
                <div key={a.id} className="card hover:border-hb-teal/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-hb-teal/10 rounded-full flex items-center
                                    justify-center border-2 border-hb-teal/20 flex-shrink-0">
                      <span className="text-hb-mint font-bold">{a.medico.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-sm">{a.medico}</h3>
                        <span className="badge-success">{a.estado}</span>
                      </div>
                      <p className="text-hb-textDim text-xs">{a.especialidad} · {a.institucion}</p>
                      <p className="text-hb-textDim text-xs mt-1">
                        Último acceso: {a.ultimoAcceso} · {a.nivelPermiso.replace('_', ' ')}
                      </p>
                    </div>
                    <button className="badge-danger cursor-pointer hover:opacity-80 transition-opacity">
                      Revocar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}