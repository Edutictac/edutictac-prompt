import { describe, expect, it } from 'vitest'
import { aiTargets, aiTargetUrl, followUps, orderedAiTargets } from './followUps'
import { templates } from './templates'
import type { Language } from './types'

const target = (id: string) => aiTargets.find(item => item.id === id)!

describe('abrir el prompt en un asistente', () => {
  it('pasa el prompt en el enlace cuando el asistente lo admite', () => {
    expect(aiTargetUrl(target('ChatGPT'), 'Hola & adéu')).toBe('https://chatgpt.com/?q=Hola%20%26%20ad%C3%A9u')
    expect(aiTargetUrl(target('Claude'), 'Hola')).toBe('https://claude.ai/new?q=Hola')
    expect(aiTargetUrl(target('Gemini'), 'Hola')).toBe('https://gemini.google.com/app')
  })

  it('abre la web sin el prompt cuando el enlace sería demasiado largo', () => {
    expect(aiTargetUrl(target('ChatGPT'), 'x'.repeat(7000))).toBe('https://chatgpt.com/')
    expect(aiTargetUrl(target('Perplexity'), 'x'.repeat(7000))).toBe('https://www.perplexity.ai/search')
  })

  it('pone primero el asistente elegido en el formulario', () => {
    expect(orderedAiTargets('Gemini')[0].id).toBe('Gemini')
    expect(orderedAiTargets('Sin preferencia').map(item => item.id)).toEqual(aiTargets.map(item => item.id))
  })
})

describe('peticiones de seguimiento', () => {
  it('ofrece las mismas peticiones en todos los idiomas para cada plantilla', () => {
    const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']
    for (const template of templates) {
      const counts = languages.map(language => followUps(template.id, template.category, language).length)
      expect(new Set(counts).size).toBe(1)
      expect(counts[0]).toBeGreaterThanOrEqual(3)
    }
  })

  it('añade peticiones propias del juego HTML', () => {
    expect(followUps('html-game', 'digital', 'es')[0]).toContain('JavaScript')
  })
})
