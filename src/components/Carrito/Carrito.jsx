import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from './CarritoContext'; // Ajusta la ruta si es necesario

const Carrito = () => {
  const { carrito, eliminarProducto } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #eaeaea', paddingBottom: '15px', marginBottom: '30px' }}>
        Tu Carrito de Compras
      </h1>

      {carrito.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>Aún no tienes productos en tu carrito.</p>
          <button onClick={() => navigate('/catalogo')} style={btnVolverStyle}>
            Explorar el Catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Lista de Productos */}
          {carrito.map((item) => (
            <div key={item.id} style={cardStyle}>
              
              {/* Información del producto */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#34495e', fontSize: '1.2rem' }}>{item.nombre}</h3>
                <p style={{ margin: 0, color: '#95a5a6', fontSize: '0.9rem' }}>Precio unitario: ${item.precio}</p>
              </div>
              
              {/* Controles de cantidad y precio */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <span style={{ fontWeight: '500', color: '#555' }}>
                  Cant: {item.cantidad}
                </span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2c3e50', width: '60px', textAlign: 'right' }}>
                  ${item.precio * item.cantidad}
                </span>
                <button onClick={() => eliminarProducto(item.id)} style={btnEliminarStyle}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          {/* Resumen Final */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '30px', 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px' 
          }}>
            <button onClick={() => navigate('/catalogo')} style={btnVolverStyle}>
              ← Volver al Catálogo
            </button>
            <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '1.8rem' }}>
              Total: <span style={{ color: '#27ae60' }}>${total}</span>
            </h2>
          </div>
          
        </div>
      )}
    </div>
  );
};

// --- Objetos de Estilos ---

const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  border: '1px solid #f0f0f0'
};

const btnEliminarStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.2s'
};

const btnVolverStyle = {
  backgroundColor: '#d98cb3', // Manteniendo el tono rosado de tus botones originales
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

export default Carrito;