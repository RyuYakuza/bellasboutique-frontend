import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from './CarritoContext'; // Ajusta la ruta a tu contexto
import Factura from './Factura';
import { registrarAccion } from '../Bitacora/BitacoraHelper';

const Checkout = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // Estados locales para el formulario de facturación
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    direccion: '',
    metodoPago: 'tarjeta'
  });

  const [compraExitosa, setCompraExitosa] = useState(false);
  const [detallesFactura, setDetallesFactura] = useState([]);

  // Calcular total a pagar
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const autocompletarPrueba = () => {
    setDatosFormulario({
      nombre: 'Usuario Estudiante',
      email: 'estudiante@proyecto.edu',
      direccion: 'Calle Falsa 123, Entorno Virtual',
      metodoPago: 'tarjeta'
    });
  };
  
  const manejarCambio = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
// Estructura de la nueva venta
    const nuevaVenta = {
      id: `VENTA-${Math.floor(1000 + Math.random() * 9000)}`,
      fecha: new Date().toLocaleString('es-CR', { dateStyle: 'medium', timeStyle: 'short' }),
      usuario: { ...datosFormulario },
      metodoPago: datosFormulario.metodoPago || 'Tarjeta de Crédito',
      productos: [...carrito]
    };

    // Guardar en localStorage acumulando las ventas existentes
    const historialPrevio = JSON.parse(localStorage.getItem('historial_ventas')) || [];
    localStorage.setItem('historial_ventas', JSON.stringify([nuevaVenta, ...historialPrevio]));

    //  Preparar la factura actual y vaciar el carrito
    setDetallesFactura([...carrito]);
    setCompraExitosa(true);
    registrarAccion('Compra finalizada', `Monto total procesado: $${total}`);
    vaciarCarrito();
  };

  if (compraExitosa) {
    return (
      <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#27ae60' }}>¡Gracias por tu compra! 🎉</h1>
        <p>Hemos enviado la factura de confirmación a: <strong>{datosFormulario.email}</strong></p>
        <p>Tu pedido será enviado a: <strong>{datosFormulario.direccion}</strong></p>
        
      <Factura 
        detallesCompra={detallesFactura} 
        datosCliente={datosFormulario} 
        onVolver={() => navigate('/catalogo')} 
      />
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        Facturación y Pago
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        

        {/* Formulario de Datos */}
        <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3>Datos de Envío y Facturación</h3>

          <div>
            <label style={labelEstilo}>Nombre completo:</label>
            <input 
              type="text" 
              name="nombre" 
              required
              value={datosFormulario.nombre}
              onChange={manejarCambio}
              style={inputEstilo}
              placeholder="Ej. María Pérez"
            />
          </div>

          <div>
            <label style={labelEstilo}>Correo Electrónico:</label>
            <input 
              type="email" 
              name="email" 
              required
              value={datosFormulario.email}
              onChange={manejarCambio}
              style={inputEstilo}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label style={labelEstilo}>Dirección de Entrega:</label>
            <input 
              type="text" 
              name="direccion" 
              required
              value={datosFormulario.direccion}
              onChange={manejarCambio}
              style={inputEstilo}
              placeholder="Calle Principal #123"
            />
          </div>

          <div>
            <label style={labelEstilo}>Método de Pago:</label>
            <select 
              name="metodoPago" 
              value={datosFormulario.metodoPago} 
              onChange={manejarCambio}
              style={inputEstilo}
            >
              <option value="tarjeta">Tarjeta de Crédito / Débito</option>
              <option value="transferencia">Transferencia Bancaria</option>
              <option value="efectivo">Pago contra entrega</option>
            </select>
          </div>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button type="button" onClick={() => navigate('/carrito')} style={btnEstiloSecundario}>
              Volver al Carrito
            </button>
            <button type="submit" style={btnEstiloPrincipal}>
              Finalizar Compra
            </button>
          </div>
          <button 
            type="button" 
            onClick={autocompletarPrueba}
            style={{ marginBottom: '15px', padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
            Llenar con datos de prueba
            </button>
        </form>
        
        {/* Resumen del Pedido */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', height: 'fit-content' }}>
          <h3>Resumen de la Orden</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrito.map((item) => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>{item.nombre} (x{item.cantidad})</span>
                <strong>${item.precio * item.cantidad}</strong>
              </li>
            ))}
          </ul>
          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: '#27ae60' }}>${total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

// Estilos básicos en línea
const inputEstilo = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '5px',
  boxSizing: 'border-box'
};

const labelEstilo = {
  fontWeight: '500',
  fontSize: '0.9rem',
  color: '#333'
};

const btnEstiloPrincipal = {
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  flex: 1
};

const btnEstiloSecundario = {
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Checkout;