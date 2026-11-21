import type { Language } from '../../types'

// Encargo de la plantilla «Documentos del centro». Cada tipo de documento tiene
// su estructura propia; el cierre común evita inventar datos y deja huecos
// visibles para lo que deba completar el docente.
type ValueReader = (key: string) => string

const briefs: Record<Language, Record<string, string>> = {
  es: {
    'Acta de reunión':
      'Redacta un acta formal con: datos de identificación (centro, órgano, fecha, hora y lugar), asistentes y ausencias, orden del día, desarrollo de cada punto y acuerdos numerados con responsable y plazo, y cierre con la firma de quien preside y de quien actúa como secretario o secretaria. Usa un tono administrativo claro y no inventes asistentes, acuerdos, fechas ni votaciones.',
    'Memoria de actividad':
      'Redacta una memoria con: datos de identificación, justificación curricular, objetivos, descripción y desarrollo, participación, recursos utilizados, valoración con evidencias y propuestas de mejora. Extensión máxima de dos páginas salvo que se indique otra cosa.',
    'Informe de seguimiento del alumnado':
      'Redacta un informe de seguimiento con: datos de identificación, situación de partida, medidas y apoyos adoptados, evolución observada con evidencias y fechas, dificultades persistentes, valoración y propuestas para el próximo periodo, y coordinación con la familia y con orientación. Usa lenguaje técnico y respetuoso, sin etiquetas estigmatizadoras ni diagnósticos que no consten en los datos.',
    'Plan de refuerzo o recuperación':
      'Redacta un plan de refuerzo o recuperación con: dificultades detectadas, objetivos de recuperación, contenidos, actividades y recursos, calendario semanal, criterios e instrumentos de evaluación, y seguimiento y comunicación con la familia. Los objetivos deben ser pocos, concretos y medibles.',
    'Solicitud o propuesta a dirección':
      'Redacta una propuesta para el equipo directivo con: justificación pedagógica, descripción de la propuesta, objetivos, recursos necesarios con coste estimado, beneficios esperados, calendario y responsables, e indicadores para evaluarla. Debe ser persuasiva y realista; no inventes precios, normativa ni compromisos.',
    'Respuesta a una reclamación':
      'Redacta una respuesta formal que: acuse recibo, exponga los hechos y los criterios aplicados con las evidencias disponibles, motive la resolución, indique los pasos siguientes y las vías de recurso con sus plazos, y mantenga un tono respetuoso y firme. No prometas nada que no esté en los datos y señala lo que debe confirmar la dirección.',
  },
  'ca-valencia': {
    'Acta de reunión':
      'Redacta una acta formal amb: dades d’identificació (centre, òrgan, data, hora i lloc), assistents i absències, orde del dia, desenrotllament de cada punt i acords numerats amb responsable i termini, i tancament amb la firma de qui presidix i de qui actua com a secretari o secretària. Usa un to administratiu clar i no inventes assistents, acords, dates ni votacions.',
    'Memoria de actividad':
      'Redacta una memòria amb: dades d’identificació, justificació curricular, objectius, descripció i desenrotllament, participació, recursos utilitzats, valoració amb evidències i propostes de millora. Extensió màxima de dos pàgines llevat que s’indique una altra cosa.',
    'Informe de seguimiento del alumnado':
      'Redacta un informe de seguiment amb: dades d’identificació, situació de partida, mesures i suports adoptats, evolució observada amb evidències i dates, dificultats persistents, valoració i propostes per al pròxim període, i coordinació amb la família i amb orientació. Usa llenguatge tècnic i respectuós, sense etiquetes estigmatitzadores ni diagnòstics que no consten en les dades.',
    'Plan de refuerzo o recuperación':
      'Redacta un pla de reforç o recuperació amb: dificultats detectades, objectius de recuperació, continguts, activitats i recursos, calendari setmanal, criteris i instruments d’avaluació, i seguiment i comunicació amb la família. Els objectius han de ser pocs, concrets i mesurables.',
    'Solicitud o propuesta a dirección':
      'Redacta una proposta per a l’equip directiu amb: justificació pedagògica, descripció de la proposta, objectius, recursos necessaris amb cost estimat, beneficis esperats, calendari i responsables, i indicadors per a avaluar-la. Ha de ser persuasiva i realista; no inventes preus, normativa ni compromisos.',
    'Respuesta a una reclamación':
      'Redacta una resposta formal que: acuse recepció, expose els fets i els criteris aplicats amb les evidències disponibles, motive la resolució, indique els passos següents i les vies de recurs amb els seus terminis, i mantinga un to respectuós i ferm. No prometgues res que no estiga en les dades i assenyala què ha de confirmar la direcció.',
  },
  ca: {
    'Acta de reunión':
      'Redacta una acta formal amb: dades d’identificació (centre, òrgan, data, hora i lloc), assistents i absències, ordre del dia, desenvolupament de cada punt i acords numerats amb responsable i termini, i tancament amb la signatura de qui presideix i de qui actua com a secretari o secretària. Fes servir un to administratiu clar i no inventis assistents, acords, dates ni votacions.',
    'Memoria de actividad':
      'Redacta una memòria amb: dades d’identificació, justificació curricular, objectius, descripció i desenvolupament, participació, recursos utilitzats, valoració amb evidències i propostes de millora. Extensió màxima de dues pàgines llevat que s’indiqui una altra cosa.',
    'Informe de seguimiento del alumnado':
      'Redacta un informe de seguiment amb: dades d’identificació, situació de partida, mesures i suports adoptats, evolució observada amb evidències i dates, dificultats persistents, valoració i propostes per al proper període, i coordinació amb la família i amb orientació. Fes servir llenguatge tècnic i respectuós, sense etiquetes estigmatitzadores ni diagnòstics que no constin en les dades.',
    'Plan de refuerzo o recuperación':
      'Redacta un pla de reforç o recuperació amb: dificultats detectades, objectius de recuperació, continguts, activitats i recursos, calendari setmanal, criteris i instruments d’avaluació, i seguiment i comunicació amb la família. Els objectius han de ser pocs, concrets i mesurables.',
    'Solicitud o propuesta a dirección':
      'Redacta una proposta per a l’equip directiu amb: justificació pedagògica, descripció de la proposta, objectius, recursos necessaris amb cost estimat, beneficis esperats, calendari i responsables, i indicadors per avaluar-la. Ha de ser persuasiva i realista; no inventis preus, normativa ni compromisos.',
    'Respuesta a una reclamación':
      'Redacta una resposta formal que: acusi recepció, exposi els fets i els criteris aplicats amb les evidències disponibles, motivi la resolució, indiqui els passos següents i les vies de recurs amb els seus terminis, i mantingui un to respectuós i ferm. No prometis res que no sigui a les dades i assenyala què ha de confirmar la direcció.',
  },
  en: {
    'Acta de reunión':
      'Write formal minutes with: identification details (school, body, date, time and place), attendees and absences, agenda, discussion of each item, numbered agreements with an owner and a deadline, and a closing section signed by the chair and the secretary. Use a clear administrative tone and do not invent attendees, agreements, dates or votes.',
    'Memoria de actividad':
      'Write a report with: identification details, curricular rationale, objectives, description and delivery, participation, resources used, an evaluation with evidence and improvement proposals. Maximum two pages unless stated otherwise.',
    'Informe de seguimiento del alumnado':
      'Write a progress report with: identification details, starting point, measures and supports adopted, observed progress with evidence and dates, persistent difficulties, an assessment and proposals for the next period, and coordination with the family and the guidance team. Use professional, respectful language, without stigmatising labels or diagnoses that are not in the data.',
    'Plan de refuerzo o recuperación':
      'Write a support or recovery plan with: difficulties identified, recovery objectives, content, activities and resources, a weekly schedule, assessment criteria and instruments, and follow-up and communication with the family. Objectives should be few, concrete and measurable.',
    'Solicitud o propuesta a dirección':
      'Write a proposal for the leadership team with: pedagogical rationale, description of the proposal, objectives, resources needed with an estimated cost, expected benefits, schedule and owners, and indicators to evaluate it. It should be persuasive and realistic; do not invent prices, regulations or commitments.',
    'Respuesta a una reclamación':
      'Write a formal reply that: acknowledges receipt, sets out the facts and the criteria applied with the available evidence, gives reasons for the decision, states the next steps and the appeal routes with their deadlines, and keeps a respectful but firm tone. Do not promise anything that is not in the data and point out what the leadership team must confirm.',
  },
}

