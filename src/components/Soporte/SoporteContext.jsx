import { createContext, useContext, useState, useEffect } from "react";

const SoporteContext = createContext();

export function SoporteProvider({ children }) {
  const [encuestas, setEncuestas] = useState(
    () => JSON.parse(localStorage.getItem("encuestas")) || []
  );
  const [mensajes, setMensajes] = useState(
    () => JSON.parse(localStorage.getItem("chatMensajes")) || []
  );

  useEffect(() => {
    localStorage.setItem("encuestas", JSON.stringify(encuestas));
  }, [encuestas]);

  useEffect(() => {
    localStorage.setItem("chatMensajes", JSON.stringify(mensajes));
  }, [mensajes]);

  const agregarEncuesta = (data) => setEncuestas((prev) => [...prev, data]);
  const enviarMensaje = (msg) => setMensajes((prev) => [...prev, msg]);

  return (
    <SoporteContext.Provider value={{ encuestas, agregarEncuesta, mensajes, enviarMensaje }}>
      {children}
    </SoporteContext.Provider>
  );
}

export const useSoporte = () => useContext(SoporteContext);