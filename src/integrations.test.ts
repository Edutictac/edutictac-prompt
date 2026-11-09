import { describe, expect, it } from 'vitest'
import {
  EDUCEREA_URL,
  eduCreaHandoffUrl,
  eduCreaLanguage,
  eduCreaLevel,
  eduCreaNewProjectUrl,
  eduCreaPromptUrl,
  encodePromptPayload,
} from './integrations'

async function decode(payload: string): Promise<string> {
  const [kind, data] = payload.split('.', 2)
  const base64 = data
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(data.length + ((4 - (data.length % 4)) % 4), '=')
  const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0))
  if (kind === 'z') {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'))
    return new TextDecoder().decode(await new Response(stream).arrayBuffer())
  }
  return new TextDecoder().decode(bytes)
}

describe('EduCrea bridge', () => {
  it('opens the guided creation with the bridge marker', () => {
    expect(eduCreaNewProjectUrl()).toBe('https://educrea.edutictac.es/projects?nuevo=1&desde=eduprompt')
  })

  it('accepts a configured base URL and trims trailing slashes', () => {
    expect(eduCreaNewProjectUrl('https://beta.example.org/')).toBe(
      'https://beta.example.org/projects?nuevo=1&desde=eduprompt',
    )
  })

  it('exposes the production URL by default', () => {
    expect(EDUCEREA_URL).toBe('https://educrea.edutictac.es')
  })

  it('builds the direct handoff URL with the prompt in the fragment', () => {
    expect(eduCreaHandoffUrl('z.abc')).toBe('https://educrea.edutictac.es/eduprompt#encargo=z.abc')
  })

  it('sends the Prompt template so EduCrea can propose the matching product', () => {
    expect(eduCreaHandoffUrl('z.abc', 'learning-situation')).toBe(
      'https://educrea.edutictac.es/eduprompt#encargo=z.abc&plantilla=learning-situation',
    )
  })

  it('includes the template in the direct URL', async () => {
    const url = await eduCreaPromptUrl('Encargo de prueba', 'learning-situation')
    expect(url).toContain('#encargo=')
    expect(url).toContain('&plantilla=learning-situation')
  })

  it('sends the language and level in EduCrea terms', async () => {
    const url = await eduCreaPromptUrl('Encargo', 'learning-situation', undefined, {
      language: 'ca-valencia',
      level: 'ESO',
    })
    expect(url).toContain('&plantilla=learning-situation')
    expect(url).toContain('&idioma=va')
    expect(url).toContain('&nivel=secundaria')
  })

  it('maps Prompt languages and levels, dropping empty or unknown values', () => {
    expect(eduCreaLanguage('ca-valencia')).toBe('va')
    expect(eduCreaLanguage('ca')).toBe('ca')
    expect(eduCreaLanguage('es')).toBe('es')
    expect(eduCreaLanguage('xx')).toBe('')
    expect(eduCreaLevel('Infantil')).toBe('infantil')
    expect(eduCreaLevel('Primaria')).toBe('primaria')
    expect(eduCreaLevel('Bachillerato')).toBe('secundaria')
    expect(eduCreaLevel('Formación Profesional')).toBe('otros')
    expect(eduCreaLevel('')).toBe('')
  })

  it('encodes a prompt and round-trips it', async () => {
    const text = 'Encargo de prueba con tildes: programación, evaluación y acción.'
    const payload = await encodePromptPayload(text)
    expect(payload).toMatch(/^[zr]\.[A-Za-z0-9_-]+$/)
    await expect(decode(payload!)).resolves.toBe(text)
  })

  it('returns null when the payload would be too long', async () => {
    const original = globalThis.CompressionStream
    const text = 'x'.repeat(80_000)
    globalThis.CompressionStream = undefined as unknown as typeof CompressionStream
    try {
      await expect(encodePromptPayload(text)).resolves.toBeNull()
    } finally {
      globalThis.CompressionStream = original
    }
  })
})
