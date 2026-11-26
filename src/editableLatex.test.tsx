// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

afterEach(() => {
  cleanup()
  history.replaceState(null, '', '/')
  localStorage.clear()
  vi.restoreAllMocks()
})

it('abre LaTeX por enlace, carga un ejemplo y pide fórmulas renderizadas para el destino elegido', async () => {
  localStorage.setItem('edutictac-language', 'es')
  history.replaceState(null, '', '/#template/editable-latex')
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
  const user = userEvent.setup()
  render(<App />)
  await user.click(await screen.findByRole('button', { name: /Cargar un ejemplo/ }))
  await user.click(screen.getByRole('button', { name: 'Avanzado' }))
  const destination = screen.getByRole('textbox', { name: 'Editor de destino' })
  await user.clear(destination)
  await user.type(destination, 'Word 365')
  await user.click(screen.getByRole('button', { name: 'Generar prompt' }))
  await waitFor(() => {
    const prompt = (screen.getByRole('textbox', { name: 'Vista previa del prompt' }) as HTMLTextAreaElement).value
    expect(prompt).toContain('Editor de destino: Word 365')
    expect(prompt).toContain('x^2 - 5x + 6 = 0')
    expect(prompt).toContain('No devuelvas código fuente LaTeX, bloques de código')
    expect(prompt).toContain('pasos intermedios')
    expect(prompt).toContain('ecuaciones nativas editables (OMML)')
    expect(prompt).toContain('documento de Word (.docx) descargable')
  })
})
