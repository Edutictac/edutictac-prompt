import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; el historial completo está en el CHANGELOG.
export const newsVersion = '0.36.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'worksheet',
    text: {
      es: 'Nuevo en todas las herramientas: «Compartir con estos datos» crea un enlace que abre el formulario ya relleno, y «Generar ya» en cuanto pones el nivel y el tema.',
      'ca-valencia':
        'Nou en totes les ferramentes: «Compartix amb estes dades» crea un enllaç que obri el formulari ja omplit, i «Genera ara» tan prompte com poses el nivell i el tema.',
      ca: 'Nou a totes les eines: «Comparteix amb aquestes dades» crea un enllaç que obre el formulari ja emplenat, i «Genera ara» tan aviat com poses el nivell i el tema.',
      en: 'New in every tool: “Share with these answers” makes a link that opens the form already filled in, and “Generate now” as soon as you set the level and topic.',
    },
  },
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
