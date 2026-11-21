// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useState } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SaveModal } from './SaveModal'
import { translations } from '../locales'

afterEach(cleanup)
const t = translations.es

function Harness({ onSave = vi.fn() }: { onSave?: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir guardar</button>
      {open && <SaveModal t={t} categories={[]} onCancel={() => setOpen(false)} onSave={onSave} />}
    </>
  )
}

describe('diálogo de guardar', () => {
  it('se anuncia como diálogo modal con nombre y enfoca el título', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Abrir guardar' }))
    const dialog = screen.getByRole('dialog', { name: t.save })
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: t.title }))
    expect(screen.getByRole('button', { name: t.close })).toBeTruthy()
  })

  it('Escape cierra y devuelve el foco al botón que lo abrió', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Abrir guardar' })
    await user.click(opener)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(opener)
  })

  it('Tab no sale del diálogo', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Abrir guardar' }))
    const dialog = screen.getByRole('dialog')
    for (let i = 0; i < 12; i++) {
      await user.tab()
      expect(dialog.contains(document.activeElement)).toBe(true)
    }
    await user.tab({ shift: true })
    expect(dialog.contains(document.activeElement)).toBe(true)
  })

  it('el botón × cierra el diálogo', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'Abrir guardar' }))
    await user.click(screen.getByRole('button', { name: t.close }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
