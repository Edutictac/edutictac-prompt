# Plan de refactor gradual de EduTicTac Prompt

Fecha: 9 de noviembre de 2026. Base revisada: versión 0.23.1.

## Objetivo y alcance

Facilitar el mantenimiento y la incorporación de plantillas sin alterar los
prompts generados, los formularios ni los datos guardados. Trabajar en pasos
pequeños y revisables, separando reorganización de código y correcciones de
comportamiento.

Repositorio activo: `~/github/Edutictac/edutictac-prompt`. La copia
`~/web/EduTicTacPrompt` no es la base de este trabajo.

Antes de cambiar la interfaz, comprobar que no hay ninguna formación o
comunicación en curso que use la versión publicada. Trabajar en una rama
`refactor/estructura`, sin publicar cada extracción por separado.

## Diagnóstico comprobado

- `App.tsx` concentra navegación, preferencias, cuenta central, formulario,
  biblioteca, sincronización e importación/exportación. Tiene unos 44.000
  caracteres en 155 líneas; el formato dificulta revisar cambios.
- `generator.ts` mezcla composición, reglas de plantillas y contenido en cuatro
  idiomas. Tiene unos 71.000 caracteres.
- Agentes y Skills ya tienen módulos y repositorios propios: aprovechar esa
  estructura antes de introducir nuevas abstracciones.
- La biblioteca de prompts lee toda la tabla local y la subida de pendientes
  no filtra por propietario. Revisar su comportamiento al cambiar de cuenta;
  esto es un hallazgo del frontend, no una prueba de acceso indebido en la API.
- El borrado elimina el registro local aunque falle la petición remota. Puede
  reaparecer en una descarga posterior y no queda un borrado pendiente.
- Hay subida automática al guardar, iniciar sesión y recuperar conexión, aunque
  el README describe una sincronización manual. Documentar y resolver esa
  discrepancia antes de cambiar el comportamiento.
- Base de verificación: **151 pruebas en 25 archivos pasan** y el build funciona.
  ESLint falla por falta de `eslint.config.*`. El bundle principal supera los
  500 kB minificados; medir su impacto antes de optimizar.
- El apartado de estado del README conserva la versión 0.1.16 y cifras antiguas.

## Reglas para todas las fases

- Conservar IndexedDB y sus stores actuales, esquema Dexie v3. No borrar datos
  ni reducir la versión para revertir código.
- Mantener el contrato JSON de exportación v1 y la lectura de datos anteriores.
- Mantener ES, VA, CA y EN como idiomas independientes.
- Conservar los modos Sencillo, Paso a paso y Avanzado con los mismos valores.
- Conservar funcionamiento local, PWA, rutas relativas y acceso sin cuenta.
- No introducir un router, un gestor global de estado ni una nueva arquitectura
  de backend salvo que aparezca una necesidad concreta.
- Un commit revisable por extracción o corrección; evitar mezclar formato,
  movimientos y cambios funcionales en el mismo diff.

## Paso 0 — Fijar la base

- [x] Comprobar estado de Git y crear la rama sin arrastrar cambios ajenos.
- [x] Registrar commit inicial, versión y resultados de test/build.
- [x] Preparar datos ficticios: prompt antiguo, prompt con formulario, categorías,
  agente e historial. Usar una base de prueba separada del perfil habitual.
- [x] Añadir pruebas de comportamiento que faltan: guardar y reabrir, actualizar
  sin duplicar, importar/exportar y conservar valores al cambiar de modo.
- [x] Fijar ejemplos de salida representativos del generador en los cuatro
  idiomas, incluidos currículo, GIFT y plantillas visuales. Comparar texto exacto
  allí donde el refactor deba conservarlo.

**Terminado cuando:** hay una referencia reproducible y las nuevas pruebas
protegen los recorridos que se van a mover. No hace falta replicar cada función.

## Paso 1 — Recuperar legibilidad y controles básicos

- [ ] Añadir configuración ESLint compatible con las versiones instaladas,
  excluyendo `dist/`, dependencias y archivos generados.
- [ ] Establecer formato consistente y expandir el código comprimido, comenzando
  por `App.tsx`. Mantener este cambio puramente mecánico en un commit separado.
- [ ] Corregir los problemas reales detectados por lint en commits posteriores;
  evitar desactivar reglas de forma global para conseguir un resultado verde.
- [ ] Actualizar el estado y los comandos de desarrollo del README.

**Terminado cuando:** lint, pruebas y build pasan y el diff de formato no cambia
el comportamiento. Registrar cualquier excepción concreta que deba resolverse
en una fase posterior.

