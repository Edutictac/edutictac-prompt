import type { Language } from '../../types'

// Encargo de la plantilla «Adaptación para un perfil concreto». Cada perfil
// añade orientaciones concretas de aula; el resto del encargo es común para no
// convertir la herramienta en un listado de diagnósticos.
type ValueReader = (key: string) => string

const profileGuidance: Record<Language, Record<string, string>> = {
  es: {
    TDAH: 'Divide la tarea en pasos cortos y numerados, con una sola instrucción por paso y un ejemplo resuelto al inicio. Indica por escrito qué hay que entregar y cuándo, apoya la secuencia con un guion visual y permite pausas breves de movimiento. Prioriza la calidad sobre la cantidad y evita consignas largas con varias órdenes encadenadas.',
    Dislexia:
      'Cuida la presentación: letra grande sin serifa, interlineado amplio y texto alineado a la izquierda, sin justificar. Evita copiar de la pizarra y ofrece el enunciado por escrito o en audio. No penalices la ortografía cuando no sea el aprendizaje evaluado, da más tiempo y admite responder con esquemas, dictado o de forma oral.',
    'TEA (autismo)':
      'Anticipa la secuencia con un guion visual o escrito (qué se hace, en qué orden, cuánto dura y qué pasa después) y anuncia los cambios con antelación. Usa instrucciones literales y concretas, evita dobles sentidos, ironías y consignas abiertas sin ejemplo, y define con claridad cuándo se considera terminada la tarea.',
    'Altas capacidades':
      'Aumenta la profundidad, no el volumen: retos abiertos, preguntas de análisis y evaluación, conexiones con otros ámbitos y una pequeña investigación o creación propia. Admite más de una solución válida, pide justificación y evita que el trabajo extra se convierta en castigo o en más ejercicios iguales.',
    'Desconocimiento de la lengua vehicular':
      'Prioriza el vocabulario clave con apoyo visual y un glosario bilingüe; escribe las instrucciones en frases cortas con un ejemplo y permite apoyarse en la lengua materna para comprender o planificar. Da más tiempo, valora el contenido por encima de la forma y no confundas dificultad lingüística con falta de capacidad.',
    'Discapacidad visual':
      'Entrega el material en formato accesible (texto digital navegable, letra ampliada o braille, según el caso) y describe verbalmente imágenes, esquemas, tablas y vídeos. Evita la información que dependa solo del color o de la posición y comprueba que las actividades manipulativas o digitales se pueden realizar sin ver la pantalla.',
    'Discapacidad auditiva':
      'Acompaña toda la información oral con apoyo escrito o visual (instrucciones, vocabulario clave, subtítulos y transcripción de vídeos) y asegura que el alumnado ve la cara y la boca de quien habla. Revisa que los vídeos tengan subtítulos y que las actividades en grupo no dependan solo de escuchar.',
    'Dificultades de regulación del comportamiento':
      'Anticipa las transiciones y las normas con apoyos visuales, ofrece opciones cerradas y una señal o un espacio acordado para pedir una pausa. Refuerza los avances de forma concreta e inmediata, separa la conducta de la persona y evita exponer al alumnado delante del grupo.',
  },
  'ca-valencia': {
    TDAH: 'Dividix la tasca en passos curts i numerats, amb una sola instrucció per pas i un exemple resolt a l’inici. Indica per escrit què cal entregar i quan, recolza la seqüència amb un guió visual i permet pauses breus de moviment. Prioritza la qualitat sobre la quantitat i evita consignes llargues amb diverses ordes encadenades.',
    Dislexia:
      'Cuida la presentació: lletra gran sense serifa, interlineat ampli i text alineat a l’esquerra, sense justificar. Evita copiar de la pissarra i oferix l’enunciat per escrit o en àudio. No penalitzes l’ortografia quan no siga l’aprenentatge avaluat, dona més temps i admet respondre amb esquemes, dictat o de manera oral.',
    'TEA (autismo)':
      'Anticipa la seqüència amb un guió visual o escrit (què es fa, en quin ordre, quant dura i què passa després) i anuncia els canvis amb antelació. Usa instruccions literals i concretes, evita dobles sentits, ironies i consignes obertes sense exemple, i definix amb claredat quan es considera acabada la tasca.',
    'Altas capacidades':
      'Augmenta la profunditat, no el volum: reptes oberts, preguntes d’anàlisi i avaluació, connexions amb altres àmbits i una xicoteta investigació o creació pròpia. Admet més d’una solució vàlida, demana justificació i evita que el treball extra es convertisca en càstig o en més exercicis iguals.',
    'Desconocimiento de la lengua vehicular':
      'Prioritza el vocabulari clau amb suport visual i un glossari bilingüe; escriu les instruccions en frases curtes amb un exemple i permet recolzar-se en la llengua materna per a comprendre o planificar. Dona més temps, valora el contingut per damunt de la forma i no confongues dificultat lingüística amb falta de capacitat.',
    'Discapacidad visual':
      'Entrega el material en format accessible (text digital navegable, lletra ampliada o braille, segons el cas) i descriu verbalment imatges, esquemes, taules i vídeos. Evita la informació que depenga només del color o de la posició i comprova que les activitats manipulatives o digitals es poden fer sense vore la pantalla.',
    'Discapacidad auditiva':
      'Acompanya tota la informació oral amb suport escrit o visual (instruccions, vocabulari clau, subtítols i transcripció de vídeos) i assegura que l’alumnat veu la cara i la boca de qui parla. Revisa que els vídeos tinguen subtítols i que les activitats en grup no depenguen només d’escoltar.',
    'Dificultades de regulación del comportamiento':
      'Anticipa les transicions i les normes amb suports visuals, oferix opcions tancades i una senyal o un espai acordat per a demanar una pausa. Reforça els avanços de manera concreta i immediata, separa la conducta de la persona i evita exposar l’alumnat davant del grup.',
  },
  ca: {
    TDAH: 'Divideix la tasca en passos curts i numerats, amb una sola instrucció per pas i un exemple resolt a l’inici. Indica per escrit què cal lliurar i quan, recolza la seqüència amb un guió visual i permet pauses breus de moviment. Prioritza la qualitat sobre la quantitat i evita consignes llargues amb diverses ordres encadenades.',
    Dislexia:
      'Cuida la presentació: lletra gran sense serifa, interlineat ampli i text alineat a l’esquerra, sense justificar. Evita copiar de la pissarra i ofereix l’enunciat per escrit o en àudio. No penalitzis l’ortografia quan no sigui l’aprenentatge avaluat, dona més temps i admet respondre amb esquemes, dictat o de manera oral.',
    'TEA (autismo)':
      'Anticipa la seqüència amb un guió visual o escrit (què es fa, en quin ordre, quant dura i què passa després) i anuncia els canvis amb antelació. Fes servir instruccions literals i concretes, evita dobles sentits, ironies i consignes obertes sense exemple, i defineix amb claredat quan es considera acabada la tasca.',
    'Altas capacidades':
      'Augmenta la profunditat, no el volum: reptes oberts, preguntes d’anàlisi i avaluació, connexions amb altres àmbits i una petita recerca o creació pròpia. Admet més d’una solució vàlida, demana justificació i evita que el treball extra es converteixi en càstig o en més exercicis iguals.',
    'Desconocimiento de la lengua vehicular':
      'Prioritza el vocabulari clau amb suport visual i un glossari bilingüe; escriu les instruccions en frases curtes amb un exemple i permet recolzar-se en la llengua materna per comprendre o planificar. Dona més temps, valora el contingut per damunt de la forma i no confonguis dificultat lingüística amb falta de capacitat.',
    'Discapacidad visual':
      'Lliura el material en format accessible (text digital navegable, lletra ampliada o braille, segons el cas) i descriu verbalment imatges, esquemes, taules i vídeos. Evita la informació que depengui només del color o de la posició i comprova que les activitats manipulatives o digitals es poden fer sense veure la pantalla.',
    'Discapacidad auditiva':
      'Acompanya tota la informació oral amb suport escrit o visual (instruccions, vocabulari clau, subtítols i transcripció de vídeos) i assegura que l’alumnat veu la cara i la boca de qui parla. Revisa que els vídeos tinguin subtítols i que les activitats en grup no depenguin només d’escoltar.',
    'Dificultades de regulación del comportamiento':
      'Anticipa les transicions i les normes amb suports visuals, ofereix opcions tancades i un senyal o un espai acordat per demanar una pausa. Reforça els avenços de manera concreta i immediata, separa la conducta de la persona i evita exposar l’alumnat davant del grup.',
  },
  en: {
    TDAH: 'Break the task into short, numbered steps, with one instruction per step and a worked example at the start. State in writing what must be handed in and when, support the sequence with a visual script and allow brief movement breaks. Prioritise quality over quantity and avoid long instructions with several chained commands.',
    Dislexia:
      'Take care with presentation: large sans-serif type, generous line spacing and left-aligned text, never justified. Avoid copying from the board and provide the task in writing or as audio. Do not penalise spelling when it is not the learning being assessed, allow more time and accept diagrams, dictation or oral answers.',
    'TEA (autismo)':
      'Anticipate the sequence with a visual or written script (what happens, in what order, how long it takes and what comes next) and announce changes in advance. Use literal, concrete instructions, avoid double meanings, irony and open prompts without an example, and define clearly when the task is finished.',
    'Altas capacidades':
      'Increase depth, not volume: open challenges, analysis and evaluation questions, links to other areas and a small investigation or original creation. Accept more than one valid solution, ask for justification and do not let extra work become a punishment or more of the same exercises.',
    'Desconocimiento de la lengua vehicular':
      'Prioritise key vocabulary with visual support and a bilingual glossary; write instructions in short sentences with an example and allow the learner to use their first language to understand or plan. Allow more time, value content over form and do not confuse language difficulty with lack of ability.',
    'Discapacidad visual':
      'Provide the material in an accessible format (navigable digital text, enlarged print or braille, as appropriate) and describe images, diagrams, tables and videos orally. Avoid information that relies only on colour or position and check that hands-on or digital activities can be done without looking at the screen.',
    'Discapacidad auditiva':
      'Support all oral information with written or visual aids (instructions, key vocabulary, subtitles and video transcripts) and make sure the learner can see the speaker’s face and mouth. Check that videos have subtitles and that group activities do not rely on listening alone.',
    'Dificultades de regulación del comportamiento':
      'Anticipate transitions and rules with visual supports, offer closed choices and an agreed signal or space to ask for a pause. Reinforce progress concretely and immediately, separate the behaviour from the person and avoid exposing the learner in front of the group.',
  },
}

