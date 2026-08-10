import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UsuariosProvider } from './components/Login/UsuariosContext'
import { useAutoLogout } from './components/Login/useAutoLogout'
import { BitacoraProvider } from './components/Bitacora/BitacoraContext'
import VerEncuestas from './components/Soporte/VerEncuestas'
import Bitacora from './components/Bitacora/Bitacora'
import Login from './components/Login/Login'
import Catalogo from './components/Catalogo/Catalogo'
import Carrito from './components/Carrito/Carrito'
import { CarritoProvider } from './components/Carrito/CarritoContext'; // <-- Importamos el Provider
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
      <Route path="/encuestas-admin" element={<VerEncuestas />} />
      <Route path="/perfil" element={<Mantenimiento />} />
      <Route path="/bitacora" element={<Bitacora />} />
    </Routes>
  )
}

function App() {
  return (
    <BitacoraProvider>
      <UsuariosProvider>
        <CarritoProvider>
          <BrowserRouter>
            <ContenidoApp />
          </BrowserRouter>
        </CarritoProvider>
      </UsuariosProvider>
    </BitacoraProvider>
  )
}

export default App