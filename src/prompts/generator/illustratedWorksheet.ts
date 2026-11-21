import type { Language } from '../../types'

// Ficha ilustrada para imprimir: el prompt pide a una IA de imágenes una ficha
// A4 con temática, acabado (para colorear o en color) y varias actividades.
// Idea inspirada en el generador de fichas gamificadas de Sandra Fortanet
// (sanforbel.github.io/generador-fitxes); textos redactados de nuevo.

export const worksheetThemes = [
  'Espacio',
  'Dinosaurios',
  'Piratas y tesoros',
  'Fondo marino',
  'Robots',
  'Deportes',
  'Castillos y dragones',
  'Selva y animales',
  'Magia',
  'Cocina',
  'Detectives',
  'Vehículos',
  'Granja',
  'Superhéroes',
  'Invierno',
  'Arcade retro',
]

type Lang = 'es' | 'ca' | 'en'
const langOf = (language: Language): Lang => (language === 'en' ? 'en' : language === 'es' ? 'es' : 'ca')

// Elementos que se dibujan en cada temática: genéricos, sin marcas ni personajes conocidos.
const themeElements: Record<string, Record<Lang, string>> = {
  Espacio: {
    es: 'cohetes, planetas, estrellas, astronautas y alienígenas simpáticos',
    ca: 'coets, planetes, estrelles, astronautes i alienígenes simpàtics',
    en: 'rockets, planets, stars, astronauts and friendly aliens',
  },
  Dinosaurios: {
    es: 'dinosaurios amables, huevos, volcanes, helechos y huellas',
    ca: 'dinosaures amables, ous, volcans, falgueres i petjades',
    en: 'friendly dinosaurs, eggs, volcanoes, ferns and footprints',
  },
  'Piratas y tesoros': {
    es: 'barcos pirata, mapas del tesoro, cofres, loros, islas y monedas',
    ca: 'vaixells pirata, mapes del tresor, cofres, lloros, illes i monedes',
    en: 'pirate ships, treasure maps, chests, parrots, islands and coins',
  },
  'Fondo marino': {
    es: 'peces, medusas, tortugas, corales, burbujas y un submarino',
    ca: 'peixos, meduses, tortugues, coralls, bombolles i un submarí',
    en: 'fish, jellyfish, turtles, coral, bubbles and a submarine',
  },
  Robots: {
    es: 'robots simpáticos, engranajes, circuitos, tornillos y botones',
    ca: 'robots simpàtics, engranatges, circuits, cargols i botons',
    en: 'friendly robots, gears, circuits, bolts and buttons',
  },
  Deportes: {
    es: 'balones, porterías, medallas, copas, cronómetros y zapatillas',
    ca: 'pilotes, porteries, medalles, copes, cronòmetres i sabatilles',
    en: 'balls, goals, medals, trophies, stopwatches and trainers',
  },
  'Castillos y dragones': {
    es: 'castillos, caballeros, dragones amables, escudos y banderas',
    ca: 'castells, cavallers, dracs amables, escuts i banderes',
    en: 'castles, knights, friendly dragons, shields and banners',
  },
  'Selva y animales': {
    es: 'leones, monos, jirafas, loros, mariposas y lianas',
    ca: 'lleons, micos, girafes, lloros, papallones i lianes',
    en: 'lions, monkeys, giraffes, parrots, butterflies and vines',
  },
  Magia: {
    es: 'sombreros de mago, varitas, estrellas, lunas y libros mágicos',
    ca: 'barrets de mag, varetes, estrelles, llunes i llibres màgics',
    en: 'wizard hats, wands, stars, moons and magic books',
  },
  Cocina: {
    es: 'pasteles, frutas, verduras, utensilios de cocina y cocineros simpáticos',
    ca: 'pastissos, fruites, verdures, estris de cuina i cuiners simpàtics',
    en: 'cakes, fruit, vegetables, kitchen utensils and friendly cooks',
  },
  Detectives: {
    es: 'lupas, huellas, pistas, candados, llaves y mapas',
    ca: 'lupes, empremtes, pistes, cadenats, claus i mapes',
    en: 'magnifying glasses, footprints, clues, padlocks, keys and maps',
  },
  Vehículos: {
    es: 'trenes, coches, autobuses, aviones, bicicletas y señales de tráfico',
    ca: 'trens, cotxes, autobusos, avions, bicicletes i senyals de trànsit',
    en: 'trains, cars, buses, planes, bicycles and road signs',
  },
  Granja: {
    es: 'vacas, gallinas, ovejas, cerdos, un tractor y un granero',
    ca: 'vaques, gallines, ovelles, porcs, un tractor i un graner',
    en: 'cows, hens, sheep, pigs, a tractor and a barn',
  },
  Superhéroes: {
    es: 'héroes y heroínas con capa inventados, rayos, escudos y edificios de ciudad',
    ca: 'herois i heroïnes amb capa inventats, llamps, escuts i edificis de ciutat',
    en: 'made-up caped heroes, lightning bolts, shields and city buildings',
  },
  Invierno: {
    es: 'muñecos de nieve, copos, gorros, bufandas, pinos y trineos',
    ca: 'ninots de neu, flocs, gorros, bufandes, pins i trineus',
    en: 'snowmen, snowflakes, hats, scarves, pine trees and sledges',
  },
  'Arcade retro': {
    es: 'un personaje redondo que recorre un laberinto, fantasmitas amables, frutas, gemas y estilo pixel art',
    ca: 'un personatge rodó que recorre un laberint, fantasmets amables, fruites, gemmes i estil pixel art',
    en: 'a round character moving through a maze, friendly little ghosts, fruit, gems and a pixel-art style',
  },
}

