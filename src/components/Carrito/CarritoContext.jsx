import React, { createContext, useState } from 'react';
import { registrarAccion } from '../Bitacora/BitacoraHelper';

// 1. Creamos el contexto
export const CarritoContext = createContext();

// 2. Creamos el Provider (Proovedor) que envolverá nuestra aplicación
export const CarritoProvider = ({ children }) => {
  // Estado global del carrito (inicia como un arreglo vacío)
  const [carrito, setCarrito] = useState([]);

  // Función para añadir productos
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      // Verificamos si el producto ya está en el carrito
      const itemExistente = carritoActual.find((item) => item.id === producto.id);

      if (itemExistente) {
        // Si existe, aumentamos su cantidad en 1
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos como nuevo con cantidad 1
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
    registrarAccion('Producto añadido', `Añadió ${producto.nombre} al carrito`);
  };

  // Función para eliminar un producto completamente del carrito
  const eliminarProducto = (id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
    registrarAccion('Producto eliminado', `Eliminó ítem ID: ${id} del carrito`);
  };

  // Función para vaciar todo el carrito (útil cuando se completa la compra)
  const vaciarCarrito = () => {
    setCarrito([]);
    registrarAccion('Carrito vaciado', 'Se eliminaron todos los productos del carrito');
  };
  const actualizarCantidad = (id, nuevaCantidad) => {
  if (nuevaCantidad < 1) {
    // Si la cantidad es menor a 1, removemos el producto del carrito
    eliminarProducto(id);
    return;
  }
  setCarrito(prevCarrito =>
    prevCarrito.map(item =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    )
  );
  registrarAccion('Cantidad modificada', `Cambió cantidad de ID ${id} a ${nuevaCantidad}`);
};

  // 3. Retornamos el Provider con los valores que queremos compartir
  return (
    <CarritoContext.Provider 
      value={{ 
        carrito, 
        agregarAlCarrito, 
        eliminarProducto, 
        vaciarCarrito,
        actualizarCantidad 
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};