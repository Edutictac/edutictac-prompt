// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import jsQR from 'jsqr'
import { QR_MAX_LENGTH, QrDialog, qrModules, qrSvg } from './QrDialog'
import { translations } from '../locales'

afterEach(cleanup)

// Pinta los módulos en una imagen RGBA y la descodifica como haría un móvil.
function decode(text: string) {
  const modules = qrModules(text)!
  const scale = 4
  const margin = 4
  const size = (modules.length + margin * 2) * scale
  const data = new Uint8ClampedArray(size * size * 4).fill(255)
  modules.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (!dark) return
      for (let dy = 0; dy < scale; dy++)
        for (let dx = 0; dx < scale; dx++) {
          const i = (((y + margin) * scale + dy) * size + (x + margin) * scale + dx) * 4
          data[i] = data[i + 1] = data[i + 2] = 0
        }
    }),
  )
  return jsQR(data, size, size)?.data
}

describe('código QR', () => {
  it('se lee y devuelve exactamente el enlace', () => {
    const url =
      'https://pages.edutictac.es/Edutictac/edutictac-prompt/#template/worksheet?d=PZDBSgNBEER_pdmrIkaNSQQvBgUhgqD30D'
    expect(decode(url)).toBe(url)
  })

  it('rechaza textos que no caben', () => {
    expect(qrModules('')).toBeNull()
    expect(qrModules('x'.repeat(QR_MAX_LENGTH + 1))).toBeNull()
    expect(qrSvg('x'.repeat(QR_MAX_LENGTH + 1))).toBe('')
  })

  it('el SVG descargable no permite inyectar marcado por el título', () => {
    expect(qrSvg('https://x/', '<script>alert(1)</script>')).not.toContain('<script>')
  })

  it('el diálogo muestra el QR, avisa si es largo y se cierra con Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const t = translations.es
    render(<QrDialog t={t} url={'https://x/#' + 'a'.repeat(1000)} title="Ficha" fileName="qr" onClose={onClose} />)
    expect(screen.getByRole('img', { name: 'Código QR: Ficha' })).toBeTruthy()
    expect(screen.getByText(/El código es muy denso/)).toBeTruthy()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('si el enlace es demasiado largo no dibuja el QR', () => {
    render(
      <QrDialog
        t={translations.es}
        url={'https://x/#' + 'a'.repeat(QR_MAX_LENGTH)}
        title="Ficha"
        fileName="qr"
        onClose={vi.fn()}
      />,
    )
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText(/demasiado texto para un código QR/)).toBeTruthy()
  })
})
