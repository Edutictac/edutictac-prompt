import type { Language } from './types'

const translations: Partial<Record<Language, Record<string, string>>> = {
  'ca-valencia': {
    Tablets: 'Tauletes', Laboratorio: 'Laboratori', Robots: 'Robots', ABP: 'ABP', DUA: 'DUA',
    Infantil: 'Infantil', Primaria: 'Primària', Bachillerato: 'Batxillerat', 'Formación Profesional': 'Formació Professional', 'Educación de personas adultas': 'Educació de persones adultes', FP: 'FP', Universidad: 'Universitat', Otro: 'Altre',
    'Aprendizaje basado en proyectos': 'Aprenentatge basat en projectes', 'Aprendizaje cooperativo': 'Aprenentatge cooperatiu', 'Aprendizaje basado en problemas': 'Aprenentatge basat en problemes', Investigación: 'Investigació', 'Una sesión': 'Una sessió', 'Varias sesiones': 'Diverses sessions', 'Una semana': 'Una setmana', 'Varias semanas': 'Diverses setmanes',
    Ordenadores: 'Ordinadors', Proyector: 'Projector', 'Pizarra digital': 'Pissarra digital', 'Material manipulativo': 'Material manipulatiu', 'Sin tecnología': 'Sense tecnologia', 'Aprendizaje servicio': 'Aprenentatge servei', Cooperativo: 'Cooperatiu', Gamificación: 'Gamificació', Retos: 'Reptes', 'Trabajo individual': 'Treball individual', 'Pensamiento crítico': 'Pensament crític',
    'Tabla Markdown': 'Taula Markdown', 'Tabla HTML': 'Taula HTML', Tabla: 'Taula', Lista: 'Llista', Texto: 'Text', 'Vídeo interactivo': 'Vídeo interactiu', 'Arrastrar y soltar': 'Arrossegar i soltar', Tarjetas: 'Targetes', Quiz: 'Qüestionari',
    'Sin preferencia': 'Sense preferència', 'Diagrama técnico 2D': 'Diagrama tècnic 2D', 'Ilustración de libro de texto': 'Il·lustració de llibre de text', Fotorrealista: 'Fotorrealista', 'Acuarela científica': 'Aquarel·la científica', 'Infografía plana': 'Infografia plana', 'Maqueta artesanal': 'Maqueta artesanal', 'Isométrica': 'Isomètrica', 'Cómic educativo': 'Còmic educatiu', 'Sin texto': 'Sense text', 'Con etiquetas básicas': 'Amb etiquetes bàsiques', '16:9 horizontal': '16:9 horitzontal', '9:16 vertical': '9:16 vertical', '1:1 cuadrado': '1:1 quadrat',
    'Implicación': 'Implicació', 'Representación': 'Representació', 'Acción y expresión': 'Acció i expressió',
    'Completar huecos': 'Completar buits', 'Memorizar y escribir': 'Memoritzar i escriure', Emparejar: 'Aparellar', Ordenar: 'Ordenar', Clasificar: 'Classificar', 'Opción múltiple': 'Opció múltiple',
    'Niveles y trofeos': 'Nivells i trofeus', 'Ayuda para el alumnado': 'Ajuda per a l’alumnat', 'Menú docente oculto': 'Menú docent amagat', 'Manual docente': 'Manual docent', 'Guardar sesión': 'Guardar la sessió', 'Cargar contenido CSV': 'Carregar contingut CSV',
  },
  ca: {
    'Aprendizaje servicio': 'Aprenentatge servei',
    Tablets: 'Tauletes', Laboratorio: 'Laboratori', Robots: 'Robots', ABP: 'ABP', DUA: 'DUA',
    Infantil: 'Infantil', Primaria: 'Primària', Bachillerato: 'Batxillerat', 'Formación Profesional': 'Formació Professional', 'Educación de personas adultas': 'Educació de persones adultes', FP: 'FP', Universidad: 'Universitat', Otro: 'Altre',
    'Aprendizaje basado en proyectos': 'Aprenentatge basat en projectes', 'Aprendizaje cooperativo': 'Aprenentatge cooperatiu', 'Aprendizaje basado en problemas': 'Aprenentatge basat en problemes', Investigación: 'Investigació', 'Una sesión': 'Una sessió', 'Varias sesiones': 'Diverses sessions', 'Una semana': 'Una setmana', 'Varias semanas': 'Diverses setmanes',
    Ordenadores: 'Ordinadors', Proyector: 'Projector', 'Pizarra digital': 'Pissarra digital', 'Material manipulativo': 'Material manipulatiu', 'Sin tecnología': 'Sense tecnologia', Cooperativo: 'Cooperatiu', Gamificación: 'Gamificació', Retos: 'Reptes', 'Trabajo individual': 'Treball individual', 'Pensamiento crítico': 'Pensament crític',
    'Tabla Markdown': 'Taula Markdown', 'Tabla HTML': 'Taula HTML', Tabla: 'Taula', Lista: 'Llista', Texto: 'Text', 'Vídeo interactivo': 'Vídeo interactiu', 'Arrastrar y soltar': 'Arrossegar i deixar anar', Tarjetas: 'Targetes', Quiz: 'Qüestionari',
    'Sin preferencia': 'Sense preferència', 'Diagrama técnico 2D': 'Diagrama tècnic 2D', 'Ilustración de libro de texto': 'Il·lustració de llibre de text', Fotorrealista: 'Fotorrealista', 'Acuarela científica': 'Aquarel·la científica', 'Infografía plana': 'Infografia plana', 'Maqueta artesanal': 'Maqueta artesanal', 'Isométrica': 'Isomètrica', 'Cómic educativo': 'Còmic educatiu', 'Sin texto': 'Sense text', 'Con etiquetas básicas': 'Amb etiquetes bàsiques', '16:9 horizontal': '16:9 horitzontal', '9:16 vertical': '9:16 vertical', '1:1 cuadrado': '1:1 quadrat',
    'Implicación': 'Implicació', 'Representación': 'Representació', 'Acción y expresión': 'Acció i expressió',
    'Completar huecos': 'Completar buits', 'Memorizar y escribir': 'Memoritzar i escriure', Emparejar: 'Aparellar', Ordenar: 'Ordenar', Clasificar: 'Classificar', 'Opción múltiple': 'Opció múltiple',
    'Niveles y trofeos': 'Nivells i trofeus', 'Ayuda para el alumnado': 'Ajuda per a l’alumnat', 'Menú docente oculto': 'Menú docent amagat', 'Manual docente': 'Manual docent', 'Guardar sesión': 'Desar la sessió', 'Cargar contenido CSV': 'Carregar contingut CSV',
  },
  en: {
    Tablets: 'Tablets', Laboratorio: 'Laboratory', Robots: 'Robots', ABP: 'PBL', DUA: 'UDL', 'Aprendizaje servicio': 'Service learning',
    Primaria: 'Primary', Bachillerato: 'Upper secondary', 'Formación Profesional': 'Vocational education', 'Educación de personas adultas': 'Adult education', FP: 'Vocational education', Universidad: 'University', Otro: 'Other',
    'Aprendizaje basado en proyectos': 'Project-based learning', 'Aprendizaje cooperativo': 'Cooperative learning', 'Aprendizaje basado en problemas': 'Problem-based learning', Investigación: 'Inquiry', 'Una sesión': 'One session', 'Varias sesiones': 'Several sessions', 'Una semana': 'One week', 'Varias semanas': 'Several weeks',
    Ordenadores: 'Computers', Proyector: 'Projector', 'Pizarra digital': 'Interactive whiteboard', 'Material manipulativo': 'Manipulatives', 'Sin tecnología': 'No technology', Cooperativo: 'Cooperative learning', Gamificación: 'Gamification', Retos: 'Challenges', 'Trabajo individual': 'Individual work', 'Pensamiento crítico': 'Critical thinking',
    'Tabla Markdown': 'Markdown table', 'Tabla HTML': 'HTML table', Tabla: 'Table', Lista: 'List', Texto: 'Text', 'Vídeo interactivo': 'Interactive video', 'Arrastrar y soltar': 'Drag and drop', Tarjetas: 'Cards', Quiz: 'Quiz',
    'Sin preferencia': 'No preference', 'Diagrama técnico 2D': '2D technical diagram', 'Ilustración de libro de texto': 'Textbook illustration', Fotorrealista: 'Photorealistic', 'Acuarela científica': 'Scientific watercolour', 'Infografía plana': 'Flat infographic', 'Maqueta artesanal': 'Handcrafted model', 'Isométrica': 'Isometric', 'Cómic educativo': 'Educational comic', 'Sin texto': 'No text', 'Con etiquetas básicas': 'With basic labels', '16:9 horizontal': '16:9 landscape', '9:16 vertical': '9:16 portrait', '1:1 cuadrado': '1:1 square',
    'Implicación': 'Engagement', 'Representación': 'Representation', 'Acción y expresión': 'Action and expression',
    'Completar huecos': 'Fill in the gaps', 'Memorizar y escribir': 'Memorise and write', Emparejar: 'Matching', Ordenar: 'Ordering', Clasificar: 'Sorting into groups', 'Opción múltiple': 'Multiple choice',
    'Niveles y trofeos': 'Levels and trophies', 'Ayuda para el alumnado': 'Help for learners', 'Menú docente oculto': 'Hidden teacher menu', 'Manual docente': 'Teacher guide', 'Guardar sesión': 'Save session', 'Cargar contenido CSV': 'Load content from CSV',
  }
}

export function localizeOption(value: string, language: Language): string {
  const minutes = /^(\d+) minutos$/.exec(value)
  if (minutes && language !== 'es') return `${minutes[1]} ${language === 'en' ? 'minutes' : 'minuts'}`
  return translations[language]?.[value] || value
}
