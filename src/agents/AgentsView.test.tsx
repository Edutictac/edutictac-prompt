// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AgentsView from './AgentsView'
import { db } from '../db'
afterEach(async () => {
  cleanup()
  await db.agents.clear()
  await db.agentRevisions.clear()
  vi.restoreAllMocks()
})
it('designs, saves, reopens, adapts and deletes a specialist agent', async () => {
  const user = userEvent.setup()
  render(
    <AgentsView
      language="es"
      prompts={[]}
      copy={async () => true}
      onSaveResult={async () => {}}
    />,
  )
  expect(
    screen.getByRole('heading', { name: 'Agentes', level: 1 }),
  ).toBeTruthy()
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Ejemplos' }),
    'smart',
  )
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Nivel educativo' }),
    'primary',
  )
  const subject = screen.getByRole('combobox', { name: /Materia, ámbito/ })
  await user.clear(subject)
  await user.type(subject, 'Matemáticas')
  await user.click(
    screen.getByRole('button', { name: 'Preparar configuración' }),
  )
  expect(
    (
      screen.getByRole('textbox', {
        name: 'Instrucciones del agente',
      }) as HTMLTextAreaElement
    ).value,
  ).toContain('Matemáticas')
  await user.click(screen.getByRole('button', { name: 'Guardar diseño' }))
  await screen.findByText('Diseño guardado en Mis agentes.')
  expect(await db.agents.count()).toBe(1)
  await user.click(screen.getByRole('button', { name: 'Editar y adaptar' }))
  expect(
    (
      screen.getByRole('combobox', {
        name: 'Nivel educativo',
      }) as HTMLSelectElement
    ).value,
  ).toBe('primary')
  expect(
    (
      screen.getByRole('combobox', {
        name: /Materia, ámbito/,
      }) as HTMLInputElement
    ).value,
  ).toBe('Matemáticas')
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Nivel educativo' }),
    'secondary',
  )
  await user.click(
    screen.getByRole('button', { name: 'Preparar configuración' }),
  )
  await user.click(screen.getByRole('button', { name: 'Guardar diseño' }))
  await screen.findByText('Diseño guardado en Mis agentes.')
  expect((await db.agents.toArray())[0].revision).toBe(2)
  await user.click(screen.getByRole('button', { name: 'Duplicar' }))
  await waitFor(async () => expect(await db.agents.count()).toBe(2))
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])
  await waitFor(async () => expect(await db.agents.count()).toBe(1))
})
it('keeps Agent Skills packages in an explicitly separate compatibility section', async () => {
  const user = userEvent.setup()
  render(
    <AgentsView
      language="es"
      prompts={[]}
      copy={async () => true}
      onSaveResult={async () => {}}
    />,
  )
  expect(screen.queryByRole('heading', { name: 'Agent Skills' })).toBeNull()
  await user.click(screen.getByRole('button', { name: 'Compatibilidad' }))
  await screen.findByRole('heading', { name: 'Agent Skills' })
  expect(screen.getByText(/Un paquete de habilidad y un agente/)).toBeTruthy()
  expect(
    screen.getAllByRole('button', { name: 'Ver y utilizar' }),
  ).toHaveLength(6)
})
it('uses Valencian Agents naming and preserves unsaved changes between tabs', async () => {
  const user = userEvent.setup()
  render(
    <AgentsView
      language="ca-valencia"
      prompts={[]}
      copy={async () => true}
      onSaveResult={async () => {}}
    />,
  )
  expect(screen.getByRole('heading', { name: 'Agents', level: 1 })).toBeTruthy()
  const subject = screen.getByRole('combobox', { name: /Matèria, àmbit/ })
  await user.type(subject, 'Llenguatge musical')
  await user.click(screen.getByRole('button', { name: 'Exemples' }))
  await user.click(screen.getByRole('button', { name: 'Dissenyar agent' }))
  expect(
    (
      screen.getByRole('combobox', {
        name: /Matèria, àmbit/,
      }) as HTMLInputElement
    ).value,
  ).toBe('Llenguatge musical')
  expect(screen.getByRole('button', { name: 'Els meus agents' })).toBeTruthy()
})
