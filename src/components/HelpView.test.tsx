// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HelpView } from './HelpView'
import { practicalHelp } from '../helpPractical'
import { templates } from '../templates'
import { translations } from '../locales'
import type { Language } from '../types'

afterEach(cleanup)

describe('ayuda práctica docente', () => {
  it('abre la herramienta elegida desde una necesidad docente', async () => {
    const onChoose = vi.fn()
    render(<HelpView language="es" t={translations.es} onChoose={onChoose} />)
    await userEvent.click(screen.getByRole('button', { name: /Adaptar una actividad/ }))
    expect(onChoose).toHaveBeenCalledWith('three-levels')
    expect(screen.getByRole('heading', { name: 'Edita el prompt y ajusta tus preferencias' })).toBeTruthy()
  })

  it.each<Language>(['es', 'ca-valencia', 'ca', 'en'])('enlaza a herramientas reales en %s', (language) => {
    for (const action of practicalHelp[language].actions) {
      expect(action.label.trim()).not.toBe('')
      expect(action.description.trim()).not.toBe('')
      expect(templates.some((template) => template.id === action.templateId)).toBe(true)
    }
  })
})
