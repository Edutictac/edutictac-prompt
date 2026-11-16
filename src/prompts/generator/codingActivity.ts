import { localizeOption } from '../../optionLocales'
import type { Language } from '../../types'

// Encargo de la plantilla «Ficha de actividad de programación». Va aparte de
// tasks.ts porque es un texto largo, con los apartados de la ficha, los niveles
// de cada herramienta y los casos de material físico o actividad desenchufada.
export const physicalCodingTools = [
  'LEGO Coding Express',
  'Tale-Bot',
  'Matatalab Coding Set',
  'Codey Rocky',
  'LEGO SPIKE Essential',
  'LEGO SPIKE Prime',
  'LEGO BricQ Motion Essential',
  'BBC micro:bit',
  'BOSON',
]
export const unpluggedTool = 'Sin dispositivos (actividad desenchufada)'

type Texts = {
  intro: (topic: string) => string
  rows: string
  roles: string
  tools: string
  idea: (idea: string) => string
  physical: string
  unplugged: string
  closing: string
}

const texts: Record<Language, Texts> = {
  es: {
    intro: (topic) =>
      `Diseña una ficha de actividad de programación sobre ${topic}. Otro docente tiene que poder aplicarla sin que nadie se la explique.`,
    rows: 'Entrégala como una tabla de dos columnas (Campo | Decisión) con estas filas, en este orden: Etapa y ciclo; Herramienta; Rol del alumnado; Objetivo de aprendizaje; Reglas del sistema (cómo funciona); Interacción (qué puede hacer el usuario); Retroalimentación (cómo responde el sistema); Consigna para el alumnado; Reto o ejemplo de partida; Evidencia (qué observar o recoger); Plan B sin dispositivos; Qué necesito para aplicarlo.',
    roles:
      'Roles del alumnado: usuario (interactúa con un programa hecho por otra persona), creador (modifica una plantilla o monta una secuencia con ayuda) y diseñador (decide el objetivo, las reglas y la interacción de un proyecto propio). Si no se indica ninguno, propón el más adecuado y explica por qué.',
    tools:
      'Nivel de cada herramienta: Blocs Junior es para Infantil y 1.er ciclo (secuencias cortas con predicción antes de ejecutar); Blockly Games, para 2.º ciclo (Laberinto y repetición); EduTicTac Blocs, para 2.º y 3.er ciclo (evento, movimiento y cambio de un valor; proyecto abierto). Respeta el nivel de la herramienta elegida.',
    idea: (idea) =>
      `Formato de partida: ${idea}. Adáptalo a la materia y al tema; no lo copies tal cual.`,
    physical:
      'El material elegido pertenece a la dotación del centro y su uso está pendiente de autorización. En «Qué necesito para aplicarlo» incluye la preparación (carga, piezas, conexión), los turnos de trabajo por equipos y, en «Plan B sin dispositivos», una versión en pantalla o desenchufada.',
    unplugged: 'La actividad es desenchufada: no uses pantallas ni dispositivos en ningún paso.',
    closing:
      'No incluyas datos identificables del alumnado. Escribe la consigna con lenguaje adecuado a la etapa. Marca con [REVISAR] todo lo que el docente deba comprobar o decidir antes de usar la ficha.',
  },
  'ca-valencia': {
    intro: (topic) =>
      `Dissenya una fitxa d’activitat de programació sobre ${topic}. Un altre docent ha de poder aplicar-la sense que ningú li l’explique.`,
    rows: 'Entrega-la com una taula de dues columnes (Camp | Decisió) amb estes files, en este ordre: Etapa i cicle; Eina; Rol de l’alumnat; Objectiu d’aprenentatge; Regles del sistema (com funciona); Interacció (què pot fer l’usuari); Retroalimentació (com respon el sistema); Consigna per a l’alumnat; Repte o exemple de partida; Evidència (què observar o arreplegar); Pla B sense dispositius; Què necessite per a aplicar-ho.',
    roles:
      'Rols de l’alumnat: usuari (interactua amb un programa fet per una altra persona), creador (modifica una plantilla o munta una seqüència amb ajuda) i dissenyador (decideix l’objectiu, les regles i la interacció d’un projecte propi). Si no se n’indica cap, proposa el més adequat i explica per què.',
    tools:
      'Nivell de cada eina: Blocs Junior és per a Infantil i 1r cicle (seqüències curtes amb predicció abans d’executar); Blockly Games, per a 2n cicle (Laberint i repetició); EduTicTac Blocs, per a 2n i 3r cicle (esdeveniment, moviment i canvi d’un valor; projecte obert). Respecta el nivell de l’eina triada.',
    idea: (idea) => `Format de partida: ${idea}. Adapta’l a la matèria i al tema; no el copies tal qual.`,
    physical:
      'El material triat pertany a la dotació del centre i el seu ús està pendent d’autorització. En «Què necessite per a aplicar-ho» inclou la preparació (càrrega, peces, connexió), els torns de treball per equips i, en «Pla B sense dispositius», una versió en pantalla o desendollada.',
    unplugged: 'L’activitat és desendollada: no uses pantalles ni dispositius en cap pas.',
    closing:
      'No incloguis dades identificables de l’alumnat. Escriu la consigna amb un llenguatge adequat a l’etapa. Marca amb [REVISAR] tot el que el docent haja de comprovar o decidir abans d’usar la fitxa.',
  },
  ca: {
    intro: (topic) =>
      `Dissenya una fitxa d’activitat de programació sobre ${topic}. Un altre docent l’ha de poder aplicar sense que ningú l’hi expliqui.`,
    rows: 'Lliura-la com una taula de dues columnes (Camp | Decisió) amb aquestes files, en aquest ordre: Etapa i cicle; Eina; Rol de l’alumnat; Objectiu d’aprenentatge; Regles del sistema (com funciona); Interacció (què pot fer l’usuari); Retroalimentació (com respon el sistema); Consigna per a l’alumnat; Repte o exemple de partida; Evidència (què observar o recollir); Pla B sense dispositius; Què necessito per aplicar-ho.',
    roles:
      'Rols de l’alumnat: usuari (interactua amb un programa fet per una altra persona), creador (modifica una plantilla o munta una seqüència amb ajuda) i dissenyador (decideix l’objectiu, les regles i la interacció d’un projecte propi). Si no se n’indica cap, proposa el més adequat i explica per què.',
    tools:
      'Nivell de cada eina: Blocs Junior és per a Infantil i 1r cicle (seqüències curtes amb predicció abans d’executar); Blockly Games, per a 2n cicle (Laberint i repetició); EduTicTac Blocs, per a 2n i 3r cicle (esdeveniment, moviment i canvi d’un valor; projecte obert). Respecta el nivell de l’eina triada.',
    idea: (idea) => `Format de partida: ${idea}. Adapta’l a la matèria i al tema; no el copiïs tal qual.`,
    physical:
      'El material triat pertany a la dotació del centre i el seu ús està pendent d’autorització. A «Què necessito per aplicar-ho» inclou la preparació (càrrega, peces, connexió), els torns de treball per equips i, a «Pla B sense dispositius», una versió en pantalla o desendollada.',
    unplugged: 'L’activitat és desendollada: no facis servir pantalles ni dispositius en cap pas.',
    closing:
      'No incloguis dades identificables de l’alumnat. Escriu la consigna amb un llenguatge adequat a l’etapa. Marca amb [REVISAR] tot el que el docent hagi de comprovar o decidir abans d’usar la fitxa.',
  },
  en: {
    intro: (topic) =>
      `Design a coding activity sheet about ${topic}. Another teacher must be able to run it without anyone explaining it.`,
    rows: 'Deliver it as a two-column table (Field | Decision) with these rows, in this order: Stage and cycle; Tool; Student role; Learning objective; System rules (how it works); Interaction (what the user can do); Feedback (how the system responds); Instructions for students; Starting challenge or example; Evidence (what to observe or collect); Plan B without devices; What I need to run it.',
    roles:
      'Student roles: user (interacts with a program made by someone else), creator (modifies a template or builds a sequence with help) and designer (decides the objective, rules and interaction of their own project). If none is given, suggest the most suitable one and explain why.',
    tools:
      'Level of each tool: Blocs Junior is for Infant and Year 1–2 (short sequences, predicting before running); Blockly Games, for Year 3–4 (Maze and repetition); EduTicTac Blocs, for Year 3–6 (event, movement and changing a value; open project). Respect the level of the chosen tool.',
    idea: (idea) => `Starting format: ${idea}. Adapt it to the subject and topic; do not copy it as is.`,
    physical:
      'The chosen material belongs to the school’s equipment and its use is pending authorisation. Under “What I need to run it” include preparation (charging, pieces, connection) and work turns for teams, and under “Plan B without devices” an on-screen or unplugged version.',
    unplugged: 'The activity is unplugged: do not use screens or devices at any step.',
    closing:
      'Do not include identifiable student data. Write the instructions in language suited to the stage. Mark with [REVIEW] everything the teacher must check or decide before using the sheet.',
  },
}

export function codingActivityTask(language: Language, topic: string, value: (key: string) => string): string {
  const t = texts[language]
  const tool = value('codingTool')
  const parts = [t.intro(topic), t.rows, t.roles, t.tools]
  const idea = value('activityIdea')
  if (idea && idea !== localizeOption('Decídelo tú', language)) parts.push(t.idea(idea))
  if (physicalCodingTools.includes(tool)) parts.push(t.physical)
  if (tool === localizeOption(unpluggedTool, language)) parts.push(t.unplugged)
  parts.push(t.closing)
  return parts.join('\n\n')
}
