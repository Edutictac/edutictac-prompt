#!/usr/bin/env bash
set -euo pipefail

# Publica la compilación de producción en la rama pages, que EduTicTac Pages
# sirve como raíz de https://pages.edutictac.es/Edutictac/edutictac-prompt/.
#
# Para no publicar trabajo a medias (varias sesiones pueden compartir este
# directorio), solo se publica exactamente lo que hay en edutictac/master:
# se exige un árbol limpio, se compila en una copia aparte del commit y antes
# se pasan lint, formato y pruebas. PUBLISH_SKIP_CHECKS=1 omite las pruebas
# (solo para emergencias).
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
build_dir="$(mktemp -d)"
pages_dir="$(mktemp -d)"
cleanup() {
  cd "$project_dir"
  git worktree remove --force "$build_dir" >/dev/null 2>&1 || rm -rf "$build_dir"
  git worktree remove --force "$pages_dir" >/dev/null 2>&1 || rm -rf "$pages_dir"
}
trap cleanup EXIT

fail() {
  echo "✗ $*" >&2
  exit 1
}

cd "$project_dir"

if [[ -n "$(git status --porcelain --untracked-files=normal)" ]]; then
  git status --short >&2
  fail "Hay cambios sin commitear (¿otra sesión trabajando?). Haz commit o espera antes de publicar."
fi

git fetch -q edutictac master pages
head_sha="$(git rev-parse HEAD)"
remote_sha="$(git rev-parse edutictac/master)"
if [[ "$head_sha" != "$remote_sha" ]]; then
  fail "HEAD ($(git rev-parse --short HEAD)) no coincide con edutictac/master ($(git rev-parse --short edutictac/master)). Sube o actualiza master antes de publicar."
fi

version="$(node -p "require('./package.json').version")"
news_version="$(sed -n "s/^export const newsVersion = '\(.*\)'$/\1/p" src/news.ts)"
if [[ "$news_version" != "$version" ]]; then
  echo "⚠ Las novedades de la portada anuncian v${news_version} y se publica v${version}: revisa src/news.ts si hay cambios visibles." >&2
fi

echo "→ Compilando v${version} ($(git rev-parse --short HEAD)) en una copia limpia…"
rmdir "$build_dir"
git worktree add -q --detach "$build_dir" HEAD
ln -s "$project_dir/node_modules" "$build_dir/node_modules"
cd "$build_dir"
if [[ "${PUBLISH_SKIP_CHECKS:-0}" != "1" ]]; then
  npm run -s lint
  npm run -s format:check
  npx vitest run --reporter=dot
fi
npm run build
[[ -f dist/sw.js ]] && grep -q "edutictac-prompt-v${version}" dist/sw.js || fail "dist/sw.js no contiene la versión ${version}."

cd "$project_dir"
rmdir "$pages_dir"
git worktree add -q --detach "$pages_dir" edutictac/pages
cd "$pages_dir"
git rm -rfq . >/dev/null 2>&1 || true
cp -R "$build_dir/dist/." .
touch .nojekyll
git add .
git -c user.name="EduTicTac Pages" -c user.email="pages@edutictac.es" commit -q -m "Publish EduTicTac Prompt v${version} (${head_sha:0:7})"
expected_pages="$(git rev-parse edutictac/pages)"
git push "--force-with-lease=refs/heads/pages:$expected_pages" edutictac HEAD:refs/heads/pages

echo "Publicado v${version} en https://pages.edutictac.es/Edutictac/edutictac-prompt/"
