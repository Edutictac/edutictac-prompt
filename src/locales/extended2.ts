import type { Language } from '../types'

export function applyExtended2(translations: Record<Language, Record<string, string>>) {
  for (const language of ['es', 'ca-valencia', 'ca', 'en'] as Language[]) {
    Object.assign(translations[language], {
      titlePlaceholder:
        language === 'en'
          ? 'E.g. Arduino rubric 4ESO'
          : language === 'es'
            ? 'Ex. Rúbrica Arduino 4.º ESO'
            : 'Ex. Rúbrica Arduino 4ESO',
      tagsPlaceholder:
        language === 'en'
          ? '4ESO, Technology, PBL'
          : language === 'es'
            ? '4.º ESO, Tecnología, ABP'
            : '4ESO, Tecnologia, ABP',
      templateLearningSituation:
        language === 'en'
          ? 'Learning situation'
          : language === 'es'
            ? 'Situación de aprendizaje'
            : language === 'ca'
              ? 'Situació d’aprenentatge'
              : 'Situació d’aprenentatge',
      templateLesson:
        language === 'en'
          ? 'Class session'
          : language === 'es'
            ? 'Sesión de clase'
            : language === 'ca'
              ? 'Sessió de classe'
              : 'Sessió de classe',
      templateSequence:
        language === 'en'
          ? 'Teaching sequence'
          : language === 'es'
            ? 'Secuencia didáctica'
            : language === 'ca'
              ? 'Seqüència didàctica'
              : 'Seqüència didàctica',
      templateCompetencyActivity:
        language === 'en'
          ? 'Competency-based activity'
          : language === 'es'
            ? 'Actividad competencial'
            : language === 'ca'
              ? 'Activitat competencial'
              : 'Activitat competencial',
      templateProject:
        language === 'en'
          ? 'PBL project'
          : language === 'es'
            ? 'Proyecto ABP'
            : language === 'ca'
              ? 'Projecte ABP'
              : 'Projecte ABP',
      templateChallenge:
        language === 'en'
          ? 'Problem or challenge'
          : language === 'es'
            ? 'Problema o reto'
            : language === 'ca'
              ? 'Problema o repte'
              : 'Problema o repte',
      templateRubric: language === 'en' ? 'Rubric' : 'Rúbrica',
      templateChecklist:
        language === 'en'
          ? 'Checklist'
          : language === 'es'
            ? 'Lista de cotejo'
            : language === 'ca'
              ? 'Llista de verificació'
              : 'Llista de coteig',
      templateRatingScale:
        language === 'en' ? 'Rating scale' : language === 'es' ? 'Escala de valoración' : 'Escala de valoració',
      templateSystematicObservation:
        language === 'en'
          ? 'Systematic observation'
          : language === 'es'
            ? 'Observación sistemática'
            : 'Observació sistemàtica',
      templatePortfolio: language === 'en' ? 'Portfolio' : language === 'es' ? 'Portafolio' : 'Portafolis',
      templateProduction: language === 'en' ? 'Student production' : language === 'es' ? 'Producción' : 'Producció',
      templateWrittenTest: language === 'en' ? 'Written test' : language === 'es' ? 'Prueba escrita' : 'Prova escrita',
      templateProduct: language === 'en' ? 'Learning product' : language === 'es' ? 'Producto' : 'Producte',
      templatePresentation: language === 'en' ? 'Presentation' : language === 'es' ? 'Exposición' : 'Exposició',
      templateH5p: language === 'en' ? 'H5P activity' : language === 'es' ? 'Actividad H5P' : 'Activitat H5P',
      templateScorm: language === 'en' ? 'SCORM package' : language === 'es' ? 'Paquete SCORM' : 'Paquet SCORM',
      templateGift:
        language === 'en'
          ? 'GIFT question bank'
          : language === 'es'
            ? 'Banco de preguntas GIFT'
            : 'Banc de preguntes GIFT',
      templateQti:
        language === 'en' ? 'QTI 2.1 questions' : language === 'es' ? 'Preguntas QTI 2.1' : 'Preguntes QTI 2.1',
      templateCommonCartridge:
        language === 'en'
          ? 'Common Cartridge package'
          : language === 'es'
            ? 'Paquete Common Cartridge'
            : 'Paquet Common Cartridge',
      templateFree:
        language === 'en'
          ? 'Free builder'
          : language === 'es'
            ? 'Constructor libre'
            : language === 'ca'
              ? 'Constructor lliure'
              : 'Constructor lliure',
      templateFeedback:
        language === 'en' ? 'Formative feedback' : language === 'es' ? 'Feedback formativo' : 'Feedback formatiu',
      templateThreeLevels:
        language === 'en'
          ? 'One material, three levels'
          : language === 'es'
            ? 'Un material, tres niveles'
            : 'Un material, tres nivells',
      templateFamilyNote:
        language === 'en'
          ? 'Family communication'
          : language === 'es'
            ? 'Comunicación a familias'
            : 'Comunicació a les famílies',
      templateEasyReading: language === 'en' ? 'Easy reading' : language === 'es' ? 'Lectura fácil' : 'Lectura fàcil',
      templateBiasCheck:
        language === 'en' ? 'Bias check' : language === 'es' ? 'Revisión de sesgos' : 'Revisió de biaixos',
      templateGlossarySupport:
        language === 'en'
          ? 'Glossary and visual supports'
          : language === 'es'
            ? 'Glosario y apoyos visuales'
            : 'Glossari i suports visuals',
      templateTutoringScript:
        language === 'en' ? 'Tutoring script' : language === 'es' ? 'Guion de tutoría' : 'Guió de tutoria',
      sourceText: language === 'en' ? 'Source text' : language === 'es' ? 'Texto de partida' : 'Text de partida',
      placeholderSourceText:
        language === 'en'
          ? 'Paste the text you want to adapt here (no personal data)...'
          : language === 'es'
            ? 'Pega aquí el texto que quieres adaptar (sin datos personales)...'
            : 'Enganxa ací el text que vols adaptar (sense dades personals)...',
      'placeholderRole-family-note':
        language === 'en'
          ? 'E.g. 2nd Primary tutor or member of the leadership team'
          : language === 'es'
            ? 'Ex. Tutora de 2.º de Primaria o miembro del equipo directivo'
            : 'Ex. Tutora de 2n de Primària o membre de l’equip directiu',
      'placeholderTask-family-note':
        language === 'en'
          ? 'E.g. Announce a school trip and ask for authorisation...'
          : language === 'es'
            ? 'Ex. Comunicar una salida didáctica y pedir la autorización...'
            : 'Ex. Comunicar una eixida didàctica i demanar l’autorització...',
      'placeholderTask-tutoring-script':
        language === 'en'
          ? 'E.g. Prepare a meeting with a family about their child’s progress...'
          : language === 'es'
            ? 'Ex. Preparar una reunión con una familia sobre el aprovechamiento...'
            : 'Ex. Preparar una reunió amb una família sobre l’aprofitament...',
      'placeholderTask-feedback':
        language === 'en'
          ? 'E.g. Feedback on a group prototype (no personal data)...'
          : language === 'es'
            ? 'Ex. Comentario sobre el prototipo de un grupo (sin datos personales)...'
            : 'Ex. Comentari sobre el prototip d’un grup (sense dades personals)...',
      'placeholderTask-three-levels':
        language === 'en'
          ? 'E.g. Reading comprehension activity about ecosystems...'
          : language === 'es'
            ? 'Ex. Actividad de comprensión lectora sobre los ecosistemas...'
            : 'Ex. Activitat de comprensió lectora sobre els ecosistemes...',
      login: language === 'en' ? 'Sign in' : language === 'es' ? 'Iniciar sesión' : 'Inicia sessió',
      logout: language === 'en' ? 'Sign out' : language === 'es' ? 'Cerrar sesión' : 'Tanca la sessió',
      sync:
        language === 'en' ? 'Sync library' : language === 'es' ? 'Sincronizar biblioteca' : 'Sincronitza la biblioteca',
      signedInAs:
        language === 'en'
          ? 'Library session: {name}'
          : language === 'es'
            ? 'Sesión de la biblioteca: {name}'
            : 'Sessió de la biblioteca: {name}',
      libraryLoginHint:
        language === 'en'
          ? 'Sign in with the EduTicTac account chip in the header to sync your library across devices.'
          : language === 'es'
            ? 'Inicia sesión con el chip de EduTicTac de la cabecera para sincronizar tu biblioteca entre dispositivos.'
            : language === 'ca'
              ? 'Inicia sessió amb el xip d’EduTicTac de la capçalera per sincronitzar la teva biblioteca entre dispositius.'
              : 'Inicia sessió amb el xip d’EduTicTac de la capçalera per a sincronitzar la teua biblioteca entre dispositius.',
      libraryLoginHintLocal:
        language === 'en'
          ? 'Sign in to sync your library across devices.'
          : language === 'es'
            ? 'Entra para sincronizar tu biblioteca entre dispositivos.'
            : language === 'ca'
              ? 'Entra per sincronitzar la teva biblioteca entre dispositius.'
              : 'Entra per a sincronitzar la teua biblioteca entre dispositius.',
      syncDownloaded:
        language === 'en'
          ? 'Your online library is ready.'
          : language === 'es'
            ? 'Tu biblioteca online ya está disponible.'
            : language === 'ca'
              ? 'La teva biblioteca en línia ja està disponible.'
              : 'La teua biblioteca en línia ja està disponible.',
      syncUploaded:
        language === 'en'
          ? 'Local prompts uploaded to your library.'
          : language === 'es'
            ? 'Los prompts locales se han subido a tu biblioteca.'
            : language === 'ca'
              ? 'Els prompts locals s’han pujat a la teva biblioteca.'
              : 'Els prompts locals s’han pujat a la teua biblioteca.',
      syncFailed:
        language === 'en'
          ? 'The library could not be synchronized.'
          : language === 'es'
            ? 'No se ha podido sincronizar la biblioteca.'
            : 'No s’ha pogut sincronitzar la biblioteca.',
      ownerLibraryHint:
        language === 'en'
          ? 'Only prompts from this account are shown. Anonymous prompts stay on this device.'
          : language === 'es'
            ? 'Solo se muestran los prompts de esta cuenta. Los anónimos quedan en este dispositivo.'
            : language === 'ca'
              ? 'Només es mostren els prompts d’aquest compte. Els anònims queden en aquest dispositiu.'
              : 'Només es mostren els prompts d’este compte. Els anònims queden en este dispositiu.',
      deleteFailed:
        language === 'en'
          ? 'The prompt could not be deleted on the server. It is kept so you can retry.'
          : language === 'es'
            ? 'No se ha podido borrar en el servidor. El prompt se conserva para reintentarlo.'
            : language === 'ca'
              ? 'No s’ha pogut borrar al servidor. El prompt es conserva per a reintentar-ho.'
              : 'No s’ha pogut borrar en el servidor. El prompt es conserva per a reintentar-ho.',
      formMode: language === 'en' ? 'Form mode' : language === 'es' ? 'Modo del formulario' : 'Mode del formulari',
      advancedMode: language === 'en' ? 'Advanced' : language === 'es' ? 'Avanzado' : 'Avançat',
      advancedModeHint:
        language === 'en'
          ? 'All fields are visible for more precise prompts.'
          : language === 'es'
            ? 'Todos los campos están visibles para crear prompts más precisos.'
            : 'Tots els camps estan visibles per a crear prompts més precisos.',
      guidedMode: language === 'en' ? 'Step by step' : language === 'es' ? 'Paso a paso' : 'Pas a pas',
      guidedModeHint:
        language === 'en'
          ? 'Answer one block per step and skip whatever you do not need. You always see how many steps are left.'
          : language === 'es'
            ? 'Responde un bloque en cada paso y salta lo que no necesites. Siempre ves cuántos pasos quedan.'
            : language === 'ca'
              ? 'Respon un bloc a cada pas i salta el que no necessitis. Sempre veus quants passos queden.'
              : 'Respon un bloc en cada pas i salta el que no necessites. Sempre veus quants passos queden.',
      stepOf:
        language === 'en'
          ? 'Step {current} of {total}'
          : language === 'es'
            ? 'Paso {current} de {total}'
            : 'Pas {current} de {total}',
      stepsLeft:
        language === 'en'
          ? 'Steps left: {count}'
          : language === 'es'
            ? 'Quedan {count} pasos'
            : 'Queden {count} passos',
      lastStep: language === 'en' ? 'Last step' : language === 'es' ? 'Último paso' : 'Últim pas',
      next: language === 'en' ? 'Next' : language === 'es' ? 'Siguiente' : 'Següent',
      back: language === 'en' ? 'Back' : language === 'es' ? 'Anterior' : 'Anterior',
      skip: language === 'en' ? 'Skip' : language === 'es' ? 'Saltar' : 'Saltar',
      seeSummary: language === 'en' ? 'See summary' : language === 'es' ? 'Ver resumen' : 'Veure resum',
      summaryTitle:
        language === 'en' ? 'Prompt summary' : language === 'es' ? 'Resumen del prompt' : 'Resum del prompt',
      summaryHelp:
        language === 'en'
          ? 'Review what you have completed. You can go back to any block or generate the prompt now.'
          : language === 'es'
            ? 'Revisa lo que has completado. Puedes volver a cualquier bloque o generar ya el prompt.'
            : language === 'ca'
              ? 'Revisa el que has completat. Pots tornar a qualsevol bloc o generar ja el prompt.'
              : 'Revisa el que has completat. Pots tornar a qualsevol bloc o generar ja el prompt.',
      summaryEmpty:
        language === 'en'
          ? 'Not completed (the default value will be used).'
          : language === 'es'
            ? 'Sin completar (se usará el valor por defecto).'
            : 'Sense completar (s’usarà el valor per defecte).',
      summaryMissing:
        language === 'en'
          ? 'Recommended details missing: {fields}. You can still generate it.'
          : language === 'es'
            ? 'Faltan datos recomendados: {fields}. Puedes generarlo igualmente.'
            : language === 'ca'
              ? 'Falten dades recomanades: {fields}. El pots generar igualment.'
              : 'Falten dades recomanades: {fields}. El pots generar igualment.',
      guidedAbout: language === 'en' ? 'Level and subject' : language === 'es' ? 'Nivel y materia' : 'Nivell i matèria',
      guidedAboutHelp:
        language === 'en'
          ? 'Choose the stage and subject. If you pick a curriculum profile, the official elements are added.'
          : language === 'es'
            ? 'Indica la etapa y la materia. Si eliges un perfil curricular, se añadirán los elementos oficiales.'
            : language === 'ca'
              ? 'Indica l’etapa i la matèria. Si tries un perfil curricular, s’afegiran els elements oficials.'
              : 'Indica l’etapa i la matèria. Si tries un perfil curricular, s’afegiran els elements oficials.',
      guidedTopic:
        language === 'en' ? 'Topic and content' : language === 'es' ? 'Tema y contenido' : 'Tema i contingut',
      guidedTopicHelp:
        language === 'en'
          ? 'Write the topic or paste the source text. The more specific, the better the result.'
          : language === 'es'
            ? 'Escribe el tema o pega el texto de partida. Cuanto más concreto, mejor será el resultado.'
            : language === 'ca'
              ? 'Escriu el tema o enganxa el text de partida. Com més concret, millor serà el resultat.'
              : 'Escriu el tema o enganxa el text de partida. Com més concret, millor serà el resultat.',
      guidedTask:
        language === 'en' ? 'Objective and task' : language === 'es' ? 'Objetivo y tarea' : 'Objectiu i tasca',
      guidedTaskHelp:
        language === 'en'
          ? 'Explain what you want to achieve and for whom. This block guides the AI the most.'
          : language === 'es'
            ? 'Explica qué quieres conseguir y para quién. Es el bloque que más orienta a la IA.'
            : language === 'ca'
              ? 'Explica què vols aconseguir i per a qui. És el bloc que més orienta la IA.'
              : 'Explica què vols aconseguir i per a qui. És el bloc que més orienta la IA.',
      guidedDesign:
        language === 'en'
          ? 'How the activity works'
          : language === 'es'
            ? 'Cómo será la actividad'
            : 'Com serà l’activitat',
      guidedDesignHelp:
        language === 'en'
          ? 'Choose methodology, duration, resources and activity type.'
          : language === 'es'
            ? 'Elige metodología, duración, recursos y tipo de actividad.'
            : language === 'ca'
              ? 'Tria metodologia, durada, recursos i tipus d’activitat.'
              : 'Tria metodologia, duració, recursos i tipus d’activitat.',
      guidedSupport:
        language === 'en'
          ? 'Accessibility and support'
          : language === 'es'
            ? 'Accesibilidad y apoyos'
            : 'Accessibilitat i suports',
      guidedSupportHelp:
        language === 'en'
          ? 'Select UDL principles and describe barriers in the environment, not diagnoses or names.'
          : language === 'es'
            ? 'Marca los principios DUA y describe barreras del entorno, sin diagnósticos ni nombres.'
            : language === 'ca'
              ? 'Marca els principis DUA i descriu barreres de l’entorn, sense diagnòstics ni noms.'
              : 'Marca els principis DUA i descriu barreres de l’entorn, sense diagnòstics ni noms.',
      guidedCriteria:
        language === 'en'
          ? 'Criteria and assessment'
          : language === 'es'
            ? 'Criterios y evaluación'
            : 'Criteris i avaluació',
    })
  }
}
