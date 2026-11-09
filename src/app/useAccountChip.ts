import { useEffect, useState } from 'react'

// Detecta cuándo el chip de cuenta central ha renderizado su menú. Mientras no
// esté listo se usa la cabecera propia; si no llega a cargar, se mantiene.
export function useAccountChip() {
  const [chipReady, setChipReady] = useState(false)

  useEffect(() => {
    if (!window.customElements) return
    let timer = 0
    let cancelled = false
    const check = () => {
      if (document.querySelector('edutictac-account nav.eta')) {
        setChipReady(true)
        document.documentElement.classList.add('has-account-chip')
        return true
      }
      return false
    }
    window.customElements
      .whenDefined('edutictac-account')
      .then(() => {
        if (check() || cancelled) return
        let tries = 0
        timer = window.setInterval(() => {
          if (check() || ++tries >= 50) window.clearInterval(timer)
        }, 100)
      })
      .catch(() => {
        /* El chip de cuenta es opcional; si no carga, se usa la cabecera propia. */
      })
    return () => {
      cancelled = true
      window.clearInterval(timer)
      document.documentElement.classList.remove('has-account-chip')
    }
  }, [])

  return chipReady
}
