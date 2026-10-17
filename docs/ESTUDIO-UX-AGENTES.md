# Estudio de primer uso: Agentes / Agents

Fecha: 17 de octubre de 2026. Versión analizada: 0.17.0.

## Conclusión y alcance

Se recomienda ofrecer **Básico · Copilot M365** como entrada predeterminada y **Avanzado** para la edición completa y el acceso a otros entornos. Ambos deben trabajar sobre el mismo diseño guardado. Cambiar de modo no debe eliminar ni sustituir ajustes.

El modo básico debe ayudar a preparar un asistente docente reutilizable: elegir una tarea, adaptarla al contexto educativo y llevar su configuración a M365. No debe exigir que el profesorado redacte un sistema de instrucciones desde cero.

Este documento es una auditoría de la interfaz, del código y de documentación pública, con una propuesta de diseño. **No es una prueba de usabilidad con docentes ni una validación dentro del tenant edu.gva.es.** No se ha modificado ni desplegado la interfaz como parte del estudio.

## 1. Evidencias de la interfaz actual

Se revisaron la navegación, los formularios, las plantillas, el generador de instrucciones y la persistencia. Se midió la aplicación publicada con Chromium, idioma castellano, perfiles nuevos y ventanas de 1440 × 900 y 390 × 900. En Agentes se abrió el formulario personalizado inicial; en Prompts, la primera tarjeta de inicio en modo sencillo.

| Medida | Agentes actual | Prompts sencillo, plantilla observada |
| --- | --- | --- |
| Controles visibles en el formulario | 25 | 7 |
| Controles marcados como obligatorios en HTML | 11 | No medido |
| Áreas de texto | 14 | No medido |
| Altura del formulario a 1440 px de ancho | 3870 px | 1279 px |
| Altura del formulario a 390 px de ancho | 4546 px | 1411 px |

Los recuentos incluyen `input`, `select` y `textarea` visibles, no botones. Las alturas corresponden a los contenedores de formulario, no a toda la página. Son una fotografía de esas configuraciones, no una medida de todas las plantillas ni una prueba de dificultad por sí mismas. Se obtuvieron mediante `.agent-builder form` y `.form-panel`; las etiquetas obligatorias no sustituyen al análisis de las validaciones del generador.

Problemas detectados y prioridad:

| Prioridad | Observación | Efecto probable que debe comprobarse |
| --- | --- | --- |
| Alta | El inicio abre un diseño personalizado con cuatro bloques extensos. | Sensación de tener que saber diseñar un agente antes de empezar. |
| Alta | Se piden nombre, descripción, papel, finalidad y destinatarios por separado. | Repetición y dificultad para distinguir qué escribir en cada campo. |
| Alta | Se muestran dos modos con nombre, activación y comportamiento. | El docente tiene que pensar en lógica de conversación demasiado pronto. |
| Alta | La salida exige trasladar varios campos a otra aplicación. | Confusión entre guardar en EduTicTac, pegar en el chat y crear el agente en M365. |
| Media | Compatibilidad está al mismo nivel que Diseñar y Mis agentes. | Codex, OpenCode y paquetes pueden distraer del objetivo inicial. |
| Media | Muchos avisos y explicaciones aparecen antes de obtener un resultado. | La información útil puede perderse entre textos previos. |
| Media | Adaptar nivel y materia no aporta automáticamente criterios curriculares. | Expectativas de una rúbrica oficial completa sin aportar fuentes. |

El incidente relatado por el usuario —Copilot pidió los criterios curriculares— es una señal concreta de desajuste de expectativas. Pedir información imprescindible puede ser correcto; el diseño debe anticiparlo y explicar qué se necesita para cada tarea.

## 2. Principios de la propuesta

