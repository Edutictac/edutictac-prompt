# Changelog

## 1.4.1 — 2026-11-28

- Protege los cambios locales pendientes frente a descargas y respuestas de sincronización simultáneas.
- Organiza los catálogos y el constructor de agentes en módulos más fáciles de mantener; conserva el generador de herramientas.

## 1.4.0 — 2026-11-28

- Editor visual para títulos, párrafos y listas, con posibilidad de añadir o quitar elementos con viñetas. El texto original se conserva para copiar, guardar y exportar.
- El contenido con formatos especiales permanece en el editor de texto original, sin conversión destructiva.

## 1.3.0 — 2026-11-28

- Filtros de favoritos, categoría, etiqueta y herramienta; orden por última modificación o título y búsqueda sin distinguir acentos.
- Edición de título, categoría, etiquetas, notas y favorito sin alterar el contenido. Cada tarjeta muestra su estado de sincronización.
- Los nombres de categoría se sincronizan junto al prompt para poder recuperarlos en otros dispositivos; los prompts antiguos los incorporan al sincronizar desde un dispositivo que conserve la categoría.

## 1.2.0 — 2026-11-28

- Agentes muestra documentos sugeridos según el ejemplo y permite anotar los que se añadirán en M365; la aplicación no adjunta esos documentos.
- Tres preguntas concretas y copiables ayudan a comprobar un caso habitual, uno incompleto y uno fuera de la función del agente.

## 1.1.0 — 2026-11-28

- El modo básico de Agentes muestra ejemplos para empezar y permite adaptarlos sin pasar por el modo avanzado.

## 1.0.0 — 2026-11-28

- El botón principal «Crear» abre directamente «Ayúdame a crear mi prompt».

- Configuración reúne perfil curricular predeterminado, formato, IA preferida, idioma, apariencia e importación/exportación de biblioteca.
- El perfil se aplica en herramientas compatibles; los elementos curriculares se siguen escogiendo por prompt y se limpian al cambiar a un nivel o materia incompatible.
- El perfil y la IA preferida se guardan en el navegador; el formato también puede sincronizarse con la cuenta.

## 0.44.0 — 2026-11-28

- Nueva sección Configuración para elegir el formato predeterminado y consultar su estado de sincronización; se retira ese ajuste de los formularios de cada herramienta.

## 0.43.0 — 2026-11-28

- El formulario indica si la preferencia de formato está en el navegador, sincronizándose, guardada en la cuenta o pendiente por un error.
- Accesos para continuar una actividad en evidencias o rúbrica, trasladando los datos disponibles y conservando el borrador al volver.

## 0.42.0 — 2026-11-28

- La preferencia de formato se sincroniza de manera privada con la cuenta, con respaldo local y reintento al recuperar conexión.

## 0.41.0 — 2026-11-28

- Preferencia local de formato de salida: se aplica cuando la herramienta lo admite, sin alterar herramientas con formatos propios. Los enlaces compartidos conservan el formato elegido.

## 0.40.0 — 2026-11-28

- Nueva ayuda para crear o mejorar prompts educativos mediante una conversación con la IA elegida.

- Opción para proponer inicios breves, accesibles y ajustados al tiempo disponible en la planificación de clases.
- Nueva herramienta de tarjetas de memoria para practicar y repasar, con texto de referencia opcional.

- Nuevas herramientas de estaciones de aprendizaje y evidencias de aprendizaje a partir de una actividad existente.

- Opciones para explorar conocimientos previos en planificación, preparar rúbricas y listas para coevaluación y solicitar aclaraciones breves cuando falten datos esenciales.
- El formato CSV de Aules mantiene sus reglas de importación al activar la coevaluación.

## 0.39.4 — 2026-11-28

- Atrás y Adelante del navegador recorren la portada, las herramientas y las vistas de la aplicación, conservando el borrador al volver.
- Se mantienen los enlaces directos a herramientas y los enlaces compartidos con datos.

## 0.39.3 — 2026-11-27

