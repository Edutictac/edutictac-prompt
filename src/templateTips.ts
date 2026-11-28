import { esTips } from './templateTips/es'
import { valencianTips } from './templateTips/valencian'
import { caTips } from './templateTips/ca'
import { enTips } from './templateTips/en'
import type { Language } from './types'

// Para qué sirve cada herramienta y una pista de uso. Se muestra bajo el título
// del formulario. Toda plantilla nueva necesita su entrada en los cuatro idiomas.
export type TemplateTip = { use: string; tip: string }

export const templateTips: Record<Language, Record<string, TemplateTip>> = {
  es: esTips,
  'ca-valencia': valencianTips,
  ca: caTips,
  en: enTips,
}

export const templateTip = (id: string, language: Language): TemplateTip | undefined => templateTips[language][id]