const texts: Record<
  Lang,
  {
    intro: (topic: string) => string
    theme: (name: string, elements: string) => string
    custom: (elements: string) => string
    noTheme: string
    original: string
    finish: (name: string, detail: string) => string
    bw: string
    color: string
    noFinish: string
    activities: (list: string) => string
    noActivities: string
    layout: string
    items: (items: string) => string
    noItems: string
    sheetLanguage: (name: string) => string
    valencian: string
    process: string
  }
> = {
  es: {
    intro: (topic) =>
      `Genera una ficha de actividades escolares ilustrada sobre ${topic}, en formato A4 vertical y lista para imprimir.`,
    theme: (name, elements) => `Temática: ${name} (${elements}).`,
    custom: (elements) => `Personajes y elementos de la temática: ${elements}.`,
    noTheme: 'Elige una temática atractiva para la edad del alumnado y relacionada con el contenido.',
    original:
      'Todos los personajes y elementos son genéricos y originales: sin marcas, logotipos ni personajes conocidos.',
    finish: (name, detail) => `Acabado: ${name}. ${detail}`,
    bw: 'Solo contornos negros limpios y gruesos sobre fondo blanco, sin grises ni sombreados, con zonas amplias para colorear.',
    color:
      'Colores alegres pero suaves, fondo claro y buen contraste entre el texto y el fondo; evita los fondos oscuros que gastan tinta.',
    noFinish: 'Acabado: contornos claros y fondo blanco, apto para imprimir en blanco y negro.',
    activities: (list) => `Actividades, todas en la misma ficha, numeradas y separadas en recuadros: ${list}.`,
    noActivities: 'Incluye de tres a cinco actividades variadas, numeradas y separadas en recuadros.',
    layout:
      'Estructura: título grande y legible arriba, líneas para el nombre y la fecha, una instrucción breve encima de cada actividad, márgenes amplios y espacio suficiente para responder a mano. Los dibujos acompañan a los ejercicios sin tapar el texto.',
    items: (items) => `Usa exactamente estos ejercicios, palabras o datos, sin cambiarlos:\n${items}`,
    noItems: 'Propón tú los ejercicios, adecuados al nivel y al contenido.',
    sheetLanguage: (name) =>
      `Idioma de todos los textos de la ficha: ${name}. Revisa que no haya faltas de ortografía.`,
    valencian: 'Usa el valenciano normativo de la Acadèmia Valenciana de la Llengua (AVL).',
    process:
      'Antes de generar la imagen, escribe en texto la lista de ejercicios con sus soluciones y comprueba que son correctas; después dibuja la ficha con exactamente esos ejercicios. Tras la imagen, incluye el solucionario en texto para el docente. Si el dibujo queda recargado, simplifícalo con líneas más gruesas y menos elementos. Las IA de imágenes pueden escribir mal números y palabras: termina indicando qué debe comprobar el docente antes de imprimir.',
  },
  ca: {
    intro: (topic) =>
      `Genera una fitxa d’activitats escolars il·lustrada sobre ${topic}, en format A4 vertical i a punt per a imprimir.`,
    theme: (name, elements) => `Temàtica: ${name} (${elements}).`,
    custom: (elements) => `Personatges i elements de la temàtica: ${elements}.`,
    noTheme: 'Tria una temàtica atractiva per a l’edat de l’alumnat i relacionada amb el contingut.',
    original:
      'Tots els personatges i elements són genèrics i originals: sense marques, logotips ni personatges coneguts.',
    finish: (name, detail) => `Acabat: ${name}. ${detail}`,
    bw: 'Només contorns negres nets i gruixuts sobre fons blanc, sense grisos ni ombrejats, amb zones àmplies per a pintar.',
    color:
      'Colors alegres però suaus, fons clar i bon contrast entre el text i el fons; evita els fons foscos que gasten tinta.',
    noFinish: 'Acabat: contorns clars i fons blanc, apte per a imprimir en blanc i negre.',
    activities: (list) => `Activitats, totes en la mateixa fitxa, numerades i separades en requadres: ${list}.`,
    noActivities: 'Inclou de tres a cinc activitats variades, numerades i separades en requadres.',
    layout:
      'Estructura: títol gran i llegible a dalt, línies per al nom i la data, una instrucció breu damunt de cada activitat, marges amplis i espai suficient per a respondre a mà. Els dibuixos acompanyen els exercicis sense tapar el text.',
    items: (items) => `Usa exactament aquests exercicis, paraules o dades, sense canviar-los:\n${items}`,
    noItems: 'Proposa tu els exercicis, adequats al nivell i al contingut.',
    sheetLanguage: (name) => `Llengua de tots els textos de la fitxa: ${name}. Comprova l’ortografia.`,
    valencian: 'Usa el valencià normatiu de l’Acadèmia Valenciana de la Llengua (AVL).',
    process:
      'Abans de generar la imatge, escriu en text la llista d’exercicis amb les solucions i comprova que són correctes; després dibuixa la fitxa amb exactament aquests exercicis. Després de la imatge, inclou el solucionari en text per al docent. Si el dibuix queda recarregat, simplifica’l amb línies més gruixudes i menys elements. Les IA d’imatges poden escriure malament números i paraules: acaba indicant què ha de comprovar el docent abans d’imprimir.',
  },
  en: {
    intro: (topic) =>
      `Generate an illustrated school activity worksheet about ${topic}, in A4 portrait format, ready to print.`,
    theme: (name, elements) => `Theme: ${name} (${elements}).`,
    custom: (elements) => `Theme characters and elements: ${elements}.`,
    noTheme: 'Choose a theme that appeals to the students’ age and relates to the content.',
    original: 'All characters and elements are generic and original: no brands, logos or well-known characters.',
    finish: (name, detail) => `Finish: ${name}. ${detail}`,
    bw: 'Clean, thick black outlines on a white background only, with no greys or shading, and large areas to colour in.',
    color:
      'Cheerful but soft colours, a light background and good contrast between text and background; avoid dark backgrounds that waste ink.',
    noFinish: 'Finish: clear outlines and a white background, suitable for black-and-white printing.',
    activities: (list) => `Activities, all on the same sheet, numbered and in separate boxes: ${list}.`,
    noActivities: 'Include three to five varied activities, numbered and in separate boxes.',
    layout:
      'Layout: a large, legible title at the top, lines for name and date, a short instruction above each activity, wide margins and enough space to answer by hand. Drawings support the exercises without covering the text.',
    items: (items) => `Use exactly these exercises, words or data, without changing them:\n${items}`,
    noItems: 'Suggest the exercises yourself, suited to the level and the content.',
    sheetLanguage: (name) =>
      `Language for all the text on the worksheet: ${name}. Check there are no spelling mistakes.`,
    valencian: 'Use standard Valencian as set by the Acadèmia Valenciana de la Llengua (AVL).',
    process:
      'Before generating the image, write out the list of exercises with their solutions and check they are correct; then draw the worksheet with exactly those exercises. After the image, include the answer key as text for the teacher. If the drawing looks cluttered, simplify it with thicker lines and fewer elements. Image AIs can misspell numbers and words: finish by listing what the teacher should check before printing.',
  },
}

