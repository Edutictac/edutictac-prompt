import { useEffect, useState } from 'react'
import { updateSW } from '../pwa'

// Aviso de actualización de la PWA: escucha el evento que emite el registro del
// service worker y expone la acción para aplicar la nueva versión.
export function usePwaUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    const show = () => setUpdateAvailable(true)
    window.addEventListener('pwa-update-available', show)
    return () => window.removeEventListener('pwa-update-available', show)
  }, [])

  const applyUpdate = () => {
    void updateSW(true)
  }

  return { updateAvailable, applyUpdate }
}
