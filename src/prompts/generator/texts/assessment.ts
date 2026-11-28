import type { Language } from '../../../types'

export type AssessmentTexts = { tasks: Record<string, string>; topic: string; maxScore: string }
export const assessmentTexts: Record<Language, AssessmentTexts> = {
  es: {
    tasks: {
      'rating-scale': 'Crea una escala de valoración para evaluar',
      'systematic-observation':
        'Crea una ficha de observación sistemática, con indicadores observables y un registro por sesión, para',
      portfolio:
        'Diseña un portafolio de aprendizaje, con las evidencias que se recogerán, la reflexión del alumnado y los criterios de valoración, para',
      production: 'Crea un instrumento para evaluar la producción del alumnado en',
      'written-test':
        'Elabora una prueba escrita, con su clave de corrección y la puntuación de cada pregunta, para evaluar',
      product: 'Crea un instrumento para evaluar el producto final de',
      presentation: 'Crea un instrumento para evaluar la exposición oral de',
    },
    topic: 'Tema',
    maxScore: 'Puntuación máxima',
  },
  'ca-valencia': {
    tasks: {
      'rating-scale': 'Crea una escala de valoració per a avaluar',
      'systematic-observation':
        'Crea una fitxa d’observació sistemàtica, amb indicadors observables i un registre per sessió, per a',
      portfolio:
        'Dissenya un portafolis d’aprenentatge, amb les evidències que es recolliran, la reflexió de l’alumnat i els criteris de valoració, per a',
      production: 'Crea un instrument per a avaluar la producció de l’alumnat en',
      'written-test':
        'Elabora una prova escrita, amb la clau de correcció i la puntuació de cada pregunta, per a avaluar',
      product: 'Crea un instrument per a avaluar el producte final de',
      presentation: 'Crea un instrument per a avaluar l’exposició oral de',
    },
    topic: 'Tema',
    maxScore: 'Puntuació màxima',
  },
  ca: {
    tasks: {
      'rating-scale': 'Crea una escala de valoració per avaluar',
      'systematic-observation':
        'Crea una fitxa d’observació sistemàtica, amb indicadors observables i un registre per sessió, per a',
      portfolio:
        'Dissenya un portafolis d’aprenentatge, amb les evidències que es recolliran, la reflexió de l’alumnat i els criteris de valoració, per a',
      production: 'Crea un instrument per avaluar la producció de l’alumnat en',
      'written-test':
        'Elabora una prova escrita, amb la clau de correcció i la puntuació de cada pregunta, per avaluar',
      product: 'Crea un instrument per avaluar el producte final de',
      presentation: 'Crea un instrument per avaluar l’exposició oral de',
    },
    topic: 'Tema',
    maxScore: 'Puntuació màxima',
  },
  en: {
    tasks: {
      'rating-scale': 'Create a rating scale to assess',
      'systematic-observation':
        'Create a systematic observation sheet, with observable indicators and a per-session record, for',
      portfolio:
        'Design a learning portfolio, with the evidence to be collected, learner reflection and assessment criteria, for',
      production: 'Create a tool to assess learner work in',
      'written-test': 'Write a test, with an answer key and the marks for each question, to assess',
      product: 'Create a tool to assess the final product of',
      presentation: 'Create a tool to assess the oral presentation of',
    },
    topic: 'Topic',
    maxScore: 'Maximum score',
  },
}

