import type { Language } from '../types'

export function applyExtended5(translations: Record<Language, Record<string, string>>) {
  for (const language of ['es', 'ca-valencia', 'ca', 'en'] as Language[]) {
    Object.assign(translations[language], {
      'placeholderContext-school-document':
        language === 'en'
          ? 'School, body or group, date, people involved and anything relevant to the document...'
          : language === 'es'
            ? 'Centro, órgano o grupo, fecha, personas implicadas y lo relevante para el documento...'
            : 'Centre, òrgan o grup, data, persones implicades i allò rellevant per al document...',
      'placeholderSourceText-udl-review':
        language === 'en'
          ? 'Paste the activity you want to review (statement, steps, materials and how it is assessed)...'
          : language === 'es'
            ? 'Pega la actividad que quieres revisar (enunciado, pasos, materiales y cómo se evalúa)...'
            : language === 'ca'
              ? 'Enganxa l’activitat que vols revisar (enunciat, passos, materials i com s’avalua)...'
              : 'Enganxa ací l’activitat que vols revisar (enunciat, passos, materials i com s’avalua)...',
    })
  }
}
