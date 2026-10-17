# Arquitectura y operación del módulo Skills

## Integración

Se amplía la aplicación React/TypeScript existente. `App.tsx` añade una vista cargada mediante `React.lazy` y guarda peticiones/resultados mediante `SavedPrompt` y la biblioteca actual. El cliente `apiRequest` mantiene cookies y errores HTTP; `followUps.ts` conserva los asistentes y sus URLs existentes. No se exige ningún servicio nuevo para usar editor, catálogo, paquetes o asistentes web. El CSS usa las variables de tema del proyecto y formularios responsivos.

`src/skills/` contiene:

| Archivo          | Responsabilidad                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| `types.ts`       | Contratos de definición, parámetros, recursos, Skill y revisión               |
| `model.ts`       | Validación estricta por campos, creación de borradores y errores localizables |
| `repository.ts`  | CRUD Dexie por propietario, transacciones e historial                         |
| `seeds.ts`       | Seis originales educativos inmutables con ejemplos ES/VA                      |
| `Editor.tsx`     | Formularios, parámetros y Markdown sin HTML, imágenes ni enlaces activos      |
| `SkillsView.tsx` | Catálogo, editor, detalle, ejecución, IA asistida y GIFT                      |
| `execution.ts`   | Peticiones, propuestas IA y generador determinista GIFT                       |
| `packages.ts`    | Frontmatter estándar y ZIP seguro                                             |
| `client.ts`      | Capacidades, inferencia y sincronización opcionales                           |
| `locales.ts`     | Diccionarios para las cuatro lenguas existentes                               |

La API hermana añade `app/skills.py`, montado desde `app/main.py`. Usa la sesión Authentik, SQLite y httpx existentes. No se cambian los contratos ni las tablas de prompts.

## Datos y migración

La migración Dexie v2 conservó `prompts` y `categories` y añadió `skills` (id, ownerId, slug, updatedAt) y `skillRevisions` (key, skillId, ownerId). La actualización ocurre al abrir la base mediante la migración de Dexie. Las revisiones guardan instantáneas y se escriben en la misma transacción que la Skill. No se guardan claves IA ni credenciales.

`SkillDefinition` contiene información general, idioma de definición, etapa, licencia y versión, instrucciones, parámetros tipados, procedimiento, recursos textuales, ejemplos, formato esperado, requisitos, restricciones y modalidad. `Skill` añade UUID, propietario, origen, estado, visibilidad privada, revisión, fechas, revisión de confianza y marca local de sincronización. Una Skill integrada se duplica para personalizarla; sus datos no se escriben en las tablas personales.

Los propietarios locales son `local:device` o `oidc:<sub>`. El repositorio verifica propiedad en edición, borrado, historial y duplicado; detecta edición de una revisión obsoleta. La API deriva el propietario de la sesión, nunca del cuerpo. SQLite emplea clave compuesta `(owner_id, skill_id)` y sentencias parametrizadas. El control de revisión y escritura se serializa con `BEGIN IMMEDIATE`. Un conflicto devuelve 409 sin sobrescribir.

La tabla SQL `skills` se crea de forma aditiva e idempotente al iniciar la API. `deploy/skills-up.sql` documenta la misma migración y `skills-down.sql` su reversión manual. Antes de actualizar, respaldar SQLite con su API de backup. El rollback de servidor puede volver al código previo conservando esta tabla; no es necesario eliminarla. En frontend no se debe volver al código con una versión de Dexie inferior a la base ya migrada: en 0.17.0 se debe conservar la declaración v3 y sus almacenes aunque se oculte el módulo. Exportar paquetes antes de cualquier limpieza. Nunca borrar IndexedDB como procedimiento de actualización.

El historial completo permanece en el dispositivo. La sincronización explícita sube solo las Skills de la cuenta y descarga sus estados actuales; no hay publicación pública ni sincronización en vivo. Eliminar una copia conocida como sincronizada elimina primero la remota; si la red falla se conserva la local. Otro dispositivo con una copia antigua puede volver a subirla: no hay tombstones distribuidos en esta versión. No se importan automáticamente las Skills del espacio sin cuenta a una cuenta autenticada.

## Validación e intercambio

Se emplea `yaml` con claves únicas, errores sintácticos estrictos y sin expansión de alias. `name` y `description` son obligatorios; el nombre debe coincidir con la carpeta y usar ASCII minúsculas, números y guiones simples (subconjunto común con OpenCode). Solo se aceptan los campos estándar: name, description, license, compatibility, metadata string→string y allowed-tools. Ningún permiso de allowed-tools se activa: en paquetes externos implica modalidad externa.

