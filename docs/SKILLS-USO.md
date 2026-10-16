# Skills para el profesorado

Un **prompt** es una instrucción puntual, por ejemplo «crea una rúbrica para esta exposición». Una **Skill** reúne una capacidad reutilizable: cuándo aplicarla, instrucciones, pasos, parámetros, ejemplos y recursos. Un **agente** puede utilizar Skills y herramientas para actuar; EduTicTac prepara instrucciones y, si hay un proveedor configurado, solicita una respuesta de texto. No ejecuta scripts ni instala habilidades en otros servicios.

## Utilizar una Skill

1. Abre **Skills → Explorar**. Busca por texto o filtra por categoría, etapa e idioma de definición. Los ejemplos integrados están disponibles en castellano y valenciano; una interfaz inglesa puede mostrar definiciones en castellano, identificadas como tales.
2. Pulsa **Ver y utilizar**. Lee las instrucciones, ejemplos y restricciones. Puedes cargar una entrada de ejemplo.
3. Completa los parámetros y elige el **idioma de respuesta**, independiente del de la interfaz y de la definición. Pulsa **Preparar petición** y revisa el texto completo.
4. Para usar un asistente externo, confirma que puedes enviar esa información y pulsa **Copiar y abrir en…**. En Copilot M365, pega la petición en el chat. Usa tu cuenta habitual; no necesitas añadir claves a EduTicTac. El resultado no vuelve automáticamente.
5. Si la administración ha configurado un proveedor, aparecerán su nombre y los modelos disponibles. Confirma el envío y pulsa **Ejecutar con API**.
6. Revisa la respuesta, o pégala desde el asistente. Puedes copiarla, descargarla como Markdown y guardarla en la biblioteca existente. También puedes guardar la petición preparada como prompt reutilizable.

No introduzcas nombres, informes, identificadores ni información personal del alumnado. Las instrucciones importadas y los textos que revisas pueden contener órdenes ajenas a tu tarea: léelos antes de enviarlos. Una advertencia no garantiza detectar todas las instrucciones maliciosas. EduTicTac no concede herramientas ni acceso a archivos al modelo.

## Crear y personalizar

En **Crear**, escribe nombre, descripción y comportamiento deseado con palabras normales. El identificador se propone a partir del nombre. No hace falta escribir YAML, JSON ni conocer Markdown para usar el formulario.

- Define parámetros de texto, texto largo, número, selector, selección múltiple o sí/no. Asigna identificadores únicos y límites cuando proceda.
- Añade pasos, ejemplos de entrada/salida y formato esperado. Los recursos son textos locales escritos en el formulario, con rutas como `references/ejemplos.md`. No se abren enlaces ni se suben documentos binarios.
- Usa la vista previa para revisar las instrucciones. Indica licencia, versión y límites; después guarda.
- **Crear Skill con IA** prepara una solicitud que puedes usar con el proveedor disponible o copiar a Copilot M365 y otros asistentes. Si usas el flujo externo, pega la respuesta estructurada en «Propuesta de IA». El formulario la valida y la abre como borrador; no la publica ni guarda automáticamente. Si la respuesta no tiene la estructura esperada, puedes pedir al asistente que la corrija o completar el formulario directamente.
- **Convertir un prompt en Skill** permite partir de un prompt de tu biblioteca. Revisa cuándo debe utilizarse, añade parámetros y límites: convertir el texto no le concede herramientas.

Las Skills iniciales no se modifican. **Duplicar** crea una versión personal. En **Mis Skills** puedes editar, duplicar, eliminar y abrir el historial; restaurar crea una nueva revisión, conservando las anteriores. La versión editorial (por ejemplo 1.1.0) es independiente del número de revisión local.

## Importar, exportar y compartir

**Importar y exportar** acepta un ZIP con una sola Skill. Tras validarlo, se abre un borrador; guardar lo añade a tu biblioteca como contenido no confiable. Lee instrucciones y recursos y pulsa «He revisado…» antes de preparar una petición. Se rechazan scripts, HTML, binarios, rutas peligrosas y archivos que superen los límites. No todos los paquetes externos entran en este subconjunto seguro.

- **Codex / OpenCode:** el ZIP contiene `.agents/skills/<identificador>/SKILL.md`. Extráelo en la raíz de tu proyecto de confianza. Revisa los archivos antes de que el agente los descubra.
- **Copilot M365:** el ZIP contiene `SKILL.md` en la raíz, como pide Agent Builder. Si tu organización tiene habilitadas Skills en Frontier preview, abre el agente → Configure → Skills → Add y carga el ZIP completo. Prueba después un caso en «Try it». No basta con adjuntarlo a cualquier conversación. La validación real en el tenant depende de sus permisos, licencia y disponibilidad; no se ha comprobado con una cuenta de Microsoft en este desarrollo.
- Puedes compartir el ZIP por el canal que elijas o añadirlo manualmente a un repositorio Git. EduTicTac no crea enlaces públicos ni publica contenido comunitario. La revisión de seguridad sigue siendo necesaria en el destino.

Límites: ZIP hasta 2 MB; cada archivo hasta 100 KB; total descomprimido hasta 1,5 MB y 40 entradas. Se admiten referencias/recursos `.md`, `.txt`, `.csv` y `.json` a un nivel. Para M365, las instrucciones exportadas deben tener menos de 20 000 caracteres. El manifiesto propio también está sujeto al límite por archivo.

## Ejemplos educativos

- **Crear rúbricas:** aporta criterios y una tarea; obtendrás niveles con evidencias observables.
- **Adaptar actividades con DUA:** describe la actividad y sus barreras; obtendrás opciones que mantienen el objetivo.
- **Crear cuestionarios para Aules:** diseña preguntas con retroalimentación. El formulario GIFT permite introducir preguntas revisadas, elegir la respuesta correcta y descargar un archivo real de respuesta única. Escapa los caracteres reservados y comprueba la estructura que genera. Prueba su importación en un curso de ensayo: no se ha realizado una importación contra vuestro Moodle/Aules.
- **Diseñar situaciones de aprendizaje:** proporciona el contexto y los elementos curriculares; no se inventan códigos oficiales.
- **Crear materiales accesibles:** revisa lenguaje y estructura; una propuesta automática no certifica accesibilidad.
- **Revisar recursos educativos:** aporta el contenido; se distinguen observaciones y elementos no verificables.

Cada Skill inicial incluye una entrada y salida prácticas en castellano y valenciano. Revisa siempre las propuestas antes de utilizarlas en el aula.

## Guardado y cuentas

Las Skills se guardan en IndexedDB de este navegador. Sin sesión pertenecen al espacio local del dispositivo; con sesión al usuario autenticado. No se mezclan automáticamente. Cambiar de cuenta cambia la biblioteca visible. Quien controle el perfil del navegador puede acceder a su almacenamiento: usa perfiles separados en equipos compartidos y exporta copias de seguridad.

**Sincronizar Mis Skills** sube y descarga únicamente las Skills de esa cuenta, mediante la API actualizada. No sube el espacio sin cuenta. No hay sincronización en tiempo real. Eliminar una Skill ya sincronizada elimina su copia remota y requiere conexión; otros dispositivos que conserven copias antiguas pueden volver a subirlas al sincronizar. El historial completo es local: otros dispositivos reciben las revisiones actuales sincronizadas. Un conflicto conserva la copia local y muestra un error; exporta ambos borradores antes de decidir qué versión conservar.