export function illustratedWorksheetTask(
  language: Language,
  topic: string,
  value: (key: string) => string,
  raw: Record<string, string>,
): string {
  const lang = langOf(language)
  const t = texts[lang]
  const parts = [t.intro(topic)]
  const theme = (raw['theme'] || '').trim()
  const custom = value('themeElements')
  if (theme && themeElements[theme]) parts.push(t.theme(value('theme'), themeElements[theme][lang]))
  if (custom) parts.push(t.custom(custom))
  if (!theme && !custom) parts.push(t.noTheme)
  parts.push(t.original)
  const finish = (raw['printFinish'] || '').trim()
  parts.push(finish ? t.finish(value('printFinish'), finish === 'Color' ? t.color : t.bw) : t.noFinish)
  const activities = value('activityType').split(' · ').filter(Boolean)
  parts.push(activities.length ? t.activities(activities.join(', ')) : t.noActivities)
  parts.push(t.layout)
  parts.push(value('gameItems') ? t.items(value('gameItems')) : t.noItems)
  const sheetLanguage = (raw['sheetLanguage'] || '').trim()
  if (sheetLanguage) {
    parts.push(t.sheetLanguage(value('sheetLanguage')))
    if (sheetLanguage === 'Valenciano') parts.push(t.valencian)
  }
  parts.push(t.process)
  return parts.join('\n\n')
}

export const worksheetLanguages = [
  'Castellano',
  'Valenciano',
  'Catalán',
  'Inglés',
  'Francés',
  'Alemán',
  'Italiano',
  'Portugués',
]

// Para las pruebas: temáticas que tienen elementos definidos.
export const themesWithElements = () => worksheetThemes.filter((theme) => themeElements[theme])