// Etiquetas de los campos propios de las plantillas visuales.
// Indicaciones según la herramienta de imagen. ChatGPT, Gemini y Copilot generan
// la imagen a partir del propio prompt; Midjourney y Canva funcionan mejor con
// una descripción breve en una línea, así que se pide al asistente que la redacte.
// {ratio} se sustituye por la relación de aspecto elegida.
export const imageToolTexts: Record<Language, Record<string, string>> = {
  es: {
    ChatGPT:
      'Genera directamente la imagen. Si lleva texto, escríbelo exactamente igual que en las etiquetas indicadas y comprueba la ortografía.',
    Gemini:
      'Genera directamente la imagen. Mantén las etiquetas cortas y, si alguna sale mal escrita, avísame para corregirla.',
    Copilot:
      'Genera directamente la imagen con el creador de imágenes. Mantén las etiquetas cortas y, si alguna sale mal escrita, avísame para corregirla.',
    Midjourney:
      'No generes la imagen: escribe un prompt para Midjourney que la genere. Redáctalo en inglés, en una sola línea de menos de 60 palabras, con sujeto, estilo, composición, iluminación y paleta de colores, y termínalo con el parámetro --ar {ratio}. Si la imagen no debe llevar texto, añade --no text. Devuelve solo ese prompt.',
    Canva:
      'No generes la imagen: escribe un prompt para la IA de imágenes de Canva que la genere. Redáctalo como un único párrafo breve de menos de 300 caracteres, sin parámetros ni apartados, y sin texto dentro de la imagen: las etiquetas se añadirán después en Canva. Devuelve solo ese prompt.',
  },
  'ca-valencia': {
    ChatGPT:
      'Genera directament la imatge. Si porta text, escriu-lo exactament igual que en les etiquetes indicades i comprova l’ortografia.',
    Gemini:
      'Genera directament la imatge. Mantín les etiquetes curtes i, si alguna ix mal escrita, avisa’m per a corregir-la.',
    Copilot:
      'Genera directament la imatge amb el creador d’imatges. Mantín les etiquetes curtes i, si alguna ix mal escrita, avisa’m per a corregir-la.',
    Midjourney:
      'No generes la imatge: escriu un prompt per a Midjourney que la genere. Redacta’l en anglés, en una sola línia de menys de 60 paraules, amb subjecte, estil, composició, il·luminació i paleta de colors, i acaba’l amb el paràmetre --ar {ratio}. Si la imatge no ha de portar text, afig --no text. Torna només eixe prompt.',
    Canva:
      'No generes la imatge: escriu un prompt per a la IA d’imatges de Canva que la genere. Redacta’l com un únic paràgraf breu de menys de 300 caràcters, sense paràmetres ni apartats, i sense text dins de la imatge: les etiquetes s’afegiran després en Canva. Torna només eixe prompt.',
  },
  ca: {
    ChatGPT:
      'Genera directament la imatge. Si porta text, escriu-lo exactament igual que a les etiquetes indicades i comprova l’ortografia.',
    Gemini:
      'Genera directament la imatge. Mantén les etiquetes curtes i, si alguna surt mal escrita, avisa’m per corregir-la.',
    Copilot:
      'Genera directament la imatge amb el creador d’imatges. Mantén les etiquetes curtes i, si alguna surt mal escrita, avisa’m per corregir-la.',
    Midjourney:
      'No generis la imatge: escriu un prompt per a Midjourney que la generi. Redacta’l en anglès, en una sola línia de menys de 60 paraules, amb subjecte, estil, composició, il·luminació i paleta de colors, i acaba’l amb el paràmetre --ar {ratio}. Si la imatge no ha de portar text, afegeix --no text. Retorna només aquest prompt.',
    Canva:
      'No generis la imatge: escriu un prompt per a la IA d’imatges de Canva que la generi. Redacta’l com un únic paràgraf breu de menys de 300 caràcters, sense paràmetres ni apartats, i sense text dins de la imatge: les etiquetes s’afegiran després a Canva. Retorna només aquest prompt.',
  },
  en: {
    ChatGPT:
      'Generate the image directly. If it includes text, write it exactly as in the labels given and check the spelling.',
    Gemini: 'Generate the image directly. Keep labels short and, if any come out misspelt, tell me so I can fix them.',
    Copilot:
      'Generate the image directly with the image creator. Keep labels short and, if any come out misspelt, tell me so I can fix them.',
    Midjourney:
      'Do not generate the image: write a Midjourney prompt that will generate it. Write it in English, on a single line of fewer than 60 words, covering subject, style, composition, lighting and colour palette, and end it with the parameter --ar {ratio}. If the image should have no text, add --no text. Return only that prompt.',
    Canva:
      'Do not generate the image: write a prompt for Canva’s AI image generator that will create it. Write it as a single short paragraph of fewer than 300 characters, with no parameters or sections, and no text inside the image: labels will be added afterwards in Canva. Return only that prompt.',
  },
}

