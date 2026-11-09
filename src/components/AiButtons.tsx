import { aiTargetUrl, orderedAiTargets, preferredAiTarget, rememberAiTarget } from '../followUps'

export function AiButtons({
  t,
  prompt,
  aiTool,
  copyPrompt,
  onStatus,
}: {
  t: Record<string, string>
  prompt: string
  aiTool?: string
  copyPrompt: (text: string) => Promise<boolean>
  onStatus: (text: string) => void
}) {
  const preferred = preferredAiTarget(aiTool || '')
  return (
    <div className="ai-buttons">
      {orderedAiTargets(preferred).map((target) => (
        <button
          type="button"
          key={target.id}
          className={preferred === target.id ? 'preferred' : ''}
          onClick={async () => {
            rememberAiTarget(target.id)
            const copying = copyPrompt(prompt)
            const url = aiTargetUrl(target, prompt)
            window.open(url, '_blank', 'noopener')
            const copied = await copying
            onStatus(
              (url.includes('q=') ? t.openedWithPrompt : copied ? t.openedPaste : t.copyFailed).replace(
                '{name}',
                target.name,
              ),
            )
          }}
        >
          {target.name} ↗
        </button>
      ))}
    </div>
  )
}
