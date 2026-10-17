# Changelog


## 0.14.0 - Guía de ayuda

- Nueva sección «Ayuda» en el menú, con una guía corta en los cuatro idiomas: primer prompt en tres pasos, campos que más mejoran el resultado (con ejemplo antes/después), abrir en una IA, biblioteca, cuenta y sincronización, buen uso y preguntas frecuentes.
- Índice con enlaces a cada apartado y enlace directo a la guía con `#help`.

## 0.13.1 - Caso de Bachillerato en «Empieza aquí»

- Nuevo caso de Bachillerato: dilema ético sobre una IA que decide el orden de las operaciones en un hospital (Filosofía, 1.º).
- «Empieza aquí» muestra seis tarjetas, una por etapa, en una fila en escritorio.

## 0.13.0 - «Empieza aquí» por etapas

- La sección «Empieza aquí» ofrece un caso por etapa: Infantil (proyecto del huerto), Primaria (rúbrica de exposición oral), ESO (cuestionario GIFT de la célula), FP (reto de una reclamación de cliente) y personas adultas (factura de la luz).
- Se retiran el repaso GES y la nota a las familias de la portada; siguen disponibles como plantillas.
- Las cinco tarjetas caben en una fila en escritorio.

## 0.12.1 - Abrir en IA desde la biblioteca

- Cada prompt guardado muestra los botones «Abrir en…» (ChatGPT, Claude, Gemini, etc.) para lanzarlo directamente, con la IA preferida primero.
- El botón Copiar de la biblioteca confirma si se ha copiado.

## 0.12.0 - Editar prompts y «Empieza aquí»

- Al abrir un prompt de la biblioteca y cambiarlo, «Actualizar» sobrescribe el original (y lo sincroniza) en lugar de crear un duplicado. «Guardar como nuevo» sigue creando una copia.
- Nueva sección «Empieza aquí» en la portada con cuatro casos reales que abren el formulario ya relleno: factura de la luz (FPA), repaso de la prueba GES en Aules (FPA), rúbrica de una exposición oral (Primaria) y nota a las familias para una salida.

## 0.11.1 - Texto de portada

- Quita «Tus datos se quedan en tu dispositivo» de la portada: con la sincronización ya no es exacto. El detalle está en Privacidad.

## 0.11.0 - Sincronización automática

- Con la sesión iniciada, cada prompt que guardas, duplicas o importas se sube solo a tu biblioteca del servidor.
- Al entrar se descargan tus prompts y se suben los que estaban pendientes en el dispositivo.
- Sin conexión los prompts se guardan en local y se suben solos al volver la red. El botón «Sincronizar» se mantiene para forzarlo.

## 0.10.1 - Tema y privacidad

- Botón ☾/☀ en la cabecera para alternar entre modo claro y oscuro con un clic (sustituye al desplegable; sigue el sistema hasta el primer clic).
- El texto de privacidad explica el inicio de sesión y la sincronización con el servidor de la comunidad, y enlaza a la política completa de edutictac.es.

## 0.10.0 - Educación de personas adultas

- Añade «Educación de personas adultas» como nivel en todas las plantillas, con traducción a valenciano, catalán e inglés.
- Con este nivel, el contexto del prompt pide trato adulto sin infantilizar, situaciones reales de la vida cotidiana y del trabajo, aprovechar la experiencia previa y materiales legibles en el móvil.
- Sugerencias propias de FPA para tema, contexto, barreras, condiciones y objetivos (factura de la luz, cita médica, nómina, prueba GES…), mostradas antes de las generales.
## 0.9.0 - Formatos de documento

- Añade PDF, ODT y DOCX a los formatos de salida de las plantillas compatibles.
- Indica a la IA cómo preparar el archivo descargable o, si no puede generarlo, el contenido listo para exportar.

## 0.8.0 - Nuevas herramientas para el aula

- Añade nueve plantillas: tutoría socrática, analogías, participación equitativa, mediación de conflictos, cuestionario tipo test con explicaciones, dilemas éticos, plan de estudio, entrevista histórica y tutoría de código.
- Incluye ejemplos precargados y traducciones al español, valenciano, catalán e inglés.

## 0.1.0 - MVP inicial

- PWA local-first con IndexedDB/Dexie.
- Formularios dinámicos, generación y edición de prompts.
- Biblioteca con categorías, etiquetas, favoritos, duplicación y búsqueda.
- Importación/exportación JSON versionada y exportación Markdown.
- Idiomas es, ca-valencia, ca y en.
- Docker y documentación inicial.


## 0.15.0 — Skills

- Apartado integrado Skills: catálogo, editor visual, biblioteca privada e historial.
- Seis Skills educativas con ejemplos en castellano y valenciano; interfaz en los cuatro idiomas existentes.
- Parámetros tipados, Markdown seguro, conversión de prompts y resultados en la biblioteca actual.
- Creación asistida y peticiones para asistentes existentes, incluido Copilot M365; API de inferencia opcional.
- Paquetes Agent Skills para Codex/OpenCode y exportación de raíz para Agent Builder M365 (preview).
- Validación de importaciones ZIP, revisión de confianza y bloqueo de herramientas/scripts.
- Migración Dexie v2 aditiva; sincronización privada de Skills mediante API 0.2.0.
- Documentación docente ES/VA y técnica; pruebas de regresión, permisos, UI y archivos maliciosos.

## 0.16.0 — Preparar agentes M365 para cursos

- Entrada inicial Agentes M365 para configurar una vez un asistente del curso o un comportamiento educativo especializado.
- Nombre, descripción, instrucciones permanentes, fuentes previstas y preguntas iniciales listos para copiar en los campos de Agent Builder.
- Guía de práctica descargable y referencias en texto para añadir manualmente a conocimientos; sin acceso automático a cuentas ni materiales.
- Validación de límites de Agent Builder, revisión de confianza y bloqueo de Skills con herramientas externas.
- Mantiene catálogo, editor, bibliotecas y exportación Agent Skills para Codex/OpenCode y M365 preview.
