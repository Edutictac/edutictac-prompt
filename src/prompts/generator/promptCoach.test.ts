import { describe, expect, it } from 'vitest'
import { generatePrompt } from '../../generator'
import { templates } from '../../templates'
import { exampleValues } from '../../examples'
import type { Language } from '../../types'

const coach = templates.find((template) => template.id === 'prompt-coach')!

describe('prompt design assistant', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])(
    'keeps both the goal and the existing prompt in %s',
    (language) => {
      const prompt = generatePrompt(coach, { coachIdea: 'GOAL-42', coachSource: 'ORIGINAL-83' }, language)
      expect(prompt).toContain('GOAL-42')
      expect(prompt).toContain('ORIGINAL-83')
      expect(generatePrompt(coach, exampleValues('prompt-coach', language), language)).toContain(
        exampleValues('prompt-coach', language).coachIdea,
      )
    },
  )
  it('requests a short dialogue and a reusable prompt without executing the underlying task', () => {
    const prompt = generatePrompt(coach, { coachIdea: 'Crear una actividad', coachSource: 'Un borrador' }, 'es')
    expect(prompt).toContain('Objetivo: Crear una actividad')
    expect(prompt).toContain('Prompt para mejorar:\nUn borrador')
    expect(prompt).toContain('un máximo de tres preguntas breves, una cada vez')
    expect(prompt).toContain('Si no falta nada esencial, continúa directamente')
    expect(prompt).toContain('conserva su intención')
    expect(prompt).toContain('No realices la tarea de fondo')
  })
  it('asks for the missing idea when neither an idea nor an existing prompt is provided', () => {
    const prompt = generatePrompt(coach, {}, 'es')
    expect(prompt).toContain('Todavía no se ha facilitado ninguna idea ni prompt')
    expect(prompt).toContain('información esencial falta')
  })
})
