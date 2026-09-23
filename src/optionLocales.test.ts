import { describe, expect, it } from 'vitest'
import { localizeOption } from './optionLocales'

describe('opcions dels formularis', () => {
  it('no deixa les opcions bàsiques en castellà en català', () => {
    for (const option of ['Texto', 'Tabla', 'Lista', 'Primaria', 'Una sesión', 'Ordenadores', 'Pizarra digital']) {
      expect(localizeOption(option, 'ca'), option).not.toBe(option)
    }
  })

  it('traduïx les opcions bàsiques a l’anglés', () => {
    expect(localizeOption('Texto', 'en')).toBe('Text')
    expect(localizeOption('Tabla', 'en')).toBe('Table')
    expect(localizeOption('Primaria', 'en')).toBe('Primary')
  })
})
