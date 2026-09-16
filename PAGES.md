# Publicación en EduTicTac Pages

EduTicTac Pages sirve la raíz de la rama `pages` en:

`https://pages.edutictac.es/Edutictac/edutictac-prompt/`

La aplicación se compila con rutas relativas para funcionar bajo esa subruta. Cuando tengas permisos de escritura en Forgejo, desde este repositorio ejecuta:

```bash
chmod +x scripts/publish-pages.sh
./scripts/publish-pages.sh
```

El script compila la PWA, prepara una rama `pages` con el contenido de `dist/` en su raíz y la publica en el remoto `edutictac`. No modifica la rama `master` ni el código fuente local.
