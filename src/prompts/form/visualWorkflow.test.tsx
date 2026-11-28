// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { db } from '../../db'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('edutictac-language', 'es')
  history.replaceState(null, '', '/#template/lesson')
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
  Object.defineProperty(window, 'isSecureContext', { configurable: true, value: true })
})
afterEach(async () => {
  cleanup()
  await db.prompts.clear()
  await db.categories.clear()
  vi.restoreAllMocks()
})

it('genera, edita visualmente, copia, guarda y recupera el texto editado', async () => {
  const user = userEvent.setup()
  const copy = vi.fn(async (_text: string) => {})
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: copy } })
  render(<App />)
  await user.click(await screen.findByRole('button', { name: 'Avanzado' }))
  await user.click(screen.getByRole('button', { name: 'Generar prompt' }))
  const paragraphs = await screen.findAllByRole('textbox', { name: /^Párrafo/ })
  await user.type(paragraphs[0], ' EJEMPLO EDITADO')
  await user.click(screen.getByRole('button', { name: 'Copiar' }))
  expect(copy).toHaveBeenCalledWith(expect.stringContaining('EJEMPLO EDITADO'))
  await user.click(screen.getByRole('button', { name: 'Guardar' }))
  await user.type(screen.getByRole('textbox', { name: 'Título' }), 'Mi prompt visual')
  await user.click(screen.getByRole('button', { name: 'Guardar prompt' }))
  await waitFor(async () => expect((await db.prompts.toArray())[0]?.prompt).toContain('EJEMPLO EDITADO'))
  await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
  await screen.findByRole('heading', { name: 'Mi prompt visual' })
  await user.click(screen.getByRole('button', { name: 'Editar' }))
  await waitFor(() =>
    expect(
      screen
        .getAllByRole('textbox', { name: /^Párrafo/ })
        .some((node) => (node as HTMLTextAreaElement).value.includes('EJEMPLO EDITADO')),
    ).toBe(true),
  )
})
