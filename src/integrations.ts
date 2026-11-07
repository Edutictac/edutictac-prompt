const DEFAULT_EDUCREA_URL = 'https://educrea.edutictac.es'
export const MAX_HANDOFF_PAYLOAD = 48_000

export const EDUCEREA_URL = (import.meta.env.VITE_EDUCREA_URL || DEFAULT_EDUCREA_URL).replace(/\/$/, '')

export function eduCreaNewProjectUrl(base: string = EDUCEREA_URL): string {
  return `${base.replace(/\/$/, '')}/projects?nuevo=1&desde=eduprompt`
}

export function eduCreaHandoffUrl(payload: string, base: string = EDUCEREA_URL): string {
  return `${base.replace(/\/$/, '')}/eduprompt#encargo=${payload}`
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
  } catch { return null }
}

export async function encodePromptPayload(text: string): Promise<string | null> {
  const compressed = await compressedPayload(text)
  if (compressed && compressed.length + 2 <= MAX_HANDOFF_PAYLOAD) return `z.${compressed}`
  const raw = `r.${base64url(new TextEncoder().encode(text))}`
  return raw.length <= MAX_HANDOFF_PAYLOAD ? raw : null
}

export async function eduCreaPromptUrl(prompt: string, base: string = EDUCEREA_URL): Promise<string | null> {
  const payload = await encodePromptPayload(prompt)
  return payload ? eduCreaHandoffUrl(payload, base) : null
}
