import { describe, expect, it } from 'vitest'
import { strToU8, unzipSync, zipSync } from 'fflate'
import { builtinSkills } from './seeds'
import {
  exportPackage,
  importPackage,
  parseSkillMarkdown,
  skillMarkdown,
} from './packages'
const d = builtinSkills('es')[0]
describe('Agent Skills interchange', () => {
  it.each(['agents', 'm365'] as const)(
    'roundtrips %s packages, including resources and metadata',
    (target) => {
      const definition = {
        ...d,
        resources: [{ path: 'references/example.md', content: '# Ejemplo' }],
      }
      const bytes = exportPackage(definition, target)
      const files = unzipSync(bytes)
      expect(Object.keys(files)).toContain(
        target === 'agents' ? `.agents/skills/${d.slug}/SKILL.md` : 'SKILL.md',
      )
      expect(importPackage(bytes)).toEqual({
        ...definition,
        id: undefined,
        ownerId: undefined,
        source: undefined,
        status: undefined,
        visibility: undefined,
        reviewed: undefined,
        revision: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      })
    },
  )
  it('uses valid standard frontmatter and rejects unknown fields', () => {
    expect(parseSkillMarkdown(skillMarkdown(d), d.slug).name).toBe(d.slug)
    expect(() =>
      parseSkillMarkdown(
        '---\nname: test\ndescription: ok\nowner: x\n---\ntext',
      ),
    ).toThrow()
    expect(() =>
      parseSkillMarkdown(
        '---\nname: test\nname: test2\ndescription: ok\n---\ntext',
      ),
    ).toThrow()
    expect(() => parseSkillMarkdown(skillMarkdown(d), 'wrong')).toThrow()
    expect(() =>
      parseSkillMarkdown(
        '---\nname: a\ndescription: ok\nmetadata: [x]\n---\ntext',
      ),
    ).toThrow()
  })
  it('imports standard packages conservatively with tool requirements', () => {
    const md =
      '---\nname: test\ndescription: Test skill\nallowed-tools: Bash\n---\nDo a task'
    const imported = importPackage(zipSync({ 'test/SKILL.md': strToU8(md) }))
    expect(imported.mode).toBe('external')
    expect(imported.instructions).toBe('Do a task')
  })
  it.each([
    '../outside.txt',
    '/absolute.txt',
    'test/../../outside.md',
    'test/scripts/run.sh',
    'test/assets/image.svg',
    'test/references/deep/file.md',
    'test/references/a%2f.md',
    'test\\bad.md',
  ])('rejects unsafe paths and types: %s', (path) => {
    expect(() =>
      importPackage(
        zipSync({
          'test/SKILL.md': strToU8(
            '---\nname: test\ndescription: ok\n---\ntext',
          ),
          [path]: strToU8('bad'),
        }),
      ),
    ).toThrow()
  })
  it('rejects missing skills, multiple skills, zip bombs and invalid data', () => {
    for (const bytes of [
      new Uint8Array(30),
      zipSync({ 'x.txt': strToU8('x') }),
      zipSync({
        'a/SKILL.md': strToU8(skillMarkdown(d)),
        'b/SKILL.md': strToU8(skillMarkdown(d)),
      }),
      zipSync({ 'SKILL.md': new Uint8Array(200000).fill(65) }),
    ])
      expect(() => importPackage(bytes)).toThrow()
  })
  it('rejects manifest tampering and corrupted data', () => {
    const files = unzipSync(exportPackage(d))
    const name = Object.keys(files).find((n) => n.endsWith('edutictac.json'))!
    const m = JSON.parse(new TextDecoder().decode(files[name]))
    m.definition.instructions = 'Changed'
    files[name] = strToU8(JSON.stringify(m))
    expect(() => importPackage(zipSync(files))).toThrow()
    const zip = exportPackage(d)
    zip[30] ^= 1
    expect(() => importPackage(zip)).toThrow()
  })
  it('enforces M365 instruction character limit', () =>
    expect(() =>
      exportPackage({ ...d, instructions: 'x'.repeat(20000) }, 'm365'),
    ).toThrow('m365Limit'))
})

describe('archive header attacks', () => {
  it('rejects symbolic links and encrypted members before inflation', () => {
    for (const attack of ['link', 'encrypted']) {
      const bytes = exportPackage(d)
      const view = new DataView(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteLength,
      )
      const central = view.getUint32(bytes.length - 6, true)
      if (attack === 'link')
        view.setUint32(central + 38, (0xa1ff * 65536) >>> 0, true)
      else
        view.setUint16(central + 8, view.getUint16(central + 8, true) | 1, true)
      expect(() => importPackage(bytes)).toThrow()
    }
  })
  it('rejects aliases and trailing newline identifiers', () => {
    expect(() =>
      parseSkillMarkdown('---\nname: "test\\n"\ndescription: ok\n---\nbody'),
    ).toThrow()
    expect(() =>
      parseSkillMarkdown(
        '---\nname: test\ndescription: &a ok\nlicense: *a\n---\nbody',
      ),
    ).toThrow()
  })
})
