// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { translations } from '../../locales'
import { decodeShareData, encodeShareData } from '../../shareLink'
import { SettingsView } from '../../components/SettingsView'
import { preferredInitialValues, writeDefaultFormat } from './defaultFormat'

beforeEach(() => localStorage.clear())
afterEach(() => cleanup())

describe('preferred output format', () => {
  it('applies a saved format only to tools that support it and can be reset', () => {
    writeDefaultFormat('DOCX')
    expect(preferredInitialValues('lesson').outputFormat).toBe('DOCX')
    expect(preferredInitialValues('html-game').outputFormat).toBe('HTML')
    writeDefaultFormat('')
    expect(preferredInitialValues('lesson').outputFormat).toBe('Markdown')
  })
  it('saves the preference in settings and applies it to compatible tools', async () => {
    render(
      <SettingsView
        t={translations.es}
        language="es"
        setLanguage={vi.fn()}
        themeMode="system"
        setThemeMode={vi.fn()}
        exportAll={vi.fn()}
        importFile={vi.fn()}
      />,
    )
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

it('applies the curriculum profile only to compatible stages and clears mismatched details', async () => {
  const { writeDefaultCurriculum, reconcileCurriculum } = await import('./defaultFormat')
  writeDefaultCurriculum('cv-primaria-coneixement-del-medi-natural-social-i-cultural')
  const values = preferredInitialValues('lesson', 'es')
  expect(values.level).toBe('Primaria')
  expect(values.subject).toBe('Conocimiento del medio natural, social y cultural')
  expect(values.curriculumProfile).toBe('cv-primaria-coneixement-del-medi-natural-social-i-cultural')
  const changed = reconcileCurriculum({ ...values, level: 'ESO', curriculumCriteria: 'Criterio anterior' })
  expect(changed.curriculumProfile).toBe('')
  expect(changed.curriculumCriteria).toBe('')
  expect(preferredInitialValues('free', 'es').curriculumProfile).toBe('')
})

it('configura el perfil, la IA, el idioma y ofrece la gestión de la biblioteca', async () => {
  const changeLanguage = vi.fn()
  const changeTheme = vi.fn()
  const exportAll = vi.fn()
  const importFile = vi.fn()
  render(
    <SettingsView
      t={translations.es}
      language="es"
      setLanguage={changeLanguage}
      themeMode="system"
      setThemeMode={changeTheme}
      exportAll={exportAll}
      importFile={importFile}
    />,
  )
  const user = userEvent.setup()
  await user.selectOptions(screen.getByLabelText('Perfil curricular predeterminado'), 'cv-primaria')
  expect(preferredInitialValues('lesson').level).toBe('Primaria')
  await user.selectOptions(screen.getByLabelText('IA preferida'), 'Gemini')
  const { preferredAiTarget } = await import('../../followUps')
  expect(preferredAiTarget('')).toBe('Gemini')
  await user.selectOptions(screen.getByLabelText('Idioma'), 'en')
  expect(changeLanguage).toHaveBeenCalledWith('en')
  await user.selectOptions(screen.getByLabelText('Tema'), 'dark')
  expect(changeTheme).toHaveBeenCalledWith('dark')
  await user.click(screen.getByRole('button', { name: 'Exportar JSON' }))
  expect(exportAll).toHaveBeenCalledOnce()
  const file = new File(['{}'], 'biblioteca.json', { type: 'application/json' })
  await user.upload(screen.getByLabelText('Importar'), file)
  expect(importFile).toHaveBeenCalledWith(file)
})
