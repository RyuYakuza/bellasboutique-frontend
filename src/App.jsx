import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Catalogo from './components/Catalogo/Catalogo'
import Carrito from './components/Carrito/Carrito'
import Soporte from './components/Soporte/Soporte'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/soporte" element={<Soporte />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App