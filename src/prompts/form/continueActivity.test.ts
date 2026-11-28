import { describe, expect, it } from 'vitest'
import { templates } from '../../templates'
import { continuationTargets, continuationValues } from './continueActivity'

const template = (id: string) => templates.find((item) => item.id === id)!

describe('continue with an activity', () => {
  it('offers evidence and rubric from activities, and a rubric from evidence', () => {
    expect(continuationTargets(template('lesson'))).toEqual(['activity-evidence', 'rubric'])
    expect(continuationTargets(template('activity-evidence'))).toEqual(['rubric'])
    expect(continuationTargets(template('rubric'))).toEqual([])
  })
  it('transfers supplied context and criteria without presenting the generated prompt as the activity', () => {
    const input = {
      level: 'ESO',
      subject: 'Ciencias',
      topic: 'El agua',
      objectives: 'Explicar',
      criteria: 'Justifica',
      curriculumCriteria: 'Criterio A',
      prompt: 'No transferir',
      outputFormat: 'HTML',
    }
    const evidence = continuationValues(input, template('activity-evidence'))
    expect(evidence).toMatchObject({
      level: 'ESO',
      subject: 'Ciencias',
      activity: 'El agua',
      objectives: 'Explicar',
      criteria: 'Justifica',
      curriculumCriteria: 'Criterio A',
    })
    expect(evidence).not.toHaveProperty('prompt')
    expect(evidence).not.toHaveProperty('outputFormat')
    expect(continuationValues({ activity: 'Descripción concreta', topic: 'Tema' }, template('rubric')).activity).toBe(
      'Descripción concreta',
    )
  })
})
