import { useContext, useState } from 'react'
import { UsuariosContext } from './UsuariosContext'

function Mantenimiento() {
  const { usuarioActual, usuarios, setUsuarios } = useContext(UsuariosContext)
  const [form, setForm] = useState({
    nombre: usuarioActual?.nombre || '',
    apellidos: usuarioActual?.apellidos || '',
    telefono: usuarioActual?.telefono || '',
    direccion: usuarioActual?.direccion || '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const actualizados = usuarios.map(u =>
      u.id === usuarioActual.id ? { ...u, ...form } : u
    )
    setUsuarios(actualizados)
    alert('Datos actualizados')
  }

  if (!usuarioActual) return <p>Debes iniciar sesión primero</p>

  return (
    <div>
      <h2>Editar Perfil</h2>
      <p>ID: {usuarioActual.id} (no editable)</p>
      <p>Correo: {usuarioActual.correo} (no editable)</p>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellidos" value={form.apellidos} onChange={handleChange} />
        <input name="telefono" value={form.telefono} onChange={handleChange} />
        <input name="direccion" value={form.direccion} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  )
}

export default Mantenimiento