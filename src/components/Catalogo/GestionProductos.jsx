import { useState, useContext } from 'react'
import { UsuariosContext } from '../UsuariosContext'

function GestionProductos() {
  const { usuarioActual } = useContext(UsuariosContext)

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Vestido Elegante', descripcion: 'Vestido de algodon de flores', precio: 80, stock: 12, categoria: 'Ropa', proveedor: 'Proveedor A', imagen: 'vestido.png' },
    { id: 2, nombre: 'Zapatos de Cuero', descripcion: 'Zapatos formales cafes oscuros', precio: 120, stock: 5, categoria: 'Calzado', proveedor: 'Proveedor B', imagen: 'zapatos.png' },
    { id: 3, nombre: 'Bolso Moderno', descripcion: 'Bolso de cuero sintetico rojo', precio: 60, stock: 2, categoria: 'Accesorios', proveedor: 'Proveedor C', imagen: 'bolso.png' }
  ])

  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', stock: '', categoria: '', proveedor: '', imagen: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAgregar = (e) => {
    e.preventDefault()
    const nuevo = { ...form, id: productos.length + 1 }
    setProductos([...productos, nuevo])
    setForm({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', proveedor: '', imagen: '' })
  }

  const handleEliminar = (id) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  const handleEditar = (id, campo, valor) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, [campo]: valor } : p
    ))
  }

  if (!usuarioActual || usuarioActual.rol !== 'Administrador') {
    return <p style={{ color: 'var(--color-primario)', fontWeight: 'bold' }}>No tienes permisos para gestionar productos</p>
  }

  return (
    <div style={{ backgroundColor: 'var(--color-secundario)', padding: '20px' }}>
      <h2 style={{ color: 'var(--color-primario)' }}>Gestión de Productos</h2>

      
      <form onSubmit={handleAgregar} style={{ marginBottom: '20px' }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required />
        <input name="proveedor" placeholder="Proveedor" value={form.proveedor} onChange={handleChange} required />
        <input name="imagen" placeholder="Nombre archivo imagen" value={form.imagen} onChange={handleChange} required />
        <button type="submit">Agregar Producto</button>
      </form>

 
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {productos.map(p => (
          <li key={p.id} style={{
            border: '1px solid var(--color-primario)',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: 'var(--color-blanco)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <strong style={{ color: 'var(--color-primario)' }}>{p.nombre}</strong> - {p.descripcion} - ${p.precio} - Stock: {p.stock} - {p.categoria} - {p.proveedor}
            <br />
            <img src={`../../assets/${p.imagen}`} alt={p.nombre} style={{ width: '100px', marginTop: '8px' }} />
            <br />
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
            <button onClick={() => handleEditar(p.id, 'stock', p.stock + 1)}>+ Stock</button>
            <button onClick={() => handleEditar(p.id, 'stock', p.stock - 1)}>- Stock</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GestionProductos
