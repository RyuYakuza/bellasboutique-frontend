import { useBitacora } from "./BitacoraContext";
import Menu from "../Estructura/Menu";

function Bitacora() {
  const { eventos } = useBitacora();
  return (
    <div>
      <Menu />
      <h2>Bitácora de actividades</h2>
      <table>
        <thead><tr><th>Fecha</th><th>Tipo</th><th>Detalle</th><th>Usuario</th></tr></thead>
        <tbody>
          {eventos.map((e, i) => (
            <tr key={i}><td>{e.fecha}</td><td>{e.tipo}</td><td>{e.detalle}</td><td>{e.usuario}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Bitacora;