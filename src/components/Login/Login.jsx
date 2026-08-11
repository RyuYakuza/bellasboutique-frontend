import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UsuariosContext } from './UsuariosContext'
import { registrarAccion } from '../Bitacora/BitacoraHelper';

function Login() {
  const { usuarios, setUsuarioActual, setIntentosLogin } = useContext(UsuariosContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const usuario = usuarios.find(u => u.correo === email && u.password === password)
    const nuevoIntento = {
      correo: email,
      fecha: new Date().toISOString(),
      exitoso: !!usuario,
    }
    setIntentosLogin(prev => [...prev, nuevoIntento])

    if (!usuario) {
      setError('Correo o contraseña incorrectos')
      registrarAccion('Intento de login fallido', `Intento con el correo: ${email}`);
      return
    }

    setUsuarioActual(usuario);
    localStorage.setItem('usuario_actual', JSON.stringify(usuario));

    registrarAccion('Inicio de sesión', `El usuario ${usuario.correo} inició sesión como ${usuario.rol}`);

    if (usuario.rol === 'Cliente') {
      navigate('/catalogo')
    } else {
      navigate('/perfil')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: '#F4E9E9',
        padding: '2rem',
        borderRadius: '12px',
        width: '280px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333333' }}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', marginBottom: '14px' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ width: '100%' }}>Ingresar</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <Link to="/registro" style={{ color: '#D88C9A', fontSize: '13px' }}>Crear cuenta</Link>
          <br />
          <Link to="/recuperar" style={{ color: '#D88C9A', fontSize: '13px' }}>Olvidé mi contraseña</Link>
        </div>
      </div>
    </div>
  )
}

export default Login