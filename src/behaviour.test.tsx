// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { db } from './db'
import { seedFixtures } from './test/fixtures'

const readBlob = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(blob)
  })

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('edutictac-language', 'es')
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(async () => {
  cleanup()
  await Promise.all([
    db.prompts.clear(),
    db.categories.clear(),
    db.skills.clear(),
    db.skillRevisions.clear(),
    db.agents.clear(),
    db.agentRevisions.clear(),
  ])
  vi.restoreAllMocks()
})

describe('recorridos de la biblioteca', () => {
  it('guarda, reabre y actualiza un prompt sin duplicarlo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /^Crear/ }))
    await user.type(screen.getByRole('textbox', { name: /^Tema/ }), 'Los ecosistemas')
    await user.click(screen.getByRole('button', { name: 'Generar prompt' }))
    await user.click(await screen.findByRole('button', { name: 'Guardar' }))
    await user.type(screen.getByRole('textbox', { name: 'Título' }), 'Prompt ecosistemas')
    await user.click(screen.getByRole('button', { name: 'Guardar prompt' }))
    await screen.findByText('Prompt guardado en tu biblioteca.')
    expect(await db.prompts.count()).toBe(1)

    await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
    await screen.findByRole('heading', { name: 'Prompt ecosistemas' })
    await user.click(screen.getByRole('button', { name: 'Editar' }))
    expect((screen.getByRole('textbox', { name: /^Tema/ }) as HTMLInputElement).value).toBe('Los ecosistemas')

    await user.click(screen.getByRole('button', { name: 'Actualizar' }))
    await screen.findByText('Prompt actualizado en tu biblioteca.')
    expect(await db.prompts.count()).toBe(1)

    await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
    expect(await screen.findAllByRole('heading', { name: 'Prompt ecosistemas' })).toHaveLength(1)
  })

  it('abre un prompt antiguo sin valores de formulario', async () => {
    const user = userEvent.setup()
    await seedFixtures(db)
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
    await screen.findByRole('heading', { name: 'Prompt antiguo' })
    const cards = screen.getAllByRole('article')
    const oldCard = cards.find((card) => card.textContent?.includes('Prompt antiguo'))!
    await user.click(Array.from(oldCard.querySelectorAll('button')).find((button) => button.textContent === 'Editar')!)
    expect(screen.getByRole('heading', { name: 'Constructor libre', level: 1 })).toBeTruthy()
  })

  it('guarda, reabre y actualiza un prompt creado en Paso a paso', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /^Crear/ }))
    await user.click(screen.getByRole('button', { name: 'Paso a paso' }))
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    await user.type(screen.getByRole('textbox', { name: /^Tema/ }), 'La fotosíntesis')
    for (let step = 0; step < 10; step += 1) {
      const next = screen.queryByRole('button', { name: 'Siguiente' })
      if (!next) break
      await user.click(next)
    }
    await user.click(screen.getByRole('button', { name: 'Ver resumen' }))
    await user.click(screen.getByRole('button', { name: 'Generar prompt' }))
    await user.click(await screen.findByRole('button', { name: 'Guardar' }))
    await user.type(screen.getByRole('textbox', { name: 'Título' }), 'Prompt guiado')
    await user.click(screen.getByRole('button', { name: 'Guardar prompt' }))
    await screen.findByText('Prompt guardado en tu biblioteca.')

    await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
    await screen.findByRole('heading', { name: 'Prompt guiado' })
    await user.click(screen.getByRole('button', { name: 'Editar' }))
    await user.click(screen.getByRole('button', { name: 'Avanzado' }))
    expect((screen.getByRole('textbox', { name: /^Tema/ }) as HTMLInputElement).value).toBe('La fotosíntesis')
    await user.click(screen.getByRole('button', { name: 'Actualizar' }))
    await screen.findByText('Prompt actualizado en tu biblioteca.')
    expect(await db.prompts.count()).toBe(1)
  })

  it('conserva los valores al cambiar entre Sencillo, Paso a paso y Avanzado', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /^Crear/ }))
    await user.type(screen.getByRole('textbox', { name: /^Tema/ }), 'El ciclo del agua')

    await user.click(screen.getByRole('button', { name: 'Avanzado' }))
    expect((screen.getByRole('textbox', { name: /^Tema/ }) as HTMLInputElement).value).toBe('El ciclo del agua')

    await user.click(screen.getByRole('button', { name: 'Paso a paso' }))
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect((screen.getByRole('textbox', { name: /^Tema/ }) as HTMLInputElement).value).toBe('El ciclo del agua')

    await user.click(screen.getByRole('button', { name: 'Sencillo' }))
    expect((screen.getByRole('textbox', { name: /^Tema/ }) as HTMLInputElement).value).toBe('El ciclo del agua')
  })

  it('exporta la biblioteca e importa sin dejar escrituras parciales', async () => {
    const user = userEvent.setup()
    await seedFixtures(db)
    let exported: Blob | undefined
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn((blob: Blob) => {
        exported = blob
        return 'blob:test'
      }),
    })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() })
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Mi biblioteca' }))
    await screen.findByRole('heading', { name: 'Prompt de prueba' })
    await user.click(screen.getByRole('button', { name: 'Exportar JSON' }))
    await waitFor(() => expect(exported).toBeTruthy())
    const data = JSON.parse(await readBlob(exported!)) as {
      format: string
      version: number
      prompts: { id: string; title: string }[]
    }
    expect(data.format).toBe('edutictac-prompts')
    expect(data.version).toBe(1)
    expect(data.prompts).toHaveLength(2)

    const imported = {
      ...data,
      prompts: [...data.prompts, { ...data.prompts[0], id: 'imported-1', title: 'Prompt importado' }],
    }
    const input = screen.getByLabelText('Importar') as HTMLInputElement
    await user.upload(input, new File([JSON.stringify(imported)], 'biblioteca.json', { type: 'application/json' }))
    await screen.findByText('Importación completada.')
    expect(await db.prompts.count()).toBe(3)
    expect(screen.getByRole('heading', { name: 'Prompt importado' })).toBeTruthy()

    await user.upload(input, new File(['{"format":"otro"}'], 'invalido.json', { type: 'application/json' }))
    await screen.findByText('Archivo no válido')
    expect(await db.prompts.count()).toBe(3)
  })
})
