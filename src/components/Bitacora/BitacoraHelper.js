export const registrarAccion = (accion, detalle = '') => {
  // Lee el usuario logueado actualmente o asigna 'Invitado'
  const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual')) || { nombre: 'Invitado' };
  
  // Lee el historial existente de bitácora
  const historial = JSON.parse(localStorage.getItem('bitacora')) || [];

  const nuevaEntrada = {
    id: Date.now(),
    usuario: usuarioActual.nombre || usuarioActual.email || 'Usuario',
    accion,
    detalle,
    fecha: new Date().toLocaleString('es-CR', { dateStyle: 'medium', timeStyle: 'short' })
  };

  // Guarda agregando el nuevo evento al inicio
  localStorage.setItem('bitacora', JSON.stringify([nuevaEntrada, ...historial]));
};