## Paso 2 — Extraer la biblioteca y definir la sincronización

Es la primera extracción funcional por su relación con la conservación de datos.

- [ ] Crear `src/prompts/repository.ts` para operaciones locales y
  `src/prompts/transfer.ts` para validar importaciones y construir exportaciones.
- [ ] Extraer la coordinación remota a `src/prompts/sync.ts` y el estado de la
  interfaz a `usePromptLibrary`. La vista no debe operar directamente con Dexie.
- [ ] Primero trasladar el comportamiento existente sin corregirlo dentro del
  mismo cambio. Caracterizar los casos problemáticos con pruebas específicas.
- [ ] Revisar en `edutictac-prompt-api` las reglas de propiedad, identificadores,
  actualización y borrado antes de definir cambios de sincronización.
- [ ] Definir el tratamiento de biblioteca anónima, cuenta A y cuenta B:
  visibilidad y sincronización por propietario; sin subir datos de una cuenta a
  otra. Los registros antiguos sin propietario requieren una política explícita
  de incorporación, sin asignarlos silenciosamente a quien inicie sesión.
- [ ] Acordar y documentar si la sincronización sigue siendo automática o pasa a
  ser manual. La extracción por sí sola no cambia esta política.
- [ ] Resolver borrados sin conexión: conservar un registro de borrado pendiente
  o mantener el elemento y mostrar el fallo hasta poder borrar. Si se eligen
  pendientes, impedir que una descarga resucite el elemento y reintentar al
  reconectar. Documentar la decisión y cualquier cambio de contrato.
- [ ] Evitar subidas simultáneas desde guardar, conexión y botón de sincronizar;
  impedir que una respuesta antigua sobrescriba una edición más reciente.
- [ ] Validar el JSON antes de escribir y realizar la importación local en una
  transacción para evitar bibliotecas parcialmente importadas.

**Pruebas necesarias:** fallo de red, reintento, descarga tras borrar, edición
durante una subida, cambio A→B, cierre de sesión, datos anónimos e importación
inválida sin escrituras parciales. Simular API e IndexedDB con datos ficticios.

**Terminado cuando:** esas reglas están documentadas y probadas, la biblioteca
conserva sus datos y `App.tsx` deja de contener operaciones de persistencia y
sincronización. Si hace falta una migración, diseñarla y probar su reversión
antes de ejecutarla; no incluirla como efecto secundario de una extracción.

## Paso 3 — Separar la aplicación y las pantallas

- [ ] Extraer cabecera, pie, catálogo, biblioteca, ayuda y diálogo de guardado a
  componentes con contratos pequeños.
- [ ] Extraer preferencias de idioma/tema y puente con el chip central a hooks
  propios. Eliminar escrituras duplicadas de preferencias solo en un cambio
  funcional separado.
- [ ] Centralizar el ciclo de registro y limpieza de eventos del chip y la PWA;
  revisar también las variables globales que conectan cuenta y aplicación.
- [ ] Mantener la navegación actual y los enlaces `#agents`, `#skills` y `#help`.

**Terminado cuando:** `App.tsx` coordina vistas y estado compartido, sin contener
la implementación de cada pantalla. Probar navegación, idioma, tema, chip
disponible/ausente y aviso de actualización.

## Paso 4 — Separar el formulario sin duplicar su lógica

- [ ] Mover `CreateView`, `FieldControl`, resumen guiado y selectores curriculares
  a `src/prompts/components/`.
- [ ] Extraer inicialización, selección de plantilla y edición del borrador a
  un módulo/hook de formulario compartido por los tres modos.
- [ ] Mantener una única implementación de controles, ayudas, sugerencias y
  selección curricular para Sencillo, Paso a paso y Avanzado.
- [ ] Mantener la lectura del formato curricular antiguo y el actual separado
  por saltos de línea.

**Terminado cuando:** generar, guardar, reabrir y actualizar funcionan en los
tres modos; cambiar de modo conserva valores y los campos con « · » siguen
seleccionados. Revisar teclado y pantallas de 390 y 1440 px.

## Paso 5 — Organizar el generador y sus textos

- [ ] Conservar `generatePrompt(template, values, language)` como entrada pública.
- [ ] Separar diccionarios, reglas de salida y construcción de bloques en
  `src/prompts/generator/`, evitando dependencias de React o de la base de datos.
- [ ] Agrupar las instrucciones específicas por familias de plantillas cuando
  compartan comportamiento real; evitar una jerarquía de clases por plantilla.
- [ ] Revisar claves duplicadas entre etiquetas de campos, opciones y textos del
  generador. Añadir comprobaciones de integridad de traducciones donde falten.
