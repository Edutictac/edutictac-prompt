import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta o sección. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '1.2.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = ({ templateId: string } | { view: 'agents' }) & { text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    view: 'agents',
    text: {
      es: 'Prepara agentes con documentos sugeridos y tres preguntas copiables para probar su comportamiento.',
      'ca-valencia':
        'Prepara agents amb documents suggerits i tres preguntes copiables per a provar-ne el comportament.',
      ca: 'Prepara agents amb documents suggerits i tres preguntes copiables per a provar-ne el comportament.',
      en: 'Prepare agents with suggested documents and three copyable test questions.',
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
