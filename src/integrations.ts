const DEFAULT_EDUCREA_URL = 'https://crea.edutictac.es'
export const MAX_HANDOFF_PAYLOAD = 48_000

export const EDUCEREA_URL = (import.meta.env.VITE_EDUCREA_URL || DEFAULT_EDUCREA_URL).replace(/\/$/, '')

export type EduCreaMeta = { language?: string; level?: string }

// Prompt uses ca-valencia and EduCrea calls it va; the rest of the codes match.
export function eduCreaLanguage(language = ''): string {
  return language === 'ca-valencia' ? 'va' : ['es', 'ca', 'en'].includes(language) ? language : ''
}

// EduCrea only offers four stages, so secondary and post-secondary values collapse.
const EDUCEREA_LEVELS: Record<string, string> = {
  infantil: 'infantil',
  primària: 'primaria',
  primaria: 'primaria',
  eso: 'secundaria',
  bachillerato: 'secundaria',
  fp: 'otros',
  'formación profesional': 'otros',
  'formacio professional': 'otros',
  universidad: 'otros',
  otro: 'otros',
  altres: 'otros',
  others: 'otros',
}

export function eduCreaLevel(level = ''): string {
  return EDUCEREA_LEVELS[level.trim().toLowerCase()] ?? ''
}

function bridgeParams(template: string, meta: EduCreaMeta): string {
  const params = new URLSearchParams()
  if (template) params.set('plantilla', template)
  const language = eduCreaLanguage(meta.language ?? '')
  if (language) params.set('idioma', language)
  const level = eduCreaLevel(meta.level ?? '')
  if (level) params.set('nivel', level)
  return params.toString()
}

export function eduCreaNewProjectUrl(base: string = EDUCEREA_URL): string {
  return `${base.replace(/\/$/, '')}/projects?nuevo=1&desde=eduprompt`
}

export function eduCreaHandoffUrl(
  payload: string,
  template = '',
  base: string = EDUCEREA_URL,
  meta: EduCreaMeta = {},
): string {
  const params = bridgeParams(template, meta)
  return `${base.replace(/\/$/, '')}/eduprompt#encargo=${payload}${params ? `&${params}` : ''}`
}

function base64url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function compressedPayload(text: string): Promise<string | null> {
  if (typeof CompressionStream === 'undefined') return null
  try {
    const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('deflate'))
    return base64url(new Uint8Array(await new Response(stream).arrayBuffer()))
  } catch {
    return null
  }
}

export async function encodePromptPayload(text: string): Promise<string | null> {
  const compressed = await compressedPayload(text)
  if (compressed && compressed.length + 2 <= MAX_HANDOFF_PAYLOAD) return `z.${compressed}`
  const raw = `r.${base64url(new TextEncoder().encode(text))}`
  return raw.length <= MAX_HANDOFF_PAYLOAD ? raw : null
}

export async function eduCreaPromptUrl(
  prompt: string,
  template = '',
  base: string = EDUCEREA_URL,
  meta: EduCreaMeta = {},
): Promise<string | null> {
  const payload = await encodePromptPayload(prompt)
  return payload ? eduCreaHandoffUrl(payload, template, base, meta) : null
}
