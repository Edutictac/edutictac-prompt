import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate'
import { parseDocument, stringify } from 'yaml'
import {
  blankDefinition,
  fail,
  resourcePath,
  validateDefinition,
  validateSlug,
} from './model'
import { skillBody } from './execution'
import type { SkillDefinition } from './types'
export const ZIP_LIMIT = 2_000_000,
  FILE_LIMIT = 100_000,
  TOTAL_LIMIT = 1_500_000
export type PackageTarget = 'agents' | 'm365'
export function skillMarkdown(d: SkillDefinition) {
  validateDefinition(d)
  return `---\n${stringify({ name: d.slug, description: d.description, license: d.license, ...(d.requirements ? { compatibility: d.requirements } : {}) })}---\n\n${skillBody(d)}\n`
}
export function parseSkillMarkdown(markdown: string, folder?: string) {
  if (strToU8(markdown).length > FILE_LIMIT) fail('size')
  const match = markdown
    .replace(/\r\n/g, '\n')
    .match(/^---\n([\s\S]*?)\n---\n([\s\S]+)$/)
  if (!match) fail('invalid', 'SKILL.md')
  let value: Record<string, unknown>
  try {
    const doc = parseDocument(match![1], { uniqueKeys: true, strict: true })
    if (doc.errors.length) fail('invalid')
    value = doc.toJS({ maxAliasCount: 0 })
  } catch {
    return fail('invalid', 'SKILL.md')
  }
  if (!value || typeof value !== 'object' || Array.isArray(value))
    fail('invalid', 'SKILL.md')
  if (
    Object.keys(value).some(
      (k) =>
        ![
          'name',
          'description',
          'license',
          'compatibility',
          'metadata',
          'allowed-tools',
        ].includes(k),
    )
  )
    fail('invalid', 'SKILL.md')
  validateSlug(value.name)
  if (folder && folder !== value.name) fail('invalid', 'slug')
  if (
    typeof value.description !== 'string' ||
    !value.description.trim() ||
    value.description.length > 1024
  )
    fail('invalid', 'description')
  for (const key of ['license', 'compatibility', 'allowed-tools'])
    if (
      value[key] !== undefined &&
      (typeof value[key] !== 'string' ||
        !(value[key] as string).trim() ||
        (value[key] as string).length > (key === 'compatibility' ? 500 : 1000))
    )
      fail('invalid', key)
  if (
    value.metadata !== undefined &&
    (!value.metadata ||
      typeof value.metadata !== 'object' ||
      Array.isArray(value.metadata) ||
      Object.values(value.metadata).some((v) => typeof v !== 'string'))
  )
    fail('invalid', 'metadata')
  if (!match![2].trim()) fail('invalid', 'instructions')
  return {
    name: value.name as string,
    description: value.description as string,
    license: typeof value.license === 'string' ? value.license : 'NOASSERTION',
    compatibility:
      typeof value.compatibility === 'string' ? value.compatibility : '',
    tools: Boolean(value['allowed-tools']),
    body: match![2].trim(),
  }
}
function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff
  for (const b of bytes) {
    crc ^= b
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}
function safePath(path: string) {
  if (
    !path ||
    path.length > 240 ||
    path.startsWith('/') ||
    path.includes('\\') ||
    path.split('/').some((s) => s === '.' || s === '..' || !s) ||
    /[\u0000-\u001f\u007f:%]/.test(path)
  )
    fail('unsafe')
  return path
}
// Inspect central and local headers before inflation. ZIP64, encryption, links and
// ambiguous archives are deliberately outside this educational interchange subset.
function inspect(bytes: Uint8Array) {
  if (bytes.length > ZIP_LIMIT || bytes.length < 22) fail('size')
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  let end = -1
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--)
    if (
      v.getUint32(i, true) === 0x06054b50 &&
      i + 22 + v.getUint16(i + 20, true) === bytes.length
    ) {
      end = i
      break
    }
  if (end < 0) fail('invalid', 'ZIP')
  const count = v.getUint16(end + 10, true),
    offset = v.getUint32(end + 16, true)
  if (
    v.getUint16(end + 4, true) ||
    v.getUint16(end + 6, true) ||
    v.getUint16(end + 8, true) !== count ||
    count > 40 ||
    count < 1 ||
    offset + v.getUint32(end + 12, true) !== end
  )
    fail('unsafe')
  const entries = new Map<string, { size: number; crc: number }>()
  let pos = offset,
    total = 0
  const spans: [number, number][] = []
  for (let i = 0; i < count; i++) {
    if (pos + 46 > end || v.getUint32(pos, true) !== 0x02014b50)
      fail('invalid', 'ZIP')
    const flags = v.getUint16(pos + 8, true),
      method = v.getUint16(pos + 10, true),
      compressed = v.getUint32(pos + 20, true),
      size = v.getUint32(pos + 24, true),
      n = v.getUint16(pos + 28, true),
      extra = v.getUint16(pos + 30, true),
      comment = v.getUint16(pos + 32, true),
      attr = v.getUint32(pos + 38, true),
      local = v.getUint32(pos + 42, true)
    if (
      pos + 46 + n + extra + comment > end ||
      local + 30 > offset ||
      flags & 1 ||
      ![0, 8].includes(method) ||
      size > FILE_LIMIT ||
      compressed > ZIP_LIMIT ||
      v.getUint16(pos + 34, true) ||
      ((attr >>> 16) & 0xf000) === 0xa000
    )
      fail('unsafe')
    let name = strFromU8(bytes.subarray(pos + 46, pos + 46 + n))
    const directory = name.endsWith('/')
    if (directory) name = name.slice(0, -1)
    safePath(name)
    if (entries.has(name)) fail('unsafe')
    if (
      v.getUint32(local, true) !== 0x04034b50 ||
      v.getUint16(local + 6, true) !== flags ||
      v.getUint16(local + 8, true) !== method
    )
      fail('unsafe')
    const ln = v.getUint16(local + 26, true),
      le = v.getUint16(local + 28, true),
      start = local + 30 + ln + le
    if (
      start + compressed > offset ||
      strFromU8(bytes.subarray(local + 30, local + 30 + ln)) !==
        name + (directory ? '/' : '')
    )
      fail('unsafe')
    if (
      !(flags & 8) &&
      (v.getUint32(local + 18, true) !== compressed ||
        v.getUint32(local + 22, true) !== size)
    )
      fail('unsafe')
    if (directory && size) fail('unsafe')
    spans.push([local, start + compressed])
    total += size
    if (total > TOTAL_LIMIT) fail('size')
    entries.set(name, { size, crc: v.getUint32(pos + 16, true) })
    pos += 46 + n + extra + comment
  }
  if (pos !== end) fail('invalid', 'ZIP')
  spans.sort((a, b) => a[0] - b[0])
  for (let i = 1; i < spans.length; i++)
    if (spans[i][0] < spans[i - 1][1]) fail('unsafe')
  return entries
}
export function exportPackage(
  input: SkillDefinition,
  target: PackageTarget = 'agents',
): Uint8Array {
  const d = validateDefinition(input),
    md = skillMarkdown(d)
  if (target === 'm365' && skillBody(d).length >= 20000) fail('m365Limit')
  const root = target === 'agents' ? `.agents/skills/${d.slug}/` : ''
  const files: Record<string, Uint8Array> = {
    [`${root}SKILL.md`]: strToU8(md),
    [`${root}edutictac.json`]: strToU8(
      JSON.stringify({
        format: 'edutictac-skill',
        schemaVersion: 1,
        definition: d,
      }),
    ),
  }
  for (const r of d.resources) files[root + r.path] = strToU8(r.content)
  const zip = zipSync(files, { level: 6 })
  inspect(zip)
  return zip
}
export function importPackage(bytes: Uint8Array): SkillDefinition {
  try {
    const headers = inspect(bytes),
      files = unzipSync(bytes)
    for (const [path, b] of Object.entries(files)) {
      const meta = headers.get(path.replace(/\/$/, ''))
      if (!meta || b.length !== meta.size || crc32(b) !== meta.crc)
        fail('unsafe')
    }
    const names = Object.keys(files).filter((p) => !p.endsWith('/')),
      skills = names.filter((p) => p === 'SKILL.md' || p.endsWith('/SKILL.md'))
    if (skills.length !== 1) fail('invalid', 'SKILL.md')
    const path = skills[0],
      root = path.slice(0, -8)
    if (
      root &&
      !/^(?:\.agents\/skills\/)?[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(root)
    )
      fail('unsafe')
    const md = parseSkillMarkdown(
      new TextDecoder('utf-8', { fatal: true }).decode(files[path]),
      root ? root.split('/').at(-2) : undefined,
    )
    const resources = []
    for (const name of names) {
      if (!name.startsWith(root)) fail('unsafe')
      const relative = name.slice(root.length)
      if (['SKILL.md', 'edutictac.json'].includes(relative)) continue
      resourcePath(relative)
      resources.push({
        path: relative,
        content: new TextDecoder('utf-8', { fatal: true }).decode(files[name]),
      })
    }
    let d: SkillDefinition = {
      ...blankDefinition('es'),
      slug: md.name,
      name: md.name,
      description: md.description,
      instructions: md.body,
      license: md.license,
      requirements: md.compatibility,
      resources,
      mode: md.tools || md.compatibility ? 'external' : 'instructions',
    }
    if (files[root + 'edutictac.json']) {
      const manifest = JSON.parse(
        new TextDecoder('utf-8', { fatal: true }).decode(
          files[root + 'edutictac.json'],
        ),
      )
      if (manifest.format !== 'edutictac-skill' || manifest.schemaVersion !== 1)
        fail('invalid')
      d = validateDefinition(manifest.definition)
      if (
        d.slug !== md.name ||
        d.description !== md.description ||
        d.license !== md.license ||
        d.requirements !== md.compatibility ||
        skillBody(d).trim() !== md.body ||
        JSON.stringify(
          [...d.resources].sort((a, b) => a.path.localeCompare(b.path)),
        ) !==
          JSON.stringify(resources.sort((a, b) => a.path.localeCompare(b.path)))
      )
        fail('invalid', 'manifest')
      if (md.tools) d.mode = 'external'
    }
    return validateDefinition(d)
  } catch (e) {
    if (
      e instanceof Error &&
      e.name === 'Error' &&
      ['unsafe', 'size', 'invalid'].includes(e.message)
    )
      throw e
    return fail('invalid', 'ZIP')
  }
}
