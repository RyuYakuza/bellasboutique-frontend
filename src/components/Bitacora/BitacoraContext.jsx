import { createContext, useContext, useState, useEffect } from "react";

const BitacoraContext = createContext();

export function BitacoraProvider({ children }) {
  const [eventos, setEventos] = useState(
    () => JSON.parse(localStorage.getItem("bitacora")) || []
  );

  useEffect(() => {
    localStorage.setItem("bitacora", JSON.stringify(eventos));
  }, [eventos]);

  const registrarEvento = (tipo, detalle, usuario) =>
    setEventos((prev) => [...prev, { tipo, detalle, usuario, fecha: new Date().toISOString() }]);

  return (
    <BitacoraContext.Provider value={{ eventos, registrarEvento }}>
      {children}
    </BitacoraContext.Provider>
  );
}
export const useBitacora = () => useContext(BitacoraContext);
