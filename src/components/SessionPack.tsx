import { useCallback, useState } from 'react'
import type { SavedPrompt } from '../types'
import { shareUrl } from '../shareLink'
import { QrCode, QrDialog, QR_MAX_LENGTH } from './QrDialog'

// Paquete de sesión: varios prompts guardados en una sola página, cada uno con
// su enlace (que abre la herramienta ya rellena) y su QR. Pensado para una
// formación: imprimirlo, proyectar los QR uno a uno o pegar los enlaces en
// Aules o en la zona del centro. Todo se genera en el navegador.

export type SessionItem = { id: string; title: string; toolName: string; url: string; withData: boolean }

export function sessionItems(saved: SavedPrompt[], base: string, templateName: (id: string) => string): SessionItem[] {
  return saved
    .filter((item) => item.templateId)
    .map((item) => {
      const templateId = item.templateId!
      const url = shareUrl(base, templateId, item.values || {})
      return {
        id: item.id,
        title: item.title,
        toolName: templateName(templateId),
        url: url || `${base}#template/${encodeURIComponent(templateId)}`,
        withData: Boolean(url),
      }
    })
}

export const sessionLinksText = (title: string, items: SessionItem[]) =>
  [title, '', ...items.map((item, index) => `${index + 1}. ${item.title} (${item.toolName})\n${item.url}`)].join('\n')

export default function SessionPack({
  t,
  saved,
  templateName,
  copyText,
  onClose,
}: {
  t: Record<string, string>
  saved: SavedPrompt[]
  templateName: (id: string) => string
  copyText: (text: string) => Promise<boolean>
  onClose: () => void
}) {
  const [title, setTitle] = useState(t.sessionDefaultTitle)
  const [status, setStatus] = useState('')
  const [projecting, setProjecting] = useState<SessionItem | null>(null)
  const stopProjecting = useCallback(() => setProjecting(null), [])
  const items = sessionItems(saved, location.origin + location.pathname, templateName)
  return (
    <section className="session-pack" aria-labelledby="session-title">
      <div className="session-head no-print">
        <button type="button" className="back" onClick={onClose}>
          ← {t.library}
        </button>
        <p className="mode-hint">{t.sessionIntro}</p>
        <label className="session-title-field">
          {t.sessionTitleLabel}
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <div className="toolbar">
          <button type="button" className="primary" onClick={() => window.print()}>
            🖨 {t.sessionPrint}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={async () =>
              setStatus((await copyText(sessionLinksText(title, items))) ? t.sessionCopied : t.copyFailed)
            }
          >
            🔗 {t.sessionCopyLinks}
          </button>
        </div>
        {status && (
          <p className="share-state" role="status">
            {status}
          </p>
        )}
      </div>
      <h1 id="session-title" className="session-heading">
        {title}
      </h1>
      <ol className="session-grid">
        {items.map((item) => (
          <li className="session-item" key={item.id}>
            <h2>{item.title}</h2>
            <p className="session-tool">{item.toolName}</p>
            {item.url.length <= QR_MAX_LENGTH ? (
              <QrCode text={item.url} label={`${t.qrLabel}: ${item.title}`} />
            ) : (
              <p className="qr-warning">{t.qrTooLong}</p>
            )}
            {!item.withData && <p className="session-note">{t.sessionNoData}</p>}
            <a className="session-link" href={item.url} target="_blank" rel="noreferrer">
              {t.sessionOpen}
            </a>
            <button type="button" className="secondary no-print" onClick={() => setProjecting(item)}>
              ⛶ {t.sessionProject}
            </button>
          </li>
        ))}
      </ol>
      {projecting && (
        <QrDialog
          t={t}
          url={projecting.url}
          title={projecting.title}
          fileName={`qr-${projecting.id}`}
          onClose={stopProjecting}
        />
      )}
    </section>
  )
}
