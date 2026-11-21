import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; el historial completo está en el CHANGELOG.
export const newsVersion = '0.35.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'profile-adaptation',
    text: {
      es: 'Nueva: adapta una tarea a un perfil concreto (TDAH, dislexia, TEA, altas capacidades…) sin bajar la exigencia.',
      'ca-valencia':
        'Nova: adapta una tasca a un perfil concret (TDAH, dislèxia, TEA, altes capacitats…) sense baixar l’exigència.',
      ca: 'Nova: adapta una tasca a un perfil concret (TDAH, dislèxia, TEA, altes capacitats…) sense baixar l’exigència.',
      en: 'New: adapt a task to a specific learner profile (ADHD, dyslexia, ASD, gifted…) without lowering the demand.',
    },
  },
  {
    templateId: 'school-document',
    text: {
      es: 'Nueva: actas, memorias, informes de seguimiento, planes de refuerzo, propuestas a dirección y respuestas a reclamaciones.',
      'ca-valencia':
        'Nova: actes, memòries, informes de seguiment, plans de reforç, propostes a direcció i respostes a reclamacions.',
      ca: 'Nova: actes, memòries, informes de seguiment, plans de reforç, propostes a direcció i respostes a reclamacions.',
      en: 'New: minutes, activity reports, progress reports, support plans, proposals to leadership and replies to complaints.',
    },
  },
]
