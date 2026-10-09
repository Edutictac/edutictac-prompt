import type { Language } from './types'

// Guía de uso de la vista «Ayuda». Cada idioma tiene las mismas secciones en el
// mismo orden; los nombres de botones citados deben coincidir con locales.ts.
// Un punto es [etiqueta, texto]: la etiqueta se muestra en negrita y puede ir vacía.
export type HelpPoint = [string, string]
export type HelpSection = { id: string; title: string; intro?: string; points?: HelpPoint[]; example?: { before: string; after: string }; tip?: string }
export type HelpGuide = { title: string; lead: string; contents: string; beforeLabel: string; afterLabel: string; sections: HelpSection[] }

const es: HelpGuide = {
  title: 'Guía de uso',
  lead: 'EduTicTac Prompt no es una IA: te ayuda a escribir un buen encargo para la IA que ya usas. Aquí tienes lo esencial para sacarle partido.',
  contents: 'En esta guía',
  beforeLabel: 'Antes',
  afterLabel: 'Después',
  sections: [
    {
      id: 'first-prompt', title: 'Tu primer prompt en tres pasos',
      points: [
        ['1. Elige un punto de partida.', 'Un caso de «Empieza aquí» en la portada, con el formulario ya relleno, o una herramienta del catálogo. Puedes filtrar por categoría o buscar por nombre.'],
        ['2. Rellena el formulario.', 'El modo «Sencillo» muestra solo los campos esenciales; cambia a «Avanzado» para afinar. «Cargar un ejemplo» rellena el formulario con un caso real para ver cómo funciona.'],
        ['3. Genera y llévalo a la IA.', 'Pulsa «Generar prompt», revisa el texto en la vista previa (se puede editar) y usa «Abrir en» para llevarlo a la IA. También puedes «Copiar» o «Guardar».']
      ],
      tip: 'La primera respuesta de la IA es un borrador. Debajo del prompt, en «Para afinar el resultado», tienes peticiones listas para pegar en la misma conversación.'
    },
    {
      id: 'fields', title: 'Los campos que más mejoran el resultado',
      points: [
        ['Nivel educativo y curso:', 'la IA ajusta el vocabulario, la extensión y los ejemplos.'],
        ['Objetivos:', 'qué debe saber hacer el alumnado al acabar. Cuanto más concretos, mejor: «calcular el coste de un electrodoméstico» funciona mejor que «entender la factura».'],
        ['Barreras del contexto (DUA):', 'describe las barreras del entorno, no diagnósticos ni nombres. Por ejemplo, «textos largos sin apoyo visual».'],
        ['Contexto del grupo y la situación:', 'tiempo disponible, recursos y conocimientos previos.'],
        ['Criterios de calidad y Restricciones:', 'lo que debe cumplir el resultado: extensión, tono, que incluya solucionario…'],
        ['Formato de salida:', 'tabla, Markdown, GIFT para Aules… Así no tienes que pedirlo después.'],
        ['Perfil curricular (opcional):', 'añade competencias, criterios de evaluación y saberes básicos del currículo.']
      ],
      example: {
        before: 'Hazme un ejercicio de fracciones.',
        after: 'Seis problemas de fracciones para 5.º de Primaria, ambientados en recetas de cocina, de dificultad creciente, con solucionario y una versión con apoyo visual.'
      }
    },
    {
      id: 'open-ai', title: 'Abrir el prompt en una IA',
      points: [
        ['ChatGPT, Claude y Perplexity', 'reciben el prompt ya escrito en una conversación nueva.'],
        ['Copilot y Gemini', 'no aceptan texto en el enlace: se abren vacíos y el prompt ya está copiado. Pégalo con Ctrl+V (en el móvil, mantén pulsado y elige «Pegar»).'],
        ['Prompts muy largos:', 'los enlaces largos se recortan, así que en ese caso todas las IA lo reciben por el portapapeles.'],
        ['Orden de los botones:', 'primero aparece la IA que has elegido en el formulario o, si no, la última que has usado.'],
        ['Desde la biblioteca:', 'cada prompt guardado tiene sus propios botones «Abrir en».']
      ]
    },
    {
      id: 'library', title: 'Tu biblioteca',
      points: [
        ['Guardar:', 'pon título, categoría, etiquetas y notas para encontrarlo después. Marca como «Favorito» los que más uses.'],
        ['Editar:', 'abre el prompt con su formulario. «Actualizar» sobrescribe el guardado; «Guardar como nuevo» crea otro y conserva el original.'],
        ['Duplicar:', 'una copia rápida para hacer variantes (otro curso, otro tema).'],
        ['Exportar MD:', 'descarga un prompt como documento de texto para compartirlo o archivarlo.'],
        ['Exportar JSON e Importar:', 'copia de seguridad de toda la biblioteca, o para pasarla a otro navegador sin usar cuenta.'],
        ['Buscar:', 'busca en el título, el texto, las etiquetas y las notas de tus prompts.']
      ]
    },
    {
      id: 'account', title: 'Cuenta y sincronización',
      points: [
        ['Sin cuenta', 'todo funciona, también sin conexión, y los prompts se guardan solo en este navegador.'],
        ['Con «Iniciar sesión»', '(cuenta EduTicTac o Google) la biblioteca se guarda también en el servidor de EduTicTac y la tienes en todos tus dispositivos.'],
        ['Se sincroniza sola:', 'al guardar, al actualizar, al iniciar sesión y al recuperar la conexión.'],
        ['Dos dispositivos abiertos a la vez:', 'los cambios hechos en el otro llegan al volver a entrar o al pulsar «Sincronizar biblioteca».'],
        ['Cuidado:', 'borrar los datos del navegador elimina la copia local. Si no usas cuenta, exporta antes la biblioteca en JSON.']
      ]
    },
    {
      id: 'good-use', title: 'Buen uso',
      points: [
        ['Datos del alumnado:', 'no escribas nombres, datos personales ni información sensible. Describe el grupo de forma general.'],
        ['Revisa siempre', 'lo que devuelve la IA: datos, referencias, posibles sesgos y adecuación al grupo.'],
        ['Evaluación:', 'no uses las respuestas de la IA para calificar de forma automática.'],
        ['Transparencia:', 'añade una nota en los materiales hechos con ayuda de IA, por ejemplo: «Material elaborado con ayuda de IA y revisado por el profesorado».'],
        ['Herramientas:', 'usa preferentemente las IA autorizadas por tu administración educativa.']
      ]
    },
    {
      id: 'faq', title: 'Preguntas frecuentes',
      points: [
        ['No se abre la IA.', 'El navegador puede haber bloqueado la ventana nueva. Permite las ventanas emergentes para este sitio, o abre la IA tú y pega el prompt, que ya está copiado.'],
        ['No veo un prompt en otro dispositivo.', 'Comprueba que has iniciado sesión con la misma cuenta en los dos y pulsa «Sincronizar biblioteca».'],
        ['¿Cómo la instalo como app?', 'En Chrome o Edge, usa el botón de instalar de la barra de direcciones o el menú › Instalar. En iPhone o iPad, en Safari: Compartir › Añadir a pantalla de inicio. Después funciona sin conexión.'],
        ['Aparece «Hay una nueva versión de la aplicación».', 'Pulsa «Actualizar la aplicación» para cargarla.'],
        ['¿La app usa IA o envía lo que escribo?', 'No. El prompt se genera en tu dispositivo. Solo se envían tus prompts guardados al servidor si inicias sesión para sincronizarlos.']
      ]
    }
  ]
}

