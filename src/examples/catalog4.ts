import type { Example } from '../examples'

export const examples4: Record<string, Example> = {
  'lab-guide': {
    options: { level: 'ESO', duration: '55 minutos' },
    es: {
      subject: 'Física y Química',
      topic: 'Separación de mezclas: filtración y evaporación',
      objectives: 'Separar arena y sal de una mezcla y explicar en qué propiedad se basa cada método.',
      resources:
        'Vasos de precipitados, embudo, papel de filtro, mechero o placa calefactora, cápsula de porcelana, agua, arena y sal.',
    },
    va: {
      subject: 'Física i Química',
      topic: 'Separació de mescles: filtració i evaporació',
      objectives: 'Separar arena i sal d’una mescla i explicar en quina propietat es basa cada mètode.',
      resources:
        'Gots de precipitats, embut, paper de filtre, metxer o placa calefactora, càpsula de porcellana, aigua, arena i sal.',
    },
    en: {
      subject: 'Physics and Chemistry',
      topic: 'Separating mixtures: filtration and evaporation',
      objectives: 'Separate sand and salt from a mixture and explain which property each method relies on.',
      resources: 'Beakers, funnel, filter paper, burner or hot plate, evaporating dish, water, sand and salt.',
    },
  },
  'class-presentation': {
    options: { level: 'ESO', duration: '15 minutos' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'El Palmeral de Elche, paisaje cultural',
      objectives: 'Explicar qué es un paisaje cultural y por qué hay que conservarlo.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'El Palmerar d’Elx, paisatge cultural',
      objectives: 'Explicar què és un paisatge cultural i per què cal conservar-lo.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'The Palm Grove of Elche, a cultural landscape',
      objectives: 'Explain what a cultural landscape is and why it should be preserved.',
    },
  },
  worksheet: {
    options: {
      level: 'ESO',
      activityType: 'Completar huecos · Verdadero/Falso · Emparejar · Respuesta corta',
      questionCount: '6',
      accessibility: 'Texto alineado a la izquierda · Espacios de escritura pautados',
    },
    es: {
      subject: 'Geografía e Historia',
      topic: 'El Palmeral de Elche',
      objectives: 'Explicar por qué el Palmeral es patrimonio y proponer una medida para conservarlo.',
      sourceText:
        'El Palmeral de Elche es un conjunto de huertos de palmeras datileras. Su origen está ligado al sistema de riego de acequias. En el año 2000 la UNESCO lo declaró Patrimonio de la Humanidad como paisaje cultural.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'El Palmerar d’Elx',
      objectives: 'Explicar per què el Palmerar és patrimoni i proposar una mesura per a conservar-lo.',
      sourceText:
        'El Palmerar d’Elx és un conjunt d’horts de palmeres datileres. El seu origen està lligat al sistema de reg de séquies. L’any 2000 la UNESCO el va declarar Patrimoni de la Humanitat com a paisatge cultural.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'The Palm Grove of Elche',
      objectives: 'Explain why the Palm Grove is heritage and suggest one way to preserve it.',
      sourceText:
        'The Palm Grove of Elche is a set of date palm orchards. Its origin is linked to the irrigation system of acequias (channels). In 2000 UNESCO declared it a World Heritage Site as a cultural landscape.',
    },
  },
  'illustrated-worksheet': {
    options: {
      level: 'Primaria',
      theme: 'Espacio',
      activityType: 'Contar elementos · Completar huecos · Laberinto',
      printFinish: 'Blanco y negro para colorear',
      accessibility: 'Letra grande sin serifa · Espacios de escritura pautados',
    },
    es: {
      course: '1.º',
      subject: 'Matemáticas',
      topic: 'Sumas hasta 20',
      gameItems: '7 + 5 = __ · 9 + 4 = __ · 8 + 8 = __ · 6 + 7 = __ · 11 + 3 = __ · 5 + 9 = __',
    },
    va: {
      course: '1r',
      subject: 'Matemàtiques',
      topic: 'Sumes fins a 20',
      gameItems: '7 + 5 = __ · 9 + 4 = __ · 8 + 8 = __ · 6 + 7 = __ · 11 + 3 = __ · 5 + 9 = __',
    },
    en: {
      course: 'Year 1',
      subject: 'Maths',
      topic: 'Adding up to 20',
      gameItems: '7 + 5 = __ · 9 + 4 = __ · 8 + 8 = __ · 6 + 7 = __ · 11 + 3 = __ · 5 + 9 = __',
    },
  },
  'ethical-dilemma': {
    options: { level: 'Bachillerato' },
    es: {
      subject: 'Filosofía',
      topic: 'El uso de inteligencia artificial generativa en los deberes',
      objectives: 'Argumentar teniendo en cuenta autoría, aprendizaje, acceso equitativo y privacidad.',
    },
    va: {
      subject: 'Filosofia',
      topic: 'L’ús d’intel·ligència artificial generativa en els deures',
      objectives: 'Argumentar tenint en compte autoria, aprenentatge, accés equitatiu i privacitat.',
    },
    en: {
      subject: 'Philosophy',
      topic: 'Generative AI in homework',
      objectives: 'Reason about authorship, learning, fair access and privacy.',
    },
  },
  'study-plan': {
    options: { level: 'Bachillerato', duration: 'Una semana' },
    es: {
      subject: 'Historia',
      topic: 'Preparar un examen sobre la Revolución Industrial',
      context:
        'Dispongo de una hora cada tarde de lunes a viernes. El miércoles tengo entrenamiento y necesito descansos breves.',
    },
    va: {
      subject: 'Història',
      topic: 'Preparar un examen sobre la Revolució Industrial',
      context:
        'Dispose d’una hora cada vesprada de dilluns a divendres. Dimecres tinc entrenament i necessite descansos breus.',
    },
    en: {
      subject: 'History',
      topic: 'Preparing for a test on the Industrial Revolution',
      context: 'I have one hour each weekday evening. I have training on Wednesday and need short breaks.',
    },
  },
  'historical-interview': {
    options: { level: 'ESO' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'Marie Curie',
      task: 'Responde como entrevistada y diferencia los hechos documentados de lo que no se sabe.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'Marie Curie',
      task: 'Respon com a entrevistada i diferencia els fets documentats d’allò que no se sap.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'Marie Curie',
      task: 'Answer as the interviewee and distinguish documented facts from what is unknown.',
    },
  },
  'coding-activity': {
    options: {
      level: 'Infantil',
      codingTool: 'Blocs Junior',
      studentRole: 'Usuario',
      activityIdea: 'Panel interactivo',
      duration: '20 minutos',
      outputFormat: 'Tabla',
    },
    es: {
      subject: 'Lengua y Literatura',
      topic: 'Los animales de la granja',
      objectives: 'Asociar cada animal con su sonido y predecir qué hará el programa antes de ejecutarlo.',
    },
    va: {
      subject: 'Llengua i Literatura',
      topic: 'Els animals de la granja',
      objectives: 'Associar cada animal amb el seu so i predir què farà el programa abans d’executar-lo.',
    },
    en: {
      subject: 'Language and Literature',
      topic: 'Farm animals',
      objectives: 'Match each animal with its sound and predict what the program will do before running it.',
    },
  },
  'code-coach': {
    options: { level: 'ESO' },
    es: {
      subject: 'Tecnología y Digitalización',
      topic: 'Un programa Python que calcula una media',
      sourceText: 'notas = [6, 8, 10]\nmedia = sum(notas) / len(nota)\nprint(media)',
      task: 'No reescribas el código entero: explica el error y dame una pista para corregirlo.',
    },
    va: {
      subject: 'Tecnologia i Digitalització',
      topic: 'Un programa Python que calcula una mitjana',
      sourceText: 'notes = [6, 8, 10]\nmitjana = sum(notes) / len(nota)\nprint(mitjana)',
      task: 'No reescrigues tot el codi: explica l’error i dona’m una pista per a corregir-lo.',
    },
    en: {
      subject: 'Technology and Digital Skills',
      topic: 'A Python program that calculates an average',
      sourceText: 'marks = [6, 8, 10]\naverage = sum(marks) / len(mark)\nprint(average)',
      task: 'Do not rewrite all the code: explain the error and give me a hint to fix it.',
    },
  },
  'profile-adaptation': {
    options: { level: 'ESO', profile: 'TDAH' },
    es: {
      subject: 'Biología y Geología',
      task: 'Leer un texto sobre la fotosíntesis y responder un cuestionario escrito de diez preguntas.',
      strengths:
        'Le interesan los experimentos y aprende mejor con ejemplos visuales; responde bien a instrucciones cortas.',
      objectives: 'Explicar el proceso de la fotosíntesis y relacionarlo con la respiración celular.',
    },
    va: {
      subject: 'Biologia i Geologia',
      task: 'Llegir un text sobre la fotosíntesi i respondre un qüestionari escrit de deu preguntes.',
      strengths: 'Li interessen els experiments i aprén millor amb exemples visuals; respon bé a instruccions curtes.',
      objectives: 'Explicar el procés de la fotosíntesi i relacionar-lo amb la respiració cel·lular.',
    },
    ca: {
      strengths: 'Li interessen els experiments i aprèn millor amb exemples visuals; respon bé a instruccions curtes.',
    },
    en: {
      subject: 'Biology and Geology',
      task: 'Read a text about photosynthesis and answer a written questionnaire with ten questions.',
      strengths:
        'Interested in experiments, learns better with visual examples and responds well to short instructions.',
      objectives: 'Explain the process of photosynthesis and link it to cellular respiration.',
    },
  },
  'school-document': {
    options: { documentType: 'Acta de reunión' },
    es: {
      context: 'IES público. Reunión del departamento de Tecnología el 12 de mayo, de 14:00 a 15:00, en el aula 12.',
      facts:
        'Se acuerda revisar la programación de 3.º de ESO, preparar la memoria de prácticas y fijar el 5 de junio como fecha límite para las notas.',
      objectives: 'Dejar constancia breve y clara de los acuerdos para el equipo directivo.',
    },
    va: {
      context: 'IES públic. Reunió del departament de Tecnologia el 12 de maig, de 14:00 a 15:00, a l’aula 12.',
      facts:
        'S’acorda revisar la programació de 3r d’ESO, preparar la memòria de pràctiques i fixar el 5 de juny com a data límit per a les notes.',
      objectives: 'Deixar constància breu i clara dels acords per a l’equip directiu.',
    },
    en: {
      context: 'Public secondary school. Technology department meeting on 12 May, 14:00–15:00, in room 12.',
      facts:
        'Agreed to review the Year 10 scheme of work, prepare the work placement report and set 5 June as the deadline for marks.',
      objectives: 'Record the agreements briefly and clearly for the leadership team.',
    },
  },
  'editable-latex': {
    options: {
      level: 'ESO',
      outputFormat: 'DOCX',
    },
    es: {
      subject: 'Matemáticas',
      topic: 'Ecuaciones de segundo grado',
      task: 'Resuelve el ejemplo paso a paso y explica cada transformación.',
      sourceText: 'x^2 - 5x + 6 = 0',
      mathDestination: 'Word, con las ecuaciones ya compuestas y editables',
    },
    va: {
      subject: 'Matemàtiques',
      topic: 'Equacions de segon grau',
      task: 'Resol l’exemple pas a pas i explica cada transformació.',
      sourceText: 'x^2 - 5x + 6 = 0',
      mathDestination: 'Word, amb les equacions ja compostes i editables',
    },
    en: {
      subject: 'Mathematics',
      topic: 'Quadratic equations',
      task: 'Solve the example step by step and explain each transformation.',
      sourceText: 'x^2 - 5x + 6 = 0',
      mathDestination: 'Word, with typeset editable equations',
    },
  },
  'learning-stations': {
    options: { level: 'Primaria' },
    es: {
      subject: 'Ciencias',
      topic: 'El ciclo del agua',
      objectives: 'Explicar sus fases.',
      duration: '60 minutos',
      resources: 'Papel, recipientes y una tableta por grupo',
      context: '24 estudiantes, grupos de 4',
    },
    va: {
      subject: 'Ciències',
      topic: 'El cicle de l’aigua',
      objectives: 'Explicar-ne les fases.',
      duration: '60 minuts',
      resources: 'Paper, recipients i una tauleta per grup',
      context: '24 estudiants, grups de 4',
    },
    en: {
      subject: 'Science',
      topic: 'The water cycle',
      objectives: 'Explain its stages.',
      duration: '60 minutes',
      resources: 'Paper, containers and one tablet per group',
      context: '24 learners, groups of 4',
    },
  },
}
