import { describe, expect, it } from 'vitest'
import { news, newsVersion } from './news'
import { templates } from './templates'
import pkg from '../package.json'

describe('novedades de la portada', () => {
  it('enlazan herramientas existentes y tienen texto en los cuatro idiomas', () => {
    expect(news.length).toBeGreaterThan(0)
    expect(news.length).toBeLessThanOrEqual(4)
    for (const item of news) {
      if ('templateId' in item)
        expect(
          templates.some((template) => template.id === item.templateId),
          item.templateId,
        ).toBe(true)
      else expect(item.view).toBe('agents')
      for (const language of ['es', 'ca-valencia', 'ca', 'en'] as const)
        expect(
          item.text[language].trim().length,
          `${'templateId' in item ? item.templateId : item.view} ${language}`,
        ).toBeGreaterThan(10)
    }
  })

  it('anuncian una versión que no es posterior a la publicada', () => {
    const toNumber = (version: string) => version.split('.').reduce((sum, part) => sum * 1000 + Number(part), 0)
    expect(toNumber(newsVersion)).toBeLessThanOrEqual(toNumber(pkg.version))
  })
})