const va: HelpGuide = {
  title: 'Guia d’ús',
  lead: 'EduTicTac Prompt no és una IA: t’ajuda a escriure un bon encàrrec per a la IA que ja uses. Ací tens el que és essencial per a traure-li profit.',
  contents: 'En esta guia',
  beforeLabel: 'Abans',
  afterLabel: 'Després',
  sections: [
    {
      id: 'first-prompt', title: 'El teu primer prompt en tres passos',
      points: [
        ['1. Tria un punt de partida.', 'Un cas de «Comença ací» en la portada, amb el formulari ja emplenat, o una eina del catàleg. Pots filtrar per categoria o buscar pel nom.'],
        ['2. Ompli el formulari.', 'El mode «Senzill» mostra només els camps essencials; canvia a «Avançat» per a afinar. «Carrega un exemple» ompli el formulari amb un cas real per a veure com funciona.'],
        ['3. Genera’l i porta’l a la IA.', 'Prem «Generar prompt», revisa el text en la vista prèvia (es pot editar) i usa «Obri en» per a portar-lo a la IA. També pots «Copiar» o «Guardar».']
      ],
      tip: 'La primera resposta de la IA és un esborrany. Davall del prompt, en «Per a afinar el resultat», tens peticions preparades per a enganxar en la mateixa conversa.'
    },
    {
      id: 'fields', title: 'Els camps que més milloren el resultat',
      points: [
        ['Nivell educatiu i curs:', 'la IA ajusta el vocabulari, l’extensió i els exemples.'],
        ['Objectius:', 'què ha de saber fer l’alumnat en acabar. Com més concrets, millor: «calcular el cost d’un electrodomèstic» funciona millor que «entendre la factura».'],
        ['Barreres del context (DUA):', 'descriu les barreres de l’entorn, no diagnòstics ni noms. Per exemple, «textos llargs sense suport visual».'],
        ['Context del grup i la situació:', 'temps disponible, recursos i coneixements previs.'],
        ['Criteris de qualitat i Restriccions:', 'el que ha de complir el resultat: extensió, to, que incloga solucionari…'],
        ['Format d’eixida:', 'taula, Markdown, GIFT per a Aules… Així no has de demanar-ho després.'],
        ['Perfil curricular (opcional):', 'afig competències, criteris d’avaluació i sabers bàsics del currículum.']
      ],
      example: {
        before: 'Fes-me un exercici de fraccions.',
        after: 'Sis problemes de fraccions per a 5é de Primària, ambientats en receptes de cuina, de dificultat creixent, amb solucionari i una versió amb suport visual.'
      }
    },
    {
      id: 'open-ai', title: 'Obrir el prompt en una IA',
      points: [
        ['ChatGPT, Claude i Perplexity', 'reben el prompt ja escrit en una conversa nova.'],
        ['Copilot i Gemini', 'no accepten text en l’enllaç: s’obrin buits i el prompt ja està copiat. Enganxa’l amb Ctrl+V (en el mòbil, mantín premut i tria «Enganxa»).'],
        ['Prompts molt llargs:', 'els enllaços llargs es retallen, així que en eixe cas totes les IA el reben pel porta-retalls.'],
        ['Ordre dels botons:', 'primer apareix la IA que has triat en el formulari o, si no, l’última que has usat.'],
        ['Des de la biblioteca:', 'cada prompt guardat té els seus propis botons «Obri en».']
      ]
    },
    {
      id: 'library', title: 'La teua biblioteca',
      points: [
        ['Guardar:', 'posa-li títol, categoria, etiquetes i notes per a trobar-lo després. Marca com a «Favorit» els que més uses.'],
        ['Edita:', 'obri el prompt amb el seu formulari. «Actualitza» sobreescriu el guardat; «Guarda com a nou» en crea un altre i conserva l’original.'],
        ['Duplicar:', 'una còpia ràpida per a fer variants (un altre curs, un altre tema).'],
        ['Exportar MD:', 'descarrega un prompt com a document de text per a compartir-lo o arxivar-lo.'],
        ['Exportar JSON i Importar:', 'còpia de seguretat de tota la biblioteca, o per a passar-la a un altre navegador sense usar compte.'],
        ['Buscar:', 'busca en el títol, el text, les etiquetes i les notes dels teus prompts.']
      ]
    },
    {
      id: 'account', title: 'Compte i sincronització',
      points: [
        ['Sense compte', 'tot funciona, també sense connexió, i els prompts es guarden només en este navegador.'],
        ['Amb «Inicia sessió»', '(compte EduTicTac o Google) la biblioteca es guarda també en el servidor d’EduTicTac i la tens en tots els teus dispositius.'],
        ['Se sincronitza sola:', 'en guardar, en actualitzar, en iniciar sessió i en recuperar la connexió.'],
        ['Dos dispositius oberts alhora:', 'els canvis fets en l’altre arriben en tornar a entrar o en prémer «Sincronitza la biblioteca».'],
        ['Compte:', 'esborrar les dades del navegador elimina la còpia local. Si no uses compte, exporta abans la biblioteca en JSON.']
      ]
    },
    {
      id: 'good-use', title: 'Bon ús',
      points: [
        ['Dades de l’alumnat:', 'no escrigues noms, dades personals ni informació sensible. Descriu el grup de manera general.'],
        ['Revisa sempre', 'el que torna la IA: dades, referències, possibles biaixos i adequació al grup.'],
        ['Avaluació:', 'no uses les respostes de la IA per a qualificar de manera automàtica.'],
        ['Transparència:', 'afig una nota en els materials fets amb ajuda d’IA, per exemple: «Material elaborat amb ajuda d’IA i revisat pel professorat».'],
        ['Eines:', 'usa preferentment les IA autoritzades per la teua administració educativa.']
      ]
    },
    {
      id: 'faq', title: 'Preguntes freqüents',
      points: [
        ['No s’obri la IA.', 'El navegador pot haver bloquejat la finestra nova. Permet les finestres emergents per a este lloc, o obri tu la IA i enganxa el prompt, que ja està copiat.'],
        ['No veig un prompt en un altre dispositiu.', 'Comprova que has iniciat sessió amb el mateix compte en els dos i prem «Sincronitza la biblioteca».'],
        ['Com la instal·le com a aplicació?', 'En Chrome o Edge, usa el botó d’instal·lar de la barra d’adreces o el menú › Instal·la. En iPhone o iPad, en Safari: Compartix › Afig a la pantalla d’inici. Després funciona sense connexió.'],
        ['Apareix «Hi ha una nova versió de l’aplicació».', 'Prem «Actualitza l’aplicació» per a carregar-la.'],
        ['L’aplicació usa IA o envia el que escric?', 'No. El prompt es genera en el teu dispositiu. Només s’envien els teus prompts guardats al servidor si inicies sessió per a sincronitzar-los.']
      ]
    }
  ]
}

