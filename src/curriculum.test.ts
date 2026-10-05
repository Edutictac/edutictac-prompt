import { describe, expect, it } from 'vitest'
import { getCurriculumElements, spanishCurriculumElements, subjectProfileFor, valencianCurriculumElements, valencianProfiles } from './curriculum'

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

  it('inclou el primer perfil detallat de Primària', () => {
    const elements = getCurriculumElements('cv-primaria-coneixement-del-medi-natural-social-i-cultural')
    expect(elements?.specificCompetences).toHaveLength(8)
    expect(elements?.basicKnowledge).toContain('Cultura científica · Iniciació a l’activitat científica, observació, prediccions, experimentació i registre de resultats.')
  })

  it('ofrece los elementos curriculares en castellano con la misma estructura', () => {
    expect(Object.keys(spanishCurriculumElements)).toEqual(Object.keys(valencianCurriculumElements))
    for (const [id, elements] of Object.entries(valencianCurriculumElements)) for (const key of ['specificCompetences', 'assessmentCriteria', 'basicKnowledge'] as const) {
      expect(spanishCurriculumElements[id][key]).toHaveLength(elements[key].length)
    }
    expect(getCurriculumElements('cv-eso-matemàtiques', undefined, undefined, 'es')?.basicKnowledge).toContain('Sentido algebraico.')
  })

  it('traduce el nombre de las materias sin cambiar el id del perfil', () => {
    const profile = valencianProfiles.find(item => item.id === 'cv-eso-biologia-i-geologia')!
    expect(profile.subjectLabels.es).toBe('Biología y Geología')
    expect(profile.labels.es).toBe('Comunitat Valenciana · ESO · Biología y Geología')
    expect(profile.subjectLabels['ca-valencia']).toBe('Biologia i Geologia')
    expect(subjectProfileFor('ESO', 'Tecnología y Digitalización')?.subject).toBe('Tecnologia i Digitalització')
    expect(getCurriculumElements('', 'ESO', 'Matemáticas', 'es')?.basicKnowledge).toContain('Sentido numérico y de las operaciones.')
  })
})