- Más contraste en el modo claro: portada, novedades, herramientas recientes y catálogo con superficies diferenciadas y bordes más visibles.
- Tarjetas, paneles y campos con límites más definidos para distinguir las áreas de trabajo.

## 0.39.2 — 2026-11-27

- La portada muestra el enlace corto `prompt.edutictac.es`, con HTTPS.
- Últimas incorporaciones muestra solo las tres tarjetas más recientes; el historial completo sigue enlazado.

## 0.39.1 — 2026-11-26

- Corregido el objetivo de la herramienta LaTeX: pide fórmulas renderizadas dentro del contenido, sin devolver código fuente ni bloques de código. En Word/DOCX solicita ecuaciones nativas editables (OMML).
- Añadidos DOCX, ODT y PDF; pistas, ejemplos y novedades ajustados para pedir material terminado. La editabilidad depende de que la IA pueda crear el documento solicitado.


## 0.39.0 — 2026-11-26

- Nueva herramienta «Fórmulas y cálculos en LaTeX editable» en Contenidos, en los cuatro idiomas, con ejemplo, búsqueda, enlace directo y modos guiado/avanzado.
- Solicita código fuente copiable para todas las expresiones y pasos, comprobación de cálculos y adaptación al editor de destino (Word, Moodle/Aules u Overleaf). La conversión conserva el original y solo resuelve si se pide. Salida Texto/Markdown para conservar la fuente editable.


## 0.38.0 - Rúbrica CSV para Aules

- La herramienta Rúbrica ofrece el formato **CSV Aules / Moodle**: cuatro niveles fijos y puntuación máxima configurable (100 por defecto). El prompt exige las cuatro columnas oficiales de Aules y UTF-8 sin caracteres internos prohibidos. Reparte los máximos en milésimas y compensa el redondeo en el último criterio para que sumen exactamente la calificación de la actividad.
- Solicita el archivo `rubrica-aules.csv` descargable y contempla las herramientas de IA que solo pueden devolver texto. No afirma haber probado la importación real. Las etiquetas de nivel se conservan en la descripción y la columna `level` lleva 1–4 como en el ejemplo oficial.
- Documentación: https://portal.edu.gva.es/aules/va/importacio-de-rubriques-en-format-csv/ (actualizada en enero de 2026).

## 0.37.1 - Diálogos accesibles

- El diálogo **Guardar** se anuncia como diálogo modal con su título, el botón «×» tiene nombre («Cerrar»), Escape lo cierra, Tab no sale del diálogo y al cerrarlo el foco vuelve al botón que lo abrió. El diálogo del QR usa el mismo comportamiento (`src/components/useDialogFocus.ts`).

## 0.37.0 - QR, paquete de sesión y revisión de catalán y valenciano

- **Mostrar QR:** cada herramienta tiene un botón que muestra a pantalla completa el código QR del enlace (con los datos rellenados, si los hay), para proyectarlo en clase o en una formación. Se genera en el navegador (`qrcode-generator`, MIT) y se puede descargar en SVG. Si el enlace es muy largo avisa de que puede costar escanearlo.
- **Paquete de sesión:** en Mi biblioteca se marcan varios prompts guardados («En la sesión») y «Preparar la sesión» crea una página con el título de la sesión y, por cada prompt, su QR y el enlace que abre la herramienta ya rellena. Se puede imprimir (dos por fila, sin botones), proyectar cada QR o copiar todos los enlaces en una lista numerada para Aules o la zona del centro.
- **Catalán y valenciano:** una prueba nueva recorre todos los textos de las dos variantes (interfaz, opciones, pistas, ayuda, agentes y los prompts de todas las herramientas) y falla si aparece una forma exclusiva de la otra. Ha corregido 24 casos: en catalán aparecían formas valencianas (`esta`, `teua`, `meues`, `servici`…) y algunos textos compartidos usaban formas centrales en valenciano (`afegeix`, `depèn`, `serveix`…).
- **Para mantener la aplicación:** `npm run golden:update` regenera las huellas de las salidas y `npm run new-template` crea el esqueleto de una herramienta nueva; una prueba impide publicar mientras queden textos pendientes. Instrucciones en `CONTRIBUTING.md`.

