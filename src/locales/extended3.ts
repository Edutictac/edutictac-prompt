import type { Language } from '../types'

export function applyExtended3(translations: Record<Language, Record<string, string>>) {
  for (const language of ['es', 'ca-valencia', 'ca', 'en'] as Language[]) {
    Object.assign(translations[language], {
      guidedCriteriaHelp:
        language === 'en'
          ? 'Define how the result will be reviewed or what it must meet.'
          : language === 'es'
            ? 'Define cómo se revisará el resultado o qué debe cumplir.'
            : language === 'ca'
              ? 'Defineix com es revisarà el resultat o què ha de complir.'
              : 'Definix com es revisarà el resultat o què ha de complir.',
      guidedLimits:
        language === 'en' ? 'Context and limits' : language === 'es' ? 'Contexto y límites' : 'Context i límits',
      guidedLimitsHelp:
        language === 'en'
          ? 'Add context, constraints, quality criteria and tweaks. Everything is optional.'
          : language === 'es'
            ? 'Añade contexto, restricciones, criterios de calidad y ajustes. Todo es opcional.'
            : 'Afig context, restriccions, criteris de qualitat i ajustos. Tot és opcional.',
      guidedFormat:
        language === 'en'
          ? 'Output format'
          : language === 'es'
            ? 'Formato de salida'
            : language === 'ca'
              ? 'Format de sortida'
              : 'Format d’eixida',
      guidedFormatHelp:
        language === 'en'
          ? 'Choose how you want to receive the result.'
          : language === 'es'
            ? 'Elige cómo quieres recibir el resultado.'
            : 'Tria com vols rebre el resultat.',
      toolsCount:
        language === 'en'
          ? 'educational tools and growing'
          : language === 'es'
            ? 'herramientas educativas en evolución'
            : language === 'ca'
              ? 'eines educatives en evolució'
              : 'ferramentes educatives en evolució',
      visual: language === 'en' ? 'Image and visual' : language === 'es' ? 'Imagen y visual' : 'Imatge i visual',
      templateExplainerVideo:
        language === 'en'
          ? 'Animated explainer film'
          : language === 'es'
            ? 'Película explicativa animada'
            : language === 'ca'
              ? 'Pel·lícula explicativa animada'
              : 'Pel·lícula explicativa animada',
      audience:
        language === 'en'
          ? 'Target audience'
          : language === 'es'
            ? 'Público destinatario'
            : language === 'ca'
              ? 'Públic destinatari'
              : 'Públic destinatari',
      videoStyle:
        language === 'en'
          ? 'Film style'
          : language === 'es'
            ? 'Estilo de la película'
            : language === 'ca'
              ? 'Estil de la pel·lícula'
              : 'Estil de la pel·lícula',
      videoVariant:
        language === 'en'
          ? 'Colour variant'
          : language === 'es'
            ? 'Variante de color'
            : language === 'ca'
              ? 'Variante de color'
              : 'Variant de color',
      videoFinish:
        language === 'en' ? 'Finish' : language === 'es' ? 'Acabado' : language === 'ca' ? 'Acabat' : 'Acabat',
      toneOption: language === 'en' ? 'Tone' : language === 'es' ? 'Tono' : language === 'ca' ? 'To' : 'To',
      brandColors:
        language === 'en'
          ? 'Brand colours'
          : language === 'es'
            ? 'Colores de marca'
            : language === 'ca'
              ? 'Colors de marca'
              : 'Colors de marca',
      voice: language === 'en' ? 'Voice and sound' : language === 'es' ? 'Voz y sonido' : 'Veu i so',
      mustShow:
        language === 'en'
          ? 'What must be clear no matter what'
          : language === 'es'
            ? 'Qué debe quedar claro sí o sí'
            : language === 'ca'
              ? 'Què ha de quedar clar sí o sí'
              : 'Què ha de quedar clar sí o sí',
      avoid:
        language === 'en'
          ? 'What must not appear'
          : language === 'es'
            ? 'Qué no debe aparecer'
            : 'Què no ha d’aparéixer',
      'placeholderSourceText-explainer-video':
        language === 'en'
          ? 'Paste the document you want to turn into a film (or attach the file and describe it here)...'
          : language === 'es'
            ? 'Pega el documento que quieres convertir en película (o adjunta el archivo y descríbelo aquí)...'
            : language === 'ca'
              ? 'Enganxa el document que vols convertir en pel·lícula (o adjunta el fitxer i descriu-lo ací)...'
              : 'Enganxa ací el document que vols convertir en pel·lícula (o adjunta el fitxer i descriu-lo ací)...',
      placeholderAudience:
        language === 'en'
          ? 'E.g. Year 10 students, families, staff...'
          : language === 'es'
            ? 'Ex. alumnado de 4.º de ESO, familias, claustro...'
            : language === 'ca'
              ? 'Ex. alumnat de 4t d’ESO, famílies, claustre...'
              : 'Ex. alumnat de 4t d’ESO, famílies, claustre...',
      placeholderMustShow:
        language === 'en'
          ? 'E.g. that the deadline is 30 June and what happens if it is missed...'
          : language === 'es'
            ? 'Ex. que el plazo termina el 30 de junio y qué pasa si no se entrega...'
            : language === 'ca'
              ? 'Ex. que el termini acaba el 30 de juny i què passa si no es presenta...'
              : 'Ex. que el termini acaba el 30 de juny i què passa si no es presenta...',
      placeholderAvoid:
        language === 'en'
          ? 'E.g. students’ names, internal figures, medical data...'
          : language === 'es'
            ? 'Ex. nombres del alumnado, cifras internas, datos médicos...'
            : language === 'ca'
              ? 'Ex. noms de l’alumnat, xifres internes, dades mèdiques...'
              : 'Ex. noms de l’alumnat, xifres internes, dades mèdiques...',
      placeholderBrandColors:
        language === 'en'
          ? 'E.g. #0A2540 and #00D4A0'
          : language === 'es'
            ? 'Ex. #0A2540 y #00D4A0'
            : 'Ex. #0A2540 i #00D4A0',
      templateScientificIllustration:
        language === 'en'
          ? 'Scientific illustration'
          : language === 'es'
            ? 'Ilustración científica'
            : 'Il·lustració científica',
      templateInfographic:
        language === 'en'
          ? 'Educational infographic'
          : language === 'es'
            ? 'Infografía educativa'
            : 'Infografia educativa',
      templateMindMap:
        language === 'en'
          ? 'Mind map / diagram'
          : language === 'es'
            ? 'Mapa mental / esquema'
            : 'Mapa mental / esquema',
      aiTool:
        language === 'en'
          ? 'Image tool'
          : language === 'es'
            ? 'Herramienta de imagen'
            : language === 'ca'
              ? 'Eina d’imatge'
              : 'Ferramenta d’imatge',
      refinement:
        language === 'en'
          ? 'Refinement and tweaks'
          : language === 'es'
            ? 'Refinamiento y ajustes'
            : 'Refinament i ajustos',
      visualStyle: language === 'en' ? 'Visual style' : language === 'es' ? 'Estilo visual' : 'Estil visual',
      includeLabels:
        language === 'en' ? 'Text and labels' : language === 'es' ? 'Texto y etiquetas' : 'Text i etiquetes',
      aspectRatio: language === 'en' ? 'Aspect ratio' : language === 'es' ? 'Relación de aspecto' : 'Relació d’aspecte',
      sections:
        language === 'en' ? 'Sections to include' : language === 'es' ? 'Apartados a incluir' : 'Apartats a incloure',
      branches: language === 'en' ? 'Main branches' : language === 'es' ? 'Ramas principales' : 'Branques principals',
      placeholderRefinement:
        language === 'en'
          ? 'E.g. Add a Valencian version and a local example...'
          : language === 'es'
            ? 'Ex. Añade una versión en valenciano y un ejemplo local...'
            : 'Ex. Afig una versió en valencià i un exemple local...',
      udl:
        language === 'en'
          ? 'Universal Design for Learning (UDL)'
          : language === 'es'
            ? 'Diseño Universal para el Aprendizaje (DUA)'
            : 'Disseny Universal per a l’Aprenentatge (DUA)',
      udlHint:
        language === 'en'
          ? 'Choose the principles the AI should build into the design. Hold Ctrl or Cmd to select several.'
          : language === 'es'
            ? 'Elige los principios que la IA debe incorporar al diseño. Mantén Ctrl o Cmd para elegir varios.'
            : language === 'ca'
              ? 'Tria els principis que la IA ha d’incorporar al disseny. Mantén premuda la tecla Ctrl o Cmd per triar-ne diversos.'
              : 'Tria els principis que la IA ha d’incorporar al disseny. Mantín premuda la tecla Ctrl o Cmd per a triar-ne diversos.',
      accessibility:
        language === 'en'
          ? 'Accessible materials'
          : language === 'es'
            ? 'Accesibilidad del material'
            : 'Accessibilitat del material',
      accessibilityHint:
        language === 'en'
          ? 'Specific measures for the printed material. The prompt says which students each one helps (dyslexia, low vision, ADHD, autism…).'
          : language === 'es'
            ? 'Medidas concretas para el material impreso. El prompt indica a qué alumnado ayuda cada una (dislexia, baja visión, TDAH, TEA…).'
            : language === 'ca'
              ? 'Mesures concretes per al material imprès. El prompt indica a quin alumnat ajuda cadascuna (dislèxia, baixa visió, TDAH, TEA…).'
              : 'Mesures concretes per al material imprés. El prompt indica a quin alumnat ajuda cadascuna (dislèxia, baixa visió, TDAH, TEA…).',
      barriers:
        language === 'en'
          ? 'Contextual barriers'
          : language === 'es'
            ? 'Barreras del contexto'
            : 'Barreres del context',
      barriersHint:
        language === 'en'
          ? 'Describe barriers in the environment, not diagnoses or names.'
          : language === 'es'
            ? 'Describe barreras del entorno, no diagnósticos ni nombres.'
            : language === 'ca'
              ? 'Descriu barreres de l’entorn, no diagnòstics ni noms.'
              : 'Descriu barreres de l’entorn, no diagnòstics ni noms.',
      placeholderBarriers:
        language === 'en'
          ? 'E.g. Long texts with no visual support; some students are still learning the language of instruction...'
          : language === 'es'
            ? 'Ex. Textos largos sin apoyo visual; parte del alumnado aún no domina la lengua vehicular...'
            : language === 'ca'
              ? 'Ex. Textos llargs sense suport visual; part de l’alumnat encara no domina la llengua vehicular...'
              : 'Ex. Textos llargs sense suport visual; part de l’alumnat encara no domina la llengua vehicular...',
      templateUdlReview:
        language === 'en'
          ? 'UDL review of an activity'
          : language === 'es'
            ? 'Revisión DUA de una actividad'
            : 'Revisió DUA d’una activitat',
      templateHtmlGame:
        language === 'en'
          ? 'Interactive HTML game'
          : language === 'es'
            ? 'Juego HTML interactivo'
            : 'Joc HTML interactiu',
      gameItems:
        language === 'en'
          ? 'Exercise content'
          : language === 'es'
            ? 'Contenido de los ejercicios'
            : 'Contingut dels exercicis',
      gameFeatures:
        language === 'en' ? 'Game features' : language === 'es' ? 'Funciones del juego' : 'Funcions del joc',
      'placeholderGameItems-html-game':
        language === 'en'
          ? 'E.g. One item per line: word, sentence or question with its answer (no personal data)...'
          : language === 'es'
            ? 'Ex. Un elemento por línea: palabra, frase o pregunta con su respuesta (sin datos personales)...'
            : language === 'ca'
              ? 'Ex. Un element per línia: paraula, frase o pregunta amb la resposta (sense dades personals)...'
              : 'Ex. Un element per línia: paraula, frase o pregunta amb la resposta (sense dades personals)...',
      'placeholderTopic-html-game':
        language === 'en'
          ? 'E.g. Words with the neutral vowel (a/e)'
          : language === 'es'
            ? 'Ex. Palabras con vocal neutra (a/e)'
            : 'Ex. Paraules amb vocal neutra (a/e)',
      loadExample:
        language === 'en' ? 'Load an example' : language === 'es' ? 'Cargar un ejemplo' : 'Carrega un exemple',
      generateNow:
        language === 'en'
          ? 'Generate now'
          : language === 'es'
            ? 'Generar ya'
            : language === 'ca'
              ? 'Genera ara'
              : 'Genera ara',
      generateNowHint:
        language === 'en'
          ? 'You already have the essentials: the remaining steps are optional.'
          : language === 'es'
            ? 'Ya tienes lo imprescindible: los pasos que faltan son opcionales.'
            : 'Ja tens l’imprescindible: els passos que falten són opcionals.',
      showQr: language === 'en' ? 'Show QR' : language === 'es' ? 'Mostrar QR' : 'Mostra el QR',
      qrLabel: language === 'en' ? 'QR code' : language === 'es' ? 'Código QR' : 'Codi QR',
      qrHint:
        language === 'en'
          ? 'Scan it with a phone camera to open this tool with the same answers.'
          : language === 'es'
            ? 'Escanéalo con la cámara del móvil para abrir esta herramienta con los mismos datos.'
            : language === 'ca'
              ? 'Escaneja’l amb la càmera del mòbil per obrir aquesta eina amb les mateixes dades.'
              : 'Escaneja’l amb la càmera del mòbil per a obrir esta ferramenta amb les mateixes dades.',
      qrDense:
        language === 'en'
          ? 'The code is very dense: if it is hard to scan from afar, shorten the long fields.'
          : language === 'es'
            ? 'El código es muy denso: si cuesta escanearlo de lejos, acorta los campos largos.'
            : language === 'ca'
              ? 'El codi és molt dens: si costa escanejar-lo de lluny, escurça els camps llargs.'
              : 'El codi és molt dens: si costa escanejar-lo de lluny, abreuja els camps llargs.',
      qrTooLong:
        language === 'en'
          ? 'There is too much text for a QR code: shorten the long fields or share the link instead.'
          : language === 'es'
            ? 'Hay demasiado texto para un código QR: acorta los campos largos o comparte el enlace.'
            : language === 'ca'
              ? 'Hi ha massa text per a un codi QR: escurça els camps llargs o comparteix l’enllaç.'
              : 'Hi ha massa text per a un codi QR: abreuja els camps llargs o compartix l’enllaç.',
      qrDownload:
        language === 'en'
          ? 'Download QR (SVG)'
          : language === 'es'
            ? 'Descargar QR (SVG)'
            : language === 'ca'
              ? 'Baixa el QR (SVG)'
              : 'Descarrega el QR (SVG)',
      close: language === 'en' ? 'Close' : language === 'es' ? 'Cerrar' : 'Tanca',
      sessionBarHint:
        language === 'en'
          ? 'Session pack: tick several saved prompts and get one page with a link and QR code for each, to print or project.'
          : language === 'es'
            ? 'Paquete de sesión: marca varios prompts guardados y obtén una página con un enlace y un QR por cada uno, para imprimirla o proyectarla.'
            : language === 'ca'
              ? 'Paquet de sessió: marca diversos prompts desats i obtén una pàgina amb un enllaç i un QR per a cadascun, per imprimir-la o projectar-la.'
              : 'Paquet de sessió: marca diversos prompts guardats i obtín una pàgina amb un enllaç i un QR per a cadascun, per a imprimir-la o projectar-la.',
      sessionPrepare:
        language === 'en'
          ? 'Prepare the session ({count})'
          : language === 'es'
            ? 'Preparar la sesión ({count})'
            : 'Prepara la sessió ({count})',
      sessionAdd:
        language === 'en'
          ? 'In the session'
          : language === 'es'
            ? 'En la sesión'
            : language === 'ca'
              ? 'A la sessió'
              : 'En la sessió',
      sessionIntro:
        language === 'en'
          ? 'Each link opens the tool with the saved answers. Print the page, project the QR codes one by one or copy the links into Aules.'
          : language === 'es'
            ? 'Cada enlace abre la herramienta con los datos guardados. Imprime la página, proyecta los QR uno a uno o copia los enlaces en Aules.'
            : language === 'ca'
              ? 'Cada enllaç obre l’eina amb les dades desades. Imprimeix la pàgina, projecta els QR un a un o copia els enllaços a Aules.'
              : 'Cada enllaç obri la ferramenta amb les dades guardades. Imprimix la pàgina, projecta els QR un a un o copia els enllaços en Aules.',
      sessionTitleLabel:
        language === 'en' ? 'Session title' : language === 'es' ? 'Título de la sesión' : 'Títol de la sessió',
      sessionDefaultTitle:
        language === 'en'
          ? 'Session tools'
          : language === 'es'
            ? 'Herramientas de la sesión'
            : language === 'ca'
              ? 'Eines de la sessió'
              : 'Ferramentes de la sessió',
      sessionPrint:
        language === 'en' ? 'Print' : language === 'es' ? 'Imprimir' : language === 'ca' ? 'Imprimeix' : 'Imprimix',
      sessionCopyLinks: language === 'en' ? 'Copy links' : language === 'es' ? 'Copiar enlaces' : 'Copia els enllaços',
      sessionCopied:
        language === 'en'
          ? 'Links copied as a numbered list.'
          : language === 'es'
            ? 'Enlaces copiados en una lista numerada.'
            : 'Enllaços copiats en una llista numerada.',
    })
  }
}
