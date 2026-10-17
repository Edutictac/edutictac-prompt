// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AgentBuilder from './AgentBuilder'
import { builtinSkills } from './seeds'
afterEach(cleanup)
it('prepares per-field configuration, copies once and invalidates it after a course change', async () => {
  const user = userEvent.setup(),
    copy = vi.fn().mockResolvedValue(true)
  render(
    <AgentBuilder language="es" skills={builtinSkills('es')} copy={copy} />,
  )
  await user.type(
    screen.getByRole('textbox', { name: /Curso o contexto/ }),
    'Curso de evaluación',
  )
  await user.click(
    screen.getByRole('button', { name: 'Preparar configuración' }),
  )
  const instructions = screen.getByRole('textbox', {
    name: 'Instrucciones del agente',
  })
  expect((instructions as HTMLTextAreaElement).value).toContain(
    'Curso de evaluación',
  )
  await user.click(
    screen.getByRole('button', {
      name: 'Copiar este campo: Instrucciones del agente',
    }),
  )
  expect(copy).toHaveBeenCalledWith((instructions as HTMLTextAreaElement).value)
  expect(screen.getByText('Copiado.')).toBeTruthy()
  await user.type(
    screen.getByRole('textbox', { name: /Curso o contexto/ }),
    ' nuevo',
  )
  expect(
    screen.queryByRole('textbox', { name: 'Instrucciones del agente' }),
  ).toBeNull()
})
it('offers course and specialized agents without allowing unreviewed or external skills', async () => {
  const skills = builtinSkills('es'),
    user = userEvent.setup()
  render(
    <AgentBuilder
      language="es"
      skills={[
        ...skills,
        { ...skills[0], id: 'imported', name: 'Importada', reviewed: false },
      ]}
      copy={async () => true}
    />,
  )
  const basis = screen.getByRole('combobox', {
    name: 'Comportamiento reutilizable',
  })
  expect(
    (
      within(basis).getByRole('option', {
        name: /Importada/,
      }) as HTMLOptionElement
    ).disabled,
  ).toBe(true)
  await user.selectOptions(basis, skills[0].id)
  await user.type(
    screen.getByRole('textbox', { name: /Curso o contexto/ }),
    'Curso de rúbricas',
  )
  await user.click(
    screen.getByRole('button', { name: 'Preparar configuración' }),
  )
  expect(
    (
      screen.getByRole('textbox', {
        name: 'Instrucciones del agente',
      }) as HTMLTextAreaElement
    ).value,
  ).toContain(skills[0].instructions)
})
