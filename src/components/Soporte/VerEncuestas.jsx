import { SoporteProvider, useSoporte } from "./SoporteContext";
import Menu from "../Estructura/Menu";
import "./Soporte.css";

function ListaEncuestas() {
  const { encuestas } = useSoporte();
  return (
    <div className="soporte-container">
      <h1>Encuestas de satisfacción</h1>
      {encuestas.length === 0 ? (
        <p>Todavía no hay encuestas enviadas.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Fecha</th>
              <th style={{ textAlign: "left" }}>Correo</th>
              <th style={{ textAlign: "left" }}>Calificación</th>
              <th style={{ textAlign: "left" }}>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {encuestas.map((e, i) => (
              <tr key={i}>
                <td>{new Date(e.fecha).toLocaleString()}</td>
                <td>{e.correo}</td>
                <td>{e.rating} / 5</td>
                <td>{e.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function VerEncuestas() {
  return (
    <>
      <Menu />
      <SoporteProvider>
        <ListaEncuestas />
      </SoporteProvider>
    </>
  );
}
export default VerEncuestas;