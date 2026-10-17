# Modo básico de Agentes / Agents

## Decisiones de implementación

La sección entra en **Básico · Copilot M365** y ofrece cuatro ejemplos principales y un desplegable para los restantes. Se reutiliza el aspecto del selector sencillo/avanzado de Prompts. La navegación básica tiene Crear agente y Mis agentes. Avanzado conserva el editor completo, Ejemplos, historial y Compatibilidad con Agent Skills.

El formulario básico tiene cinco controles habituales: nivel, materia, finalidad, destinatarios y contexto opcional. La plantilla de rúbricas añade un sexto control para elegir criterios curriculares o un borrador docente. Nombre e idiomas están en un desplegable. No se presenta como una generación con IA: se prepara localmente mediante plantillas y el generador existente.

`BasicAgentFields` y el editor avanzado comparten el estado de `AgentBuilder`. Los cambios se propagan al borrador de `AgentsView`. Cambiar de modo no desmonta el editor ni reconstruye el diseño. Cambiar nivel o materia modifica solo ese campo, sin sustituir criterios, ejemplos, modos ni destinatarios personalizados. Sustituir la plantilla de un diseño modificado o guardado requiere confirmación.

El resultado utiliza los mismos controles de copia, guardado y validación en ambos modos. En básico muestra un resumen y separa Guardar en Mis agentes de Llevar a Copilot M365. La guía de traslado y las instrucciones completas se despliegan a petición; el botón de copiar instrucciones funciona con la vista previa cerrada. Preparar lleva el foco al resultado. El guardado sigue siendo local, con historial y controles de propietario existentes.

## Datos y compatibilidad

`AgentDraft` incorpora únicamente el campo opcional `rubricApproach`, con valores `curricular` y `draft`. Se valida antes de generar instrucciones y se guarda en el mismo borrador e historial. Los registros previos sin este campo siguen siendo válidos y conservan su comportamiento. No es necesario cambiar los índices ni la versión de Dexie; se mantiene el esquema v3.

El generador incorpora la regla de rúbricas en el idioma de las instrucciones generadas. En curricular pide criterios reales o una fuente verificable antes de afirmar alineación. En borrador permite proponer criterios docentes, identificándolos como propuesta y sin atribuirles carácter oficial. Las instrucciones no sustituyen la revisión docente ni garantizan el cumplimiento por parte del modelo.

La biblioteca de habilidades, los importadores y exportadores de paquetes y las comprobaciones de confianza continúan en Compatibilidad dentro de Avanzado. Una configuración M365 no se identifica como un paquete instalable de Agent Skills. No se requieren cambios en la API, nuevas claves ni servicios externos para el modo básico.

## Verificación

- Pruebas de componentes: entrada básica, preparación, copia real del contenido generado, guardado y reapertura de la política de rúbricas.
- Conservación de criterios y destinatarios personalizados al editar contexto y alternar entre modos.
- Confirmación y cancelación de sustitución de plantilla.
- Reglas de rúbricas y etiquetas en los cuatro idiomas; rechazo de políticas inválidas.
- Regresiones existentes de editor avanzado, historial, permisos, paquetes Agent Skills y Prompts.
- Chromium: escritorio de 1440 px y móvil de 390 px; castellano, valenciano, catalán e inglés. En rúbricas se observaron seis controles visibles y alturas de formulario de 913 px en escritorio y 1144 px en móvil, frente a 3870/4546 px del editor completo auditado. Sin desbordamiento horizontal ni errores de JavaScript en esos recorridos.

La comparación de alturas es descriptiva y no demuestra por sí sola facilidad de uso. Queda pendiente la ronda de observación con docentes propuesta en el [estudio UX](ESTUDIO-UX-AGENTES.md), así como validar creación y conversación dentro de una cuenta autorizada de edu.gva.es. No se ha accedido al tenant ni se declara que el agente esté instalado allí.

## Publicación y reversión

Se utiliza la compilación Vite/PWA y el procedimiento Pages existente. El servidor API y sus datos no requieren cambios. Una reversión debe conservar el esquema Dexie v3 y los diseños del navegador; no borrar IndexedDB ni volver a una versión anterior del esquema para deshacer un cambio visual.
