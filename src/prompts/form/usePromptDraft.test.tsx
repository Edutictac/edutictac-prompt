// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { starters } from '../../starters'
import type { SavedPrompt } from '../../types'
import { templates } from '../../templates'
import { usePromptDraft } from './usePromptDraft'

const saved = (overrides: Partial<SavedPrompt> = {}): SavedPrompt => ({
  id: 'p1',
  title: 'Guardado',
  prompt: 'Prompt guardado',
  templateId: 'lesson',
  values: { level: 'ESO', topic: 'Fracciones', outputFormat: 'Markdown' },
  language: 'es',
  tags: [],
  notes: '',
  favorite: false,
  createdAt: '2026-11-09T08:00:00.000Z',
  updatedAt: '2026-11-09T08:00:00.000Z',
  version: 1,
  syncStatus: 'local',
  ...overrides,
})

describe('borrador del formulario', () => {
  it('selecciona una plantilla, genera y limpia', () => {
    const { result } = renderHook(() => usePromptDraft('es'))

    act(() => result.current.choose('lesson'))
    expect(result.current.selected.id).toBe('lesson')
    expect(result.current.values.outputFormat).toBe('Markdown')

    act(() => result.current.setValues({ ...result.current.values, topic: 'Los ecosistemas' }))
    act(() => result.current.generate())
    expect(result.current.prompt).toContain('Los ecosistemas')

    act(() => result.current.clear())
    expect(result.current.prompt).toBe('')
    expect(result.current.values.topic).toBe('')
  })

  it('carga un caso de inicio y abre un prompt guardado', () => {
    const { result } = renderHook(() => usePromptDraft('es'))
    const starter = starters[0]

    act(() => result.current.startFrom(starter))
    expect(result.current.selected.id).toBe(starter.templateId)
    expect(Object.values(result.current.values).some(Boolean)).toBe(true)

    act(() => result.current.open(saved()))
    expect(result.current.selected.id).toBe('lesson')
    expect(result.current.values.topic).toBe('Fracciones')
    expect(result.current.prompt).toBe('Prompt guardado')
    expect(result.current.editingId).toBe('p1')

    expect(result.current.open(saved({ templateId: 'no-existe' }))).toBe(false)
    act(() => result.current.stopEditing())
    expect(result.current.editingId).toBeNull()
  })

  it('mantiene la plantilla inicial con todos los formatos disponibles', () => {
    const { result } = renderHook(() => usePromptDraft('es'))
    expect(result.current.selected.id).toBe(templates[0].id)
    expect(result.current.values.outputFormat).toBeTruthy()
  })
})
