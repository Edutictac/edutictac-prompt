# Contribuir

Mantén la interfaz accesible y todos los textos visibles internacionalizados. Para una plantilla nueva, añade su configuración en `src/templates.ts` y los nombres/traducciones correspondientes. Ejecuta `npm run build` antes de enviar cambios. No añadas servicios externos necesarios para el funcionamiento local.

Las propuestas de traducción deben distinguir siempre `ca-valencia` de `ca`.

## Herramienta nueva

1. `npm run new-template -- <id> <categoría> "<Nombre en castellano>"` crea el esqueleto en todos los ficheros (definición, nombre en los cuatro idiomas, encargo para la IA, ejemplo, buscador y pistas) con marcas `TODO(new-template)`.
2. Rellena los TODO. Si añades campos u opciones, revisa también `labels.ts`, `locales.ts`, `optionLocales.ts` y `guided.ts` (la prueba de cobertura avisa de lo que falte).
3. `npm run golden:update` regenera las huellas de las salidas; revisa el diff de `outputs.golden.ts` antes de hacer commit.
4. `npm test`. Mientras quede algún `TODO(new-template)`, la prueba `newTemplate.test.ts` falla y `scripts/publish-pages.sh` no publica.

## Catalán y valenciano

`src/catalanVariants.test.ts` recorre todos los textos de `ca` y `ca-valencia` (interfaz, opciones, pistas, ayuda, agentes y los prompts de todas las herramientas) y falla si aparece una forma exclusiva de la otra variante (`este`/`aquest`, `teua`/`teva`, `haja`/`hagi`, `oferix`/`ofereix`…). Los textos compartidos por las dos variantes deben usar formas válidas en ambas; si una forma nueva se escapa, añádela a las listas de la prueba.
