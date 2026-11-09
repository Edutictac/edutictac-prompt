// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { db } from './db'
import { templates } from './templates'
import { guidedSteps } from './guided'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('edutictac-language', 'es')
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(async () => {
  cleanup()
  await db.prompts.clear()
  await db.categories.clear()
  vi.restoreAllMocks()
})

it('muestra los elementos curriculares también en modo sencillo al elegir un perfil', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^Crear/ }))
  await user.selectOptions(
    screen.getByRole('combobox', { name: /Perfil curricular/ }),
    'cv-primaria-coneixement-del-medi-natural-social-i-cultural',
  )
  expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0)
})

it('recorre el formulario bloque a bloque, deja saltar pasos y genera desde el resumen', async () => {
  const user = userEvent.setup()
  const total = guidedSteps(templates.find((template) => template.id === 'learning-situation')!).length
  render(<App />)

  await user.click(screen.getByRole('button', { name: /^Crear/ }))
  await user.click(screen.getByRole('button', { name: 'Paso a paso' }))

  expect(screen.getByText(`Paso 1 de ${total}`)).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'Nivel y materia', level: 2 })).toBeTruthy()
  await user.selectOptions(
    screen.getByRole('combobox', { name: /Perfil curricular/ }),
    'cv-primaria-coneixement-del-medi-natural-social-i-cultural',
  )
  const saberes = screen.getByRole('checkbox', { name: /Cultura científica · Iniciación a la actividad científica/ })
  await user.click(saberes)
  expect((saberes as HTMLInputElement).checked).toBe(true)
  await user.selectOptions(screen.getByRole('combobox', { name: 'Nivel educativo' }), 'Primaria')

  for (let step = 1; step < total; step += 1) {
    expect(screen.getByText(`Paso ${step} de ${total}`)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Saltar' }))
  }

  await user.click(screen.getByRole('button', { name: 'Ver resumen' }))
  expect(screen.getByRole('heading', { name: 'Resumen del prompt', level: 2 })).toBeTruthy()
  expect(screen.getByText('Primaria')).toBeTruthy()

  await user.click(screen.getByRole('button', { name: 'Generar prompt' }))
  const preview = screen.getByRole('textbox', { name: 'Vista previa del prompt' }) as HTMLTextAreaElement
  expect(preview.value).toContain('Primaria')
  expect(preview.value).toContain('Cultura científica · Iniciación a la actividad científica')
})
