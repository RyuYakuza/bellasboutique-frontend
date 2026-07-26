import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UsuariosContext } from './UsuariosContext'

function Login() {
  const { usuarios, setUsuarioActual } = useContext(UsuariosContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const usuario = usuarios.find(u => u.correo === email && u.password === password)

    if (!usuario) {
      setError('Correo o contraseña incorrectos')
      return
    }

    setUsuarioActual(usuario)

    if (usuario.rol === 'Cliente') {
      navigate('/catalogo')
    } else {
      navigate('/admin')
    }
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <Link to="/registro">Crear cuenta</Link>
      <br />
      <Link to="/recuperar">Olvidé mi contraseña</Link>
    </div>
  )
}

export default Login