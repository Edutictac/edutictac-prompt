import { localizeOption } from '../../optionLocales'
import type { Language } from '../../types'

export const RUBRIC_CSV_FORMAT = 'CSV Aules / Moodle'
export const AULES_RUBRIC_HELP = 'https://portal.edu.gva.es/aules/va/importacio-de-rubriques-en-format-csv/'

export const rubricCsvTexts = {
  es: {
    role: 'Actúa como especialista en evaluación educativa y Moodle.',
    task: 'Genera una rúbrica en CSV para importar en una tarea de Aules con el bloque Importar rúbrica desde CSV.',
    missing:
      'Si faltan la tarea o los criterios pide esos datos antes de generar el archivo. No inventes criterios curriculares ni códigos normativos. Si se proporciona un único criterio alinea toda la rúbrica exclusivamente con ese criterio sin añadir otros.',
    levels: 'Insuficiente · En proceso · Conseguido · Excelente',
    technical:
      'Codificación UTF-8. Cabecera exacta: criterion,level,level_description,score. La coma se usa solo como separador de columnas. Ningún campo puede contener comas ni punto y coma ni comillas dobles. Sustituye las comas internas por espacios. No incluyas saltos de línea dentro de los campos. Cada fila contiene un nivel de un criterio. Repite el mismo texto de criterion en sus cuatro filas. Exactamente cuatro niveles por criterio en el orden indicado. En level escribe 1 2 3 o 4. Empieza level_description por el nombre del nivel y dos puntos seguido de la evidencia observable para que la etiqueta quede visible al importar.',
    scoring:
      'La suma de los máximos de todos los criterios debe ser exactamente {max} puntos igual que la calificación máxima de la actividad. Si no hay pesos reparte el máximo por igual entre criterios. Trabaja en milésimas enteras: divide el total entre el número de criterios y asigna el resto al último para que la suma sea exacta. Cada criterio empieza en 0 y tiene cuatro puntuaciones distintas y crecientes con su máximo en Excelente. Usa punto decimal y hasta tres decimales. Si la precisión no permite cuatro puntuaciones distintas pide ajustar el máximo o la precisión antes de generar. No sumes las puntuaciones de todos los niveles: suma solo el máximo de cada criterio.',
    quality:
      'Cada descriptor expresa evidencias que se ven o se oyen en el producto o la exposición. No uses adecuado ni correctamente ni bien. No añadas conductas ajenas a los criterios proporcionados.',
    checks:
      'Antes de entregar verifica la cabecera y cuatro campos por fila. Comprueba la ausencia de caracteres prohibidos dentro de los campos. Verifica cuatro niveles por criterio con puntuaciones distintas y crecientes y mínimo 0. Comprueba que la suma de máximos sea exactamente {max}. Revisa la estructura según la documentación de Aules. No afirmes que se ha probado la importación real si no se ha hecho.',
    delivery:
      'Entrega el archivo descargable rubrica-aules.csv. Si la herramienta no permite adjuntar archivos indícalo y entrega únicamente el CSV íntegro listo para guardar en UTF-8 sin inventar enlaces de descarga. No incluyas explicaciones ni una tabla Markdown dentro del archivo.',
    invalid:
      'Antes de generar la rúbrica pide una puntuación máxima positiva con hasta tres decimales. No generes el CSV hasta corregir ese dato.',
    headings: [
      'Rol',
      'Tarea',
      'Contexto',
      'Criterios aportados',
      'Requisitos técnicos obligatorios',
      'Niveles',
      'Escala de puntuación',
      'Calidad pedagógica',
      'Verificación previa obligatoria',
      'Entrega',
    ],
  },
  'ca-valencia': {
    role: 'Actua com a especialista en avaluació educativa i Moodle.',
    task: 'Genera una rúbrica en CSV per a importar en una tasca d’Aules amb el bloc Importar rúbrica des de CSV.',
    missing:
      'Si falten la tasca o els criteris demana les dades abans de generar l’arxiu. No inventes criteris curriculars ni codis normatius. Si es proporciona un únic criteri alinea tota la rúbrica exclusivament amb eixe criteri sense afegir-ne altres.',
    levels: 'Insuficient · En procés · Assolit · Excel·lent',
    technical:
      'Codificació UTF-8. Capçalera exacta: criterion,level,level_description,score. La coma s’usa només com a separador de columnes. Cap camp pot contindre comes ni punt i coma ni cometes dobles. Substituïx les comes internes per espais. No inclogues salts de línia dins dels camps. Cada fila conté un nivell d’un criteri. Repetix el mateix text de criterion en les quatre files. Exactament quatre nivells per criteri en l’ordre indicat. En level escriu 1 2 3 o 4. Comença level_description pel nom del nivell i dos punts seguit de l’evidència observable perquè l’etiqueta quede visible en importar.',
    scoring:
      'La suma dels màxims de tots els criteris ha de ser exactament {max} punts igual que la qualificació màxima de l’activitat. Si no hi ha pesos repartix el màxim per igual entre criteris. Treballa en mil·lèsimes enteres: dividix el total entre el nombre de criteris i assigna la resta a l’últim perquè la suma siga exacta. Cada criteri comença en 0 i té quatre puntuacions diferents i creixents amb el màxim en Excel·lent. Usa punt decimal i fins a tres decimals. Si la precisió no permet quatre puntuacions diferents demana ajustar el màxim o la precisió abans de generar. No sumes les puntuacions de tots els nivells: suma només el màxim de cada criteri.',
    quality:
      'Cada descriptor expressa evidències que es veuen o s’escolten en el producte o l’exposició. No uses adequat ni correctament ni bé. No afiges conductes alienes als criteris proporcionats.',
    checks:
      'Abans d’entregar verifica la capçalera i quatre camps per fila. Comprova l’absència de caràcters prohibits dins dels camps. Verifica quatre nivells per criteri amb puntuacions diferents i creixents i mínim 0. Comprova que la suma de màxims siga exactament {max}. Revisa l’estructura segons la documentació d’Aules. No afirmes que s’ha provat la importació real si no s’ha fet.',
    delivery:
      'Entrega l’arxiu descarregable rubrica-aules.csv. Si la ferramenta no permet adjuntar arxius indica-ho i entrega únicament el CSV íntegre preparat per a guardar en UTF-8 sense inventar enllaços de descàrrega. No inclogues explicacions ni una taula Markdown dins de l’arxiu.',
    invalid:
      'Abans de generar la rúbrica demana una puntuació màxima positiva amb fins a tres decimals. No generes el CSV fins a corregir la dada.',
    headings: [
      'Rol',
      'Tasca',
      'Context',
      'Criteris aportats',
      'Requisits tècnics obligatoris',
      'Nivells',
      'Escala de puntuació',
      'Qualitat pedagògica',
      'Verificació prèvia obligatòria',
      'Entrega',
    ],
  },
  ca: {
    role: 'Actua com a especialista en avaluació educativa i Moodle.',
    task: 'Genera una rúbrica en CSV per importar en una tasca d’Aules amb el bloc Importar rúbrica des de CSV.',
    missing:
      'Si falten la tasca o els criteris demana les dades abans de generar el fitxer. No inventis criteris curriculars ni codis normatius. Si es proporciona un únic criteri alinea tota la rúbrica exclusivament amb aquest criteri sense afegir-ne altres.',
    levels: 'Insuficient · En procés · Assolit · Excel·lent',
    technical:
      'Codificació UTF-8. Capçalera exacta: criterion,level,level_description,score. La coma s’usa només com a separador de columnes. Cap camp pot contenir comes ni punt i coma ni cometes dobles. Substitueix les comes internes per espais. No incloguis salts de línia dins dels camps. Cada fila conté un nivell d’un criteri. Repeteix el mateix text de criterion en les quatre files. Exactament quatre nivells per criteri en l’ordre indicat. A level escriu 1 2 3 o 4. Comença level_description pel nom del nivell i dos punts seguit de l’evidència observable perquè l’etiqueta quedi visible en importar.',
    scoring:
      'La suma dels màxims de tots els criteris ha de ser exactament {max} punts igual que la qualificació màxima de l’activitat. Si no hi ha pesos reparteix el màxim per igual entre criteris. Treballa en mil·lèsimes enteres: divideix el total entre el nombre de criteris i assigna la resta a l’últim perquè la suma sigui exacta. Cada criteri comença en 0 i té quatre puntuacions diferents i creixents amb el màxim en Excel·lent. Usa punt decimal i fins a tres decimals. Si la precisió no permet quatre puntuacions diferents demana ajustar el màxim o la precisió abans de generar. No sumis les puntuacions de tots els nivells: suma només el màxim de cada criteri.',
    quality:
      'Cada descriptor expressa evidències que es veuen o s’escolten en el producte o l’exposició. No usis adequat ni correctament ni bé. No afegeixis conductes alienes als criteris proporcionats.',
    checks:
      'Abans de lliurar verifica la capçalera i quatre camps per fila. Comprova l’absència de caràcters prohibits dins dels camps. Verifica quatre nivells per criteri amb puntuacions diferents i creixents i mínim 0. Comprova que la suma de màxims sigui exactament {max}. Revisa l’estructura segons la documentació d’Aules. No afirmis que s’ha provat la importació real si no s’ha fet.',
    delivery:
      'Lliura el fitxer descarregable rubrica-aules.csv. Si l’eina no permet adjuntar fitxers indica-ho i lliura únicament el CSV íntegre preparat per desar en UTF-8 sense inventar enllaços de descàrrega. No incloguis explicacions ni una taula Markdown dins del fitxer.',
    invalid:
      'Abans de generar la rúbrica demana una puntuació màxima positiva amb fins a tres decimals. No generis el CSV fins a corregir la dada.',
    headings: [
      'Rol',
      'Tasca',
      'Context',
      'Criteris aportats',
      'Requisits tècnics obligatoris',
      'Nivells',
      'Escala de puntuació',
      'Qualitat pedagògica',
      'Verificació prèvia obligatòria',
      'Lliurament',
    ],
  },
  en: {
    role: 'Act as a specialist in educational assessment and Moodle.',
    task: 'Generate a CSV rubric to import into an Aules assignment using the Import rubric from CSV block.',
    missing:
      'If the task or criteria are missing ask for them before generating the file. Do not invent curriculum criteria or regulatory codes. If a single criterion is supplied align the entire rubric exclusively with it without adding others.',
    levels: 'Insufficient · In progress · Achieved · Excellent',
    technical:
      'UTF-8 encoding. Exact header: criterion,level,level_description,score. Use commas only as column separators. No field may contain commas semicolons or double quotes. Replace internal commas with spaces. No line breaks within fields. Each row contains one level of one criterion. Repeat the same criterion text in its four rows. Exactly four levels per criterion in the given order. Set level to 1 2 3 or 4. Start level_description with the level name and a colon followed by observable evidence so the label remains visible after import.',
    scoring:
      'The sum of the criterion maxima must be exactly {max} points matching the assignment maximum grade. Unless weights are given split the maximum equally between criteria. Work in integer thousandths: divide the total by the number of criteria and assign the remainder to the last one so the sum is exact. Each criterion starts at 0 and has four distinct increasing scores with its maximum at Excellent. Use a decimal point and up to three decimal places. If this precision cannot give four distinct scores ask to adjust the maximum or precision before generating. Do not sum all level scores: sum only each criterion maximum.',
    quality:
      'Every descriptor states evidence that can be seen or heard in the product or presentation. Do not use adequate correctly or well. Do not add behaviours outside the supplied criteria.',
    checks:
      'Before delivery verify the header and four fields per row. Check for prohibited characters within fields. Verify four levels per criterion with distinct increasing scores and minimum 0. Check the maxima sum is exactly {max}. Check the structure against the Aules documentation. Do not claim a real import test was performed unless it was.',
    delivery:
      'Deliver the downloadable file rubrica-aules.csv. If the tool cannot attach files say so and return only the complete CSV ready to save as UTF-8 without inventing download links. Do not put explanations or a Markdown table inside the file.',
    invalid:
      'Before generating the rubric ask for a positive maximum score with up to three decimal places. Do not generate the CSV until this is corrected.',
    headings: [
      'Role',
      'Task',
      'Context',
      'Supplied criteria',
      'Mandatory technical requirements',
      'Levels',
      'Score scale',
      'Pedagogical quality',
      'Mandatory checks before delivery',
      'Delivery',
    ],
  },
}

export function generateRubricCsv(values: Record<string, string>, language: Language): string {
  const t = rubricCsvTexts[language]
  const raw = (values.maxScore || '').trim().replace(',', '.') || '100'
  if (!/^\d+(\.\d{1,3})?$/.test(raw) || !Number.isFinite(Number(raw)) || Number(raw) <= 0) return t.invalid
  const max = String(Number(raw))
  const parts = [
    values.role?.trim() || t.role,
    [localizeOption(RUBRIC_CSV_FORMAT, language), t.task, values.activity?.trim(), t.missing]
      .filter(Boolean)
      .join('\n'),
    [values.level, values.course, values.subject, values.context, values.curriculumContext].filter(Boolean).join('\n'),
    [values.criteria, values.curriculumCriteria].filter(Boolean).join('\n'),
    t.technical,
    t.levels,
    t.scoring.replaceAll('{max}', max),
    t.quality,
    t.checks.replaceAll('{max}', max),
    t.delivery + '\n' + AULES_RUBRIC_HELP,
  ]
  return parts.map((text, index) => `## ${t.headings[index]}\n${text}`).join('\n\n')
}
