import type { Example } from '../examples'

export const examples3: Record<string, Example> = {
  'mind-map': {
    options: { level: 'ESO' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'La Edad Media',
      objectives: 'Organizar los contenidos de la unidad para repasar.',
      branches: 'Sociedad, economía, cultura, religión',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'L’edat mitjana',
      objectives: 'Organitzar els continguts de la unitat per a repassar.',
      branches: 'Societat, economia, cultura, religió',
    },
    en: {
      subject: 'Geography and History',
      topic: 'The Middle Ages',
      objectives: 'Organise the unit content for revision.',
      branches: 'Society, economy, culture, religion',
    },
  },
  'explainer-video': {
    options: {
      level: 'Primaria',
      videoStyle: 'Manual (papel y tinta)',
      videoVariant: 'Clara (papel marfil)',
      videoFinish: 'Acabado habitual',
      duration: '2 minutos',
      tone: 'Cercano',
      voice: 'Voz del navegador',
      outputFormat: 'HTML',
    },
    es: {
      subject: 'Ciencias de la Naturaleza',
      topic: 'El ciclo del agua',
      sourceText:
        'El agua de mares, ríos y lagos se evapora con el calor del sol. El vapor sube, se enfría y forma nubes. Las gotas se juntan hasta que caen como lluvia o nieve. Parte del agua se filtra en el suelo y vuelve a los ríos y acuíferos. En el centro podemos ahorrar agua cerrando los grifos y reparando fugas.',
      objectives:
        'Que el alumnado y las familias entiendan el ciclo del agua y sepan cómo ahorrar agua en casa y en el centro.',
      audience: 'Alumnado de 5.º de Primaria y sus familias',
      mustShow: 'Que el agua no se gasta: se transforma y vuelve a empezar.',
      avoid: 'Nombres del alumnado y consumos concretos del centro.',
    },
    va: {
      subject: 'Ciències de la Naturalesa',
      topic: 'El cicle de l’aigua',
      sourceText:
        'L’aigua de mars, rius i llacs s’evapora amb la calor del sol. El vapor puja, es refreda i forma núvols. Les gotes s’ajunten fins que cauen com a pluja o neu. Part de l’aigua es filtra en el sòl i torna als rius i aqüífers. Al centre podem estalviar aigua tancant les aixetes i arreglant fuites.',
      objectives:
        'Que l’alumnat i les famílies entenguen el cicle de l’aigua i sàpien com estalviar aigua a casa i al centre.',
      audience: 'Alumnat de 5é de Primària i les seues famílies',
      mustShow: 'Que l’aigua no es gasta: es transforma i torna a començar.',
      avoid: 'Noms de l’alumnat i consums concrets del centre.',
    },
    ca: {
      objectives:
        'Que l’alumnat i les famílies entenguin el cicle de l’aigua i sàpiguen com estalviar aigua a casa i al centre.',
      audience: 'Alumnat de 5è de Primària i les seves famílies',
    },
    en: {
      subject: 'Natural Science',
      topic: 'The water cycle',
      sourceText:
        'Water from seas, rivers and lakes evaporates with the sun’s heat. The vapour rises, cools and forms clouds. Droplets join until they fall as rain or snow. Some water filters into the ground and returns to rivers and aquifers. At school we can save water by turning off taps and fixing leaks.',
      objectives:
        'For students and families to understand the water cycle and know how to save water at home and at school.',
      audience: 'Year 5 students and their families',
      mustShow: 'That water is not used up: it changes and starts again.',
      avoid: 'Student names and the school’s actual water consumption.',
    },
  },
  'udl-review': {
    options: { level: 'ESO' },
    es: {
      subject: 'Física y Química',
      sourceText:
        'Lee las páginas 40 a 45 del libro y responde por escrito a las diez preguntas del final. Entrega en papel el viernes.',
      objectives: 'Comprender las leyes de Newton.',
      barriers: 'Textos largos sin apoyo visual; una única forma de responder.',
    },
    va: {
      subject: 'Física i Química',
      sourceText:
        'Llig les pàgines 40 a 45 del llibre i respon per escrit a les deu preguntes del final. Entrega en paper divendres.',
      objectives: 'Comprendre les lleis de Newton.',
      barriers: 'Textos llargs sense suport visual; una única manera de respondre.',
    },
    ca: {
      sourceText:
        'Llegeix les pàgines 40 a 45 del llibre i respon per escrit a les deu preguntes del final. Lliura-ho en paper divendres.',
    },
    en: {
      subject: 'Physics and Chemistry',
      sourceText:
        'Read pages 40 to 45 of the textbook and answer the ten questions at the end in writing. Hand in on paper on Friday.',
      objectives: 'Understand Newton’s laws.',
      barriers: 'Long texts with no visual support; only one way to respond.',
    },
  },
  'udl-matrix': {
    options: { level: 'Primaria', udl: 'Implicación · Representación · Acción y expresión' },
    es: {
      subject: 'Matemáticas',
      topic: 'Las fracciones',
      objectives: 'Representar, comparar y usar fracciones en situaciones cotidianas.',
      barriers: 'Parte del grupo aún no domina la lengua vehicular; poco material manipulativo.',
    },
    va: {
      subject: 'Matemàtiques',
      topic: 'Les fraccions',
      objectives: 'Representar, comparar i usar fraccions en situacions quotidianes.',
      barriers: 'Part del grup encara no domina la llengua vehicular; poc material manipulatiu.',
    },
    en: {
      subject: 'Mathematics',
      topic: 'Fractions',
      objectives: 'Represent, compare and use fractions in everyday situations.',
      barriers: 'Some learners are still learning the language of instruction; few manipulatives.',
    },
  },
  'student-tutor': {
    options: { level: 'ESO' },
    es: {
      subject: 'Matemáticas',
      topic: 'Ecuaciones de primer grado',
      task: 'No des la solución de golpe: haz una pregunta cada vez y ofrece una pista si me bloqueo.',
    },
    va: {
      subject: 'Matemàtiques',
      topic: 'Equacions de primer grau',
      task: 'No dones la solució de colp: fes una pregunta cada vegada i oferix-me una pista si em bloquege.',
    },
    ca: {
      task: 'No donis la solució de cop: fes una pregunta cada vegada i ofereix-me una pista si em bloquejo.',
    },
    en: {
      subject: 'Mathematics',
      topic: 'Linear equations',
      task: 'Do not give the answer straight away: ask one question at a time and offer a hint if I get stuck.',
    },
  },
  analogies: {
    options: { level: 'ESO' },
    es: {
      subject: 'Biología y Geología',
      topic: 'La función de las mitocondrias',
      task: 'Relaciona las analogías con intereses cotidianos de adolescentes e indica sus límites.',
    },
    va: {
      subject: 'Biologia i Geologia',
      topic: 'La funció dels mitocondris',
      task: 'Relaciona les analogies amb interessos quotidians d’adolescents i indica’n els límits.',
    },
    en: {
      subject: 'Biology and Geology',
      topic: 'The role of mitochondria',
      task: 'Connect analogies to teenagers’ everyday interests and explain their limits.',
    },
  },
  participation: {
    options: { level: 'ESO', duration: '30 minutos' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'Debatir sobre el uso del agua',
      context:
        'Grupo numeroso; suelen intervenir siempre las mismas personas y parte del alumnado prefiere pensar antes de hablar.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'Debatre sobre l’ús de l’aigua',
      context:
        'Grup nombrós; solen intervindre sempre les mateixes persones i part de l’alumnat preferix pensar abans de parlar.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'Debating water use',
      context: 'Large class; the same people usually speak, and some learners prefer time to think before speaking.',
    },
  },
  'conflict-mediation': {
    options: { level: 'ESO' },
    es: {
      context:
        'Dos grupos discrepan sobre el reparto de tareas de un proyecto. No incluyas nombres ni presupongas quién tiene la culpa.',
      task: 'Prepara preguntas neutrales para escuchar a las partes, reparar el daño si lo hay y acordar pasos concretos.',
    },
    va: {
      context:
        'Dos grups discrepen sobre el repartiment de tasques d’un projecte. No inclogues noms ni pressuposes qui té la culpa.',
      task: 'Prepara preguntes neutrals per a escoltar les parts, reparar el dany si n’hi ha i acordar passos concrets.',
    },
    en: {
      context:
        'Two groups disagree about how project tasks were divided. Do not include names or assume who is at fault.',
      task: 'Prepare neutral questions to hear each side, repair harm if needed and agree on specific next steps.',
    },
  },
  'multiple-choice': {
    options: { level: 'ESO' },
    es: {
      subject: 'Física y Química',
      topic: 'Cambios de estado',
      objectives: 'Distinguir fusión, evaporación, condensación y solidificación.',
    },
    va: {
      subject: 'Física i Química',
      topic: 'Canvis d’estat',
      objectives: 'Distingir fusió, evaporació, condensació i solidificació.',
    },
    en: {
      subject: 'Physics and Chemistry',
      topic: 'Changes of state',
      objectives: 'Distinguish melting, evaporation, condensation and freezing.',
    },
  },
  'escape-room': {
    options: { level: 'ESO', questionCount: '4', duration: '55 minutos' },
    es: {
      subject: 'Matemáticas',
      topic: 'Fracciones y porcentajes',
      objectives: 'Calcular porcentajes y operar con fracciones en situaciones cotidianas.',
    },
    va: {
      subject: 'Matemàtiques',
      topic: 'Fraccions i percentatges',
      objectives: 'Calcular percentatges i operar amb fraccions en situacions quotidianes.',
    },
    en: {
      subject: 'Mathematics',
      topic: 'Fractions and percentages',
      objectives: 'Calculate percentages and operate with fractions in everyday situations.',
    },
  },
  'reading-comprehension': {
    options: { level: 'ESO', questionCount: '9' },
    es: {
      subject: 'Geografía e Historia',
      topic: 'El Palmeral de Elche',
      objectives: 'Comprender un texto expositivo y valorar la conservación del patrimonio.',
      sourceText:
        'El Palmeral de Elche es un conjunto de huertos de palmeras datileras. Su origen está ligado al sistema de riego de acequias. En el año 2000 la UNESCO lo declaró Patrimonio de la Humanidad como paisaje cultural.',
    },
    va: {
      subject: 'Geografia i Història',
      topic: 'El Palmerar d’Elx',
      objectives: 'Comprendre un text expositiu i valorar la conservació del patrimoni.',
      sourceText:
        'El Palmerar d’Elx és un conjunt d’horts de palmeres datileres. El seu origen està lligat al sistema de reg de séquies. L’any 2000 la UNESCO el va declarar Patrimoni de la Humanitat com a paisatge cultural.',
    },
    en: {
      subject: 'Geography and History',
      topic: 'The Palm Grove of Elche',
      objectives: 'Understand an expository text and value the preservation of heritage.',
      sourceText:
        'The Palm Grove of Elche is a set of date palm orchards. Its origin is linked to the irrigation system of acequias (channels). In 2000 UNESCO declared it a World Heritage Site as a cultural landscape.',
    },
  },
  'case-study': {
    options: { level: 'FP', questionCount: '4' },
    es: {
      subject: 'Empresa e Iniciativa Emprendedora',
      topic: 'Viabilidad de una pequeña cafetería',
      objectives: 'Calcular el punto de equilibrio y decidir si conviene ampliar el horario.',
      context: 'Grado medio, segundo curso. El alumnado ya conoce costes fijos y variables.',
    },
    va: {
      subject: 'Empresa i Iniciativa Emprenedora',
      topic: 'Viabilitat d’una xicoteta cafeteria',
      objectives: 'Calcular el punt d’equilibri i decidir si convé ampliar l’horari.',
      context: 'Grau mitjà, segon curs. L’alumnat ja coneix costos fixos i variables.',
    },
    en: {
      subject: 'Business and Entrepreneurship',
      topic: 'Viability of a small coffee shop',
      objectives: 'Calculate the break-even point and decide whether to extend opening hours.',
      context: 'Second-year vocational students who already know fixed and variable costs.',
    },
  },
}
