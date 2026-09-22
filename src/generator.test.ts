import { describe, expect, it } from 'vitest'
import { generatePrompt } from './generator'
import { templates } from './templates'

const template = (id: string) => templates.find(item => item.id === id)!

describe('generatePrompt', () => {
  it('compone un encargo docente con los elementos del curso', () => {
    const prompt = generatePrompt(template('lesson'), {
      level: 'Primaria',
      course: '4.º',
      subject: 'Ciencias',
      topic: 'Los ecosistemas',
      context: 'Grupo heterogéneo de 24 alumnos con distintos niveles lectores.',
      objectives: 'Comprender las relaciones de una cadena trófica.',
      constraints: 'Una sesión de 45 minutos y sin dispositivos.',
      qualityCriteria: 'Debe incluir una evidencia observable y una adaptación de apoyo.',
      outputFormat: 'Markdown'
    }, 'es')

    expect(prompt).toContain('## Rol')
    expect(prompt).toContain('## Contexto')
    expect(prompt).toContain('Primaria 4.º')
    expect(prompt).toContain('Grupo heterogéneo de 24 alumnos')
    expect(prompt).toContain('## Objetivo y tarea')
    expect(prompt).toContain('Los ecosistemas')
    expect(prompt).toContain('## Restricciones y límites')
    expect(prompt).toContain('## Criterios de calidad')
    expect(prompt).toContain('## Formato de salida\nDevuelve el resultado en Markdown.')
  })

  it('aplica la tarea especializada de una rúbrica', () => {
    const prompt = generatePrompt(template('rubric'), {
      activity: 'debate sobre el cambio climático',
      criteria: 'Argumentación y uso de fuentes.',
      levels: '4',
      outputFormat: 'Tabla Markdown'
    }, 'es')

    expect(prompt).toContain('Crea una rúbrica para evaluar debate sobre el cambio climático.')
    expect(prompt).toContain('## Criterios\nArgumentación y uso de fuentes.')
    expect(prompt).toContain('## Niveles de desempeño\n4')
  })

  it('incluye revisión, viabilidad y protección de datos', () => {
    const prompt = generatePrompt(template('free'), {
      role: 'Docente de Lengua',
      task: 'Diseña una actividad de comprensión lectora.',
      outputFormat: 'Texto'
    }, 'es')

    expect(prompt).toContain('Entrega un primer borrador revisable')
    expect(prompt).toContain('Comprueba que la propuesta es viable')
    expect(prompt).toContain('No inventes normativa, referencias ni información sobre el alumnado.')
    expect(prompt).toContain('Devuelve el resultado en Texto.')
  })

  it('traduce las etiquetas principales al valenciano', () => {
    const prompt = generatePrompt(template('free'), {
      role: 'Docent',
      task: 'Dissenya una activitat.',
      qualityCriteria: 'Instruccions clares.',
      outputFormat: 'Markdown'
    }, 'ca-valencia')

    expect(prompt).toContain('## Rol')
    expect(prompt).toContain('## Objectiu i tasca')
    expect(prompt).toContain('## Criteris de qualitat')
    expect(prompt).toContain('## Format d’eixida')
  })
})
