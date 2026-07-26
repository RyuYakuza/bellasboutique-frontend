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

  const [intentosLogin, setIntentosLogin] = useState(() => {
    const guardados = localStorage.getItem('intentosLogin')
    return guardados ? JSON.parse(guardados) : []
  })

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
  }, [usuarios])

  useEffect(() => {
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual))
  }, [usuarioActual])

  useEffect(() => {
    localStorage.setItem('intentosLogin', JSON.stringify(intentosLogin))
  }, [intentosLogin])

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios, usuarioActual, setUsuarioActual, intentosLogin, setIntentosLogin }}>
      {children}
    </UsuariosContext.Provider>
  )
}