import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta o sección. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '1.1.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = ({ templateId: string } | { view: 'agents' }) & { text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    view: 'agents',
    text: {
      es: 'Elige un ejemplo de agente desde el modo básico y adáptalo a tu contexto.',
      'ca-valencia': 'Tria un exemple d’agent des del mode bàsic i adapta’l al teu context.',
      ca: 'Tria un exemple d’agent des del mode bàsic i adapta’l al teu context.',
      en: 'Choose an agent example in basic mode and adapt it to your context.',
    },
  },
  {
    templateId: 'lesson',
    text: {
      es: 'EduTicTac Prompt 1.0: configura tu perfil curricular, formato e IA preferida para empezar con menos pasos.',
      'ca-valencia':
        'EduTicTac Prompt 1.0: configura el perfil curricular, el format i la IA preferida per a començar amb menys passos.',
      ca: 'EduTicTac Prompt 1.0: configura el perfil curricular, el format i la IA preferida per començar amb menys passos.',
      en: 'EduTicTac Prompt 1.0: set your curriculum profile, format and preferred AI to get started faster.',
    },
  },
  {
    templateId: 'prompt-coach',
    text: {
      es: 'Crea o mejora un prompt educativo conversando con la IA que elijas.',
      'ca-valencia': 'Crea o millora un prompt educatiu conversant amb la IA que tries.',
      ca: 'Crea o millora un prompt educatiu conversant amb la IA que triïs.',
      en: 'Create or improve an educational prompt by talking to the AI of your choice.',
    },
  },
]
