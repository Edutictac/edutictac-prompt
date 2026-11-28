import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')

// El script modifica archivos: siempre se ejecuta sobre una copia desechable.
describe('generador de herramientas', () => {
  it('crea un esqueleto válido y rechaza un identificador duplicado sin modificarlo', () => {
    const temporary = mkdtempSync(join(tmpdir(), 'edutictac-template-test-'))
    try {
      cpSync(join(root, 'src'), join(temporary, 'src'), { recursive: true })
      cpSync(join(root, 'scripts'), join(temporary, 'scripts'), { recursive: true })
      const script = join(temporary, 'scripts/new-template.mjs')
      const run = () =>
        spawnSync(process.execPath, [script, 'test-tool', 'planning', "L'educació"], { encoding: 'utf8' })

      const created = run()
      expect(created.status, created.stderr).toBe(0)
      const files: Record<string, string> = {
        'src/templates/catalog4.ts': "id: 'test-tool'",
        'src/prompts/form/labels.ts': "'test-tool': 'templateTestTool'",
        'src/locales/extended4.ts': "L\\'educació",
        'src/prompts/generator/tasks.ts': "'test-tool':",
        'src/examples/catalog5.ts': "'test-tool':",
        'src/search.ts': "'test-tool':",
        'src/templateTips/es.ts': "'test-tool':",
        'src/templateTips/valencian.ts': "'test-tool':",
        'src/templateTips/ca.ts': "'test-tool':",
        'src/templateTips/en.ts': "'test-tool':",
      }
      const generated = Object.entries(files).map(([file, expected]) => {
        const content = readFileSync(join(temporary, file), 'utf8')
        expect(content, file).toContain(expected)
        const result = ts.transpileModule(content, {
          reportDiagnostics: true,
          compilerOptions: { target: ts.ScriptTarget.ESNext },
        })
        expect(
          result.diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error),
          file,
        ).toEqual([])
        return [file, content] as const
      })

      const duplicate = run()
      expect(duplicate.status).not.toBe(0)
      expect(duplicate.stderr).toContain('Ya existe una herramienta')
      for (const [file, content] of generated) expect(readFileSync(join(temporary, file), 'utf8')).toBe(content)
    } finally {
      rmSync(temporary, { recursive: true, force: true })
    }
  })
})
