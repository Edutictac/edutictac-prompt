// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { translations } from '../../locales'
import { decodeShareData, encodeShareData } from '../../shareLink'
import { SettingsView } from '../../components/SettingsView'
import { preferredInitialValues, writeDefaultFormat } from './defaultFormat'

beforeEach(() => localStorage.clear())

describe('preferred output format', () => {
  it('applies a saved format only to tools that support it and can be reset', () => {
    writeDefaultFormat('DOCX')
    expect(preferredInitialValues('lesson').outputFormat).toBe('DOCX')
    expect(preferredInitialValues('html-game').outputFormat).toBe('HTML')
    writeDefaultFormat('')
    expect(preferredInitialValues('lesson').outputFormat).toBe('Markdown')
  })
  it('saves the preference in settings and applies it to compatible tools', async () => {
    render(<SettingsView t={translations.es} language="es" />)
    await userEvent.selectOptions(screen.getByLabelText('Formato predeterminado'), 'DOCX')
    expect(preferredInitialValues('lesson').outputFormat).toBe('DOCX')
    expect(preferredInitialValues('html-game').outputFormat).toBe('HTML')
  })
  it('preserves the sender format in links even when the recipient has another preference', () => {
    const data = encodeShareData('lesson', { topic: 'Agua', outputFormat: 'Markdown' })
    writeDefaultFormat('DOCX')
    expect({ ...preferredInitialValues('lesson'), ...decodeShareData('lesson', data) }.outputFormat).toBe('Markdown')
  })
})
