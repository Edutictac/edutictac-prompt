// @vitest-environment jsdom
import { useState } from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
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
      onAgents={vi.fn()}
      onCreate={vi.fn()}
      templateName={(id) => getTemplateName(id, t)}
      categoryLabel={(id) => t[id] || id}
    />
  )
}

afterEach(cleanup)

describe('buscador visible del catálogo', () => {
  it('muestra un buscador grande y oculta las novedades al buscar', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole('searchbox', { name: 'Buscar herramienta...' })
    expect(input.getAttribute('placeholder')).toBe('Busca por nombre, categoría o necesidad')
    expect(screen.getByText('Lo último en EduTicTac Prompt')).toBeTruthy()
    await user.type(input, 'examen')
    expect(screen.queryByText('Lo último en EduTicTac Prompt')).toBeNull()
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
    expect(screen.getByText('Lo último en EduTicTac Prompt')).toBeTruthy()
  })
})

describe('herramientas recientes en la portada', () => {
  it('las muestra y abre la herramienta al pulsarla', async () => {
    const user = userEvent.setup()
    const onChoose = vi.fn()
    const t = translations.es
    render(
      <HomeView
        t={t}
        lang="es"
        search=""
        setSearch={vi.fn()}
        category="all"
        setCategory={vi.fn()}
        onChoose={onChoose}
        recentTools={['worksheet']}
        onAgents={vi.fn()}
        onCreate={vi.fn()}
        templateName={(id) => getTemplateName(id, t)}
        categoryLabel={(id) => t[id] || id}
      />,
    )
    expect(screen.getByRole('heading', { name: 'Tus herramientas recientes' })).toBeTruthy()
    const recent = screen.getByRole('heading', { name: 'Tus herramientas recientes' }).closest('section')!
    await user.click(within(recent).getByRole('button', { name: /Ficha de trabajo imprimible/ }))
    expect(onChoose).toHaveBeenCalledWith('worksheet')
  })

  it('no muestra la sección si no hay recientes', () => {
    render(<Harness />)
    expect(screen.queryByText('Tus herramientas recientes')).toBeNull()
  })
})

it('la novedad de agentes abre la sección de agentes', async () => {
  const onAgents = vi.fn()
  const t = translations.es
  render(
    <HomeView
      t={t}
      lang="es"
      search=""
      setSearch={vi.fn()}
      category="all"
      setCategory={vi.fn()}
      onChoose={vi.fn()}
      onCreate={vi.fn()}
      onAgents={onAgents}
      templateName={(id) => getTemplateName(id, t)}
      categoryLabel={(id) => t[id] || id}
    />,
  )
  await userEvent.click(screen.getByRole('button', { name: /Elige un ejemplo de agente/ }))
  expect(onAgents).toHaveBeenCalledOnce()
})
