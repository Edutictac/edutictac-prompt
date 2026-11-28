import { describe, expect, it } from 'vitest'
import { generatePrompt } from '../../generator'
import { templates } from '../../templates'
import { exampleValues } from '../../examples'
import type { Language } from '../../types'

const template = (id: string) => templates.find((item) => item.id === id)!

describe('learning stations and evidence', () => {
  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])('uses the example details in %s', (language) => {
    const stations = generatePrompt(
      template('learning-stations'),
      exampleValues('learning-stations', language),
      language,
    )
    const evidence = generatePrompt(
      template('activity-evidence'),
      exampleValues('activity-evidence', language),
      language,
    )
    expect(stations).toContain(exampleValues('learning-stations', language).topic)
    expect(stations).toContain(exampleValues('learning-stations', language).duration)
    expect(evidence).toContain(exampleValues('activity-evidence', language).activity)
    expect(evidence).toContain(exampleValues('activity-evidence', language).criteria)
  })
  it('requests feasible station logistics and supports observation rather than invented criteria', () => {
    const stations = generatePrompt(template('learning-stations'), { topic: 'El agua', duration: '45 minutos' }, 'es')
    expect(stations).toContain('transiciones, práctica y cierre compartido')
    expect(stations).toContain('instrucciones listas para el alumnado')
    const evidence = generatePrompt(template('activity-evidence'), {}, 'es')
    expect(evidence).toContain('Si falta la actividad, pídela antes de continuar')
    expect(evidence).toContain('no inventes códigos curriculares')
    expect(evidence).toContain('Distingue las evidencias de las interpretaciones')
  })
})
