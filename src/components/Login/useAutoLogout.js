import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsuariosContext } from './UsuariosContext'

export function useAutoLogout() {
  const { setUsuarioActual } = useContext(UsuariosContext)
  const navigate = useNavigate()

  useEffect(() => {
    let temporizador

    const reiniciarTemporizador = () => {
      clearTimeout(temporizador)
      temporizador = setTimeout(() => {
        setUsuarioActual(null)
        navigate('/')
        alert('Sesión cerrada por inactividad')
      }, 5 * 60 * 1000)
    }

    window.addEventListener('mousemove', reiniciarTemporizador)
    window.addEventListener('keydown', reiniciarTemporizador)
    reiniciarTemporizador()

    return () => {
      clearTimeout(temporizador)
      window.removeEventListener('mousemove', reiniciarTemporizador)
      window.removeEventListener('keydown', reiniciarTemporizador)
    }
  }, [])
}