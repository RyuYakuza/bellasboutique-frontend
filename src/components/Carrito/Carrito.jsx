import React, { useContext } from 'react';
import Menu from "../Estructura/Menu";
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from './CarritoContext'; 

const Carrito = () => {
  // Extraemos también 'actualizarCantidad' desde el contexto
  const { carrito, eliminarProducto, actualizarCantidad } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <Menu />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                
                {/* Botones de Incremento / Decremento */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                    style={btnCantidadStyle}
                    title="Reducir cantidad"
                  >
                    -
                  </button>
                  
                  <span style={{ fontWeight: 'bold', color: '#2c3e50', minWidth: '24px', textAlign: 'center' }}>
                    {item.cantidad}
                  </span>

                  <button 
                    onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    style={btnCantidadStyle}
                    title="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2c3e50', width: '70px', textAlign: 'right' }}>
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
          <button 
            onClick={() => navigate('/checkout')} 
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Proceder al Pago →
          </button>
        </div>
      )}
    </div>
  );
};

// --- Objetos de Estilos ---

const cardStyle = {
  display: 'flex',
  justify: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  border: '1px solid #f0f0f0'
};

const btnCantidadStyle = {
  width: '30px',
  height: '30px',
  backgroundColor: '#e0e0e0',
  color: '#2c3e50',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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
  backgroundColor: '#d98cb3',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

export default Carrito;