// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAccountChip } from './useAccountChip'

afterEach(() => {
  document.body.innerHTML = ''
  document.documentElement.classList.remove('has-account-chip')
})

describe('detección del chip de cuenta', () => {
  it('se mantiene en falso si no hay chip', () => {
    const { result } = renderHook(() => useAccountChip())
    expect(result.current).toBe(false)
  })

  it('detecta el menú del chip y limpia la clase al desmontar', async () => {
    class FakeChip extends HTMLElement {
      connectedCallback() {
        this.innerHTML = '<nav class="eta"></nav>'
      }
    }
    if (!customElements.get('edutictac-account')) customElements.define('edutictac-account', FakeChip)
    document.body.appendChild(document.createElement('edutictac-account'))
    const { result, unmount } = renderHook(() => useAccountChip())

    await waitFor(() => expect(result.current).toBe(true))
    expect(document.documentElement.classList.contains('has-account-chip')).toBe(true)
    unmount()
    expect(document.documentElement.classList.contains('has-account-chip')).toBe(false)
  })
})
