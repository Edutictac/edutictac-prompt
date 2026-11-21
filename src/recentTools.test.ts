// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MAX_RECENT, readRecentTools, rememberRecentTool } from './recentTools'
import { templates } from './templates'

beforeEach(() => localStorage.clear())

describe('herramientas recientes', () => {
  it('guarda la última primero, sin duplicados y con un máximo', () => {
    for (const template of templates.slice(0, MAX_RECENT + 2)) rememberRecentTool(template.id)
    rememberRecentTool(templates[3].id)
    const recent = readRecentTools()
    expect(recent).toHaveLength(MAX_RECENT)
    expect(recent[0]).toBe(templates[3].id)
    expect(new Set(recent).size).toBe(recent.length)
  })

  it('ignora datos corruptos o herramientas que ya no existen', () => {
    localStorage.setItem('edutictac-prompt-recent-tools', '{roto')
    expect(readRecentTools()).toEqual([])
    localStorage.setItem('edutictac-prompt-recent-tools', JSON.stringify(['no-existe', 'worksheet', 3]))
    expect(readRecentTools()).toEqual(['worksheet'])
  })

  it('funciona sin almacenamiento disponible', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('bloqueado')
    })
    expect(rememberRecentTool('worksheet')).toEqual(['worksheet'])
    vi.restoreAllMocks()
  })
})
