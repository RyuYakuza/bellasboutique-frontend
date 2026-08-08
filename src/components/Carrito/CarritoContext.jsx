import React, { createContext, useState } from 'react';

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
  };

  // Función para eliminar un producto completamente del carrito
  const eliminarProducto = (id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
  };

  // Función para vaciar todo el carrito (útil cuando se completa la compra)
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 3. Retornamos el Provider con los valores que queremos compartir
  return (
    <CarritoContext.Provider 
      value={{ 
        carrito, 
        agregarAlCarrito, 
        eliminarProducto, 
        vaciarCarrito 
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};