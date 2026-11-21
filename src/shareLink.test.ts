import { describe, expect, it } from 'vitest'
import { deflateSync, strToU8 } from 'fflate'
import {
  decodeShareData,
  encodeShareData,
  MAX_SHARE_LENGTH,
  sharedValues,
  shareUrl,
  splitTemplateHash,
} from './shareLink'
import { sharedValuesFromHash, templateIdFromHash } from './App'
import { exampleValues } from './examples'
import { initialValues } from './prompts/form/values'

const values = { ...initialValues('illustrated-worksheet'), ...exampleValues('illustrated-worksheet', 'ca-valencia') }

describe('enlace con el formulario relleno', () => {
  it('ida y vuelta: el enlace abre la herramienta con los mismos datos', () => {
    const url = shareUrl('https://pages.edutictac.es/app/', 'illustrated-worksheet', values)
    expect(url.startsWith('https://pages.edutictac.es/app/#template/illustrated-worksheet?d=')).toBe(true)
    const hash = url.slice(url.indexOf('#'))
    expect(templateIdFromHash(hash)).toBe('illustrated-worksheet')
    expect(sharedValuesFromHash(hash)).toEqual(sharedValues('illustrated-worksheet', values))
    expect(sharedValuesFromHash(hash).topic).toBe('Sumes fins a 20')
  })

  it('solo comparte los campos rellenos y distintos de los iniciales', () => {
    const shared = sharedValues('illustrated-worksheet', values)
    expect(Object.values(shared).every((value) => value.trim())).toBe(true)
    expect(shared.outputFormat).toBeUndefined()
    expect(encodeShareData('illustrated-worksheet', initialValues('illustrated-worksheet'))).toBe('')
  })

  it('los enlaces antiguos sin datos siguen funcionando', () => {
    expect(templateIdFromHash('#template/worksheet')).toBe('worksheet')
    expect(sharedValuesFromHash('#template/worksheet')).toEqual({})
    expect(splitTemplateHash('#template/worksheet').data).toBe('')
  })

  it('ignora datos corruptos, campos ajenos y valores que no son texto', () => {
    expect(decodeShareData('worksheet', 'no-es-base64!!')).toEqual({})
    const raw = btoa(
      String.fromCharCode(...deflateSync(strToU8(JSON.stringify({ topic: 'Agua', hacked: 'x', level: 3 })))),
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
    expect(decodeShareData('worksheet', raw)).toEqual({ topic: 'Agua' })
    expect(sharedValuesFromHash(`#template/no-existe?d=${raw}`)).toEqual({})
  })

  it('no genera enlaces demasiado largos', () => {
    let seed = 1
    const noise = Array.from({ length: 12000 }, () =>
      String.fromCharCode(33 + ((seed = (seed * 48271) % 2147483647) % 90)),
    ).join('')
    const long = { ...values, sourceText: noise }
    expect(encodeShareData('worksheet', long).length).toBeGreaterThan(MAX_SHARE_LENGTH)
    expect(shareUrl('https://x/', 'worksheet', long)).toBe('')
  })
})
