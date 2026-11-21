import { useEffect, useMemo, useRef } from 'react'
import qrcode from 'qrcode-generator'

// Código QR generado en el navegador (sin servicios externos) para proyectar
// un enlace en clase o en una formación. Corrección de errores «M»: aguanta
// proyectores y pantallas con reflejos sin hacer el código demasiado denso.
export const QR_MAX_LENGTH = 2300
// A partir de aquí el código es denso y cuesta escanearlo desde lejos.
export const QR_DENSE_LENGTH = 900

export function qrModules(text: string): boolean[][] | null {
  if (!text || text.length > QR_MAX_LENGTH) return null
  try {
    const qr = qrcode(0, 'M')
    qr.addData(text, 'Byte')
    qr.make()
    const size = qr.getModuleCount()
    return Array.from({ length: size }, (_, row) => Array.from({ length: size }, (_, col) => qr.isDark(row, col)))
  } catch {
    return null
  }
}

// Trazado SVG de los módulos oscuros, con 4 módulos de margen blanco.
function qrPath(modules: boolean[][]) {
  const margin = 4
  let path = ''
  modules.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (dark) path += `M${x + margin} ${y + margin}h1v1h-1z`
    }),
  )
  return { size: modules.length + margin * 2, path }
}

// SVG autónomo (con margen blanco) para descargarlo.
export function qrSvg(text: string, title = ''): string {
  const modules = qrModules(text)
  if (!modules) return ''
  const { size, path } = qrPath(modules)
  const safeTitle = title.replace(/[<>&"]/g, '')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><title>${safeTitle}</title><rect width="${size}" height="${size}" fill="#fff"/><path d="${path}" fill="#000"/></svg>`
}

export function downloadQr(text: string, title: string, fileName: string) {
  const svg = qrSvg(text, title)
  if (!svg) return
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.svg`
  link.click()
  URL.revokeObjectURL(url)
}

export function QrCode({ text, label }: { text: string; label: string }) {
  const modules = useMemo(() => qrModules(text), [text])
  if (!modules) return null
  const { size, path } = qrPath(modules)
  return (
    <svg className="qr-code" viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" role="img" aria-label={label}>
      <rect width={size} height={size} fill="#fff" />
      <path d={path} fill="#000" />
    </svg>
  )
}

export function QrDialog({
  t,
  url,
  title,
  fileName,
  onClose,
}: {
  t: Record<string, string>
  url: string
  title: string
  fileName: string
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const fits = url.length <= QR_MAX_LENGTH
  return (
    <div className="qr-backdrop" role="dialog" aria-modal="true" aria-labelledby="qr-title" onClick={onClose}>
      <div className="qr-dialog" onClick={(event) => event.stopPropagation()}>
        <h2 id="qr-title">{title}</h2>
        {fits ? (
          <>
            <QrCode text={url} label={`${t.qrLabel}: ${title}`} />
            <p className="qr-hint">{t.qrHint}</p>
            {url.length > QR_DENSE_LENGTH && <p className="qr-warning">{t.qrDense}</p>}
          </>
        ) : (
          <p className="qr-warning">{t.qrTooLong}</p>
        )}
        <div className="qr-actions">
          {fits && (
            <button type="button" className="secondary" onClick={() => downloadQr(url, title, fileName)}>
              ⬇ {t.qrDownload}
            </button>
          )}
          <button type="button" className="primary" ref={closeRef} onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}
