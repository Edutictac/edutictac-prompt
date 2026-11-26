import type { Language } from '../../types'

type Brief = { opening: string; destination: string; rules: string }
const briefs: Record<'es' | 'ca' | 'en', Brief> = {
  es: {
    opening: 'Prepara contenido matemático sobre',
    destination: 'Editor de destino',
    rules: String.raw`Escribe TODAS las expresiones matemáticas en LaTeX editable: fórmulas, operaciones, sustituciones numéricas, pasos intermedios, unidades y resultados. Conserva las explicaciones en texto normal. No sustituyas las expresiones por imágenes, capturas ni símbolos Unicode que imiten fracciones o exponentes.
Entrega el código fuente literal y copiable en bloques de código etiquetados latex, aunque también muestres una versión renderizada. Incluye el desarrollo completo, no solo el resultado final. Usa comandos estándar como \frac{a}{b}, x^{2}, x_{1}, \sqrt{x}, \cdot y \mathrm{m}; equilibra llaves y conserva una notación consistente.
Adapta la entrega al editor indicado. Para Markdown o Moodle/Aules, indica los delimitadores de matemáticas en línea y en bloque que admita su configuración; si se desconoce, propone \( ... \) y \[ ... \] y pide comprobar el filtro matemático. Para Word, entrega cada expresión por separado, sin delimitadores ni entornos de documento, para pegarla en Insertar > Ecuación con entrada LaTeX y convertirla a formato profesional. Word admite un subconjunto de LaTeX: evita macros personalizadas y no prometas compatibilidad universal. Para Overleaf, entrega además el código de un documento .tex mínimo completo, con los paquetes necesarios como amsmath. Si no se indica destino, usa fragmentos LaTeX estándar y pregunta dónde se van a editar.
Si hay texto de partida, conserva sus datos y enunciados; distingue convertir a LaTeX de resolver ejercicios. Resuelve solo si se pide; si detectas un error en el original, señálalo por separado sin cambiarlo en silencio. Comprueba los cálculos que realices, las igualdades, unidades, signos y redondeos; distingue = de \approx y explicita las restricciones de dominio. No afirmes haber compilado o probado el código si no lo has hecho.
Un PDF o una fórmula renderizada no bastan: entrega siempre el código fuente que permita editar cada expresión.`,
  },
  ca: {
    opening: 'Prepara contingut matemàtic sobre',
    destination: 'Editor de destinació',
    rules: String.raw`Escriu TOTES les expressions matemàtiques en LaTeX editable: fórmules, operacions, substitucions numèriques, passos intermedis, unitats i resultats. Conserva les explicacions en text normal. No substituïsques les expressions per imatges, captures ni símbols Unicode que imiten fraccions o exponents.
Entrega el codi font literal i que es pot copiar en blocs de codi etiquetats latex, encara que també mostres una versió renderitzada. Inclou el procediment complet, no només el resultat final. Usa ordres estàndard com \frac{a}{b}, x^{2}, x_{1}, \sqrt{x}, \cdot i \mathrm{m}; equilibra les claus i conserva una notació coherent.
Adapta el resultat a l’editor indicat. Per a Markdown o Moodle/Aules, indica els delimitadors de matemàtiques en línia i en bloc que admet la configuració; si es desconeix, proposa \( ... \) i \[ ... \] i demana comprovar el filtre matemàtic. Per a Word, entrega cada expressió per separat, sense delimitadors ni entorns de document, per a copiar-la en Inserció > Equació amb entrada LaTeX i convertir-la a format professional. Word admet un subconjunt de LaTeX: evita macros personalitzades i no prometes compatibilitat universal. Per a Overleaf, entrega també el codi d’un document .tex mínim complet, amb els paquets necessaris com amsmath. Si no s’indica destinació, usa fragments LaTeX estàndard i pregunta on s’editaran.
Si hi ha text de partida, conserva les dades i els enunciats; diferencia transformar a LaTeX de resoldre exercicis. Resol només si es demana; si detectes un error en l’original, assenyala’l per separat sense canviar-lo en silenci. Comprova els càlculs que faces, les igualtats, unitats, signes i arrodoniments; diferencia = de \approx i explicita les restriccions de domini. No afirmes haver compilat o provat el codi sense haver-ho fet.
Un PDF o una fórmula renderitzada no són suficients: entrega sempre el codi font que permeta editar cada expressió.`,
  },
  en: {
    opening: 'Prepare mathematical content about',
    destination: 'Destination editor',
    rules: String.raw`Write ALL mathematical expressions in editable LaTeX: formulas, operations, numerical substitutions, intermediate steps, units and results. Keep explanations in ordinary text. Do not replace expressions with images, screenshots or Unicode symbols that imitate fractions or exponents.
Provide literal, copyable source in fenced code blocks labelled latex, even if you also show a rendered version. Include the full working, not just the final answer. Use standard commands such as \frac{a}{b}, x^{2}, x_{1}, \sqrt{x}, \cdot and \mathrm{m}; balance braces and keep notation consistent.
Adapt the output to the specified editor. For Markdown or Moodle/Aules, state the inline and display math delimiters supported by its configuration; if unknown, suggest \( ... \) and \[ ... \] and ask to check the math filter. For Word, provide each expression separately, without delimiters or document environments, to paste into Insert > Equation with LaTeX input and convert to Professional format. Word supports a subset of LaTeX: avoid custom macros and do not promise universal compatibility. For Overleaf, also provide the source of a complete minimal .tex document with required packages such as amsmath. If no destination is specified, use standard LaTeX snippets and ask where they will be edited.
If source text is supplied, preserve its data and statements; distinguish conversion to LaTeX from solving exercises. Solve only when requested; flag any error in the original separately rather than silently changing it. Check any calculations you perform, equalities, units, signs and rounding; distinguish = from \approx and state domain restrictions. Do not claim to have compiled or tested the code unless you have done so.
A PDF or rendered formula alone is insufficient: always provide the source needed to edit every expression.`,
  },
}

export function editableLatexTask(language: Language, topic: string, value: (key: string) => string): string {
  const b = briefs[language === 'ca-valencia' ? 'ca' : language]
  // Las variantes tienen flexiones propias; las instrucciones técnicas son iguales.
  const rules =
    language === 'ca'
      ? b.rules
          .replace('substituïsques', 'substitueixis')
          .replace('prometes', 'prometis')
          .replace('faces', 'facis')
          .replace('afirmes', 'afirmis')
          .replace('permeta', 'permeti')
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