const taskLabels: Record<Language, string> = {
  es: 'Tarea de partida',
  'ca-valencia': 'Tasca de partida',
  ca: 'Tasca de partida',
  en: 'Starting task',
}

const tasks: Record<
  Language,
  (taskBlock: string, level: string, subject: string, profile: string, note: string) => string
> = {
  es: (taskBlock, level, subject, profile, note) =>
    `Adapta esta tarea para un estudiante de ${level}${subject ? ` de ${subject}` : ''} con este perfil: ${profile}.${note ? ` ${note}` : ''}

Mantén el objetivo de aprendizaje y el nivel de exigencia: se adapta la forma de acceder, comprender, organizar y demostrar lo aprendido, no el objetivo. Ten en cuenta las fortalezas, intereses y apoyos que ya funcionan si se han indicado. Entrega:
1. La versión adaptada de la tarea, con el enunciado listo para dar al alumnado y los mismos aprendizajes esperados.
2. Ajustes concretos por bloques: acceso a la información; comprensión y organización; expresión y respuesta; tiempo, espacio y materiales; evaluación.
3. Una tabla breve con qué se mantiene igual, qué cambia y por qué.
4. Materiales y apoyos necesarios, viables en el aula ordinaria y con los recursos disponibles.
5. Cómo comprobar el progreso sin bajar la exigencia, con indicadores observables.
6. Errores frecuentes al aplicar estos ajustes con este perfil y cómo evitarlos.${taskBlock}

No etiquetes ni diagnostiques al alumnado, no hagas suposiciones y usa solo la información aportada; si falta un dato necesario, pregúntalo. No menciones diagnósticos en el material que vaya a leer el alumnado.`,
  'ca-valencia': (taskBlock, level, subject, profile, note) =>
    `Adapta esta tasca per a un estudiant de ${level}${subject ? ` de ${subject}` : ''} amb este perfil: ${profile}.${note ? ` ${note}` : ''}

Mantín l’objectiu d’aprenentatge i el nivell d’exigència: s’adapta la manera d’accedir, comprendre, organitzar i demostrar el que s’ha aprés, no l’objectiu. Tingues en compte les fortaleses, interessos i suports que ja funcionen si s’han indicat. Entrega:
1. La versió adaptada de la tasca, amb l’enunciat llest per a donar a l’alumnat i els mateixos aprenentatges esperats.
2. Ajustos concrets per blocs: accés a la informació; comprensió i organització; expressió i resposta; temps, espai i materials; avaluació.
3. Una taula breu amb què es manté igual, què canvia i per què.
4. Materials i suports necessaris, viables a l’aula ordinària i amb els recursos disponibles.
5. Com comprovar el progrés sense baixar l’exigència, amb indicadors observables.
6. Errors freqüents en aplicar estos ajustos amb este perfil i com evitar-los.${taskBlock}

No etiquetes ni diagnostiques l’alumnat, no faces suposicions i usa només la informació aportada; si falta una dada necessària, pregunta-la. No menciones diagnòstics en el material que haja de llegir l’alumnat.`,
  ca: (taskBlock, level, subject, profile, note) =>
    `Adapta aquesta tasca per a un estudiant de ${level}${subject ? ` de ${subject}` : ''} amb aquest perfil: ${profile}.${note ? ` ${note}` : ''}

Mantén l’objectiu d’aprenentatge i el nivell d’exigència: s’adapta la manera d’accedir, comprendre, organitzar i demostrar el que s’ha après, no l’objectiu. Tingues en compte les fortaleses, interessos i suports que ja funcionen si s’han indicat. Entrega:
1. La versió adaptada de la tasca, amb l’enunciat a punt per donar a l’alumnat i els mateixos aprenentatges esperats.
2. Ajustos concrets per blocs: accés a la informació; comprensió i organització; expressió i resposta; temps, espai i materials; avaluació.
3. Una taula breu amb què es manté igual, què canvia i per què.
4. Materials i suports necessaris, viables a l’aula ordinària i amb els recursos disponibles.
5. Com comprovar el progrés sense baixar l’exigència, amb indicadors observables.
6. Errors freqüents en aplicar aquests ajustos amb aquest perfil i com evitar-los.${taskBlock}

No etiquetis ni diagnostiquis l’alumnat, no facis suposicions i fes servir només la informació aportada; si falta una dada necessària, pregunta-la. No esmentis diagnòstics en el material que hagi de llegir l’alumnat.`,
  en: (taskBlock, level, subject, profile, note) =>
    `Adapt this task for a student in ${level}${subject ? ` in ${subject}` : ''} with this profile: ${profile}.${note ? ` ${note}` : ''}

Keep the learning objective and the level of demand: what changes is how the learner accesses, understands, organises and shows what they have learned, not the objective. Take into account the strengths, interests and supports that already work if any are given. Deliver:
1. The adapted version of the task, with the instructions ready to give to the learner and the same expected learning.
2. Concrete adjustments by area: access to information; understanding and organisation; expression and response; time, space and materials; assessment.
3. A short table showing what stays the same, what changes and why.
4. The materials and supports needed, feasible in an ordinary classroom with the available resources.
5. How to check progress without lowering the demand, using observable indicators.
6. Common mistakes when applying these adjustments with this profile and how to avoid them.${taskBlock}

Do not label or diagnose the learner, do not make assumptions and use only the information provided; if a necessary detail is missing, ask for it. Do not mention diagnoses in the material the learner will read.`,
}

export const profileNote = (language: Language, option: string): string => profileGuidance[language][option] || ''

export function profileAdaptationTask(
  language: Language,
  value: ValueReader,
  raw: Record<string, string> = {},
): string {
  const profile = value('profile')
  const note = profileNote(language, raw.profile || '')
  const taskBlock = value('task') ? `\n\n${taskLabels[language]}: ${value('task')}` : ''
  return tasks[language](taskBlock, value('level'), value('subject'), profile, note)
}
