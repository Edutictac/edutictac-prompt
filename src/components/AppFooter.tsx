export function AppFooter({ t }: { t: Record<string, string> }) {
  return (
    <footer className="ett-footer">
      <p className="ett-footer__id">
        <span className="ett-footer__brand">EduTicTac</span>
        <span aria-hidden="true">·</span>
        <span className="ett-footer__service">Prompt</span>
      </p>
      <div className="ett-footer__links">
        <a href="https://edutictac.es/">{t.home}</a>
        <a href="https://edutictac.es/privacitat.html">{t.privacy}</a>
        <a href="https://edutictac.es/galetes.html">{t.cookies}</a>
        <a href="https://edutictac.es/termes.html">{t.terms}</a>
        <a href="https://git.edutictac.es/Edutictac/edutictac-prompt">{t.source}</a>
        <a href="https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/LICENSE">AGPL-3.0</a>
      </div>
    </footer>
  )
}