## 0.36.1 - Arranque más rápido

- El bloque de código que se descarga al abrir la aplicación pasa de **807 kB a 440 kB** (de 246 kB a 136 kB comprimido, un 45 % menos). La pantalla de crear, el generador de prompts con todos sus textos y el descompresor de los enlaces compartidos se cargan aparte: la pantalla de crear al abrirla y el generador mientras se rellena el formulario, de modo que generar sigue siendo inmediato. La PWA los precarga en segundo plano, así que todo sigue funcionando sin conexión.
- Las opciones de la ficha ilustrada (temáticas e idiomas) pasan a un módulo ligero para que el catálogo no arrastre los textos del generador.

## 0.36.0 - Compartir formularios, recientes y «Generar ya»

- **Compartir con estos datos:** cada herramienta tiene un botón que copia un enlace (`#template/<id>?d=…`) que abre el formulario con los mismos datos. Los datos van comprimidos en el propio enlace (no pasan por ningún servidor) y solo incluyen los campos rellenos; al abrirlos se validan y se descarta todo lo que no sea un campo de la herramienta. Útil para proyectar un QR en una formación. Si hay demasiado texto, se avisa y se propone guardarlo en la biblioteca.
- **Tus herramientas recientes:** la portada muestra las seis últimas herramientas usadas en el dispositivo (solo se guarda el identificador de la herramienta, nunca datos del formulario).
- **Generar ya:** en el modo «Paso a paso», en cuanto están rellenos el nivel y el tema (o la tarea), aparece «Generar ya»; los pasos restantes quedan como opcionales.
- Se retiran del código los antiguos «casos listos para usar» (`starters`), que ya no se mostraban; el enlace compartido cubre ese uso.
- **Publicación más segura:** `scripts/publish-pages.sh` se niega a publicar si hay cambios sin commitear o si `HEAD` no coincide con `edutictac/master`, compila en una copia limpia del commit, pasa lint, formato y pruebas antes de publicar y avisa si las novedades de la portada no corresponden a la versión.
- **Pruebas más estables:** el tiempo máximo por prueba pasa a 20 s (las de interfaz fallaban con la máquina cargada) y se formatean tres ficheros que hacían fallar `format:check`.

## 0.35.0 - Adaptación por perfil y documentos del centro

- Nueva herramienta **Adaptación para un perfil concreto** (Adaptación; `#template/profile-adaptation`): parte de una tarea y de un perfil (TDAH, dislexia, TEA, altas capacidades, desconocimiento de la lengua vehicular, discapacidad visual, discapacidad auditiva o dificultades de regulación del comportamiento). Devuelve la tarea adaptada, ajustes por bloques (acceso, comprensión, expresión, tiempo y evaluación), qué se mantiene y qué cambia, materiales viables, indicadores de progreso y errores frecuentes. Cada perfil añade orientaciones concretas de aula; el enunciado pide no etiquetar ni diagnosticar y advierte de que el objetivo y la exigencia no bajan. Permite indicar fortalezas, intereses y apoyos que ya funcionan.
- Nueva herramienta **Documentos del centro (actas, informes y memorias)** (Comunicación; `#template/school-document`): acta de reunión, memoria de actividad, informe de seguimiento del alumnado, plan de refuerzo o recuperación, solicitud o propuesta a dirección y respuesta a una reclamación. Cada tipo tiene su estructura; el prompt usa solo el contexto y las notas aportadas, deja huecos `[ ]` cuando falta un dato y recuerda revisar y firmar antes de presentar.
- Ambas herramientas añaden textos en castellano, valenciano, catalán e inglés, ejemplo, pistas de uso, sinónimos de búsqueda, opciones traducidas y salidas de referencia.
- Ideas inspiradas en la biblioteca de prompts de Sandra Fortanet (CC BY-NC): solo se han reutilizado las ideas; los textos se han redactado de nuevo.
## 0.34.1 - Licencia aclarada

