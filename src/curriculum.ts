import type { Language } from './types'

export interface CurriculumProfile { id: string; level: string; subject: string; labels: Record<Language, string> }
export interface CurriculumElements { specificCompetences: string[]; assessmentCriteria: string[]; basicKnowledge: string[] }
const profile = (id: string, level: string, subject: string, es: string, ca: string, en = es): CurriculumProfile => ({ id, level, subject, labels: { es, 'ca-valencia': ca, ca, en } })

// Catálogo inicial CV-LOMLOE. Los elementos curriculares detallados se incorporarán
// como una segunda capa versionada, sin bloquear el uso general de la aplicación.
export const valencianProfiles: CurriculumProfile[] = [
  profile('cv-infantil', 'Infantil', '', 'Comunitat Valenciana · Infantil (2.º ciclo)', 'Comunitat Valenciana · Infantil (2n cicle)', 'Valencian Community · Early childhood (2nd cycle)'),
  profile('cv-primaria', 'Primaria', '', 'Comunitat Valenciana · Educación Primaria', 'Comunitat Valenciana · Educació Primària', 'Valencian Community · Primary education'),
  ...[['Coneixement del medi natural, social i cultural', 'Coneixement del medi natural, social i cultural'], ['Educació artística', 'Educació artística'], ['Educació física', 'Educació física'], ['Llengua castellana i literatura', 'Llengua castellana i literatura'], ['Valencià: llengua i literatura', 'Valencià: llengua i literatura'], ['Llengua estrangera', 'Llengua estrangera'], ['Matemàtiques', 'Matemàtiques'], ['Educació en valors cívics i ètics', 'Educació en valors cívics i ètics']].map(([subject, valencian]) => profile(`cv-primaria-${subject.toLowerCase().replace(/[^a-zà-ÿ]+/g, '-')}`, 'Primaria', subject, `Comunitat Valenciana · Primaria · ${subject}`, `Comunitat Valenciana · Primària · ${valencian}`)),
  ...[['Biologia i Geologia', 'Biologia i Geologia'], ['Física i Química', 'Física i Química'], ['Geografia i Història', 'Geografia i Història'], ['Llengua Castellana i Literatura', 'Llengua Castellana i Literatura'], ['Valencià: Llengua i Literatura', 'Valencià: Llengua i Literatura'], ['Llengua Estrangera', 'Llengua Estrangera'], ['Matemàtiques', 'Matemàtiques'], ['Matemàtiques A', 'Matemàtiques A'], ['Matemàtiques B', 'Matemàtiques B'], ['Tecnologia i Digitalització', 'Tecnologia i Digitalització'], ['Digitalització', 'Digitalització'], ['Educació Física', 'Educació Física'], ['Educació Plàstica, Visual i Audiovisual', 'Educació Plàstica, Visual i Audiovisual'], ['Música', 'Música'], ['Economia i Emprenedoria', 'Economia i Emprenedoria'], ['Formació i Orientació Personal i Professional', 'Formació i Orientació Personal i Professional'], ['Llatí', 'Llatí'], ['Segona Llengua Estrangera', 'Segona Llengua Estrangera'], ['Filosofia', 'Filosofia']].map(([subject, valencian]) => profile(`cv-eso-${subject.toLowerCase().replace(/[^a-zà-ÿ]+/g, '-')}`, 'ESO', subject, `Comunitat Valenciana · ESO · ${subject}`, `Comunitat Valenciana · ESO · ${valencian}`)),
  ...[['Filosofia', 'Filosofia'], ['Història d’Espanya', 'Història d’Espanya'], ['Història de la Filosofia', 'Història de la Filosofia'], ['Llengua Castellana i Literatura', 'Llengua Castellana i Literatura'], ['Valencià: Llengua i Literatura', 'Valencià: Llengua i Literatura'], ['Llengua Estrangera', 'Llengua Estrangera'], ['Educació Física', 'Educació Física'], ['Matemàtiques I', 'Matemàtiques I'], ['Matemàtiques II', 'Matemàtiques II'], ['Matemàtiques Aplicades a les Ciències Socials I', 'Matemàtiques Aplicades a les Ciències Socials I'], ['Matemàtiques Aplicades a les Ciències Socials II', 'Matemàtiques Aplicades a les Ciències Socials II'], ['Biologia', 'Biologia'], ['Física', 'Física'], ['Química', 'Química'], ['Geologia i Ciències Ambientals', 'Geologia i Ciències Ambientals'], ['Dibuix Tècnic', 'Dibuix Tècnic'], ['Tecnologia i Enginyeria', 'Tecnologia i Enginyeria'], ['Economia', 'Economia'], ['Geografia', 'Geografia'], ['Història de l’Art', 'Història de l’Art'], ['Literatura Universal', 'Literatura Universal'], ['Anàlisi Musical', 'Anàlisi Musical'], ['Arts Escèniques', 'Arts Escèniques'], ['Segona Llengua Estrangera', 'Segona Llengua Estrangera']].map(([subject, valencian]) => profile(`cv-batx-${subject.toLowerCase().replace(/[^a-zà-ÿ]+/g, '-')}`, 'Bachillerato', subject, `Comunitat Valenciana · Bachillerato · ${subject}`, `Comunitat Valenciana · Batxillerat · ${valencian}`)),
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

export function getCurriculumElements(profileId: string, level?: string, subject?: string): CurriculumElements | undefined {
  if (valencianCurriculumElements[profileId]) return valencianCurriculumElements[profileId]
  const matchingProfile = valencianProfiles.find(profile => profile.id !== profileId && profile.level === level && profile.subject === subject && valencianCurriculumElements[profile.id])
  return matchingProfile ? valencianCurriculumElements[matchingProfile.id] : undefined
}
