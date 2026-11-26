import { editableLatexTask } from './editableLatex'
import { codingActivityTask } from './codingActivity'
import { illustratedWorksheetTask } from './illustratedWorksheet'
import { profileAdaptationTask } from './profileAdaptation'
import { schoolDocumentTask } from './schoolDocument'
import { localizeOption } from '../../optionLocales'
import type { Language } from '../../types'
import type { AssessmentTexts, DefaultTexts, GameTexts, UdlTexts } from './texts'

export function buildTask({
  templateId,
  language,
  value,
  d,
  u,
  g,
  a,
  topic,
  activity,
  mechanics,
  raw = {},
}: {
  templateId: string
  language: Language
  value: (key: string) => string
  d: DefaultTexts
  u: UdlTexts
  g: GameTexts
  a: AssessmentTexts
  topic: string
  activity: string
  mechanics: string[]
  raw?: Record<string, string>
}): string {
  const catalan = language === 'ca' || language === 'ca-valencia'
  // Pasatiempos de la ficha: la IA suele fallar en cuadrículas y retos de
  // ingenio, así que se le pide comprobarlos cuando se elige alguno.
  const puzzleOptions = [
    'Sopa de letras',
    'Crucigrama',
    'Anagramas',
    'Adivinanzas',
    'Jeroglífico',
    'Mensaje secreto',
    'Series y patrones',
    'Encuentra el intruso',
    'Llega al número',
    'La palabra más larga',
  ]
  const hasPuzzle = puzzleOptions.some((option) => mechanics.includes(localizeOption(option, language)))
  const puzzleCheck = !hasPuzzle
    ? ''
    : language === 'en'
      ? ' For each puzzle, make sure it has a single correct solution and is fully solvable (in word searches and crosswords, every word fits and appears exactly as listed; in number challenges, the operations really give the target), and include every solution in the answer key.'
      : catalan
        ? ' En cada passatemps, comprova que té una única solució correcta i que es pot resoldre del tot (en les sopes de lletres i els mots encreuats, totes les paraules hi caben i apareixen tal com s’indica; en els reptes numèrics, les operacions donen de veritat el resultat), i inclou-ne totes les solucions en el solucionari.'
        : ' En cada pasatiempo, comprueba que tiene una única solución correcta y que se puede resolver por completo (en las sopas de letras y los crucigramas, todas las palabras caben y aparecen tal como se indican; en los retos numéricos, las operaciones dan de verdad el resultado), e incluye todas sus soluciones en el solucionario.'
  const taskBuilders: Record<string, () => string> = {
    ...Object.fromEntries(Object.keys(a.tasks).map((id) => [id, () => `${a.tasks[id]} ${activity}.`])),
    rubric: () => `${d.rubric} ${activity}.`,
    checklist: () => `${d.checklist} ${activity}.`,
    h5p: () => `${d.h5p} ${value('activityType') || d.interactive} ${language === 'en' ? 'about' : 'sobre'} ${topic}.`,
    'easy-reading': () => `${d.easyReading}${value('topic') ? ` ${a.topic}: ${value('topic')}.` : ''}`,
    'bias-check': () => `${d.biasCheck}${value('topic') ? ` ${a.topic}: ${value('topic')}.` : ''}`,
    'glossary-support': () => `${d.glossary} ${topic}.`,
    feedback: () => value('task') || d.feedback,
    'family-note': () => value('task') || d.familyNote,
    'tutoring-script': () => value('task') || d.tutoringScript,
    'three-levels': () => value('task') || d.threeLevels,
    scorm: () => `${d.scorm} ${topic}.`,
    gift: () => `${d.gift} ${topic}.`,
    qti: () => `${d.qti} ${topic}.`,
    'common-cartridge': () => `${d.commonCartridge} ${topic}.`,
    'scientific-illustration': () => `${d.illustration} ${topic}.`,
    infographic: () => `${d.infographic} ${topic}.`,
    'mind-map': () => `${d.mindMap} ${topic}.`,
    'html-game': () =>
      `${g.task} ${topic}.${mechanics.length ? ` ${mechanics.length > 1 ? g.mechanics : g.mechanic} ${mechanics.join(', ')}.` : ''}`,
    'explainer-video': () =>
      language === 'en'
        ? `Turn the source document into an animated explainer film about this topic: ${topic}. Take into account the audience and objective given. Follow the phase method and do not program until the script is approved.`
        : language === 'ca-valencia'
          ? `Convertix el document de partida en una pel·lícula explicativa animada sobre este tema: ${topic}. Tingues en compte el públic i l’objectiu indicats. Seguix el mètode per fases i no programes fins que s’aprova el guió.`
          : language === 'ca'
            ? `Converteix el document de partida en una pel·lícula explicativa animada sobre aquest tema: ${topic}. Tingues en compte el públic i l’objectiu indicats. Segueix el mètode per fases i no programis fins que s’aprovi el guió.`
            : `Convierte el documento de partida en una película explicativa animada sobre este tema: ${topic}. Ten en cuenta el público y el objetivo indicados. Sigue el método por fases y no programes hasta que se apruebe el guion.`,
    'udl-review': () => u.review,
    'udl-matrix': () => `${u.matrix} ${topic}. ${u.matrixFormat}`,
    'student-tutor': () =>
      value('task') ||
      (language === 'en'
        ? `Help the learner understand ${topic}. Ask one question at a time, adapt to each answer, offer hints rather than the solution, and end with a brief reflection.`
        : catalan
          ? `Ajuda l’estudiant a comprendre ${topic}. Fes una pregunta cada vegada, adapta el diàleg a cada resposta, dona pistes en lloc de donar la solució i acaba amb una breu reflexió.`
          : `Ayuda al estudiante a comprender ${topic}. Haz una pregunta cada vez, adapta el diálogo a cada respuesta, ofrece pistas en lugar de dar la solución y termina con una breve reflexión.`),
    analogies: () =>
      value('task') ||
      (language === 'en'
        ? `Suggest five accurate, varied analogies to explain ${topic}. Connect them to learners’ everyday interests, explain what each analogy clarifies, and state where it stops being accurate.`
        : catalan
          ? `Proposa cinc analogies variades i rigoroses per explicar ${topic}. Relaciona-les amb interessos quotidians de l’alumnat, explica què ajuda a entendre cadascuna i indica on deixa de ser vàlida.`
          : `Propón cinco analogías variadas y rigurosas para explicar ${topic}. Conéctalas con intereses cotidianos del alumnado, explica qué aclara cada una e indica dónde deja de ser válida.`),
    participation: () =>
      language === 'en'
        ? `Suggest practical routines for equitable participation in work on ${topic}. Include quiet and written ways to contribute, clear turn-taking, thinking time, and a way to check whose voices are missing. Avoid putting learners on the spot.`
        : catalan
          ? `Proposa rutines pràctiques per aconseguir una participació equitativa en el treball sobre ${topic}. Inclou maneres tranquil·les i escrites de contribuir, torns clars, temps per pensar i una manera de detectar quines veus falten. Evita posar l’alumnat en evidència.`
          : `Propón rutinas prácticas para lograr una participación equitativa en el trabajo sobre ${topic}. Incluye formas tranquilas y escritas de contribuir, turnos claros, tiempo para pensar y una manera de detectar qué voces faltan. Evita poner al alumnado en evidencia.`,
    'conflict-mediation': () =>
      value('task') ||
      (language === 'en'
        ? 'Help me plan a calm, restorative response to the classroom situation described.'
        : catalan
          ? 'Ajuda’m a preparar una resposta serena i restaurativa davant la situació d’aula descrita.'
          : 'Ayúdame a preparar una respuesta serena y restaurativa ante la situación de aula descrita.'),
    'multiple-choice': () =>
      language === 'en'
        ? `Create a multiple-choice quiz about ${topic}. For each question, provide one correct answer, three plausible distractors, and a short explanation of why each option is correct or reflects a common misconception. ${value('task') || 'Ask for the number and difficulty of questions if not specified.'}`
        : catalan
          ? `Crea un qüestionari de resposta múltiple sobre ${topic}. Per a cada pregunta, inclou una resposta correcta, tres distractors plausibles i una explicació breu de per què cada opció és correcta o reflecteix un error freqüent. ${value('task') || 'Pregunta quantes preguntes i quin nivell de dificultat es volen si no s’indica.'}`
          : `Crea un cuestionario de opción múltiple sobre ${topic}. Para cada pregunta, incluye una respuesta correcta, tres distractores plausibles y una explicación breve de por qué cada opción es correcta o refleja un error frecuente. ${value('task') || 'Pregunta cuántas preguntas y qué dificultad se desean si no se indica.'}`,
    worksheet: () =>
      language === 'en'
        ? `Create a printable student worksheet about ${topic}: a header with title, name and date; short, clear instructions; varied exercises${mechanics.length ? ` (${mechanics.join(', ')})` : ''}, ordered from easier to harder; and enough space to answer on paper. If a source text is provided, use only its information and do not invent facts. After the worksheet, in a separate section, include the answer key for the teacher. Use a simple format that can be pasted into a word processor.${puzzleCheck}`
        : catalan
          ? `Crea una fitxa de treball imprimible per a l’alumnat sobre ${topic}: encapçalament amb títol, nom i data; instruccions breus i clares; exercicis variats${mechanics.length ? ` (${mechanics.join(', ')})` : ''}, ordenats de menys a més dificultat, i espai suficient per a respondre en paper. Si s’aporta un text de partida, utilitza només la informació del text, sense inventar dades. Després de la fitxa, en un apartat separat, inclou el solucionari per al docent. Fes servir un format senzill, adequat per a un processador de textos.${puzzleCheck}`
          : `Crea una ficha de trabajo imprimible para el alumnado sobre ${topic}: encabezado con título, nombre y fecha; instrucciones breves y claras; ejercicios variados${mechanics.length ? ` (${mechanics.join(', ')})` : ''}, ordenados de menor a mayor dificultad, y espacio suficiente para responder en papel. Si se aporta un texto de partida, usa solo su información y no inventes datos. Después de la ficha, en un apartado separado, incluye el solucionario para el docente. Usa un formato sencillo, apto para un procesador de textos.${puzzleCheck}`,
    'case-study': () =>
      language === 'en'
        ? `Create a case study about ${topic}: a realistic, plausible situation from the professional or social field of the subject, with the data needed to solve it (figures, documents or facts); tasks or questions graded from understanding to analysis and decision-making; the objective or learning outcome each task works on; and, in a separate section, the answer key for the teacher with expected answers and common mistakes. All data must be fictitious and consistent; do not use real personal data or identifiable real companies.`
        : catalan
          ? `Crea un cas pràctic sobre ${topic}: una situació realista i versemblant de l’àmbit professional o social de la matèria, amb les dades necessàries per a resoldre-la (xifres, documents o fets); tasques o preguntes graduades de la comprensió a l’anàlisi i la presa de decisions; l’objectiu o resultat d’aprenentatge que treballa cadascuna; i, en un apartat separat, el solucionari per al docent amb les respostes esperades i els errors freqüents. Les dades han de ser fictícies i coherents entre si, sense dades personals reals ni empreses reals identificables.`
          : `Crea un caso práctico sobre ${topic}: una situación realista y verosímil del ámbito profesional o social de la materia, con los datos necesarios para resolverla (cifras, documentos o hechos); tareas o preguntas graduadas de la comprensión al análisis y la toma de decisiones; el objetivo o resultado de aprendizaje que trabaja cada una; y, en un apartado aparte, el solucionario para el docente con las respuestas esperadas y los errores frecuentes. Los datos deben ser ficticios y coherentes entre sí; no uses datos personales reales ni empresas reales identificables.`,
    'lab-guide': () =>
      language === 'en'
        ? `Write a student guide for a lab or workshop practical about ${topic}: objective, brief background, materials and equipment, specific safety rules (protective equipment, risks and what to do if something goes wrong), a numbered step-by-step procedure, a table to record data, and analysis and conclusion questions. In a separate section for the teacher, add expected results, preparation notes and common mistakes. Do not invent safety rules or reference values: flag anything that depends on the actual equipment or product so the teacher can check it.`
        : catalan
          ? `Redacta un guió per a l’alumnat d’una pràctica de laboratori o taller sobre ${topic}: objectiu, fonament breu, material i equips, normes de seguretat específiques (equips de protecció, riscos i què cal fer si alguna cosa va malament), procediment numerat pas a pas, una taula per a recollir dades i preguntes d’anàlisi i conclusió. En un apartat separat per al docent, inclou els resultats esperats, notes de preparació i errors freqüents. Les normes de seguretat i els valors de referència no s’han d’inventar: assenyala el que varia segons l’equip o el producte concret i indica que el docent ho ha de comprovar.`
          : `Redacta un guion para el alumnado de una práctica de laboratorio o taller sobre ${topic}: objetivo, fundamento breve, material y equipos, normas de seguridad específicas (equipos de protección, riesgos y qué hacer si algo sale mal), procedimiento numerado paso a paso, una tabla para recoger datos y preguntas de análisis y conclusión. En un apartado aparte para el docente, añade los resultados esperados, notas de preparación y errores frecuentes. No inventes normas de seguridad ni valores de referencia: señala lo que dependa del equipo o del producto concreto para que el docente lo compruebe.`,
    'class-presentation': () =>
      language === 'en'
        ? `Prepare the outline of a classroom presentation about ${topic}. For each slide: a short title, three to five brief ideas, a suggested image or diagram (from free sources, with a search term) and speaker notes for the teacher. Start with a question that activates prior knowledge, include a short activity halfway through and end with a summary slide. Keep the text on slides short and ready to paste into PowerPoint with Copilot, Gamma or Canva. Flag any fact the teacher should check.`
        : catalan
          ? `Prepara l’esquema d’una presentació per a classe sobre ${topic}. Per a cada diapositiva: un títol curt, de tres a cinc idees breus, una proposta d’imatge o esquema (de fonts lliures, amb un terme de cerca) i notes per al docent. Comença amb una pregunta per a activar els coneixements previs, inclou una activitat breu a la meitat i acaba amb una diapositiva de síntesi. El text de les diapositives ha de ser breu i a punt per a copiar en PowerPoint amb Copilot, Gamma o Canva. Assenyala les dades que el docent ha de comprovar.`
          : `Prepara el esquema de una presentación para clase sobre ${topic}. Para cada diapositiva: un título corto, de tres a cinco ideas breves, una propuesta de imagen o esquema (de fuentes libres, con un término de búsqueda) y notas para el docente. Empieza con una pregunta que active los conocimientos previos, incluye una actividad breve a mitad y termina con una diapositiva de síntesis. El texto de las diapositivas debe ser breve y listo para pegar en PowerPoint con Copilot, Gamma o Canva. Señala cualquier dato que el docente deba comprobar.`,
    'escape-room': () =>
      language === 'en'
        ? `Design an educational escape room about ${topic}: a short story that frames the challenge, a sequence of chained puzzles in which each answer gives the code or clue for the next lock, and a final mission. Every puzzle must require using the learning content, not just guessing. For each puzzle: statement for students, type of lock or code, solution and two graded hints. Add the printable materials, how to set up the room with paper or digital locks (for example a form with answer validation), group organisation, timing and, in a separate section, the teacher's solution sheet. Check that every solution is unique and cannot be reached by trial and error.`
        : catalan
          ? `Dissenya un escape room educatiu sobre ${topic}: una història breu que emmarca el repte, una seqüència d’enigmes encadenats en què cada resposta dona el codi o la pista per al cadenat següent, i una missió final. Cada enigma ha d’exigir usar els continguts d’aprenentatge, no només endevinar. Per a cada enigma: enunciat per a l’alumnat, tipus de cadenat o codi, solució i dues pistes graduades. Inclou els materials imprimibles, com muntar la sala amb cadenats de paper o digitals (per exemple, un formulari amb validació de respostes), l’organització dels grups, la temporització i, en un apartat separat, el full de solucions per al docent. Comprova que cada solució és única i que no s’hi pot arribar provant a l’atzar.`
          : `Diseña un escape room educativo sobre ${topic}: una historia breve que enmarca el reto, una secuencia de enigmas encadenados en la que cada respuesta da el código o la pista para el candado siguiente, y una misión final. Cada enigma debe exigir usar los contenidos de aprendizaje, no solo adivinar. Para cada enigma: enunciado para el alumnado, tipo de candado o código, solución y dos pistas graduadas. Añade los materiales imprimibles, cómo montar la sala con candados de papel o digitales (por ejemplo, un formulario con validación de respuestas), la organización de los grupos, la temporización y, en un apartado aparte, la hoja de soluciones para el docente. Comprueba que cada solución es única y que no se puede llegar a ella probando al azar.`,
    'reading-comprehension': () =>
      language === 'en'
        ? `Prepare a graded reading comprehension activity about ${topic}. If a source text is provided, use it exactly and do not change it; otherwise write a text suited to the level, without invented data that looks real. Then add: key vocabulary with short definitions, and questions in three blocks, the same number in each: literal (information stated in the text), inferential (relating ideas and deducing) and critical (giving an opinion with reasons and connecting with the student's world). Mark the level of each question and, in a separate section, give the teacher the expected answers and what to look for in open answers.`
        : catalan
          ? `Prepara una activitat de lectura comprensiva graduada sobre ${topic}. Si s’aporta un text de partida, fes-lo servir tal com és, sense canviar-lo; si no, escriu un text adequat al nivell, sense dades inventades que semblen reals. Després inclou: vocabulari clau amb definicions breus i preguntes en tres blocs, amb el mateix nombre en cadascun: literals (informació que diu el text), inferencials (relacionar idees i deduir) i crítiques (opinar amb arguments i connectar amb el món de l’alumnat). Marca el nivell de cada pregunta i, en un apartat separat, dona al docent les respostes esperades i què cal valorar en les respostes obertes.`
          : `Prepara una actividad de lectura comprensiva graduada sobre ${topic}. Si se aporta un texto de partida, úsalo tal cual, sin cambiarlo; si no, escribe un texto adecuado al nivel, sin datos inventados que parezcan reales. Después añade: vocabulario clave con definiciones breves y preguntas en tres bloques, con el mismo número en cada uno: literales (información que dice el texto), inferenciales (relacionar ideas y deducir) y críticas (opinar con argumentos y conectar con el mundo del alumnado). Marca el nivel de cada pregunta y, en un apartado aparte, da al docente las respuestas esperadas y qué valorar en las respuestas abiertas.`,
    'ethical-dilemma': () =>
      language === 'en'
        ? `Create three age-appropriate ethical dilemmas about ${topic}. Each should put two worthwhile values in tension, include perspectives from different stakeholders, and end with open questions rather than a single correct answer.`
        : catalan
          ? `Crea tres dilemes ètics adequats al nivell sobre ${topic}. Cadascun ha d’enfrontar dos valors legítims, incloure perspectives de diferents persones implicades i acabar amb preguntes obertes, sense una única resposta correcta.`
          : `Crea tres dilemas éticos adecuados al nivel sobre ${topic}. Cada uno debe enfrentar dos valores legítimos, incluir perspectivas de distintas personas implicadas y terminar con preguntas abiertas, sin una única respuesta correcta.`,
    'study-plan': () =>
      language === 'en'
        ? `Create a realistic study plan for ${topic}. Use the available time and constraints in the context, alternate focused study with breaks and retrieval practice, and include a flexible catch-up block.`
        : catalan
          ? `Crea un pla d’estudi realista per a ${topic}. Tingues en compte el temps disponible i les condicions del context, alterna estudi concentrat, descansos i pràctica de recuperació, i inclou un bloc flexible per als imprevistos.`
          : `Crea un plan de estudio realista para ${topic}. Ten en cuenta el tiempo disponible y las condiciones del contexto, alterna estudio concentrado, descansos y práctica de recuperación, e incluye un bloque flexible para imprevistos.`,
    'historical-interview': () =>
      `${language === 'en' ? `Role-play an interview with ${topic}. Answer in first person while distinguishing well-established facts from uncertainty; do not invent quotations or claim access to private thoughts. Invite the learner to ask the first question.` : catalan ? `Interpreta una entrevista amb ${topic}. Respon en primera persona i diferencia els fets ben establerts de les incerteses; no inventes cites ni atribueixes pensaments privats. Convida l’estudiant a fer la primera pregunta.` : `Interpreta una entrevista con ${topic}. Responde en primera persona y distingue los hechos bien establecidos de las incertidumbres; no inventes citas ni atribuyas pensamientos privados. Invita al estudiante a hacer la primera pregunta.`}${value('task') ? ` ${value('task')}` : ''}`,
    'coding-activity': () => codingActivityTask(language, topic, value),
    'illustrated-worksheet': () => illustratedWorksheetTask(language, topic, value, raw),
    'profile-adaptation': () => profileAdaptationTask(language, value, raw),
    'school-document': () => schoolDocumentTask(language, value, raw),
    'code-coach': () =>
      `${language === 'en' ? `Review the code below for ${topic}. Explain the first issue and give a hint before showing a correction; adapt the explanation to the learner’s level.` : catalan ? `Revisa el codi següent sobre ${topic}. Explica el primer problema i dona una pista abans de mostrar-ne la correcció; adapta l’explicació al nivell de l’estudiant.` : `Revisa el código siguiente sobre ${topic}. Explica el primer problema y ofrece una pista antes de mostrar una corrección; adapta la explicación al nivel del estudiante.`}${value('task') ? ` ${value('task')}` : ''}`,
    'editable-latex': () => editableLatexTask(language, topic, value),
  }

  return (taskBuilders[templateId] || (() => value('task') || `${d.design} ${topic}.`))()
}
