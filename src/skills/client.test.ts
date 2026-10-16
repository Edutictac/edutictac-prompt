import { afterEach, expect, it, vi } from 'vitest'
import { inferSkill, proposeSkill } from './client'
import { builtinSkills } from './seeds'
import { assistedPrompt, prepareExecution } from './execution'
afterEach(() => vi.restoreAllMocks())
it('sends the exact reviewed request and credentials through the existing API client', async () => {
  const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async () => new Response(JSON.stringify({ text: 'resultado' })))
  const skill = builtinSkills('es')[0],
    values = { context: 'Exposición oral' }
  await inferSkill(skill, values, 'ca-valencia', 'configured', 'model')
  const init = fetchMock.mock.calls[0][1]!
  expect(init.credentials).toBe('include')
  expect(JSON.parse(String(init.body)).prepared).toBe(
    prepareExecution(skill, values, 'ca-valencia'),
  )
  await proposeSkill('Crear rúbricas', 'es', 'configured', 'model')
  expect(JSON.parse(String(fetchMock.mock.calls[1][1]!.body)).prepared).toBe(
    assistedPrompt('Crear rúbricas', 'es'),
  )
})
it('propagates provider errors without exposing the response body', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response('sensitive provider detail', { status: 502 }),
  )
  await expect(
    inferSkill(
      builtinSkills('es')[0],
      { context: 'Tarea' },
      'es',
      'configured',
      'model',
    ),
  ).rejects.toThrow('API 502')
})
