import { useState } from "react";
import { useSoporte } from "./SoporteContext";

const correoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

function Encuestas() {
  const { agregarEncuesta } = useSoporte();
  const [correo, setCorreo] = useState("");
  const [rating, setRating] = useState(5);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    if (!correoValido(correo)) {
      setError("Correo inválido");
      return;
    }
    agregarEncuesta({ correo, rating, comentario, fecha: new Date().toISOString() });
    setCorreo(""); setComentario(""); setRating(5); setError("");
  };

  return (
    <form onSubmit={enviar} className="encuesta-form">
      <h2>Encuesta de satisfacción</h2>
      <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Tu correo" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Sugerencias" />
      <button type="submit">Enviar</button>
    </form>
  );
}
export default Encuestas;