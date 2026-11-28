import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta o sección. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '1.5.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = ({ templateId: string } | { view: 'agents' | 'library' }) & { text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'three-levels',
    text: {
      es: 'Adapta una actividad con los apoyos y versiones que necesites, manteniendo el objetivo de aprendizaje.',
      'ca-valencia':
        'Adapta una activitat amb els suports i les versions que necessites, mantenint l’objectiu d’aprenentatge.',
      ca: 'Adapta una activitat amb els suports i les versions que necessitis, mantenint l’objectiu d’aprenentatge.',
      en: 'Adapt an activity with the supports and versions you need while keeping its learning objective.',
    },
  },
  {
    templateId: 'prompt-coach',
    text: {
      es: 'Edita los prompts visualmente por títulos, párrafos y listas, con acceso al texto original.',
      'ca-valencia': 'Edita els prompts visualment per títols, paràgrafs i llistes, amb accés al text original.',
      ca: 'Edita els prompts visualment per títols, paràgrafs i llistes, amb accés al text original.',
      en: 'Edit prompts visually by headings, paragraphs and lists, with access to the original text.',
    },
  },
  {
    view: 'library',
    text: {
      es: 'Filtra tu biblioteca, edita los datos y marca favoritos; comprueba qué prompts están sincronizados.',
      'ca-valencia':
        'Filtra la biblioteca, edita les dades i marca favorits; comprova quins prompts estan sincronitzats.',
      ca: 'Filtra la biblioteca, edita les dades i marca preferits; comprova quins prompts estan sincronitzats.',
      en: 'Filter your library, edit details and mark favorites; check which prompts are synced.',
    },
  },
]