export const extraLabels: Record<Language, Record<string, string>> = {
  es: {
    visualStyle: 'Estilo visual',
    includeLabels: 'Texto y etiquetas',
    aspectRatio: 'Relación de aspecto',
    sections: 'Apartados a incluir',
    branches: 'Ramas principales',
    questionCount: 'Número de preguntas',
    questionTypes: 'Tipos de pregunta',
    audience: 'Público destinatario',
    tone: 'Tono',
    videoStyle: 'Estilo de la película',
    codingTool: 'Herramienta o material',
    studentRole: 'Rol del alumnado',
    activityIdea: 'Formato de partida',
    videoVariant: 'Variante de color',
    videoFinish: 'Acabado',
    brandColors: 'Colores de marca',
    voice: 'Voz y sonido',
    mustShow: 'Qué debe quedar claro sí o sí',
    avoid: 'Qué no debe aparecer',
    strengths: 'Fortalezas, intereses y apoyos que ya funcionan',
    facts: 'Datos, notas y acuerdos de partida',
  },
  'ca-valencia': {
    visualStyle: 'Estil visual',
    includeLabels: 'Text i etiquetes',
    aspectRatio: 'Relació d’aspecte',
    sections: 'Apartats a incloure',
    branches: 'Branques principals',
    questionCount: 'Nombre de preguntes',
    questionTypes: 'Tipus de pregunta',
    audience: 'Públic destinatari',
    tone: 'To',
    videoStyle: 'Estil de la pel·lícula',
    codingTool: 'Eina o material',
    studentRole: 'Rol de l’alumnat',
    activityIdea: 'Format de partida',
    videoVariant: 'Variant de color',
    videoFinish: 'Acabat',
    brandColors: 'Colors de marca',
    voice: 'Veu i so',
    mustShow: 'Què ha de quedar clar sí o sí',
    avoid: 'Què no ha d’aparéixer',
    strengths: 'Fortaleses, interessos i suports que ja funcionen',
    facts: 'Dades, notes i acords de partida',
  },
  ca: {
    visualStyle: 'Estil visual',
    includeLabels: 'Text i etiquetes',
    aspectRatio: 'Relació d’aspecte',
    sections: 'Apartats a incloure',
    branches: 'Branques principals',
    questionCount: 'Nombre de preguntes',
    questionTypes: 'Tipus de pregunta',
    audience: 'Públic destinatari',
    tone: 'To',
    videoStyle: 'Estil de la pel·lícula',
    codingTool: 'Eina o material',
    studentRole: 'Rol de l’alumnat',
    activityIdea: 'Format de partida',
    videoVariant: 'Variant de color',
    videoFinish: 'Acabat',
    brandColors: 'Colors de marca',
    voice: 'Veu i so',
    mustShow: 'Què ha de quedar clar sí o sí',
    avoid: 'Què no ha d’aparéixer',
    strengths: 'Fortaleses, interessos i suports que ja funcionen',
    facts: 'Dades, notes i acords de partida',
  },
  en: {
    visualStyle: 'Visual style',
    includeLabels: 'Text and labels',
    aspectRatio: 'Aspect ratio',
    sections: 'Sections to include',
    branches: 'Main branches',
    questionCount: 'Number of questions',
    questionTypes: 'Question types',
    audience: 'Target audience',
    tone: 'Tone',
    videoStyle: 'Film style',
    codingTool: 'Tool or material',
    studentRole: 'Student role',
    activityIdea: 'Starting format',
    videoVariant: 'Colour variant',
    videoFinish: 'Finish',
    brandColors: 'Brand colours',
    voice: 'Voice and sound',
    mustShow: 'What must be clear no matter what',
    avoid: 'What must not appear',
    strengths: 'Strengths, interests and supports that already work',
    facts: 'Facts, notes and agreed points',
  },
}

export const udlTemplates = new Set(['udl-review', 'udl-matrix'])

// Accesibilidad del material: cada opción (valor original en castellano) se
// convierte en una instrucción concreta para la IA, con el perfil de alumnado
// al que ayuda entre paréntesis.
