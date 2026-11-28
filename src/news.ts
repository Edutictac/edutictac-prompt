import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '1.0.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
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
  {
    templateId: 'activity-evidence',
    text: {
      es: 'Continúa una actividad preparando evidencias o una rúbrica con los datos que ya has introducido.',
      'ca-valencia': 'Continua una activitat preparant evidències o una rúbrica amb les dades que ja has introduït.',
      ca: 'Continua una activitat preparant evidències o una rúbrica amb les dades que ja has introduït.',
      en: 'Continue an activity by preparing evidence or a rubric with the details you already entered.',
    },
  },
]
