import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '0.44.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'lesson',
    text: {
      es: 'Nueva sección Configuración para elegir y sincronizar el formato predeterminado.',
      'ca-valencia': 'Nova secció Configuració per a triar i sincronitzar el format predeterminat.',
      ca: 'Nova secció Configuració per triar i sincronitzar el format predeterminat.',
      en: 'New Settings section to choose and sync your default format.',
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
