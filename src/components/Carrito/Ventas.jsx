import React, { useState, useEffect } from 'react';
import Menu from "../Estructura/Menu";
import Factura from './Factura';


// Datos de prueba iniciales por si el almacenamiento está vacío
const ventasDePrueba = [
  {
    id: 'VENTA-4821',
    fecha: '10/8/2026, 10:15 AM',
    usuario: { nombre: 'María Fernández', email: 'maria@ejemplo.com', direccion: 'San José, Av. Central' },
    metodoPago: 'Tarjeta de Crédito',
    productos: [
      { id: 1, nombre: 'Vestido Elegante', cantidad: 1, precio: 80 },
      { id: 3, nombre: 'Bolso Moderno', cantidad: 1, precio: 60 }
    ]
  },
  {
    id: 'VENTA-7392',
    fecha: '10/8/2026, 11:40 AM',
    usuario: { nombre: 'Carlos Ruiz', email: 'carlos@ejemplo.com', direccion: 'Heredia, Centro' },
    metodoPago: 'Transferencia Bancaria',
    productos: [
      { id: 4, nombre: 'Camisa Casual', cantidad: 2, precio: 40 }
    ]
  }
];

const Ventas = () => {
  const [historialVentas, setHistorialVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  useEffect(() => {
    // Carga las ventas desde localStorage o asigna las de prueba iniciales
    const guardadas = JSON.parse(localStorage.getItem('historial_ventas'));
    if (guardadas && guardadas.length > 0) {
      setHistorialVentas(guardadas);
    } else {
      setHistorialVentas(ventasDePrueba);
      localStorage.setItem('historial_ventas', JSON.stringify(ventasDePrueba));
    }
  }, []);

  return (
    
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <Menu />
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Registro de Ventas
      </h1>

      {historialVentas.length === 0 ? (
        <p>No se han registrado ventas aún.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>N° Venta</th>
              <th style={{ padding: '12px' }}>Cliente</th>
              <th style={{ padding: '12px' }}>Método de Pago</th>
              <th style={{ padding: '12px' }}>Fecha</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Total (con IVI)</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {historialVentas.map((venta) => {
              const subtotal = venta.productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
              const totalConImpuesto = subtotal * 1.13;

              return (
                <tr key={venta.id} style={{ borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{venta.id}</td>
                  <td style={{ padding: '12px' }}>
                    {venta.usuario.nombre}<br />
                    <small style={{ color: '#7f8c8d' }}>{venta.usuario.email}</small>
                  </td>
                  <td style={{ padding: '12px' }}>{venta.metodoPago}</td>
                  <td style={{ padding: '12px', fontSize: '0.85rem', color: '#555' }}>{venta.fecha}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: '#27ae60' }}>
                    ${totalConImpuesto.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => setVentaSeleccionada(venta)}
                      style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      📄 Ver Factura
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Ventana Modal para visualizar la factura al presionar el botón */}
      {ventaSeleccionada && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', maxWidth: '700px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <Factura
              detallesCompra={ventaSeleccionada.productos}
              datosCliente={ventaSeleccionada.usuario}
              onVolver={() => setVentaSeleccionada(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;