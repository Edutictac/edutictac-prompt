import type { Language } from './types'

// Ejemplos para el botón «Cargar un ejemplo». Las opciones se guardan con el
// valor original (en castellano) y se traducen al mostrarlas. Los textos se
// escriben en castellano, valenciano e inglés; el catalán central usa el texto
// valenciano y sustituye en «ca» los campos con formas propias del valenciano.
type ExampleText = Record<string, string>
type Example = { options?: Record<string, string>; es: ExampleText; va: ExampleText; ca?: ExampleText; en: ExampleText }

export const examples: Record<string, Example> = {
  'learning-situation': {
    options: { level: 'Primaria', duration: 'Varias sesiones', methodology: 'Aprendizaje cooperativo · Investigación' },
    es: { course: '5.º', subject: 'Ciencias de la Naturaleza', topic: 'El ciclo del agua en nuestro municipio', objectives: 'Explicar las fases del ciclo del agua y proponer medidas para ahorrar agua en el centro.' },
    va: { course: '5é', subject: 'Ciències de la Naturalesa', topic: 'El cicle de l’aigua al nostre municipi', objectives: 'Explicar les fases del cicle de l’aigua i proposar mesures per a estalviar aigua al centre.' },
    en: { course: 'Year 5', subject: 'Natural Science', topic: 'The water cycle in our town', objectives: 'Explain the stages of the water cycle and suggest ways to save water at school.' }
  },
  lesson: {
    options: { level: 'ESO', duration: '55 minutos', resources: 'Proyector · Ordenadores' },
    es: { course: '2.º', subject: 'Matemáticas', topic: 'Proporcionalidad directa', objectives: 'Reconocer magnitudes directamente proporcionales y resolver problemas con la regla de tres.' },
    va: { course: '2n', subject: 'Matemàtiques', topic: 'Proporcionalitat directa', objectives: 'Reconéixer magnituds directament proporcionals i resoldre problemes amb la regla de tres.' },
    ca: { objectives: 'Reconèixer magnituds directament proporcionals i resoldre problemes amb la regla de tres.' },
    en: { course: 'Year 8', subject: 'Mathematics', topic: 'Direct proportion', objectives: 'Identify directly proportional quantities and solve problems using the unitary method.' }
  },
  sequence: {
    options: { level: 'Primaria', duration: 'Varias semanas', methodology: 'ABP · Cooperativo' },
    es: { subject: 'Lengua Castellana', topic: 'El texto descriptivo', objectives: 'Leer, planificar y escribir descripciones de lugares del barrio.' },
    va: { subject: 'Valencià: Llengua i Literatura', topic: 'El text descriptiu', objectives: 'Llegir, planificar i escriure descripcions de llocs del barri.' },
    en: { subject: 'English Language', topic: 'Descriptive writing', objectives: 'Read, plan and write descriptions of places in the neighbourhood.' }
  },
  'competency-activity': {
    options: { level: 'ESO', methodology: 'Cooperativo · Retos', resources: 'Ordenadores' },
    es: { subject: 'Geografía e Historia', topic: 'El turismo y su impacto en la costa', objectives: 'Analizar datos sobre turismo y proponer mejoras para un turismo sostenible.' },
    va: { subject: 'Geografia i Història', topic: 'El turisme i el seu impacte a la costa', objectives: 'Analitzar dades sobre turisme i proposar millores per a un turisme sostenible.' },
    en: { subject: 'Geography and History', topic: 'Tourism and its impact on the coast', objectives: 'Analyse tourism data and propose improvements for sustainable tourism.' }
  },
  project: {
    options: { level: 'Primaria', duration: 'Varias semanas', resources: 'Material manipulativo · Ordenadores' },
    es: { subject: 'Ciencias de la Naturaleza', topic: 'Un huerto escolar', objectives: 'Planificar, cultivar y documentar un huerto, relacionando las plantas con su entorno.' },
    va: { subject: 'Ciències de la Naturalesa', topic: 'Un hort escolar', objectives: 'Planificar, cultivar i documentar un hort, relacionant les plantes amb el seu entorn.' },
    en: { subject: 'Natural Science', topic: 'A school garden', objectives: 'Plan, grow and document a garden, linking plants to their environment.' }
  },
  challenge: {
    options: { level: 'ESO', methodology: 'Aprendizaje basado en problemas · Pensamiento crítico' },
    es: { subject: 'Tecnología', topic: 'Reducir el ruido en el comedor', objectives: 'Medir el ruido, identificar sus causas y diseñar una solución viable.' },
    va: { subject: 'Tecnologia', topic: 'Reduir el soroll al menjador', objectives: 'Mesurar el soroll, identificar-ne les causes i dissenyar una solució viable.' },
    en: { subject: 'Technology', topic: 'Reducing noise in the dining hall', objectives: 'Measure noise, identify its causes and design a workable solution.' }
  },
  rubric: {
    options: { level: 'ESO', levels: '4' },
    es: { subject: 'Lengua Castellana', activity: 'Una exposición oral sobre un libro leído', criteria: 'Contenido, organización, expresión oral, uso del tiempo' },
    va: { subject: 'Valencià: Llengua i Literatura', activity: 'Una exposició oral sobre un llibre llegit', criteria: 'Contingut, organització, expressió oral, ús del temps' },
    en: { subject: 'English Language', activity: 'An oral presentation about a book', criteria: 'Content, organisation, speaking, use of time' }
  },
  checklist: {
    options: { level: 'Primaria' },
    es: { subject: 'Ciencias de la Naturaleza', activity: 'Un experimento sobre la germinación', criteria: 'Sigue los pasos, anota observaciones, dibuja resultados, recoge el material' },
    va: { subject: 'Ciències de la Naturalesa', activity: 'Un experiment sobre la germinació', criteria: 'Seguix els passos, anota observacions, dibuixa resultats, recull el material' },
    ca: { criteria: 'Segueix els passos, anota observacions, dibuixa resultats, recull el material' },
    en: { subject: 'Natural Science', activity: 'A germination experiment', criteria: 'Follows the steps, records observations, draws results, tidies up' }
  },
  'rating-scale': {
    options: { level: 'ESO', levels: '4' },
    es: { subject: 'Educación Física', activity: 'Una coreografía en grupo', criteria: 'Coordinación, ritmo, creatividad, trabajo en equipo' },
    va: { subject: 'Educació Física', activity: 'Una coreografia en grup', criteria: 'Coordinació, ritme, creativitat, treball en equip' },
    en: { subject: 'Physical Education', activity: 'A group dance routine', criteria: 'Coordination, rhythm, creativity, teamwork' }
  },
  'systematic-observation': {
    options: { level: 'Infantil' },
    es: { subject: 'Comunicación y representación de la realidad', activity: 'El juego en los rincones', context: 'Grupo de 5 años, cuatro rincones, sesiones de 45 minutos.', criteria: 'Respeta turnos, comparte material, expresa lo que hace, termina la tarea' },
    va: { subject: 'Comunicació i representació de la realitat', activity: 'El joc als racons', context: 'Grup de 5 anys, quatre racons, sessions de 45 minuts.', criteria: 'Respecta els torns, compartix material, expressa el que fa, acaba la tasca' },
    ca: { criteria: 'Respecta els torns, comparteix material, expressa el que fa, acaba la tasca' },
    en: { subject: 'Communication and representation', activity: 'Play in learning corners', context: 'Group of 5-year-olds, four corners, 45-minute sessions.', criteria: 'Takes turns, shares materials, explains what they are doing, finishes the task' }
  },
  portfolio: {
    options: { level: 'Bachillerato' },
    es: { subject: 'Filosofía', activity: 'Un trimestre de debates y ensayos breves', criteria: 'Argumentación, uso de fuentes, reflexión sobre el propio progreso' },
    va: { subject: 'Filosofia', activity: 'Un trimestre de debats i assajos breus', criteria: 'Argumentació, ús de fonts, reflexió sobre el progrés propi' },
    en: { subject: 'Philosophy', activity: 'A term of debates and short essays', criteria: 'Argument, use of sources, reflection on own progress' }
  },
  production: {
    options: { level: 'Primaria' },
    es: { subject: 'Lengua Castellana', activity: 'Un cuento escrito por parejas', criteria: 'Estructura, vocabulario, ortografía, creatividad' },
    va: { subject: 'Valencià: Llengua i Literatura', activity: 'Un conte escrit per parelles', criteria: 'Estructura, vocabulari, ortografia, creativitat' },
    en: { subject: 'English Language', activity: 'A story written in pairs', criteria: 'Structure, vocabulary, spelling, creativity' }
  },
  'written-test': {
    options: { level: 'ESO', levels: '10' },
    es: { subject: 'Física y Química', activity: 'Los cambios de estado de la materia', criteria: 'Definir conceptos, interpretar gráficas, resolver un problema' },
    va: { subject: 'Física i Química', activity: 'Els canvis d’estat de la matèria', criteria: 'Definir conceptes, interpretar gràfiques, resoldre un problema' },
    en: { subject: 'Physics and Chemistry', activity: 'Changes of state of matter', criteria: 'Define concepts, interpret graphs, solve a problem' }
  },
  product: {
    options: { level: 'FP' },
    es: { subject: 'Sistemas Microinformáticos', activity: 'Montaje y configuración de un ordenador', context: 'Trabajo por parejas en el taller durante dos semanas.', criteria: 'Funcionamiento, seguridad, documentación, orden' },
    va: { subject: 'Sistemes Microinformàtics', activity: 'Muntatge i configuració d’un ordinador', context: 'Treball per parelles al taller durant dues setmanes.', criteria: 'Funcionament, seguretat, documentació, ordre' },
    en: { subject: 'Computer Systems', activity: 'Building and setting up a computer', context: 'Pair work in the workshop over two weeks.', criteria: 'Works correctly, safety, documentation, tidiness' }
  },
  presentation: {
    options: { level: 'ESO', duration: '5 minutos' },
    es: { subject: 'Biología y Geología', activity: 'Un animal en peligro de extinción', criteria: 'Contenido, claridad, apoyo visual, respuesta a preguntas' },
    va: { subject: 'Biologia i Geologia', activity: 'Un animal en perill d’extinció', criteria: 'Contingut, claredat, suport visual, resposta a preguntes' },
    en: { subject: 'Biology and Geology', activity: 'An endangered animal', criteria: 'Content, clarity, visual support, answering questions' }
  },
  h5p: {
    options: { level: 'Primaria', activityType: 'Arrastrar y soltar' },
    es: { subject: 'Ciencias Sociales', topic: 'Los ríos de España', objectives: 'Situar los ríos principales en el mapa.' },
    va: { subject: 'Ciències Socials', topic: 'Els rius de la Comunitat Valenciana', objectives: 'Situar els rius principals al mapa.' },
    en: { subject: 'Social Science', topic: 'The main rivers of Spain', objectives: 'Locate the main rivers on the map.' }
  },
  scorm: {
    options: { level: 'ESO' },
    es: { subject: 'Tecnología y Digitalización', topic: 'Contraseñas seguras', objectives: 'Crear contraseñas robustas y reconocer intentos de suplantación.' },
    va: { subject: 'Tecnologia i Digitalització', topic: 'Contrasenyes segures', objectives: 'Crear contrasenyes robustes i reconéixer intents de suplantació.' },
    ca: { objectives: 'Crear contrasenyes robustes i reconèixer intents de suplantació.' },
    en: { subject: 'Technology and Digital Skills', topic: 'Strong passwords', objectives: 'Create strong passwords and recognise phishing attempts.' }
  },
  'html-game': {
    options: { level: 'Primaria', activityType: 'Memorizar y escribir · Completar huecos', gameFeatures: 'Niveles y trofeos · Ayuda para el alumnado · Menú docente oculto · Guardar sesión' },
    es: { subject: 'Lengua Castellana', topic: 'Palabras con b y v', gameItems: 'BOMBERO → _ombero (b)\nVIVIR → _i_ir (v, v)\nNAVEGAR → na_egar (v)\nCABALLO → ca_allo (b)' },
    va: { subject: 'Valencià: Llengua i Literatura', topic: 'Paraules amb vocal neutra (a/e)', gameItems: 'ANAGRAMA → anagram_ (a)\nAVANTATGE → av_ntatg_ (a, e)\nPERSONA → p_rson_ (e, a)\nTAULA → taul_ (a)' },
    en: { subject: 'English Language', topic: 'Irregular past tense verbs', gameItems: 'go → went\nsee → saw\nbuy → bought\nthink → thought' }
  },
  gift: {
    options: { level: 'Bachillerato' },
    es: { subject: 'Historia de España', topic: 'La Segunda República', objectives: 'Repasar fechas, personajes y reformas principales.' },
    va: { subject: 'Història d’Espanya', topic: 'La Segona República', objectives: 'Repassar dates, personatges i reformes principals.' },
    en: { subject: 'History of Spain', topic: 'The Second Republic', objectives: 'Review key dates, figures and reforms.' }
  },
  qti: {
    options: { level: 'ESO' },
    es: { subject: 'Matemáticas', topic: 'Ecuaciones de primer grado', objectives: 'Resolver ecuaciones y plantear problemas sencillos.' },
    va: { subject: 'Matemàtiques', topic: 'Equacions de primer grau', objectives: 'Resoldre equacions i plantejar problemes senzills.' },
    en: { subject: 'Mathematics', topic: 'Linear equations', objectives: 'Solve equations and set up simple word problems.' }
  },
  'common-cartridge': {
    options: { level: 'FP' },
    es: { subject: 'Formación y Orientación Laboral', topic: 'Prevención de riesgos laborales', objectives: 'Identificar riesgos del puesto de trabajo y medidas preventivas.' },
    va: { subject: 'Formació i Orientació Laboral', topic: 'Prevenció de riscos laborals', objectives: 'Identificar riscos del lloc de treball i mesures preventives.' },
    en: { subject: 'Employment Training', topic: 'Occupational risk prevention', objectives: 'Identify workplace risks and preventive measures.' }
  },
  feedback: {
    options: { level: 'ESO' },
    es: { subject: 'Lengua Castellana', task: 'Escribe comentarios formativos para una redacción de opinión: qué está bien, qué mejorar y un paso concreto.', criteria: 'Tesis clara, argumentos, conectores, ortografía' },
    va: { subject: 'Valencià: Llengua i Literatura', task: 'Escriu comentaris formatius per a una redacció d’opinió: què està bé, què millorar i un pas concret.', criteria: 'Tesi clara, arguments, connectors, ortografia' },
    en: { subject: 'English Language', task: 'Write formative comments for an opinion essay: what works, what to improve and one concrete next step.', criteria: 'Clear thesis, arguments, linking words, spelling' }
  },
  'three-levels': {
    options: { level: 'Primaria' },
    es: { subject: 'Ciencias de la Naturaleza', task: 'Actividad de comprensión lectora sobre los ecosistemas.', objectives: 'Identificar seres vivos, relaciones y cadenas alimentarias.' },
    va: { subject: 'Ciències de la Naturalesa', task: 'Activitat de comprensió lectora sobre els ecosistemes.', objectives: 'Identificar éssers vius, relacions i cadenes alimentàries.' },
    en: { subject: 'Natural Science', task: 'Reading comprehension activity about ecosystems.', objectives: 'Identify living things, relationships and food chains.' }
  },
  'easy-reading': {
    options: { level: 'ESO' },
    es: { subject: 'Geografía e Historia', topic: 'La Revolución Industrial', sourceText: 'La Revolución Industrial fue un proceso de transformación económica, social y tecnológica que se inició en Gran Bretaña en la segunda mitad del siglo XVIII y que supuso el paso de una economía agraria y artesanal a otra dominada por la industria y la mecanización.' },
    va: { subject: 'Geografia i Història', topic: 'La Revolució Industrial', sourceText: 'La Revolució Industrial va ser un procés de transformació econòmica, social i tecnològica que es va iniciar a la Gran Bretanya en la segona meitat del segle XVIII i que va suposar el pas d’una economia agrària i artesanal a una altra dominada per la indústria i la mecanització.' },
    en: { subject: 'Geography and History', topic: 'The Industrial Revolution', sourceText: 'The Industrial Revolution was a process of economic, social and technological change that began in Great Britain in the second half of the eighteenth century and marked the shift from an agrarian, craft-based economy to one dominated by industry and machinery.' }
  },
  'bias-check': {
    options: { level: 'Primaria' },
    es: { subject: 'Matemáticas', topic: 'Problemas de compras', sourceText: 'Laura va al mercado con su madre a comprar fruta. Pablo y su padre arreglan la bici en el taller.' },
    va: { subject: 'Matemàtiques', topic: 'Problemes de compres', sourceText: 'Laura va al mercat amb sa mare a comprar fruita. Pau i son pare arreglen la bici al taller.' },
    en: { subject: 'Mathematics', topic: 'Shopping word problems', sourceText: 'Laura goes to the market with her mum to buy fruit. Paul and his dad fix the bike in the garage.' }
  },
  'glossary-support': {
    options: { level: 'ESO' },
    es: { subject: 'Biología y Geología', topic: 'La célula', objectives: 'Comprender el vocabulario básico de la célula y sus orgánulos.' },
    va: { subject: 'Biologia i Geologia', topic: 'La cèl·lula', objectives: 'Comprendre el vocabulari bàsic de la cèl·lula i els seus orgànuls.' },
    en: { subject: 'Biology and Geology', topic: 'The cell', objectives: 'Understand basic vocabulary about the cell and its organelles.' }
  },
  'family-note': {
    es: { role: 'Tutora de 3.º de Primaria', task: 'Comunicar una salida didáctica al museo de ciencias y pedir la autorización firmada.', constraints: 'Tono cercano, máximo 150 palabras, incluir fecha, horario y material.' },
    va: { role: 'Tutora de 3r de Primària', task: 'Comunicar una eixida didàctica al museu de ciències i demanar l’autorització signada.', constraints: 'To proper, màxim 150 paraules, incloure data, horari i material.' },
    ca: { task: 'Comunicar una sortida didàctica al museu de ciències i demanar l’autorització signada.' },
    en: { role: 'Year 3 class teacher', task: 'Announce a school trip to the science museum and ask for signed permission.', constraints: 'Friendly tone, 150 words maximum, include date, times and what to bring.' }
  },
  'tutoring-script': {
    es: { role: 'Tutor de 1.º de ESO', task: 'Preparar una entrevista con una familia para hablar de la organización del estudio en casa.', objectives: 'Acordar dos rutinas concretas y una fecha de seguimiento.' },
    va: { role: 'Tutor de 1r d’ESO', task: 'Preparar una entrevista amb una família per a parlar de l’organització de l’estudi a casa.', objectives: 'Acordar dues rutines concretes i una data de seguiment.' },
    en: { role: 'Year 7 form tutor', task: 'Prepare a meeting with a family to talk about organising study at home.', objectives: 'Agree on two specific routines and a follow-up date.' }
  },
  free: {
    es: { role: 'Coordinador TIC de un instituto', task: 'Redacta una guía breve para que el profesorado cree un aula en Aules.', constraints: 'Pasos numerados, lenguaje sencillo, sin capturas.' },
    va: { role: 'Coordinador TIC d’un institut', task: 'Redacta una guia breu perquè el professorat cree una aula a Aules.', constraints: 'Passos numerats, llenguatge senzill, sense captures.' },
    ca: { task: 'Redacta una guia breu perquè el professorat creï una aula a Aules.' },
    en: { role: 'School IT coordinator', task: 'Write a short guide for teachers on creating a course in Moodle.', constraints: 'Numbered steps, plain language, no screenshots.' }
  },
  'scientific-illustration': {
    options: { level: 'ESO', visualStyle: 'Ilustración de libro de texto', includeLabels: 'Con etiquetas básicas', aspectRatio: '16:9 horizontal' },
    es: { subject: 'Biología y Geología', topic: 'La célula vegetal' },
    va: { subject: 'Biologia i Geologia', topic: 'La cèl·lula vegetal' },
    en: { subject: 'Biology and Geology', topic: 'The plant cell' }
  },
  infographic: {
    options: { level: 'Primaria', visualStyle: 'Infografía plana', aspectRatio: '9:16 vertical' },
    es: { subject: 'Ciencias de la Naturaleza', topic: 'El reciclaje', sections: 'Qué es, los contenedores por colores, qué va en cada uno, por qué es importante' },
    va: { subject: 'Ciències de la Naturalesa', topic: 'El reciclatge', sections: 'Què és, els contenidors per colors, què va en cada un, per què és important' },
    en: { subject: 'Natural Science', topic: 'Recycling', sections: 'What it is, bins by colour, what goes in each, why it matters' }
  },
  'mind-map': {
    options: { level: 'ESO' },
    es: { subject: 'Geografía e Historia', topic: 'La Edad Media', objectives: 'Organizar los contenidos de la unidad para repasar.', branches: 'Sociedad, economía, cultura, religión' },
    va: { subject: 'Geografia i Història', topic: 'L’edat mitjana', objectives: 'Organitzar els continguts de la unitat per a repassar.', branches: 'Societat, economia, cultura, religió' },
    en: { subject: 'Geography and History', topic: 'The Middle Ages', objectives: 'Organise the unit content for revision.', branches: 'Society, economy, culture, religion' }
  },
  'udl-review': {
    options: { level: 'ESO' },
    es: { subject: 'Física y Química', sourceText: 'Lee las páginas 40 a 45 del libro y responde por escrito a las diez preguntas del final. Entrega en papel el viernes.', objectives: 'Comprender las leyes de Newton.', barriers: 'Textos largos sin apoyo visual; una única forma de responder.' },
    va: { subject: 'Física i Química', sourceText: 'Llig les pàgines 40 a 45 del llibre i respon per escrit a les deu preguntes del final. Entrega en paper divendres.', objectives: 'Comprendre les lleis de Newton.', barriers: 'Textos llargs sense suport visual; una única manera de respondre.' },
    ca: { sourceText: 'Llegeix les pàgines 40 a 45 del llibre i respon per escrit a les deu preguntes del final. Lliura-ho en paper divendres.' },
    en: { subject: 'Physics and Chemistry', sourceText: 'Read pages 40 to 45 of the textbook and answer the ten questions at the end in writing. Hand in on paper on Friday.', objectives: 'Understand Newton’s laws.', barriers: 'Long texts with no visual support; only one way to respond.' }
  },
  'udl-matrix': {
    options: { level: 'Primaria', udl: 'Implicación · Representación · Acción y expresión' },
    es: { subject: 'Matemáticas', topic: 'Las fracciones', objectives: 'Representar, comparar y usar fracciones en situaciones cotidianas.', barriers: 'Parte del grupo aún no domina la lengua vehicular; poco material manipulativo.' },
    va: { subject: 'Matemàtiques', topic: 'Les fraccions', objectives: 'Representar, comparar i usar fraccions en situacions quotidianes.', barriers: 'Part del grup encara no domina la llengua vehicular; poc material manipulatiu.' },
    en: { subject: 'Mathematics', topic: 'Fractions', objectives: 'Represent, compare and use fractions in everyday situations.', barriers: 'Some learners are still learning the language of instruction; few manipulatives.' }
  }
}

export function exampleValues(templateId: string, language: Language): Record<string, string> {
  const example = examples[templateId]
  if (!example) return {}
  const text = language === 'en' ? example.en : language === 'es' ? example.es : language === 'ca' ? { ...example.va, ...example.ca } : example.va
  return { ...example.options, ...text }
}
