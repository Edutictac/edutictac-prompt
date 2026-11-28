// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { getPreferences, putPreferences } from '../api'
import { readDefaultFormat, writeDefaultFormat } from '../prompts/form/defaultFormat'
import { useDefaultFormatSync } from './useDefaultFormatSync'

vi.mock('../api', () => ({ getPreferences: vi.fn(), putPreferences: vi.fn() }))
beforeEach(() => {
  localStorage.clear()
  vi.resetAllMocks()
})
afterEach(() => cleanup())

describe('account output format', () => {
  it('loads the account format and saves later changes', async () => {
    vi.mocked(getPreferences).mockResolvedValue({ defaultOutputFormat: 'DOCX' })
    vi.mocked(putPreferences).mockResolvedValue({ defaultOutputFormat: 'PDF' })
    renderHook(() => useDefaultFormatSync('alice'))
    await waitFor(() => expect(readDefaultFormat()).toBe('DOCX'))
    writeDefaultFormat('PDF')
    await waitFor(() => expect(putPreferences).toHaveBeenCalledWith('PDF'))
  })
  it('does not copy a different account preference into an empty account', async () => {
    localStorage.setItem('edutictac-default-format-owner', 'alice')
    writeDefaultFormat('DOCX')
    vi.mocked(getPreferences).mockResolvedValue({ defaultOutputFormat: null })
    renderHook(() => useDefaultFormatSync('bob'))
    await waitFor(() => expect(readDefaultFormat()).toBe(''))
    expect(putPreferences).not.toHaveBeenCalled()
  })
  it('retries a failed update when connection returns', async () => {
    vi.mocked(getPreferences).mockResolvedValue({ defaultOutputFormat: '' })
    vi.mocked(putPreferences)
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValue({ defaultOutputFormat: 'DOCX' })
    renderHook(() => useDefaultFormatSync('alice'))
    await waitFor(() => expect(getPreferences).toHaveBeenCalled())
    writeDefaultFormat('DOCX')
    await waitFor(() => expect(putPreferences).toHaveBeenCalledTimes(1))
    window.dispatchEvent(new Event('online'))
    await waitFor(() => expect(putPreferences).toHaveBeenCalledTimes(2))
  })
})
