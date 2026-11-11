// @vitest-environment jsdom
import { useState } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HomeView } from './HomeView'
import { translations } from '../locales'
import { getTemplateName } from '../prompts/form/labels'

function Harness() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const t = translations.es
  return (
    <HomeView
      t={t}
      lang="es"
      search={search}
      setSearch={setSearch}
      category={category}
      setCategory={setCategory}
      onChoose={vi.fn()}
      onStart={vi.fn()}
      onCreate={vi.fn()}
      templateName={(id) => getTemplateName(id, t)}
      categoryLabel={(id) => t[id] || id}
    />
  )
}

afterEach(cleanup)

describe('buscador visible del catálogo', () => {
  it('muestra un buscador grande y oculta los casos al buscar', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole('searchbox', { name: 'Buscar herramienta...' })
    expect(input.getAttribute('placeholder')).toBe('Busca por nombre, categoría o necesidad')
    expect(screen.getByText('Casos reales listos para usar')).toBeTruthy()
    await user.type(input, 'examen')
    expect(screen.queryByText('Casos reales listos para usar')).toBeNull()
    expect(screen.getByText('Prueba escrita')).toBeTruthy()
    expect(screen.queryByText('Proyecto ABP')).toBeNull()
  })

  it('muestra el recuento y permite limpiar', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole('searchbox', { name: 'Buscar herramienta...' })
    await user.type(input, 'zzzz')
    expect(screen.getByRole('status').textContent).toContain('No hay herramientas que coincidan')
    await user.click(screen.getByRole('button', { name: 'Limpiar' }))
    expect((input as HTMLInputElement).value).toBe('')
    expect(screen.getByText('Casos reales listos para usar')).toBeTruthy()
  })
})
