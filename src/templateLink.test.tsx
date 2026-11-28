// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App, { templateIdFromHash } from './App'
import { db } from './db'
import { generatePrompt } from './generator'
import { templates } from './templates'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('edutictac-language', 'es')
  history.replaceState(null, '', '/')
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(async () => {
  cleanup()
  await db.prompts.clear()
  await db.categories.clear()
  vi.restoreAllMocks()
})

describe('enlace directo a una plantilla', () => {
  it('reconoce solo ids de plantilla existentes', () => {
    expect(templateIdFromHash('#template/coding-activity')).toBe('coding-activity')
    expect(templateIdFromHash('#template/no-existe')).toBeUndefined()
    expect(templateIdFromHash('#template/%E0%A4%A')).toBeUndefined()
    expect(templateIdFromHash('#help')).toBeUndefined()
  })

  it('abre el formulario de la plantilla al cargar la página en frío', async () => {
    history.replaceState(null, '', '#template/coding-activity')
    render(<App />)
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Ficha de actividad de robótica y programación' }),
    ).toBeTruthy()
    expect(location.hash).toBe('#template/coding-activity')
  })

  it('cae en la portada si el id no existe', () => {
    history.replaceState(null, '', '#template/no-existe')
    render(<App />)
    expect(screen.getByRole('button', { name: /^Crear/ })).toBeTruthy()
  })

  it('refleja el hash al elegir una plantilla y lo quita al volver', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /^Crear/ }))
    expect(location.hash).toBe('#template/prompt-coach')
    expect(await screen.findByRole('heading', { name: 'Ayúdame a crear mi prompt', level: 1 })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Inicio' }))
    expect(location.hash).toBe('')
  })

  it('sigue el cambio de hash con la página abierta', async () => {
    render(<App />)
    history.replaceState(null, '', '#template/coding-activity')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Ficha de actividad de robótica y programación' }),
    ).toBeTruthy()
  })
})

describe('modos del formulario', () => {
  it('empieza siempre en Paso a paso aunque hubiera Avanzado o Sencillo guardado', async () => {
    localStorage.setItem('edutictac-form-mode', 'advanced')
    window.location.hash = '#template/coding-activity'
    render(<App />)
    const guided = await screen.findByRole('button', { name: 'Paso a paso' })
    expect(guided.className).toContain('active')
  })

  it('solo ofrece Paso a paso y Avanzado', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /^Crear/ }))
    expect(screen.queryByRole('button', { name: 'Sencillo' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Paso a paso' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Avanzado' })).toBeTruthy()
  })
})

describe('ficha de programación en etapas superiores', () => {
  it('no asume solo Infantil y Primaria', () => {
    const template = templates.find((item) => item.id === 'coding-activity')!
    const prompt = generatePrompt(
      template,
      { level: 'ESO', topic: 'un cuestionario', codingTool: 'EduTicTac Blocs' },
      'es',
    )
    expect(prompt).toContain('ESO, Bachillerato y FP')
    expect(prompt).toContain('de Infantil a Formación Profesional')
  })

  it('el enlace «Elige una herramienta» vuelve a la portada y quita el hash', async () => {
    window.location.hash = '#template/coding-activity'
    render(<App />)
    const user = userEvent.setup()
    await user.click(await screen.findByRole('button', { name: /Elige una herramienta/ }))
    expect(await screen.findByRole('heading', { level: 2, name: /Elige una herramienta/ })).toBeTruthy()
    expect(window.location.hash).toBe('')
  })
})
