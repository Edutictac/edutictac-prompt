import type { Language } from './types'

// Para qué sirve cada herramienta y una pista de uso. Se muestra bajo el título
// del formulario. Toda plantilla nueva necesita su entrada en los cuatro idiomas.
export type TemplateTip = { use: string; tip: string }

export const templateTips: Record<Language, Record<string, TemplateTip>> = {
  es: {
    'learning-situation': {
      use: 'Diseñar una situación de aprendizaje completa: reto contextualizado, competencias, saberes, actividades y evaluación.',
      tip: 'Úsala al planificar una unidad. Elige un perfil curricular para que tome los elementos oficiales y revisa los códigos.',
    },
    lesson: {
      use: 'Preparar una sesión de clase concreta, con inicio, desarrollo, cierre y tiempos.',
      tip: 'Ideal para el día a día: indica la duración real y los recursos del aula para que sea viable.',
    },
    sequence: {
      use: 'Organizar varias sesiones encadenadas sobre un mismo tema, con progresión.',
      tip: 'Úsala para una quincena o una unidad corta; luego desarrolla cada sesión con «Sesión de clase».',
    },
    'competency-activity': {
      use: 'Crear una actividad que movilice una competencia en una situación real, no solo un ejercicio.',
      tip: 'Indica la competencia o el criterio que quieres trabajar: así la actividad apunta a algo evaluable.',
    },
    project: {
      use: 'Planificar un proyecto de aprendizaje basado en proyectos (ABP) con producto final, fases y roles.',
      tip: 'Pensada para varias semanas. Define bien el producto final: el resto del proyecto se ordena a partir de él.',
    },
    challenge: {
      use: 'Plantear un problema o reto abierto que el alumnado tenga que resolver investigando.',
      tip: 'Funciona mejor con un contexto cercano al alumnado (el barrio, el centro, la ciudad).',
    },
    rubric: {
      use: 'Crear una rúbrica analítica con niveles de logro observables a partir de tus criterios.',
      tip: 'Pega los criterios de evaluación de la fuente oficial (por ejemplo, desde NotebookLM): no dejes que la IA los invente. Para Aules elige CSV Aules / Moodle y la puntuación máxima (100 por defecto).',
    },
    checklist: {
      use: 'Hacer una lista de cotejo (sí/no) para comprobar si una tarea cumple unos requisitos.',
      tip: 'Útil para entregas y para la autoevaluación del alumnado antes de entregar.',
    },
    'rating-scale': {
      use: 'Crear una escala de valoración por grados (por ejemplo, de 1 a 4) para observar un desempeño.',
      tip: 'Más rápida de aplicar que una rúbrica; úsala cuando no necesitas describir cada nivel.',
    },
    'systematic-observation': {
      use: 'Preparar un registro de observación sistemática del trabajo en el aula.',
      tip: 'Ideal para trabajo en grupo, laboratorio u oral. Limita los indicadores a los que puedas observar de verdad en clase.',
    },
    portfolio: {
      use: 'Organizar un portafolio: qué evidencias se recogen, cuándo y cómo se reflexiona sobre ellas.',
      tip: 'Pensado para evaluar el proceso a lo largo de un trimestre o un proyecto.',
    },
    production: {
      use: 'Evaluar una producción del alumnado (texto, mural, vídeo…) con criterios claros.',
      tip: 'Describe bien la consigna de la tarea: los criterios saldrán de ahí.',
    },
    'written-test': {
      use: 'Preparar una prueba escrita con solucionario y puntuación de cada pregunta.',
      tip: 'Para evaluar, no para practicar: si quieres ejercicios de repaso, usa «Ficha de trabajo imprimible».',
    },
    product: {
      use: 'Evaluar el producto final de un proyecto o situación de aprendizaje.',
      tip: 'Combínala con «Proyecto ABP»: indica el producto que definiste allí.',
    },
    presentation: {
      use: 'Evaluar una exposición oral del alumnado.',
      tip: 'Para preparar las diapositivas del docente, usa «Presentación para clase».',
    },
    h5p: {
      use: 'Pedir el contenido de una actividad H5P (quiz, arrastrar, tarjetas…) para montarla en Aules o Moodle.',
      tip: 'La IA no crea el archivo .h5p: te da el contenido para pegarlo en el editor H5P o en EduTicTac Play.',
    },
    scorm: {
      use: 'Generar los archivos de un paquete SCORM 1.2 para subirlo a Aules o Moodle con nota al calificador.',
      tip: 'Guarda los archivos y comprime los archivos, no la carpeta. Pruébalo siempre en Aules con «Cambiar rol».',
    },
    'html-game': {
      use: 'Crear un juego o actividad interactiva en un único archivo HTML (huecos, emparejar, ordenar…).',
      tip: 'Lánzalo en Gemini Canvas o en Claude para verlo funcionando. Luego puedes convertirlo en SCORM.',
    },
    gift: {
      use: 'Generar un banco de preguntas en formato GIFT para importarlo en Aules o Moodle.',
      tip: 'Copia solo el código, guárdalo como .txt en UTF-8 e impórtalo en el banco de preguntas. Revisa las respuestas correctas.',
    },
    qti: {
      use: 'Generar preguntas en formato QTI 2.1 para plataformas que lo admiten.',
      tip: 'Para Aules o Moodle suele ser más sencillo GIFT; usa QTI si tu plataforma lo pide.',
    },
    'common-cartridge': {
      use: 'Preparar un paquete Common Cartridge con una actividad y sus recursos para importarlo en una plataforma.',
      tip: 'Uso avanzado: comprueba la importación en un curso de prueba antes de usarlo con el alumnado.',
    },
    feedback: {
      use: 'Redactar retroalimentación formativa para un trabajo: qué está bien, qué mejorar y siguiente paso.',
      tip: 'Describe el trabajo sin datos del alumnado. Pide que hable de la tarea, no de la persona.',
    },
    'three-levels': {
      use: 'Adaptar un mismo material a tres niveles (apoyo, base y ampliación) con el mismo objetivo.',
      tip: 'Pega tu texto y pide que mantenga los datos del original. Comprueba que la versión de apoyo no pierde ideas clave.',
    },
    'easy-reading': {
      use: 'Adaptar un texto a lectura fácil: frases cortas, una idea por frase y vocabulario frecuente.',
      tip: 'Es un borrador: la lectura fácil tiene normas propias y, si se publica, conviene validarla con lectores.',
    },
    'bias-check': {
      use: 'Revisar un texto o material en busca de sesgos de género, cultura o capacidad.',
      tip: 'Úsala antes de publicar o repartir un material, sobre todo si lo ha generado una IA.',
    },
    'glossary-support': {
      use: 'Crear un glosario con definiciones adaptadas y propuestas de apoyos visuales.',
      tip: 'Muy útil para alumnado recién llegado o con dificultades de vocabulario. Busca los pictogramas en ARASAAC.',
    },
    'family-note': {
      use: 'Redactar una comunicación breve y clara para las familias.',
      tip: 'Sin nombres ni datos del alumnado en el prompt: añádelos tú después, en tu correo o en Web Familia.',
    },
    'tutoring-script': {
      use: 'Preparar el guion de una tutoría o reunión con una familia: objetivos, preguntas y acuerdos.',
      tip: 'Describe la situación de forma general, sin datos identificables ni diagnósticos.',
    },
    free: {
      use: 'Escribir un prompt a medida con la estructura de rol, contexto, tarea, formato y límites.',
      tip: 'Úsalo cuando ninguna herramienta encaje. Si lo repites a menudo, guárdalo en tu biblioteca.',
    },
    'scientific-illustration': {
      use: 'Pedir una ilustración científica o didáctica a una IA de imágenes.',
      tip: 'Revisa la exactitud científica de la imagen: las IA de imágenes fallan en rótulos y detalles.',
    },
    infographic: {
      use: 'Diseñar una infografía educativa: estructura, textos breves y elementos visuales.',
      tip: 'Lánzala en Gemini Canvas, Canva o Copilot. Comprueba datos y textos antes de imprimir.',
    },
    'mind-map': {
      use: 'Crear un mapa mental o esquema de un tema, listo para dibujar o importar.',
      tip: 'En formato Mermaid se puede pegar en herramientas que lo dibujan solas. Útil como apoyo DUA.',
    },
    'explainer-video': {
      use: 'Planificar una película explicativa animada a partir de un documento: guion, escenas y voz.',
      tip: 'Trabaja por fases: aprueba el guion antes de pedir la animación. Es la herramienta más larga.',
    },
    'udl-review': {
      use: 'Revisar una actividad con los principios del DUA y detectar barreras.',
      tip: 'Pega la actividad tal como la darías. Quédate con las propuestas que puedas aplicar de verdad.',
    },
    'udl-matrix': {
      use: 'Planificar una unidad con una matriz DUA: opciones de implicación, representación y expresión.',
      tip: 'Úsala al diseñar, antes de crear materiales: te dice qué variantes preparar.',
    },
    'student-tutor': {
      use: 'Preparar un tutor socrático que ayude al alumnado a estudiar con preguntas, sin darle la respuesta.',
      tip: 'Pensada para que la use el alumnado. Revisa que el tutor no resuelva la tarea por ellos.',
    },
    analogies: {
      use: 'Explicar un concepto difícil con analogías cercanas al alumnado.',
      tip: 'Pide varias y quédate con la que mejor encaje; toda analogía tiene límites, señálalos en clase.',
    },
    participation: {
      use: 'Diseñar dinámicas para que todo el grupo participe, no solo los de siempre.',
      tip: 'Indica el tamaño del grupo y la duración: las dinámicas cambian mucho según el tiempo.',
    },
    'conflict-mediation': {
      use: 'Preparar una respuesta serena y restaurativa ante un conflicto en el aula.',
      tip: 'Describe la situación sin nombres ni culpables. La IA ayuda a preparar, la decisión es tuya.',
    },
    'multiple-choice': {
      use: 'Crear un test con distractores plausibles y la explicación de cada opción.',
      tip: 'Las explicaciones sirven de retroalimentación. Para Aules, usa mejor «Banco de preguntas GIFT».',
    },
    worksheet: {
      use: 'Preparar una ficha de trabajo para imprimir, con ejercicios variados y solucionario aparte.',
      tip: 'Pega tu texto para que use solo su información. Pásala a Word, retócala y revisa el solucionario.',
    },
    'illustrated-worksheet': {
      use: 'Pedir a una IA de imágenes una ficha A4 ilustrada con temática, para colorear o en color, con varias actividades.',
      tip: 'Escribe tú los ejercicios exactos: la IA de imágenes falla con números y palabras. Revisa la ficha antes de imprimir.',
    },
    'case-study': {
      use: 'Plantear un caso práctico o supuesto profesional con datos, tareas graduadas y solucionario.',
      tip: 'Muy indicada en FP y Bachillerato. Comprueba que los datos son coherentes y que el caso se puede resolver.',
    },
    'lab-guide': {
      use: 'Redactar el guion de una práctica de laboratorio o taller: material, seguridad, procedimiento y análisis.',
      tip: 'Indica el material que tienes de verdad. Revisa siempre las normas de seguridad con tu equipo y tus productos.',
    },
    'class-presentation': {
      use: 'Preparar el esquema de una presentación para explicar en clase, con notas para el docente.',
      tip: 'Pega el resultado en Copilot de PowerPoint, Gamma o Canva para crear las diapositivas.',
    },
    'escape-room': {
      use: 'Diseñar un escape room o breakout educativo con enigmas encadenados, pistas y soluciones.',
      tip: 'Ideal para repasar al final de una unidad. Pruébalo tú antes: un enigma ambiguo bloquea a todo el grupo.',
    },
    'reading-comprehension': {
      use: 'Preparar una lectura con vocabulario y preguntas literales, inferenciales y críticas.',
      tip: 'Pega tu texto para que no lo cambie. Sirve para cualquier materia, no solo para Lengua.',
    },
    'ethical-dilemma': {
      use: 'Crear dilemas éticos que enfrenten dos valores legítimos para debatir en clase.',
      tip: 'Útil en Filosofía, Valores o tutoría. No hay respuesta correcta: evalúa la argumentación.',
    },
    'study-plan': {
      use: 'Elaborar un plan de estudio semanal realista para el alumnado.',
      tip: 'Pensado para ESO y etapas superiores, sobre todo antes de exámenes. Indica el tiempo real disponible.',
    },
    'historical-interview': {
      use: 'Simular una entrevista con un personaje histórico para trabajar un periodo o un tema.',
      tip: 'Pide que se ciña a hechos documentados y que marque lo que es recreación.',
    },
    'coding-activity': {
      use: 'Preparar una ficha de actividad de robótica o programación con el robot o la herramienta del aula.',
      tip: 'Elige la herramienta que tenéis de verdad (Bee-Bot, Scratch, micro:bit…). Prueba la actividad antes de llevarla al aula.',
    },
    'code-coach': {
      use: 'Preparar un tutor que revise el código del alumnado y le guíe sin darle la solución.',
      tip: 'Pensado para que lo use el alumnado. Comprueba que pregunta y orienta en lugar de corregir directamente.',
    },
    'profile-adaptation': {
      use: 'Adaptar una tarea a un perfil concreto de alumnado sin bajar el objetivo de aprendizaje.',
      tip: 'Describe la tarea tal como la tienes. Añade fortalezas e intereses si los conoces: el prompt ajusta la forma, no la exigencia.',
    },
    'school-document': {
      use: 'Redactar actas, memorias, informes de seguimiento, planes de refuerzo, propuestas a dirección y respuestas a reclamaciones.',
      tip: 'Elige el tipo de documento y pega tus notas. Revisa y firma siempre antes de presentarlo: la IA no sustituye la responsabilidad del centro.',
    },
    'editable-latex': {
      use: 'Prepara fórmulas y cada paso de los cálculos en código LaTeX que puedes copiar y editar.',
      tip: 'Indica el editor de destino. En Word, pega cada fórmula en una ecuación en modo LaTeX; un PDF por sí solo no conserva las ecuaciones editables.',
    },
  },
  'ca-valencia': {
    'learning-situation': {
      use: 'Dissenyar una situació d’aprenentatge completa: repte contextualitzat, competències, sabers, activitats i avaluació.',
      tip: 'Usa-la en planificar una unitat. Tria un perfil curricular perquè prenga els elements oficials i revisa’n els codis.',
    },
    lesson: {
      use: 'Preparar una sessió de classe concreta, amb inici, desenvolupament, tancament i temps.',
      tip: 'Ideal per al dia a dia: indica la durada real i els recursos de l’aula perquè siga viable.',
    },
    sequence: {
      use: 'Organitzar diverses sessions encadenades sobre un mateix tema, amb progressió.',
      tip: 'Usa-la per a una quinzena o una unitat curta; després desenvolupa cada sessió amb «Sessió de classe».',
    },
    'competency-activity': {
      use: 'Crear una activitat que mobilitze una competència en una situació real, no sols un exercici.',
      tip: 'Indica la competència o el criteri que vols treballar: així l’activitat apunta a una cosa avaluable.',
    },
    project: {
      use: 'Planificar un projecte d’aprenentatge basat en projectes (ABP) amb producte final, fases i rols.',
      tip: 'Pensada per a diverses setmanes. Defineix bé el producte final: la resta del projecte s’ordena a partir d’ell.',
    },
    challenge: {
      use: 'Plantejar un problema o repte obert que l’alumnat haja de resoldre investigant.',
      tip: 'Funciona millor amb un context proper a l’alumnat (el barri, el centre, la ciutat).',
    },
    rubric: {
      use: 'Crear una rúbrica analítica amb nivells d’assoliment observables a partir dels teus criteris.',
      tip: 'Apega els criteris d’avaluació de la font oficial (per exemple, des de NotebookLM): no deixes que la IA se’ls invente. Per a Aules tria CSV Aules / Moodle i la puntuació màxima (100 per defecte).',
    },
    checklist: {
      use: 'Fer una llista de control (sí/no) per a comprovar si una tasca compleix uns requisits.',
      tip: 'Útil per a lliuraments i per a l’autoavaluació de l’alumnat abans de lliurar.',
    },
    'rating-scale': {
      use: 'Crear una escala de valoració per graus (per exemple, d’1 a 4) per a observar un acompliment.',
      tip: 'Més ràpida d’aplicar que una rúbrica; usa-la quan no necessites descriure cada nivell.',
    },
    'systematic-observation': {
      use: 'Preparar un registre d’observació sistemàtica del treball a l’aula.',
      tip: 'Ideal per a treball en grup, laboratori o oral. Limita els indicadors als que pugues observar de veritat a classe.',
    },
    portfolio: {
      use: 'Organitzar un portafolis: quines evidències es recullen, quan i com s’hi reflexiona.',
      tip: 'Pensat per a avaluar el procés al llarg d’un trimestre o d’un projecte.',
    },
    production: {
      use: 'Avaluar una producció de l’alumnat (text, mural, vídeo…) amb criteris clars.',
      tip: 'Descriu bé la consigna de la tasca: els criteris eixiran d’ahí.',
    },
    'written-test': {
      use: 'Preparar una prova escrita amb solucionari i puntuació de cada pregunta.',
      tip: 'Per a avaluar, no per a practicar: si vols exercicis de repàs, usa «Fitxa de treball imprimible».',
    },
    product: {
      use: 'Avaluar el producte final d’un projecte o situació d’aprenentatge.',
      tip: 'Combina-la amb «Projecte ABP»: indica el producte que hi vas definir.',
    },
    presentation: {
      use: 'Avaluar una exposició oral de l’alumnat.',
      tip: 'Per a preparar les diapositives del docent, usa «Presentació per a classe».',
    },
    h5p: {
      use: 'Demanar el contingut d’una activitat H5P (qüestionari, arrossegar, targetes…) per a muntar-la en Aules o Moodle.',
      tip: 'La IA no crea el fitxer .h5p: et dona el contingut per a apegar-lo en l’editor H5P o en EduTicTac Play.',
    },
    scorm: {
      use: 'Generar els fitxers d’un paquet SCORM 1.2 per a pujar-lo a Aules o Moodle amb nota al qualificador.',
      tip: 'Guarda els fitxers i comprimix els fitxers, no la carpeta. Prova’l sempre en Aules amb «Canvia el rol».',
    },
    'html-game': {
      use: 'Crear un joc o activitat interactiva en un únic fitxer HTML (buits, aparellar, ordenar…).',
      tip: 'Llança’l en Gemini Canvas o en Claude per a veure’l funcionant. Després el pots convertir en SCORM.',
    },
    gift: {
      use: 'Generar un banc de preguntes en format GIFT per a importar-lo en Aules o Moodle.',
      tip: 'Copia només el codi, guarda’l com a .txt en UTF-8 i importa’l en el banc de preguntes. Revisa les respostes correctes.',
    },
    qti: {
      use: 'Generar preguntes en format QTI 2.1 per a plataformes que l’admeten.',
      tip: 'Per a Aules o Moodle sol ser més senzill GIFT; usa QTI si la teua plataforma ho demana.',
    },
    'common-cartridge': {
      use: 'Preparar un paquet Common Cartridge amb una activitat i els seus recursos per a importar-lo en una plataforma.',
      tip: 'Ús avançat: comprova la importació en un curs de prova abans d’usar-lo amb l’alumnat.',
    },
    feedback: {
      use: 'Redactar retroalimentació formativa per a un treball: què està bé, què millorar i pas següent.',
      tip: 'Descriu el treball sense dades de l’alumnat. Demana que parle de la tasca, no de la persona.',
    },
    'three-levels': {
      use: 'Adaptar un mateix material a tres nivells (suport, base i ampliació) amb el mateix objectiu.',
      tip: 'Apega el teu text i demana que mantinga les dades de l’original. Comprova que la versió de suport no perd idees clau.',
    },
    'easy-reading': {
      use: 'Adaptar un text a lectura fàcil: frases curtes, una idea per frase i vocabulari freqüent.',
      tip: 'És un esborrany: la lectura fàcil té normes pròpies i, si es publica, convé validar-la amb lectors.',
    },
    'bias-check': {
      use: 'Revisar un text o material per a detectar biaixos de gènere, cultura o capacitat.',
      tip: 'Usa-la abans de publicar o repartir un material, sobretot si l’ha generat una IA.',
    },
    'glossary-support': {
      use: 'Crear un glossari amb definicions adaptades i propostes de suports visuals.',
      tip: 'Molt útil per a alumnat nouvingut o amb dificultats de vocabulari. Busca els pictogrames en ARASAAC.',
    },
    'family-note': {
      use: 'Redactar una comunicació breu i clara per a les famílies.',
      tip: 'Sense noms ni dades de l’alumnat en el prompt: afig-los tu després, en el teu correu o en Web Família.',
    },
    'tutoring-script': {
      use: 'Preparar el guió d’una tutoria o reunió amb una família: objectius, preguntes i acords.',
      tip: 'Descriu la situació de manera general, sense dades identificables ni diagnòstics.',
    },
    free: {
      use: 'Escriure un prompt a mida amb l’estructura de rol, context, tasca, format i límits.',
      tip: 'Usa’l quan cap eina no encaixe. Si el repetixes sovint, guarda’l en la teua biblioteca.',
    },
    'scientific-illustration': {
      use: 'Demanar una il·lustració científica o didàctica a una IA d’imatges.',
      tip: 'Revisa l’exactitud científica de la imatge: les IA d’imatges fallen en rètols i detalls.',
    },
    infographic: {
      use: 'Dissenyar una infografia educativa: estructura, textos breus i elements visuals.',
      tip: 'Llança-la en Gemini Canvas, Canva o Copilot. Comprova dades i textos abans d’imprimir.',
    },
    'mind-map': {
      use: 'Crear un mapa mental o esquema d’un tema, a punt per a dibuixar o importar.',
      tip: 'En format Mermaid es pot apegar en eines que el dibuixen soles. Útil com a suport DUA.',
    },
    'explainer-video': {
      use: 'Planificar una pel·lícula explicativa animada a partir d’un document: guió, escenes i veu.',
      tip: 'Treballa per fases: aprova el guió abans de demanar l’animació. És l’eina més llarga.',
    },
    'udl-review': {
      use: 'Revisar una activitat amb els principis del DUA i detectar barreres.',
      tip: 'Apega l’activitat tal com la donaries. Queda’t amb les propostes que pugues aplicar de veritat.',
    },
    'udl-matrix': {
      use: 'Planificar una unitat amb una matriu DUA: opcions d’implicació, representació i expressió.',
      tip: 'Usa-la en dissenyar, abans de crear materials: et diu quines variants preparar.',
    },
    'student-tutor': {
      use: 'Preparar un tutor socràtic que ajude l’alumnat a estudiar amb preguntes, sense donar-li la resposta.',
      tip: 'Pensada perquè la use l’alumnat. Revisa que el tutor no resolga la tasca per ells.',
    },
    analogies: {
      use: 'Explicar un concepte difícil amb analogies properes a l’alumnat.',
      tip: 'Demana’n diverses i queda’t amb la que millor encaixe; tota analogia té límits, assenyala’ls a classe.',
    },
    participation: {
      use: 'Dissenyar dinàmiques perquè tot el grup participe, no sols els de sempre.',
      tip: 'Indica la grandària del grup i la durada: les dinàmiques canvien molt segons el temps.',
    },
    'conflict-mediation': {
      use: 'Preparar una resposta serena i restaurativa davant d’un conflicte a l’aula.',
      tip: 'Descriu la situació sense noms ni culpables. La IA ajuda a preparar, la decisió és teua.',
    },
    'multiple-choice': {
      use: 'Crear un test amb distractors versemblants i l’explicació de cada opció.',
      tip: 'Les explicacions servixen de retroalimentació. Per a Aules, usa millor «Banc de preguntes GIFT».',
    },
    worksheet: {
      use: 'Preparar una fitxa de treball per a imprimir, amb exercicis variats i solucionari a banda.',
      tip: 'Apega el teu text perquè use només la seua informació. Passa-la a Word, retoca-la i revisa el solucionari.',
    },
    'illustrated-worksheet': {
      use: 'Demanar a una IA d’imatges una fitxa A4 il·lustrada amb temàtica, per a pintar o en color, amb diverses activitats.',
      tip: 'Escriu tu els exercicis exactes: la IA d’imatges s’equivoca amb números i paraules. Revisa la fitxa abans d’imprimir-la.',
    },
    'case-study': {
      use: 'Plantejar un cas pràctic o supòsit professional amb dades, tasques graduades i solucionari.',
      tip: 'Molt indicada en FP i Batxillerat. Comprova que les dades són coherents i que el cas es pot resoldre.',
    },
    'lab-guide': {
      use: 'Redactar el guió d’una pràctica de laboratori o taller: material, seguretat, procediment i anàlisi.',
      tip: 'Indica el material que tens de veritat. Revisa sempre les normes de seguretat amb el teu equip i els teus productes.',
    },
    'class-presentation': {
      use: 'Preparar l’esquema d’una presentació per a explicar a classe, amb notes per al docent.',
      tip: 'Apega el resultat en Copilot de PowerPoint, Gamma o Canva per a crear les diapositives.',
    },
    'escape-room': {
      use: 'Dissenyar un escape room o breakout educatiu amb enigmes encadenats, pistes i solucions.',
      tip: 'Ideal per a repassar al final d’una unitat. Prova’l tu abans: un enigma ambigu bloqueja tot el grup.',
    },
    'reading-comprehension': {
      use: 'Preparar una lectura amb vocabulari i preguntes literals, inferencials i crítiques.',
      tip: 'Apega el teu text perquè no el canvie. Servix per a qualsevol matèria, no sols per a Llengua.',
    },
    'ethical-dilemma': {
      use: 'Crear dilemes ètics que enfronten dos valors legítims per a debatre a classe.',
      tip: 'Útil en Filosofia, Valors o tutoria. No hi ha resposta correcta: avalua l’argumentació.',
    },
    'study-plan': {
      use: 'Elaborar un pla d’estudi setmanal realista per a l’alumnat.',
      tip: 'Pensat per a ESO i etapes superiors, sobretot abans d’exàmens. Indica el temps real disponible.',
    },
    'historical-interview': {
      use: 'Simular una entrevista amb un personatge històric per a treballar un període o un tema.',
      tip: 'Demana que s’atinga a fets documentats i que marque el que és recreació.',
    },
    'coding-activity': {
      use: 'Preparar una fitxa d’activitat de robòtica o programació amb el robot o l’eina de l’aula.',
      tip: 'Tria l’eina que teniu de veritat (Bee-Bot, Scratch, micro:bit…). Prova l’activitat abans de portar-la a l’aula.',
    },
    'code-coach': {
      use: 'Preparar un tutor que revise el codi de l’alumnat i el guie sense donar-li la solució.',
      tip: 'Pensat perquè l’use l’alumnat. Comprova que pregunta i orienta en lloc de corregir directament.',
    },
    'profile-adaptation': {
      use: 'Adaptar una tasca a un perfil concret d’alumnat sense baixar l’objectiu d’aprenentatge.',
      tip: 'Descriu la tasca tal com la tens. Afig fortaleses i interessos si els coneixes: el prompt ajusta la forma, no l’exigència.',
    },
    'school-document': {
      use: 'Redactar actes, memòries, informes de seguiment, plans de reforç, propostes a direcció i respostes a reclamacions.',
      tip: 'Tria el tipus de document i apega les teues notes. Revisa i firma sempre abans de presentar-lo: la IA no substitueix la responsabilitat del centre.',
    },
    'editable-latex': {
      use: 'Prepara fórmules i cada pas dels càlculs en codi LaTeX que es pot copiar i editar.',
      tip: 'Indica l’editor de destinació. En Word, copia cada fórmula en una equació en mode LaTeX; un PDF sol no conserva les equacions editables.',
    },
  },
  ca: {
    'learning-situation': {
      use: 'Dissenyar una situació d’aprenentatge completa: repte contextualitzat, competències, sabers, activitats i avaluació.',
      tip: 'Usa-la en planificar una unitat. Tria un perfil curricular perquè prengui els elements oficials i revisa’n els codis.',
    },
    lesson: {
      use: 'Preparar una sessió de classe concreta, amb inici, desenvolupament, tancament i temps.',
      tip: 'Ideal per al dia a dia: indica la durada real i els recursos de l’aula perquè sigui viable.',
    },
    sequence: {
      use: 'Organitzar diverses sessions encadenades sobre un mateix tema, amb progressió.',
      tip: 'Usa-la per a una quinzena o una unitat curta; després desenvolupa cada sessió amb «Sessió de classe».',
    },
    'competency-activity': {
      use: 'Crear una activitat que mobilitzi una competència en una situació real, no sols un exercici.',
      tip: 'Indica la competència o el criteri que vols treballar: així l’activitat apunta a una cosa avaluable.',
    },
    project: {
      use: 'Planificar un projecte d’aprenentatge basat en projectes (ABP) amb producte final, fases i rols.',
      tip: 'Pensada per a diverses setmanes. Defineix bé el producte final: la resta del projecte s’ordena a partir d’ell.',
    },
    challenge: {
      use: 'Plantejar un problema o repte obert que l’alumnat hagi de resoldre investigant.',
      tip: 'Funciona millor amb un context proper a l’alumnat (el barri, el centre, la ciutat).',
    },
    rubric: {
      use: 'Crear una rúbrica analítica amb nivells d’assoliment observables a partir dels teus criteris.',
      tip: 'Enganxa els criteris d’avaluació de la font oficial (per exemple, des de NotebookLM): no deixis que la IA se’ls inventi. Per a Aules tria CSV Aules / Moodle i la puntuació màxima (100 per defecte).',
    },
    checklist: {
      use: 'Fer una llista de control (sí/no) per a comprovar si una tasca compleix uns requisits.',
      tip: 'Útil per a lliuraments i per a l’autoavaluació de l’alumnat abans de lliurar.',
    },
    'rating-scale': {
      use: 'Crear una escala de valoració per graus (per exemple, d’1 a 4) per a observar un acompliment.',
      tip: 'Més ràpida d’aplicar que una rúbrica; usa-la quan no necessites descriure cada nivell.',
    },
    'systematic-observation': {
      use: 'Preparar un registre d’observació sistemàtica del treball a l’aula.',
      tip: 'Ideal per a treball en grup, laboratori o oral. Limita els indicadors als que puguis observar de veritat a classe.',
    },
    portfolio: {
      use: 'Organitzar un portafolis: quines evidències es recullen, quan i com s’hi reflexiona.',
      tip: 'Pensat per a avaluar el procés al llarg d’un trimestre o d’un projecte.',
    },
    production: {
      use: 'Avaluar una producció de l’alumnat (text, mural, vídeo…) amb criteris clars.',
      tip: 'Descriu bé la consigna de la tasca: els criteris en sortiran.',
    },
    'written-test': {
      use: 'Preparar una prova escrita amb solucionari i puntuació de cada pregunta.',
      tip: 'Per a avaluar, no per a practicar: si vols exercicis de repàs, usa «Fitxa de treball imprimible».',
    },
    product: {
      use: 'Avaluar el producte final d’un projecte o situació d’aprenentatge.',
      tip: 'Combina-la amb «Projecte ABP»: indica el producte que hi vas definir.',
    },
    presentation: {
      use: 'Avaluar una exposició oral de l’alumnat.',
      tip: 'Per a preparar les diapositives del docent, usa «Presentació per a classe».',
    },
    h5p: {
      use: 'Demanar el contingut d’una activitat H5P (qüestionari, arrossegar, targetes…) per muntar-la en Aules o Moodle.',
      tip: 'La IA no crea el fitxer .h5p: et dona el contingut per a enganxar-lo en l’editor H5P o en EduTicTac Play.',
    },
    scorm: {
      use: 'Generar els fitxers d’un paquet SCORM 1.2 per a pujar-lo a Aules o Moodle amb nota al qualificador.',
      tip: 'Desa els fitxers i comprimeix els fitxers, no la carpeta. Prova’l sempre en Aules amb «Canvia el rol».',
    },
    'html-game': {
      use: 'Crear un joc o activitat interactiva en un únic fitxer HTML (buits, aparellar, ordenar…).',
      tip: 'Llança’l en Gemini Canvas o en Claude per a veure’l funcionant. Després el pots convertir en SCORM.',
    },
    gift: {
      use: 'Generar un banc de preguntes en format GIFT per a importar-lo en Aules o Moodle.',
      tip: 'Copia només el codi, desa’l com a .txt en UTF-8 i importa’l en el banc de preguntes. Revisa les respostes correctes.',
    },
    qti: {
      use: 'Generar preguntes en format QTI 2.1 per a plataformes que l’admeten.',
      tip: 'Per a Aules o Moodle sol ser més senzill GIFT; usa QTI si la teva plataforma ho demana.',
    },
    'common-cartridge': {
      use: 'Preparar un paquet Common Cartridge amb una activitat i els seus recursos per a importar-lo en una plataforma.',
      tip: 'Ús avançat: comprova la importació en un curs de prova abans d’usar-lo amb l’alumnat.',
    },
    feedback: {
      use: 'Redactar retroalimentació formativa per a un treball: què està bé, què millorar i pas següent.',
      tip: 'Descriu el treball sense dades de l’alumnat. Demana que parli de la tasca, no de la persona.',
    },
    'three-levels': {
      use: 'Adaptar un mateix material a tres nivells (suport, base i ampliació) amb el mateix objectiu.',
      tip: 'Enganxa el teu text i demana que mantingui les dades de l’original. Comprova que la versió de suport no perd idees clau.',
    },
    'easy-reading': {
      use: 'Adaptar un text a lectura fàcil: frases curtes, una idea per frase i vocabulari freqüent.',
      tip: 'És un esborrany: la lectura fàcil té normes pròpies i, si es publica, convé validar-la amb lectors.',
    },
    'bias-check': {
      use: 'Revisar un text o material per a detectar biaixos de gènere, cultura o capacitat.',
      tip: 'Usa-la abans de publicar o repartir un material, sobretot si l’ha generat una IA.',
    },
    'glossary-support': {
      use: 'Crear un glossari amb definicions adaptades i propostes de suports visuals.',
      tip: 'Molt útil per a alumnat nouvingut o amb dificultats de vocabulari. Busca els pictogrames en ARASAAC.',
    },
    'family-note': {
      use: 'Redactar una comunicació breu i clara per a les famílies.',
      tip: 'Sense noms ni dades de l’alumnat en el prompt: afegeix-los tu després, en el teu correu o en Web Família.',
    },
    'tutoring-script': {
      use: 'Preparar el guió d’una tutoria o reunió amb una família: objectius, preguntes i acords.',
      tip: 'Descriu la situació de manera general, sense dades identificables ni diagnòstics.',
    },
    free: {
      use: 'Escriure un prompt a mida amb l’estructura de rol, context, tasca, format i límits.',
      tip: 'Usa’l quan cap eina no encaixi. Si el repeteixes sovint, desa’l a la teva biblioteca.',
    },
    'scientific-illustration': {
      use: 'Demanar una il·lustració científica o didàctica a una IA d’imatges.',
      tip: 'Revisa l’exactitud científica de la imatge: les IA d’imatges fallen en rètols i detalls.',
    },
    infographic: {
      use: 'Dissenyar una infografia educativa: estructura, textos breus i elements visuals.',
      tip: 'Llança-la en Gemini Canvas, Canva o Copilot. Comprova dades i textos abans d’imprimir.',
    },
    'mind-map': {
      use: 'Crear un mapa mental o esquema d’un tema, a punt per a dibuixar o importar.',
      tip: 'En format Mermaid es pot enganxar en eines que el dibuixen soles. Útil com a suport DUA.',
    },
    'explainer-video': {
      use: 'Planificar una pel·lícula explicativa animada a partir d’un document: guió, escenes i veu.',
      tip: 'Treballa per fases: aprova el guió abans de demanar l’animació. És l’eina més llarga.',
    },
    'udl-review': {
      use: 'Revisar una activitat amb els principis del DUA i detectar barreres.',
      tip: 'Enganxa l’activitat tal com la donaries. Queda’t amb les propostes que puguis aplicar de veritat.',
    },
    'udl-matrix': {
      use: 'Planificar una unitat amb una matriu DUA: opcions d’implicació, representació i expressió.',
      tip: 'Usa-la en dissenyar, abans de crear materials: et diu quines variants preparar.',
    },
    'student-tutor': {
      use: 'Preparar un tutor socràtic que ajudi l’alumnat a estudiar amb preguntes, sense donar-li la resposta.',
      tip: 'Pensada perquè la faci servir l’alumnat. Revisa que el tutor no resolgui la tasca per ells.',
    },
    analogies: {
      use: 'Explicar un concepte difícil amb analogies properes a l’alumnat.',
      tip: 'Demana’n diverses i queda’t amb la que millor encaixi; tota analogia té límits, assenyala’ls a classe.',
    },
    participation: {
      use: 'Dissenyar dinàmiques perquè tot el grup participi, no sols els de sempre.',
      tip: 'Indica la mida del grup i la durada: les dinàmiques canvien molt segons el temps.',
    },
    'conflict-mediation': {
      use: 'Preparar una resposta serena i restaurativa davant d’un conflicte a l’aula.',
      tip: 'Descriu la situació sense noms ni culpables. La IA ajuda a preparar, la decisió és teva.',
    },
    'multiple-choice': {
      use: 'Crear un test amb distractors versemblants i l’explicació de cada opció.',
      tip: 'Les explicacions serveixen de retroalimentació. Per a Aules, usa millor «Banc de preguntes GIFT».',
    },
    worksheet: {
      use: 'Preparar una fitxa de treball per a imprimir, amb exercicis variats i solucionari a banda.',
      tip: 'Enganxa el teu text perquè utilitzi només la seva informació. Passa-la a Word, retoca-la i revisa el solucionari.',
    },
    'illustrated-worksheet': {
      use: 'Demanar a una IA d’imatges una fitxa A4 il·lustrada amb temàtica, per pintar o en color, amb diverses activitats.',
      tip: 'Escriu tu els exercicis exactes: la IA d’imatges s’equivoca amb números i paraules. Revisa la fitxa abans d’imprimir-la.',
    },
    'case-study': {
      use: 'Plantejar un cas pràctic o supòsit professional amb dades, tasques graduades i solucionari.',
      tip: 'Molt indicada en FP i Batxillerat. Comprova que les dades són coherents i que el cas es pot resoldre.',
    },
    'lab-guide': {
      use: 'Redactar el guió d’una pràctica de laboratori o taller: material, seguretat, procediment i anàlisi.',
      tip: 'Indica el material que tens de veritat. Revisa sempre les normes de seguretat amb el teu equip i els teus productes.',
    },
    'class-presentation': {
      use: 'Preparar l’esquema d’una presentació per a explicar a classe, amb notes per al docent.',
      tip: 'Enganxa el resultat en Copilot de PowerPoint, Gamma o Canva per a crear les diapositives.',
    },
    'escape-room': {
      use: 'Dissenyar un escape room o breakout educatiu amb enigmes encadenats, pistes i solucions.',
      tip: 'Ideal per a repassar al final d’una unitat. Prova’l tu abans: un enigma ambigu bloqueja tot el grup.',
    },
    'reading-comprehension': {
      use: 'Preparar una lectura amb vocabulari i preguntes literals, inferencials i crítiques.',
      tip: 'Enganxa el teu text perquè no el canviï. Serveix per a qualsevol matèria, no sols per a Llengua.',
    },
    'ethical-dilemma': {
      use: 'Crear dilemes ètics que enfronten dos valors legítims per a debatre a classe.',
      tip: 'Útil en Filosofia, Valors o tutoria. No hi ha resposta correcta: avalua l’argumentació.',
    },
    'study-plan': {
      use: 'Elaborar un pla d’estudi setmanal realista per a l’alumnat.',
      tip: 'Pensat per a ESO i etapes superiors, sobretot abans d’exàmens. Indica el temps real disponible.',
    },
    'historical-interview': {
      use: 'Simular una entrevista amb un personatge històric per a treballar un període o un tema.',
      tip: 'Demana que s’atingui a fets documentats i que marqui el que és recreació.',
    },
    'coding-activity': {
      use: 'Preparar una fitxa d’activitat de robòtica o programació amb el robot o l’eina de l’aula.',
      tip: 'Tria l’eina que teniu de veritat (Bee-Bot, Scratch, micro:bit…). Prova l’activitat abans de portar-la a l’aula.',
    },
    'code-coach': {
      use: 'Preparar un tutor que revisi el codi de l’alumnat i el guiï sense donar-li la solució.',
      tip: 'Pensat perquè el faci servir l’alumnat. Comprova que pregunta i orienta en lloc de corregir directament.',
    },
    'profile-adaptation': {
      use: 'Adaptar una tasca a un perfil concret d’alumnat sense baixar l’objectiu d’aprenentatge.',
      tip: 'Descriu la tasca tal com la tens. Afegeix fortaleses i interessos si els coneixes: el prompt ajusta la forma, no l’exigència.',
    },
    'school-document': {
      use: 'Redactar actes, memòries, informes de seguiment, plans de reforç, propostes a direcció i respostes a reclamacions.',
      tip: 'Tria el tipus de document i enganxa les teves notes. Revisa i signa sempre abans de presentar-lo: la IA no substitueix la responsabilitat del centre.',
    },
    'editable-latex': {
      use: 'Prepara fórmules i cada pas dels càlculs en codi LaTeX que es pot copiar i editar.',
      tip: 'Indica l’editor de destinació. En Word, copia cada fórmula en una equació en mode LaTeX; un PDF sol no conserva les equacions editables.',
    },
  },
  en: {
    'learning-situation': {
      use: 'Design a complete learning situation: a contextualised challenge, competences, knowledge, activities and assessment.',
      tip: 'Use it when planning a unit. Choose a curriculum profile so it uses the official elements, and check the codes.',
    },
    lesson: {
      use: 'Prepare a specific lesson with an opening, main part, closure and timings.',
      tip: 'Ideal for everyday planning: state the real duration and classroom resources so it is feasible.',
    },
    sequence: {
      use: 'Organise several linked lessons on the same topic, with progression.',
      tip: 'Use it for a fortnight or a short unit; then develop each lesson with «Lesson».',
    },
    'competency-activity': {
      use: 'Create an activity that puts a competence to work in a real situation, not just an exercise.',
      tip: 'State the competence or criterion you want to work on so the activity targets something assessable.',
    },
    project: {
      use: 'Plan a project-based learning project with a final product, phases and roles.',
      tip: 'Meant for several weeks. Define the final product clearly: the rest of the project follows from it.',
    },
    challenge: {
      use: 'Set an open problem or challenge that students solve by investigating.',
      tip: 'Works best with a context close to students (the neighbourhood, the school, the town).',
    },
    rubric: {
      use: 'Create an analytic rubric with observable achievement levels from your criteria.',
      tip: 'Paste the assessment criteria from the official source (for example, from NotebookLM): do not let the AI invent them.',
    },
    checklist: {
      use: 'Make a yes/no checklist to verify whether a task meets its requirements.',
      tip: 'Useful for submissions and for student self-assessment before handing in.',
    },
    'rating-scale': {
      use: 'Create a graded rating scale (for example, 1 to 4) to observe a performance.',
      tip: 'Quicker to apply than a rubric; use it when you do not need to describe each level.',
    },
    'systematic-observation': {
      use: 'Prepare a systematic observation record for classroom work.',
      tip: 'Ideal for group work, lab or oral tasks. Keep to indicators you can really observe in class.',
    },
    portfolio: {
      use: 'Organise a portfolio: what evidence is collected, when, and how students reflect on it.',
      tip: 'Meant to assess the process over a term or a project.',
    },
    production: {
      use: 'Assess a student production (text, poster, video…) with clear criteria.',
      tip: 'Describe the task instructions well: the criteria will come from them.',
    },
    'written-test': {
      use: 'Prepare a written test with an answer key and marks for each question.',
      tip: 'For assessment, not practice: for revision exercises, use «Printable worksheet».',
    },
    product: {
      use: 'Assess the final product of a project or learning situation.',
      tip: 'Combine it with «PBL project»: state the product you defined there.',
    },
    presentation: {
      use: 'Assess a student oral presentation.',
      tip: 'To prepare the teacher’s slides, use «Classroom presentation».',
    },
    h5p: {
      use: 'Get the content of an H5P activity (quiz, drag and drop, flashcards…) to build it in Moodle.',
      tip: 'The AI does not create the .h5p file: it gives you the content to paste into the H5P editor or EduTicTac Play.',
    },
    scorm: {
      use: 'Generate the files of a SCORM 1.2 package to upload to Moodle with grades sent to the gradebook.',
      tip: 'Save the files and zip the files, not the folder. Always test it in Moodle using «Switch role».',
    },
    'html-game': {
      use: 'Create a game or interactive activity in a single HTML file (gap fill, matching, ordering…).',
      tip: 'Run it in Gemini Canvas or Claude to see it working. You can then turn it into SCORM.',
    },
    gift: {
      use: 'Generate a question bank in GIFT format to import into Moodle.',
      tip: 'Copy only the code, save it as a UTF-8 .txt file and import it into the question bank. Check the correct answers.',
    },
    qti: {
      use: 'Generate questions in QTI 2.1 format for platforms that support it.',
      tip: 'For Moodle, GIFT is usually simpler; use QTI if your platform requires it.',
    },
    'common-cartridge': {
      use: 'Prepare a Common Cartridge package with an activity and its resources to import into a platform.',
      tip: 'Advanced use: test the import in a sandbox course before using it with students.',
    },
    feedback: {
      use: 'Write formative feedback for a piece of work: what is good, what to improve and the next step.',
      tip: 'Describe the work without student data. Ask it to talk about the task, not the person.',
    },
    'three-levels': {
      use: 'Adapt the same material to three levels (support, core and extension) with the same objective.',
      tip: 'Paste your text and ask it to keep the original data. Check that the support version keeps the key ideas.',
    },
    'easy-reading': {
      use: 'Adapt a text to easy-to-read: short sentences, one idea per sentence and common vocabulary.',
      tip: 'It is a draft: easy-to-read has its own rules and, if published, should be validated with readers.',
    },
    'bias-check': {
      use: 'Review a text or material for gender, cultural or ability bias.',
      tip: 'Use it before publishing or handing out material, especially if an AI produced it.',
    },
    'glossary-support': {
      use: 'Create a glossary with adapted definitions and suggested visual supports.',
      tip: 'Very useful for newly arrived students or those with vocabulary difficulties. Find pictograms in ARASAAC.',
    },
    'family-note': {
      use: 'Write a short, clear message for families.',
      tip: 'No names or student data in the prompt: add them yourself afterwards in your email or messaging tool.',
    },
    'tutoring-script': {
      use: 'Prepare a script for a tutorial or family meeting: aims, questions and agreements.',
      tip: 'Describe the situation in general terms, without identifiable data or diagnoses.',
    },
    free: {
      use: 'Write a custom prompt with role, context, task, format and limits.',
      tip: 'Use it when no tool fits. If you repeat it often, save it in your library.',
    },
    'scientific-illustration': {
      use: 'Request a scientific or teaching illustration from an image AI.',
      tip: 'Check the scientific accuracy: image AIs often get labels and details wrong.',
    },
    infographic: {
      use: 'Design an educational infographic: structure, short texts and visual elements.',
      tip: 'Run it in Gemini Canvas, Canva or Copilot. Check data and texts before printing.',
    },
    'mind-map': {
      use: 'Create a mind map or outline of a topic, ready to draw or import.',
      tip: 'In Mermaid format it can be pasted into tools that draw it automatically. Useful as a UDL support.',
    },
    'explainer-video': {
      use: 'Plan an animated explainer film from a document: script, scenes and voice.',
      tip: 'Work in phases: approve the script before asking for the animation. It is the longest tool.',
    },
    'udl-review': {
      use: 'Review an activity using UDL principles and detect barriers.',
      tip: 'Paste the activity as you would give it. Keep the proposals you can really apply.',
    },
    'udl-matrix': {
      use: 'Plan a unit with a UDL matrix: options for engagement, representation and expression.',
      tip: 'Use it while designing, before creating materials: it tells you which variants to prepare.',
    },
    'student-tutor': {
      use: 'Prepare a Socratic tutor that helps students study through questions, without giving the answer.',
      tip: 'Meant for students to use. Check that the tutor does not solve the task for them.',
    },
    analogies: {
      use: 'Explain a difficult concept with analogies close to students’ experience.',
      tip: 'Ask for several and keep the best fit; every analogy has limits, point them out in class.',
    },
    participation: {
      use: 'Design routines so the whole group takes part, not just the usual few.',
      tip: 'State the group size and duration: routines change a lot depending on time.',
    },
    'conflict-mediation': {
      use: 'Prepare a calm, restorative response to a classroom conflict.',
      tip: 'Describe the situation without names or blame. The AI helps you prepare; the decision is yours.',
    },
    'multiple-choice': {
      use: 'Create a quiz with plausible distractors and an explanation for each option.',
      tip: 'The explanations work as feedback. For Moodle, «GIFT question bank» is better.',
    },
    worksheet: {
      use: 'Prepare a printable worksheet with varied exercises and a separate answer key.',
      tip: 'Paste your text so it only uses that information. Move it to Word, adjust it and check the answer key.',
    },
    'illustrated-worksheet': {
      use: 'Ask an image AI for an illustrated, themed A4 worksheet, for colouring or in colour, with several activities.',
      tip: 'Write the exact exercises yourself: image AIs get numbers and words wrong. Check the sheet before printing.',
    },
    'case-study': {
      use: 'Set a case study or professional scenario with data, graded tasks and an answer key.',
      tip: 'Well suited to vocational and upper secondary courses. Check that the data are consistent and the case can be solved.',
    },
    'lab-guide': {
      use: 'Write a lab or workshop practical guide: materials, safety, procedure and analysis.',
      tip: 'List the materials you actually have. Always check safety rules against your equipment and products.',
    },
    'class-presentation': {
      use: 'Prepare the outline of a presentation to teach in class, with speaker notes.',
      tip: 'Paste the result into Copilot in PowerPoint, Gamma or Canva to build the slides.',
    },
    'escape-room': {
      use: 'Design an educational escape room or breakout with chained puzzles, hints and solutions.',
      tip: 'Ideal for revision at the end of a unit. Try it yourself first: an ambiguous puzzle blocks the whole group.',
    },
    'reading-comprehension': {
      use: 'Prepare a reading with vocabulary and literal, inferential and critical questions.',
      tip: 'Paste your text so it is not changed. It works for any subject, not just language.',
    },
    'ethical-dilemma': {
      use: 'Create ethical dilemmas that set two legitimate values against each other for class debate.',
      tip: 'Useful in philosophy, ethics or tutorial time. There is no right answer: assess the reasoning.',
    },
    'study-plan': {
      use: 'Build a realistic weekly study plan for students.',
      tip: 'Meant for secondary and beyond, especially before exams. State the real time available.',
    },
    'historical-interview': {
      use: 'Simulate an interview with a historical figure to explore a period or topic.',
      tip: 'Ask it to stick to documented facts and mark what is recreation.',
    },
    'coding-activity': {
      use: 'Prepare a robotics or coding activity sheet for the robot or tool you have in class.',
      tip: 'Choose the tool you actually have (Bee-Bot, Scratch, micro:bit…). Try the activity before class.',
    },
    'code-coach': {
      use: 'Prepare a tutor that reviews students’ code and guides them without giving the solution.',
      tip: 'Meant for students to use. Check that it asks and guides rather than fixing the code.',
    },
    'profile-adaptation': {
      use: 'Adapt a task to a specific learner profile without lowering the learning objective.',
      tip: 'Describe the task as you have it. Add strengths and interests if you know them: the prompt adjusts the approach, not the demand.',
    },
    'school-document': {
      use: 'Draft minutes, activity reports, progress reports, support plans, proposals to the leadership team and replies to complaints.',
      tip: 'Choose the document type and paste your notes. Always review and sign before submitting: AI does not replace the school’s responsibility.',
    },
    'editable-latex': {
      use: 'Prepare formulas and every calculation step as copyable, editable LaTeX source.',
      tip: 'Name the destination editor. In Word, paste each formula into an equation in LaTeX mode; a PDF alone does not preserve editable equations.',
    },
  },
}

export const templateTip = (id: string, language: Language): TemplateTip | undefined => templateTips[language][id]
