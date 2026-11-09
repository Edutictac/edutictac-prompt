# Reversión de la versión 0.24.0

## Datos

- El esquema Dexie sigue siendo **v3**; no se ejecutó ninguna migración nueva.
- No borrar IndexedDB ni reducir la versión para volver al código anterior.
- Los prompts antiguos conservan su `id`, contenido y valores. Los creados con
  0.24.0 añaden `ownerId` y pueden seguir leyéndose con el código anterior.

## Código

- La versión publicada antes del refactor es la **0.23.3** (commit `73ea66a`,
  rama `pages` `ef2ed77`). Para revertir, republicar esa compilación y dejar
  `master` en `51a7580` o anterior.
- Si se hubiera fusionado la rama `refactor/estructura`, volver a `51a7580`
  conservando los datos del navegador.

## Comportamientos

- El código anterior no filtra por propietario y vuelve a mostrar toda la
  biblioteca local. No hay migración inversa ni pérdida de datos.
- Si 0.24.0 conservó un prompt porque falló el borrado remoto, al volver atrás
  se podrá borrar en local; una descarga posterior podría resucitarlo.
- La importación de 0.24.0 asigna el propietario actual y quita `remoteId`; el
  código anterior ignora esos campos.
- El contrato JSON de exportación sigue siendo `version: 1` y no cambia.

## Comprobaciones

- Abrir con datos antiguos: `src/test/migration.test.ts` cubre v2→v3 y la
  reapertura con agentes e historiales.
- Tras republicar, verificar `sw.js` y recorrer guardar, sincronizar, editar y
  borrar con una cuenta de prueba.
