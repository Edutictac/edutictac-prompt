// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { updateSW } from '../pwa'
import { usePwaUpdate } from './usePwaUpdate'

vi.mock('../pwa', () => ({ updateSW: vi.fn() }))

describe('aviso de actualización de la PWA', () => {
  it('escucha el evento y aplica la actualización', async () => {
    const { result } = renderHook(() => usePwaUpdate())
    expect(result.current.updateAvailable).toBe(false)

    act(() => window.dispatchEvent(new Event('pwa-update-available')))
    await waitFor(() => expect(result.current.updateAvailable).toBe(true))

    act(() => result.current.applyUpdate())
    expect(vi.mocked(updateSW)).toHaveBeenCalledWith(true)
  })
})
