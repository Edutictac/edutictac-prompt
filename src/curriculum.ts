import type { Language } from './types'

export interface CurriculumProfile { id: string; level: string; subject: string; labels: Record<Language, string>; subjectLabels: Record<Language, string> }
export interface CurriculumElements { specificCompetences: string[]; assessmentCriteria: string[]; basicKnowledge: string[] }
// `subject` es el nombre valenciano y forma parte del id: no se traduce para que
// los prompts guardados conserven su perfil. El nombre visible va en `subjectLabels`.
const profile = (id: string, level: string, subject: string, es: string, ca: string, en = es, subjectEs = subject): CurriculumProfile => ({ id, level, subject, labels: { es, 'ca-valencia': ca, ca, en }, subjectLabels: { es: subjectEs, 'ca-valencia': subject, ca: subject, en: subjectEs } })

// Catálogo inicial CV-LOMLOE. Los elementos curriculares detallados se incorporarán
// como una segunda capa versionada, sin bloquear el uso general de la aplicación.
export const valencianProfiles: CurriculumProfile[] = [
  profile('cv-infantil', 'Infantil', '', 'Comunitat Valenciana · Infantil (2.º ciclo)', 'Comunitat Valenciana · Infantil (2n cicle)', 'Valencian Community · Early childhood (2nd cycle)'),
  profile('cv-primaria', 'Primaria', '', 'Comunitat Valenciana · Educación Primaria', 'Comunitat Valenciana · Educació Primària', 'Valencian Community · Primary education'),
  ...[['Coneixement del medi natural, social i cultural', 'Conocimiento del medio natural, social y cultural'], ['Educació artística', 'Educación artística'], ['Educació física', 'Educación física'], ['Llengua castellana i literatura', 'Lengua castellana y literatura'], ['Valencià: llengua i literatura', 'Valenciano: lengua y literatura'], ['Llengua estrangera', 'Lengua extranjera'], ['Matemàtiques', 'Matemáticas'], ['Educació en valors cívics i ètics', 'Educación en valores cívicos y éticos']].map(([subject, spanish]) => profile(`cv-primaria-${subject.toLowerCase().replace(/[^a-zà-ÿ]+/g, '-')}`, 'Primaria', subject, `Comunitat Valenciana · Primaria · ${spanish}`, `Comunitat Valenciana · Primària · ${subject}`, undefined, spanish)),
  ...[['Biologia i Geologia', 'Biología y Geología'], ['Física i Química', 'Física y Química'], ['Geografia i Història', 'Geografía e Historia'], ['Llengua Castellana i Literatura', 'Lengua Castellana y Literatura'], ['Valencià: Llengua i Literatura', 'Valenciano: Lengua y Literatura'], ['Llengua Estrangera', 'Lengua Extranjera'], ['Matemàtiques', 'Matemáticas'], ['Matemàtiques A', 'Matemáticas A'], ['Matemàtiques B', 'Matemáticas B'], ['Tecnologia i Digitalització', 'Tecnología y Digitalización'], ['Digitalització', 'Digitalización'], ['Educació Física', 'Educación Física'], ['Educació Plàstica, Visual i Audiovisual', 'Educación Plástica, Visual y Audiovisual'], ['Música', 'Música'], ['Economia i Emprenedoria', 'Economía y Emprendimiento'], ['Formació i Orientació Personal i Professional', 'Formación y Orientación Personal y Profesional'], ['Llatí', 'Latín'], ['Segona Llengua Estrangera', 'Segunda Lengua Extranjera'], ['Filosofia', 'Filosofía']].map(([subject, spanish]) => profile(`cv-eso-${subject.toLowerCase().replace(/[^a-zà-ÿ]+/g, '-')}`, 'ESO', subject, `Comunitat Valenciana · ESO · ${spanish}`, `Comunitat Valenciana · ESO · ${subject}`, undefined, spanish)),
  ...[['Filosofia', 'Filosofía'], ['Història d’Espanya', 'Historia de España'], ['Història de la Filosofia', 'Historia de la Filosofía'], ['Llengua Castellana i Literatura', 'Lengua Castellana y Literatura'], ['Valencià: Llengua i Literatura', 'Valenciano: Lengua y Literatura'], ['Llengua Estrangera', 'Lengua Extranjera'], ['Educació Física', 'Educación Física'], ['Matemàtiques I', 'Matemáticas I'], ['Matemàtiques II', 'Matemáticas II'], ['Matemàtiques Aplicades a les Ciències Socials I', 'Matemáticas Aplicadas a las Ciencias Sociales I'], ['Matemàtiques Aplicades a les Ciències Socials II', 'Matemáticas Aplicadas a las Ciencias Sociales II'], ['Biologia', 'Biología'], ['Física', 'Física'], ['Química', 'Química'], ['Geologia i Ciències Ambientals', 'Geología y Ciencias Ambientales'], ['Dibuix Tècnic', 'Dibujo Técnico'], ['Tecnologia i Enginyeria', 'Tecnología e Ingeniería'], ['Economia', 'Economía'], ['Geografia', 'Geografía'], ['Història de l’Art', 'Historia del Arte'], ['Literatura Universal', 'Literatura Universal'], ['Anàlisi Musical', 'Análisis Musical'], ['Arts Escèniques', 'Artes Escénicas'], ['Segona Llengua Estrangera', 'Segunda Lengua Extranjera']].map(([subject, spanish]) => profile(`cv-batx-${subject.toLowerCase().replace(/[^a-zà-ÿ]+/g, '-')}`, 'Bachillerato', subject, `Comunitat Valenciana · Bachillerato · ${spanish}`, `Comunitat Valenciana · Batxillerat · ${subject}`, undefined, spanish)),
  profile('cv-fp', 'Formación Profesional', '', 'Comunitat Valenciana · Formación Profesional', 'Comunitat Valenciana · Formació Professional', 'Valencian Community · Vocational education'),
  profile('cv-adults', 'Educación de personas adultas', '', 'Comunitat Valenciana · Educación de personas adultas', 'Comunitat Valenciana · Educació de persones adultes', 'Valencian Community · Adult education')
]

