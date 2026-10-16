# Skills: inspección y plan técnico

## Inspección (2026-10-17)

Repositorio activo: `github/Edutictac/edutictac-prompt`; la copia `web/EduTicTacPrompt` es anterior. Árbol limpio antes del trabajo. No se despliega ni se publica.

- Frontend React/TypeScript/Vite, PWA Workbox con rutas relativas; sin router. `App.tsx` centraliza vistas y formularios, `style.css` define temas/responsive. Reutilizar navegación, tarjetas, formularios, portapapeles, biblioteca y destinos IA.
- Persistencia Dexie/IndexedDB v1: prompts y categorías. `SavedPrompt` separa texto generado, formulario, etiquetas y estado de sincronización. No modificar su contrato. Ampliación aditiva v2 para skills y revisiones.
- Autenticación opcional Authentik/OIDC+PKCE, sesión firmada HttpOnly; usuarios por `sub`. API hermana `github/web/edutictac-prompt-api`, FastAPI/SQLite, núcleo libre edutictac-community. Consultas de prompts filtradas por propietario. No hay catálogo público, moderación ni publicación comunitaria.
- IA: `followUps.ts` abre ChatGPT, Claude, Copilot M365, Gemini y Perplexity; NO hay inferencia API configurada ni herramientas/sandbox. Reutilizar destinos y copiar petición. Inferencia opcional en la API existente mediante un servicio compatible con Chat Completions configurado por administración; deshabilitado por defecto, sin claves en frontend. No equiparar Copilot web a una API.
- i18n propia, `Language`: es, ca-valencia, ca, en. Añadir diccionarios del módulo con mismas claves; separar idioma de interfaz, definición y respuesta.
- Docker: imagen nginx sirve dist, puerto 8092. Pages usa base relativa y rama pages; backend systemd separado. Ningún cambio a infraestructura obligatoria.
- Pruebas Vitest (generadores, traducciones, cliente API), pytest/TestClient en API. No configuración ESLint existente aunque package.json anuncia lint.
- Licencia AGPL-3.0 frontend; dependencias React, Dexie, Vite, Workbox, TS, Vitest. Nuevas dependencias libres acotadas: fflate (ZIP), yaml (frontmatter), react-markdown (preview sin HTML), fake-indexeddb y testing-library/jsdom para pruebas.

## Fases verificables y archivos

1. Diagnóstico/estándares y diseño: este archivo; fuentes oficiales Agent Skills, Codex/OpenCode y M365 (en documentación técnica).
2. Modelo/validación/catálogo: `src/skills/{types,model,seeds,repository}.ts`, `src/db.ts`. Esquema v2 aditivo; originales integrados inmutables, personalizados por propietario local o sub; historial separado. Riesgos: cambios de cuenta y edición concurrente.
3. Editor y gestión: `src/skills/{SkillsView,Editor,locales}.tsx/ts`, `src/App.tsx`, CSS. Formularios, preview segura, parámetros, recursos de texto, ejemplos, historial y conversión de prompts. Confirmación antes de borrar. Ningún archivo ejecutable.
4. Ejecución/asistencia: `src/skills/{execution,client}.ts`, vista de ejecución; ampliar API hermana con capacidades y proxy opcional autenticado y limitado. Petición visible, consentimiento, control de capacidades, errores genéricos, guardar resultados en biblioteca existente. Sin proveedor, uso manual externo y pegado de resultado/propuesta.
5. Seis skills educativas: semillas inmutables con ejemplos ES/VA y procedimientos reales; GIFT mediante generador determinista de un subconjunto válido a partir de preguntas estructuradas, nunca fingir PDF/Office.
6. Agent Skills: `src/skills/packages.ts`, ZIP validado antes de descomprimir (límites comprimidos/descomprimidos, recuento, CRC, rutas, symlinks, duplicados y tipos). SKILL.md estándar, metadatos en manifiesto separado. Exportaciones .agents/skills para Codex/OpenCode y raíz de paquete para Agent Builder M365; este último en preview, sin prueba de tenant.
7. Pruebas/docs/revisión: CRUD, propietarios, migración/prompts, validaciones, proveedores simulados, ZIP maliciosos, idiomas, pruebas de componentes, build frontend y pytest backend. Manuales ES/VA y arquitectura, migración/rollback, límites y despliegue sin publicar.

## Decisiones y límites

- Sin biblioteca pública ni Git automático: compartir ZIP o añadir manualmente el paquete a un repositorio. Publicación pública requiere una futura revisión/moderación de servidor.
- Offline no es una barrera criptográfica frente a otras personas con acceso al mismo perfil del navegador. Filtrar por propietario en app; servidor valida siempre la sesión. Sincronización skills independiente y explícita para no enviar contenido nuevo sin intención.
- No aceptar scripts/HTML/SVG/binarios en importación; paquetes fuera del subconjunto seguro se rechazan con mensaje. No existe detector infalible de prompt injection: contenido externo no confiable, revisión explícita, sin herramientas ni ejecución de código.
- El rollback conserva datos: exportar ZIP y volver al código previo manteniendo versión Dexie 2; no borrar stores ni reducir número de versión. SQL nuevo separado, reversible después de respaldo.
