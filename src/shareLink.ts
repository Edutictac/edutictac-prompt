import { deflateSync, inflateSync, strFromU8, strToU8 } from 'fflate'
import { templates } from './templates'
import { initialValues } from './prompts/form/values'
import { SHARE_PARAM } from './shareHash'

export { splitTemplateHash } from './shareHash'

// Enlace para compartir una herramienta con el formulario ya relleno:
// «#template/<id>?d=<datos>». Los datos son los valores que difieren de los
// iniciales, en JSON comprimido y en base64url. No pasan por ningún servidor
// (el fragmento # no se envía), pero quien tenga el enlace los ve: no deben
// llevar datos personales.

export const MAX_SHARE_LENGTH = 6000
const MAX_VALUE_LENGTH = 4000

const toBase64Url = (bytes: Uint8Array) => {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromBase64Url = (text: string) => {
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

const allowedKeys = (templateId: string) => {
  const template = templates.find((item) => item.id === templateId)
  return new Set([...Object.keys(initialValues(templateId)), ...(template?.fields.map((field) => field.id) ?? [])])
}

// Solo los valores rellenos que cambian respecto al formulario inicial.
export function sharedValues(templateId: string, values: Record<string, string>): Record<string, string> {
  const initial = initialValues(templateId)
  const allowed = allowedKeys(templateId)
  const shared = Object.fromEntries(
    Object.entries(values).filter(
      ([key, value]) => allowed.has(key) && typeof value === 'string' && value.trim() && value !== initial[key],
    ),
  )
  // Un enlace con datos conserva el formato elegido aunque coincida con el
  // formato inicial: quien lo abra puede tener otra preferencia guardada.
  if (Object.keys(shared).length && values.outputFormat && allowed.has('outputFormat'))
    shared.outputFormat = values.outputFormat
  return shared
}

export function encodeShareData(templateId: string, values: Record<string, string>): string {
  const data = sharedValues(templateId, values)
  if (!Object.keys(data).length) return ''
  return toBase64Url(deflateSync(strToU8(JSON.stringify(data)), { level: 9 }))
}

// Devuelve el enlace o '' si el formulario está vacío o los datos son demasiado largos.
export function shareUrl(base: string, templateId: string, values: Record<string, string>): string {
  const data = encodeShareData(templateId, values)
  if (!data || data.length > MAX_SHARE_LENGTH) return ''
  return `${base}#template/${encodeURIComponent(templateId)}?${SHARE_PARAM}=${data}`
}

// Lee y valida los datos de un enlace. Cualquier error devuelve {}.
export function decodeShareData(templateId: string, data: string): Record<string, string> {
  if (!data || data.length > MAX_SHARE_LENGTH) return {}
  try {
    const parsed: unknown = JSON.parse(strFromU8(inflateSync(fromBase64Url(data))))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const allowed = allowedKeys(templateId)
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter(
        (entry): entry is [string, string] =>
          allowed.has(entry[0]) && typeof entry[1] === 'string' && entry[1].length <= MAX_VALUE_LENGTH,
      ),
    )
  } catch {
    return {}
  }
}