// Primera colección curricular detallada. Son opciones de apoyo para redactar el
// prompt; el profesorado puede editarlas y no sustituyen la programación oficial.
export const valencianCurriculumElements: Record<string, CurriculumElements> = {
  'cv-eso-tecnologia-i-digitalització': {
    specificCompetences: ['Identificar i resoldre problemes tecnològics de manera planificada.', 'Analitzar objectes i sistemes tecnològics aplicant criteris de sostenibilitat.', 'Desenvolupar solucions digitals i de programació per a necessitats concretes.', 'Comunicar i documentar el procés de disseny, construcció i avaluació.'],
    assessmentCriteria: ['Defineix el problema i proposa una solució viable.', 'Planifica, construeix i prova un prototip amb seguretat.', 'Utilitza materials, eines i recursos digitals de manera responsable.', 'Documenta el procés i justifica les decisions preses.'],
    basicKnowledge: ['Procés de resolució de problemes tecnològics.', 'Materials, estructures i mecanismes.', 'Electricitat i electrònica.', 'Programació, control i robòtica.', 'Tecnologia digital, dades i ciutadania digital.', 'Sostenibilitat i impacte social de la tecnologia.']
  },
  'cv-eso-matemàtiques': {
    specificCompetences: ['Interpretar i resoldre problemes matemàtics en contextos diversos.', 'Explorar, formular i validar conjectures amb raonament matemàtic.', 'Representar i comunicar idees matemàtiques amb llenguatges diversos.', 'Utilitzar eines tecnològiques per investigar i comprovar resultats.'],
    assessmentCriteria: ['Comprén la situació i selecciona estratègies adequades.', 'Realitza representacions i connexions entre conceptes.', 'Justifica el procés i comprova la validesa del resultat.', 'Comunica conclusions amb precisió i vocabulari matemàtic.'],
    basicKnowledge: ['Sentit numèric i de les operacions.', 'Sentit algebraic.', 'Sentit espacial i geomètric.', 'Relacions i funcions.', 'Sentit estocàstic.', 'Pensament computacional.']
  },
  'cv-infantil': {
    specificCompetences: [
      'Àrea I · Explorar i experimentar les necessitats i possibilitats del cos per mitjà del moviment en diversos espais, i mostrar seguretat, respecte i confiança.',
      'Àrea I · Manifestar i compartir emocions, sentiments, necessitats, interessos i pensaments en situacions de la vida quotidiana amb respecte i seguretat.',
      'Àrea I · Establir interaccions amb els seus iguals i els adults de l’entorn social més pròxim per mitjà de vivències quotidianes i valorar la importància de la cura, l’amistat, el respecte i l’empatia.',
      'Àrea I · Mostrar comportaments i actuacions concordes amb el propi benestar físic, mental, social i emocional, i assumir responsabilitats.',
      'Àrea I · Prendre iniciativa, planificar i seqüenciar la pròpia acció, de manera individual o en grup, en situacions quotidianes i de joc.',
      'Àrea II · Identificar algunes característiques bàsiques, propietats i atributs destacats en materials, objectes, fenòmens habituals i éssers vius mitjançant l’exploració sensorial de l’entorn.',
      'Àrea II · Dur a terme investigacions senzilles, individuals i grupals, orientades a explorar objectes, éssers vius, fenòmens i materials.',
      'Àrea II · Identificar i intervindre en les accions i situacions presents en la vida quotidiana que posen en risc la sostenibilitat de l’entorn pròxim.',
      'Àrea III · Explorar i utilitzar materials, tècniques, instruments i codis dels diversos llenguatges, i ajustar-ne l’ús a les situacions quotidianes de comunicació.',
      'Àrea III · Comprendre missatges i representacions senzilles de la vida quotidiana per mitjà de diversos llenguatges, a partir de l’experiència pròpia.',
      'Àrea III · Expressar sentiments, idees i pensaments propis utilitzant els diversos llenguatges de manera personal i creativa.',
      'Àrea III · Interactuar en situacions quotidianes utilitzant les dues llengües oficials en el context de l’aula.',
      'Àrea III · Mostrar interés per participar en situacions comunicatives orals del context escolar i familiar.',
      'Àrea III · Identificar, valorar i participar de les diferents manifestacions culturals presents en l’entorn.'
    ],
    assessmentCriteria: [
      'Desenvolupament progressiu de l’autonomia en les rutines, les cures i els hàbits saludables.',
      'Expressió i regulació progressiva de les emocions, necessitats i interessos en situacions quotidianes.',
      'Participació en relacions basades en el respecte, la cura, la igualtat i l’empatia.',
      'Exploració, observació, classificació i comparació d’objectes, materials, éssers vius i fenòmens de l’entorn.',
      'Participació en investigacions senzilles i comunicació dels descobriments mitjançant diversos llenguatges.',
      'Ús progressiu dels llenguatges corporal, verbal, artístic, musical i audiovisual per expressar-se i comunicar-se.'
    ],
    basicKnowledge: [
      'Àrea I · Parts del cos, moviment, coordinació, equilibri i possibilitats d’acció.',
      'Àrea I · Joc exploratori, sensorial, simbòlic, motor i de regles.',
      'Àrea I · Benestar emocional, identificació i regulació progressiva de les emocions.',
      'Àrea I · Hàbits d’alimentació, higiene, descans, autocura i cura de l’entorn.',
      'Àrea II · Exploració sensorial, propietats dels objectes i materials i relacions d’ordre, classificació i comparació.',
      'Àrea II · Nocions espacials, quantificadors, formes i mesures en contextos quotidians.',
      'Àrea II · Éssers vius, necessitats, canvis perceptibles i respecte per la natura.',
      'Àrea II · Curiositat, iniciació al pensament científic, formulació de preguntes i comprovació d’hipòtesis senzilles.',
      'Àrea III · Possibilitats sonores i expressives de la veu, el cos, els objectes i els instruments.',
      'Àrea III · Materials, colors, textures, tècniques i procediments plàstics.',
      'Àrea III · Llenguatge verbal, escolta, conversa, literatura infantil i desig de comunicar-se.',
      'Àrea III · Gest, moviment, mímica, dansa, teatre, música, imatge, so i eines digitals.',
      'Àrea III · Manifestacions culturals, festes, tradicions i patrimoni de l’entorn pròxim.'
    ]
  },
  'cv-primaria-coneixement-del-medi-natural-social-i-cultural': {
    specificCompetences: [
      'Utilitzar de forma guiada i delimitada dispositius i recursos digitals per a cercar informació, comunicar-se, col·laborar i crear contingut digital senzill amb seguretat i eficàcia.',
      'Desenvolupar projectes cooperatius delimitats i realitzar investigacions senzilles de naturalesa interdisciplinària amb la guia i ajuda del professorat.',
      'Plantejar i respondre preguntes sobre qüestions de la vida quotidiana relatives a l’entorn natural, social i cultural.',
      'Adoptar hàbits saludables de consum, alimentació, exercici i descans a partir del coneixement del cos i de l’entorn.',
      'Identificar, analitzar i proposar solucions als problemes generats per l’acció humana en l’entorn.',
      'Situar cronològicament i espacial els esdeveniments que marquen l’inici i el final dels grans períodes històrics.',
      'Identificar i descriure l’organització i l’estructura política i territorial municipal, de la Comunitat Valenciana i d’Espanya.',
      'Reconéixer alguns elements destacats del patrimoni natural, històric i cultural de la Comunitat Valenciana i d’altres territoris.'
    ],
    assessmentCriteria: [
      'Utilització segura i guiada de dispositius i recursos digitals per a buscar informació i comunicar-se.',
      'Participació en projectes cooperatius i investigacions senzilles, registrant observacions i comunicant resultats.',
      'Formulació de preguntes, prediccions i explicacions sobre fenòmens pròxims.',
      'Adopció d’hàbits saludables i responsables relacionats amb el cos, el consum i el benestar.',
      'Identificació de problemes ambientals i proposta d’accions de cura i sostenibilitat.',
      'Ús de referències temporals, espacials i territorials per interpretar l’entorn i la història.',
      'Reconeixement, valoració i respecte del patrimoni natural, històric i cultural.'
    ],
    basicKnowledge: [
      'Cultura científica · Iniciació a l’activitat científica, observació, prediccions, experimentació i registre de resultats.',
      'Cultura científica · Éssers vius, cos humà, hàbits saludables i relacions amb l’entorn.',
      'Cultura científica · Matèria, forces, energia, màquines i canvis en materials i objectes.',
      'Tecnologia i digitalització · Dispositius, aplicacions, cerca d’informació i creació de continguts digitals.',
      'Tecnologia i digitalització · Projectes cooperatius, pensament de disseny i pensament computacional.',
      'Societats i territoris · El temps històric, fonts, canvis i continuïtats en l’entorn pròxim.',
      'Societats i territoris · Organització política i territorial, convivència, participació i ciutadania.',
      'Societats i territoris · Patrimoni natural, històric i cultural de la Comunitat Valenciana.',
      'Societats i territoris · Sostenibilitat, consum responsable i cura de l’entorn.'
    ]
  }
}

