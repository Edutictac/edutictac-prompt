import type { Example } from '../examples'

export const examples2: Record<string, Example> = {
  h5p: {
    options: { level: 'Primaria', activityType: 'Arrastrar y soltar' },
    es: {
      subject: 'Ciencias Sociales',
      topic: 'Los ríos de España',
      objectives: 'Situar los ríos principales en el mapa.',
    },
    va: {
      subject: 'Ciències Socials',
      topic: 'Els rius de la Comunitat Valenciana',
      objectives: 'Situar els rius principals al mapa.',
    },
    en: {
      subject: 'Social Science',
      topic: 'The main rivers of Spain',
      objectives: 'Locate the main rivers on the map.',
    },
  },
  scorm: {
    options: { level: 'ESO' },
    es: {
      subject: 'Tecnología y Digitalización',
      topic: 'Contraseñas seguras',
      objectives: 'Crear contraseñas robustas y reconocer intentos de suplantación.',
    },
    va: {
      subject: 'Tecnologia i Digitalització',
      topic: 'Contrasenyes segures',
      objectives: 'Crear contrasenyes robustes i reconéixer intents de suplantació.',
    },
    ca: { objectives: 'Crear contrasenyes robustes i reconèixer intents de suplantació.' },
    en: {
      subject: 'Technology and Digital Skills',
      topic: 'Strong passwords',
      objectives: 'Create strong passwords and recognise phishing attempts.',
    },
  },
  'html-game': {
    options: {
      level: 'Primaria',
      activityType: 'Memorizar y escribir · Completar huecos',
      gameFeatures: 'Niveles y trofeos · Ayuda para el alumnado · Menú docente oculto · Guardar sesión',
    },
    es: {
      subject: 'Lengua Castellana',
      topic: 'Palabras con b y v',
      gameItems: 'BOMBERO → _ombero (b)\nVIVIR → _i_ir (v, v)\nNAVEGAR → na_egar (v)\nCABALLO → ca_allo (b)',
    },
    va: {
      subject: 'Valencià: Llengua i Literatura',
      topic: 'Paraules amb vocal neutra (a/e)',
      gameItems: 'ANAGRAMA → anagram_ (a)\nAVANTATGE → av_ntatg_ (a, e)\nPERSONA → p_rson_ (e, a)\nTAULA → taul_ (a)',
    },
    en: {
      subject: 'English Language',
      topic: 'Irregular past tense verbs',
      gameItems: 'go → went\nsee → saw\nbuy → bought\nthink → thought',
    },
  },
  gift: {
    options: {
      level: 'Bachillerato',
      questionCount: '20',
      questionTypes: 'Opción múltiple · Verdadero/Falso · Respuesta corta',
    },
    es: {
      subject: 'Historia de España',
      topic: 'La Segunda República',
      objectives: 'Repasar fechas, personajes y reformas principales.',
    },
    va: {
      subject: 'Història d’Espanya',
      topic: 'La Segona República',
      objectives: 'Repassar dates, personatges i reformes principals.',
    },
    en: {
      subject: 'History of Spain',
      topic: 'The Second Republic',
      objectives: 'Review key dates, figures and reforms.',
    },
  },
  qti: {
    options: { level: 'ESO' },
    es: {
      subject: 'Matemáticas',
      topic: 'Ecuaciones de primer grado',
      objectives: 'Resolver ecuaciones y plantear problemas sencillos.',
    },
    va: {
      subject: 'Matemàtiques',
      topic: 'Equacions de primer grau',
      objectives: 'Resoldre equacions i plantejar problemes senzills.',
    },
    en: {
      subject: 'Mathematics',
      topic: 'Linear equations',
      objectives: 'Solve equations and set up simple word problems.',
    },
  },
  'common-cartridge': {
    options: { level: 'FP' },
    es: {
      subject: 'Formación y Orientación Laboral',
      topic: 'Prevención de riesgos laborales',
      objectives: 'Identificar riesgos del puesto de trabajo y medidas preventivas.',
    },
    va: {
      subject: 'Formació i Orientació Laboral',
      topic: 'Prevenció de riscos laborals',
      objectives: 'Identificar riscos del lloc de treball i mesures preventives.',
    },
    en: {
      subject: 'Employment Training',
      topic: 'Occupational risk prevention',
      objectives: 'Identify workplace risks and preventive measures.',
    },
  },
  feedback: {
    options: { level: 'ESO' },
    es: {
      subject: 'Lengua Castellana',
      task: 'Escribe comentarios formativos para una redacción de opinión: qué está bien, qué mejorar y un paso concreto.',
      criteria: 'Tesis clara, argumentos, conectores, ortografía',
    },
    va: {
      subject: 'Valencià: Llengua i Literatura',
      task: 'Escriu comentaris formatius per a una redacció d’opinió: què està bé, què millorar i un pas concret.',
      criteria: 'Tesi clara, arguments, connectors, ortografia',
    },
    en: {
      subject: 'English Language',
      task: 'Write formative comments for an opinion essay: what works, what to improve and one concrete next step.',
      criteria: 'Clear thesis, arguments, linking words, spelling',
    },
  },
  'three-levels': {
    options: { level: 'Primaria' },
    es: {
      subject: 'Ciencias de la Naturaleza',
      task: 'Actividad de comprensión lectora sobre los ecosistemas.',
      objectives: 'Identificar seres vivos, relaciones y cadenas alimentarias.',
    },
    va: {
      subject: 'Ciències de la Naturalesa',
      task: 'Activitat de comprensió lectora sobre els ecosistemes.',
      objectives: 'Identificar éssers vius, relacions i cadenes alimentàries.',
    },
    en: {
      subject: 'Natural Science',
      task: 'Reading comprehension activity about ecosystems.',
      objectives: 'Identify living things, relationships and food chains.',
    },
  },
  'easy-reading': {
    options: { level: 'ESO' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'La Revolución Industrial',
      sourceText:
        'La Revolución Industrial fue un proceso de transformación económica, social y tecnológica que se inició en Gran Bretaña en la segunda mitad del siglo XVIII y que supuso el paso de una economía agraria y artesanal a otra dominada por la industria y la mecanización.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'La Revolució Industrial',
      sourceText:
        'La Revolució Industrial va ser un procés de transformació econòmica, social i tecnològica que es va iniciar a la Gran Bretanya en la segona meitat del segle XVIII i que va suposar el pas d’una economia agrària i artesanal a una altra dominada per la indústria i la mecanització.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'The Industrial Revolution',
      sourceText:
        'The Industrial Revolution was a process of economic, social and technological change that began in Great Britain in the second half of the eighteenth century and marked the shift from an agrarian, craft-based economy to one dominated by industry and machinery.',
    },
  },
  'bias-check': {
    options: { level: 'Primaria' },
    es: {
      subject: 'Matemáticas',
      topic: 'Problemas de compras',
      sourceText: 'Laura va al mercado con su madre a comprar fruta. Pablo y su padre arreglan la bici en el taller.',
    },
    va: {
      subject: 'Matemàtiques',
      topic: 'Problemes de compres',
      sourceText: 'Laura va al mercat amb sa mare a comprar fruita. Pau i son pare arreglen la bici al taller.',
    },
    en: {
      subject: 'Mathematics',
      topic: 'Shopping word problems',
      sourceText: 'Laura goes to the market with her mum to buy fruit. Paul and his dad fix the bike in the garage.',
    },
  },
  'glossary-support': {
    options: { level: 'ESO' },
    es: {
      subject: 'Biología y Geología',
      topic: 'La célula',
      objectives: 'Comprender el vocabulario básico de la célula y sus orgánulos.',
    },
    va: {
      subject: 'Biologia i Geologia',
      topic: 'La cèl·lula',
      objectives: 'Comprendre el vocabulari bàsic de la cèl·lula i els seus orgànuls.',
    },
    en: {
      subject: 'Biology and Geology',
      topic: 'The cell',
      objectives: 'Understand basic vocabulary about the cell and its organelles.',
    },
  },
  'family-note': {
    es: {
      role: 'Tutora de 3.º de Primaria',
      task: 'Comunicar una salida didáctica al museo de ciencias y pedir la autorización firmada.',
      constraints: 'Tono cercano, máximo 150 palabras, incluir fecha, horario y material.',
    },
    va: {
      role: 'Tutora de 3r de Primària',
      task: 'Comunicar una eixida didàctica al museu de ciències i demanar l’autorització signada.',
      constraints: 'To proper, màxim 150 paraules, incloure data, horari i material.',
    },
    ca: { task: 'Comunicar una sortida didàctica al museu de ciències i demanar l’autorització signada.' },
    en: {
      role: 'Year 3 class teacher',
      task: 'Announce a school trip to the science museum and ask for signed permission.',
      constraints: 'Friendly tone, 150 words maximum, include date, times and what to bring.',
    },
  },
  'tutoring-script': {
    es: {
      role: 'Tutor de 1.º de ESO',
      task: 'Preparar una entrevista con una familia para hablar de la organización del estudio en casa.',
      objectives: 'Acordar dos rutinas concretas y una fecha de seguimiento.',
    },
    va: {
      role: 'Tutor de 1r d’ESO',
      task: 'Preparar una entrevista amb una família per a parlar de l’organització de l’estudi a casa.',
      objectives: 'Acordar dues rutines concretes i una data de seguiment.',
    },
    en: {
      role: 'Year 7 form tutor',
      task: 'Prepare a meeting with a family to talk about organising study at home.',
      objectives: 'Agree on two specific routines and a follow-up date.',
    },
  },
  free: {
    es: {
      role: 'Coordinador TIC de un instituto',
      task: 'Redacta una guía breve para que el profesorado cree un aula en Aules.',
      constraints: 'Pasos numerados, lenguaje sencillo, sin capturas.',
    },
    va: {
      role: 'Coordinador TIC d’un institut',
      task: 'Redacta una guia breu perquè el professorat cree una aula a Aules.',
      constraints: 'Passos numerats, llenguatge senzill, sense captures.',
    },
    ca: { task: 'Redacta una guia breu perquè el professorat creï una aula a Aules.' },
    en: {
      role: 'School IT coordinator',
      task: 'Write a short guide for teachers on creating a course in Moodle.',
      constraints: 'Numbered steps, plain language, no screenshots.',
    },
  },
  'scientific-illustration': {
    options: {
      level: 'ESO',
      visualStyle: 'Ilustración de libro de texto',
      includeLabels: 'Con etiquetas básicas',
      aspectRatio: '16:9 horizontal',
    },
    es: { subject: 'Biología y Geología', topic: 'La célula vegetal' },
    va: { subject: 'Biologia i Geologia', topic: 'La cèl·lula vegetal' },
    en: { subject: 'Biology and Geology', topic: 'The plant cell' },
  },
  infographic: {
    options: { level: 'Primaria', visualStyle: 'Infografía plana', aspectRatio: '9:16 vertical' },
    es: {
      subject: 'Ciencias de la Naturaleza',
      topic: 'El reciclaje',
      sections: 'Qué es, los contenedores por colores, qué va en cada uno, por qué es importante',
    },
    va: {
      subject: 'Ciències de la Naturalesa',
      topic: 'El reciclatge',
      sections: 'Què és, els contenidors per colors, què va en cada un, per què és important',
    },
    en: {
      subject: 'Natural Science',
      topic: 'Recycling',
      sections: 'What it is, bins by colour, what goes in each, why it matters',
    },
  },
}
