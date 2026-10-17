// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AgentsView from './AgentsView'
import { basicLocales } from './basicLocales'
import { languages } from '../skills/types'
import { buildAgentConfiguration } from '../skills/agents'
import { agentPresets } from './presets'
import { db } from '../db'

afterEach(async () => {
  cleanup()
  await db.agents.clear()
  await db.agentRevisions.clear()
  vi.restoreAllMocks()
})
const show = (
  language: (typeof languages)[number] = 'es',
  copy = vi.fn(async (_text: string) => true),
) => {
  render(
    <AgentsView
      language={language}
      prompts={[]}
      copy={copy}
      onSaveResult={async () => {}}
    />,
  )
  return copy
}

it('starts basic, prepares and copies an actual configuration, and saves/reopens its rubric policy', async () => {
  const user = userEvent.setup(),
    copy = show()
  expect(
    screen
      .getByRole('button', { name: 'Básico · Copilot M365' })
      .getAttribute('aria-pressed'),
  ).toBe('true')
  expect(screen.queryByRole('button', { name: 'Compatibilidad' })).toBeNull()
  expect(screen.queryByText('Nombre del modo')).toBeNull()
  await user.selectOptions(
    screen.getByRole('combobox', { name: /Cómo trabajará/ }),
    'draft',
  )
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Nivel educativo' }),
    'primary',
  )
  await user.type(
    screen.getByRole('combobox', { name: 'Materia, ámbito o especialidad' }),
    'Ciencias',
  )
  await user.click(screen.getByRole('button', { name: 'Preparar mi agente' }))
  expect(
    screen.getByRole('heading', { name: 'Tu agente está preparado' }),
  ).toBeTruthy()
  expect(screen.getByText(/No crea ni publica el agente/)).toBeTruthy()
  await user.click(screen.getByText('Llevar a Copilot M365'))
  await user.click(
    screen.getByRole('button', {
      name: 'Copiar este campo: Instrucciones del agente',
    }),
  )
  expect(copy).toHaveBeenCalledWith(
    expect.stringContaining(basicLocales.es.draftRule),
  )
  expect(copy).toHaveBeenCalledWith(expect.stringContaining('Ciencias'))
  await user.click(
    screen.getByRole('button', { name: 'Guardar en Mis agentes' }),
  )
  await waitFor(async () => expect(await db.agents.count()).toBe(1))
  await user.click(
    await screen.findByRole('button', { name: 'Editar y adaptar' }),
  )
  expect(
    (
      screen.getByRole('combobox', {
        name: /Cómo trabajará/,
      }) as HTMLSelectElement
    ).value,
  ).toBe('draft')
})

it('preserves custom advanced behaviour, examples and audience across mode changes and basic edits', async () => {
  const user = userEvent.setup()
  show()
  await user.click(screen.getByRole('button', { name: 'Avanzado' }))
  const criteria = screen.getByRole('textbox', {
    name: /Criterios que aplicará/,
  })
  await user.clear(criteria)
  await user.type(criteria, 'Comprobar evidencias del proyecto.')
  const audience = screen.getByRole('textbox', {
    name: /Personas destinatarias/,
  })
  await user.clear(audience)
  await user.type(audience, 'Equipo de orientación')
  await user.click(
    screen.getByRole('button', { name: 'Básico · Copilot M365' }),
  )
  expect(
    (
      screen.getByRole('combobox', {
        name: '¿Para quién es?',
      }) as HTMLSelectElement
    ).value,
  ).toBe('Equipo de orientación')
  await user.type(
    screen.getByRole('combobox', { name: 'Materia, ámbito o especialidad' }),
    'Música',
  )
  await user.click(screen.getByRole('button', { name: 'Avanzado' }))
  expect(
    (
      screen.getByRole('textbox', {
        name: /Criterios que aplicará/,
      }) as HTMLTextAreaElement
    ).value,
  ).toBe('Comprobar evidencias del proyecto.')
  expect(
    (
      screen.getByRole('combobox', {
        name: /Materia, ámbito/,
      }) as HTMLInputElement
    ).value,
  ).toBe('Música')
  expect(
    screen.getAllByRole('textbox', { name: 'Nombre del modo' }),
  ).toHaveLength(2)
})

it('confirms replacing a changed draft and honours cancellation', async () => {
  const user = userEvent.setup()
  show()
  await user.type(
    screen.getByRole('combobox', { name: 'Materia, ámbito o especialidad' }),
    'Mi materia',
  )
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
  await user.click(screen.getByRole('button', { name: 'Tutor de una materia' }))
  expect(confirm).toHaveBeenCalledOnce()
  expect(
    (
      screen.getByRole('combobox', {
        name: 'Materia, ámbito o especialidad',
      }) as HTMLInputElement
    ).value,
  ).toBe('Mi materia')
  confirm.mockReturnValue(true)
  await user.click(screen.getByRole('button', { name: 'Tutor de una materia' }))
  expect(
    (
      screen.getByRole('combobox', {
        name: 'Materia, ámbito o especialidad',
      }) as HTMLInputElement
    ).value,
  ).toBe('Matemáticas')
})

it.each(languages)(
  'supports a valid basic rubric and both policies in %s',
  (language) => {
    const preset = agentPresets(language).find(
      (p) => p.id === 'crear-rubricas',
    )!
    expect(buildAgentConfiguration(preset.draft).instructions).toContain(
      basicLocales[language].curricularRule,
    )
    expect(
      buildAgentConfiguration({ ...preset.draft, rubricApproach: 'draft' })
        .instructions,
    ).toContain(basicLocales[language].draftRule)
    expect(Object.keys(basicLocales[language]).sort()).toEqual(
      Object.keys(basicLocales.es).sort(),
    )
    show(language)
    expect(
      screen.getByRole('button', { name: basicLocales[language].basic }),
    ).toBeTruthy()
  },
)

it('rejects an invalid imported rubric policy', () => {
  const preset = agentPresets('es')[1].draft
  expect(() =>
    buildAgentConfiguration({
      ...preset,
      rubricApproach: 'untrusted' as 'draft',
    }),
  ).toThrow('invalid')
})
