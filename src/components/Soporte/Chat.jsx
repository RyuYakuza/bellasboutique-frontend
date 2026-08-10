import { useContext, useState } from "react";
import { UsuariosContext } from "../Login/UsuariosContext";
import { useSoporte } from "./SoporteContext";

function Chat() {
  const { usuarioActual } = useContext(UsuariosContext);
  const { mensajes, enviarMensaje } = useSoporte();
  const [texto, setTexto] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    if (!texto.trim() || !usuarioActual) return;
    enviarMensaje({ nombre: usuarioActual.nombre, texto, fecha: new Date().toISOString() });
    setTexto("");
  };

  return (
    <div>
      <h2>Chat con soporte</h2>
      <div className="chat-mensajes">
        {mensajes.map((m, i) => <p key={i}><b>{m.nombre}:</b> {m.texto}</p>)}
      </div>
      <form onSubmit={enviar} className="chat-box">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Mensaje" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
export default Chat;