// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { db } from '../db'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('edutictac-language', 'es')
  history.replaceState(null, '', '/')
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(async () => {
  cleanup()
  await Promise.all([db.prompts.clear(), db.categories.clear()])
})

it('recorre herramientas y biblioteca con Atrás y Adelante sin perder el borrador', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^Crear/ }))
  await user.click(await screen.findByRole('button', { name: 'Avanzado' }))
  const topic = screen.getByPlaceholderText('Ex. Los ecosistemas de nuestro entorno')
  await user.type(topic, 'Mi borrador')
  await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
  expect(screen.getByRole('heading', { name: 'Mi biblioteca', level: 1 })).toBeTruthy()

  history.back()
  await user.click(await screen.findByRole('button', { name: 'Avanzado' }))
  await waitFor(() => expect(screen.getByDisplayValue('Mi borrador')).toBeTruthy())
  history.back()
  await waitFor(() => expect(screen.getByRole('heading', { name: /Crea mejores prompts/ })).toBeTruthy())
  history.forward()
  await user.click(await screen.findByRole('button', { name: 'Avanzado' }))
  await waitFor(() => expect(screen.getByDisplayValue('Mi borrador')).toBeTruthy())
  history.forward()
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Mi biblioteca', level: 1 })).toBeTruthy())
})