Mostrar primero las decisiones frecuentes y dejar las especializadas a petición sigue el patrón de [divulgación progresiva de NN/g](https://www.nngroup.com/articles/progressive-disclosure/). La separación debe validarse con usuarios; ocultar campos sin revisar las tareas no garantiza sencillez.

Los formularios deben pedir solo información necesaria, explicar su propósito y conservar las respuestas al retroceder, siguiendo las recomendaciones de [GOV.UK para páginas de preguntas](https://design-system.service.gov.uk/patterns/question-pages/).

Microsoft permite crear agentes describiéndolos o configurándolos, y ofrece plantillas y pruebas. Nuestra aportación debe ser la preparación pedagógica reutilizable, los ejemplos y las adaptaciones educativas. La salida básica se orientará a los campos de Configurar; la disponibilidad efectiva se comprobará en la cuenta del curso. Véase [Agent Builder de Microsoft](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-build-agents).

## 3. Navegación y reparto entre modos

Mantener **Agentes** en castellano y **Agents** en valenciano. Reutilizar el selector visual de modo de Prompts, con selección perceptible y accesible por teclado.

En básico, la navegación principal será **Crear agente · Mis agentes**. Los ejemplos serán el comienzo de Crear, evitando una pestaña adicional que el usuario tenga que descubrir. El cambio a Avanzado permanecerá visible, sin convertirlo en un requisito para guardar o copiar.

| Capacidad | Básico · Copilot M365 | Avanzado |
| --- | --- | --- |
| Inicio | Elegir una tarea docente con ejemplo | Plantillas y diseño completamente personalizado |
| Contexto | Nivel, curso opcional, materia/ámbito | Contexto detallado, papel y destinatarios específicos |
| Comportamiento | Propuesto por plantilla, explicado en lenguaje cotidiano | Modos, activación, criterios, errores, tono y formato editables |
| Idiomas | Responder en el idioma de quien escribe; cambio opcional | Idioma de instrucciones y de respuesta por separado |
| Resultado | Resumen, campos para copiar y guía de prueba en M365 | Instrucciones completas y recursos detallados |
| Guardar y reutilizar | Guardar, abrir, adaptar y duplicar | Además, historial detallado y restauración |
| Otros entornos | Sin selectores técnicos en el recorrido inicial | Biblioteca Agent Skills y paquetes para Codex/OpenCode |
| Privacidad y límites | Ayudas breves en el momento pertinente | Las mismas protecciones y explicaciones ampliadas |

La documentación y los botones deben distinguir un **agente configurado en M365** de una **habilidad exportable**. No prometer que un ZIP de Agent Skills instala por sí mismo un agente de Microsoft. Mantener la compatibilidad existente con Codex y OpenCode, con sus validaciones y límites actuales.

## 4. Recorrido básico propuesto

### A. Elegir para qué ayudará

Encabezado: «Prepara un asistente para tu trabajo docente».

Ayuda: «Elige un ejemplo, adáptalo a tu nivel y llévalo a Copilot M365».

Mostrar cuatro tarjetas iniciales: **Crear rúbricas**, **Adaptar actividades**, **Revisar y mejorar propuestas**, **Tutor de una materia**. Un botón «Ver todos los ejemplos» da acceso al resto, incluido el mentor SMART. «Otra tarea» permite describir una finalidad libre con valores iniciales editables; no debe aparentar una generación con IA si solo utiliza el generador local.

Las tarjetas explican el comportamiento, no solo el producto: «Revisa criterios, pregunta por los datos que falten y te ayuda a mejorar la rúbrica». El tutor requiere definir destinatarios y revisar el uso educativo antes de compartirlo con alumnado.

### B. Adaptar al contexto

Un formulario corto, con un máximo inicial de **cinco controles visibles**:

1. Nivel educativo.
2. Materia, ámbito o especialidad, con sugerencias y texto libre.
3. «¿En qué quieres que te ayude?» precompletado con la finalidad de la plantilla.
4. «¿Para quién es?» con opciones sencillas: para mi trabajo docente, para un equipo docente o para alumnado. Cualquier valor sugerido será visible y modificable.
5. «¿Qué debe tener especialmente en cuenta?» opcional, con ejemplo contextual.

«Añadir curso e idioma» despliega esos ajustes. Los campos específicos de la tarea se presentan cuando proceden; el límite de cinco es una hipótesis para la primera pantalla, no una restricción que justifique ocultar información imprescindible.

Nombre, descripción, papel, modos, tono, estructura y preguntas iniciales parten de la plantilla y del contexto. El resumen muestra las decisiones propuestas y permite cambiarlas. No hace falta llamar a una IA ni enviar datos a un servicio para completar este recorrido.

Acción principal: **Preparar mi agente**. Evitar «Ejecutar», «Exportar configuración» o «Publicar» en este punto.

No se recomienda un asistente de muchas pantallas con una pregunta en cada una: sería una ruptura con Prompts y añadiría clics. Preferir elección de ejemplo, formulario compacto y resultado guiado; mantener Atrás sin perder cambios.

### C. Revisar y llevar a Copilot

Presentar primero un resumen: «Ayudará al profesorado de Primaria a crear y revisar rúbricas. Pedirá los criterios cuando sea necesario y responderá en el idioma de la conversación».

Separar dos acciones y sus estados:

- **Guardar en Mis agentes**: guarda el diseño localmente en EduTicTac; no lo publica ni lo sincroniza con Microsoft.
- **Llevar a Copilot M365**: abre una guía con los campos y botones para copiar. No crear la impresión de instalación automática.

La guía debe indicar: abrir Agentes en M365, crear/configurar, copiar Nombre, Descripción e Instrucciones, añadir allí los conocimientos autorizados si son necesarios y probar. Mostrar las instrucciones completas en un desplegable, con el botón Copiar accesible sin leer todo el bloque. Las preguntas iniciales se ofrecen después como mejora opcional.

Evitar copiar los tres campos como un solo mensaje para pegar en un chat ordinario. Explicar: «Pégalo en Instrucciones de tu agente, no en una conversación». La guía conservará pasos anteriores y el estado «Copiado», sin afirmar que se ha pegado o creado correctamente en M365.

Ofrecer tres mensajes de prueba propios de la plantilla: un caso habitual, uno incompleto y uno fuera de su función. La prueba real se hace en M365. No mostrar un simulador como si verificara el agente de Microsoft.

Si no aparece Crear agente, ofrecer una ayuda breve sobre permisos del centro. Una alternativa de uso como prompt debe etiquetarse como tal y no presentarse como un agente instalado.

### Esquema conceptual, no interfaz implementada

```text
Agentes                      [Básico · Copilot M365] [Avanzado]
[Crear agente] [Mis agentes]

¿Para qué quieres ayuda?
[Crear rúbricas] [Adaptar actividades]
[Revisar propuestas] [Tutor de una materia]   Ver todos

Adáptalo a tu contexto
Nivel             [Primaria                         v]
Materia o ámbito  [Conocimiento del Medio             ]
Finalidad         [Crear y revisar rúbricas…           ]
Destinatarios     [Para mi trabajo docente           v]
Ten en cuenta     [Opcional: exposiciones orales       ]
                     Añadir curso e idioma
                     [Preparar mi agente]

Resumen → [Guardar en Mis agentes] [Llevar a Copilot M365]
```

## 5. Resolver la fricción de los criterios curriculares

El agente es una herramienta reutilizable; una exposición sobre el ciclo del agua es una tarea concreta con la que se probará. No conviene fijar esa exposición como único propósito del agente.

En la plantilla de rúbricas, ofrecer un ajuste contextual comprensible:

- **Usar mis criterios curriculares**: permitir pegarlos o indicar que se aportarán después en M365. Explicar que el agente los pedirá antes de afirmar una alineación curricular. Un título de documento no implica que el agente pueda leerlo.
- **Proponer criterios docentes para revisar**: permitir un primer borrador con criterios observables, identificados como propuesta y sin atribuirlos a normativa oficial.

Para el ejemplo aportado: «Exposición oral sobre el ciclo del agua, 4.º de Primaria». En borrador, el agente puede proponer explicación del proceso, vocabulario y claridad oral; debe dejar explícito que son criterios docentes propuestos. En modo curricular, necesita los criterios reales o una fuente accesible y verificada.

En ambos casos debe producir una siguiente acción útil: pedir lo que falta con pocas preguntas y explicar por qué, o dar un borrador autorizado. No resolver la fricción inventando currículo ni obligar a rellenar una plantilla vacía como única salida.

## 6. Accesibilidad, confianza e idiomas

- Etiquetas persistentes; ejemplos junto al campo; no usar el placeholder como única ayuda.
- Tarjetas y selector de modo operables por teclado; foco visible, orden coherente y anuncio de cambios de paso, errores y copia.
- Errores en lenguaje cotidiano, asociados al campo; resumen si hay varios; conservación de todas las respuestas.
- Una columna en móvil, sin desplazamiento horizontal ni acciones que tapen campos. Comprobar zoom al 200 % y objetivos táctiles suficientes.
- Idioma de interfaz independiente del idioma del agente. Valenciano y castellano prioritarios; mantener también catalán e inglés. No asumir que el constructor conversacional de Microsoft admite todos los idiomas de la aplicación.
- Antes de abrir/copiar a M365: aviso breve de revisión de datos personales y de uso de documentos autorizados. No afirmar que los datos ya se han enviado al copiar al portapapeles.
- Mostrar «Guardado en este navegador» y recordar las limitaciones en equipos compartidos. La propiedad lógica actual no equivale a aislamiento entre personas que usan el mismo perfil del navegador.
- Conservar los límites del generador y la revisión de contenido importado. El modo básico no rebaja la seguridad.

## 7. Integración técnica y fases propuestas

No se necesita otro servicio, proveedor obligatorio ni una segunda aplicación. El núcleo seguirá siendo `AgentDraft` → `buildAgentConfiguration` → repositorio e historial existentes.

| Fase | Trabajo y archivos previsibles | Verificación |
| --- | --- | --- |
| 1. Estructura y entrada | `src/agents/AgentsView.tsx`, `src/agents/locales.ts`, estilos: selector como Prompts, básico predeterminado, ejemplos por tarea, Mis agentes en ambos modos. | Navegación, teclado, móvil y cuatro idiomas. |
| 2. Formulario básico | Nuevo componente `src/agents/BasicAgentBuilder.tsx` y adaptación de `src/agents/presets.ts`; reutilizar `src/skills/agents.ts`. | Cada plantilla produce una configuración válida; no inventa fuentes ni pierde datos. |
| 3. Salida guiada | Extraer para reutilizar los controles de copia y resultado de `src/skills/AgentBuilder.tsx`; traducciones en los módulos existentes. | Copia por campo, límites de M365, mensajes de error y casos de prueba. |
| 4. Cambios de modo y biblioteca | Compartir borrador y estado de edición; conservar `src/agents/repository.ts`, `src/skills/SkillsView.tsx` y los exportadores actuales. | Edición y restauración, propiedad, Codex/OpenCode y regresión de Prompts. |
| 5. Validación y documentación | Pruebas de componentes en `src/agents/`, guías `docs/AGENTES-USO.md` y `docs/AGENTS-US.md`, revisión con docentes y prueba autorizada en M365. | Métricas y criterios de salida de la sección siguiente. |

La preferencia de modo puede ser local y separada de la definición. No se prevé una migración de base de datos por mostrar menos campos. Si se decide persistir intención pedagógica adicional, revisar primero el esquema y el versionado, sin reutilizar campos con otro significado.

Riesgo principal: pasar de avanzado a básico y reconstruir el borrador desde la plantilla borraría personalizaciones. El formulario básico debe modificar únicamente los campos editados. Al cambiar nivel/materia, no reescribir criterios ni ejemplos ya personalizados sin una decisión explícita. Mostrar «Este diseño conserva ajustes personalizados» y ofrecer verlos. Aplicar otra plantilla debe requerir confirmación si reemplaza trabajo sin guardar.

Los diseños avanzados que no puedan representarse fielmente en básico se podrán consultar y adaptar en sus campos compatibles; nunca reducirlos silenciosamente. Mantener guardado, revisiones, límites y control de propietario sobre los mismos registros.

## 8. Validación con docentes antes de darlo por resuelto

Proponer una primera ronda con cinco o seis docentes sin experiencia configurando agentes, de distintas etapas y materias. Es una prueba cualitativa para detectar obstáculos, no una muestra representativa. La auditoría anterior no sustituye esta ronda.

Tareas sin instrucciones del facilitador:

1. Preparar un agente para rúbricas y adaptarlo a nivel y materia.
2. Explicar dónde está guardado y si ya existe en Microsoft.
3. Llevarlo a la cuenta M365 autorizada y probar un caso sin criterios curriculares.
4. Duplicarlo para otra materia; abrir ajustes avanzados y volver sin perder cambios.

Registrar ayudas necesarias, abandonos, errores de destino de pegado y dudas sobre datos o currículo. Medir por separado el tiempo hasta un diseño preparado en EduTicTac y hasta un agente probado en M365; los permisos del tenant pueden impedir completar la segunda tarea.

Objetivos propuestos, pendientes de validación:

- Al menos cuatro de cinco participantes completan un diseño sin ayuda y distinguen guardar de crear en Microsoft.
- Preparar el primer diseño en alrededor de cinco minutos como hipótesis de diseño, sin contar acceso o esperas de M365.
- Ninguna pérdida de campos al cambiar de modo; guardado, duplicación, historial y permisos mantienen sus pruebas.
- Ninguna afirmación de alineación curricular oficial sin criterios o fuente comprobable; los borradores están identificados.
- La creación y una conversación de prueba funcionan en al menos una cuenta del entorno del curso con permiso para ello. Si falta acceso, documentar el bloqueo y no declarar verificación en edu.gva.es.
- Revisar manualmente teclado, lector de pantalla y móvil; ejecutar las pruebas existentes y la compilación de producción tras implementar.

Registrar cada incidencia y repetir las tareas afectadas después de corregirla. No publicar porcentajes de mejora o ahorro de tiempo sin haberlos medido.

## 9. Decisión recomendada

Priorizar un primer agente útil y comprensible, con valores iniciales pedagógicos y cinco decisiones de contexto, antes de ampliar funciones. Mantener todo el editor actual y la compatibilidad con Codex/OpenCode en Avanzado. La primera entrega debe concentrarse en entrada básica, conservación de personalizaciones y traslado guiado a M365; después, contrastarla con docentes y con el entorno real del curso.
