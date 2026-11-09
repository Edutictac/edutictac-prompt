import { useEffect, useState } from 'react'
import { authMe, type AuthUser } from '../api'

// Estado de cuenta compartido por la cabecera, la biblioteca y el chip central.
// La sesión de la biblioteca remota y la identidad central se resuelven juntas.
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [central, setCentral] = useState(false)

  useEffect(() => {
    let active = true
    void authMe()
      .then((state) => {
        if (!active) return
        setUser(state.user)
        setCentral(state.central === true)
      })
      .catch(() => {
        if (!active) return
        setUser(null)
        setCentral(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { user, central }
}
