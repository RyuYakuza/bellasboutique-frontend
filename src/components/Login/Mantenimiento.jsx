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

  if (!usuarioActual) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Debes iniciar sesión primero</p>

  const inputStyle = { width: '100%', boxSizing: 'border-box', marginBottom: '8px', padding: '8px' }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#F4E9E9', padding: '2rem', borderRadius: '12px', width: '280px' }}>
        <h2 style={{ textAlign: 'center', color: '#333333' }}>Editar Perfil</h2>
        <p style={{ fontSize: '11px', color: '#888', textAlign: 'center' }}>ID: {usuarioActual.id} (no editable)</p>
        <p style={{ fontSize: '11px', color: '#888', textAlign: 'center', marginBottom: '14px' }}>Correo: {usuarioActual.correo} (no editable)</p>
        <form onSubmit={handleSubmit}>
          <input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
          <input name="apellidos" value={form.apellidos} onChange={handleChange} style={inputStyle} />
          <input name="telefono" value={form.telefono} onChange={handleChange} style={inputStyle} />
          <input name="direccion" value={form.direccion} onChange={handleChange} style={inputStyle} />
          <button type="submit" style={{ width: '100%' }}>Guardar cambios</button>
        </form>
      </div>
    </div>
  )
}

export default Mantenimiento