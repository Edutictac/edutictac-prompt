#!/usr/bin/env node
// Crea el esqueleto de una herramienta nueva en todos los ficheros que la
// necesitan, con marcas TODO(new-template) donde falta texto. La prueba
// src/newTemplate.test.ts falla mientras quede alguna marca, así que
// scripts/publish-pages.sh no puede publicar una herramienta a medias.
//
// Uso: npm run new-template -- <id> <categoría> "<Nombre en castellano>"
// Ejemplo: npm run new-template -- debate-guide activities "Guion de debate"
// Después: rellena los TODO, añade campos propios si hace falta y ejecuta
// «npm run golden:update» y «npm test».
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [id, category, nameEs] = process.argv.slice(2)
const categories = [
  'planning',
  'activities',
  'assessment',
  'digital',
  'adaptation',
  'content',
  'communication',
  'visual',
]

function fail(message) {
  console.error(`✗ ${message}`)
  process.exit(1)
}

if (!id || !category || !nameEs) fail('Uso: npm run new-template -- <id> <categoría> "<Nombre en castellano>"')
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id))
  fail(`El id «${id}» debe ir en minúsculas y con guiones (ej. debate-guide).`)
if (!categories.includes(category)) fail(`Categoría desconocida «${category}». Usa: ${categories.join(', ')}.`)

const read = (file) => readFileSync(join(root, file), 'utf8')
const catalogFiles = readdirSync(join(root, 'src/templates'))
  .filter((file) => /^catalog\d+\.ts$/.test(file))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
  .map((file) => `src/templates/${file}`)
if (!catalogFiles.length) fail('No encuentro catálogos de herramientas.')
if (catalogFiles.some((file) => read(file).includes(`id: '${id}',`))) fail(`Ya existe una herramienta con id «${id}».`)

const key = `template${id
  .split('-')
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join('')}`
const quoted = /^[a-z]+$/.test(id) ? id : `'${id}'`
const TODO = 'TODO(new-template)'
const esc = (text) => text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const changed = []

// Inserta `text` justo antes de la primera aparición de `anchor` a partir de `after`.
function insertBefore(file, anchor, text, after = '') {
  const source = read(file)
  const start = after ? source.indexOf(after) : 0
  if (start < 0) fail(`No encuentro «${after}» en ${file}.`)
  const at = source.indexOf(anchor, start)
  if (at < 0) fail(`No encuentro el punto de inserción en ${file}.`)
  writeFileSync(join(root, file), source.slice(0, at) + text + source.slice(at))
  changed.push(file)
}

// 1. Definición con los campos habituales.
insertBefore(
  catalogFiles[catalogFiles.length - 1],
  '\n]\n',
  `
  {
    id: '${id}',
    category: '${category}',
    icon: '◇',
    // ${TODO}: revisa el icono y añade los campos propios de la herramienta.
    fields: [
      { id: 'level', type: 'select', options: ['Infantil', 'Primaria', 'ESO', 'Bachillerato', 'FP'] },
      { id: 'subject', type: 'text' },
      { id: 'topic', type: 'text' },
      { id: 'objectives', type: 'textarea' },
      { id: 'outputFormat', type: 'select', options: ['Texto', 'Markdown'] },
    ],
  },`,
  'export const catalog',
)

// 2. Clave del nombre.
insertBefore('src/prompts/form/labels.ts', '  free: ', `  ${quoted}: '${key}',\n`, 'export const templateNameKeys')

// 3. Nombre en los cuatro idiomas.
insertBefore(
  'src/locales/extended4.ts',
  '    templateCaseStudy:',
  `    ${key}:
      language === 'en'
        ? '${TODO}: English name'
        : language === 'es'
          ? '${esc(nameEs)}'
          : language === 'ca'
            ? '${TODO}: nom en català'
            : '${TODO}: nom en valencià',
`,
)

// 4. Encargo para la IA (es, catalán común a ca y ca-valencia, en).
insertBefore(
  'src/prompts/generator/tasks.ts',
  '\n  }\n',
  `
    ${quoted}: () =>
      language === 'en'
        ? \`${TODO}: task for the AI about \${topic}.\`
        : catalan
          ? \`${TODO}: encàrrec per a la IA sobre \${topic} (vàlid en català i en valencià).\`
          : \`${TODO}: encargo para la IA sobre \${topic}.\`,`,
  'const taskBuilders',
)

// 5. Ejemplo cargable.
insertBefore(
  'src/examples/catalog5.ts',
  '\n}\n',
  `
  ${quoted}: {
    options: { level: 'ESO' },
    es: { subject: '${TODO}', topic: '${TODO}', objectives: '${TODO}' },
    va: { subject: '${TODO}', topic: '${TODO}', objectives: '${TODO}' },
    en: { subject: '${TODO}', topic: '${TODO}', objectives: '${TODO}' },
  },`,
  'export const examples5',
)

// 6. Palabras para el buscador.
insertBefore('src/search.ts', '\n}\n', `\n  ${quoted}: ['${TODO}'],`, 'const keywords')

// 7. «Para qué sirve» y pista en los cuatro idiomas.
for (const language of ['es', 'valencian', 'ca', 'en']) {
  insertBefore(
    `src/templateTips/${language}.ts`,
    '\n}\n',
    `\n  ${quoted}: {\n    use: '${TODO}',\n    tip: '${TODO}',\n  },`,
  )
}

console.log(`✓ Esqueleto de «${id}» creado en:\n${[...new Set(changed)].map((file) => `  - ${file}`).join('\n')}`)
console.log(`\nSiguiente:
  1. Busca ${TODO} y rellena textos (ca y ca-valencia con formas válidas en las dos variantes).
  2. Si añades campos o opciones: labels.ts (fieldNameKeys), locales.ts, optionLocales.ts y guided.ts.
  3. npm run golden:update && npm test`)