const ca: HelpGuide = {
  title: 'Guia d’ús',
  lead: 'EduTicTac Prompt no és una IA: t’ajuda a escriure un bon encàrrec per a la IA que ja fas servir. Aquí tens el que és essencial per treure’n profit.',
  contents: 'En aquesta guia',
  beforeLabel: 'Abans',
  afterLabel: 'Després',
  sections: [
    {
      id: 'first-prompt', title: 'El teu primer prompt en tres passos',
      points: [
        ['1. Tria un punt de partida.', 'Un cas de «Comença aquí» a la portada, amb el formulari ja emplenat, o una eina del catàleg. Pots filtrar per categoria o cercar pel nom.'],
        ['2. Omple el formulari.', 'El mode «Senzill» mostra només els camps essencials; canvia a «Avançat» per afinar. «Carrega un exemple» omple el formulari amb un cas real per veure com funciona.'],
        ['3. Genera’l i porta’l a la IA.', 'Prem «Genera el prompt», revisa el text a la vista prèvia (es pot editar) i fes servir «Obre a» per portar-lo a la IA. També pots fer «Copia» o «Desa».']
      ],
      tip: 'La primera resposta de la IA és un esborrany. Sota el prompt, a «Per afinar el resultat», tens peticions a punt per enganxar a la mateixa conversa.'
    },
    {
      id: 'fields', title: 'Els camps que més milloren el resultat',
      points: [
        ['Nivell educatiu i curs:', 'la IA ajusta el vocabulari, l’extensió i els exemples.'],
        ['Objectius:', 'què ha de saber fer l’alumnat en acabar. Com més concrets, millor: «calcular el cost d’un electrodomèstic» funciona millor que «entendre la factura».'],
        ['Barreres del context (DUA):', 'descriu les barreres de l’entorn, no diagnòstics ni noms. Per exemple, «textos llargs sense suport visual».'],
        ['Context del grup i la situació:', 'temps disponible, recursos i coneixements previs.'],
        ['Criteris de qualitat i Restriccions:', 'el que ha de complir el resultat: extensió, to, que inclogui solucionari…'],
        ['Format de sortida:', 'taula, Markdown, GIFT per a Aules… Així no l’has de demanar després.'],
        ['Perfil curricular (opcional):', 'afegeix competències, criteris d’avaluació i sabers bàsics del currículum.']
      ],
      example: {
        before: 'Fes-me un exercici de fraccions.',
        after: 'Sis problemes de fraccions per a 5è de Primària, ambientats en receptes de cuina, de dificultat creixent, amb solucionari i una versió amb suport visual.'
      }
    },
    {
      id: 'open-ai', title: 'Obrir el prompt en una IA',
      points: [
        ['ChatGPT, Claude i Perplexity', 'reben el prompt ja escrit en una conversa nova.'],
        ['Copilot i Gemini', 'no accepten text a l’enllaç: s’obren buits i el prompt ja està copiat. Enganxa’l amb Ctrl+V (al mòbil, mantén premut i tria «Enganxa»).'],
        ['Prompts molt llargs:', 'els enllaços llargs es retallen, així que en aquest cas totes les IA el reben pel porta-retalls.'],
        ['Ordre dels botons:', 'primer apareix la IA que has triat al formulari o, si no, l’última que has fet servir.'],
        ['Des de la biblioteca:', 'cada prompt desat té els seus propis botons «Obre a».']
      ]
    },
    {
      id: 'library', title: 'La teva biblioteca',
      points: [
        ['Desa:', 'posa-hi títol, categoria, etiquetes i notes per trobar-lo després. Marca com a «Preferit» els que facis servir més.'],
        ['Edita:', 'obre el prompt amb el seu formulari. «Actualitza» sobreescriu el desat; «Desa com a nou» en crea un altre i conserva l’original.'],
        ['Duplica:', 'una còpia ràpida per fer variants (un altre curs, un altre tema).'],
        ['Exporta MD:', 'descarrega un prompt com a document de text per compartir-lo o arxivar-lo.'],
        ['Exporta JSON i Importa:', 'còpia de seguretat de tota la biblioteca, o per passar-la a un altre navegador sense fer servir compte.'],
        ['Cerca:', 'cerca al títol, al text, a les etiquetes i a les notes dels teus prompts.']
      ]
    },
    {
      id: 'account', title: 'Compte i sincronització',
      points: [
        ['Sense compte', 'tot funciona, també sense connexió, i els prompts es desen només en aquest navegador.'],
        ['Amb «Inicia sessió»', '(compte EduTicTac o Google) la biblioteca es desa també al servidor d’EduTicTac i la tens a tots els teus dispositius.'],
        ['Se sincronitza sola:', 'en desar, en actualitzar, en iniciar sessió i en recuperar la connexió.'],
        ['Dos dispositius oberts alhora:', 'els canvis fets a l’altre arriben en tornar a entrar o en prémer «Sincronitza la biblioteca».'],
        ['Compte:', 'esborrar les dades del navegador elimina la còpia local. Si no fas servir compte, exporta abans la biblioteca en JSON.']
      ]
    },
    {
      id: 'good-use', title: 'Bon ús',
      points: [
        ['Dades de l’alumnat:', 'no escriguis noms, dades personals ni informació sensible. Descriu el grup de manera general.'],
        ['Revisa sempre', 'el que retorna la IA: dades, referències, possibles biaixos i adequació al grup.'],
        ['Avaluació:', 'no facis servir les respostes de la IA per qualificar de manera automàtica.'],
        ['Transparència:', 'afegeix una nota als materials fets amb ajuda d’IA, per exemple: «Material elaborat amb ajuda d’IA i revisat pel professorat».'],
        ['Eines:', 'fes servir preferentment les IA autoritzades per la teva administració educativa.']
      ]
    },
    {
      id: 'faq', title: 'Preguntes freqüents',
      points: [
        ['No s’obre la IA.', 'El navegador pot haver bloquejat la finestra nova. Permet les finestres emergents per a aquest lloc, o obre tu la IA i enganxa el prompt, que ja està copiat.'],
        ['No veig un prompt en un altre dispositiu.', 'Comprova que has iniciat sessió amb el mateix compte als dos i prem «Sincronitza la biblioteca».'],
        ['Com la instal·lo com a aplicació?', 'A Chrome o Edge, fes servir el botó d’instal·lar de la barra d’adreces o el menú › Instal·la. A l’iPhone o l’iPad, a Safari: Comparteix › Afegeix a la pantalla d’inici. Després funciona sense connexió.'],
        ['Apareix «Hi ha una nova versió de l’aplicació».', 'Prem «Actualitza l’aplicació» per carregar-la.'],
        ['L’aplicació fa servir IA o envia el que escric?', 'No. El prompt es genera al teu dispositiu. Només s’envien els teus prompts desats al servidor si inicies sessió per sincronitzar-los.']
      ]
    }
  ]
}

