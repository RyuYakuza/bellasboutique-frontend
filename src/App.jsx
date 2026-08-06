import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UsuariosProvider } from './components/Login/UsuariosContext'
import { useAutoLogout } from './components/Login/useAutoLogout'
import Login from './components/Login/Login'
import Catalogo from './components/Catalogo/Catalogo'
import GestionProductos from './components/Catalogo/GestionProductos'
import Carrito from './components/Carrito/Carrito'
import Soporte from './components/Soporte/Soporte'
import Registro from './components/Login/Registro'
import RecuperarPassword from './components/Login/RecuperarPassword'
import Mantenimiento from './components/Login/Mantenimiento'

function ContenidoApp() {
  useAutoLogout()

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />
      <Route path="/perfil" element={<Mantenimiento />} />
      <Route path="/admin" element={<GestionProductos />} />
    </Routes>
  )
}

function App() {
  return (
    <UsuariosProvider>
      <BrowserRouter>
        <ContenidoApp />
      </BrowserRouter>
    </UsuariosProvider>
  )
}

export default App