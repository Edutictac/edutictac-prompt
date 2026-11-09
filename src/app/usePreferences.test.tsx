// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { usePreferences } from './usePreferences'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.lang = ''
})

describe('preferencias de idioma y tema', () => {
  it('persiste el idioma y actualiza el documento', async () => {
    const { result } = renderHook(() => usePreferences())

    act(() => result.current.setLang('ca-valencia'))

    await waitFor(() => expect(localStorage.getItem('edutictac-language')).toBe('ca-valencia'))
    expect(result.current.lang).toBe('ca-valencia')
    expect(document.documentElement.lang).toBe('ca-ES-valencia')
  })

  it('aplica el tema y calcula el modo oscuro', async () => {
    const { result } = renderHook(() => usePreferences())

    act(() => result.current.setThemeMode('dark'))

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'))
    expect(localStorage.getItem('edutictac-theme')).toBe('dark')
    expect(result.current.darkMode).toBe(true)

    act(() => result.current.setThemeMode('light'))
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'))
    expect(result.current.darkMode).toBe(false)
  })
})
