import { ADULT_LEVEL } from './templates'
import type { Language } from './types'

// Casos de la sección «Empieza aquí» de la portada. Cada uno abre una plantilla
// con el formulario ya relleno. Igual que en examples.ts, las opciones usan el
// valor original en castellano y el catalán central parte del texto valenciano.
type Text = Record<string, string>
export type Starter = { id: string; templateId: string; icon: string; title: Text; level: string; options?: Record<string, string>; es: Text; va: Text; ca?: Text; en: Text }

export const starters: Starter[] = [
  {
    id: 'fpa-electricity-bill', templateId: 'three-levels', icon: '€', level: ADULT_LEVEL,
    title: { es: 'Leer una factura de la luz', va: 'Llegir una factura de la llum', en: 'Reading an electricity bill' },
    options: { level: ADULT_LEVEL, outputFormat: 'Tabla' },
    es: { subject: 'Ámbito científico-tecnológico', task: 'Leer e interpretar una factura de la luz real: consumo, potencia contratada, impuestos e importe total.', objectives: 'Localizar los datos clave de la factura, calcular el coste de un electrodoméstico y comparar dos tarifas.' },
    va: { subject: 'Àmbit cientificotecnològic', task: 'Llegir i interpretar una factura de la llum real: consum, potència contractada, impostos i import total.', objectives: 'Localitzar les dades clau de la factura, calcular el cost d’un electrodomèstic i comparar dues tarifes.' },
    en: { subject: 'Science and technology', task: 'Read and interpret a real electricity bill: usage, contracted power, taxes and total amount.', objectives: 'Find the key data on the bill, work out what an appliance costs to run and compare two tariffs.' }
  },
  {
    id: 'fpa-ges-review', templateId: 'gift', icon: '☰', level: ADULT_LEVEL,
    title: { es: 'Repaso para la prueba GES en Aules', va: 'Repàs per a la prova GES en Aules', ca: 'Repàs per a la prova GES a Aules', en: 'Exam review quiz for Moodle' },
    options: { level: ADULT_LEVEL },
    es: { subject: 'Ámbito social', topic: 'La Constitución española y la organización del Estado', objectives: 'Cuestionario de repaso de 15 preguntas, con retroalimentación en cada respuesta, para importar en Aules.' },
    va: { subject: 'Àmbit social', topic: 'La Constitució espanyola i l’organització de l’Estat', objectives: 'Qüestionari de repàs de 15 preguntes, amb retroacció en cada resposta, per a importar en Aules.' },
    ca: { objectives: 'Qüestionari de repàs de 15 preguntes, amb retroacció a cada resposta, per importar a Aules.' },
    en: { subject: 'Social studies', topic: 'The Spanish Constitution and how the State is organised', objectives: '15-question review quiz with feedback on every answer, ready to import into Moodle.' }
  },
  {
    id: 'primary-oral-rubric', templateId: 'rubric', icon: '▤', level: 'Primaria',
    title: { es: 'Rúbrica de una exposición oral', va: 'Rúbrica d’una exposició oral', en: 'Oral presentation rubric' },
    options: { level: 'Primaria', levels: '4', outputFormat: 'Tabla Markdown' },
    es: { subject: 'Lengua Castellana', activity: 'Exposición oral de 3 minutos sobre un animal del entorno', criteria: 'Contenido, organización de las ideas, voz y ritmo, uso de apoyos visuales, respuesta a preguntas.' },
    va: { subject: 'Valencià: Llengua i Literatura', activity: 'Exposició oral de 3 minuts sobre un animal de l’entorn', criteria: 'Contingut, organització de les idees, veu i ritme, ús de suports visuals, resposta a preguntes.' },
    ca: { subject: 'Llengua Catalana i Literatura' },
    en: { subject: 'English Language', activity: '3-minute oral presentation about a local animal', criteria: 'Content, organisation of ideas, voice and pace, use of visual aids, answering questions.' }
  },
  {
    id: 'family-trip-note', templateId: 'family-note', icon: '✉', level: 'Primaria',
    title: { es: 'Nota a las familias para una salida', va: 'Nota a les famílies per a una eixida', ca: 'Nota a les famílies per a una sortida', en: 'School trip letter to families' },
    es: { role: 'Tutora de 3.º de Primaria', task: 'Comunicar una salida didáctica al museo de ciencias y pedir la autorización firmada.', constraints: 'Tono cercano, máximo 150 palabras, incluir fecha, horario y material.' },
    va: { role: 'Tutora de 3r de Primària', task: 'Comunicar una eixida didàctica al museu de ciències i demanar l’autorització signada.', constraints: 'To proper, màxim 150 paraules, incloure data, horari i material.' },
    ca: { task: 'Comunicar una sortida didàctica al museu de ciències i demanar l’autorització signada.' },
    en: { role: 'Year 3 class teacher', task: 'Announce a school trip to the science museum and ask for signed permission.', constraints: 'Friendly tone, 150 words maximum, include date, times and what to bring.' }
  }
]

const pick = (starter: Starter, language: Language): Text =>
  language === 'en' ? starter.en : language === 'es' ? starter.es : language === 'ca' ? { ...starter.va, ...starter.ca } : starter.va

export function starterTitle(starter: Starter, language: Language): string {
  const { title } = starter
  return language === 'en' ? title.en : language === 'es' ? title.es : language === 'ca' ? title.ca ?? title.va : title.va
}

export function starterValues(starter: Starter, language: Language): Record<string, string> {
  return { ...starter.options, ...pick(starter, language) }
}