const en: HelpGuide = {
  title: 'User guide',
  lead: 'EduTicTac Prompt is not an AI: it helps you write a good brief for the AI you already use. Here is what you need to get the most out of it.',
  contents: 'In this guide',
  beforeLabel: 'Before',
  afterLabel: 'After',
  sections: [
    {
      id: 'first-prompt', title: 'Your first prompt in three steps',
      points: [
        ['1. Pick a starting point.', 'A “Start here” case on the home page, with the form already filled in, or a tool from the catalogue. You can filter by category or search by name.'],
        ['2. Fill in the form.', '“Simple” mode shows only the essential fields; switch to “Advanced” to fine-tune. “Load an example” fills the form with a real case so you can see how it works.'],
        ['3. Generate it and take it to the AI.', 'Press “Generate prompt”, check the text in the preview (you can edit it) and use “Open in” to send it to the AI. You can also “Copy” or “Save” it.']
      ],
      tip: 'The AI’s first answer is a draft. Below the prompt, under “To refine the result”, there are ready-made requests to paste into the same conversation.'
    },
    {
      id: 'fields', title: 'The fields that improve the result most',
      points: [
        ['Educational level and year:', 'the AI adjusts vocabulary, length and examples.'],
        ['Objectives:', 'what students should be able to do at the end. The more specific, the better: “work out what an appliance costs to run” works better than “understand the bill”.'],
        ['Contextual barriers (UDL):', 'describe barriers in the environment, not diagnoses or names. For example, “long texts with no visual support”.'],
        ['Group and situation context:', 'time available, resources and prior knowledge.'],
        ['Quality criteria and Constraints:', 'what the result must meet: length, tone, whether it includes an answer key…'],
        ['Output format:', 'table, Markdown, GIFT for Moodle… so you don’t have to ask for it afterwards.'],
        ['Curriculum profile (optional):', 'adds competences, assessment criteria and basic knowledge from the curriculum.']
      ],
      example: {
        before: 'Make me a fractions exercise.',
        after: 'Six fraction word problems for Year 6, set around cooking recipes, increasing in difficulty, with an answer key and a version with visual support.'
      }
    },
    {
      id: 'open-ai', title: 'Opening the prompt in an AI',
      points: [
        ['ChatGPT, Claude and Perplexity', 'receive the prompt already typed into a new conversation.'],
        ['Copilot and Gemini', 'do not accept text in the link: they open empty and the prompt is already copied. Paste it with Ctrl+V (on a phone, press and hold and choose “Paste”).'],
        ['Very long prompts:', 'long links get cut short, so in that case every AI receives the prompt through the clipboard.'],
        ['Button order:', 'the AI chosen in the form comes first or, if none, the last one you used.'],
        ['From the library:', 'every saved prompt has its own “Open in” buttons.']
      ]
    },
    {
      id: 'library', title: 'Your library',
      points: [
        ['Save:', 'add a title, category, tags and notes so you can find it later. Mark the ones you use most as “Favorite”.'],
        ['Edit:', 'opens the prompt with its form. “Update” overwrites the saved one; “Save as new” creates another and keeps the original.'],
        ['Duplicate:', 'a quick copy for making variants (another year group, another topic).'],
        ['Export MD:', 'downloads one prompt as a text document to share or archive.'],
        ['Export JSON and Import:', 'a backup of the whole library, or a way to move it to another browser without an account.'],
        ['Search:', 'looks through the title, text, tags and notes of your prompts.']
      ]
    },
    {
      id: 'account', title: 'Account and sync',
      points: [
        ['Without an account', 'everything works, offline too, and prompts are stored only in this browser.'],
        ['With “Sign in”', '(EduTicTac or Google account) the library is also stored on the EduTicTac server and is available on all your devices.'],
        ['It syncs by itself:', 'when you save, update, sign in or get back online.'],
        ['Two devices open at once:', 'changes made on the other one arrive when you sign in again or press “Sync library”.'],
        ['Careful:', 'clearing browser data deletes the local copy. If you don’t use an account, export the library as JSON first.']
      ]
    },
    {
      id: 'good-use', title: 'Responsible use',
      points: [
        ['Student data:', 'do not enter names, personal data or sensitive information. Describe the group in general terms.'],
        ['Always review', 'what the AI returns: facts, references, possible bias and fit for the group.'],
        ['Assessment:', 'do not use AI answers to grade automatically.'],
        ['Transparency:', 'add a note to materials made with AI help, for example: “Material prepared with AI assistance and reviewed by the teacher”.'],
        ['Tools:', 'prefer the AI tools approved by your education authority.']
      ]
    },
    {
      id: 'faq', title: 'Frequently asked questions',
      points: [
        ['The AI does not open.', 'The browser may have blocked the new window. Allow pop-ups for this site, or open the AI yourself and paste the prompt, which is already copied.'],
        ['I can’t see a prompt on another device.', 'Check you are signed in with the same account on both and press “Sync library”.'],
        ['How do I install it as an app?', 'In Chrome or Edge, use the install button in the address bar or the menu › Install. On iPhone or iPad, in Safari: Share › Add to Home Screen. It then works offline.'],
        ['“A new version of the application is available” appears.', 'Press “Update application” to load it.'],
        ['Does the app use AI or send what I type?', 'No. The prompt is generated on your device. Your saved prompts are only sent to the server if you sign in to sync them.']
      ]
    }
  ]
}

const guides: Record<Language, HelpGuide> = { es, 'ca-valencia': va, ca, en }
export const helpGuide = (language: Language): HelpGuide => guides[language]
