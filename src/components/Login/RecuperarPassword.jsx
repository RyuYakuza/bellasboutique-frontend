import { useState, useContext } from 'react'
import { UsuariosContext } from './UsuariosContext'

function RecuperarPassword() {
  const { usuarios, setUsuarios } = useContext(UsuariosContext)
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const usuario = usuarios.find(u => u.correo === correo)

    if (!usuario) {
      setMensaje('No existe un usuario con ese correo')
      return
    }

    const nuevaPassword = Math.random().toString(36).slice(-8)
    const actualizados = usuarios.map(u =>
      u.correo === correo ? { ...u, password: nuevaPassword } : u
    )
    setUsuarios(actualizados)
    setMensaje(`Se generó una nueva contraseña (simulación de envío por correo): ${nuevaPassword}`)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#F4E9E9', padding: '2rem', borderRadius: '12px', width: '280px' }}>
        <h2 style={{ textAlign: 'center', color: '#333333' }}>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={{ width: '100%', boxSizing: 'border-box', marginBottom: '10px', padding: '8px' }}
          />
          <button type="submit" style={{ width: '100%' }}>Recuperar</button>
        </form>
        {mensaje && <p style={{ fontSize: '13px', marginTop: '10px' }}>{mensaje}</p>}
      </div>
    </div>
  )
}

export default RecuperarPassword