import type { TemplateTip } from '../templateTips'

export const caTips: Record<string, TemplateTip> = {
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
    use: 'Demana a la IA que faci servir LaTeX per a mostrar les fórmules i els càlculs ja compostos dins del material.',
    tip: 'Indica quin material necessites. Per a editar les equacions en Word, tria DOCX: es demanaran equacions natives editables.',
  },
  'learning-stations': {
    use: 'Organitza pràctiques per estacions amb instruccions i temps realistes.',
    tip: 'Indica el temps total, la mida dels grups i els recursos disponibles.',
  },
  'activity-evidence': {
    use: 'Transforma una activitat existent en evidències observables i formes de recollir-les.',
    tip: 'Descriu què fa l’alumnat i afegeix els objectius o criteris disponibles, sense dades personals.',
  },
  flashcards: {
    use: 'Crea targetes per practicar i recordar conceptes amb preguntes i respostes breus.',
    tip: 'Indica el tema i la quantitat de preguntes; pots afegir un text de referència.',
  },
  'prompt-coach': {
    use: 'Prepara una conversa amb una IA per crear o millorar un prompt educatiu.',
    tip: 'Escriu la teva idea o enganxa un prompt. Copia el resultat i conversa amb la IA que prefereixis; la conversa té lloc allà.',
  },
}
