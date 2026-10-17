# Preparar agentes M365 para cursos con cuentas edu.gva.es

El objetivo es que una práctica del curso termine con un agente que el profesorado pueda volver a abrir y utilizar en Microsoft 365. EduTicTac prepara la configuración; el agente se crea y funciona en M365.

## Antes de una formación

Con una cuenta educativa representativa, comprobar que aparecen **Agentes → Crear agente → Configurar** y **Probar**. Los permisos, licencias y fuentes disponibles dependen de la organización. No se ha verificado que todas las cuentas edu.gva.es tengan habilitada la creación. Preparar una alternativa de demostración si los participantes solo pueden consultar agentes existentes.

La creación habitual de agentes usa nombre, descripción, instrucciones, conocimientos y preguntas iniciales. Es distinta de importar un ZIP de Skill, que Microsoft mantiene como función adicional en Frontier preview. Esta práctica utiliza la configuración habitual y no depende de esa vista previa.

## Práctica: crear un agente del curso

1. En EduTicTac, abrir **Skills → Agentes M365**. Es la entrada inicial del módulo.
2. Elegir **Asistente general del curso** o un comportamiento especializado, como **Crear rúbricas**. También puede abrirse una Skill de la biblioteca y pulsar **Preparar un agente M365 con esta Skill**.
3. Indicar el nombre del curso, destinatarios y para qué ayudará el agente. Revisar el nombre y la descripción propuestos.
4. Anotar los nombres de los materiales que se añadirán dentro de M365 y elegir el idioma habitual de respuesta.
5. Pulsar **Preparar configuración**. La app genera instrucciones permanentes y tres preguntas iniciales. No llama a un proveedor IA ni necesita clave API.
6. Abrir M365 con la cuenta educativa: **Agentes → Crear agente → Configurar**. Copiar cada campo en su apartado: nombre, descripción, instrucciones y preguntas iniciales. Son instrucciones permanentes: no se pegan en una conversación de chat ordinaria.
7. En **Conocimientos**, añadir los documentos autorizados del curso mediante las opciones disponibles en esa cuenta. Escribir el nombre de un documento en EduTicTac no da acceso a su contenido. Las referencias de texto de una Skill pueden descargarse como `.txt` y añadirse manualmente si la cuenta admite archivos.
8. En **Probar**, realizar las comprobaciones indicadas abajo. Cuando funcione, pulsar **Crear**.
9. En próximas sesiones, abrir el agente guardado y escribir únicamente la nueva tarea. Descargar la guía de EduTicTac para conservar la configuración o repetir la práctica en otra edición del curso.

El formulario de preparación no se guarda automáticamente al salir de su pestaña. Descargar la guía permite conservar una copia. El agente creado en M365 se gestiona allí.

## Ejemplo de formación docente

- Curso: «Evaluación formativa con IA».
- Destinatarios: profesorado de Primaria participante en el curso.
- Comportamiento: Crear rúbricas.
- Finalidad: ayudar a diseñar y revisar rúbricas para tareas del aula, distinguiendo criterios docentes propuestos de criterios oficiales aportados.
- Materiales: guía del curso, criterios de evaluación seleccionados y ejemplos de rúbricas.
- Primera tarea: «Necesito una rúbrica para una exposición sobre el ciclo del agua. Propón criterios docentes provisionales; no los presentes como currículo oficial».

Para un asistente sobre contenidos del curso, elegir el comportamiento general y aportar la guía, calendario, actividades e instrucciones autorizadas. Las instrucciones hacen pedir lo imprescindible, citar las fuentes realmente disponibles y reconocer cuando falta información. No garantizan que el modelo siempre lo cumpla: la prueba de aceptación forma parte de la práctica.

## Comprobación antes de compartir

- Pregunta con respuesta en un documento: comprobar que el agente usa el apartado correcto.
- Pregunta sin respuesta en los documentos: comprobar que lo reconoce y no inventa información del curso.
- Tarea práctica: comprobar que produce un recurso útil y revisable, sin pedir datos opcionales innecesarios.
- Petición curricular: comprobar que distingue los criterios oficiales proporcionados de las propuestas docentes.
- Revisar personas destinatarias y permisos de los materiales antes de compartir. Usar ejemplos sin datos personales del alumnado.

Copiar instrucciones no conecta automáticamente el agente con Aules, edu.gva.es, OneDrive ni SharePoint. Las fuentes y las capacidades se habilitan dentro de M365 conforme a los permisos disponibles.

## Compatibilidad conservada

**Explorar**, **Crear**, **Mis Skills** e **Importar y exportar** siguen disponibles. Codex y OpenCode conservan el ZIP `.agents/skills/<slug>/SKILL.md`. El ZIP de raíz para Skills nativas de M365 continúa siendo una opción adicional, sujeta a Frontier; no es necesario para la práctica anterior.

## Detalles técnicos

`agents.ts` transforma una definición revisada en instrucciones para los campos de Agent Builder; no declara que una Skill sea un agente ni simula su ejecución. `AgentBuilder.tsx` añade formularios, copia por campo, descarga Markdown y recursos de texto. `agentLocales.ts` conserva los cuatro idiomas de interfaz. No hay migración ni API nueva. Se rechazan Skills no revisadas o que exigen herramientas externas. Los materiales se tratan como nombres de referencia y su contenido no se incrusta en las instrucciones.

Se validan los límites documentados de 30 caracteres de nombre, 1.000 de descripción y 8.000 de instrucciones. Si una configuración es demasiado larga se rechaza con un mensaje; no se trunca la conducta de la Skill.

Fuentes oficiales consultadas el 2026-10-17:

- [Crear y configurar agentes](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-build-agents)
- [Añadir y verificar fuentes de conocimiento](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-add-knowledge)
- [Disponibilidad adicional de Skills nativas](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-add-skills)
