// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { db } from './db'
import { templates } from './templates'
import { guidedSteps } from './guided'

beforeEach(() => {
  history.replaceState(null, '', '/')
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

it('muestra los elementos curriculares en el modo por defecto al elegir un perfil', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: 'Configuración' }))
  await user.selectOptions(
    await screen.findByRole('combobox', { name: 'Perfil curricular predeterminado' }),
    'cv-primaria-coneixement-del-medi-natural-social-i-cultural',
  )
  await user.click(screen.getByRole('button', { name: 'Inicio' }))
  await user.click(screen.getByRole('button', { name: /Situación de aprendizaje/ }))
  expect((await screen.findAllByRole('checkbox')).length).toBeGreaterThan(0)
})

it('recorre el formulario bloque a bloque, deja saltar pasos y genera desde el resumen', async () => {
  const user = userEvent.setup()
  const total = guidedSteps(templates.find((template) => template.id === 'learning-situation')!).length
  render(<App />)

  await user.click(screen.getByRole('button', { name: 'Configuración' }))
  await user.selectOptions(
    await screen.findByRole('combobox', { name: 'Perfil curricular predeterminado' }),
    'cv-primaria-coneixement-del-medi-natural-social-i-cultural',
  )
  await user.click(screen.getByRole('button', { name: 'Inicio' }))
  await user.click(screen.getByRole('button', { name: /Situación de aprendizaje/ }))
  await user.click(await screen.findByRole('button', { name: 'Paso a paso' }))

  expect(screen.getByText(`Paso 1 de ${total}`)).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'Nivel y materia', level: 2 })).toBeTruthy()
  const saberes = screen.getByRole('checkbox', { name: /Cultura científica · Iniciación a la actividad científica/ })
  await user.click(saberes)
  expect((saberes as HTMLInputElement).checked).toBe(true)
  await user.selectOptions(screen.getByRole('combobox', { name: 'Nivel educativo' }), 'Primaria')

  await user.click(screen.getByRole('button', { name: 'Avanzado' }))
  const advancedSaberes = screen.getByRole('checkbox', {
    name: /Cultura científica · Iniciación a la actividad científica/,
  })
  expect((advancedSaberes as HTMLInputElement).checked).toBe(true)
  await user.click(screen.getByRole('button', { name: 'Paso a paso' }))
  const guidedSaberes = screen.getByRole('checkbox', {
    name: /Cultura científica · Iniciación a la actividad científica/,
  })
  expect((guidedSaberes as HTMLInputElement).checked).toBe(true)

  for (let step = 1; step < total; step += 1) {
    expect(screen.getByText(`Paso ${step} de ${total}`)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Saltar' }))
  }

  await user.click(screen.getByRole('button', { name: 'Ver resumen' }))
  expect(screen.getByRole('heading', { name: 'Resumen del prompt', level: 2 })).toBeTruthy()
  expect(screen.getByText('Primaria')).toBeTruthy()

  await user.click(screen.getByRole('button', { name: 'Texto original' }))
  await user.click(screen.getByRole('button', { name: 'Generar prompt' }))
  const preview = screen.getByRole('textbox', { name: 'Vista previa del prompt' }) as HTMLTextAreaElement
  expect(preview.value).toContain('Primaria')
  expect(preview.value).toContain('Cultura científica · Iniciación a la actividad científica')
})

it('comparte la herramienta con los datos rellenados y el enlace la reabre igual', async () => {
  const user = userEvent.setup()
  let copied = ''
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn(async (text: string) => void (copied = text)) },
  })
  Object.defineProperty(window, 'isSecureContext', { configurable: true, value: true })
  history.replaceState(null, '', '/#template/worksheet')
  render(<App />)
  await user.click(await screen.findByRole('button', { name: /Compartir con estos datos/ }))
  expect(screen.getByRole('status').textContent).toContain('Rellena al menos un campo')
  await user.click(screen.getByRole('button', { name: /Cargar un ejemplo/ }))
  await user.click(screen.getByRole('button', { name: /Compartir con estos datos/ }))
  expect(copied).toContain('#template/worksheet?d=')
  cleanup()

  history.replaceState(null, '', copied.slice(copied.indexOf('/#') + 1))
  render(<App />)
  await user.click(await screen.findByRole('button', { name: 'Avanzado' }))
  expect(await screen.findByDisplayValue('El Palmeral de Elche')).toBeTruthy()
  expect(location.hash).toBe('#template/worksheet')
})

it('ofrece «Generar ya» al rellenar nivel y tema, y genera sin recorrer el resto de pasos', async () => {
  const user = userEvent.setup()
  history.replaceState(null, '', '/#template/worksheet')
  render(<App />)
  await user.selectOptions(await screen.findByRole('combobox', { name: 'Nivel educativo' }), 'ESO')
  expect(screen.queryByRole('button', { name: /Generar ya/ })).toBeNull()
  await user.click(screen.getByRole('button', { name: 'Siguiente' }))
  await user.type(screen.getByRole('textbox', { name: /Tema/ }), 'El ciclo del agua')
  await user.click(screen.getByRole('button', { name: 'Texto original' }))
  await user.click(screen.getByRole('button', { name: /Generar ya/ }))
  await waitFor(() =>
    expect((screen.getByRole('textbox', { name: /prompt/i }) as HTMLTextAreaElement).value).toContain(
      'El ciclo del agua',
    ),
  )
})

it('muestra el QR de la herramienta con los datos rellenados', async () => {
  const user = userEvent.setup()
  history.replaceState(null, '', '/#template/worksheet')
  render(<App />)
  await user.click(await screen.findByRole('button', { name: /Cargar un ejemplo/ }))
  await user.click(screen.getByRole('button', { name: /Mostrar QR/ }))
  expect(screen.getByRole('dialog', { name: 'Ficha de trabajo imprimible' })).toBeTruthy()
  expect(screen.getByRole('img', { name: /Código QR/ })).toBeTruthy()
  await user.click(screen.getByRole('button', { name: 'Cerrar' }))
  expect(screen.queryByRole('dialog')).toBeNull()
})
