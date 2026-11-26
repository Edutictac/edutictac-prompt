import type { Language } from '../../types'

type Brief = { opening: string; destination: string; rules: string }
const briefs: Record<'es' | 'ca' | 'en', Brief> = {
  es: {
    opening: 'Prepara contenido matemático sobre',
    destination: 'Editor de destino',
    rules: String.raw`Usa LaTeX para componer TODAS las expresiones matemáticas y mostrarlas como fórmulas renderizadas dentro del contenido: fracciones, potencias, raíces, ecuaciones, operaciones, sustituciones numéricas, pasos intermedios, unidades y resultados. Conserva las explicaciones en texto normal e integra las fórmulas en su lugar correspondiente. Incluye el desarrollo completo cuando se pida resolver.
Entrega el material terminado, con las fórmulas visualmente compuestas y legibles. No devuelvas código fuente LaTeX, bloques de código, comandos a la vista ni un tutorial para copiar fórmulas. Usa los delimitadores matemáticos que renderice el entorno de respuesta, como \( ... \) en línea y \[ ... \] en bloque, fuera de bloques de código. No sustituyas las fórmulas por imágenes, capturas ni símbolos Unicode que imiten fracciones o exponentes.
Adapta el resultado al editor de destino. Si se pide Word o DOCX y puedes generar archivos, crea un documento .docx con ecuaciones nativas editables (OMML), ya compuestas dentro del texto, sin imágenes de ecuaciones ni código LaTeX visible. Para ODT, usa ecuaciones nativas editables del documento. En Moodle/Aules, usa la notación matemática compatible con su filtro para que las fórmulas se visualicen en el contenido. Para Overleaf, si puedes generar archivos, adjunta el .tex editable y su PDF compilado sin volcar el código en la respuesta; no afirmes haber compilado sin hacerlo. Si no puedes crear el archivo solicitado, explica brevemente esa limitación y entrega el contenido con fórmulas renderizadas en la respuesta. Si no se indica destino, muestra directamente el contenido con las fórmulas renderizadas.
Una fórmula visible en el chat no garantiza que al copiarla se convierta en una ecuación editable de Word. Un PDF sirve para visualizar e imprimir; si se pide un PDF y se necesitan fórmulas editables, entrega también un documento editable si puedes generarlo. No prometas editabilidad en un archivo que no hayas podido crear.
Si hay texto de partida, conserva sus datos y enunciados. Resuelve solo si se pide; si detectas un error en el original, señálalo por separado sin cambiarlo en silencio. Comprueba los cálculos que realices, las igualdades, unidades, signos y redondeos; distingue igualdad de aproximación y explicita las restricciones de dominio.`,
  },
  ca: {
    opening: 'Prepara contingut matemàtic sobre',
    destination: 'Editor de destinació',
    rules: String.raw`Usa LaTeX per a compondre TOTES les expressions matemàtiques i mostrar-les com a fórmules renderitzades dins del contingut: fraccions, potències, arrels, equacions, operacions, substitucions numèriques, passos intermedis, unitats i resultats. Conserva les explicacions en text normal i integra les fórmules en el lloc corresponent. Inclou el procediment complet quan es demana resoldre.
Entrega el material acabat, amb les fórmules visualment compostes i llegibles. No retornes codi font LaTeX, blocs de codi, ordres a la vista ni un tutorial per a copiar fórmules. Usa els delimitadors matemàtics que renderitza l’entorn de resposta, com \( ... \) en línia i \[ ... \] en bloc, fora de blocs de codi. No substituïsques les fórmules per imatges, captures ni símbols Unicode que imiten fraccions o exponents.
Adapta el resultat a l’editor de destinació. Si es demana Word o DOCX i pots generar arxius, crea un document .docx amb equacions natives editables (OMML), ja compostes dins del text, sense imatges d’equacions ni codi LaTeX visible. Per a ODT, usa equacions natives editables del document. En Moodle/Aules, usa la notació matemàtica compatible amb el filtre per a visualitzar les fórmules dins del contingut. Per a Overleaf, si pots generar arxius, adjunta el .tex editable i el PDF compilat sense mostrar el codi en la resposta; no afirmes haver compilat sense fer-ho. Si no pots crear l’arxiu demanat, explica breument la limitació i entrega el contingut amb fórmules renderitzades en la resposta. Si no s’indica destinació, mostra directament el contingut amb les fórmules renderitzades.
Una fórmula visible en el xat no garantix que en copiar-la es convertisca en una equació editable de Word. Un PDF permet visualitzar i imprimir; si es demana un PDF i calen fórmules editables, entrega també un document editable si pots generar-lo. No prometes editabilitat en un arxiu que no has pogut crear.
Si hi ha text de partida, conserva les dades i els enunciats. Resol només si es demana; si detectes un error en l’original, assenyala’l per separat sense canviar-lo en silenci. Comprova els càlculs que faces, les igualtats, unitats, signes i arrodoniments; diferencia igualtat d’aproximació i explicita les restriccions de domini.`,
  },
  en: {
    opening: 'Prepare mathematical content about',
    destination: 'Destination editor',
    rules: String.raw`Use LaTeX to typeset ALL mathematical expressions and display them as rendered formulas within the content: fractions, powers, roots, equations, operations, numerical substitutions, intermediate steps, units and results. Keep explanations in ordinary text and integrate each formula in its appropriate place. Include the full working when asked to solve.
Deliver finished material with visually typeset, readable formulas. Do not return LaTeX source, code blocks, visible commands or a tutorial for copying formulas. Use the math delimiters rendered by the response environment, such as \( ... \) inline and \[ ... \] for display math, outside code blocks. Do not replace formulas with images, screenshots or Unicode symbols that imitate fractions or exponents.
Adapt the result to the destination editor. If Word or DOCX is requested and you can generate files, create a .docx document with native editable equations (OMML), already typeset within the text, without equation images or visible LaTeX code. For ODT, use native editable document equations. In Moodle/Aules, use math notation compatible with its filter so formulas display within the content. For Overleaf, if you can generate files, attach an editable .tex and its compiled PDF without dumping source into the response; do not claim compilation without doing it. If you cannot create the requested file, briefly explain the limitation and deliver content with rendered formulas in the response. If no destination is specified, show the content with rendered formulas directly.
A formula displayed in chat does not guarantee that pasting it into Word produces an editable equation. A PDF supports viewing and printing; if a PDF is requested and editable formulas are needed, also provide an editable document if you can generate it. Do not promise editability in a file you could not create.
If source text is supplied, preserve its data and statements. Solve only when requested; flag any error in the original separately rather than silently changing it. Check any calculations you perform, equalities, units, signs and rounding; distinguish equality from approximation and state domain restrictions.`,
  },
}

export function editableLatexTask(language: Language, topic: string, value: (key: string) => string): string {
  const b = briefs[language === 'ca-valencia' ? 'ca' : language]
  const rules =
    language === 'ca'
      ? b.rules
          .replaceAll('arxius', 'fitxers')
          .replaceAll('arxiu', 'fitxer')
          .replace('retornes', 'retornis')
          .replace('substituïsques', 'substitueixis')
          .replace('afirmes', 'afirmis')
          .replace('garantix', 'garanteix')
          .replace('convertisca', 'converteixi')
          .replace('prometes', 'prometis')
          .replace('faces', 'facis')
      : b.rules
  return [
    `${b.opening} ${topic}.`,
    value('task'),
    value('mathDestination') ? `${b.destination}: ${value('mathDestination')}.` : '',
    rules,
  ]
    .filter(Boolean)
    .join('\n\n')
}
