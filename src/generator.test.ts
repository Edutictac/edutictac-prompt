import { describe, expect, it } from 'vitest'
import { generatePrompt } from './generator'
import { templates } from './templates'

const template = (id: string) => templates.find(item => item.id === id)!

describe('generatePrompt', () => {
  it('compone un encargo docente con los elementos del curso', () => {
    const prompt = generatePrompt(template('lesson'), {
      level: 'Primaria',
      course: '4.º',
      subject: 'Ciencias',
      topic: 'Los ecosistemas',
      context: 'Grupo heterogéneo de 24 alumnos con distintos niveles lectores.',
      objectives: 'Comprender las relaciones de una cadena trófica.',
      constraints: 'Una sesión de 45 minutos y sin dispositivos.',
      qualityCriteria: 'Debe incluir una evidencia observable y una adaptación de apoyo.',
      outputFormat: 'Markdown'
    }, 'es')

    expect(prompt).toContain('## Rol')
    expect(prompt).toContain('## Contexto')
    expect(prompt).toContain('Primaria 4.º')
    expect(prompt).toContain('Grupo heterogéneo de 24 alumnos')
    expect(prompt).toContain('## Objetivo y tarea')
    expect(prompt).toContain('Los ecosistemas')
    expect(prompt).toContain('## Restricciones y límites')
    expect(prompt).toContain('## Criterios de calidad')
    expect(prompt).toContain('## Formato de salida\nDevuelve el resultado en Markdown.')
  })

  it('aplica la tarea especializada de una rúbrica', () => {
    const prompt = generatePrompt(template('rubric'), {
      activity: 'debate sobre el cambio climático',
      criteria: 'Argumentación y uso de fuentes.',
      levels: '4',
      outputFormat: 'Tabla Markdown'
    }, 'es')

    expect(prompt).toContain('Crea una rúbrica para evaluar debate sobre el cambio climático.')
    expect(prompt).toContain('## Criterios\nArgumentación y uso de fuentes.')
    expect(prompt).toContain('## Niveles de desempeño\n4')
  })

  it('incluye revisión, viabilidad y protección de datos', () => {
    const prompt = generatePrompt(template('free'), {
      role: 'Docente de Lengua',
      task: 'Diseña una actividad de comprensión lectora.',
      outputFormat: 'Texto'
    }, 'es')

    expect(prompt).toContain('Entrega un primer borrador revisable')
    expect(prompt).toContain('Comprueba que la propuesta es viable')
    expect(prompt).toContain('No inventes normativa, referencias ni información sobre el alumnado.')
    expect(prompt).toContain('Devuelve el resultado en Texto.')
  })

  it('traduce las etiquetas principales al valenciano', () => {
    const prompt = generatePrompt(template('free'), {
      role: 'Docent',
      task: 'Dissenya una activitat.',
      qualityCriteria: 'Instruccions clares.',
      outputFormat: 'Markdown'
    }, 'ca-valencia')

    expect(prompt).toContain('## Rol')
    expect(prompt).toContain('## Objectiu i tasca')
    expect(prompt).toContain('## Criteris de qualitat')
    expect(prompt).toContain('## Format d’eixida')
  })

  it('mantiene el idioma elegido cuando el formulario está vacío', () => {
    const catalan = generatePrompt(template('free'), {}, 'ca')
    expect(catalan).toContain('Actua com a docent especialista en educació')
    expect(catalan).toContain('Dissenya una activitat sobre el tema indicat.')
    expect(catalan).toContain('Ofereix un primer esborrany revisable')
    expect(catalan).not.toContain('Actúa como docente')
    expect(catalan).not.toContain('Diseña una actividad')
  })

  it('traduce les opcions seleccionades en el prompt català', () => {
    const prompt = generatePrompt(template('lesson'), { level: 'Primaria', outputFormat: 'Texto' }, 'ca')
    expect(prompt).toContain('Primària')
    expect(prompt).toContain('Retorna el resultat en Text.')
    expect(prompt).not.toContain('Primaria')
    expect(prompt).not.toContain('Texto')
  })

  it('localiza la frase de contexto y no duplica la etapa', () => {
    const ca = generatePrompt(template('lesson'), { level: 'Primaria', outputFormat: 'Texto' }, 'ca')
    expect(ca).toContain('Treball amb alumnat de Primària.')
    expect(ca).not.toContain('Trabajo con alumnado')

    const en = generatePrompt(template('lesson'), { level: 'Primaria', outputFormat: 'Texto' }, 'en')
    expect(en).toContain('Working with learners in Primary.')
  })

  it('genera el feedback formatiu i la comunicació a famílies', () => {
    const feedback = generatePrompt(template('feedback'), {
      level: 'ESO',
      subject: 'Tecnología',
      task: 'comentario sobre el prototipo de un grupo',
      criteria: 'Justificación y uso de fuentes.',
      outputFormat: 'Texto'
    }, 'es')
    expect(feedback).toContain('## Objetivo y tarea')
    expect(feedback).toContain('comentario sobre el prototipo de un grupo')

    const family = generatePrompt(template('family-note'), {
      role: 'Tutor de 2.º de ESO',
      context: 'Comunicar una salida didáctica.',
      task: 'Redacta una circular breve para las familias.',
      outputFormat: 'Texto'
    }, 'es')
    expect(family).toContain('## Rol')
    expect(family).toContain('Tutor de 2.º de ESO')
    expect(family).toContain('## Contexto')
    expect(family).toContain('Redacta una circular breve')
  })

  it('adapta un texto a lectura fácil e incluye el texto de partida', () => {
    const prompt = generatePrompt(template('easy-reading'), {
      level: 'Primaria',
      subject: 'Ciencias',
      topic: 'Los ecosistemas',
      sourceText: 'Los ecosistemas son sistemas formados por seres vivos...',
      outputFormat: 'Texto'
    }, 'es')
    expect(prompt).toContain('Adapta a lectura fácil el siguiente texto.')
    expect(prompt).toContain('## Texto de partida')
    expect(prompt).toContain('Los ecosistemas son sistemas formados por seres vivos')
  })

  it('usa textos propios en los comunicados, la tutoría y el feedback', () => {
    const family = generatePrompt(template('family-note'), { outputFormat: 'Texto' }, 'es')
    expect(family).toContain('tutor/a o miembro del equipo directivo')
    expect(family).toContain('Redacta una comunicación breve y clara para las familias.')
    expect(family).not.toContain('Diseña una actividad')

    const feedback = generatePrompt(template('feedback'), { outputFormat: 'Texto' }, 'ca')
    expect(feedback).toContain('feedback formatiu')
    expect(feedback).not.toContain('Dissenya una activitat')
  })

  it('adapta el bloque de revisión a cada tipo de plantilla', () => {
    const family = generatePrompt(template('family-note'), { outputFormat: 'Texto' }, 'ca-valencia')
    expect(family).toContain('llenguatge clar i proper per a les famílies')
    expect(family).not.toContain('Usa instrucciones claras, observables')

    const adaptation = generatePrompt(template('three-levels'), { outputFormat: 'Texto' }, 'es')
    expect(adaptation).toContain('Mantén el mismo objetivo de aprendizaje')
    expect(adaptation).not.toContain('Comprueba que la propuesta es viable')

    const rubric = generatePrompt(template('rubric'), { outputFormat: 'Texto' }, 'es')
    expect(rubric).toContain('los criterios son observables y no ambiguos')
  })

  it('genera un paquete SCORM compatible con Moodle', () => {
    const prompt = generatePrompt(template('scorm'), { topic: 'el ciclo del agua', outputFormat: 'SCORM 1.2' }, 'ca')
    expect(prompt).toContain('paquet SCORM 1.2')
    expect(prompt).toContain('imsmanifest.xml')
    expect(prompt).toContain('el ciclo del agua')
    expect(prompt).toContain('Retorna el resultat en SCORM 1.2.')
  })

  it('genera bancos de preguntas y paquetes estándar (GIFT, QTI, Common Cartridge)', () => {
    const gift = generatePrompt(template('gift'), { topic: 'les fraccions', outputFormat: 'GIFT' }, 'ca')
    expect(gift).toContain('format GIFT')
    expect(gift).toContain('les fraccions')
    expect(gift).toContain('Retorna el resultat en GIFT.')

    const qti = generatePrompt(template('qti'), { topic: 'el ciclo del agua', outputFormat: 'QTI 2.1' }, 'es')
    expect(qti).toContain('QTI 2.1')
    expect(qti).toContain('el ciclo del agua')

    const cc = generatePrompt(template('common-cartridge'), { outputFormat: 'Common Cartridge' }, 'en')
    expect(cc).toContain('Common Cartridge')
  })

  it('adapta las plantillas de imagen a la herramienta elegida', () => {
    const midjourney = generatePrompt(template('scientific-illustration'), { topic: 'la célula', aspectRatio: '16:9 horizontal', aiTool: 'Midjourney', outputFormat: 'Texto' }, 'es')
    expect(midjourney).toContain('## Herramienta de imagen: Midjourney')
    expect(midjourney).toContain('--ar 16:9')
    expect(midjourney).not.toContain('{ratio}')

    const canva = generatePrompt(template('infographic'), { topic: 'el agua', aiTool: 'Canva', outputFormat: 'Texto' }, 'ca-valencia')
    expect(canva).toContain('IA d’imatges de Canva')

    const gemini = generatePrompt(template('infographic'), { topic: 'water', aiTool: 'Gemini', outputFormat: 'Texto' }, 'en')
    expect(gemini).toContain('Generate the image directly')

    const noTool = generatePrompt(template('infographic'), { topic: 'el agua', aiTool: 'Sin preferencia', outputFormat: 'Texto' }, 'es')
    expect(noTool).not.toContain('Herramienta de imagen')
  })

  it('ignora la herramienta en plantillas de texto, aunque venga de un prompt guardado', () => {
    const lesson = generatePrompt(template('lesson'), { level: 'Primaria', aiTool: 'ChatGPT', outputFormat: 'Texto' }, 'es')
    expect(lesson).not.toContain('ChatGPT')
  })

  it('añade el bloque de refinamiento solo cuando se indica', () => {
    const prompt = generatePrompt(template('free'), { task: 'xy', refinement: 'Afig una versió en valencià.', outputFormat: 'Texto' }, 'ca-valencia')
    expect(prompt).toContain('## Refinament i ajustos')
    expect(prompt).toContain('Afig una versió en valencià.')

    const empty = generatePrompt(template('free'), { task: 'xy', outputFormat: 'Texto' }, 'ca-valencia')
    expect(empty).not.toContain('## Refinament i ajustos')
  })

  it('genera las tareas de las plantillas visuales', () => {
    const ill = generatePrompt(template('scientific-illustration'), { topic: 'la cèl·lula', visualStyle: 'Diagrama técnico 2D', outputFormat: 'Texto' }, 'ca')
    expect(ill).toContain('il·lustració educativa')
    expect(ill).toContain('la cèl·lula')

    const infographic = generatePrompt(template('infographic'), { topic: 'el cicle de l’aigua', outputFormat: 'Texto' }, 'ca')
    expect(infographic).toContain('infografia educativa')

    const mindMap = generatePrompt(template('mind-map'), { topic: 'els ecosistemes', outputFormat: 'Mermaid' }, 'es')
    expect(mindMap).toContain('mapa mental')
    expect(mindMap).toContain('Mermaid')
  })

  it('pide el instrumento de evaluación adecuado con la actividad indicada', () => {
    const scale = generatePrompt(template('rating-scale'), { activity: 'el debate sobre el agua', levels: '4' }, 'es')
    expect(scale).toContain('Crea una escala de valoración para evaluar el debate sobre el agua.')
    expect(scale).not.toContain('Diseña una actividad')
    const test = generatePrompt(template('written-test'), { activity: 'les fraccions', levels: '10' }, 'ca-valencia')
    expect(test).toContain('Elabora una prova escrita')
    expect(test).toContain('## Puntuació màxima\n10')
    const talk = generatePrompt(template('presentation'), { activity: 'the water cycle', duration: '5 minutos' }, 'en')
    expect(talk).toContain('oral presentation of the water cycle.')
    expect(talk).toContain('5 minutes')
    const easy = generatePrompt(template('easy-reading'), { topic: 'el reciclatge', sourceText: 'Text' }, 'ca')
    expect(easy).toContain('Tema: el reciclatge.')
  })

  it('incluye los campos propios de las plantillas visuales', () => {
    const prompt = generatePrompt(template('infographic'), { topic: 'el agua', sections: 'Estados del agua', visualStyle: 'Isométrica', aspectRatio: '1:1 cuadrado', outputFormat: 'Texto' }, 'ca-valencia')
    expect(prompt).toContain('## Apartats a incloure\nEstados del agua')
    expect(prompt).toContain('## Estil visual\nIsomètrica')
    expect(prompt).toContain('## Relació d’aspecte\n1:1 quadrat')
    const mindMap = generatePrompt(template('mind-map'), { topic: 'ecosistemas', branches: 'Factores bióticos', outputFormat: 'Mermaid' }, 'es')
    expect(mindMap).toContain('## Ramas principales\nFactores bióticos')
  })

  it('genera un juego HTML autocontenido con las funciones elegidas', () => {
    const prompt = generatePrompt(template('html-game'), { level: 'Primaria', topic: 'la vocal neutra', activityType: 'Memorizar y escribir', gameItems: 'ANAGRAMA, anagram_, a', gameFeatures: 'Niveles y trofeos · Guardar sesión', outputFormat: 'HTML' }, 'ca-valencia')
    expect(prompt).toContain('Crea un únic fitxer HTML autocontingut')
    expect(prompt).toContain('Mecànica de joc: Memoritzar i escriure.')
    expect(prompt).toContain('## Contingut dels exercicis\nANAGRAMA, anagram_, a')
    expect(prompt).toContain('## Requisits tècnics')
    expect(prompt).toContain('- Nivells i trofeus:')
    expect(prompt).toContain('- Guardar la sessió:')
    expect(prompt).not.toContain('Menú docent amagat')
    expect(prompt).toContain('com obrir i provar el fitxer en els navegadors')
    expect(prompt).toContain('Retorna el resultat en HTML.')

    const empty = generatePrompt(template('html-game'), { topic: 'fractions' }, 'en')
    expect(empty).toContain('Propose 20 items suited to the level')
    expect(empty).not.toContain('## Game features')

    const several = generatePrompt(template('html-game'), { topic: 'fracciones', activityType: 'Emparejar · Ordenar', outputFormat: 'HTML' }, 'es')
    expect(several).toContain('Mecánicas de juego (combínalas o altérnalas entre ejercicios): Emparejar, Ordenar.')
  })

  it('añade los principios DUA elegidos y amplía la revisión docente', () => {
    const prompt = generatePrompt(template('lesson'), { level: 'Primaria', topic: 'Los ecosistemas', udl: 'Representación · Acción y expresión', outputFormat: 'Texto' }, 'es')
    expect(prompt).toContain('## Diseño Universal para el Aprendizaje (DUA)')
    expect(prompt).toContain('- Representación (el qué)')
    expect(prompt).toContain('- Acción y expresión (el cómo)')
    expect(prompt).not.toContain('Implicación (el porqué)')
    expect(prompt).toContain('al menos dos formas de acceder al contenido')

    const plain = generatePrompt(template('lesson'), { level: 'Primaria', topic: 'Los ecosistemas', outputFormat: 'Texto' }, 'es')
    expect(plain).not.toContain('Diseño Universal')
    expect(plain).not.toContain('al menos dos formas')

    const en = generatePrompt(template('project'), { topic: 'Energy', udl: 'Implicación', outputFormat: 'Texto' }, 'en')
    expect(en).toContain('## Universal Design for Learning (UDL)')
    expect(en).toContain('- Engagement (the why)')
  })

  it('incluye las barreras del contexto sin etiquetar al alumnado', () => {
    const prompt = generatePrompt(template('rubric'), { activity: 'Debat', barriers: 'Textos llargs sense suport visual', outputFormat: 'Texto' }, 'ca-valencia')
    expect(prompt).toContain('## Barreres del context\nTextos llargs sense suport visual\nAnticipa estes barreres')

    const empty = generatePrompt(template('rubric'), { activity: 'Debat', outputFormat: 'Texto' }, 'ca-valencia')
    expect(empty).not.toContain('Barreres del context')
  })

  it('genera la revisión DUA y la matriz DUA con su propio bloque de revisión', () => {
    const review = generatePrompt(template('udl-review'), { sourceText: 'Llegir el tema i respondre deu preguntes.', outputFormat: 'Texto' }, 'ca')
    expect(review).toContain('des del Disseny Universal per a l’Aprenentatge')
    expect(review).toContain('Llegir el tema i respondre deu preguntes.')
    expect(review).toContain('Mantén el mateix objectiu i nivell d’exigència')

    const matrix = generatePrompt(template('udl-matrix'), { topic: 'El ciclo del agua', outputFormat: 'Tabla' }, 'es')
    expect(matrix).toContain('matriz DUA (pautas CAST) para una situación de aprendizaje sobre El ciclo del agua.')
    expect(matrix).toContain('- Implicación (el porqué)')
    expect(matrix).toContain('- Representación (el qué)')
    expect(matrix).toContain('- Acción y expresión (el cómo)')
  })
})
