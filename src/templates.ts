import { catalog1 } from './templates/catalog1'
import { catalog2 } from './templates/catalog2'
import { catalog3 } from './templates/catalog3'
import { catalog4 } from './templates/catalog4'
import type { PromptTemplate, TemplateField } from './types'
export const templates: PromptTemplate[] = [...catalog1, ...catalog2, ...catalog3, ...catalog4]

// El curso de IA recomienda completar siempre que sea posible el contexto,
// las restricciones y los criterios con los que se revisará el resultado.
// Se añaden a las plantillas que aún no los tenían sin duplicar los campos
// del constructor libre.
const promptingFields: TemplateField[] = [
  { id: 'context', type: 'textarea' },
  { id: 'constraints', type: 'textarea' },
  { id: 'qualityCriteria', type: 'textarea' },
  { id: 'refinement', type: 'textarea' },
]

// Herramienta de generación de imágenes: solo en las plantillas que producen una
// imagen, porque ahí cambia de verdad cómo debe redactarse el prompt. En las de
// texto no aporta nada y el orden de «Abrir en» ya recuerda la última IA usada.
// El primer valor equivale a no indicar ninguna y el generador lo omite.
export const imageToolTemplates = ['scientific-illustration', 'infographic', 'illustrated-worksheet']
const aiToolField: TemplateField = {
  id: 'aiTool',
  type: 'select',
  options: ['Sin preferencia', 'ChatGPT', 'Gemini', 'Copilot', 'Midjourney', 'Canva'],
}

// Diseño Universal para el Aprendizaje: los principios de las pautas CAST se
// ofrecen en las plantillas que diseñan propuestas o materiales, y las
// barreras del contexto también en evaluación y adaptación. Se insertan antes
// de los campos de prompting para que queden junto al resto del diseño.
export const udlPrinciples = ['Implicación', 'Representación', 'Acción y expresión']
const udlField: TemplateField = { id: 'udl', type: 'multiselect', options: udlPrinciples }
const barriersField: TemplateField = { id: 'barriers', type: 'textarea' }
const udlCategories = ['planning', 'activities', 'content', 'digital']
const barrierCategories = [...udlCategories, 'assessment', 'adaptation']

// Accesibilidad del material impreso: medidas concretas de tipografía, color,
// espacio y lenguaje, con el perfil al que ayudan, solo en las plantillas que
// producen una ficha o un texto para el alumnado. Complementa el DUA (principios)
// y las barreras (texto libre). Idea inspirada en el generador de fichas de
// Sandra Fortanet (sanforbel.github.io/generador-fitxes), redactada de nuevo.
export const accessibilityTemplates = [
  'worksheet',
  'illustrated-worksheet',
  'reading-comprehension',
  'easy-reading',
  'lab-guide',
  'escape-room',
]
export const accessibilityOptions = [
  'Letra grande sin serifa',
  'Espaciado e interlineado amplios',
  'Texto alineado a la izquierda',
  'Alto contraste',
  'Sin depender del color',
  'Pensada para papel crema',
  'Espacios de escritura pautados',
  'Poco contenido por página',
  'Una instrucción por paso',
  'Pictogramas en las instrucciones',
  'Diseño limpio sin adornos',
  'Lectura fácil',
  'Vocabulario con apoyo visual',
]
const accessibilityField: TemplateField = { id: 'accessibility', type: 'multiselect', options: accessibilityOptions }

for (const template of templates) {
  if (
    accessibilityTemplates.includes(template.id) &&
    !template.fields.some((existing) => existing.id === accessibilityField.id)
  ) {
    template.fields.push({ ...accessibilityField, options: [...accessibilityOptions] })
  }
  if (udlCategories.includes(template.category) && !template.fields.some((existing) => existing.id === udlField.id)) {
    template.fields.push({ ...udlField, options: [...udlPrinciples] })
  }
  if (
    barrierCategories.includes(template.category) &&
    !template.fields.some((existing) => existing.id === barriersField.id)
  ) {
    template.fields.push({ ...barriersField })
  }
  if (imageToolTemplates.includes(template.id) && !template.fields.some((existing) => existing.id === aiToolField.id)) {
    template.fields.unshift({ ...aiToolField })
  }
  for (const field of promptingFields) {
    if (!template.fields.some((existing) => existing.id === field.id)) {
      template.fields.push({ ...field })
    }
  }
}

// Opciones pedagógicas adicionales, siempre optativas.
for (const template of templates) {
  const planning = ['learning-situation', 'lesson', 'sequence', 'learning-stations'].includes(template.id)
  const assessment = ['rubric', 'checklist'].includes(template.id)
  if (template.id === 'lesson') template.fields.push({ id: 'lessonOpening', type: 'select', options: ['Sí'] })
  if (planning) template.fields.push({ id: 'priorKnowledge', type: 'select', options: ['Sí'] })
  if (assessment) template.fields.push({ id: 'peerAssessment', type: 'select', options: ['Sí'] })
  if (planning || assessment) template.fields.push({ id: 'guidedQuestions', type: 'select', options: ['Sí'] })
}

// Los formatos documentales se ofrecen en último lugar salvo en las plantillas
// que producen su propio paquete o formato (H5P, SCORM, GIFT, QTI, CC y HTML).
const ownFormatTemplates = [
  'h5p',
  'scorm',
  'gift',
  'qti',
  'common-cartridge',
  'html-game',
  'explainer-video',
  'illustrated-worksheet',
]
const documentFormats = ['PDF', 'ODT', 'DOCX']
for (const template of templates) {
  const outputFormat = template.fields.find((field) => field.id === 'outputFormat')
  if (!outputFormat) continue
  if (!ownFormatTemplates.includes(template.id) && outputFormat.options) {
    for (const format of documentFormats) if (!outputFormat.options.includes(format)) outputFormat.options.push(format)
  }
  const maxScore = template.fields.find((field) => field.id === 'maxScore')
  template.fields = template.fields.filter((field) => field.id !== 'outputFormat' && field.id !== 'maxScore')
  if (maxScore) template.fields.push(maxScore)
  template.fields.push(outputFormat)
}

// Educación de personas adultas (FPA) como nivel más en todas las plantillas,
// detrás de FP y antes de Universidad u Otro.
export const ADULT_LEVEL = 'Educación de personas adultas'
for (const template of templates) {
  const options = template.fields.find((field) => field.id === 'level')?.options
  if (!options || options.includes(ADULT_LEVEL)) continue
  const after = Math.max(options.indexOf('FP'), options.indexOf('Formación Profesional'))
  const at = after >= 0 ? after + 1 : options.findIndex((option) => option === 'Universidad' || option === 'Otro')
  options.splice(at >= 0 ? at : options.length, 0, ADULT_LEVEL)
}

// Solo mostramos filtros que tienen al menos una herramienta publicada.
// Así el catálogo no ofrece categorías vacías mientras se preparan futuras plantillas.
export const categoryIds = ['all', ...new Set(templates.map((template) => template.category))]
