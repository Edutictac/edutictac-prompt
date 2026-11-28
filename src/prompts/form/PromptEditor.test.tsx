// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { translations } from '../../locales'
import { PromptEditor } from './PromptEditor'

function Harness({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial)
  return (
    <>
      <PromptEditor value={value} onChange={setValue} t={translations.es} />
      <output data-testid="saved">{value}</output>
    </>
  )
}
afterEach(cleanup)

describe('prompt visual editor', () => {
  it('edits a visual paragraph and list without changing other source text', async () => {
    const user = userEvent.setup()
    const initial = '## Rol\nDocente.\n\n- Uno\n- Dos\n'
    render(<Harness initial={initial} />)
    const paragraph = screen.getByRole('textbox', { name: /Párrafo/ })
    await user.clear(paragraph)
    await user.type(paragraph, 'Docente de ciencias.')
    expect(screen.getByTestId('saved').textContent).toBe('## Rol\nDocente de ciencias.\n\n- Uno\n- Dos\n')
    await user.click(screen.getByRole('button', { name: 'Texto original' }))
    expect((screen.getByRole('textbox', { name: 'Vista previa del prompt' }) as HTMLTextAreaElement).value).toContain(
      'Docente de ciencias.',
    )
    await user.click(screen.getByRole('button', { name: 'Editor visual' }))
    expect(screen.getAllByRole('textbox', { name: /Elemento de lista/ })).toHaveLength(2)
  })
  it('adds and removes bullet items while preserving the other lines', async () => {
    const user = userEvent.setup()
    render(<Harness initial={'## Lista\n- Uno\n- Dos'} />)
    await user.click(screen.getByRole('button', { name: 'Añadir elemento después del elemento 2' }))
    const items = screen.getAllByRole('textbox', { name: /Elemento de lista/ })
    await user.type(items[1], 'Nuevo')
    expect(screen.getByTestId('saved').textContent).toBe('## Lista\n- Uno\n- Nuevo\n- Dos')
    await user.click(screen.getByRole('button', { name: 'Eliminar elemento 3' }))
    expect(screen.getByTestId('saved').textContent).toBe('## Lista\n- Uno\n- Dos')
  })
  it('shows original text without conversion when content contains a code block', () => {
    const initial = '## CSV\n```csv\ncriterion,level\n```'
    render(<Harness initial={initial} />)
    expect((screen.getByRole('textbox', { name: 'Vista previa del prompt' }) as HTMLTextAreaElement).value).toBe(
      initial,
    )
    expect((screen.getByRole('button', { name: 'Editor visual' }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByText(/Este prompt incluye formato especial/)).toBeTruthy()
  })
})