- [ ] Extraer primero conservando las salidas exactas. Las mejoras del contenido
  educativo se abordan después, con cambios explícitos de resultados esperados.

**Terminado cuando:** pasan las comparaciones de salida y añadir una plantilla
no exige modificar las pantallas. Mantener identificadores y valores persistidos.

## Paso 6 — Revisar Agentes, Skills y carga inicial

- [ ] Reevaluar tras las extracciones anteriores: no dividir módulos estables
  únicamente por su tamaño.
- [ ] Separar de `SkillsView.tsx` los flujos que ya son independientes: ejecución,
  creación asistida e importación/exportación.
- [ ] Identificar responsabilidades compartidas entre Agentes y Skills antes de
  moverlas; conservar sus bibliotecas e historiales por propietario.
- [ ] Medir el bundle y la carga inicial. Valorar carga diferida de ayuda y de
  Compatibilidad/Skills, ya que `AgentsView` ya se carga de forma diferida.

**Terminado cuando:** las extracciones justificadas conservan los flujos actuales.
Documentar tamaño antes/después y cualquier optimización aplicada; no usar solo
la desaparición del aviso de 500 kB como criterio de éxito.

## Paso 7 — Cerrar y preparar publicación

- [ ] Ejecutar `npm run lint`, `npm test` y `npm run build` sobre el conjunto final.
- [ ] Revisar el diff: sin cambios accidentales en salidas, idiomas o contratos.
- [ ] Probar con una base antigua de prueba: prompts, categorías, agentes, Skills
  e historiales permanecen después de abrir la nueva versión.
- [ ] Revisar ES/VA/CA/EN, móvil/escritorio, teclado, modo sin conexión, cambio de
  cuenta y actualización de la PWA desde la versión anterior.
- [ ] Actualizar README y documentación de arquitectura/sincronización.
- [ ] Preparar versión, changelog y reversión. Publicar como tarea separada,
  siguiendo la memoria operativa y `scripts/publish-pages.sh`; verificar después
  la versión del service worker y un recorrido real de biblioteca.

**Reversión:** volver al código anterior conservando el esquema y los datos. Si
se introduce un estado nuevo de sincronización, comprobar antes que el código
anterior puede leerlo sin reintroducir borrados o subidas incorrectos. No prometer
una reversión segura únicamente por conservar el número de versión Dexie.

## Orden de ejecución y seguimiento

Primera entrega: pasos 0 y 1. Segunda: biblioteca y sincronización (paso 2),
dividida en extracción y correcciones. Después: pantallas, formulario y generador.
Agentes/Skills y optimización se deciden con la estructura resultante.

Al terminar cada paso, anotar aquí commit, comprobaciones, decisiones y pendientes.
Si aparece un fallo de conservación de datos, detener nuevas extracciones y
resolverlo antes de seguir.

| Paso | Estado | Commit / evidencia |
| --- | --- | --- |
| 0. Base y pruebas de comportamiento | Hecho | Rama `refactor/estructura`; 174 pruebas; build OK |
| 1. Formato, lint y documentación | Pendiente | Siguiente |
| 2. Biblioteca y sincronización | Pendiente | |
| 3. Aplicación y pantallas | Pendiente | |
| 4. Formulario | Pendiente | |
| 5. Generador y textos | Pendiente | |
| 6. Agentes, Skills y carga | Pendiente | |
| 7. Verificación y publicación | Pendiente | |

## Registro de ejecución

### Paso 0 — Base y pruebas de comportamiento (2026-11-09)

- Rama `refactor/estructura` creada desde `master` (`51a7580`, versión 0.23.3).
- Base inicial verificada: 152 pruebas en 25 archivos y build correcto; ESLint
  sigue sin configuración.
- Datos ficticios en `src/test/fixtures.ts`: categoría, prompt actual, prompt
  antiguo sin `values`, agente con historial y skill con historial, cargados en
  `fake-indexeddb` (nunca en la base real del navegador).
- Pruebas nuevas en `src/behaviour.test.tsx`: guardar, reabrir y actualizar sin
  duplicar; abrir un prompt antiguo; conservar valores al cambiar de modo;
  exportar e importar, incluida la importación inválida sin escrituras parciales.
- Salidas de referencia: 16 instantáneas en
  `src/__snapshots__/generator.golden.test.ts.snap` para `learning-situation`
  con currículo, GIFT, infografía y feedback en ES, VA, CA y EN.
- Resultado: **174 pruebas en 28 archivos** y build correcto. No se publica nada.
- Pendiente para el Paso 1: configuración ESLint, formato y README.
