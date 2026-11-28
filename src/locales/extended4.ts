import type { Language } from '../types'

export function applyExtended4(translations: Record<Language, Record<string, string>>) {
  for (const language of ['es', 'ca-valencia', 'ca', 'en'] as Language[]) {
    Object.assign(translations[language], {
      sessionOpen:
        language === 'en'
          ? 'Open the tool'
          : language === 'es'
            ? 'Abrir la herramienta'
            : language === 'ca'
              ? 'Obre l’eina'
              : 'Obri la ferramenta',
      sessionProject: language === 'en' ? 'Project QR' : language === 'es' ? 'Proyectar QR' : 'Projecta el QR',
      sessionNoData:
        language === 'en'
          ? 'Without saved answers: it opens the empty tool.'
          : language === 'es'
            ? 'Sin datos guardados: abre la herramienta vacía.'
            : language === 'ca'
              ? 'Sense dades desades: obre l’eina buida.'
              : 'Sense dades guardades: obri la ferramenta buida.',
      shareForm:
        language === 'en'
          ? 'Share with these answers'
          : language === 'es'
            ? 'Compartir con estos datos'
            : language === 'ca'
              ? 'Comparteix amb aquestes dades'
              : 'Compartix amb estes dades',
      shareCopied:
        language === 'en'
          ? 'Link copied: it opens this tool with the same answers. It does not include personal data unless you typed it, so check before sharing.'
          : language === 'es'
            ? 'Enlace copiado: abre esta herramienta con los mismos datos. Solo lleva lo que has escrito; comprueba que no haya datos personales antes de compartirlo.'
            : language === 'ca'
              ? 'Enllaç copiat: obre aquesta eina amb les mateixes dades. Només porta el que has escrit; comprova que no hi hagi dades personals abans de compartir-lo.'
              : 'Enllaç copiat: obri esta ferramenta amb les mateixes dades. Només porta el que has escrit; comprova que no hi haja dades personals abans de compartir-lo.',
      shareEmpty:
        language === 'en'
          ? 'Fill in at least one field to share it.'
          : language === 'es'
            ? 'Rellena al menos un campo para compartirlo.'
            : language === 'ca'
              ? 'Emplena almenys un camp per compartir-lo.'
              : 'Ompli almenys un camp per a compartir-lo.',
      shareTooLong:
        language === 'en'
          ? 'There is too much text for a link: shorten the long fields or save it in your library.'
          : language === 'es'
            ? 'Hay demasiado texto para un enlace: acorta los campos largos o guárdalo en tu biblioteca.'
            : language === 'ca'
              ? 'Hi ha massa text per a un enllaç: escurça els camps llargs o desa-ho a la biblioteca.'
              : 'Hi ha massa text per a un enllaç: abreuja els camps llargs o guarda-ho en la biblioteca.',
      loadExampleConfirm:
        language === 'en'
          ? 'The example will replace what you have written in the form. Continue?'
          : language === 'es'
            ? 'El ejemplo sustituirá lo que has escrito en el formulario. ¿Quieres continuar?'
            : language === 'ca'
              ? 'L’exemple substituirà el que has escrit al formulari. Vols continuar?'
              : 'L’exemple substituirà el que has escrit en el formulari. Vols continuar?',
      openIn: language === 'en' ? 'Open in' : language === 'es' ? 'Abrir en' : language === 'ca' ? 'Obre a' : 'Obri en',
      openedWithPrompt:
        language === 'en'
          ? '{name} opened with the prompt. It is also copied in case it arrives cut short.'
          : language === 'es'
            ? 'Se ha abierto {name} con el prompt. También está copiado por si llega recortado.'
            : language === 'ca'
              ? 'S’ha obert {name} amb el prompt. També és copiat per si arriba retallat.'
              : 'S’ha obert {name} amb el prompt. També està copiat per si arriba retallat.',
      openedPaste:
        language === 'en'
          ? 'Prompt copied: paste it into {name} with Ctrl+V.'
          : language === 'es'
            ? 'Prompt copiado: pégalo en {name} con Ctrl+V.'
            : 'Prompt copiat: enganxa’l a {name} amb Ctrl+V.',
      useInEduCrea:
        language === 'en'
          ? 'Use in EduCrea'
          : language === 'es'
            ? 'Usar en EduCrea'
            : language === 'ca'
              ? 'Usa en EduCrea'
              : 'Usar en EduCrea',
      useInEduCreaHint:
        language === 'en'
          ? 'Opens EduCrea with the brief already filled in.'
          : language === 'es'
            ? 'Abre EduCrea con el encargo ya rellenado.'
            : language === 'ca'
              ? 'Obri EduCrea amb l’encàrrec ja emplenat.'
              : 'Obri EduCrea amb l’encàrrec ja emplenat.',
      useInEduCreaOpened:
        language === 'en'
          ? 'EduCrea has opened with the brief.'
          : language === 'es'
            ? 'EduCrea se ha abierto con el encargo.'
            : language === 'ca'
              ? 'EduCrea s’ha obert amb l’encàrrec.'
              : 'EduCrea s’ha obert amb l’encàrrec.',
      useInEduCreaCopied:
        language === 'en'
          ? 'The brief could not be sent directly. It has been copied: paste it into Instructions.'
          : language === 'es'
            ? 'No se ha podido enviar el encargo directamente. Se ha copiado: pégalo en Instrucciones.'
            : language === 'ca'
              ? 'No s’ha pogut enviar l’encàrrec directament. S’ha copiat: enganxa’l a Instruccions.'
              : 'No s’ha pogut enviar l’encàrrec directament. S’ha copiat: enganxa’l en Instruccions.',
      useInEduCreaCopyFailed:
        language === 'en'
          ? 'Could not send or copy the brief. Try again or copy the prompt by hand.'
          : language === 'es'
            ? 'No se ha podido enviar ni copiar el encargo. Vuelve a intentarlo o copia el prompt a mano.'
            : language === 'ca'
              ? 'No s’ha pogut enviar ni copiar l’encàrrec. Torna-ho a provar o copia el prompt a mà.'
              : 'No s’ha pogut enviar ni copiar l’encàrrec. Torna-ho a provar o copia el prompt a mà.',
      followUps:
        language === 'en'
          ? 'To refine the result'
          : language === 'es'
            ? 'Para afinar el resultado'
            : language === 'ca'
              ? 'Per afinar el resultat'
              : 'Per a afinar el resultat',
      followUpsHint:
        language === 'en'
          ? 'The first answer is a draft. Copy one of these requests and paste it into the same conversation.'
          : language === 'es'
            ? 'La primera respuesta es un borrador. Copia una de estas peticiones y pégala en la misma conversación.'
            : language === 'ca'
              ? 'La primera resposta és un esborrany. Copia una d’aquestes peticions i enganxa-la a la mateixa conversa.'
              : 'La primera resposta és un esborrany. Copia una d’estes peticions i enganxa-la en la mateixa conversa.',
      followUpCopied:
        language === 'en'
          ? 'Request copied: paste it into the same conversation.'
          : language === 'es'
            ? 'Petición copiada: pégala en la misma conversación.'
            : language === 'ca'
              ? 'Petició copiada: enganxa-la a la mateixa conversa.'
              : 'Petició copiada: enganxa-la en la mateixa conversa.',
      templateUdlMatrix: language === 'en' ? 'UDL matrix' : language === 'es' ? 'Matriz DUA' : 'Matriu DUA',
      templateStudentTutor:
        language === 'en'
          ? 'Socratic study tutor'
          : language === 'es'
            ? 'Tutoría socrática para estudiar'
            : language === 'ca'
              ? 'Tutoria socràtica per estudiar'
              : 'Tutoria socràtica per a estudiar',
      templateAnalogies:
        language === 'en'
          ? 'Explain with analogies'
          : language === 'es'
            ? 'Explicar con analogías'
            : 'Explicar amb analogies',
      templateParticipation:
        language === 'en'
          ? 'Equitable classroom participation'
          : language === 'es'
            ? 'Participación equitativa en el aula'
            : 'Participació equitativa a l’aula',
      templateConflictMediation:
        language === 'en'
          ? 'Classroom conflict mediation'
          : language === 'es'
            ? 'Mediación de conflictos en el aula'
            : 'Mediació de conflictes a l’aula',
      templateMultipleChoice:
        language === 'en'
          ? 'Multiple-choice quiz with explanations'
          : language === 'es'
            ? 'Cuestionario tipo test con explicaciones'
            : 'Qüestionari tipus test amb explicacions',
      templateWorksheet:
        language === 'en'
          ? 'Printable worksheet'
          : language === 'es'
            ? 'Ficha de trabajo imprimible'
            : 'Fitxa de treball imprimible',
      templateIllustratedWorksheet:
        language === 'en'
          ? 'Illustrated printable worksheet (image)'
          : language === 'es'
            ? 'Ficha ilustrada para imprimir (imagen)'
            : 'Fitxa il·lustrada per a imprimir (imatge)',
      worksheetTheme: language === 'en' ? 'Theme' : language === 'es' ? 'Temática' : 'Temàtica',
      themeElements:
        language === 'en'
          ? 'Own characters and elements'
          : language === 'es'
            ? 'Personajes y elementos propios'
            : 'Personatges i elements propis',
      printFinish: language === 'en' ? 'Finish' : language === 'es' ? 'Acabado' : 'Acabat',
      sheetLanguage:
        language === 'en' ? 'Worksheet language' : language === 'es' ? 'Idioma de la ficha' : 'Llengua de la fitxa',
      'placeholderThemeElements-illustrated-worksheet':
        language === 'en'
          ? 'E.g. A curious hedgehog, autumn leaves and mushrooms (optional; adds to or replaces the theme)'
          : language === 'es'
            ? 'Ex. Un erizo curioso, hojas de otoño y setas (opcional; se suma a la temática o la sustituye)'
            : 'Ex. Un eriçó curiós, fulles de tardor i bolets (opcional; se suma a la temàtica o la substitueix)',
      'placeholderGameItems-illustrated-worksheet':
        language === 'en'
          ? 'E.g. 7 + 5, 9 + 4, 12 − 3 … or the words for the word search (recommended: the image AI will copy them exactly)'
          : language === 'es'
            ? 'Ex. 7 + 5, 9 + 4, 12 − 3… o las palabras de la sopa de letras (recomendado: la IA de imágenes las copiará tal cual)'
            : 'Ex. 7 + 5, 9 + 4, 12 − 3… o les paraules de la sopa de lletres (recomanat: la IA d’imatges les copiarà tal qual)',
      'placeholderTopic-illustrated-worksheet':
        language === 'en' ? 'E.g. Adding up to 20' : language === 'es' ? 'Ex. Sumas hasta 20' : 'Ex. Sumes fins a 20',
      templateEditableLatex:
        language === 'en'
          ? 'Editable LaTeX formulas and calculations'
          : language === 'es'
            ? 'Fórmulas y cálculos en LaTeX editable'
            : language === 'ca'
              ? 'Fórmules i càlculs en LaTeX editable'
              : 'Fórmules i càlculs en LaTeX editable',
      templateLearningStations:
        language === 'en'
          ? 'Learning stations'
          : language === 'es'
            ? 'Estaciones de aprendizaje'
            : language === 'ca'
              ? 'Estacions d’aprenentatge'
              : 'Estacions d’aprenentatge',
      templateActivityEvidence:
        language === 'en'
          ? 'Evidence from an activity'
          : language === 'es'
            ? 'Evidencias de una actividad'
            : language === 'ca'
              ? 'Evidències d’una activitat'
              : 'Evidències d’una activitat',
      templateFlashcards:
        language === 'en'
          ? 'Flashcards'
          : language === 'es'
            ? 'Tarjetas de memoria'
            : language === 'ca'
              ? 'Targetes de memòria'
              : 'Targetes de memòria',
      templatePromptCoach:
        language === 'en'
          ? 'Help me create my prompt'
          : language === 'es'
            ? 'Ayúdame a crear mi prompt'
            : language === 'ca'
              ? 'Ajuda’m a crear el meu prompt'
              : 'Ajuda’m a crear el meu prompt',
      templateCaseStudy:
        language === 'en'
          ? 'Case study'
          : language === 'es'
            ? 'Caso práctico o supuesto profesional'
            : 'Cas pràctic o supòsit professional',
      templateLabGuide:
        language === 'en'
          ? 'Lab or workshop practical guide'
          : language === 'es'
            ? 'Guion de práctica de laboratorio o taller'
            : 'Guió de pràctica de laboratori o taller',
      templateClassPresentation:
        language === 'en'
          ? 'Classroom presentation'
          : language === 'es'
            ? 'Presentación para clase'
            : 'Presentació per a classe',
      templateEscapeRoom:
        language === 'en'
          ? 'Educational escape room'
          : language === 'es'
            ? 'Escape room o breakout educativo'
            : 'Escape room o breakout educatiu',
      templateReadingComprehension:
        language === 'en'
          ? 'Graded reading comprehension'
          : language === 'es'
            ? 'Lectura comprensiva graduada'
            : 'Lectura comprensiva graduada',
      templateEthicalDilemma:
        language === 'en'
          ? 'Ethical dilemmas for discussion'
          : language === 'es'
            ? 'Dilemas éticos para debatir'
            : 'Dilemes ètics per a debatre',
      templateStudyPlan:
        language === 'en'
          ? 'Weekly study plan'
          : language === 'es'
            ? 'Plan de estudio semanal'
            : 'Pla d’estudi setmanal',
      templateHistoricalInterview:
        language === 'en'
          ? 'Interview a historical figure'
          : language === 'es'
            ? 'Entrevista a un personaje histórico'
            : 'Entrevista a un personatge històric',
      templateCodingActivity:
        language === 'en'
          ? 'Robotics and coding activity sheet'
          : language === 'es'
            ? 'Ficha de actividad de robótica y programación'
            : 'Fitxa d’activitat de robòtica i programació',
      codingTool:
        language === 'en' ? 'Tool or material' : language === 'es' ? 'Herramienta o material' : 'Eina o material',
      studentRole: language === 'en' ? 'Student role' : language === 'es' ? 'Rol del alumnado' : 'Rol de l’alumnat',
      activityIdea:
        language === 'en' ? 'Starting format' : language === 'es' ? 'Formato de partida' : 'Format de partida',
      templateCodeCoach:
        language === 'en'
          ? 'Code review tutor'
          : language === 'es'
            ? 'Tutor para revisar código'
            : 'Tutor per revisar codi',
      templateProfileAdaptation:
        language === 'en'
          ? 'Adaptation for a specific learner profile'
          : language === 'es'
            ? 'Adaptación para un perfil concreto'
            : 'Adaptació per a un perfil concret',
      templateSchoolDocument:
        language === 'en'
          ? 'School documents (minutes, reports and plans)'
          : language === 'es'
            ? 'Documentos del centro (actas, informes y memorias)'
            : 'Documents del centre (actes, informes i memòries)',
      profile:
        language === 'en' ? 'Learner profile' : language === 'es' ? 'Perfil del alumnado' : 'Perfil de l’alumnat',
      strengths:
        language === 'en'
          ? 'Strengths, interests and supports that already work'
          : language === 'es'
            ? 'Fortalezas, intereses y apoyos que ya funcionan'
            : 'Fortaleses, interessos i suports que ja funcionen',
      documentType: language === 'en' ? 'Document type' : language === 'es' ? 'Tipo de documento' : 'Tipus de document',
      facts:
        language === 'en'
          ? 'Facts, notes and agreed points'
          : language === 'es'
            ? 'Datos, notas y acuerdos de partida'
            : 'Dades, notes i acords de partida',
      placeholderStrengths:
        language === 'en'
          ? 'E.g. interested in experiments, works better with visual examples, responds well to short instructions (optional)'
          : language === 'es'
            ? 'Ex. le interesan los experimentos, trabaja mejor con ejemplos visuales, responde bien a instrucciones cortas (opcional)'
            : 'Ex. li interessen els experiments, treballa millor amb exemples visuals, respon bé a instruccions curtes (opcional)',
      placeholderFacts:
        language === 'en'
          ? 'Dates, attendees, figures, agreements or notes you already have. Mark gaps with [ ]...'
          : language === 'es'
            ? 'Fechas, asistentes, cifras, acuerdos o notas de las que ya dispones. Marca los huecos con [ ]...'
            : 'Dates, assistents, xifres, acords o notes de què ja disposes. Marca els buits amb [ ]...',
      'placeholderTask-profile-adaptation':
        language === 'en'
          ? 'Describe the task or activity you want to adapt (statement, steps and how it is assessed)...'
          : language === 'es'
            ? 'Describe la tarea o actividad que quieres adaptar (enunciado, pasos y cómo se evalúa)...'
            : 'Descriu la tasca o activitat que vols adaptar (enunciat, passos i com s’avalua)...',
    })
  }
}