- El código se declara **AGPL-3.0-or-later** (`package.json`, README y pie de la aplicación).
- **Permiso adicional (sección 7 de la AGPL):** los prompts, agentes, skills y demás textos que genera la aplicación se ceden al dominio público con **CC0 1.0**; el profesorado puede usarlos, modificarlos y compartirlos sin restricciones ni atribución. Detalle en `NOTICE` y en la página de privacidad («Los prompts que generas son tuyos»), en los cuatro idiomas.

## 0.34.0 - Ficha ilustrada para imprimir y novedades en la portada

- Nueva herramienta **Ficha ilustrada para imprimir (imagen)** (Actividades; `#template/illustrated-worksheet`): prompt para una IA de imágenes (ChatGPT, Gemini, Copilot, Midjourney o Canva) que dibuja una ficha A4 vertical con temática. Incluye 16 temáticas con sus elementos (espacio, dinosaurios, piratas, fondo marino, robots, deportes…) y la opción de personajes y elementos propios, siempre genéricos y sin marcas. Puede ser en blanco y negro para colorear o en color. Ofrece 13 tipos de actividad combinables: contar, completar, emparejar, rodear, verdadero/falso, series, intruso, laberinto, unir los puntos, diferencias, colorear por código, sopa de letras y mensaje secreto. También permite elegir el idioma de la ficha, distinto del de la interfaz (valenciano normativo de la AVL si se elige). Admite el campo de accesibilidad del material.
- Para evitar errores de la IA de imágenes, se pueden escribir los ejercicios exactos. El prompt pide comprobar las soluciones antes de dibujar, dar el solucionario en texto e indicar qué revisar antes de imprimir. En Midjourney usa la proporción A4 (`--ar 5:7`). Salida PNG o PDF.
- **Portada:** se retiran los «Casos reales listos para usar» y en su lugar aparece **Novedades**, con tres tarjetas que abren las herramientas nuevas o mejoradas y un enlace al historial completo de cambios (`src/news.ts`; un test comprueba que las tarjetas apunten a herramientas existentes y tengan texto en los cuatro idiomas).
- Idea de la ficha ilustrada inspirada en el [generador de fichas gamificadas](https://sanforbel.github.io/generador-fitxes/) de Sandra Fortanet; textos redactados de nuevo.

## 0.33.0 - Accesibilidad del material y pasatiempos en la ficha

- Nuevo campo **Accesibilidad del material** en la ficha de trabajo imprimible, la lectura comprensiva graduada, la lectura fácil, el guion de laboratorio y el escape room. Ofrece 13 medidas concretas: letra grande sin serifa, espaciado amplio, texto alineado a la izquierda, alto contraste, no depender del color, papel crema, espacios pautados, poco contenido por página, una instrucción por paso, pictogramas, diseño sin adornos, lectura fácil y vocabulario con apoyo visual. Cada una llega al prompt como instrucción precisa con el perfil de alumnado al que ayuda (dislexia, baja visión, TDAH, TEA, disgrafía, daltonismo, alumnado que aprende la lengua). Complementa el DUA y las barreras del contexto.
- La **ficha de trabajo imprimible** suma diez tipos de pasatiempo: sopa de letras, crucigrama, anagramas, adivinanzas, jeroglífico, mensaje secreto, series y patrones, encuentra el intruso, llega al número y la palabra más larga. Si se elige alguno, el prompt pide comprobar que cada pasatiempo tiene una única solución y se puede resolver, e incluir las soluciones en el solucionario.
- Idea inspirada en el [generador de fichas gamificadas](https://sanforbel.github.io/generador-fitxes/) de Sandra Fortanet; los textos se han redactado de nuevo en castellano, valenciano, catalán e inglés.

## 0.32.1

- **Contraste en modo oscuro:** los títulos de las herramientas y de la portada, los iconos del catálogo, los textos secundarios, el selector «Paso a paso / Avanzado» y el indicador «local» se veían casi en azul marino sobre fondo oscuro. Ahora todos los textos de la portada, el formulario, la biblioteca, la ayuda y los agentes cumplen el contraste mínimo WCAG AA, también en modo claro (grises secundarios algo más oscuros).

## 0.32.0 - Para qué sirve cada herramienta

- Cada herramienta muestra bajo el título **para qué sirve** y una **pista de uso** (cuándo está indicada, qué revisar o con qué combinarla), en castellano, valenciano, catalán e inglés. Un test exige que toda herramienta nueva tenga su pista en los cuatro idiomas.

## 0.31.0 - Escape room y lectura comprensiva graduada

- Nueva herramienta **Escape room o breakout educativo** (Actividades; `#template/escape-room`): historia breve, enigmas encadenados que exigen usar los contenidos, tipo de candado, solución y dos pistas graduadas por enigma, materiales imprimibles, montaje con candados de papel o digitales, grupos, temporización y hoja de soluciones para el docente. Comprueba que cada solución sea única.
- Nueva herramienta **Lectura comprensiva graduada** (Contenidos; `#template/reading-comprehension`): usa el texto aportado sin cambiarlo (o escribe uno adecuado al nivel), vocabulario clave y preguntas en tres bloques iguales (literales, inferenciales y críticas), con el nivel de cada pregunta y las respuestas esperadas aparte.
- Las dos, en castellano, valenciano, catalán e inglés y con ejemplo cargable.

## 0.30.0 - Caso práctico, guion de laboratorio y presentación para clase

- Nueva herramienta **Caso práctico o supuesto profesional** (Actividades; `#template/case-study`): situación realista con los datos necesarios, tareas graduadas de la comprensión a la toma de decisiones, objetivo de cada tarea y solucionario aparte con errores frecuentes. Datos ficticios y coherentes, sin personas ni empresas reales identificables. Pensada para FP y Bachillerato.
- Nueva herramienta **Guion de práctica de laboratorio o taller** (Actividades; `#template/lab-guide`): objetivo, fundamento, material, normas de seguridad, procedimiento numerado, tabla de datos, preguntas de análisis y apartado para el docente. No inventa normas de seguridad ni valores de referencia: marca lo que hay que comprobar.
- Nueva herramienta **Presentación para clase** (Contenidos; `#template/class-presentation`): esquema de diapositivas con ideas breves, propuesta de imagen con término de búsqueda y notas para el docente, con pregunta inicial, actividad intermedia y síntesis; lista para PowerPoint con Copilot, Gamma o Canva.
- Las tres, en castellano, valenciano, catalán e inglés y con ejemplo cargable.

## 0.29.0 - Ficha de trabajo imprimible

- Nueva herramienta **Ficha de trabajo imprimible** (categoría Actividades; `#template/worksheet`): a partir de un tema o de un texto de partida, prepara una ficha para el alumnado con encabezado, instrucciones, ejercicios variados del tipo elegido (completar huecos, verdadero/falso, emparejar, ordenar, clasificar, opción múltiple, respuesta corta, pregunta abierta, dibujo o esquema), espacio para responder y el solucionario aparte. Usa solo la información del texto aportado y da un formato apto para pegar en un procesador de textos. Traducida al valenciano, catalán e inglés, con ejemplo cargable.

## 0.28.3

- En la **Ficha de actividad de robótica y programación**, el **rol del alumnado** permite elegir varios a la vez (usuario, creador y diseñador).

## 0.28.2

- La herramienta **Ficha de actividad de programación** pasa a llamarse **Ficha de actividad de robótica y programación** (y su equivalente en valenciano, catalán e inglés) para no confundirla con una ficha de programación didáctica; el enlace `#template/coding-activity` no cambia.

## 0.28.1

- Al abrir una herramienta, el formulario empieza siempre en **Paso a paso**, aunque la última vez se hubiera usado **Avanzado**; el modo avanzado se elige a mano y ya no se recuerda entre visitas.
- Corregido el enlace **← Elige una herramienta**, que no volvía a la portada.

## 0.28.0 - Enlace directo y formulario sin modo Sencillo

- **Cambio importante:** se elimina el modo «Sencillo» del formulario. Quedan **Paso a paso** (modo por defecto) y **Avanzado**. Quien tenía guardado «Sencillo» pasa automáticamente a «Paso a paso»; los valores, los prompts guardados y su edición no cambian. La ayuda se actualiza en los cuatro idiomas.
- Enlace directo a una herramienta con `#template/<id>` (por ejemplo `#template/coding-activity`): abre el formulario al cargar la página o al cambiar el hash, y la dirección se actualiza al abrir una herramienta. Un identificador desconocido deja la portada.
- La **Ficha de actividad de programación** ofrece también ESO, Bachillerato y FP; el prompt ya no asume solo Infantil y Primaria y orienta sobre las herramientas en etapas superiores.

## 0.27.0 - Ficha de actividad de programación

- Nueva herramienta **Ficha de actividad de programación** (Planificación docente): el equipo elige etapa, herramienta o material, rol del alumnado, formato de partida y duración, y obtiene un prompt que pide una ficha de dos columnas (Campo | Decisión) con reglas, interacción, retroalimentación, consigna, evidencia y plan B.
- Herramientas: Blocs Junior, Blockly Games, EduTicTac Blocs y actividad desenchufada, más los materiales de la dotación Escuela 4.0 (LEGO Coding Express, Tale-Bot, Matatalab, Codey Rocky, SPIKE Essential y Prime, BricQ Motion, micro:bit y BOSON). Con material físico, la ficha incluye preparación, turnos y un plan B en pantalla.
- La herramienta **Película explicativa animada** deja de crear una categoría propia y aparece en **Imagen y visual**, junto a las demás herramientas visuales.
- Todos los prompts incluyen en la revisión docente una petición común para preguntar si falta información imprescindible antes de continuar, en lugar de inventarla.

## 0.26.0 - Película explicativa animada

- Nueva categoría **Vídeo** con la herramienta **Película explicativa animada**, que convierte un documento en un guion y una película HTML autocontenida.
- Permite elegir estilo manual, pixel art o combinado; variante clara u oscura; acabado habitual o Blueprint; duración, tono, colores de marca y tipo de voz.
- El prompt trabaja por fases (análisis, guion con aprobación, construcción y revisión) e incluye reglas de rigor, dinamismo, accesibilidad y revisión docente.

## 0.25.1 - Enlace corto en la portada

- La portada muestra, debajo del botón «Crear», el enlace corto **e.edutictac.es/prompt** con la etiqueta «Enlace corto para el aula», listo para proyectar o escribir en clase.
- Traducido a los cuatro idiomas y adaptado a modo oscuro y móvil.

## 0.25.0 - Buscador visible del catálogo

- Barra de búsqueda destacada bajo la portada, con icono, botón para limpiar, ejemplos y recuento de resultados.
- Busca por nombre en los cuatro idiomas, categoría y sinónimos habituales («examen», «mapa mental», «lectura fácil»), ignorando acentos, mayúsculas y signos.
- Al escribir se oculta «Empieza aquí» y aparecen directamente las herramientas coincidentes, con un estado vacío claro cuando no hay resultados.

## 0.24.0 - Refactor interno y biblioteca por cuenta

- Organización modular de la aplicación, las pantallas, el formulario y el generador, con salidas del generador verificadas por hashes e instantáneas.
- La biblioteca muestra y sincroniza solo los prompts de la cuenta actual. Los anónimos quedan en el dispositivo y los antiguos sin propietario no se adoptan automáticamente.
- Si falla el borrado remoto, el prompt se conserva en local y se avisa; la importación se valida y se escribe en una transacción.
- Sencillo, Paso a paso y Avanzado comparten un único borrador y controles; ESLint y Prettier quedan configurados.

## 0.23.3 - Un solo campo de materia

- Se elimina el selector duplicado de materias; la materia se elige en el perfil curricular o se escribe en el único campo «Materia».

## 0.23.2 - Elementos curriculares en modo sencillo

- Los elementos curriculares aparecen también en Sencillo al elegir un perfil con currículo detallado.
- Si la etapa y la materia no tienen datos detallados, se muestra un aviso en lugar de ocultar el bloque.

## 0.23.1 - Saberes básicos seleccionables

- Corregida la selección de elementos curriculares cuyas opciones contienen « · »; el valor se guarda con saltos de línea y se admiten datos anteriores.

## 0.23.0 - Modo Paso a paso

- Nuevo modo guiado por bloques con progreso, opción de saltar pasos y resumen final editable.
- Se conservan los valores al cambiar entre Sencillo, Paso a paso y Avanzado.

## 0.22.0 - EduCrea con idioma y nivel

- «Usar en EduCrea» envía también el idioma y el nivel, y amplía la correspondencia de plantillas.

## 0.21.1 - Coherencia del tipo de producto

- EduCrea recibe también la plantilla de EduTicTac Prompt y propone el producto equivalente: una situación de aprendizaje ya no aparece como ficha imprimible por defecto.

## 0.21.0 - Envío directo del encargo a EduCrea

- «Usar en EduCrea» abre EduCrea con el encargo ya rellenado en Instrucciones, sin copiar y pegar.
- El encargo viaja comprimido en el fragmento de la URL y se borra al recibirlo; si no cabe, se mantiene el flujo de portapapeles.

## 0.20.2 - Volver arriba al cambiar de sección

- Al abrir cualquier pestaña (Inicio, Mi biblioteca, Agentes, Ayuda, Privacidad) o una plantilla, la página vuelve arriba en lugar de quedarse al final.

## 0.20.1 - Tema en el chip

- El chip de EduTicTac también controla el tema (Auto, Claro, Oscuro) y la app lo aplica y lo guarda.
- El botón de tema propio se oculta cuando el chip está activo; si el chip no carga, vuelve como respaldo.

## 0.20.0 - Sesión central de EduTicTac

- La biblioteca de prompts usa la sesión central del chip de EduTicTac. El `sub` de Authentik (`hashed_user_id`) es el mismo en todos los proveedores, así que los prompts existentes conservan su propietario sin migración.
- «Mi biblioteca» ya no pide una sesión aparte: muestra la sincronización cuando el chip tiene sesión y, si no, indica que se entre con el chip de la cabecera.
- El chip recarga la página al entrar o salir para refrescar la sesión de la biblioteca.
- La sesión OIDC propia de Prompt queda solo como respaldo si no hay Commons o si el servicio central no responde.

## 0.19.1 - Chip de cuenta integrado

- El chip de EduTicTac sigue el idioma de la app y permite cambiarlo desde su menú.
- Los controles propios de idioma y sesión desaparecen de la cabecera cuando el chip está activo (si el chip no carga, vuelven como respaldo).
- La sesión de la biblioteca remota de Prompt se traslada a «Mi biblioteca», separada del chip central de EduTicTac.
- El CSS de la app ya no interfiere con el menú interno del chip.

## 0.19.0 - Puente con EduCrea, chip de cuenta y GIFT

- Nuevo botón «Usar en EduCrea» en la vista previa: copia el prompt y abre la creación guiada de EduCrea para pegarlo en Instrucciones.
- La URL de EduCrea se puede cambiar con `VITE_EDUCREA_URL`.
- Chip de cuenta central de EduTicTac en la cabecera (se carga desde `commons.edutictac.es`); el login y el tema propios de Prompt se mantienen.
- Plantilla GIFT: número y tipos de pregunta, y reglas para importar en Aules y Moodle sin errores.

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

## 0.17.0 — Agentes / Agents

- Renombra la sección principal: Agentes en castellano, Agents en valenciano, catalán e inglés; ruta #agents y compatibilidad con #skills.
- Diseñador de comportamiento docente: función, nivel, materia, modos, criterios, errores, respuestas, tono, preguntas y límites.
- Idioma de respuesta automático o fijo, independiente del de las instrucciones.
- Nueve puntos de partida editables, incluido el mentor SMART inspirado en el ejemplo compartido por el docente.
- Mis agentes con guardado local por cuenta, edición, duplicado, historial y eliminación confirmada.
- Dexie v3 aditivo, conservando prompts y Skills; estas últimas permanecen en Compatibilidad.
