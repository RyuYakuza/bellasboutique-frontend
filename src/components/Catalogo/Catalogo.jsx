import { useState, useContext } from 'react'
import Menu from "../Estructura/Menu";
import vestidoImg from '../../assets/vestido.png'
import zapatosImg from '../../assets/zapatos.png'
import bolsoImg from '../../assets/bolso.png'
import camisaImg from '../../assets/camisa.png'
import sandaliasImg from '../../assets/sandalias.png'
import relojImg from '../../assets/reloj.png'
import { CarritoContext } from '../Carrito/CarritoContext';
import { Link } from 'react-router-dom'; // 1. Agrega esta importación

  const productos = [
    { id: 1, nombre: 'Vestido Elegante', descripcion: 'Vestido de algodon flores', precio: 80, stock: 12, categoria: 'Ropa', proveedor: 'Proveedor A', imagen: vestidoImg },
    { id: 2, nombre: 'Zapatos de Cuero', descripcion: 'Zapatos formales cafe oscuro', precio: 120, stock: 5, categoria: 'Calzado', proveedor: 'Proveedor AA', imagen: zapatosImg },
    { id: 3, nombre: 'Bolso Moderno', descripcion: 'Bolso de cuero sintetico rojo', precio: 60, stock: 2, categoria: 'Accesorios', proveedor: 'Proveedor A', imagen: bolsoImg },
    { id: 4, nombre: 'Camisa Casual', descripcion: 'Camisa color beige', precio: 40, stock: 20, categoria: 'Ropa', proveedor: 'Proveedor AAA', imagen: camisaImg },
    { id: 5, nombre: 'Sandalias Verano', descripcion: 'Sandalias comodas para playa', precio: 35, stock: 3, categoria: 'Calzado', proveedor: 'Proveedor AA', imagen: sandaliasImg },
    { id: 6, nombre: 'Reloj Deportivo', descripcion: 'Reloj resistente al agua', precio: 150, stock: 8, categoria: 'Accesorios', proveedor: 'Proveedor A', imagen: relojImg }
  ]

function Catalogo() {
  const [filtro, setFiltro] = useState('')

  // 2. Extrae 'carrito' junto con la función
  const { agregarAlCarrito, carrito } = useContext(CarritoContext); 

  // 3. Calcula cuántos artículos hay en total (sumando las cantidades)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);


  const productosFiltrados = productos.filter(p =>
    filtro === '' || p.categoria === filtro
  )


  return (
   <>
   <Menu />
    {/* Encabezado con el enlace al carrito */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: 'var(--color-blanco)',
        borderBottom: '2px solid var(--color-primario)'
      }}>
        <h2 style={{ color: 'var(--color-primario)', margin: 0 }}></h2>
        
        <Link to="/carrito" style={{ 
          textDecoration: 'none', 
          backgroundColor: 'var(--color-primario)', 
          color: 'white', 
          padding: '10px 15px', 
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          🛒 Ir al Carrito ({cantidadTotal})
        </Link>
      </div>

    <div style={{ backgroundColor: 'var(--color-secundario)', padding: '20px' }}>
      <h2 style={{ color: 'var(--color-primario)' }}>Catalogo de Productos</h2>

     
      <select 
        value={filtro} 
        onChange={(e) => setFiltro(e.target.value)} 
        style={{ 
          marginBottom: '20px', 
          padding: '8px', 
          borderRadius: '6px', 
          border: '1px solid var(--color-primario)', 
          fontFamily: 'Poppins, sans-serif' 
        }}
      >
        <option value="">Todas las categorias</option>
        <option value="Ropa">Ropa</option>
        <option value="Calzado">Calzado</option>
        <option value="Accesorios">Accesorios</option>
      </select>

     
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {productosFiltrados.map(p => (
          <div key={p.id} style={{ 
            border: '1px solid var(--color-primario)', 
            padding: '10px', 
            width: '220px', 
            borderRadius: '8px', 
            backgroundColor: 'var(--color-blanco)', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
          }}>
            <img src={p.imagen} alt={p.nombre} style={{ width: '100%' }} />
            <h3 style={{ color: 'var(--color-primario)' }}>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <p><strong>Categoria:</strong> {p.categoria}</p>
            <p><strong>Proveedor:</strong> {p.proveedor}</p>

            {/* Aviso de stock bajo */}
            {p.stock < 5 && (
              <p style={{ color: 'var(--color-primario)', fontWeight: 'bold' }}> Stock bajo</p>
            )}

            <button 
              disabled={p.stock === 0}
              onClick={() => agregarAlCarrito(p)}
              >
                Anadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
    </> 
  )
}

export default Catalogo
