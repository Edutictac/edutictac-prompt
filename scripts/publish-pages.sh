#!/usr/bin/env bash
set -euo pipefail

# Publica la compilación de producción en la rama pages, que EduTicTac Pages
# sirve como raíz de https://pages.edutictac.es/Edutictac/edutictac-prompt/.
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
pages_dir="$(mktemp -d)"
trap 'rm -rf "$pages_dir"' EXIT

cd "$project_dir"
npm run build
git fetch edutictac pages
git worktree add --detach "$pages_dir" HEAD
cd "$pages_dir"
git rm -rf . >/dev/null 2>&1 || true
cp -R "$project_dir/dist/." .
touch .nojekyll
git add .
git -c user.name="EduTicTac Pages" -c user.email="pages@edutictac.es" commit -m "Publish EduTicTac Prompt" >/dev/null
expected_pages="$(git rev-parse edutictac/pages 2>/dev/null || true)"
if [[ -n "$expected_pages" ]]; then
  git push "--force-with-lease=refs/heads/pages:$expected_pages" edutictac HEAD:refs/heads/pages
else
  git push edutictac HEAD:refs/heads/pages
fi
cd "$project_dir"
git worktree remove --force "$pages_dir"

echo "Publicado en https://pages.edutictac.es/Edutictac/edutictac-prompt/"
