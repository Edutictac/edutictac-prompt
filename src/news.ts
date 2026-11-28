import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '0.42.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'lesson',
    text: {
      es: 'Elige un formato de salida predeterminado, como DOCX: se aplicará en las herramientas compatibles y se sincroniza con tu cuenta.',
      'ca-valencia':
        'Tria un format d’eixida predeterminat, com DOCX: s’aplicarà en les ferramentes compatibles i se sincronitza amb el teu compte.',
      ca: 'Tria un format de sortida predeterminat, com DOCX: s’aplicarà a les eines compatibles i se sincronitza amb el teu compte.',
      en: 'Choose a default output format, such as DOCX: it applies in compatible tools and syncs with your account.',
    },
  },
  {
    templateId: 'prompt-coach',
    text: {
      es: 'Nueva ayuda para crear o mejorar un prompt conversando con la IA que elijas.',
      'ca-valencia': 'Nova ajuda per a crear o millorar un prompt conversant amb la IA que tries.',
      ca: 'Nova ajuda per crear o millorar un prompt conversant amb la IA que triïs.',
      en: 'New help to create or improve a prompt by talking to the AI of your choice.',
    },
  },
  {
    templateId: 'flashcards',
    text: {
      es: 'Nueva herramienta: tarjetas de memoria con preguntas y respuestas para practicar y repasar.',
      'ca-valencia': 'Nova ferramenta: targetes de memòria amb preguntes i respostes per a practicar i repassar.',
      ca: 'Nova eina: targetes de memòria amb preguntes i respostes per practicar i repassar.',
      en: 'New tool: flashcards with questions and answers for practice and review.',
    },
  },
  {
    templateId: 'learning-stations',
    text: {
      es: 'Nuevas herramientas para organizar estaciones de aprendizaje e identificar evidencias a partir de una actividad existente.',
      'ca-valencia':
        'Noves ferramentes per a organitzar estacions d’aprenentatge i identificar evidències a partir d’una activitat existent.',
      ca: 'Noves eines per organitzar estacions d’aprenentatge i identificar evidències a partir d’una activitat existent.',
      en: 'New tools to organise learning stations and identify evidence from an existing activity.',
    },
  },
]
