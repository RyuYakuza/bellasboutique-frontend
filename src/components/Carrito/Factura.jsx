import React from 'react';

const Factura = ({ detallesCompra, datosCliente, onVolver }) => {
  const fechaCompra = new Date().toLocaleString('es-CR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const subtotal = detallesCompra.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const impuesto = subtotal * 0.13;
  const total = subtotal + impuesto;

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '25px', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      
      {/* Oculta los botones en la vista de impresión/PDF */}
      <style>{`
        @media print {
          .no-imprimir {
            display: none !important;
          }
        }
      `}</style>

      {/* Encabezado */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
        <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Comprobante de Compra</h2>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}><strong>Fecha y Hora:</strong> {fechaCompra}</p>
      </div>

      {/* Datos del Cliente */}
      <div style={{ margin: '20px 0', fontSize: '0.95rem' }}>
        <p style={{ margin: '4px 0' }}><strong>Cliente:</strong> {datosCliente.nombre}</p>
        <p style={{ margin: '4px 0' }}><strong>Correo:</strong> {datosCliente.email}</p>
        <p style={{ margin: '4px 0' }}><strong>Dirección:</strong> {datosCliente.direccion}</p>
      </div>

      {/* Tabla de Productos */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Producto</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Cant.</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Precio U.</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detallesCompra.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.nombre}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{item.cantidad}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>${item.precio.toFixed(2)}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>${(item.precio * item.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <div style={{ width: '250px', marginLeft: 'auto', textAlign: 'right', fontSize: '0.95rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#e67e22' }}>
          <span>Impuesto (13%):</span>
          <span>${impuesto.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '2px solid #333', paddingTop: '8px', color: '#27ae60' }}>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botones de Acción (Ocultos al imprimir) */}
      <div className="no-imprimir" style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
        <button 
          onClick={() => window.print()}
          style={{ flex: 1, padding: '12px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🖨️ Imprimir / Guardar en PDF
        </button>

        <button 
          onClick={onVolver}
          style={{ flex: 1, padding: '12px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Volver al Catálogo
        </button>
      </div>

    </div>
  );
};

export default Factura;