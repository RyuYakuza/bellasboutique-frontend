import { createContext, useState, useEffect } from 'react'
import { usuariosIniciales } from './usuariosData'

export const UsuariosContext = createContext()

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('usuarios')
    return guardados ? JSON.parse(guardados) : usuariosIniciales
  })
  const [usuarioActual, setUsuarioActual] = useState(() => {
  const guardado = localStorage.getItem('usuarioActual')
  return guardado ? JSON.parse(guardado) : null
})

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
  }, [usuarios])
  
  useEffect(() => {
  localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual))
}, [usuarioActual])

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios, usuarioActual, setUsuarioActual }}>
      {children}
    </UsuariosContext.Provider>
  )
}