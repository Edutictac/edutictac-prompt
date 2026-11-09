import type { Language } from '../types'
import { builtinSkills } from './seeds'
import { importPackage, ZIP_LIMIT, type PackageTarget } from './packages'
import { SkillError } from './model'
import type { SkillTexts } from './locales'
import type { Safe } from './safe'
import type { Skill, SkillDefinition } from './types'

export function TransferPanel({
  t,
  language,
  items,
  safe,
  onExport,
  onImport,
}: {
  t: SkillTexts
  language: Language
  items: Skill[]
  safe: Safe
  onExport: (skill: Skill, target: PackageTarget) => Promise<void>
  onImport: (definition: SkillDefinition) => void
}) {
  return (
    <>
      <h2>{t.transfer}</h2>
      <p>{t.importHint}</p>
      <label className="secondary file-label">
        {t.import}
        <input
          type="file"
          accept=".zip,application/zip"
          onChange={(e) => {
            const file = e.target.files?.[0]
            e.target.value = ''
            if (file)
              void safe(async () => {
                if (file.size > ZIP_LIMIT) throw new SkillError('size')
                const d = importPackage(new Uint8Array(await file.arrayBuffer()))
                onImport(d)
              })
          }}
        />
      </label>
      <p>{t.exportHint}</p>
      <p className="callout">{t.copilotHint}</p>
      <div className="saved-list">
        {[...builtinSkills(language), ...items].map((s) => (
          <article className="saved-card" key={s.id}>
            <strong>{s.name}</strong>
            <div className="toolbar">
              <button onClick={() => void safe(() => onExport(s, 'agents'))}>{t.exportAgents}</button>
              <button onClick={() => void safe(() => onExport(s, 'm365'))}>{t.exportM365}</button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
