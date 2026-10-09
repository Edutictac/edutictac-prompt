# Changelog


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
