# EduTicTac Prompt

PWA local-first para ayudar al profesorado a construir, editar y reutilizar prompts educativos. Funciona sin cuenta, sin IA obligatoria y sin conexión permanente.

## MVP

React + TypeScript + Vite, PWA instalable, IndexedDB con Dexie, formularios guiados, plantillas separadas de los componentes, cuatro idiomas independientes, biblioteca con búsqueda, favoritos, etiquetas, duplicado, borrado, exportación JSON/Markdown e importación versionada. Con cuenta Authentik, la biblioteca se puede sincronizar entre dispositivos; sin cuenta sigue funcionando completamente offline.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

Para Docker: `npm run build && docker compose up --build`. El contenedor escucha en el puerto 8092 del host y está preparado para reverse proxy.

## Arquitectura

- `src/templates.ts`: configuración de plantillas y campos.
- `src/generator.ts`: composición del prompt por bloques.
- `src/db.ts`: base local y versión de esquema Dexie.
- `src/locales.ts`: traducciones y detección del idioma.
- `src/types.ts`: contratos de datos locales y futura sincronización.

El JSON de exportación es propio (`format: edutictac-prompts`, `version: 1`) y no expone el esquema interno de IndexedDB. La sincronización usa la API privada `edutictac-prompt-api`; Authentik valida la identidad y la API nunca acepta el propietario enviado por el navegador.

No introduzcas nombres ni datos personales del alumnado. Generar un prompt no llama a una IA ni envía datos a Internet. Licencia AGPL-3.0.

## Estat actual

- Versió publicada de la PWA: **0.1.10**.
- Producció: [pages.edutictac.es/Edutictac/edutictac-prompt](https://pages.edutictac.es/Edutictac/edutictac-prompt/).
- La PWA funciona localment amb IndexedDB i continua disponible sense compte ni connexió.
- Authentik està integrat mitjançant OIDC + PKCE. L’inici de sessió es fa des de `id.edutictac.es`.
- La biblioteca remota és privada per usuari i està disponible en [prompts.edutictac.es](https://prompts.edutictac.es). Els prompts locals només es pugen quan la persona prem **Sincronitzar biblioteca**.
- El backend és el repositori [`edutictac-prompt-api`](https://github.com/Edutictac/edutictac-prompt-api), amb còpia en Forgejo. Utilitza SQLite, cookies de sessió signades i el nucli compartit `edutictac-community`.
- El catàleg només mostra categories que tenen ferramentes associades; les categories buides no apareixen.
- Proves automatitzades: **13** en la PWA i **8** en l’API.
- El formulari ofereix un **mode senzill** amb els camps essencials i un **mode avançat** amb tots els camps disponibles.
- Cada publicació de la PWA actualitza la versió de Workbox del `sw.js` i inclou un avís perquè la persona usuària puga actualitzar l’aplicació.
