// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SkillsView from './SkillsView'
import { db } from '../db'
import { exportPackage } from './packages'
import { builtinSkills } from './seeds'
vi.mock('./client', () => ({
  getCapabilities: async () => ({ providers: [] }),
  inferSkill: vi.fn(),
  proposeSkill: vi.fn(),
  remoteSkills: vi.fn(),
  putSkill: vi.fn(),
}))
afterEach(async () => {
  cleanup()
  await db.skills.clear()
  await db.skillRevisions.clear()
  vi.restoreAllMocks()
})
const mount = () =>
  render(
    <SkillsView
      language="es"
      prompts={[]}
      copy={async () => true}
      onSaveResult={vi.fn().mockResolvedValue(undefined)}
    />,
  )
describe('Skills teacher workflows', () => {
  it('creates, edits, duplicates and deletes a skill through forms', async () => {
    const user = userEvent.setup()
    mount()
    await user.click(screen.getByRole('button', { name: 'Crear' }))
    await user.type(
      screen.getByLabelText('Nombre', { exact: true }),
      'Mi actividad',
    )
    await user.type(
      screen.getByLabelText('Descripción', { exact: true }),
      'Una capacidad docente',
    )
    await user.type(
      screen.getByLabelText('Instrucciones', { exact: true }),
      'Propón actividades prácticas con los datos aportados.',
    )
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    await screen.findByText('Skill guardada.')
    expect(await db.skills.count()).toBe(1)
    await user.click(screen.getByRole('button', { name: 'Ver y utilizar' }))
    await user.click(screen.getByRole('button', { name: 'Editar' }))
    await user.clear(screen.getByLabelText('Nombre', { exact: true }))
    await user.type(
      screen.getByLabelText('Nombre', { exact: true }),
      'Actividad revisada',
    )
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    await screen.findByRole('heading', { name: 'Actividad revisada' })
    await user.click(screen.getByRole('button', { name: 'Ver y utilizar' }))
    await user.click(screen.getByRole('button', { name: 'Duplicar' }))
    await waitFor(async () => expect(await db.skills.count()).toBe(2))
    await user.click(
      (await screen.findAllByRole('button', { name: 'Ver y utilizar' }))[0],
    )
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    await waitFor(async () => expect(await db.skills.count()).toBe(1))
  })
  it('prepares a builtin in a separate response language and requires consent for Copilot', async () => {
    const user = userEvent.setup()
    mount()
    await user.click(screen.getByRole('button', { name: 'Explorar' }))
    const card = (
      await screen.findByRole('heading', { name: 'Crear rúbricas' })
    ).closest('article')!
    await user.click(
      within(card).getByRole('button', { name: 'Ver y utilizar' }),
    )
    await user.type(
      screen.getByLabelText(/Contexto y tarea/),
      'Evaluar una exposición oral',
    )
    await user.selectOptions(
      screen.getByLabelText('Idioma de respuesta'),
      'ca-valencia',
    )
    await user.click(
      screen.getAllByRole('button', { name: 'Preparar petición' }).at(-1)!,
    )
    expect(
      (screen.getByLabelText('Petición preparada') as HTMLTextAreaElement)
        .value,
    ).toContain('## Response language\nca-valencia')
    const open = screen.getByRole('button', {
      name: /Copiar y abrir en Copilot M365/,
    })
    expect((open as HTMLButtonElement).disabled).toBe(true)
    await user.click(screen.getByLabelText(/autorizo enviarla/))
    expect((open as HTMLButtonElement).disabled).toBe(false)
    expect(
      screen.getByText(/No hay un proveedor de inferencia configurado/),
    ).toBeTruthy()
    await user.type(screen.getByLabelText(/Contexto y tarea/), ' modificada')
    expect(screen.queryByLabelText('Petición preparada')).toBeNull()
  })
  it('imports a package as an unsaved draft and requires review after saving', async () => {
    mount()
    await userEvent.click(
      screen.getByRole('button', { name: 'Importar y exportar' }),
    )
    const zip = Uint8Array.from(exportPackage(builtinSkills('es')[0]))
    const file = new File([zip.buffer], 'rubricas.zip', {
      type: 'application/zip',
    })
    file.arrayBuffer = async () => zip.buffer
    fireEvent.change(screen.getByLabelText('Importar ZIP'), {
      target: { files: [file] },
    })
    await screen.findByLabelText('Instrucciones', { exact: true })
    expect(await db.skills.count()).toBe(0)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    await screen.findByText('Skill guardada.')
    expect((await db.skills.toArray())[0].reviewed).toBe(false)
    await userEvent.click(
      screen.getByRole('button', { name: 'Ver y utilizar' }),
    )
    expect(
      screen.getByRole('button', {
        name: 'He revisado las instrucciones y los recursos de esta Skill.',
      }),
    ).toBeTruthy()
  })
  it('renders untrusted markdown without executable HTML or remote images', async () => {
    const { Markdown } = await import('./Editor')
    render(
      <Markdown
        text={
          '<script>alert(1)</script>\n\n![Tracking](https://example.invalid/track.png)\n\n[link](javascript:alert(1))'
        }
      />,
    )
    expect(document.querySelector('script,img,a')).toBeNull()
  })
})