El ZIP de Codex/OpenCode contiene `.agents/skills/<slug>/SKILL.md`, manifiesto `edutictac.json` y recursos. El de Agent Builder M365 contiene esos archivos directamente en raíz. El manifiesto versionado guarda la definición propia, sin propiedad ni sesiones. En la reimportación se comprueba que coincidan metadatos, cuerpo renderizado y recursos; no puede ocultar instrucciones distintas de las mostradas en SKILL.md. Los paquetes estándar sin manifiesto también se importan. Si declaran requisitos externos se marcan conservadoramente como externos.

Antes de descomprimir se inspeccionan directorio central, cabeceras locales, tamaños, recuento, compresión, duplicados, solapamientos, rutas y atributos de enlace simbólico. Se rechazan cifrado, volúmenes múltiples y ZIP64. Después se comprueban tamaño real, CRC y UTF-8. Límites: 2 MB comprimido, 100 KB por archivo, 1,5 MB total, 40 entradas. Se permite una Skill, con raíz plana, carpeta `<slug>/` o `.agents/skills/<slug>/`. Solo se admiten SKILL.md, manifiesto y recursos de texto `.md/.txt/.csv/.json` directamente en references/ o assets/. No hay extracción al sistema de archivos, scripts, HTML, SVG ni documentos binarios. Las extensiones no bastan para acreditar confianza; todo contenido importado permanece sin revisar hasta confirmación expresa.

El cuerpo exportado incorpora instrucciones, procedimiento, descripción de parámetros, salida, restricciones, ejemplos y enlaces relativos a referencias. Los parámetros internos no son un protocolo estándar de invocación: cada agente obtiene los datos dialogando con el usuario. La compatibilidad verificada es estructural y de ida/vuelta; no se ha realizado una ejecución de aceptación dentro de Codex/OpenCode ni una carga en un tenant Microsoft.

## Inferencia y asistentes

La app anterior no tenía inferencia configurada: solo enlaces de asistentes. Se reutiliza ese mecanismo para ejecutar manualmente las instrucciones y para la creación asistida. Nunca se presenta un enlace como ejecución API ni como instalación de una Skill nativa.

La API añade opcionalmente un adaptador Chat Completions sin SDK ni dependencia comercial. Admite un servicio configurado por administración (por ejemplo un despliegue propio compatible); no acepta URLs ni claves desde el cliente. Configuración **solo de servidor**:

- `PROMPT_AI_BASE_URL`: raíz compatible, terminada en `/v1`, sin credenciales en la URL.
- `PROMPT_AI_MODELS`: modelos autorizados separados por comas.
- `PROMPT_AI_NAME`: nombre público del servicio para el consentimiento.
- `PROMPT_AI_API_KEY`: opcional, solo cuando lo requiera ese servicio. Mantenerla en el EnvironmentFile protegido; nunca usar prefijos `VITE_` para secretos.

Sin URL/modelos se anuncian cero proveedores y el módulo sigue funcionando. M365 Chat no se añade como proveedor API: no existe aquí integración Graph/Entra ni se reutiliza su sesión para inferencia directa. El adaptador se ha probado con transporte simulado; una integración real necesita prueba con el servicio elegido antes de habilitarse.

Endpoints: `GET /api/skills/capabilities`, `GET /api/skills`, `PUT/DELETE /api/skills/{id}`, `POST /api/skills/infer`. La escritura exige sesión, JSON y Origin autorizado; CORS añade POST. Se limitan los cuerpos por streaming. Inferencia exige consentimiento, proveedor/modelo permitido, idioma válido, definición y parámetros válidos, revisión confirmada y propiedad para contenidos personales. Las Skills externas se bloquean. La petición visible del navegador se envía como mensaje de usuario exactamente como fue revisada, acompañada de una política de sistema fija. La petición visible sigue siendo contenido no confiable: no es un límite de seguridad contra un cliente modificado. No se proporcionan herramientas ni se ejecuta código. Hay límite de una llamada concurrente y diez/minuto por usuario y proceso, timeout de 60 s y límites de respuesta/tokens. Los errores no incluyen cuerpo del proveedor, datos de entrada ni secretos. Para múltiples workers se necesitaría un limitador compartido.

Las propuestas IA nunca se publican: se validan y abren en el editor antes de guardarlas. Los resultados son texto; Markdown no procesa HTML ni descarga imágenes ni activa enlaces. GIFT se genera localmente desde preguntas de respuesta única revisadas con escape de caracteres. No se anuncian PDF, DOCX, SCORM u otros archivos generados por este módulo. La importación GIFT contra Moodle/Aules requiere una prueba de curso; no forma parte de los tests locales.

## Seguridad y privacidad

La revisión y separación de datos reducen riesgos de inyección de instrucciones; no existe detección infalible. El usuario debe revisar recursos e instrucciones y confirmar el envío a un tercero. Los originales no contienen datos personales. Las Skills privadas se aíslan por sub en el servidor; IndexedDB no cifra ni protege frente al propietario del perfil del navegador. No se implementa biblioteca pública porque no existe un sistema previo de moderación. Compartir es descargar ZIP; no se envían mensajes ni se crean repositorios automáticamente.

