import { describe, expect, it } from 'vitest'
import { EDUCEREA_URL, eduCreaNewProjectUrl } from './integrations'

describe('EduCrea bridge', () => {
  it('opens the guided creation with the bridge marker', () => {
    expect(eduCreaNewProjectUrl()).toBe('https://educrea.edutictac.es/projects?nuevo=1&desde=eduprompt')
  })

  it('accepts a configured base URL and trims trailing slashes', () => {
    expect(eduCreaNewProjectUrl('https://beta.example.org/'))
      .toBe('https://beta.example.org/projects?nuevo=1&desde=eduprompt')
  })

  it('exposes the production URL by default', () => {
    expect(EDUCEREA_URL).toBe('https://educrea.edutictac.es')
  })
})
