# EduTicTac Prompt

PWA local-first para ayudar al profesorado a construir, editar y reutilizar prompts educativos. Funciona sin cuenta, sin IA obligatoria y sin conexión permanente.

## MVP

React + TypeScript + Vite, PWA instalable, IndexedDB con Dexie, formularios guiados, plantillas separadas de los componentes, cuatro idiomas independientes, biblioteca con búsqueda, favoritos, etiquetas, duplicado, borrado, exportación JSON/Markdown e importación versionada.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

Para Docker: `npm run build && docker compose up --build`. El contenedor escucha en el puerto 8080 del host y está preparado para reverse proxy.

## Arquitectura

- `src/templates.ts`: configuración de plantillas y campos.
- `src/generator.ts`: composición del prompt por bloques.
- `src/db.ts`: base local y versión de esquema Dexie.
- `src/locales.ts`: traducciones y detección del idioma.
- `src/types.ts`: contratos de datos locales y futura sincronización.

El JSON de exportación es propio (`format: edutictac-prompts`, `version: 1`) y no expone el esquema interno de IndexedDB. Authentik/OIDC y la API de Commons quedan fuera del MVP.

No introduzcas nombres ni datos personales del alumnado. Generar un prompt no llama a una IA ni envía datos a Internet. Licencia AGPL-3.0.