const openings: Record<Language, (type: string) => string> = {
  es: (type) => `Redacta este documento: ${type}.`,
  'ca-valencia': (type) => `Redacta este document: ${type}.`,
  ca: (type) => `Redacta aquest document: ${type}.`,
  en: (type) => `Write this document: ${type}.`,
}

const closings: Record<Language, string> = {
  es: 'Usa solo la información de los apartados de contexto y de datos y notas. Redacta el documento completo, listo para revisar y firmar. Si falta un dato imprescindible, pregúntalo antes de redactar o deja un hueco marcado con [ ]. No inventes nombres, fechas, normativa, acuerdos ni datos del alumnado, y no incluyas información personal que no se haya facilitado.',
  'ca-valencia':
    'Usa només la informació dels apartats de context i de dades i notes. Redacta el document complet, llest per a revisar i firmar. Si falta una dada imprescindible, pregunta-la abans de redactar o deixa un buit marcat amb [ ]. No inventes noms, dates, normativa, acords ni dades de l’alumnat, i no inclogues informació personal que no s’haja facilitat.',
  ca: 'Fes servir només la informació dels apartats de context i de dades i notes. Redacta el document complet, a punt per revisar i signar. Si falta una dada imprescindible, pregunta-la abans de redactar o deixa un buit marcat amb [ ]. No inventis noms, dates, normativa, acords ni dades de l’alumnat, i no incloguis informació personal que no s’hagi facilitat.',
  en: 'Use only the information in the context and facts and notes sections. Write the complete document, ready to review and sign. If an essential detail is missing, ask for it before writing or leave a gap marked with [ ]. Do not invent names, dates, regulations, agreements or student data, and do not include personal information that has not been provided.',
}

export const documentBrief = (language: Language, option: string): string => briefs[language][option] || ''

export function schoolDocumentTask(language: Language, value: ValueReader, raw: Record<string, string> = {}): string {
  const type = value('documentType')
  const brief = documentBrief(language, raw.documentType || '')
  return [openings[language](type), brief, closings[language]].filter(Boolean).join('\n\n')
}
