import type { Language } from './types'

const translations: Partial<Record<Language, Record<string, string>>> = {
  'ca-valencia': {
    Infantil: 'Infantil', Primaria: 'Primària', Bachillerato: 'Batxillerat', 'Formación Profesional': 'Formació Professional', FP: 'FP', Universidad: 'Universitat', Otro: 'Altre',
    'Aprendizaje basado en proyectos': 'Aprenentatge basat en projectes', 'Aprendizaje cooperativo': 'Aprenentatge cooperatiu', 'Aprendizaje basado en problemas': 'Aprenentatge basat en problemes', Investigación: 'Investigació', 'Una sesión': 'Una sessió', 'Varias sesiones': 'Diverses sessions', 'Una semana': 'Una setmana', 'Varias semanas': 'Diverses setmanes',
    Ordenadores: 'Ordinadors', Proyector: 'Projector', 'Pizarra digital': 'Pissarra digital', 'Material manipulativo': 'Material manipulatiu', 'Sin tecnología': 'Sense tecnologia', 'Aprendizaje servicio': 'Aprenentatge servei', Cooperativo: 'Cooperatiu', Gamificación: 'Gamificació', Retos: 'Reptes', 'Trabajo individual': 'Treball individual', 'Pensamiento crítico': 'Pensament crític',
    'Tabla Markdown': 'Taula Markdown', 'Tabla HTML': 'Taula HTML', Tabla: 'Taula', Lista: 'Llista', Texto: 'Text', 'Vídeo interactivo': 'Vídeo interactiu', 'Arrastrar y soltar': 'Arrossegar i soltar', Tarjetas: 'Targetes', Quiz: 'Qüestionari'
  },
  ca: {
    Infantil: 'Infantil', Primaria: 'Primària', Bachillerato: 'Batxillerat', 'Formación Profesional': 'Formació Professional', FP: 'FP', Universidad: 'Universitat', Otro: 'Altre',
    'Aprendizaje basado en proyectos': 'Aprenentatge basat en projectes', 'Aprendizaje cooperativo': 'Aprenentatge cooperatiu', 'Aprendizaje basado en problemas': 'Aprenentatge basat en problemes', Investigación: 'Investigació', 'Una sesión': 'Una sessió', 'Varias sesiones': 'Diverses sessions', 'Una semana': 'Una setmana', 'Varias semanas': 'Diverses setmanes',
    Ordenadores: 'Ordinadors', Proyector: 'Projector', 'Pizarra digital': 'Pissarra digital', 'Material manipulativo': 'Material manipulatiu', 'Sin tecnología': 'Sense tecnologia', Cooperativo: 'Cooperatiu', Gamificación: 'Gamificació', Retos: 'Reptes', 'Trabajo individual': 'Treball individual', 'Pensamiento crítico': 'Pensament crític',
    'Tabla Markdown': 'Taula Markdown', 'Tabla HTML': 'Taula HTML', Tabla: 'Taula', Lista: 'Llista', Texto: 'Text', 'Vídeo interactivo': 'Vídeo interactiu', 'Arrastrar y soltar': 'Arrossegar i deixar anar', Tarjetas: 'Targetes', Quiz: 'Qüestionari'
  },
  en: {
    Primaria: 'Primary', Bachillerato: 'Upper secondary', 'Formación Profesional': 'Vocational education', FP: 'Vocational education', Universidad: 'University', Otro: 'Other',
    'Aprendizaje basado en proyectos': 'Project-based learning', 'Aprendizaje cooperativo': 'Cooperative learning', 'Aprendizaje basado en problemas': 'Problem-based learning', Investigación: 'Inquiry', 'Una sesión': 'One session', 'Varias sesiones': 'Several sessions', 'Una semana': 'One week', 'Varias semanas': 'Several weeks',
    Ordenadores: 'Computers', Proyector: 'Projector', 'Pizarra digital': 'Interactive whiteboard', 'Material manipulativo': 'Manipulatives', 'Sin tecnología': 'No technology', Cooperativo: 'Cooperative learning', Gamificación: 'Gamification', Retos: 'Challenges', 'Trabajo individual': 'Individual work', 'Pensamiento crítico': 'Critical thinking',
    'Tabla Markdown': 'Markdown table', 'Tabla HTML': 'HTML table', Tabla: 'Table', Lista: 'List', Texto: 'Text', 'Vídeo interactivo': 'Interactive video', 'Arrastrar y soltar': 'Drag and drop', Tarjetas: 'Cards', Quiz: 'Quiz'
  }
}

export function localizeOption(value: string, language: Language): string {
  return translations[language]?.[value] || value
}
