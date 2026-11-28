// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Library } from './Library'
import { translations } from '../locales'
import { makeCategory, makePrompt } from '../test/fixtures'

const category = makeCategory({ id: 'science', name: 'Ciencias' })
const first = makePrompt({
  id: 'one',
  title: 'Árboles',
  categoryId: 'science',
  tags: ['naturaleza'],
  favorite: true,
  updatedAt: '2026-01-01',
  syncStatus: 'synced',
  remoteId: 'one',
})
const second = makePrompt({
  id: 'two',
  title: 'Agua',
  tags: ['experimento'],
  favorite: false,
  updatedAt: '2026-02-01',
  syncStatus: 'modified',
  remoteId: 'two',
})
const renderLibrary = (user: { sub: string } | null = null) => {
  const updateMetadata = vi.fn(async () => {})
  render(
    <Library
      t={translations.es}
      saved={[first, second]}
      categories={[category]}
      updateMetadata={updateMetadata}
      templateName={(id) => id}
      search=""
      setSearch={vi.fn()}
      remove={vi.fn()}
      duplicate={vi.fn()}
      exportAll={vi.fn()}
      importFile={vi.fn()}
      openSavedPrompt={vi.fn()}
      copyPrompt={async () => true}
      user={user}
      syncBusy={false}
      onSync={vi.fn()}
      onLogin={vi.fn()}
      central={false}
    />,
  )
  return updateMetadata
}
afterEach(cleanup)

describe('filtros y datos de biblioteca', () => {
  it('filtra favoritos, categoría y etiqueta sin confundir resultados vacíos con biblioteca vacía', async () => {
    const user = userEvent.setup()
    renderLibrary()
    await user.click(screen.getByRole('checkbox', { name: 'Solo favoritos' }))
    expect(screen.getByRole('heading', { name: 'Árboles' })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'Agua' })).toBeNull()
    await user.selectOptions(screen.getByLabelText('Etiqueta'), 'experimento')
    expect(screen.getByText('No hay prompts que coincidan con estos filtros.')).toBeTruthy()
    await user.click(screen.getByRole('checkbox', { name: 'Solo favoritos' }))
    expect(screen.getByRole('heading', { name: 'Agua' })).toBeTruthy()
  })
  it('permite cambiar favorito y editar metadatos conservando el prompt', async () => {
    const user = userEvent.setup()
    const update = renderLibrary()
    await user.click(screen.getByRole('button', { name: 'Añadir a favoritos: Agua' }))
    expect(update).toHaveBeenCalledWith(second, expect.objectContaining({ favorite: true }))
    const card = screen.getByRole('heading', { name: 'Árboles' }).closest('article')!
    await user.click(within(card).getByRole('button', { name: 'Editar datos' }))
    const dialog = screen.getByRole('dialog', { name: 'Editar datos' })
    await user.clear(within(dialog).getByRole('textbox', { name: 'Título' }))
    await user.type(within(dialog).getByRole('textbox', { name: 'Título' }), 'Bosque')
    await user.click(within(dialog).getByRole('button', { name: 'Guardar cambios' }))
    expect(update).toHaveBeenCalledWith(
      first,
      expect.objectContaining({ title: 'Bosque', categoryId: 'science', tags: ['naturaleza'], favorite: true }),
    )
  })
  it('distingue los elementos sincronizados de los pendientes', () => {
    renderLibrary({ sub: 'user-a' })
    expect(screen.getByText(/Sincronizado con tu cuenta/)).toBeTruthy()
    expect(screen.getByText('Pendiente de sincronizar')).toBeTruthy()
  })
})
