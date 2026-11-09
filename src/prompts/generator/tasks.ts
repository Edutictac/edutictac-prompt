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
}): string {
  const catalan = language === 'ca' || language === 'ca-valencia'
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
    'udl-review': () => u.review,
    'udl-matrix': () => `${u.matrix} ${topic}. ${u.matrixFormat}`,
    'student-tutor': () =>
      value('task') ||
      (language === 'en'
        ? `Help the learner understand ${topic}. Ask one question at a time, adapt to each answer, offer hints rather than the solution, and end with a brief reflection.`
        : catalan
          ? `Ajuda l’estudiant a comprendre ${topic}. Fes una pregunta cada vegada, adapta el diàleg a cada resposta, ofereix pistes en lloc de donar la solució i acaba amb una breu reflexió.`
          : `Ayuda al estudiante a comprender ${topic}. Haz una pregunta cada vez, adapta el diálogo a cada respuesta, ofrece pistas en lugar de dar la solución y termina con una breve reflexión.`),
    analogies: () =>
      value('task') ||
      (language === 'en'
        ? `Suggest five accurate, varied analogies to explain ${topic}. Connect them to learners’ everyday interests, explain what each analogy clarifies, and state where it stops being accurate.`
        : catalan
          ? `Proposa cinc analogies variades i rigoroses per explicar ${topic}. Relaciona-les amb interessos quotidians de l’alumnat, explica què aclareix cadascuna i indica on deixa de ser vàlida.`
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
    'code-coach': () =>
      `${language === 'en' ? `Review the code below for ${topic}. Explain the first issue and give a hint before showing a correction; adapt the explanation to the learner’s level.` : catalan ? `Revisa el codi següent sobre ${topic}. Explica el primer problema i ofereix una pista abans de mostrar-ne la correcció; adapta l’explicació al nivell de l’estudiant.` : `Revisa el código siguiente sobre ${topic}. Explica el primer problema y ofrece una pista antes de mostrar una corrección; adapta la explicación al nivel del estudiante.`}${value('task') ? ` ${value('task')}` : ''}`,
  }

  return (taskBuilders[templateId] || (() => value('task') || `${d.design} ${topic}.`))()
}
