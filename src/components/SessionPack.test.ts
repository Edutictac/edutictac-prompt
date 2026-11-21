import { describe, expect, it } from 'vitest'
import { sessionItems, sessionLinksText } from './SessionPack'
import { decodeShareData } from '../shareLink'
import type { SavedPrompt } from '../types'

const prompt = (over: Partial<SavedPrompt>): SavedPrompt => ({
  id: 'p1',
  title: 'Ficha del agua',
  prompt: 'texto',
  templateId: 'worksheet',
  values: { level: 'ESO', topic: 'El agua' },
  language: 'es',
  tags: [],
  favorite: false,
  createdAt: '2026-11-21T10:00:00Z',
  updatedAt: '2026-11-21T10:00:00Z',
  version: 1,
  ...over,
})

describe('paquete de sesión', () => {
  it('crea un enlace con los datos guardados de cada prompt', () => {
    const [item] = sessionItems([prompt({})], 'https://x/', (id) => `Nombre ${id}`)
    expect(item.withData).toBe(true)
    expect(item.toolName).toBe('Nombre worksheet')
    const data = new URLSearchParams(item.url.split('?')[1]).get('d')!
    expect(decodeShareData('worksheet', data)).toEqual({ level: 'ESO', topic: 'El agua' })
  })

  it('sin datos abre la herramienta vacía y omite los prompts sin herramienta', () => {
    const items = sessionItems(
      [prompt({ id: 'a', values: undefined }), prompt({ id: 'b', templateId: undefined })],
      'https://x/',
      (id) => id,
    )
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ url: 'https://x/#template/worksheet', withData: false })
  })

  it('copia los enlaces como lista numerada con el título de la sesión', () => {
    const items = sessionItems([prompt({}), prompt({ id: 'p2', title: 'Rúbrica' })], 'https://x/', (id) => id)
    const text = sessionLinksText('Sesión 2', items)
    expect(text.split('\n')[0]).toBe('Sesión 2')
    expect(text).toContain('1. Ficha del agua (worksheet)\nhttps://x/#template/worksheet?d=')
    expect(text).toContain('2. Rúbrica (worksheet)')
  })
})