## Pruebas y despliegue

Frontend: `npm ci`, `npm test`, `npm run build`, `npm audit`. Vitest cubre CRUD, revisiones, propietarios, migración v1→v2 preservando prompts, parámetros, idiomas, propuestas, ejecución, paquetes válidos/maliciosos, renderizado seguro y flujos de formularios. Se conserva la suite previa del generador. La API usa `.venv/bin/pytest -q` con sesiones simuladas, control de origen, límites, aislamiento y proveedor simulado. La revisión Chromium comprueba escritorio/móvil y ausencia de errores y desbordamiento. No se añaden pruebas que llamen a servicios IA reales ni datos de producción.

Docker continúa sirviendo `dist` por nginx, sin cambio de puertos. Pages mantiene rutas relativas y caché Workbox versionada. Publicar la API primero (copia de seguridad, actualización del código y reinicio del servicio existente), comprobar health y capacidades y después publicar frontend siguiendo `scripts/publish-pages.sh`. La nueva PWA debe mostrar el aviso de actualización; verificar versión de `sw.js` y carga de Skills en la URL publicada. Si la API antigua no se actualiza, los flujos locales y externos funcionan; la sincronización de Skills y la inferencia directa no están disponibles.

## Fuentes oficiales consultadas (2026-10-17)

- [Agent Skills: especificación](https://agentskills.io/specification)
- [OpenCode: Skills y descubrimiento en .agents](https://opencode.ai/docs/skills/)
- [Codex: documentación de Skills](https://developers.openai.com/codex/skills)
- [M365: Skills en agentes declarativos, preview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/declarative-agent-skills)
- [Agent Builder: ZIP con SKILL.md en raíz](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-add-skills)
- [Ollama: protocolo Chat Completions compatible](https://docs.ollama.com/api/openai-compatibility)

Los límites de M365 pueden cambiar y su documentación condiciona la disponibilidad a Frontier/licencia/políticas. La app impone un subconjunto más pequeño y seguro. Verificar en el tenant antes de afirmar compatibilidad operativa.

## Guía de agentes M365 (0.16.0)

`AgentBuilder.tsx`, `agents.ts` y `agentLocales.ts` añaden un formulario de preparación para cursos. Se abre en la pestaña inicial Agentes M365 y desde una Skill revisada compatible. Produce campos separados para Agent Builder, preguntas iniciales y una guía Markdown descargable. No crea una sesión M365, no publica agentes ni conecta a cursos. Los recursos textuales pueden descargarse como `.txt` para añadirlos manualmente en Conocimientos; no se incrustan como supuestos documentos disponibles. No hay cambio de esquema ni backend. La [práctica docente](AGENTES-M365-CURSOS.md) describe configuración, materiales y prueba de aceptación dentro de la cuenta educativa.

## Reorientación a Agentes / Agents (0.17.0)

La entrada canónica pasa a `#agents`; `#skills` sigue funcionando como alias y se normaliza. La navegación usa Agentes en ES y Agents en VA/CA/EN. `src/agents/AgentsView.tsx` ofrece Diseñar, Ejemplos, Mis agentes y Compatibilidad. La antigua vista de habilidades se conserva dentro de Compatibilidad, separada conceptualmente.

`AgentDraft` se amplía con nivel, materia libre, papel, modos de trabajo con condiciones, criterios, catálogo de errores, estructura de respuesta, tono, máximo de preguntas, tratamiento de una propuesta cada vez, restricciones, ejemplos, preguntas iniciales e idioma de respuesta automático o fijo. La generación es determinista, sin llamada IA: estructura las decisiones docentes. Los límites M365 se validan sin truncado. Un cambio de nivel proporciona contexto al agente, sin prometer adaptación curricular oficial automática.

Dexie v3 añade `agents` y `agentRevisions`. Los diseños se guardan por propietario con transacciones, historial, detección de revisión obsoleta y controles de propiedad en edición, duplicado, historial y borrado. Se conserva la instantánea de una Skill de origen cuando corresponda. Esta biblioteca nueva es local; no hay endpoints ni sincronización remota de agentes. Los almacenes previos de prompts y Skills no cambian ni se borran. La migración v2→v3 está probada con datos de ambos tipos.

Rollback: mantener declarada la versión 3 de Dexie aunque se vuelva a ocultar la nueva interfaz; no abrir una base migrada con código que solo declare v2 ni borrar IndexedDB. Las revisiones completas y los diseños permanecen en el navegador. Descargar las guías conserva copias legibles. Las guías docentes actuales son `AGENTES-USO.md` y `AGENTS-US.md`.