// Versión en castellano de la misma colección, con las mismas claves y el mismo
// orden, para que el prompt no mezcle idiomas cuando la interfaz está en castellano.
export const spanishCurriculumElements: Record<string, CurriculumElements> = {
  'cv-eso-tecnologia-i-digitalització': {
    specificCompetences: ['Identificar y resolver problemas tecnológicos de manera planificada.', 'Analizar objetos y sistemas tecnológicos aplicando criterios de sostenibilidad.', 'Desarrollar soluciones digitales y de programación para necesidades concretas.', 'Comunicar y documentar el proceso de diseño, construcción y evaluación.'],
    assessmentCriteria: ['Define el problema y propone una solución viable.', 'Planifica, construye y prueba un prototipo con seguridad.', 'Utiliza materiales, herramientas y recursos digitales de manera responsable.', 'Documenta el proceso y justifica las decisiones tomadas.'],
    basicKnowledge: ['Proceso de resolución de problemas tecnológicos.', 'Materiales, estructuras y mecanismos.', 'Electricidad y electrónica.', 'Programación, control y robótica.', 'Tecnología digital, datos y ciudadanía digital.', 'Sostenibilidad e impacto social de la tecnología.']
  },
  'cv-eso-matemàtiques': {
    specificCompetences: ['Interpretar y resolver problemas matemáticos en contextos diversos.', 'Explorar, formular y validar conjeturas con razonamiento matemático.', 'Representar y comunicar ideas matemáticas con lenguajes diversos.', 'Utilizar herramientas tecnológicas para investigar y comprobar resultados.'],
    assessmentCriteria: ['Comprende la situación y selecciona estrategias adecuadas.', 'Realiza representaciones y conexiones entre conceptos.', 'Justifica el proceso y comprueba la validez del resultado.', 'Comunica conclusiones con precisión y vocabulario matemático.'],
    basicKnowledge: ['Sentido numérico y de las operaciones.', 'Sentido algebraico.', 'Sentido espacial y geométrico.', 'Relaciones y funciones.', 'Sentido estocástico.', 'Pensamiento computacional.']
  },
  'cv-infantil': {
    specificCompetences: [
      'Área I · Explorar y experimentar las necesidades y posibilidades del cuerpo por medio del movimiento en diversos espacios, y mostrar seguridad, respeto y confianza.',
      'Área I · Manifestar y compartir emociones, sentimientos, necesidades, intereses y pensamientos en situaciones de la vida cotidiana con respeto y seguridad.',
      'Área I · Establecer interacciones con sus iguales y con los adultos del entorno social más próximo por medio de vivencias cotidianas y valorar la importancia del cuidado, la amistad, el respeto y la empatía.',
      'Área I · Mostrar comportamientos y actuaciones acordes con el propio bienestar físico, mental, social y emocional, y asumir responsabilidades.',
      'Área I · Tomar la iniciativa, planificar y secuenciar la propia acción, de manera individual o en grupo, en situaciones cotidianas y de juego.',
      'Área II · Identificar algunas características básicas, propiedades y atributos destacados en materiales, objetos, fenómenos habituales y seres vivos mediante la exploración sensorial de los mismos.',
      'Área II · Llevar a cabo investigaciones sencillas, individuales y grupales, orientadas a explorar objetos, seres vivos, fenómenos y materiales.',
      'Área II · Identificar e intervenir en las acciones y situaciones presentes en la vida cotidiana que ponen en riesgo la sostenibilidad del entorno próximo.',
      'Área III · Explorar y utilizar materiales, técnicas, instrumentos y códigos de los diversos lenguajes, y ajustar su uso a las situaciones cotidianas de comunicación.',
      'Área III · Comprender mensajes y representaciones sencillas de la vida cotidiana por medio de diversos lenguajes, a partir de la experiencia propia.',
      'Área III · Expresar sentimientos, ideas y pensamientos propios utilizando los diversos lenguajes de manera personal y creativa.',
      'Área III · Interactuar en situaciones cotidianas utilizando las dos lenguas oficiales en el contexto del aula.',
      'Área III · Mostrar interés por participar en situaciones comunicativas orales del contexto escolar y familiar.',
      'Área III · Identificar, valorar y participar de las diferentes manifestaciones culturales presentes en el entorno.'
    ],
    assessmentCriteria: [
      'Desarrollo progresivo de la autonomía en las rutinas, los cuidados y los hábitos saludables.',
      'Expresión y regulación progresiva de las emociones, necesidades e intereses en situaciones cotidianas.',
      'Participación en relaciones basadas en el respeto, el cuidado, la igualdad y la empatía.',
      'Exploración, observación, clasificación y comparación de objetos, materiales, seres vivos y fenómenos del entorno.',
      'Participación en investigaciones sencillas y comunicación de los descubrimientos mediante diversos lenguajes.',
      'Uso progresivo de los lenguajes corporal, verbal, artístico, musical y audiovisual para expresarse y comunicarse.'
    ],
    basicKnowledge: [
      'Área I · Partes del cuerpo, movimiento, coordinación, equilibrio y posibilidades de acción.',
      'Área I · Juego exploratorio, sensorial, simbólico, motor y de reglas.',
      'Área I · Bienestar emocional, identificación y regulación progresiva de las emociones.',
      'Área I · Hábitos de alimentación, higiene, descanso, autocuidado y cuidado del entorno.',
      'Área II · Exploración sensorial, propiedades de los objetos y materiales y relaciones de orden, clasificación y comparación.',
      'Área II · Nociones espaciales, cuantificadores, formas y medidas en contextos cotidianos.',
      'Área II · Seres vivos, necesidades, cambios perceptibles y respeto por la naturaleza.',
      'Área II · Curiosidad, iniciación al pensamiento científico, formulación de preguntas y comprobación de hipótesis sencillas.',
      'Área III · Posibilidades sonoras y expresivas de la voz, el cuerpo, los objetos y los instrumentos.',
      'Área III · Materiales, colores, texturas, técnicas y procedimientos plásticos.',
      'Área III · Lenguaje verbal, escucha, conversación, literatura infantil y deseo de comunicarse.',
      'Área III · Gesto, movimiento, mímica, danza, teatro, música, imagen, sonido y herramientas digitales.',
      'Área III · Manifestaciones culturales, fiestas, tradiciones y patrimonio del entorno próximo.'
    ]
  },
  'cv-primaria-coneixement-del-medi-natural-social-i-cultural': {
    specificCompetences: [
      'Utilizar de forma guiada y delimitada dispositivos y recursos digitales para buscar información, comunicarse, colaborar y crear contenido digital sencillo con seguridad y eficacia.',
      'Desarrollar proyectos cooperativos delimitados y realizar investigaciones sencillas de naturaleza interdisciplinar con la guía y ayuda del profesorado.',
      'Plantear y responder preguntas sobre cuestiones de la vida cotidiana relativas al entorno natural, social y cultural.',
      'Adoptar hábitos saludables de consumo, alimentación, ejercicio y descanso a partir del conocimiento del cuerpo y del entorno.',
      'Identificar, analizar y proponer soluciones a los problemas generados por la acción humana en el entorno.',
      'Situar cronológica y espacialmente los acontecimientos que marcan el inicio y el final de los grandes periodos históricos.',
      'Identificar y describir la organización y la estructura política y territorial municipal, de la Comunitat Valenciana y de España.',
      'Reconocer algunos elementos destacados del patrimonio natural, histórico y cultural de la Comunitat Valenciana y de otros territorios.'
    ],
    assessmentCriteria: [
      'Utilización segura y guiada de dispositivos y recursos digitales para buscar información y comunicarse.',
      'Participación en proyectos cooperativos e investigaciones sencillas, registrando observaciones y comunicando resultados.',
      'Formulación de preguntas, predicciones y explicaciones sobre fenómenos próximos.',
      'Adopción de hábitos saludables y responsables relacionados con el cuerpo, el consumo y el bienestar.',
      'Identificación de problemas ambientales y propuesta de acciones de cuidado y sostenibilidad.',
      'Uso de referencias temporales, espaciales y territoriales para interpretar el entorno y la historia.',
      'Reconocimiento, valoración y respeto del patrimonio natural, histórico y cultural.'
    ],
    basicKnowledge: [
      'Cultura científica · Iniciación a la actividad científica, observación, predicciones, experimentación y registro de resultados.',
      'Cultura científica · Seres vivos, cuerpo humano, hábitos saludables y relaciones con el entorno.',
      'Cultura científica · Materia, fuerzas, energía, máquinas y cambios en materiales y objetos.',
      'Tecnología y digitalización · Dispositivos, aplicaciones, búsqueda de información y creación de contenidos digitales.',
      'Tecnología y digitalización · Proyectos cooperativos, pensamiento de diseño y pensamiento computacional.',
      'Sociedades y territorios · El tiempo histórico, fuentes, cambios y continuidades en el entorno próximo.',
      'Sociedades y territorios · Organización política y territorial, convivencia, participación y ciudadanía.',
      'Sociedades y territorios · Patrimonio natural, histórico y cultural de la Comunitat Valenciana.',
      'Sociedades y territorios · Sostenibilidad, consumo responsable y cuidado del entorno.'
    ]
  }
}

export function getCurriculumElements(profileId: string, level?: string, subject?: string, language: Language = 'ca-valencia'): CurriculumElements | undefined {
  const collection = language === 'es' ? spanishCurriculumElements : valencianCurriculumElements
  if (collection[profileId]) return collection[profileId]
  const matchingProfile = valencianProfiles.find(profile => profile.id !== profileId && profile.level === level && (profile.subject === subject || Object.values(profile.subjectLabels).includes(subject || '')) && collection[profile.id])
  return matchingProfile ? collection[matchingProfile.id] : undefined
}

export const subjectProfileFor = (level: string | undefined, subject: string | undefined) => valencianProfiles.find(profile => profile.level === level && profile.subject && (profile.subject === subject || Object.values(profile.subjectLabels).includes(subject || '')))
