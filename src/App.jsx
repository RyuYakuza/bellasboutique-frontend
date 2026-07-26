import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UsuariosProvider } from './components/Login/UsuariosContext'
import Mantenimiento from './components/Login/Mantenimiento'
import Login from './components/Login/Login'
import Catalogo from './components/Catalogo/Catalogo'
import Carrito from './components/Carrito/Carrito'
import Soporte from './components/Soporte/Soporte'

function App() {
  return (
    <UsuariosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/perfil" element={<Mantenimiento />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/soporte" element={<Soporte />} />
        </Routes>
      </BrowserRouter>
    </UsuariosProvider>
  )
}

export default App