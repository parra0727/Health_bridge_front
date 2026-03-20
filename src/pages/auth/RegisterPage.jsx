import { useState } from 'react'
import { Link } from 'react-router-dom'

const TIPOS_SANGRE = ['A_POSITIVO','A_NEGATIVO','B_POSITIVO','B_NEGATIVO',
                      'AB_POSITIVO','AB_NEGATIVO','O_POSITIVO','O_NEGATIVO']

const TIPOS_SANGRE_LABEL = {
  A_POSITIVO: 'A+', A_NEGATIVO: 'A-', B_POSITIVO: 'B+', B_NEGATIVO: 'B-',
  AB_POSITIVO: 'AB+', AB_NEGATIVO: 'AB-', O_POSITIVO: 'O+', O_NEGATIVO: 'O-'
}

const ESPECIALIDADES = [
  'Medicina General','Cardiología','Dermatología','Endocrinología',
  'Gastroenterología','Ginecología','Neurología','Oftalmología',
  'Ortopedia','Pediatría','Psiquiatría','Urología','Otra'
]

export default function RegisterPage() {
  const [rol, setRol] = useState('PACIENTE')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    // Campos comunes
    nombreCompleto: '',
    cedula: '',
    correo: '',
    contrasena: '',
    // Paciente
    fechaNacimiento: '',
    sexo: '',
    telefono: '',
    ciudad: '',
    tipoSangre: '',
    // Medico
    numeroRethus: '',
    especialidad: '',
    institucion: '',
    telefonoConsultorio: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const totalSteps = rol === 'PACIENTE' ? 2 : 2

  return (
    <div className="min-h-screen bg-hb-dark flex">

      {/* ── Panel izquierdo decorativo ── */}
      <div className="hidden lg:flex lg:w-5/12 bg-hb-darkMid flex-col justify-between p-12 relative overflow-hidden">

        {/* Círculos decorativos */}
        <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-hb-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-hb-mint/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-hb-teal rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">HealthBridge</span>
        </div>

        {/* Info según rol */}
        <div className="z-10 animate-fade-in">
          {rol === 'PACIENTE' ? (
            <>
              <div className="w-16 h-16 bg-hb-teal/20 rounded-2xl flex items-center 
                              justify-center mb-6 border border-hb-teal/30">
                <svg className="w-8 h-8 text-hb-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Tu salud,<br />
                <span className="text-hb-mint">en tus manos</span>
              </h2>
              <p className="text-hb-textMuted leading-relaxed mb-8">
                Como paciente podrás acceder a tu historial clínico completo, 
                compartirlo con médicos de confianza y recibir análisis 
                inteligentes de tus exámenes.
              </p>
              <div className="space-y-3">
                {[
                  'Historial clínico digital completo',
                  'Control total de accesos médicos',
                  'Análisis de exámenes con IA',
                  'Gestión de EPS y ARL',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-hb-mint/20 rounded-full flex items-center 
                                    justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-hb-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-hb-textMuted text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-hb-accent/20 rounded-2xl flex items-center 
                              justify-center mb-6 border border-hb-accent/30">
                <svg className="w-8 h-8 text-hb-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 
                       11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 
                       10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Verified by<br />
                <span className="text-hb-accent">ReTHUS</span>
              </h2>
              <p className="text-hb-textMuted leading-relaxed mb-8">
                Como médico tu cuenta será verificada contra el Registro 
                Único Nacional de Talento Humano en Salud antes de poder 
                acceder al sistema.
              </p>
              <div className="space-y-3">
                {[
                  'Verificación ReTHUS obligatoria',
                  'Acceso a historiales de pacientes',
                  'Registro de consultas y diagnósticos CIE-10',
                  'Alertas clínicas con IA',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-hb-accent/20 rounded-full flex items-center 
                                    justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-hb-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-hb-textMuted text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="z-10 text-hb-textDim text-xs">
          Resolución 1995/1999 · Ley 1581/2012 · ReTHUS
        </div>
      </div>

      {/* ── Panel derecho — Formulario ── */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-lg animate-slide-up">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-1">Crear cuenta</h2>
            <p className="text-hb-textMuted">Completa tu información para registrarte</p>
          </div>

          {/* Selector de rol */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['PACIENTE', 'MEDICO'].map((r) => (
              <button key={r} type="button" onClick={() => { setRol(r); setStep(1) }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                            border-2 transition-all duration-200 font-medium text-sm
                            ${rol === r
                              ? r === 'PACIENTE'
                                ? 'border-hb-teal bg-hb-teal/10 text-white'
                                : 'border-hb-accent bg-hb-accent/10 text-white'
                              : 'border-hb-darkCard bg-hb-darkMid text-hb-textMuted hover:border-hb-teal/50'
                            }`}>
                {r === 'PACIENTE' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 
                         11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 
                         10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {r === 'PACIENTE' ? 'Soy paciente' : 'Soy médico'}
              </button>
            ))}
          </div>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                text-sm font-bold transition-all duration-300 flex-shrink-0
                                ${i + 1 < step
                                  ? 'bg-hb-mint text-hb-dark'
                                  : i + 1 === step
                                    ? rol === 'PACIENTE' ? 'bg-hb-teal text-white' : 'bg-hb-accent text-hb-dark'
                                    : 'bg-hb-darkCard text-hb-textDim'
                                }`}>
                  {i + 1 < step ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-0.5 transition-all duration-300
                                  ${i + 1 < step ? 'bg-hb-mint' : 'bg-hb-darkCard'}`} />
                )}
              </div>
            ))}
            <span className="text-hb-textDim text-sm ml-2 flex-shrink-0">
              {step === 1 ? 'Datos personales' : rol === 'PACIENTE' ? 'Datos médicos' : 'Datos profesionales'}
            </span>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ── STEP 1 — Datos comunes ── */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Nombre completo
                  </label>
                  <input type="text" name="nombreCompleto" value={form.nombreCompleto}
                    onChange={handleChange} placeholder="Abraham García"
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Cédula de ciudadanía
                  </label>
                  <input type="text" name="cedula" value={form.cedula}
                    onChange={handleChange} placeholder="1234567890"
                    className="input-field" required />
                  <p className="text-hb-textDim text-xs mt-1">Entre 6 y 12 dígitos</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Correo electrónico
                  </label>
                  <input type="email" name="correo" value={form.correo}
                    onChange={handleChange} placeholder="tu@correo.com"
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'}
                      name="contrasena" value={form.contrasena}
                      onChange={handleChange} placeholder="Mínimo 8 caracteres"
                      className="input-field pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center 
                                 text-hb-textDim hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d={showPassword
                            ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          } />
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="button" onClick={() => setStep(2)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 
                              rounded-lg font-semibold transition-all duration-200 active:scale-95
                              ${rol === 'PACIENTE'
                                ? 'bg-hb-teal hover:bg-hb-tealLight text-white'
                                : 'bg-hb-accent hover:opacity-90 text-hb-dark'
                              }`}>
                  Continuar
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            )}

            {/* ── STEP 2 PACIENTE ── */}
            {step === 2 && rol === 'PACIENTE' && (
              <div className="space-y-4 animate-fade-in">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Fecha de nacimiento
                    </label>
                    <input type="date" name="fechaNacimiento" value={form.fechaNacimiento}
                      onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Sexo
                    </label>
                    <select name="sexo" value={form.sexo} onChange={handleChange}
                      className="input-field" required>
                      <option value="">Selecciona</option>
                      <option value="MASCULINO">Masculino</option>
                      <option value="FEMENINO">Femenino</option>
                      <option value="OTRO">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Teléfono
                    </label>
                    <input type="tel" name="telefono" value={form.telefono}
                      onChange={handleChange} placeholder="3001234567"
                      className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                      Ciudad
                    </label>
                    <input type="text" name="ciudad" value={form.ciudad}
                      onChange={handleChange} placeholder="Medellín"
                      className="input-field" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Tipo de sangre
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {TIPOS_SANGRE.map((tipo) => (
                      <button key={tipo} type="button"
                        onClick={() => setForm({ ...form, tipoSangre: tipo })}
                        className={`py-2 rounded-lg text-sm font-bold border-2 transition-all duration-200
                                    ${form.tipoSangre === tipo
                                      ? 'border-hb-teal bg-hb-teal/20 text-white'
                                      : 'border-hb-darkCard bg-hb-darkCard text-hb-textMuted hover:border-hb-teal/50'
                                    }`}>
                        {TIPOS_SANGRE_LABEL[tipo]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consentimiento */}
                <div className="bg-hb-darkCard rounded-xl p-4 border border-hb-darkCard">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-hb-teal" required />
                    <span className="text-sm text-hb-textMuted leading-relaxed">
                      Acepto el tratamiento de mis datos personales de salud conforme a la{' '}
                      <span className="text-hb-mint font-medium">Ley 1581 de 2012</span>{' '}
                      y autorizo el acceso a mi historia clínica por parte de los profesionales
                      de salud que yo autorice explícitamente.
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="btn-secondary flex-1">
                    ← Atrás
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 
                               rounded-lg font-semibold bg-hb-teal hover:bg-hb-tealLight 
                               text-white transition-all duration-200 active:scale-95">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Registrando...
                      </>
                    ) : 'Crear cuenta'}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2 MEDICO ── */}
            {step === 2 && rol === 'MEDICO' && (
              <div className="space-y-4 animate-fade-in">

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Número ReTHUS
                  </label>
                  <input type="text" name="numeroRethus" value={form.numeroRethus}
                    onChange={handleChange} placeholder="12345"
                    className="input-field" required />
                  <p className="text-hb-textDim text-xs mt-1">
                    Registro Único Nacional de Talento Humano en Salud
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Especialidad
                  </label>
                  <select name="especialidad" value={form.especialidad}
                    onChange={handleChange} className="input-field" required>
                    <option value="">Selecciona tu especialidad</option>
                    {ESPECIALIDADES.map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Institución
                  </label>
                  <input type="text" name="institucion" value={form.institucion}
                    onChange={handleChange} placeholder="Hospital San Vicente"
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-hb-textMuted mb-1.5">
                    Teléfono consultorio
                  </label>
                  <input type="tel" name="telefonoConsultorio" value={form.telefonoConsultorio}
                    onChange={handleChange} placeholder="6041234567"
                    className="input-field" />
                </div>

                {/* Alerta verificacion */}
                <div className="bg-hb-accent/10 border border-hb-accent/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-hb-accent flex-shrink-0 mt-0.5" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-hb-accent text-sm">
                      Tu cuenta quedará en estado <strong>PENDIENTE</strong> hasta que 
                      un administrador verifique tu número ReTHUS en el registro oficial.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="btn-secondary flex-1">
                    ← Atrás
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6
                               rounded-lg font-semibold bg-hb-accent hover:opacity-90
                               text-hb-dark transition-all duration-200 active:scale-95">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Registrando...
                      </>
                    ) : 'Solicitar registro'}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Link login */}
          <p className="text-center text-hb-textMuted text-sm mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login"
              className="text-hb-mint hover:text-hb-tealLight font-medium transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}