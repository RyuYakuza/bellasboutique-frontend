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
    <div>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        <button type="submit">Recuperar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default RecuperarPassword