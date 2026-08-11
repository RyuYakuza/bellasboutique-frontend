import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuariosContext } from "../Login/UsuariosContext";
import "./Menu.css";

function Menu() {
  const { usuarioActual, setUsuarioActual } = useContext(UsuariosContext);
  const navigate = useNavigate();
  const esAdmin = usuarioActual?.rol === "Administrador";

  const logout = () => { setUsuarioActual(null); navigate("/"); };

  return (
    <header className="app-header">
      <Link to="/catalogo" className="app-header-logo">Bellas Boutique</Link>

      <nav className="app-header-nav">
        {esAdmin ? (
          <>
            <Link to="/catalogo">Productos</Link>
            <Link to="/perfil">Usuarios</Link>
            <Link to="/bitacora">Bitácora</Link>
            <Link to="/encuestas-admin">Encuestas</Link>
            <Link to="/ventas">Ventas</Link>
          </>
        ) : (
          <>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/soporte">Soporte</Link>
          </>
        )}
      </nav>

      <div className="app-header-actions">
        {usuarioActual ? (
          <button className="app-header-btn" onClick={logout}>Cerrar sesión</button>
        ) : (
          <Link to="/" className="app-header-btn">Ingresar</Link>
        )}
      </div>
    </header>
  );
}
export default Menu;