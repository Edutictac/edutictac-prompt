import type { Language, PromptTemplate } from '../../types'

const instructions: Record<Language, Record<string, string>> = {
  es: {
    lessonOpening:
      'Propón dos o tres inicios breves para la clase, con una pregunta, situación cercana o demostración sencilla. Indica duración, materiales y conexión con el objetivo; respeta el tiempo total disponible y ofrece alternativas accesibles.',
    priorKnowledge:
      'Identifica conocimientos y habilidades previas relevantes, distinguiendo las hipótesis de los datos aportados. Propón dos o tres formas breves y accesibles de explorarlos al inicio y cómo ajustar la enseñanza con lo observado, sin etiquetar al alumnado.',
    peerAssessment:
      'Prepara el instrumento para la coevaluación: usa criterios y descriptores observables comprensibles para el alumnado, e incorpora pautas breves para ofrecer comentarios constructivos basados en evidencias. El profesorado conserva la decisión de evaluación.',
    guidedQuestions:
      'Antes de generar, comprueba qué información esencial falta. Si falta alguna, formula unas pocas preguntas breves, sin repetir datos ya aportados, y espera la respuesta. Si no falta ninguna, genera directamente.',
  },
  'ca-valencia': {
    lessonOpening:
      'Proposa dos o tres inicis breus per a la classe, amb una pregunta, situació pròxima o demostració senzilla. Indica duració, materials i connexió amb l’objectiu; respecta el temps total disponible i oferix alternatives accessibles.',
    priorKnowledge:
      'Identifica coneixements i habilitats previs rellevants, distingint les hipòtesis de les dades aportades. Proposa dos o tres formes breus i accessibles d’explorar-los a l’inici i com ajustar l’ensenyament segons el que s’observe, sense etiquetar l’alumnat.',
    peerAssessment:
      'Prepara l’instrument per a la coavaluació: usa criteris i descriptors observables comprensibles per a l’alumnat i incorpora pautes breus per a oferir comentaris constructius basats en evidències. El professorat conserva la decisió d’avaluació.',
    guidedQuestions:
      'Abans de generar, comprova quina informació essencial falta. Si en falta, formula unes poques preguntes breus, sense repetir dades ja aportades, i espera la resposta. Si no en falta cap, genera directament.',
  },
  ca: {
    lessonOpening:
      'Proposa dos o tres inicis breus per a la classe, amb una pregunta, situació propera o demostració senzilla. Indica durada, materials i connexió amb l’objectiu; respecta el temps total disponible i ofereix alternatives accessibles.',
    priorKnowledge:
      'Identifica coneixements i habilitats previs rellevants, distingint les hipòtesis de les dades aportades. Proposa dues o tres formes breus i accessibles d’explorar-los a l’inici i com ajustar l’ensenyament segons el que s’observi, sense etiquetar l’alumnat.',
    peerAssessment:
      'Prepara l’instrument per a la coavaluació: usa criteris i descriptors observables comprensibles per a l’alumnat i incorpora pautes breus per oferir comentaris constructius basats en evidències. El professorat conserva la decisió d’avaluació.',
    guidedQuestions:
      'Abans de generar, comprova quina informació essencial falta. Si en falta, formula unes poques preguntes breus, sense repetir dades ja aportades, i espera la resposta. Si no en falta cap, genera directament.',
  },
  en: {
    lessonOpening:
      'Suggest two or three brief lesson openings using a question, relatable situation or simple demonstration. State the duration, materials and connection to the objective; respect the total available time and offer accessible alternatives.',
    priorKnowledge:
      'Identify relevant prior knowledge and skills, distinguishing assumptions from supplied information. Suggest two or three brief accessible ways to explore them at the start and how to adjust teaching based on what is observed, without labelling learners.',
    peerAssessment:
      'Prepare the instrument for peer assessment: use observable criteria and descriptors that learners can understand, and include brief guidance for constructive feedback based on evidence. The teacher retains the assessment decision.',
    guidedQuestions:
      'Before generating, check which essential information is missing. If any is missing, ask a few brief questions without repeating information already supplied and wait for the answers. Otherwise generate directly.',
  },
}

export function educationalOptions(
  template: PromptTemplate,
  values: Record<string, string>,
  language: Language,
): string[] {
  return Object.entries(instructions[language])
    .filter(([key]) => values[key] === 'Sí' && template.fields.some((field) => field.id === key))
    .map(([, instruction]) => instruction)
}

const csvPeerAssessment: Record<Language, string> = {
  es: 'Para la coevaluación usa descriptores observables comprensibles para el alumnado y que faciliten comentarios constructivos basados en evidencias. El profesorado conserva la decisión de evaluación. Mantén el CSV sin explicaciones adicionales.',
  'ca-valencia':
    'Per a la coavaluació usa descriptors observables comprensibles per a l’alumnat que faciliten comentaris constructius basats en evidències. El professorat conserva la decisió d’avaluació. Mantín el CSV sense explicacions addicionals.',
  ca: 'Per a la coavaluació usa descriptors observables comprensibles per a l’alumnat que facilitin comentaris constructius basats en evidències. El professorat conserva la decisió d’avaluació. Mantén el CSV sense explicacions addicionals.',
  en: 'For peer assessment use observable descriptors learners can understand that support constructive evidence-based feedback. The teacher retains the assessment decision. Keep the CSV free of additional explanations.',
}

export function csvEducationalOptions(
  template: PromptTemplate,
  values: Record<string, string>,
  language: Language,
): string[] {
  return educationalOptions(template, values, language).map((instruction) =>
    instruction === instructions[language].peerAssessment ? csvPeerAssessment[language] : instruction,
  )
}
