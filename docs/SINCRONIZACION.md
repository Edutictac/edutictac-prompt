# Sincronización de la biblioteca de prompts

Este documento fija las reglas de propiedad, sincronización, borrado e
importación mientras se extrae la biblioteca del componente principal. La
versión publicada en el momento de escribir esto es 0.23.3.

## Revisión de `edutictac-prompt-api`

Comprobado en `~/github/web/edutictac-prompt-api/app/main.py`:

- La tabla `prompts` usa la clave `(owner_id, prompt_id)`.
- `GET /api/prompts` devuelve solo las filas del `sub` autenticado y admite
  `since`.
- `PUT /api/prompts/{id}` sobrescribe el contenido y fija en el servidor
  `ownerId` (el `sub` sin prefijo), `remoteId`, `syncStatus: synced` y
  `lastSyncedAt`. El navegador no elige el propietario.
- `DELETE /api/prompts/{id}` borra solo la fila del propietario autenticado.
- La API de prompts **no** compara revisiones ni marcas de tiempo. Skills sí
  tiene comprobación de revisión; los prompts no.
- No hay papelera ni tombstones en el servidor.

## Propiedad local

- `ownerId` de un prompt es el `sub` de Authentik cuando hay sesión;
  `local:device` cuando no la hay.
- Al crear un prompt se guarda siempre ese propietario.
- Los prompts antiguos sin `ownerId` se tratan como `local:device`. **No se
  adoptan silenciosamente** al iniciar sesión.
- La biblioteca muestra solo los prompts del propietario actual. Al iniciar
  sesión se ocultan los anónimos; al cerrar sesión vuelven a mostrarse.
- Solo se sube el propietario actual. Un prompt anónimo o de otra cuenta no se
  envía nunca a la API.
- Una descarga remota no sobrescribe un prompt local de otra cuenta aunque
  coincida el identificador.

## Cuándo se sincroniza

Se mantiene el comportamiento existente, ahora documentado:

- Al iniciar sesión: descarga remota y después subida de pendientes.
- Al guardar, actualizar o duplicar: subida en segundo plano.
- Al recuperar la conexión (`online`): reintento de pendientes.
- El botón **Sincronizar biblioteca** fuerza una subida.
- La descarga remota no se repite al volver a la pestaña; para ver cambios
  hechos en otro dispositivo hay que iniciar sesión de nuevo o recargar. Queda
  como pendiente valorar un botón de descarga manual.

## Borrados

- Si el prompt tiene copia remota y el borrado en el servidor falla, **no se
  borra en local**: se muestra `deleteFailed` y se puede reintentar. Así una
  descarga posterior no lo resucita.
- No se introducen tombstones en esta fase.
- Caso pendiente: si un prompt se borra mientras una subida está en curso, la
  respuesta de esa subida puede dejar una copia huérfana en el servidor. No se
  corrige sin un registro de borrados pendientes.

## Subidas simultáneas y conflictos

- Hay una única subida en curso por propietario. Las llamadas simultáneas se
  agrupan y programan una pasada adicional si llega trabajo nuevo.
- Antes de guardar la respuesta del servidor se comparan `updatedAt` y
  `version`. Si el prompt cambió durante la subida, la respuesta se descarta y
  la edición local sigue como `modified` para la siguiente pasada.
- La importación valida el archivo completo antes de escribir y se ejecuta en
  una sola transacción de Dexie. Una importación inválida no deja escrituras
  parciales.

## Importación

- Es una acción explícita del usuario.
- Los prompts importados pasan a pertenecer a la cuenta o biblioteca actual,
  se desvinculan de una copia remota anterior (`remoteId` vacío) y quedan como
  `local` para subirse en la siguiente sincronización.
- Los identificadores que ya existen en local se conservan sin sobrescribir.

## Pendientes

- Adopción explícita de prompts anónimos antiguos, si se considera útil.
- Descarga manual o sincronización bidireccional al recuperar el foco.
- Tombstones o registro de borrados pendientes para el caso de borrado durante
  una subida.
- Comprobación de revisión en la API de prompts, como ya ocurre en Skills.
