import { describe, expect, it } from 'vitest'
import { generatePrompt } from './generator'
import { templates } from './templates'
import type { Language } from './types'

// Salidas de referencia del generador. Durante el refactor deben permanecer
// idénticas byte a byte salvo que se decida y documente un cambio de contenido.
// Se comparan con instantáneas para detectar cualquier variación no prevista.
const template = (id: string) => templates.find((item) => item.id === id)!
const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

const cases: Record<string, Record<string, string>> = {
  'learning-situation': {
    level: 'Primaria',
    course: '4.º',
    subject: 'Ciencias',
    topic: 'Los ecosistemas',
    objectives: 'Comprender las relaciones de una cadena trófica.',
    methodology: 'Aprendizaje basado en proyectos · DUA',
    duration: 'Una sesión',
    resources: 'Tablets · Material manipulativo',
    outputFormat: 'Markdown',
    udl: 'Implicación · Representación',
    barriers: 'Textos largos sin apoyo visual.',
    context: 'Grupo heterogéneo de 24 estudiantes.',
    constraints: 'Una sesión de 45 minutos.',
    qualityCriteria: 'Incluye una adaptación de apoyo.',
    curriculumProfile: 'cv-primaria-coneixement-del-medi-natural-social-i-cultural',
    curriculumCompetences: 'Plantear y responder preguntas sobre el entorno.\nIdentificar problemas ambientales.',
    curriculumCriteria: 'Formular predicciones y explicaciones.',
    curriculumKnowledge:
      'Cultura científica · Iniciación a la actividad científica.\nSocietats i territoris · Sostenibilidad.',
  },
  gift: {
    level: 'ESO',
    subject: 'Matemáticas',
    topic: 'las fracciones',
    objectives: 'Operar con fracciones equivalentes.',
    questionCount: '10',
    questionTypes: 'Opción múltiple · Verdadero/Falso',
    outputFormat: 'GIFT',
  },
  infographic: {
    level: 'Primaria',
    subject: 'Ciencias',
    topic: 'el ciclo del agua',
    sections: 'Introducción\nEtapas del ciclo\nConclusión',
    visualStyle: 'Infografía plana',
    aspectRatio: '1:1 cuadrado',
    aiTool: 'ChatGPT',
    outputFormat: 'Markdown',
  },
  feedback: {
    level: 'ESO',
    subject: 'Tecnología',
    task: 'comentario sobre el prototipo de un grupo',
    criteria: 'Justificación y uso de fuentes.',
    context: 'Trabajo cooperativo de tres sesiones.',
    outputFormat: 'Texto',
  },
}

describe('salidas de referencia del generador', () => {
  for (const [id, values] of Object.entries(cases)) {
    for (const language of languages) {
      it(`${id} permanece estable en ${language}`, () => {
        expect(generatePrompt(template(id), values, language)).toMatchSnapshot()
      })
    }
  }
})
