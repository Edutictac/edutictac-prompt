import type { Language } from '../types'

export function applyExtended1(translations: Record<Language, Record<string, string>>) {
  for (const language of ['es', 'ca-valencia', 'ca', 'en'] as Language[]) {
    Object.assign(translations[language], {
      curriculum: language === 'en' ? 'Curriculum profile (optional)' : 'Perfil curricular (opcional)',
      curriculumName: language === 'en' ? 'Curriculum profile' : 'Perfil curricular',
      general:
        language === 'en'
          ? 'General mode: no curriculum profile'
          : language === 'ca-valencia'
            ? 'Mode general: sense perfil curricular'
            : language === 'ca'
              ? 'Mode general: sense perfil curricular'
              : 'Modo general: sin perfil curricular',
      specificCompetences:
        language === 'en'
          ? 'Specific competences'
          : language === 'es'
            ? 'Competencias específicas'
            : language === 'ca'
              ? 'Competències específiques'
              : 'Competències específiques',
      assessmentCriteria:
        language === 'en'
          ? 'Assessment criteria'
          : language === 'es'
            ? 'Criterios de evaluación'
            : language === 'ca'
              ? 'Criteris d’avaluació'
              : 'Criteris d’avaluació',
      basicKnowledge: language === 'en' ? 'Basic knowledge' : language === 'es' ? 'Saberes básicos' : 'Sabers bàsics',
      lead:
        language === 'en'
          ? 'Shape your classroom ideas with guided forms.'
          : language === 'es'
            ? 'Da forma a tus ideas para el aula con formularios guiados.'
            : language === 'ca'
              ? 'Dona forma a les teves idees per a l’aula amb formularis guiats.'
              : 'Dona forma a les teues idees per a l’aula amb formularis guiats.',
      catalog: language === 'en' ? 'CATALOGUE' : language === 'es' ? 'CATÁLOGO' : 'CATÀLEG',
      editing:
        language === 'en' ? 'Editing:' : language === 'es' ? 'Editando:' : language === 'ca' ? 'Editant:' : 'Editant:',
      update: language === 'en' ? 'Update' : language === 'es' ? 'Actualizar' : 'Actualitza',
      saveAsNew:
        language === 'en'
          ? 'Save as new'
          : language === 'es'
            ? 'Guardar como nuevo'
            : language === 'ca'
              ? 'Desa com a nou'
              : 'Guarda com a nou',
      updatedOk:
        language === 'en'
          ? 'Prompt updated in your library.'
          : language === 'es'
            ? 'Prompt actualizado en tu biblioteca.'
            : language === 'ca'
              ? 'Prompt actualitzat a la teva biblioteca.'
              : 'Prompt actualitzat a la teua biblioteca.',
      recentTools:
        language === 'en'
          ? 'Your recent tools'
          : language === 'es'
            ? 'Tus herramientas recientes'
            : language === 'ca'
              ? 'Les teves eines recents'
              : 'Les teues ferramentes recents',
      newsEyebrow: language === 'en' ? 'WHAT’S NEW' : language === 'es' ? 'NOVEDADES' : 'NOVETATS',
      newsTitle:
        language === 'en'
          ? 'Latest in EduTicTac Prompt'
          : language === 'es'
            ? 'Lo último en EduTicTac Prompt'
            : 'El més nou d’EduTicTac Prompt',
      newsMore:
        language === 'en' ? 'See all changes' : language === 'es' ? 'Ver todos los cambios' : 'Mostra tots els canvis',
      help: language === 'en' ? 'Help' : language === 'es' ? 'Ayuda' : 'Ajuda',
      privacyTitle:
        language === 'en'
          ? 'Privacy and responsible use'
          : language === 'es'
            ? 'Privacidad y uso responsable'
            : language === 'ca'
              ? 'Privacitat i ús responsable'
              : 'Privacitat i ús responsable',
      privacyHeading:
        language === 'en'
          ? 'A tool at the service of teachers'
          : language === 'es'
            ? 'Una herramienta al servicio del profesorado'
            : language === 'ca'
              ? 'Una eina al servei del professorat'
              : 'Una ferramenta al servici del professorat',
      privacyBody:
        language === 'en'
          ? 'Always review AI responses, verify references and facts, check for possible bias, and adapt materials to your context. Do not automatically use responses for grading. Teaching responsibility always remains with you.'
          : language === 'es'
            ? 'Revisa siempre las respuestas de cualquier IA, verifica referencias y datos, comprueba posibles sesgos y adapta los materiales a tu contexto. No utilices las respuestas de forma automática para calificar. La responsabilidad docente siempre es tuya.'
            : language === 'ca'
              ? 'Revisa sempre les respostes de qualsevol IA, verifica referències i dades, comprova possibles biaixos i adapta els materials al teu context. No utilitzis automàticament les respostes per a qualificar. La responsabilitat docent sempre és teva.'
              : 'Revisa sempre les respostes de qualsevol IA, verifica referències i dades, comprova possibles biaixos i adapta els materials al teu context. No utilitzes automàticament les respostes per a qualificar. La responsabilitat docent sempre és teua.',
      licenseHeading:
        language === 'en'
          ? 'Your prompts are yours'
          : language === 'es'
            ? 'Los prompts que generas son tuyos'
            : 'Els prompts que generes són teus',
      licenseBody:
        language === 'en'
          ? 'You can use, modify and share the prompts, agents and other texts the app generates freely, without restrictions or attribution (CC0 1.0). The application code is free software under the AGPL-3.0-or-later licence.'
          : language === 'es'
            ? 'Puedes usar, modificar y compartir libremente los prompts, agentes y demás textos que genera la aplicación, sin restricciones ni obligación de citar (CC0 1.0). El código de la aplicación es software libre con licencia AGPL-3.0 o posterior.'
            : language === 'ca'
              ? 'Pots usar, modificar i compartir lliurement els prompts, agents i altres textos que genera l’aplicació, sense restriccions ni obligació de citar-ne l’origen (CC0 1.0). El codi de l’aplicació és programari lliure amb llicència AGPL-3.0 o posterior.'
              : 'Pots usar, modificar i compartir lliurement els prompts, agents i altres textos que genera l’aplicació, sense restriccions ni obligació de citar-ne l’origen (CC0 1.0). El codi de l’aplicació és programari lliure amb llicència AGPL-3.0 o posterior.',
      offline:
        language === 'en'
          ? 'Works without an account or connection'
          : language === 'es'
            ? 'Funciona sin cuenta y sin conexión'
            : language === 'ca'
              ? 'Funciona sense compte i sense connexió'
              : 'Funciona sense compte i sense connexió',
      localStatus: language === 'en' ? '● local' : '● local',
      topicHint:
        language === 'en'
          ? 'Describe specifically what you want to work on.'
          : language === 'es'
            ? 'Describe de manera concreta qué quieres trabajar.'
            : language === 'ca'
              ? 'Descriu concretament què vols treballar.'
              : 'Descriu de manera concreta què vols treballar.',
      topicSuggestionsHint:
        language === 'en'
          ? 'You can write your own topic or choose a suggestion from basic knowledge.'
          : language === 'es'
            ? 'Puedes escribir tu propio tema o elegir una sugerencia de los saberes básicos.'
            : 'Pots escriure el teu tema o triar un suggeriment dels sabers bàsics.',
      curriculumElements:
        language === 'en'
          ? 'Optional curriculum elements'
          : language === 'es'
            ? 'Elementos curriculares opcionales'
            : 'Elements curriculars opcionals',
      curriculumElementsHint:
        language === 'en'
          ? 'Tick the elements you want to include in the prompt.'
          : language === 'es'
            ? 'Marca los elementos que quieres incluir en el prompt.'
            : language === 'ca'
              ? 'Marca els elements que vols incloure al prompt.'
              : 'Marca els elements que vols incloure en el prompt.',
      curriculumEmpty:
        language === 'en'
          ? 'No detailed curriculum elements are available for this stage and subject. The prompt will be generated with the rest of the data.'
          : language === 'es'
            ? 'No hay elementos curriculares detallados para esta etapa y materia. El prompt se generará con el resto de datos.'
            : language === 'ca'
              ? 'No hi ha elements curriculars detallats per a aquesta etapa i matèria. El prompt es generarà amb la resta de dades.'
              : 'No hi ha elements curriculars detallats per a esta etapa i matèria. El prompt es generarà amb la resta de dades.',
      subjectsForStage:
        language === 'en'
          ? 'Subjects for this stage'
          : language === 'es'
            ? 'Materias disponibles para esta etapa'
            : language === 'ca'
              ? 'Matèries disponibles per a aquesta etapa'
              : 'Matèries disponibles per a esta etapa',
      subjectHint:
        language === 'en'
          ? 'Optional suggestion; the free subject field remains available below.'
          : language === 'es'
            ? 'Sugerencia opcional; el campo libre de materia sigue disponible más abajo.'
            : 'Suggeriment opcional; el camp lliure de matèria continua disponible més avall.',
      chooseSubject:
        language === 'en' ? 'Choose a subject' : language === 'es' ? 'Elige una materia' : 'Tria una matèria',
      otherSubject:
        language === 'en'
          ? 'Other / write manually'
          : language === 'es'
            ? 'Otra / escribir manualmente'
            : 'Altra / escriure manualment',
      writeSubject:
        language === 'en' ? 'Write a subject' : language === 'es' ? 'Escribe una materia' : 'Escriu una matèria',
      invalidFile:
        language === 'en'
          ? 'Invalid file'
          : language === 'es'
            ? 'Archivo no válido'
            : language === 'ca'
              ? 'Fitxer no vàlid'
              : 'Fitxer no vàlid',
      duplicateSuffix:
        language === 'en' ? ' (copy)' : language === 'es' ? ' (copia)' : language === 'ca' ? ' (còpia)' : ' (còpia)',
      copied: language === 'en' ? 'Copied' : language === 'es' ? 'Copiado' : 'Copiat',
      copyFailed:
        language === 'en' ? 'Could not copy' : language === 'es' ? 'No se ha podido copiar' : 'No s’ha pogut copiar',
      editableHint:
        language === 'en'
          ? 'Edit the generated prompt before copying or saving it.'
          : language === 'es'
            ? 'Edita el prompt generado antes de copiarlo o guardarlo.'
            : language === 'ca'
              ? 'Edita el prompt generat abans de copiar-lo o desar-lo.'
              : 'Edita el prompt generat abans de copiar-lo o guardar-lo.',
      fullscreen: language === 'en' ? 'Full screen' : 'Pantalla completa',
      exitFullscreen:
        language === 'en'
          ? 'Exit full screen'
          : language === 'es'
            ? 'Salir de pantalla completa'
            : 'Eixir de pantalla completa',
      updateAvailable:
        language === 'en'
          ? 'A new version of the application is available.'
          : language === 'es'
            ? 'Hay una nueva versión de la aplicación.'
            : language === 'ca'
              ? 'Hi ha una nova versió de l’aplicació.'
              : 'Hi ha una nova versió de l’aplicació.',
      updateButton:
        language === 'en'
          ? 'Update application'
          : language === 'es'
            ? 'Actualizar la aplicación'
            : language === 'ca'
              ? 'Actualitza l’aplicació'
              : 'Actualitza l’aplicació',
      edit: language === 'en' ? 'Edit' : language === 'es' ? 'Editar' : language === 'ca' ? 'Edita' : 'Edita',
      placeholderCourse:
        language === 'en' ? 'E.g. 4th Primary' : language === 'es' ? 'Ex. 4.º de Primaria' : 'Ex. 4t de Primària',
      placeholderSubject:
        language === 'en'
          ? 'E.g. Natural Sciences'
          : language === 'es'
            ? 'Ex. Ciencias de la Naturaleza'
            : 'Ex. Ciències Naturals',
      placeholderTopic:
        language === 'en'
          ? 'E.g. Ecosystems in our local environment'
          : language === 'es'
            ? 'Ex. Los ecosistemas de nuestro entorno'
            : 'Ex. Els ecosistemes del nostre entorn',
      placeholderObjectives:
        language === 'en'
          ? 'E.g. Understand, explain and apply the key ideas...'
          : language === 'es'
            ? 'Ex. Comprender, explicar y aplicar las ideas clave...'
            : 'Ex. Comprendre, explicar i aplicar les idees clau...',
      placeholderContext:
        language === 'en'
          ? 'E.g. Heterogeneous group; some students need reading support...'
          : language === 'es'
            ? 'Ex. Grupo heterogéneo; parte del alumnado necesita apoyo lector...'
            : 'Ex. Grup heterogeni; part de l’alumnat necessita suport lector...',
      placeholderConstraints:
        language === 'en'
          ? 'E.g. One 45-minute session, everyday materials, no personal data...'
          : language === 'es'
            ? 'Ex. Una sesión de 45 minutos, materiales cotidianos, sin datos personales...'
            : 'Ex. Una sessió de 45 minuts, materials quotidians, sense dades personals...',
      placeholderQualityCriteria:
        language === 'en'
          ? 'E.g. Practical, inclusive, observable and easy to review...'
          : language === 'es'
            ? 'Ex. Práctico, inclusivo, observable y fácil de revisar...'
            : 'Ex. Pràctic, inclusiu, observable i fàcil de revisar...',
      placeholderRole:
        language === 'en'
          ? 'E.g. Primary teacher specialising in active learning'
          : language === 'es'
            ? 'Ex. Docente de Primaria especialista en aprendizaje activo'
            : 'Ex. Docent de Primària especialista en aprenentatge actiu',
      placeholderTask:
        language === 'en'
          ? 'E.g. Design a sequence of activities with a final product...'
          : language === 'es'
            ? 'Ex. Diseña una secuencia de actividades con un producto final...'
            : 'Ex. Dissenya una seqüència d’activitats amb un producte final...',
      placeholderActivity:
        language === 'en'
          ? 'E.g. Debate on responsible use of social media'
          : language === 'es'
            ? 'Ex. Debate sobre el uso responsable de las redes sociales'
            : 'Ex. Debat sobre l’ús responsable de les xarxes socials',
      placeholderCriteria:
        language === 'en'
          ? 'E.g. Argumentation, evidence and respectful participation...'
          : language === 'es'
            ? 'Ex. Argumentación, uso de evidencias y participación respetuosa...'
            : 'Ex. Argumentació, ús d’evidències i participació respectuosa...',
      level:
        language === 'en'
          ? 'Educational level'
          : language === 'es'
            ? 'Nivel educativo'
            : language === 'ca'
              ? 'Nivell educatiu'
              : 'Nivell educatiu',
      course: language === 'en' ? 'Course' : language === 'es' ? 'Curso' : 'Curs',
      subject: language === 'en' ? 'Subject' : language === 'es' ? 'Materia' : 'Matèria',
      topic: language === 'en' ? 'Topic' : 'Tema',
      objectives: language === 'en' ? 'Objectives' : language === 'es' ? 'Objetivos' : 'Objectius',
      methodology: language === 'en' ? 'Methodology' : language === 'es' ? 'Metodología' : 'Metodologia',
      duration: language === 'en' ? 'Duration' : language === 'es' ? 'Duración' : 'Duració',
      resources: language === 'en' ? 'Available resources' : 'Recursos disponibles',
      format: language === 'en' ? 'Output format' : language === 'es' ? 'Formato de salida' : 'Format d’eixida',
      activity: language === 'en' ? 'Activity' : language === 'es' ? 'Actividad' : 'Activitat',
      rubricMaxScore:
        language === 'en'
          ? 'Assignment maximum score (default 100)'
          : language === 'es'
            ? 'Puntuación máxima de la tarea (100 por defecto)'
            : 'Puntuació màxima de la tasca (100 per defecte)',
      rubricCsvLevels:
        language === 'en'
          ? '4 levels: Insufficient · In progress · Achieved · Excellent'
          : language === 'es'
            ? '4 niveles: Insuficiente / En proceso / Conseguido / Excelente'
            : '4 nivells: Insuficient · En procés · Assolit · Excel·lent',
      criteria: language === 'en' ? 'Criteria' : language === 'es' ? 'Criterios' : 'Criteris',
      levels:
        language === 'en' ? 'Performance levels' : language === 'es' ? 'Niveles de desempeño' : 'Nivells de rendiment',
      activityType: language === 'en' ? 'Activity type' : language === 'es' ? 'Tipo de actividad' : 'Tipus d’activitat',
      questionCount:
        language === 'en' ? 'Number of questions' : language === 'es' ? 'Número de preguntas' : 'Nombre de preguntes',
      questionTypes:
        language === 'en' ? 'Question types' : language === 'es' ? 'Tipos de pregunta' : 'Tipus de pregunta',
      role: language === 'en' ? 'Role' : 'Rol',
      context:
        language === 'en'
          ? 'Group and situation context'
          : language === 'es'
            ? 'Contexto del grupo y la situación'
            : 'Context del grup i la situació',
      task: language === 'en' ? 'Task' : language === 'es' ? 'Tarea' : 'Tasca',
      constraints:
        language === 'en'
          ? 'Constraints and limits'
          : language === 'es'
            ? 'Restricciones y límites'
            : 'Restriccions i límits',
      qualityCriteria:
        language === 'en' ? 'Quality criteria' : language === 'es' ? 'Criterios de calidad' : 'Criteris de qualitat',
      newCategoryPlaceholder:
        language === 'en'
          ? 'Write a new category (optional)'
          : language === 'es'
            ? 'Escribe una categoría nueva (opcional)'
            : language === 'ca'
              ? 'Escriu una categoria nova (opcional)'
              : 'Escriu una categoria nova (opcional)',
    })
  }
}
