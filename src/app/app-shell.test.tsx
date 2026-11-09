// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { db } from '../db'
import { updateSW } from '../pwa'

vi.mock('../pwa', () => ({ updateSW: vi.fn() }))

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('edutictac-language', 'es')
  history.replaceState(null, '', location.pathname)
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(async () => {
  cleanup()
  await Promise.all([db.prompts.clear(), db.categories.clear()])
  vi.restoreAllMocks()
  history.replaceState(null, '', location.pathname)
})

describe('estructura de la aplicación', () => {
  it('navega entre las vistas principales', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: /Crea mejores prompts/ })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
    expect(screen.getByRole('heading', { name: 'Mi biblioteca', level: 1 })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Ayuda' }))
    expect(await screen.findByRole('heading', { name: 'Guía de uso', level: 1 })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Privacidad' }))
    expect(screen.getByRole('heading', { name: 'Privacidad y uso responsable', level: 1 })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Inicio' }))
    expect(screen.getByRole('heading', { name: /Crea mejores prompts/ })).toBeTruthy()
  })

  it('abre la ayuda directamente desde #help', async () => {
    history.replaceState(null, '', '#help')
    render(<App />)
    expect(await screen.findByRole('heading', { name: 'Guía de uso', level: 1 })).toBeTruthy()
  })

  it('usa la cabecera propia si el chip no está disponible y cambia idioma y tema', async () => {
    const user = userEvent.setup()
    render(<App />)

    const language = screen.getByRole('combobox', { name: 'Idioma' })
    await user.selectOptions(language, 'ca-valencia')
    expect(screen.getByRole('button', { name: 'Inici' })).toBeTruthy()
    expect(localStorage.getItem('edutictac-language')).toBe('ca-valencia')

    const toggle = screen.getByRole('button', { name: /Tema:/ })
    const before = document.documentElement.dataset.theme
    await user.click(toggle)
    await waitFor(() => expect(document.documentElement.dataset.theme).not.toBe(before))
    expect(localStorage.getItem('edutictac-theme')).toBe(document.documentElement.dataset.theme)
  })

  it('muestra el aviso de actualización y aplica la nueva versión', async () => {
    const user = userEvent.setup()
    render(<App />)

    act(() => window.dispatchEvent(new Event('pwa-update-available')))
    await user.click(await screen.findByRole('button', { name: 'Actualizar la aplicación' }))
    expect(vi.mocked(updateSW)).toHaveBeenCalledWith(true)
  })
})
