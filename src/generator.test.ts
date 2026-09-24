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

  it('mantiene el idioma elegido cuando el formulario está vacío', () => {
    const catalan = generatePrompt(template('free'), {}, 'ca')
    expect(catalan).toContain('Actua com a docent especialista en educació')
    expect(catalan).toContain('Dissenya una activitat sobre el tema indicat.')
    expect(catalan).toContain('Ofereix un primer esborrany revisable')
    expect(catalan).not.toContain('Actúa como docente')
    expect(catalan).not.toContain('Diseña una actividad')
  })

  it('traduce les opcions seleccionades en el prompt català', () => {
    const prompt = generatePrompt(template('lesson'), { level: 'Primaria', outputFormat: 'Texto' }, 'ca')
    expect(prompt).toContain('Primària')
    expect(prompt).toContain('Retorna el resultat en Text.')
    expect(prompt).not.toContain('Primaria')
    expect(prompt).not.toContain('Texto')
  })

  it('genera el feedback formatiu i la comunicació a famílies', () => {
    const feedback = generatePrompt(template('feedback'), {
      level: 'ESO',
      subject: 'Tecnología',
      task: 'comentario sobre el prototipo de un grupo',
      criteria: 'Justificación y uso de fuentes.',
      outputFormat: 'Texto'
    }, 'es')
    expect(feedback).toContain('## Objetivo y tarea')
    expect(feedback).toContain('comentario sobre el prototipo de un grupo')

    const family = generatePrompt(template('family-note'), {
      role: 'Tutor de 2.º de ESO',
      context: 'Comunicar una salida didáctica.',
      task: 'Redacta una circular breve para las familias.',
      outputFormat: 'Texto'
    }, 'es')
    expect(family).toContain('## Rol')
    expect(family).toContain('Tutor de 2.º de ESO')
    expect(family).toContain('## Contexto')
    expect(family).toContain('Redacta una circular breve')
  })

  it('adapta un texto a lectura fácil e incluye el texto de partida', () => {
    const prompt = generatePrompt(template('easy-reading'), {
      level: 'Primaria',
      subject: 'Ciencias',
      topic: 'Los ecosistemas',
      sourceText: 'Los ecosistemas son sistemas formados por seres vivos...',
      outputFormat: 'Texto'
    }, 'es')
    expect(prompt).toContain('Adapta a lectura fácil el siguiente texto.')
    expect(prompt).toContain('## Texto de partida')
    expect(prompt).toContain('Los ecosistemas son sistemas formados por seres vivos')
  })

  it('usa textos propios en los comunicados, la tutoría y el feedback', () => {
    const family = generatePrompt(template('family-note'), { outputFormat: 'Texto' }, 'es')
    expect(family).toContain('tutor/a o miembro del equipo directivo')
    expect(family).toContain('Redacta una comunicación breve y clara para las familias.')
    expect(family).not.toContain('Diseña una actividad')

    const feedback = generatePrompt(template('feedback'), { outputFormat: 'Texto' }, 'ca')
    expect(feedback).toContain('feedback formatiu')
    expect(feedback).not.toContain('Dissenya una activitat')
  })
})
