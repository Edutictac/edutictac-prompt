import { describe, expect, it } from 'vitest'
import { templates } from './templates'
import { templateTips } from './templateTips'
import type { Language } from './types'

const languages: Language[] = ['es', 'ca-valencia', 'ca', 'en']

describe('pistas de uso de las herramientas', () => {
  it('tiene para qué sirve y una pista para cada herramienta en los cuatro idiomas', () => {
    const missing: string[] = []
    for (const language of languages)
      for (const template of templates) {
        const tip = templateTips[language][template.id]
        if (!tip?.use?.trim() || !tip?.tip?.trim()) missing.push(`${language} ${template.id}`)
      }
    expect(missing).toEqual([])
  })

  it('no tiene pistas de herramientas que no existen', () => {
    const ids = new Set(templates.map((template) => template.id))
    const extra = languages.flatMap((language) =>
      Object.keys(templateTips[language])
        .filter((id) => !ids.has(id))
        .map((id) => `${language} ${id}`),
    )
    expect(extra).toEqual([])
  })
})
