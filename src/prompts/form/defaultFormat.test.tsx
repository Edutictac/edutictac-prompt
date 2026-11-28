// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { translations } from '../../locales'
import { templates } from '../../templates'
import { decodeShareData, encodeShareData } from '../../shareLink'
import { FieldControl } from './FieldControl'
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
  it('saves the preference through the form and applies it to the current tool', async () => {
    const field = templates
      .find((template) => template.id === 'lesson')!
      .fields.find((item) => item.id === 'outputFormat')!
    let values = preferredInitialValues('lesson')
    render(
      <FieldControl
        field={field}
        t={translations.es}
        language="es"
        templateId="lesson"
        values={values}
        setValues={(next) => {
          values = next
        }}
      />,
    )
    await userEvent.selectOptions(screen.getByLabelText(/Formato predeterminado/), 'DOCX')
    expect(values.outputFormat).toBe('DOCX')
    expect(preferredInitialValues('sequence').outputFormat).toBe('DOCX')
  })
  it('preserves the sender format in links even when the recipient has another preference', () => {
    const data = encodeShareData('lesson', { topic: 'Agua', outputFormat: 'Markdown' })
    writeDefaultFormat('DOCX')
    expect({ ...preferredInitialValues('lesson'), ...decodeShareData('lesson', data) }.outputFormat).toBe('Markdown')
  })
})
