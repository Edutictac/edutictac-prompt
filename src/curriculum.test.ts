import { describe, expect, it } from 'vitest'
import { getCurriculumElements } from './curriculum'

describe('currículum valencià', () => {
  it('recupera els elements detallats directament o per etapa i matèria', () => {
    const direct = getCurriculumElements('cv-eso-tecnologia-i-digitalització')
    const bySubject = getCurriculumElements('cv-eso', 'ESO', 'Tecnologia i Digitalització')

    expect(direct?.specificCompetences.length).toBeGreaterThan(0)
    expect(bySubject).toEqual(direct)
  })

  it('ofereix sabers bàsics que poden suggerir temes', () => {
    const elements = getCurriculumElements('cv-eso-matemàtiques')
    expect(elements?.basicKnowledge).toContain('Sentit algebraic.')
  })

  it('inclou les tres àrees d’Educació Infantil', () => {
    const elements = getCurriculumElements('cv-infantil')
    expect(elements?.specificCompetences.some(item => item.startsWith('Àrea I'))).toBe(true)
    expect(elements?.specificCompetences.some(item => item.startsWith('Àrea II'))).toBe(true)
    expect(elements?.specificCompetences.some(item => item.startsWith('Àrea III'))).toBe(true)
    expect(elements?.basicKnowledge).toContain('Àrea II · Éssers vius, necessitats, canvis perceptibles i respecte per la natura.')
  })
})
