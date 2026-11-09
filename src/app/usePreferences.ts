import { useEffect, useState } from 'react'
import { detectLanguage } from '../locales'
import type { Language } from '../types'

// Puentes con el chip de cuenta central. Se declaran al cargar el módulo para
// que el elemento personalizado pueda leerlos antes de que React monte la app.
let currentPromptLanguage: Language = 'es'
let applyPromptLanguage: ((value: Language) => void) | null = null
if (typeof window !== 'undefined' && !window.edutictacLanguage) {
  window.edutictacLanguage = {
    languages: ['ca', 'va', 'es', 'en'],
    get: () => (currentPromptLanguage === 'ca-valencia' ? 'va' : currentPromptLanguage),
    set: (value: string) => {
      const mapped = value === 'va' ? 'ca-valencia' : value
      if (mapped !== 'es' && mapped !== 'ca' && mapped !== 'ca-valencia' && mapped !== 'en') return
      currentPromptLanguage = mapped as Language
      applyPromptLanguage?.(mapped as Language)
    },
  }
}
let currentPromptTheme: 'auto' | 'light' | 'dark' = 'auto'
let applyPromptTheme: ((value: 'auto' | 'light' | 'dark') => void) | null = null
if (typeof window !== 'undefined' && !window.edutictacTheme) {
  window.edutictacTheme = {
    read: () => currentPromptTheme,
    remember: (value: string) => {
      const mapped = value === 'light' || value === 'dark' ? value : 'auto'
      currentPromptTheme = mapped
      applyPromptTheme?.(mapped)
    },
  }
}

export type ThemeMode = 'system' | 'light' | 'dark'

export function usePreferences() {
  const [lang, setLang] = useState<Language>(() => detectLanguage())
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const value = localStorage.getItem('edutictac-theme')
    return value === 'light' || value === 'dark' ? value : 'system'
  })
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  )

  currentPromptLanguage = lang
  applyPromptLanguage = setLang
  currentPromptTheme = themeMode === 'system' ? 'auto' : themeMode
  applyPromptTheme = (value) => setThemeMode(value === 'auto' ? 'system' : value)

  useEffect(() => {
    try {
      localStorage.setItem('edutictac-language', lang)
    } catch {
      /* La preferencia de idioma es opcional; la aplicación sigue funcionando. */
    }
    document.documentElement.lang = lang === 'ca-valencia' ? 'ca-ES-valencia' : lang
    window.dispatchEvent(
      new CustomEvent('edutictac:langchange', { detail: { lang: lang === 'ca-valencia' ? 'va' : lang } }),
    )
  }, [lang])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return
    const update = () => setSystemDark(media.matches)
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const value = themeMode === 'system' ? (systemDark ? 'dark' : 'light') : themeMode
    document.documentElement.dataset.theme = value
    try {
      if (themeMode === 'system') localStorage.removeItem('edutictac-theme')
      else localStorage.setItem('edutictac-theme', themeMode)
    } catch {
      /* La preferencia de tema es opcional; la aplicación sigue funcionando. */
    }
    window.dispatchEvent(
      new CustomEvent('edutictac:themechange', { detail: { preference: themeMode === 'system' ? 'auto' : themeMode } }),
    )
  }, [themeMode, systemDark])

  const darkMode = themeMode === 'dark' || (themeMode === 'system' && systemDark)
  return { lang, setLang, themeMode, setThemeMode, darkMode }
}
