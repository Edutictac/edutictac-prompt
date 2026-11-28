import type { Language } from '../../../types'

export type AccessibilityTexts = { title: string; intro: string; items: Record<string, string> }
export const accessibilityTexts: Record<Language, AccessibilityTexts> = {
  es: {
    title: 'Accesibilidad del material',
    intro: 'Aplica estas medidas a todo el material para el alumnado:',
    items: {
      'Letra grande sin serifa':
        'Tipografía sin serifa, clara y grande (tipo Arial, Verdana o Lexend), de al menos 14 puntos (dislexia, baja visión, primeros lectores).',
      'Espaciado e interlineado amplios':
        'Espaciado amplio entre letras y palabras e interlineado de 1,5 (dislexia, estrés visual).',
      'Texto alineado a la izquierda': 'Todo el texto alineado a la izquierda, sin justificar (dislexia, TDAH).',
      'Alto contraste': 'Contraste alto: texto y líneas negras bien marcadas sobre fondo claro (baja visión).',
      'Sin depender del color':
        'Ninguna información depende solo del color; evita combinar verde y rojo o rosa para distinguir respuestas o categorías (daltonismo).',
      'Pensada para papel crema':
        'Diseño pensado para imprimir en papel crema o pastel suave, sin fondos rellenos (dislexia, estrés visual).',
      'Espacios de escritura pautados':
        'Espacios de respuesta amplios y con líneas guía para escribir (disgrafía, motricidad fina).',
      'Poco contenido por página':
        'Poco contenido por página y mucho espacio en blanco para evitar la sobrecarga visual (TDAH, TEA, fatiga).',
      'Una instrucción por paso': 'Actividades separadas y numeradas, con una sola instrucción por paso (TEA, TDAH).',
      'Pictogramas en las instrucciones':
        'Indica junto a cada instrucción un icono o pictograma sencillo que refuerce su significado; si no puedes insertarlo, describe cuál poner (TEA, alumnado no lector o que aprende la lengua).',
      'Diseño limpio sin adornos':
        'Diseño limpio y previsible, igual en todas las actividades y sin elementos decorativos que distraigan (TEA).',
      'Lectura fácil':
        'Frases cortas, una idea por frase y vocabulario frecuente, siguiendo los criterios de lectura fácil (comprensión lectora, alumnado que aprende la lengua).',
      'Vocabulario con apoyo visual':
        'Acompaña el vocabulario clave con una imagen o la descripción de la imagen que conviene poner al lado (alumnado recién llegado o que aprende la lengua).',
    },
  },
  'ca-valencia': {
    title: 'Accessibilitat del material',
    intro: 'Aplica estes mesures a tot el material per a l’alumnat:',
    items: {
      'Letra grande sin serifa':
        'Tipografia de pal sense serifa, clara i gran (tipus Arial, Verdana o Lexend), d’almenys 14 punts (dislèxia, baixa visió, primers lectors).',
      'Espaciado e interlineado amplios':
        'Espaiat ample entre lletres i paraules i interlineat d’1,5 (dislèxia, estrés visual).',
      'Texto alineado a la izquierda': 'Tot el text alineat a l’esquerra, sense justificar (dislèxia, TDAH).',
      'Alto contraste': 'Contrast alt: text i línies negres ben marcades sobre fons clar (baixa visió).',
      'Sin depender del color':
        'Cap informació no depén només del color; evita combinar verd i roig o rosa per a distingir respostes o categories (daltonisme).',
      'Pensada para papel crema':
        'Disseny pensat per a imprimir en paper crema o pastel suau, sense fons emplenats (dislèxia, estrés visual).',
      'Espacios de escritura pautados':
        'Espais de resposta amples i amb línies guia per a escriure (disgrafia, motricitat fina).',
      'Poco contenido por página':
        'Poc contingut per pàgina i molt d’espai en blanc per a evitar la sobrecàrrega visual (TDAH, TEA, fatiga).',
      'Una instrucción por paso': 'Activitats separades i numerades, amb una sola instrucció per pas (TEA, TDAH).',
      'Pictogramas en las instrucciones':
        'Indica al costat de cada instrucció una icona o un pictograma senzill que en reforce el significat; si no el pots inserir, descriu quin cal posar (TEA, alumnat no lector o que aprén la llengua).',
      'Diseño limpio sin adornos':
        'Disseny net i previsible, igual en totes les activitats i sense elements decoratius que distraguen (TEA).',
      'Lectura fácil':
        'Frases curtes, una idea per frase i vocabulari freqüent, seguint els criteris de lectura fàcil (comprensió lectora, alumnat que aprén la llengua).',
      'Vocabulario con apoyo visual':
        'Acompanya el vocabulari clau amb una imatge o la descripció de la imatge que convé posar al costat (alumnat nouvingut o que aprén la llengua).',
    },
  },
  ca: {
    title: 'Accessibilitat del material',
    intro: 'Aplica aquestes mesures a tot el material per a l’alumnat:',
    items: {
      'Letra grande sin serifa':
        'Tipografia de pal sense serifa, clara i gran (tipus Arial, Verdana o Lexend), d’almenys 14 punts (dislèxia, baixa visió, primers lectors).',
      'Espaciado e interlineado amplios':
        'Espaiat ampli entre lletres i paraules i interlineat d’1,5 (dislèxia, estrès visual).',
      'Texto alineado a la izquierda': 'Tot el text alineat a l’esquerra, sense justificar (dislèxia, TDAH).',
      'Alto contraste': 'Contrast alt: text i línies negres ben marcades sobre fons clar (baixa visió).',
      'Sin depender del color':
        'Cap informació no depèn només del color; evita combinar verd i vermell o rosa per distingir respostes o categories (daltonisme).',
      'Pensada para papel crema':
        'Disseny pensat per imprimir en paper crema o pastel suau, sense fons emplenats (dislèxia, estrès visual).',
      'Espacios de escritura pautados':
        'Espais de resposta amplis i amb línies guia per escriure (disgrafia, motricitat fina).',
      'Poco contenido por página':
        'Poc contingut per pàgina i molt d’espai en blanc per evitar la sobrecàrrega visual (TDAH, TEA, fatiga).',
      'Una instrucción por paso': 'Activitats separades i numerades, amb una sola instrucció per pas (TEA, TDAH).',
      'Pictogramas en las instrucciones':
        'Indica al costat de cada instrucció una icona o un pictograma senzill que en reforci el significat; si no el pots inserir, descriu quin cal posar (TEA, alumnat no lector o que aprèn la llengua).',
      'Diseño limpio sin adornos':
        'Disseny net i previsible, igual en totes les activitats i sense elements decoratius que distreguin (TEA).',
      'Lectura fácil':
        'Frases curtes, una idea per frase i vocabulari freqüent, seguint els criteris de lectura fàcil (comprensió lectora, alumnat que aprèn la llengua).',
      'Vocabulario con apoyo visual':
        'Acompanya el vocabulari clau amb una imatge o la descripció de la imatge que convé posar al costat (alumnat nouvingut o que aprèn la llengua).',
    },
  },
  en: {
    title: 'Accessible materials',
    intro: 'Apply these measures to all student-facing material:',
    items: {
      'Letra grande sin serifa':
        'Clear, large sans-serif typeface (such as Arial, Verdana or Lexend), at least 14 pt (dyslexia, low vision, early readers).',
      'Espaciado e interlineado amplios':
        'Wide letter and word spacing and 1.5 line spacing (dyslexia, visual stress).',
      'Texto alineado a la izquierda': 'All text left-aligned, not justified (dyslexia, ADHD).',
      'Alto contraste': 'High contrast: well-defined black text and lines on a light background (low vision).',
      'Sin depender del color':
        'No information relies on colour alone; avoid combining green with red or pink to tell answers or categories apart (colour blindness).',
      'Pensada para papel crema':
        'Designed to be printed on cream or soft pastel paper, with no filled backgrounds (dyslexia, visual stress).',
      'Espacios de escritura pautados':
        'Wide answer spaces with guide lines for writing (dysgraphia, fine motor skills).',
      'Poco contenido por página':
        'Little content per page and plenty of white space to avoid visual overload (ADHD, autism, fatigue).',
      'Una instrucción por paso': 'Separate, numbered activities with a single instruction per step (autism, ADHD).',
      'Pictogramas en las instrucciones':
        'Next to each instruction, add a simple icon or pictogram that reinforces its meaning; if you cannot insert it, describe which one to use (autism, non-readers, language learners).',
      'Diseño limpio sin adornos':
        'Clean, predictable layout, the same in every activity, with no distracting decorations (autism).',
      'Lectura fácil':
        'Short sentences, one idea per sentence and common vocabulary, following easy-to-read guidelines (reading comprehension, language learners).',
      'Vocabulario con apoyo visual':
        'Pair key vocabulary with an image, or describe the image to place next to it (newcomers, language learners).',
    },
  },
}
