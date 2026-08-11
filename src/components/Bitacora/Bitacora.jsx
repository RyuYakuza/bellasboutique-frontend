import React, { useState, useEffect } from 'react';
import Menu from "../Estructura/Menu";

const logsInicialesPrueba = [
  { id: 1, usuario: 'Admin System', accion: 'Inicio de sesión', detalle: 'Ingreso al panel', fecha: '10/8/2026, 09:00 AM' },
  { id: 2, usuario: 'Maria Pérez', accion: 'Compra finalizada', detalle: 'Monto total procesado: $120', fecha: '10/8/2026, 10:15 AM' }
];

const Bitacora = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('bitacora'));
    if (guardados && guardados.length > 0) {
      setRegistros(guardados);
    } else {
      setRegistros(logsInicialesPrueba);
      localStorage.setItem('bitacora', JSON.stringify(logsInicialesPrueba));
    }
  }, []);

  const limpiarBitacora = () => {
    if (window.confirm('¿Deseas borrar el registro de bitácora?')) {
      localStorage.removeItem('bitacora');
      setRegistros([]);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <Menu />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eaeaea', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Bitácora de Eventos</h1>
        <button onClick={limpiarBitacora} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          🗑️ Limpiar Bitácora
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Fecha y Hora</th>
            <th style={{ padding: '12px' }}>Usuario</th>
            <th style={{ padding: '12px' }}>Acción</th>
            <th style={{ padding: '12px' }}>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((log) => (
            <tr key={log.id} style={{ borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
              <td style={{ padding: '12px', fontSize: '0.85rem', color: '#555' }}>{log.fecha}</td>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#34495e' }}>{log.usuario}</td>
              <td style={{ padding: '12px', color: '#2980b9', fontWeight: '500' }}>{log.accion}</td>
              <td style={{ padding: '12px', color: '#7f8c8d', fontSize: '0.9rem' }}>{log.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bitacora;