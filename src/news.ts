import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; el historial completo está en el CHANGELOG.
export const newsVersion = '0.34.0'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'illustrated-worksheet',
    text: {
      es: 'Nueva: ficha A4 con temática para una IA de imágenes, para colorear o en color.',
      'ca-valencia': 'Nova: fitxa A4 amb temàtica per a una IA d’imatges, per a pintar o en color.',
      ca: 'Nova: fitxa A4 amb temàtica per a una IA d’imatges, per pintar o en color.',
      en: 'New: themed A4 worksheet for an image AI, for colouring or in colour.',
    },
  },
  {
    templateId: 'worksheet',
    text: {
      es: 'Diez pasatiempos nuevos: sopa de letras, crucigrama, jeroglífico, llega al número…',
      'ca-valencia': 'Deu passatemps nous: sopa de lletres, mots encreuats, jeroglífic, arriba al número…',
      ca: 'Deu passatemps nous: sopa de lletres, mots encreuats, jeroglífic, arriba al número…',
      en: 'Ten new puzzle types: word search, crossword, rebus, reach the number…',
    },
  },
  {
    templateId: 'reading-comprehension',
    text: {
      es: 'Accesibilidad del material: letra, contraste, espacios y pictogramas según el alumnado.',
      'ca-valencia': 'Accessibilitat del material: lletra, contrast, espais i pictogrames segons l’alumnat.',
      ca: 'Accessibilitat del material: lletra, contrast, espais i pictogrames segons l’alumnat.',
      en: 'Accessible materials: font, contrast, spacing and pictograms for each learner.',
    },
  },
]
