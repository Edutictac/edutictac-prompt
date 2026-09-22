import { describe, expect, it, vi } from 'vitest'
import { putRemotePrompt } from './api'

describe('prompt API client', () => {
  it('sends credentials and the complete prompt payload', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ id: 'p-1', syncStatus: 'synced' }), { status: 200 }))
    const prompt = { id: 'p-1', title: 'Test', prompt: 'Contenido', language: 'es' as const, tags: [], favorite: false, createdAt: '2026-01-01', updatedAt: '2026-01-01', version: 1 }
    await putRemotePrompt(prompt)
    expect(fetchMock).toHaveBeenCalledWith('/api/prompts/p-1', expect.objectContaining({ method: 'PUT', credentials: 'include', body: JSON.stringify(prompt) }))
    fetchMock.mockRestore()
  })
})
