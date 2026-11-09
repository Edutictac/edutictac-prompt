import type { Language } from '../../types'
import type { DefaultTexts } from './texts'

const commTemplates = new Set(['family-note', 'tutoring-script', 'conflict-mediation'])

export function buildRoleDefault(
  templateId: string,
  language: Language,
  value: (key: string) => string,
  d: DefaultTexts,
  level: string,
): string {
  const catalan = language === 'ca' || language === 'ca-valencia'
  return templateId === 'student-tutor'
    ? language === 'en'
      ? `Act as a patient, Socratic tutor${value('subject') ? ` in ${value('subject')}` : ''}.`
      : catalan
        ? `Actua com a tutor/a pacient i socràtic/a${value('subject') ? ` de ${value('subject')}` : ''}.`
        : `Actúa como tutor/a paciente y socrático/a${value('subject') ? ` de ${value('subject')}` : ''}.`
    : templateId === 'historical-interview'
      ? language === 'en'
        ? `Role-play as the historical figure requested${value('subject') ? ` in ${value('subject')}` : ''}, grounded in verified facts.`
        : catalan
          ? `Interpreta el personatge històric indicat${value('subject') ? ` de ${value('subject')}` : ''} basant-te en fets verificables.`
          : `Interpreta al personaje histórico indicado${value('subject') ? ` de ${value('subject')}` : ''} basándote en hechos verificables.`
      : templateId === 'code-coach'
        ? language === 'en'
          ? `Act as a programming teacher${value('subject') ? ` for ${value('subject')}` : ''} who helps the learner debug independently.`
          : catalan
            ? `Actua com a docent de programació${value('subject') ? ` de ${value('subject')}` : ''} i ajuda l’estudiant a depurar per si mateix.`
            : `Actúa como docente de programación${value('subject') ? ` de ${value('subject')}` : ''} y ayuda al estudiante a depurar por sí mismo.`
        : commTemplates.has(templateId)
          ? d.roleComm
          : `${d.role} ${value('subject') || d.education} ${level || d.stage}.`
}
