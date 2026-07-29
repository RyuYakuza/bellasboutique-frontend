import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsuariosContext } from './UsuariosContext'

function Registro() {
  const { usuarios, setUsuarios } = useContext(UsuariosContext)
  const [form, setForm] = useState({
    cedula: '', nombre: '', apellidos: '', correo: '',
    telefono: '', direccion: '', password: '', rol: 'Cliente'
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const passwordValida = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    return regex.test(pass)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!passwordValida(form.password)) {
      setError('La contraseña debe tener mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres')
      return
    }

    if (usuarios.some(u => u.correo === form.correo)) {
      setError('Ya existe un usuario con ese correo')
      return
    }

    const nuevoUsuario = { ...form, id: usuarios.length + 1 }
    setUsuarios([...usuarios, nuevoUsuario])
    navigate('/')
  }

  const inputStyle = { width: '100%', boxSizing: 'border-box', marginBottom: '8px', padding: '8px' }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#F4E9E9', padding: '2rem', borderRadius: '12px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', color: '#333333' }}>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input name="cedula" placeholder="Cédula" onChange={handleChange} required style={inputStyle} />
          <input name="nombre" placeholder="Nombre" onChange={handleChange} required style={inputStyle} />
          <input name="apellidos" placeholder="Apellidos" onChange={handleChange} required style={inputStyle} />
          <input name="correo" type="email" placeholder="Correo" onChange={handleChange} required style={inputStyle} />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} required style={inputStyle} />
          <input name="direccion" placeholder="Dirección" onChange={handleChange} required style={inputStyle} />
          <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required style={inputStyle} />
          <select name="rol" onChange={handleChange} style={inputStyle}>
            <option value="Cliente">Cliente</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Administrador">Administrador</option>
          </select>
          {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
          <button type="submit" style={{ width: '100%' }}>Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Registro