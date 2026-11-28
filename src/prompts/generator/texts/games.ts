import type { Language } from '../../../types'

export type GameTexts = {
  task: string
  mechanic: string
  mechanics: string
  items: string
  itemsNote: string
  noItems: string
  tech: string
  techItems: string[]
  features: string
  featureTexts: Record<string, string>
  checks: string[]
}
export const gameTexts: Record<Language, GameTexts> = {
  es: {
    task: 'Crea un único archivo HTML autocontenido (HTML, CSS y JavaScript en el mismo fichero) con ejercicios interactivos sobre',
    mechanic: 'Mecánica de juego:',
    mechanics: 'Mecánicas de juego (combínalas o altérnalas entre ejercicios):',
    items: 'Contenido de los ejercicios',
    itemsNote:
      'Guarda estos datos en un array de objetos al principio del script, con un comentario que explique cómo añadir o cambiar elementos.',
    noItems:
      'Propón 20 elementos adecuados al nivel y guárdalos en un array de objetos al principio del script, con un comentario que explique cómo añadir o cambiar elementos.',
    tech: 'Requisitos técnicos',
    techItems: [
      'Funciona sin conexión al abrir el archivo en un navegador moderno: sin servidor, dependencias externas, CDN ni imágenes externas; los iconos son emojis.',
      'Presenta un ejercicio cada vez, en orden aleatorio, con feedback inmediato (acierto en verde, error en rojo con una animación suave) y la posibilidad de reintentar.',
      'La pantalla del alumnado es limpia, con letra grande, colores vivos con buen contraste y diseño adaptable a móvil, tableta y ordenador.',
      'Se puede usar con teclado, ratón o pantalla táctil, y los controles tienen etiquetas accesibles.',
      'No recoge ni envía datos personales del alumnado.',
      'Usa ventanas modales para confirmar las acciones destructivas y avisos breves para confirmar el resto.',
      'El código está ordenado y comentado en castellano, e incluye un pie de página discreto que indica que es un recurso educativo creado con ayuda de IA.',
    ],
    features: 'Funciones del juego',
    featureTexts: {
      'Niveles y trofeos':
        'Niveles y trofeos: cada 10 ejercicios completados se supera un nivel, con una pantalla de celebración (icono animado distinto por nivel, confeti en CSS y galería con los trofeos conseguidos) y una pantalla final al terminar todos los ejercicios.',
      'Ayuda para el alumnado':
        'Ayuda para el alumnado: un botón «❓ ¿Cómo se juega?» despliega los pasos del juego con iconos y frases cortas, y se oculta al pulsarlo de nuevo.',
      'Menú docente oculto':
        'Menú docente oculto: las opciones de gestión están en un menú lateral (botón ☰ en la esquina superior derecha) para no distraer al alumnado.',
      'Manual docente':
        'Manual docente: una ventana modal explica el objetivo, la mecánica de juego, el formato de los datos y la gestión de las sesiones.',
      'Guardar sesión':
        'Guardar sesión: guarda el progreso en localStorage y permite descargar y cargar un archivo JSON con la fecha en el nombre para continuar en otro dispositivo. «Nueva partida» solo reinicia el estado en memoria; borrar la sesión guardada es una acción explícita con confirmación.',
      'Cargar contenido CSV':
        'Cargar contenido CSV: permite cargar ejercicios nuevos desde un CSV (las líneas con # son comentarios) y descargar un modelo; valida los datos antes de cargarlos, informa de las filas con errores y pide confirmación si hay una partida en curso.',
    },
    checks: [
      'Revisa que las respuestas correctas de los datos sean exactas y señala cualquier duda.',
      'Explica brevemente cómo abrir y probar el archivo en los navegadores y dispositivos del aula.',
    ],
  },
  'ca-valencia': {
    task: 'Crea un únic fitxer HTML autocontingut (HTML, CSS i JavaScript en el mateix fitxer) amb exercicis interactius sobre',
    mechanic: 'Mecànica de joc:',
    mechanics: 'Mecàniques de joc (combina-les o alterna-les entre exercicis):',
    items: 'Contingut dels exercicis',
    itemsNote:
      'Guarda estes dades en un array d’objectes al principi de l’script, amb un comentari que explique com afegir o canviar elements.',
    noItems:
      'Proposa 20 elements adequats al nivell i guarda’ls en un array d’objectes al principi de l’script, amb un comentari que explique com afegir o canviar elements.',
    tech: 'Requisits tècnics',
    techItems: [
      'Funciona sense connexió en obrir el fitxer en un navegador modern: sense servidor, dependències externes, CDN ni imatges externes; les icones són emojis.',
      'Presenta un exercici cada vegada, en orde aleatori, amb feedback immediat (encert en verd, error en roig amb una animació suau) i la possibilitat de tornar-ho a intentar.',
      'La pantalla de l’alumnat és neta, amb lletra gran, colors vius amb bon contrast i disseny adaptable a mòbil, tauleta i ordinador.',
      'Es pot usar amb teclat, ratolí o pantalla tàctil, i els controls tenen etiquetes accessibles.',
      'No recull ni envia dades personals de l’alumnat.',
      'Usa finestres modals per a confirmar les accions destructives i avisos breus per a confirmar la resta.',
      'El codi està ordenat i comentat en valencià, i inclou un peu de pàgina discret que indica que és un recurs educatiu creat amb ajuda d’IA.',
    ],
    features: 'Funcions del joc',
    featureTexts: {
      'Niveles y trofeos':
        'Nivells i trofeus: cada 10 exercicis completats se supera un nivell, amb una pantalla de celebració (icona animada diferent per nivell, confeti en CSS i galeria amb els trofeus aconseguits) i una pantalla final en acabar tots els exercicis.',
      'Ayuda para el alumnado':
        'Ajuda per a l’alumnat: un botó «❓ Com es juga?» desplega els passos del joc amb icones i frases curtes, i s’amaga en tornar a prémer-lo.',
      'Menú docente oculto':
        'Menú docent amagat: les opcions de gestió estan en un menú lateral (botó ☰ en la cantonada superior dreta) per a no distraure l’alumnat.',
      'Manual docente':
        'Manual docent: una finestra modal explica l’objectiu, la mecànica de joc, el format de les dades i la gestió de les sessions.',
      'Guardar sesión':
        'Guardar la sessió: guarda el progrés en localStorage i permet descarregar i carregar un fitxer JSON amb la data en el nom per a continuar en un altre dispositiu. «Nova partida» només reinicia l’estat en memòria; esborrar la sessió guardada és una acció explícita amb confirmació.',
      'Cargar contenido CSV':
        'Carregar contingut CSV: permet carregar exercicis nous des d’un CSV (les línies amb # són comentaris) i descarregar un model; valida les dades abans de carregar-les, informa de les files amb errors i demana confirmació si hi ha una partida en curs.',
    },
    checks: [
      'Revisa que les respostes correctes de les dades siguen exactes i assenyala qualsevol dubte.',
      'Explica breument com obrir i provar el fitxer en els navegadors i dispositius de l’aula.',
    ],
  },
  ca: {
    task: 'Crea un únic fitxer HTML autocontingut (HTML, CSS i JavaScript en el mateix fitxer) amb exercicis interactius sobre',
    mechanic: 'Mecànica de joc:',
    mechanics: 'Mecàniques de joc (combina-les o alterna-les entre exercicis):',
    items: 'Contingut dels exercicis',
    itemsNote:
      'Desa aquestes dades en un array d’objectes al principi de l’script, amb un comentari que expliqui com afegir o canviar elements.',
    noItems:
      'Proposa 20 elements adequats al nivell i desa’ls en un array d’objectes al principi de l’script, amb un comentari que expliqui com afegir o canviar elements.',
    tech: 'Requisits tècnics',
    techItems: [
      'Funciona sense connexió en obrir el fitxer en un navegador modern: sense servidor, dependències externes, CDN ni imatges externes; les icones són emojis.',
      'Presenta un exercici cada vegada, en ordre aleatori, amb feedback immediat (encert en verd, error en vermell amb una animació suau) i la possibilitat de tornar-ho a intentar.',
      'La pantalla de l’alumnat és neta, amb lletra gran, colors vius amb bon contrast i disseny adaptable a mòbil, tauleta i ordinador.',
      'Es pot fer servir amb teclat, ratolí o pantalla tàctil, i els controls tenen etiquetes accessibles.',
      'No recull ni envia dades personals de l’alumnat.',
      'Fa servir finestres modals per confirmar les accions destructives i avisos breus per confirmar la resta.',
      'El codi està ordenat i comentat en català, i inclou un peu de pàgina discret que indica que és un recurs educatiu creat amb ajuda d’IA.',
    ],
    features: 'Funcions del joc',
    featureTexts: {
      'Niveles y trofeos':
        'Nivells i trofeus: cada 10 exercicis completats se supera un nivell, amb una pantalla de celebració (icona animada diferent per nivell, confeti en CSS i galeria amb els trofeus aconseguits) i una pantalla final en acabar tots els exercicis.',
      'Ayuda para el alumnado':
        'Ajuda per a l’alumnat: un botó «❓ Com es juga?» desplega els passos del joc amb icones i frases curtes, i s’amaga en tornar-lo a prémer.',
      'Menú docente oculto':
        'Menú docent amagat: les opcions de gestió són en un menú lateral (botó ☰ a la cantonada superior dreta) per no distreure l’alumnat.',
      'Manual docente':
        'Manual docent: una finestra modal explica l’objectiu, la mecànica de joc, el format de les dades i la gestió de les sessions.',
      'Guardar sesión':
        'Desar la sessió: desa el progrés a localStorage i permet descarregar i carregar un fitxer JSON amb la data al nom per continuar en un altre dispositiu. «Nova partida» només reinicia l’estat en memòria; esborrar la sessió desada és una acció explícita amb confirmació.',
      'Cargar contenido CSV':
        'Carregar contingut CSV: permet carregar exercicis nous des d’un CSV (les línies amb # són comentaris) i descarregar un model; valida les dades abans de carregar-les, informa de les files amb errors i demana confirmació si hi ha una partida en curs.',
    },
    checks: [
      'Revisa que les respostes correctes de les dades siguin exactes i assenyala qualsevol dubte.',
      'Explica breument com obrir i provar el fitxer als navegadors i dispositius de l’aula.',
    ],
  },
  en: {
    task: 'Create a single self-contained HTML file (HTML, CSS and JavaScript in the same file) with interactive exercises about',
    mechanic: 'Game mechanic:',
    mechanics: 'Game mechanics (combine them or alternate them across exercises):',
    items: 'Exercise content',
    itemsNote:
      'Store this data in an array of objects at the top of the script, with a comment explaining how to add or change items.',
    noItems:
      'Propose 20 items suited to the level and store them in an array of objects at the top of the script, with a comment explaining how to add or change items.',
    tech: 'Technical requirements',
    techItems: [
      'Works offline when the file is opened in a modern browser: no server, external dependencies, CDNs or external images; icons are emojis.',
      'Shows one exercise at a time, in random order, with immediate feedback (correct in green, mistakes in red with a gentle animation) and the chance to try again.',
      'The learner screen is clean, with large type, bright colours with good contrast and a layout that adapts to phone, tablet and computer.',
      'It can be used with keyboard, mouse or touch screen, and controls have accessible labels.',
      'It does not collect or send learners’ personal data.',
      'Uses modal dialogs to confirm destructive actions and short notices to confirm the rest.',
      'The code is tidy and commented in English, and it includes a discreet footer stating it is an educational resource created with the help of AI.',
    ],
    features: 'Game features',
    featureTexts: {
      'Niveles y trofeos':
        'Levels and trophies: every 10 completed exercises the learner moves up a level, with a celebration screen (a different animated icon per level, CSS confetti and a gallery of trophies earned) and a final screen when all exercises are done.',
      'Ayuda para el alumnado':
        'Help for learners: a “❓ How to play” button reveals the game steps with icons and short sentences, and hides them when pressed again.',
      'Menú docente oculto':
        'Hidden teacher menu: management options sit in a side menu (☰ button in the top-right corner) so they do not distract learners.',
      'Manual docente':
        'Teacher guide: a modal dialog explains the aim, the game mechanic, the data format and session management.',
      'Guardar sesión':
        'Save session: progress is saved to localStorage and can be downloaded and loaded as a dated JSON file to continue on another device. “New game” only resets the in-memory state; deleting the saved session is an explicit, confirmed action.',
      'Cargar contenido CSV':
        'Load content from CSV: new exercises can be loaded from a CSV (lines starting with # are comments) and a template can be downloaded; data is validated before loading, rows with errors are reported and confirmation is requested if a game is in progress.',
    },
    checks: [
      'Check that the correct answers in the data are accurate and flag any doubts.',
      'Briefly explain how to open and test the file in the classroom browsers and devices.',
    ],
  },
}

// Encargos de los instrumentos de evaluación: se completan con la actividad
// que se evalúa. En la prueba escrita, «levels» es la puntuación máxima.
