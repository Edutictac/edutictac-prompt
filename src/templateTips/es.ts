import type { TemplateTip } from '../templateTips'

export const esTips: Record<string, TemplateTip> = {
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
    use: 'Pide a la IA que use LaTeX para mostrar las fórmulas y los cálculos ya compuestos dentro del material.',
    tip: 'Indica qué material necesitas. Para editar las ecuaciones en Word, elige DOCX: se solicitarán ecuaciones nativas editables.',
  },
  'learning-stations': {
    use: 'Organiza prácticas por estaciones con instrucciones y tiempos realistas.',
    tip: 'Indica el tiempo total, el tamaño de los grupos y los recursos disponibles.',
  },
  'activity-evidence': {
    use: 'Convierte una actividad que ya realizas en evidencias observables y formas de recogerlas.',
    tip: 'Describe qué hace el alumnado y añade los objetivos o criterios disponibles, sin datos personales.',
  },
  flashcards: {
    use: 'Crea tarjetas para practicar y recordar conceptos con preguntas y respuestas breves.',
    tip: 'Indica el tema y la cantidad de preguntas; puedes añadir un texto de referencia.',
  },
  'prompt-coach': {
    use: 'Prepara una conversación con una IA para crear o mejorar un prompt educativo.',
    tip: 'Escribe tu idea o pega un prompt. Copia el resultado y conversa con la IA que prefieras; la conversación ocurre allí.',
  },
}
