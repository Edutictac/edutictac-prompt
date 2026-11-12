import type { Language } from '../../types'

// Brief de producción de la plantilla «Película explicativa animada». Se
// mantiene aparte de texts.ts porque es un bloque largo y con estructura
// propia. El generador lo inserta tal cual después de los datos del formulario.
export const videoBriefs: Record<Language, string> = {
  es: `Trabaja en cuatro fases y no adelantes trabajo de una fase a la siguiente.

### Fase 1. Analiza antes de escribir
Lee el documento entero y entrega una ficha breve con: tipo de documento; idea central en menos de 20 palabras; de 3 a 7 ideas clave ordenadas por importancia; datos y cifras con su fuente; términos técnicos y cómo los explicarás; diferencia entre el nivel del documento y el del público; relleno que dejarás fuera; huecos que el público preguntará y el documento no responde; metáfora visual principal, que debe poder moverse, crecer y transformarse durante toda la película; y qué color de la paleta asignas a cada concepto que se repite. Si algún dato está vacío, dedúcelo del documento y di qué has supuesto.

### Fase 2. Escribe el guion y espera aprobación
Entrega el título, el subtítulo, el párrafo de la pantalla de inicio y una tabla por capítulo con: número y nombre corto; narración frase a frase con las palabras clave marcadas; qué se ve y qué se mueve en cada frase; pareja de colores del capítulo; transición de entrada; duración estimada; y fuente del dato. Para aquí y espera a que se aprueben la ficha y el guion. No programes nada todavía.

Reglas de redacción:
- Usa la misma lengua que estas instrucciones, natural, como si se lo contaras a un compañero listo que no conoce el tema.
- Frases de menos de 20 palabras, una idea por frase, voz activa y verbos concretos. Evita «cabe destacar», «es importante señalar», «en este sentido», «a nivel de» y «poner en valor».
- Explica cada término técnico la primera vez con palabras normales o con una comparación de la vida diaria. Di las cifras como se hablan; en pantalla sí puede ir la cifra exacta.
- Escribe para el oído: sin paréntesis, siglas sin explicar ni listas largas. Alterna frases cortas y medias; usa frases muy cortas como golpes de efecto.
- Usa solo información del documento. No inventes cifras, nombres, citas ni ejemplos presentados como reales. Si pones un ejemplo, que se note que es un ejemplo («imagina que...»). Si hay límites, dudas o riesgos, cuéntalos. No incluyas datos personales ni información sensible. No inventes conexiones que el documento no establece.
- Empieza con un gancho fuerte en los primeros 3 segundos, nunca con «En este vídeo vamos a ver...».
- Un capítulo = una idea. Si necesita dos, divídelo. Termina con una idea que se quede en la cabeza o con una acción clara, según el objetivo.

Estructura según el tipo de documento:
- Paper o estudio científico: gancho, pregunta de investigación, por qué era difícil, método, resultados por capítulos, límites y controles, qué significa y qué falta.
- Informe de resultados o datos: gancho con el dato más llamativo, contexto, de 3 a 5 hallazgos, qué los explica y qué hacer con ellos.
- Documento de producto: problema del usuario como escena real, cómo se resuelve hoy y por qué falla, producto, funcionamiento paso a paso, ventajas con datos y qué viene después.
- Metodología, proceso o procedimiento: qué se consigue al final, visión general, cada paso con quién y con qué, errores típicos y resumen en un esquema.
- Estrategia o plan: dónde estamos, a dónde queremos ir, por qué ahora, las apuestas, cómo se mide y qué se pide a cada uno.
- Propuesta comercial: problema del cliente, coste de no resolverlo, propuesta, funcionamiento, pruebas y próximos pasos.
- Política, normativa o documento interno: por qué existe, a quién afecta, antes y después, qué se puede y qué no con ejemplos, y a quién acudir.
- Documentación técnica o arquitectura: para qué sirve el sistema, vista general, cada pieza y su función, recorrido de un dato de principio a fin y puntos débiles.
- Caso de éxito: cliente y situación, problema, lo que se probó, solución, resultados en cifras y lección aplicable.
- Material de formación: qué sabrás hacer al terminar, conceptos de uno en uno con ejemplo, ejercicio mental o pregunta y resumen.
- Comparativa o evaluación de opciones: decisión, criterios, cada opción frente a los criterios, tabla final y recomendación razonada.
- Postmortem o incidente: qué pasó, impacto, causa raíz, por qué no se detectó y qué se cambia. Tono neutro, sin culpables.
- Artículo de opinión o ensayo: gancho, tesis, argumentos uno a uno, la mejor objeción y su respuesta, y conclusión.
- Otro o híbrido: propón una estructura y justifícala en dos líneas.

Duración:
- De 1 a 2 ideas: de 1 a 2 minutos y de 4 a 6 capítulos.
- De 3 a 5 ideas: de 2 a 4 minutos y de 6 a 10 capítulos.
- Contenido denso: de 4 a 6 minutos y de 10 a 15 capítulos.
- Cada capítulo dura entre 15 y 30 segundos. Si no se indica duración, decídela por densidad del contenido, no por longitud del documento.

### Fase 3. Construye la película
Hazlo solo cuando el guion esté aprobado.

Estilo manual, que es la base de los otros dos:
- Papel marfil #F2F0E5 con cuadrícula casi invisible y textura de papel generada con ruido. Tinta carbón #100F0F, contornos finos y ligeramente imperfectos. Mucho espacio libre.
- Acuarela localizada y translúcida, con el borde algo más oscuro y capas transparentes superpuestas. Paleta Flexoki: azul #4385BE, cian #3AA99F, púrpura #8B7EC8, naranja #DA702C, ocre #D0A215, verde #879A39, magenta #CE5D97; rojo #D14D41 solo para riesgo o error.
- Dos acentos por capítulo, con un tercero puntual si ayuda a leer. Alterna parejas entre capítulos (azul-púrpura, cian-azul, cian-púrpura, naranja-azul, verde-cian, ocre-púrpura) y no hagas toda la película igual.
- Un concepto que se repite conserva siempre el mismo color. En una comparación, cada lado conserva el suyo.
- Trazo que hierve: cada contorno se redibuja con pequeñas variaciones a 8-12 fotogramas por segundo alternando 3 o 4 versiones fijas con semilla, mientras el movimiento general va a 60 fps. Líneas con presión variable, más gruesas al empezar y más finas al terminar.
- Letra dibujada a mano inspirada en Consolas: parte de una monoespaciada parecida a Consolas (Inconsolata, con tildes y eñe) y deforma cada letra con su semilla: desplazamiento, giro de 1 a 3 grados, altura, grosor y contorno tembloroso, línea base irregular y espaciado imperfecto. Nada de cursiva ornamental, letra escolar ni serifas editoriales. En subtítulos, irregularidad mínima y sin temblor.
- Objetos esquemáticos reconocibles y personas sobrias sin rasgos de nadie real. Cajas solo para ideas abstractas. Flechas solo para dirección, líneas para relación y contenedores para pertenencia.
- Sin borde coloreado, firmas, cajetín, cotas ni anotaciones ficticias.

Pixel art, que es el estilo manual visto a través de una rejilla:
- Dibuja cada fotograma a resolución manual y redúcelo a 320x180 (480x270 si hay mucho texto), con una paleta cerrada de 16 a 24 colores Flexoki y los neutros #DAD8CE, #B7B5AC y #6F6E69.
- Convierte transparencias y textura en tramas de puntos Bayer 4x4. Sin degradados suaves ni transparencias parciales. Amplía con escala entera y sin suavizado (image-rendering: pixelated), centrado, sin desenfoques ni sombras.
- Cámara y objetos siempre en píxeles enteros. Los zooms se redibujan desde la nueva posición, nunca ampliando píxeles a medias. El trazo y las poses cambian a 6-12 fotogramas por segundo. Personas como sprites compactos, de cuerpo completo y silueta clara, nunca figuras de palo. Malla de píxeles activable con la tecla G, activa por defecto.

Combinado:
- Papel, estructura y lo ya contado en manual nítido. Lo que está en acción (partículas, cifras que cuentan, personajes, datos que viajan) pasa por la capa de píxeles. Los elementos entran pixelados y se revelan en manual al asentarse, o al revés al irse. Debe notarse intencionado; si parece un error, vuelve al estilo manual.

Variante oscura:
- Fondo azul profundo #01152F, con zonas #1E3650 y #12253B, nunca negro. Tinta #F2F0E5 o #DAD8CE, nunca blanco puro. Acuarela más luminosa. En pixel art, el paso de un azul a otro se hace por bandas o tramas, no con degradado suave.

Acabado Blueprint de alto impacto:
- Manchas de acuarela amplias y saturadas, con granulación y bordes que se expanden. Dos familias de color contrastadas y el contraste concentrado en el motivo principal, que debe entenderse de un vistazo al tamaño final. Guía la mirada con escala, posición, color y orden de aparición. Muestra objetos, personas o interfaces reales y usa flechas solo para relaciones concretas. Rótulos breves y legibles. Mantén el ritmo de la narración y sigue el orden de lectura.

Dinamismo, que manda sobre lo visual:
- Nada está quieto: en cada fotograma se mueve la cámara, el papel, los elementos o todo a la vez. Cada 2 o 3 segundos pasa algo nuevo. Nunca hay más de 1 segundo con la imagen congelada, ni entre capítulos.
- Cámara viva: cuando no viaja deriva despacio (desplazamiento, zoom leve y rotación de 1 a 2 grados). Los viajes entre capítulos duran de 0,8 a 1,5 segundos, con aceleración fuerte al salir y frenada suave al llegar. Alterna zoom out, desplazamiento y zoom in, barridos laterales, caídas en picado y giros de 90 grados. Rastro de lápiz en manual y smear en píxeles. Pequeños empujones del 3 al 5 % en las palabras clave y temblor solo en los golpes fuertes (1 o 2 píxeles en pixel art). Parallax de al menos 3 capas.
- Papel vivo: cuadrícula en movimiento, manchas tenues que respiran, motas de pigmento, salpicaduras y textura animada que reacciona a la historia.
- Elementos que respiran: micro-movimiento continuo (flotar, respirar entre el 98 y el 102 %, oscilar, girar despacio). Líneas y flechas con puntos o pulsos que circulan. Números que se dibujan y cuentan con rebote; gráficos que se construyen (barras con rebote, líneas con punta de lápiz visible, puntos que caen como gotas). Entradas con contorno rápido y relleno posterior, escala con rebote, deslizamiento con estela o explosión de motas.
- Entradas en cascada con 60-120 ms entre elementos. Salidas borradas con goma, encogidas, disueltas o transformadas. Usa transformaciones entre ideas: un número que se convierte en barra, un círculo que se abre en diagrama, un documento que se divide en partes. La metáfora principal vuelve y evoluciona.
- Texto cinético: títulos escritos letra a letra con una mancha de acento detrás; frases clave que caen, se subrayan o se tachan; cifras enormes con salpicadura y golpe de cámara.
- Ritmo sincronizado: cada palabra clave dispara un golpe visual; manchas y motas laten con la música; los cambios de capítulo coinciden con un tiempo fuerte.
- Efectos: estelas en lo rápido, salpicaduras breves, acuarela que se expande y viñeteado suave. Nada de neón ni brillos digitales. Los efectos refuerzan la idea, nunca la tapan.
- Límites: el texto que hay que leer se queda estable; un solo foco con color y el resto en gris tinta o más pálido y lento; nada parpadea más de 3 veces por segundo; con prefers-reduced-motion, sin temblores, barridos rápidos ni salpicaduras, trazo casi parado, transiciones por fundido y micro-movimientos suaves; 60 fps en un portátil normal y fluido en móvil, reduciendo motas y capas si hace falta y cacheando los trazos que hierven.

Lenguaje visual, según el tipo de idea:
- Cifra clave: número enorme que cuenta hacia arriba con su contexto después.
- Comparación: dos columnas u objetos, cada uno con su color, que se enfrentan o se separan.
- Antes y después: la misma escena que se transforma ante los ojos.
- Proceso: flujo de objetos o cajas que se colorean, con una gota que recorre el camino.
- Línea de tiempo: eje dibujado a mano que la cámara recorre y frena en cada hito.
- Jerarquía: árbol que crece rama a rama o zoom dentro de un objeto.
- Relaciones: red de nodos que se atraen y se conectan, con puntos que viajan.
- Proporciones: barras o bloques que se llenan con rebote; nunca tartas con más de 3 partes.
- Tendencia: línea o dispersión que se dibuja punto a punto con la punta del lápiz; los puntos no se mueven de su sitio.
- Tabla: cuadrícula dibujada a mano que se rellena celda a celda.
- Producto o interfaz: maqueta de pantalla con un cursor que la usa, clics con ondas y pantallas que se deslizan.
- Arquitectura técnica: cajas y flechas con paquetes de datos viajando sin parar.
- Persona: figura sobria o sprite que se mueve y gesticula.
- Concepto abstracto: metáfora sencilla y coherente que vuelve cada vez.
- Riesgo o límite: el mismo gráfico con una zona marcada en rojo, temblando o tachada.
- Conserva valores, unidades, escalas y línea de base. El estilo nunca cambia un dato. Un concepto mantiene color, forma y posición relativa.

Formato técnico:
- Una sola página HTML autocontenida, con todo el CSS y el JS dentro, publicada como artefacto.
- Toda la película vive en un lienzo 2D infinito de papel a 60 fps. Cada capítulo ocupa una zona y la cámara viaja entre zonas con zoom, desplazamiento y rotación, sin cortes. Las zonas pueden anidarse y la cámara puede entrar en un detalle.
- Un MANIFEST en JSON con escenas (id, inicio, fin) y frases con tiempos t0 y t1 controla cámara, animaciones, voz y subtítulos. Se puede saltar a cualquier momento y todo se dibuja bien: las animaciones dependen del tiempo y usan semillas fijas, nunca Math.random() suelto al dibujar. Los subtítulos y los controles se dibujan siempre nítidos.
- Si un efecto no sale bien con código, simplifícalo antes que dejarlo feo.

Narración, subtítulos y sonido:
- Si la voz elegida es la del navegador, usa la Web Speech API con la voz más natural del idioma y avisa de que suena robótica y de que, para clientes, conviene una voz generada aparte. Si hay un audio adjunto, intégralo en base64 y sincroniza el MANIFEST con él. Si la voz es grabada o generada aparte, deja la estructura y los tiempos preparados para integrarla.
- Subtítulos centrados abajo, que se iluminan palabra a palabra al ritmo de la voz. Las palabras clave llevan el color de acento del capítulo y un pequeño salto de escala.
- Música de fondo con Web Audio, con pulso claro de 100-120 BPM, que baja de volumen cuando habla la voz. En manual, sonidos suaves y acústicos (marimba, piano ligero, notas punteadas). En pixel art, ondas cuadradas y triangulares tipo videojuego. En combinado, mezcla. Botón para silenciarla.
- Efectos sutiles con Web Audio: roce de papel en cada viaje, trazo al aparecer un elemento y golpe grave en las cifras clave. En pixel art, versiones blip. Que acompañen, no que molesten.

Interfaz:
- Pantalla de inicio animada con el papel vivo y la metáfora principal detrás: etiqueta pequeña («Película de X minutos · tipo de documento, fecha»), título grande escrito letra a letra con una palabra en color de acento, párrafo de resumen y botón «Ver la película» que late. Debajo: «Con narración · puedes hacer zoom y moverte por el lienzo en cualquier momento». Al pulsar, la cámara se lanza dentro del papel.
- Arriba a la derecha, «03 / 12» y el nombre del capítulo, con animación. Barra inferior con play y pausa, línea de tiempo dividida por capítulos (nombre al pasar el ratón), tiempo actual y total, subtítulos (C), música (M), malla de píxeles (G, solo en pixel art y combinado) y pantalla completa. Espacio para pausar; flechas para saltar de capítulo. Controles con aspecto dibujado a mano o en píxeles, pero claros.
- Scroll para zoom y arrastre para moverse por el lienzo en cualquier momento. Entonces aparece «SEGUIR PELÍCULA» para volver; doble clic también vuelve. Mientras se explora, el lienzo sigue vivo. Al final, la cámara se aleja y se ve el cuaderno lleno, con «Ver otra vez» y «Explorar el lienzo».
- Funciona en móvil: pellizcar para zoom e interfaz simplificada. El canvas y los controles tienen etiquetas accesibles y nada esencial depende solo del color.
- Ajusta la energía al tipo de documento: producto, comercial o formación, máxima; científico o técnico, alta pero precisa; interno o normativo, media y suave; incidente o riesgo, media y firme, sin salpicaduras festivas.

### Fase 4. Revisa antes de entregar
Comprueba y cuenta el resultado de cada punto: cada cifra coincide con el documento; voz, subtítulos y animaciones van sincronizados; no hay ningún momento quieto más de 1 segundo; cada 2 o 3 segundos pasa algo nuevo; siempre se sabe dónde mirar y el texto se lee bien; el estilo elegido se respeta en toda la película; si hay Blueprint, el motivo se reconoce en un fotograma reducido; saltar a cualquier punto dibuja lo mismo que verlo seguido; no queda texto en inglés si la película no es en inglés; no hay solapamientos ni textos fuera de pantalla en escritorio ni en móvil; va fluido a 60 fps; y alguien que no ha leído el documento podría explicar la idea central tras verla.

Termina con cuatro líneas: qué tipo de documento has detectado, qué estructura has usado, qué estilo y variante has aplicado y qué has dejado fuera.`,
  'ca-valencia': `Treballa en quatre fases i no avances faena d’una fase a la següent.

### Fase 1. Analitza abans d’escriure
Llig el document sencer i entrega una fitxa breu amb: tipus de document; idea central en menys de 20 paraules; de 3 a 7 idees clau ordenades per importància; dades i xifres amb la seua font; termes tècnics i com els explicaràs; diferència entre el nivell del document i el del públic; farciment que deixaràs fora; buits que el públic preguntarà i el document no respon; metàfora visual principal, que ha de poder moure’s, créixer i transformar-se durant tota la pel·lícula; i quin color de la paleta assignes a cada concepte que es repetix. Si alguna dada està buida, deduïx-la del document i digues què has suposat.

### Fase 2. Escriu el guió i espera aprovació
Entrega el títol, el subtítol, el paràgraf de la pantalla d’inici i una taula per capítol amb: número i nom curt; narració frase a frase amb les paraules clau marcades; què es veu i què es mou en cada frase; parella de colors del capítol; transició d’entrada; duració estimada; i font de la dada. Para ací i espera que s’aproven la fitxa i el guió. No programes res encara.

Regles de redacció:
- Usa la mateixa llengua que estes instruccions, natural, com si ho contares a un company llest que no coneix el tema.
- Frases de menys de 20 paraules, una idea per frase, veu activa i verbs concrets. Evita «cal destacar», «és important assenyalar», «en este sentit», «a nivell de» i «posar en valor».
- Explica cada terme tècnic la primera vegada amb paraules normals o amb una comparació de la vida quotidiana. Digues les xifres com es parlen; en pantalla sí que pot anar la xifra exacta.
- Escriu per a l’oïda: sense parèntesis, sigles sense explicar ni llistes llargues. Alterna frases curtes i mitjanes; usa frases molt curtes com a colps d’efecte.
- Usa només informació del document. No inventes xifres, noms, cites ni exemples presentats com a reals. Si poses un exemple, que es note que és un exemple («imagina que...»). Si hi ha límits, dubtes o riscos, conta’ls. No inclogues dades personals ni informació sensible. No inventes connexions que el document no establix.
- Comença amb un ganxo fort en els primers 3 segons, mai amb «En este vídeo anem a vore...».
- Un capítol = una idea. Si en necessita dos, dividix-lo. Acaba amb una idea que es quede al cap o amb una acció clara, segons l’objectiu.

Estructura segons el tipus de document:
- Paper o estudi científic: ganxo, pregunta d’investigació, per què era difícil, mètode, resultats per capítols, límits i controls, què significa i què falta.
- Informe de resultats o dades: ganxo amb la dada més cridanera, context, de 3 a 5 troballes, què les explica i què fer amb elles.
- Document de producte: problema de l’usuari com a escena real, com es resol hui i per què falla, producte, funcionament pas a pas, avantatges amb dades i què ve després.
- Metodologia, procés o procediment: què s’aconseguix al final, visió general, cada pas amb qui i amb què, errors típics i resum en un esquema.
- Estratègia o pla: on estem, on volem anar, per què ara, les apostes, com es mesura i què es demana a cada u.
- Proposta comercial: problema del client, cost de no resoldre’l, proposta, funcionament, proves i pròxims passos.
- Política, normativa o document intern: per què existix, a qui afecta, abans i després, què es pot i què no amb exemples, i a qui acudir.
- Documentació tècnica o arquitectura: per a què servix el sistema, visió general, cada peça i la seua funció, recorregut d’una dada de principi a fi i punts febles.
- Cas d’èxit: client i situació, problema, què es va provar, solució, resultats en xifres i lliçó aplicable.
- Material de formació: què sabràs fer en acabar, conceptes d’un en un amb exemple, exercici mental o pregunta i resum.
- Comparativa o avaluació d’opcions: decisió, criteris, cada opció davant dels criteris, taula final i recomanació raonada.
- Postmortem o incident: què va passar, impacte, causa arrel, per què no es va detectar i què es canvia. To neutre, sense culpables.
- Article d’opinió o assaig: ganxo, tesi, arguments d’un en un, la millor objecció i la seua resposta, i conclusió.
- Un altre o híbrid: proposa una estructura i justifica-la en dos línies.

Duració:
- D’1 a 2 idees: d’1 a 2 minuts i de 4 a 6 capítols.
- De 3 a 5 idees: de 2 a 4 minuts i de 6 a 10 capítols.
- Contingut dens: de 4 a 6 minuts i de 10 a 15 capítols.
- Cada capítol dura entre 15 i 30 segons. Si no s’indica duració, decidix-la per densitat del contingut, no per longitud del document.

### Fase 3. Construeix la pel·lícula
Fes-ho només quan el guió estiga aprovat.

Estil manual, que és la base dels altres dos:
- Paper ivori #F2F0E5 amb quadrícula quasi invisible i textura de paper generada amb soroll. Tinta carbó #100F0F, contorns fins i lleugerament imperfectes. Molt espai lliure.
- Aquarel·la localitzada i translúcida, amb la vora un poc més fosca i capes transparents superposades. Paleta Flexoki: blau #4385BE, cian #3AA99F, porpra #8B7EC8, taronja #DA702C, ocre #D0A215, verd #879A39, magenta #CE5D97; roig #D14D41 només per a risc o error.
- Dos accents per capítol, amb un tercer puntual si ajuda a llegir. Alterna parelles entre capítols (blau-porpra, cian-blau, cian-porpra, taronja-blau, verd-cian, ocre-porpra) i no faces tota la pel·lícula igual.
- Un concepte que es repetix conserva sempre el mateix color. En una comparació, cada costat conserva el seu.
- Traç que bull: cada contorn es redibuixa amb xicotetes variacions a 8-12 fotogrames per segon alternant 3 o 4 versions fixes amb llavor, mentres el moviment general va a 60 fps. Línies amb pressió variable, més grosses al principi i més fines al final.
- Lletra dibuixada a mà inspirada en Consolas: part d’una monoespaiada pareguda a Consolas (Inconsolata, amb tildes i enya) i deforma cada lletra amb la seua llavor: desplaçament, gir d’1 a 3 graus, altura, grossària i contorn tremolós, línia base irregular i espaiat imperfecte. Res de cursiva ornamental, lletra escolar ni serifes editorials. En subtítols, irregularitat mínima i sense tremolor.
- Objectes esquemàtics recognoscibles i persones sòbries sense trets de ningú real. Caixes només per a idees abstractes. Fletxes només per a direcció, línies per a relació i contenidors per a pertinença.
- Sense vora acolorida, firmes, caixetí, cotes ni anotacions fictícies.

Pixel art, que és l’estil manual vist a través d’una reixeta:
- Dibuixa cada fotograma a resolució manual i reduïx-lo a 320x180 (480x270 si hi ha molt de text), amb una paleta tancada de 16 a 24 colors Flexoki i els neutres #DAD8CE, #B7B5AC i #6F6E69.
- Converteix transparències i textura en trames de punts Bayer 4x4. Sense degradats suaus ni transparències parcials. Amplia amb escala entera i sense suavitzat (image-rendering: pixelated), centrat, sense desenfocaments ni ombres.
- Càmera i objectes sempre en píxels enters. Els zooms es redibuixen des de la nova posició, mai ampliant píxels a mitges. El traç i les poses canvien a 6-12 fotogrames per segon. Persones com a sprites compactes, de cos complet i silueta clara, mai figures de pal. Reixeta de píxels activable amb la tecla G, activa per defecte.

Combinat:
- Paper, estructura i el que ja s’ha contat en manual nítid. El que està en acció (partícules, xifres que conten, personatges, dades que viatgen) passa per la capa de píxels. Els elements entren pixelats i es revelen en manual en assentar-se, o al revés en anar-se’n. Ha de notar-se intencionat; si pareix un error, torna a l’estil manual.

Variant fosca:
- Fons blau profund #01152F, amb zones #1E3650 i #12253B, mai negre. Tinta #F2F0E5 o #DAD8CE, mai blanc pur. Aquarel·la més lluminosa. En pixel art, el pas d’un blau a un altre es fa per bandes o trames, no amb degradat suau.

Acabat Blueprint d’alt impacte:
- Taques d’aquarel·la àmplies i saturades, amb granulació i vores que s’expandeixen. Dos famílies de color contrastades i el contrast concentrat en el motiu principal, que ha d’entendre’s d’una ullada a la grandària final. Guia la mirada amb escala, posició, color i orde d’aparició. Mostra objectes, persones o interfícies reals i usa fletxes només per a relacions concretes. Rètols breus i llegibles. Mantín el ritme de la narració i seguix l’orde de lectura.

Dinamisme, que mana sobre el visual:
- Res està quiet: en cada fotograma es mou la càmera, el paper, els elements o tot alhora. Cada 2 o 3 segons passa una cosa nova. Mai hi ha més d’1 segon amb la imatge congelada, ni entre capítols.
- Càmera viva: quan no viatja deriva a poc a poc (desplaçament, zoom lleu i rotació d’1 a 2 graus). Els viatges entre capítols duren de 0,8 a 1,5 segons, amb acceleració forta en eixir i frenada suau en arribar. Alterna zoom out, desplaçament i zoom in, escombrades laterals, caigudes en picat i girs de 90 graus. Rastre de llapis en manual i smear en píxels. Xicotets empentes del 3 al 5 % en les paraules clau i tremolor només en els colps forts (1 o 2 píxels en pixel art). Parallax d’almenys 3 capes.
- Paper viu: quadrícula en moviment, taques tèrules que respiren, motes de pigment, esquitxades i textura animada que reacciona a la història.
- Elements que respiren: micromoviment continu (flotar, respirar entre el 98 i el 102 %, oscil·lar, girar a poc a poc). Línies i fletxes amb punts o polsos que circulen. Números que es dibuixen i conten amb rebot; gràfics que es construïxen (barres amb rebot, línies amb punta de llapis visible, punts que cauen com gotes). Entrades amb contorn ràpid i farciment posterior, escala amb rebot, lliscament amb estela o explosió de motes.
- Entrades en cascada amb 60-120 ms entre elements. Eixides esborrades amb goma, encongides, dissoltes o transformades. Usa transformacions entre idees: un número que es convertix en barra, un cercle que s’obri en diagrama, un document que es dividix en parts. La metàfora principal torna i evoluciona.
- Text cinètic: títols escrits lletra a lletra amb una taca d’accent darrere; frases clau que cauen, se subratllen o es tatxen; xifres enormes amb esquitxada i colp de càmera.
- Ritme sincronitzat: cada paraula clau dispara un colp visual; taques i motes bateguen amb la música; els canvis de capítol coincidixen amb un temps fort.
- Efectes: esteles en el que és ràpid, esquitxades breus, aquarel·la que s’expandix i vinyetejat suau. Res de neó ni brillantors digitals. Els efectes reforcen la idea, mai la tapen.
- Límits: el text que cal llegir es queda estable; un sol focus amb color i la resta en gris tinta o més pàl·lid i lent; res parpelleja més de 3 vegades per segon; amb prefers-reduced-motion, sense tremolors, escombrades ràpides ni esquitxades, traç quasi parat, transicions per fosa i micromoviments suaus; 60 fps en un portàtil normal i fluid en mòbil, reduint motes i capes si fa falta i cachejant els traços que bullen.

Llenguatge visual, segons el tipus d’idea:
- Xifra clau: número enorme que conta cap amunt amb el seu context després.
- Comparació: dos columnes o objectes, cada u amb el seu color, que s’enfronten o se separen.
- Abans i després: la mateixa escena que es transforma davant dels ulls.
- Procés: flux d’objectes o caixes que es coloregen, amb una gota que recorre el camí.
- Línia de temps: eix dibuixat a mà que la càmera recorre i frena en cada fita.
- Jerarquia: arbre que creix branca a branca o zoom dins d’un objecte.
- Relacions: xarxa de nodes que s’atrauen i es connecten, amb punts que viatgen.
- Proporcions: barres o blocs que es farcen amb rebot; mai tartes amb més de 3 parts.
- Tendència: línia o dispersió que es dibuixa punt a punt amb la punta del llapis; els punts no es mouen del seu lloc.
- Taula: quadrícula dibuixada a mà que es farceix cel·la a cel·la.
- Producte o interfície: maqueta de pantalla amb un cursor que la usa, clics amb ones i pantalles que llisquen.
- Arquitectura tècnica: caixes i fletxes amb paquets de dades viatjant sense parar.
- Persona: figura sòbria o sprite que es mou i gesticula.
- Concepte abstracte: metàfora senzilla i coherent que torna cada vegada.
- Risc o límit: el mateix gràfic amb una zona marcada en roig, tremolant o tatxada.
- Conserva valors, unitats, escales i línia de base. L’estil mai canvia una dada. Un concepte manté color, forma i posició relativa.

Format tècnic:
- Una sola pàgina HTML autocontinguda, amb tot el CSS i el JS dins, publicada com a artefacte.
- Tota la pel·lícula viu en un llenç 2D infinit de paper a 60 fps. Cada capítol ocupa una zona i la càmera viatja entre zones amb zoom, desplaçament i rotació, sense talls. Les zones poden anidar-se i la càmera pot entrar en un detall.
- Un MANIFEST en JSON amb escenes (id, inici, fi) i frases amb temps t0 i t1 controla càmera, animacions, veu i subtítols. Es pot saltar a qualsevol moment i tot es dibuixa bé: les animacions depenen del temps i usen llavors fixes, mai Math.random() solt en dibuixar. Els subtítols i els controls es dibuixen sempre nítids.
- Si un efecte no ix bé amb codi, simplifica’l abans que deixar-lo lleig.

Narració, subtítols i so:
- Si la veu triada és la del navegador, usa la Web Speech API amb la veu més natural de la llengua i avisa que sona robòtica i que, per a clients, convé una veu generada a banda. Si hi ha un àudio adjunt, integra’l en base64 i sincronitza el MANIFEST amb ell. Si la veu és gravada o generada a banda, deixa l’estructura i els temps preparats per a integrar-la.
- Subtítols centrats a baix, que s’il·luminen paraula a paraula al ritme de la veu. Les paraules clau porten el color d’accent del capítol i un xicotet salt d’escala.
- Música de fons amb Web Audio, amb pols clar de 100-120 BPM, que baixa de volum quan parla la veu. En manual, sons suaus i acústics (marimba, piano lleuger, notes puntejades). En pixel art, ones quadrades i triangulars tipus videojoc. En combinat, mescla. Botó per a silenciar-la.
- Efectes subtils amb Web Audio: fregament de paper en cada viatge, traç en aparéixer un element i colp greu en les xifres clau. En pixel art, versions blip. Que acompanyen, no que molesten.

Interfície:
- Pantalla d’inici animada amb el paper viu i la metàfora principal darrere: etiqueta xicoteta («Pel·lícula de X minuts · tipus de document, data»), títol gran escrit lletra a lletra amb una paraula en color d’accent, paràgraf de resum i botó «Veure la pel·lícula» que batega. Davall: «Amb narració · pots fer zoom i moure’t pel llenç en qualsevol moment». En prémer, la càmera es llança dins del paper.
- A dalt a la dreta, «03 / 12» i el nom del capítol, amb animació. Barra inferior amb play i pausa, línia de temps dividida per capítols (nom en passar el ratolí), temps actual i total, subtítols (C), música (M), reixeta de píxels (G, només en pixel art i combinat) i pantalla completa. Espai per a pausar; fletxes per a saltar de capítol. Controls amb aspecte dibuixat a mà o en píxels, però clars.
- Scroll per a zoom i arrossegament per a moure’s pel llenç en qualsevol moment. Llavors apareix «SEGUIR PEL·LÍCULA» per a tornar; doble clic també torna. Mentres s’explora, el llenç seguix viu. Al final, la càmera s’allunya i es veu el quadern ple, amb «Veure una altra vegada» i «Explorar el llenç».
- Funciona en mòbil: pessigar per a zoom i interfície simplificada. El canvas i els controls tenen etiquetes accessibles i res essencial depén només del color.
- Ajusta l’energia al tipus de document: producte, comercial o formació, màxima; científic o tècnic, alta però precisa; intern o normatiu, mitjana i suau; incident o risc, mitjana i ferma, sense esquitxades festives.

### Fase 4. Revisa abans d’entregar
Comprova i conta el resultat de cada punt: cada xifra coincidix amb el document; veu, subtítols i animacions van sincronitzats; no hi ha cap moment quiet més d’1 segon; cada 2 o 3 segons passa una cosa nova; sempre se sap on mirar i el text es llig bé; l’estil triat es respecta en tota la pel·lícula; si hi ha Blueprint, el motiu es reconeix en un fotograma reduït; saltar a qualsevol punt dibuixa el mateix que vore-ho seguit; no queda text en anglés si la pel·lícula no és en anglés; no hi ha superposicions ni textos fora de pantalla en escriptori ni en mòbil; va fluid a 60 fps; i algú que no ha llegit el document podria explicar la idea central després de vore-la.

Acaba amb quatre línies: quin tipus de document has detectat, quina estructura has usat, quin estil i variant has aplicat i què has deixat fora.`,
  ca: `Treballa en quatre fases i no avancis feina d’una fase a la següent.

### Fase 1. Analitza abans d’escriure
Llegeix el document sencer i entrega una fitxa breu amb: tipus de document; idea central en menys de 20 paraules; de 3 a 7 idees clau ordenades per importància; dades i xifres amb la seva font; termes tècnics i com els explicaràs; diferència entre el nivell del document i el del públic; farciment que deixaràs fora; buits que el públic preguntarà i el document no respon; metàfora visual principal, que ha de poder moure’s, créixer i transformar-se durant tota la pel·lícula; i quin color de la paleta assignes a cada concepte que es repeteix. Si alguna dada està buida, dedueix-la del document i digues què has suposat.

### Fase 2. Escriu el guió i espera aprovació
Entrega el títol, el subtítol, el paràgraf de la pantalla d’inici i una taula per capítol amb: número i nom curt; narració frase a frase amb les paraules clau marcades; què es veu i què es mou en cada frase; parella de colors del capítol; transició d’entrada; durada estimada; i font de la dada. Atura’t aquí i espera que s’aprovin la fitxa i el guió. No programis res encara.

Regles de redacció:
- Usa la mateixa llengua que aquestes instruccions, natural, com si ho expliquessis a un company llest que no coneix el tema.
- Frases de menys de 20 paraules, una idea per frase, veu activa i verbs concrets. Evita «cal destacar», «és important assenyalar», «en aquest sentit», «a nivell de» i «posar en valor».
- Explica cada terme tècnic la primera vegada amb paraules normals o amb una comparació de la vida quotidiana. Digues les xifres com es parlen; a la pantalla sí que pot anar la xifra exacta.
- Escriu per a l’oïda: sense parèntesis, sigles sense explicar ni llistes llargues. Alterna frases curtes i mitjanes; usa frases molt curtes com a cops d’efecte.
- Usa només informació del document. No inventis xifres, noms, cites ni exemples presentats com a reals. Si poses un exemple, que es noti que és un exemple («imagina que...»). Si hi ha límits, dubtes o riscos, explica’ls. No incloguis dades personals ni informació sensible. No inventis connexions que el document no estableix.
- Comença amb un ganxo fort en els primers 3 segons, mai amb «En aquest vídeo veurem...».
- Un capítol = una idea. Si en necessita dues, divideix-lo. Acaba amb una idea que es quedi al cap o amb una acció clara, segons l’objectiu.

Estructura segons el tipus de document:
- Paper o estudi científic: ganxo, pregunta d’investigació, per què era difícil, mètode, resultats per capítols, límits i controls, què significa i què falta.
- Informe de resultats o dades: ganxo amb la dada més cridanera, context, de 3 a 5 troballes, què les explica i què fer amb elles.
- Document de producte: problema de l’usuari com a escena real, com es resol avui i per què falla, producte, funcionament pas a pas, avantatges amb dades i què ve després.
- Metodologia, procés o procediment: què s’aconsegueix al final, visió general, cada pas amb qui i amb què, errors típics i resum en un esquema.
- Estratègia o pla: on som, on volem anar, per què ara, les apostes, com es mesura i què es demana a cadascú.
- Proposta comercial: problema del client, cost de no resoldre’l, proposta, funcionament, proves i pròxims passos.
- Política, normativa o document intern: per què existeix, a qui afecta, abans i després, què es pot i què no amb exemples, i a qui adreçar-se.
- Documentació tècnica o arquitectura: per a què serveix el sistema, visió general, cada peça i la seva funció, recorregut d’una dada de principi a fi i punts febles.
- Cas d’èxit: client i situació, problema, què es va provar, solució, resultats en xifres i lliçó aplicable.
- Material de formació: què sabràs fer en acabar, conceptes d’un en un amb exemple, exercici mental o pregunta i resum.
- Comparativa o avaluació d’opcions: decisió, criteris, cada opció davant dels criteris, taula final i recomanació raonada.
- Postmortem o incident: què va passar, impacte, causa arrel, per què no es va detectar i què es canvia. To neutre, sense culpables.
- Article d’opinió o assaig: ganxo, tesi, arguments d’un en un, la millor objecció i la seva resposta, i conclusió.
- Un altre o híbrid: proposa una estructura i justifica-la en dues línies.

Durada:
- D’1 a 2 idees: d’1 a 2 minuts i de 4 a 6 capítols.
- De 3 a 5 idees: de 2 a 4 minuts i de 6 a 10 capítols.
- Contingut dens: de 4 a 6 minuts i de 10 a 15 capítols.
- Cada capítol dura entre 15 i 30 segons. Si no s’indica durada, decideix-la per densitat del contingut, no per longitud del document.

### Fase 3. Construeix la pel·lícula
Fes-ho només quan el guió estigui aprovat.

Estil manual, que és la base dels altres dos:
- Paper ivori #F2F0E5 amb quadrícula gairebé invisible i textura de paper generada amb soroll. Tinta carbó #100F0F, contorns fins i lleugerament imperfectes. Molt espai lliure.
- Aquarel·la localitzada i translúcida, amb la vora una mica més fosca i capes transparents superposades. Paleta Flexoki: blau #4385BE, cian #3AA99F, porpra #8B7EC8, taronja #DA702C, ocre #D0A215, verd #879A39, magenta #CE5D97; vermell #D14D41 només per a risc o error.
- Dos accents per capítol, amb un tercer puntual si ajuda a llegir. Alterna parelles entre capítols (blau-porpra, cian-blau, cian-porpra, taronja-blau, verd-cian, ocre-porpra) i no facis tota la pel·lícula igual.
- Un concepte que es repeteix conserva sempre el mateix color. En una comparació, cada costat conserva el seu.
- Traç que bull: cada contorn es redibuixa amb petites variacions a 8-12 fotogrames per segon alternant 3 o 4 versions fixes amb llavor, mentre el moviment general va a 60 fps. Línies amb pressió variable, més gruixudes al principi i més fines al final.
- Lletra dibuixada a mà inspirada en Consolas: parteix d’una monoespaiada semblant a Consolas (Inconsolata, amb accents i enya) i deforma cada lletra amb la seva llavor: desplaçament, gir d’1 a 3 graus, alçada, gruix i contorn tremolós, línia base irregular i espaiat imperfecte. Res de cursiva ornamental, lletra escolar ni serifes editorials. En subtítols, irregularitat mínima i sense tremolor.
- Objectes esquemàtics recognoscibles i persones sòbries sense trets de ningú real. Caixes només per a idees abstractes. Fletxes només per a direcció, línies per a relació i contenidors per a pertinença.
- Sense vora acolorida, signatures, caixetí, cotes ni anotacions fictícies.

Pixel art, que és l’estil manual vist a través d’una reixeta:
- Dibuixa cada fotograma a resolució manual i redueix-lo a 320x180 (480x270 si hi ha molt de text), amb una paleta tancada de 16 a 24 colors Flexoki i els neutres #DAD8CE, #B7B5AC i #6F6E69.
- Converteix transparències i textura en trames de punts Bayer 4x4. Sense degradats suaus ni transparències parcials. Amplia amb escala entera i sense suavitzat (image-rendering: pixelated), centrat, sense desenfocaments ni ombres.
- Càmera i objectes sempre en píxels enters. Els zooms es redibuixen des de la nova posició, mai ampliant píxels a mitges. El traç i les poses canvien a 6-12 fotogrames per segon. Persones com a sprites compactes, de cos complet i silueta clara, mai figures de pal. Reixeta de píxels activable amb la tecla G, activa per defecte.

Combinat:
- Paper, estructura i el que ja s’ha explicat en manual nítid. El que està en acció (partícules, xifres que compten, personatges, dades que viatgen) passa per la capa de píxels. Els elements entren pixelats i es revelen en manual en assentar-se, o al revés en marxar. Ha de notar-se intencionat; si sembla un error, torna a l’estil manual.

Variant fosca:
- Fons blau profund #01152F, amb zones #1E3650 i #12253B, mai negre. Tinta #F2F0E5 o #DAD8CE, mai blanc pur. Aquarel·la més lluminosa. En pixel art, el pas d’un blau a un altre es fa per bandes o trames, no amb degradat suau.

Acabat Blueprint d’alt impacte:
- Tques d’aquarel·la àmplies i saturades, amb granulació i vores que s’expandeixen. Dues famílies de color contrastades i el contrast concentrat en el motiu principal, que ha d’entendre’s d’un cop d’ull a la mida final. Guia la mirada amb escala, posició, color i ordre d’aparició. Mostra objectes, persones o interfícies reals i usa fletxes només per a relacions concretes. Rètols breus i llegibles. Mantén el ritme de la narració i segueix l’ordre de lectura.

Dinamisme, que mana sobre el visual:
- Res no està quiet: en cada fotograma es mou la càmera, el paper, els elements o tot alhora. Cada 2 o 3 segons passa una cosa nova. Mai hi ha més d’1 segon amb la imatge congelada, ni entre capítols.
- Càmera viva: quan no viatja deriva lentament (desplaçament, zoom lleu i rotació d’1 a 2 graus). Els viatges entre capítols duren de 0,8 a 1,5 segons, amb acceleració forta en sortir i frenada suau en arribar. Alterna zoom out, desplaçament i zoom in, escombrades laterals, caigudes en picat i girs de 90 graus. Rastre de llapis en manual i smear en píxels. Petites empentes del 3 al 5 % en les paraules clau i tremolor només en els cops forts (1 o 2 píxels en pixel art). Parallax d’almenys 3 capes.
- Paper viu: quadrícula en moviment, taques tènues que respiren, motes de pigment, esquitxades i textura animada que reacciona a la història.
- Elements que respiren: micromoviment continu (flotar, respirar entre el 98 i el 102 %, oscil·lar, girar lentament). Línies i fletxes amb punts o polsos que circulen. Números que es dibuixen i compten amb rebot; gràfics que es construeixen (barres amb rebot, línies amb punta de llapis visible, punts que cauen com gotes). Entrades amb contorn ràpid i farciment posterior, escala amb rebot, lliscament amb estela o explosió de motes.
- Entrades en cascada amb 60-120 ms entre elements. Sortides esborrades amb goma, encongides, dissoltes o transformades. Usa transformacions entre idees: un número que es converteix en barra, un cercle que s’obre en diagrama, un document que es divideix en parts. La metàfora principal torna i evoluciona.
- Text cinètic: títols escrits lletra a lletra amb una taca d’accent al darrere; frases clau que cauen, se subratllen o es ratllen; xifres enormes amb esquitxada i cop de càmera.
- Ritme sincronitzat: cada paraula clau dispara un cop visual; taques i motes bateguen amb la música; els canvis de capítol coincideixen amb un temps fort.
- Efectes: esteles en el que és ràpid, esquitxades breus, aquarel·la que s’expandeix i vinyetejat suau. Res de neó ni lluentors digitals. Els efectes reforcen la idea, mai la tapen.
- Límits: el text que cal llegir es queda estable; un sol focus amb color i la resta en gris tinta o més pàl·lid i lent; res no parpelleja més de 3 vegades per segon; amb prefers-reduced-motion, sense tremolors, escombrades ràpides ni esquitxades, traç gairebé aturat, transicions per fosa i micromoviments suaus; 60 fps en un portàtil normal i fluid en mòbil, reduint motes i capes si cal i cachejant els traços que bullen.

Llenguatge visual, segons el tipus d’idea:
- Xifra clau: número enorme que compta cap amunt amb el seu context després.
- Comparació: dues columnes o objectes, cadascun amb el seu color, que s’enfronten o se separen.
- Abans i després: la mateixa escena que es transforma davant dels ulls.
- Procés: flux d’objectes o caixes que es coloregen, amb una gota que recorre el camí.
- Línia de temps: eix dibuixat a mà que la càmera recorre i frena en cada fita.
- Jerarquia: arbre que creix branca a branca o zoom dins d’un objecte.
- Relacions: xarxa de nodes que s’atrauen i es connecten, amb punts que viatgen.
- Proporcions: barres o blocs que es farceixen amb rebot; mai pastissos amb més de 3 parts.
- Tendència: línia o dispersió que es dibuixa punt a punt amb la punta del llapis; els punts no es mouen del seu lloc.
- Taula: quadrícula dibuixada a mà que es farceix cel·la a cel·la.
- Producte o interfície: maqueta de pantalla amb un cursor que la fa servir, clics amb ones i pantalles que llisquen.
- Arquitectura tècnica: caixes i fletxes amb paquets de dades viatjant sense parar.
- Persona: figura sòbria o sprite que es mou i gesticula.
- Concepte abstracte: metàfora senzilla i coherent que torna cada vegada.
- Risc o límit: el mateix gràfic amb una zona marcada en vermell, tremolant o ratllada.
- Conserva valors, unitats, escales i línia de base. L’estil mai canvia una dada. Un concepte manté color, forma i posició relativa.

Format tècnic:
- Una sola pàgina HTML autocontinguda, amb tot el CSS i el JS a dins, publicada com a artefacte.
- Tota la pel·lícula viu en un llenç 2D infinit de paper a 60 fps. Cada capítol ocupa una zona i la càmera viatja entre zones amb zoom, desplaçament i rotació, sense talls. Les zones poden niar-se i la càmera pot entrar en un detall.
- Un MANIFEST en JSON amb escenes (id, inici, fi) i frases amb temps t0 i t1 controla càmera, animacions, veu i subtítols. Es pot saltar a qualsevol moment i tot es dibuixa bé: les animacions depenen del temps i usen llavors fixes, mai Math.random() solt en dibuixar. Els subtítols i els controls es dibuixen sempre nítids.
- Si un efecte no surt bé amb codi, simplifica’l abans que deixar-lo lleig.

Narració, subtítols i so:
- Si la veu triada és la del navegador, usa la Web Speech API amb la veu més natural de la llengua i avisa que sona robòtica i que, per a clients, convé una veu generada a part. Si hi ha un àudio adjunt, integra’l en base64 i sincronitza el MANIFEST amb ell. Si la veu és gravada o generada a part, deixa l’estructura i els temps preparats per integrar-la.
- Subtítols centrats a baix, que s’il·luminen paraula a paraula al ritme de la veu. Les paraules clau porten el color d’accent del capítol i un petit salt d’escala.
- Música de fons amb Web Audio, amb pols clar de 100-120 BPM, que baixa de volum quan parla la veu. En manual, sons suaus i acústics (marimba, piano lleuger, notes puntejades). En pixel art, ones quadrades i triangulars tipus videojoc. En combinat, mescla. Botó per silenciar-la.
- Efectes subtils amb Web Audio: fregament de paper en cada viatge, traç en aparèixer un element i cop greu en les xifres clau. En pixel art, versions blip. Que acompanyin, no que molestin.

Interfície:
- Pantalla d’inici animada amb el paper viu i la metàfora principal al darrere: etiqueta petita («Pel·lícula de X minuts · tipus de document, data»), títol gran escrit lletra a lletra amb una paraula en color d’accent, paràgraf de resum i botó «Veure la pel·lícula» que batega. A sota: «Amb narració · pots fer zoom i moure’t pel llenç en qualsevol moment». En prémer, la càmera es llança dins del paper.
- A dalt a la dreta, «03 / 12» i el nom del capítol, amb animació. Barra inferior amb play i pausa, línia de temps dividida per capítols (nom en passar el ratolí), temps actual i total, subtítols (C), música (M), reixeta de píxels (G, només en pixel art i combinat) i pantalla completa. Espai per pausar; fletxes per saltar de capítol. Controls amb aspecte dibuixat a mà o en píxels, però clars.
- Scroll per fer zoom i arrossegament per moure’s pel llenç en qualsevol moment. Llavors apareix «SEGUIR PEL·LÍCULA» per tornar; doble clic també torna. Mentre s’explora, el llenç segueix viu. Al final, la càmera s’allunya i es veu el quadern ple, amb «Veure una altra vegada» i «Explorar el llenç».
- Funciona en mòbil: pessigar per fer zoom i interfície simplificada. El canvas i els controls tenen etiquetes accessibles i res essencial depèn només del color.
- Ajusta l’energia al tipus de document: producte, comercial o formació, màxima; científic o tècnic, alta però precisa; intern o normatiu, mitjana i suau; incident o risc, mitjana i ferma, sense esquitxades festives.

### Fase 4. Revisa abans d’entregar
Comprova i explica el resultat de cada punt: cada xifra coincideix amb el document; veu, subtítols i animacions van sincronitzats; no hi ha cap moment quiet més d’1 segon; cada 2 o 3 segons passa una cosa nova; sempre se sap on mirar i el text es llegeix bé; l’estil triat es respecta en tota la pel·lícula; si hi ha Blueprint, el motiu es reconeix en un fotograma reduït; saltar a qualsevol punt dibuixa el mateix que veure-ho seguit; no queda text en anglès si la pel·lícula no és en anglès; no hi ha superposicions ni textos fora de pantalla en escriptori ni en mòbil; va fluid a 60 fps; i algú que no ha llegit el document podria explicar la idea central després de veure-la.

Acaba amb quatre línies: quin tipus de document has detectat, quina estructura has fet servir, quin estil i variant has aplicat i què has deixat fora.`,
  en: `Work in four phases and do not move on to the next phase early.

### Phase 1. Analyse before writing
Read the whole document and provide a short brief with: document type; core idea in fewer than 20 words; 3 to 7 key ideas ordered by importance; key data and figures with their source; technical terms and how you will explain them; the gap between the document's level and the audience's level; filler you will leave out; gaps the audience will ask about that the document does not answer; the main visual metaphor, which must be able to move, grow and transform throughout the film; and which palette colour you assign to each recurring concept. If a field is empty, infer it from the document and say what you assumed.

### Phase 2. Write the script and wait for approval
Provide the title, the subtitle, the opening-screen paragraph and a table for each chapter with: number and short name; narration sentence by sentence with keywords marked; what is on screen and what moves in each sentence; the chapter's colour pair; the entrance transition; the estimated duration; and the source of each figure. Stop here and wait for the brief and script to be approved. Do not program anything yet.

Writing rules:
- Use the same language as these instructions, natural, as if you were explaining it to a smart colleague who does not know the topic.
- Sentences under 20 words, one idea per sentence, active voice and concrete verbs. Avoid "it is worth noting", "it is important to point out", "in this sense", "at the level of" and "add value".
- Explain each technical term the first time in plain words or with an everyday comparison. Say figures the way people speak them; the exact figure can appear on screen.
- Write for the ear: no brackets, no unexplained acronyms and no long lists. Alternate short and medium sentences; use very short sentences as punches.
- Use only information from the document. Do not invent figures, names, quotations or examples presented as real. If you use an invented example, make it clear ("imagine that..."). If there are limits, doubts or risks, state them. Do not include personal or sensitive data. Do not invent connections the document does not make.
- Start with a strong hook in the first 3 seconds, never with "In this video we are going to see...".
- One chapter = one idea. If it needs two, split it. End with an idea that sticks or with a clear action, depending on the objective.

Structure by document type:
- Paper or scientific study: hook, research question, why it was hard, method, results by chapter, limits and controls, what it means and what is missing.
- Results or data report: hook with the most striking figure, context, 3 to 5 findings, what explains them and what to do about them.
- Product document: the user's problem as a real scene, how it is solved today and why that fails, the product, how it works step by step, benefits with data and what comes next.
- Methodology, process or procedure: what you get at the end, overview, each step with who and with what, common mistakes and a summary diagram.
- Strategy or plan: where we are, where we want to go, why now, the bets, how we will measure them and what each person is asked to do.
- Commercial proposal: the client's problem, the cost of not solving it, the proposal, how it works, evidence and next steps.
- Policy, regulation or internal document: why it exists, who it affects, before and after, what is allowed and what is not with examples, and who to ask.
- Technical documentation or architecture: what the system is for, overview, each part and its role, the journey of a piece of data from start to finish and weak points.
- Case study: client and situation, problem, what was tried, solution, results in figures and the applicable lesson.
- Training material: what you will be able to do at the end, concepts one by one with an example, a mental exercise or question and a summary.
- Comparison or options appraisal: the decision, criteria, each option against the criteria, final table and a reasoned recommendation.
- Postmortem or incident: what happened, impact, root cause, why it was not detected and what changes. Neutral tone, no blame.
- Opinion article or essay: hook, thesis, arguments one by one, the strongest objection and its answer, and conclusion.
- Other or hybrid: propose a structure and justify it in two lines.

Duration:
- 1 to 2 ideas: 1 to 2 minutes and 4 to 6 chapters.
- 3 to 5 ideas: 2 to 4 minutes and 6 to 10 chapters.
- Dense content: 4 to 6 minutes and 10 to 15 chapters.
- Each chapter lasts 15 to 30 seconds. If no duration is given, decide by content density, not by document length.

### Phase 3. Build the film
Only do this once the script is approved.

Hand-drawn style, which is the base of the other two:
- Ivory paper #F2F0E5 with an almost invisible grid and a noise-generated paper texture. Charcoal ink #100F0F, thin and slightly imperfect outlines. Plenty of white space.
- Localised, translucent watercolour, with a slightly darker edge and overlapping transparent layers. Flexoki palette: blue #4385BE, cyan #3AA99F, purple #8B7EC8, orange #DA702C, ochre #D0A215, green #879A39, magenta #CE5D97; red #D14D41 only for risk or error.
- Two accents per chapter, with a third if it helps reading. Alternate pairs between chapters (blue-purple, cyan-blue, cyan-purple, orange-blue, green-cyan, ochre-purple) and do not make the whole film the same.
- A recurring concept always keeps the same colour. In a comparison, each side keeps its own.
- Boiling line: every outline is redrawn with small variations at 8-12 frames per second, alternating 3 or 4 fixed seeded versions, while the general movement runs at 60 fps. Lines have variable pressure, thicker at the start and thinner at the end.
- Hand-drawn lettering inspired by Consolas: start from a monospaced face close to Consolas (Inconsolata, with accents) and distort each letter with its own seed: offset, 1 to 3 degree rotation, height, weight and shaky outline, irregular baseline and imperfect spacing. No ornamental italics, school handwriting or editorial serifs. In subtitles, minimal irregularity and no shaking.
- Recognisable schematic objects and sober figures with no real person's features. Boxes only for abstract ideas. Arrows only for direction, lines for relationships and containers for belonging.
- No coloured border, signatures, title block, dimensions or fictional annotations.

Pixel art, which is the hand-drawn style seen through a grid:
- Draw each frame at hand-drawn resolution and reduce it to 320x180 (480x270 if there is a lot of text), with a closed palette of 16 to 24 Flexoki colours and the neutrals #DAD8CE, #B7B5AC and #6F6E69.
- Turn transparency and texture into Bayer 4x4 dot patterns. No smooth gradients or partial transparency. Scale up with integer scaling and no smoothing (image-rendering: pixelated), centred, with no blurs or shadows.
- Camera and objects always on whole pixels. Zooms are redrawn from the new position, never by scaling half pixels. Lines and poses change at 6-12 frames per second. People as compact full-body sprites with a clear silhouette, never stick figures. Pixel grid toggled with G, on by default.

Combined:
- Paper, structure and what has already been told stay in crisp hand-drawn style. Whatever is in action (particles, counting figures, characters, travelling data) goes through the pixel layer. Elements enter pixelated and are revealed in hand-drawn style as they settle, or the other way round as they leave. It must look intentional; if it looks like a mistake, go back to the hand-drawn style.

Dark variant:
- Deep blue background #01152F, with areas #1E3650 and #12253B, never black. Ink #F2F0E5 or #DAD8CE, never pure white. Brighter watercolour. In pixel art, move from one blue to another with bands or patterns, not a smooth gradient.

High-impact Blueprint finish:
- Broad, saturated watercolour stains with granulation and spreading edges. Two contrasting colour families and the contrast concentrated on the main motif, which must be understandable at a glance at final size. Guide the eye with scale, position, colour and order of appearance. Show real objects, people or interfaces and use arrows only for specific relationships. Keep labels short and legible. Keep the narration's pace and follow the reading order.

Dynamism, which governs everything visual:
- Nothing is still: in every frame the camera, the paper, the elements or all of them move. Something new happens every 2 or 3 seconds. The image is never frozen for more than 1 second, not even between chapters.
- Living camera: when it is not travelling it drifts slowly (offset, slight zoom and 1 to 2 degree rotation). Chapter travels last 0.8 to 1.5 seconds, with strong acceleration out and gentle braking in. Alternate zoom out, pan and zoom in, fast lateral sweeps, plunges into a detail and 90 degree turns. Pencil trails in hand-drawn style and smear frames in pixels. Small 3 to 5 % pushes on keywords and shaking only on the strongest beats (1 or 2 pixels in pixel art). At least 3 parallax layers.
- Living paper: moving grid, faint breathing stains, pigment specks, splatters and animated texture that reacts to the story.
- Breathing elements: continuous micro-movement (floating, breathing between 98 and 102 %, swaying, slow rotation). Lines and arrows with travelling dots or pulses. Numbers that are drawn and count up with a bounce; charts that build themselves (bars bouncing into place, lines drawn with a visible pencil tip, dots falling like ink drops). Entrances with a fast outline and later fill, bounce scaling, sliding with a trail or an explosion of specks.
- Staggered entrances with 60-120 ms between elements. Exits erased, shrunk, dissolved or transformed. Use transformations between ideas: a number becoming a bar, a circle opening into a diagram, a document splitting into parts. The main metaphor returns and evolves.
- Kinetic text: titles written letter by letter with an accent stain behind them; key phrases that drop in, get underlined or crossed out; huge figures with a splash and a camera punch.
- Synchronised rhythm: every keyword triggers a visual beat; stains and specks pulse with the music; chapter changes land on a strong beat.
- Effects: trails on fast movement, brief splashes, expanding watercolour and a soft vignette. No neon or digital glows. Effects reinforce the idea, never cover it.
- Limits: text to be read stays stable; one colour focus at a time and everything else in ink grey or paler and slower; nothing flashes more than 3 times per second; with prefers-reduced-motion, no shaking, fast sweeps or splashes, almost still boiling lines, fade transitions and very soft micro-movements; 60 fps on a normal laptop and smooth on mobile, reducing specks and layers if needed and caching the boiling lines.

Visual language, by type of idea:
- Key figure: a huge number counting up with its context afterwards.
- Comparison: two columns or objects, each in its colour, facing or separating.
- Before and after: the same scene transforming before your eyes.
- Process: a flow of objects or boxes being coloured, with a drop travelling along the path.
- Timeline: a hand-drawn axis the camera travels along, slowing at each milestone.
- Hierarchy: a tree growing branch by branch or a zoom into an object.
- Relationships: a network of nodes attracting and connecting, with travelling dots.
- Proportions: bars or blocks filling with a bounce; never pies with more than 3 parts.
- Trend: a line or scatter plot drawn point by point with the pencil tip visible; the points do not move from their place.
- Table: a hand-drawn grid filled cell by cell.
- Product or interface: a screen mock-up with a cursor using it, click ripples and sliding screens.
- Technical architecture: boxes and arrows with data packets travelling non-stop.
- Person: a sober figure or sprite that moves and gestures.
- Abstract concept: a simple, coherent metaphor that returns each time.
- Risk or limit: the same chart with an area marked in red, shaking or crossed out.
- Keep values, units, scales and baseline. Style never changes a figure. A concept keeps its colour, shape and relative position.

Technical format:
- One self-contained HTML page, with all CSS and JS inside, published as an artifact.
- The whole film lives on one infinite 2D paper canvas at 60 fps. Each chapter occupies an area and the camera travels between areas with zoom, pan and rotation, without cuts. Areas can be nested and the camera can enter a detail.
- A JSON MANIFEST with scenes (id, start, end) and sentences with t0 and t1 times controls camera, animations, voice and subtitles. You can jump to any moment and everything draws correctly: animations depend on time and use fixed seeds, never loose Math.random() while drawing. Subtitles and controls are always drawn crisp.
- If an effect does not work well in code, simplify it rather than leaving it ugly.

Narration, subtitles and sound:
- If the chosen voice is the browser voice, use the Web Speech API with the most natural voice for the language and warn that it sounds robotic and that a separately generated voice is better for clients. If an audio file is attached, embed it as base64 and sync the MANIFEST to it. If the voice is recorded or generated separately, leave the structure and timings ready for it.
- Subtitles centred at the bottom, lighting up word by word with the voice. Keywords use the chapter accent colour and a small scale jump.
- Background music with Web Audio, a clear 100-120 BPM pulse, lowering when the voice speaks. Hand-drawn: soft acoustic sounds (marimba, light piano, plucked notes). Pixel art: square and triangle waves, video-game style. Combined: a mix. Mute button.
- Subtle Web Audio effects: paper rustle on each camera move, a stroke when an element appears and a low hit on key figures. In pixel art, blip versions. They should accompany, not annoy.

Interface:
- Animated start screen with the living paper and the main metaphor behind it: small label ("X-minute film · document type, date"), large title written letter by letter with one word in the accent colour, summary paragraph and a softly pulsing "Watch the film" button. Below: "With narration · you can zoom and move around the canvas at any time". On click, the camera dives into the paper.
- Top right: "03 / 12" and the chapter name, animated. Bottom bar with play and pause, a timeline split by chapters (name on hover), current and total time, subtitles (C), music (M), pixel grid (G, only in pixel art and combined) and full screen. Space to pause; arrows to jump chapters. Controls look hand-drawn or pixelated but are clear.
- Scroll to zoom and drag to move around the canvas at any time. A "FOLLOW THE FILM" button appears to return; double-click also returns. The canvas stays alive while exploring. At the end, the camera pulls back to show the full notebook, with "Watch again" and "Explore the canvas".
- Works on mobile: pinch to zoom and a simplified interface. The canvas and controls have accessible labels and nothing essential relies on colour alone.
- Match the energy to the document type: product, commercial or training, maximum; scientific or technical, high but precise; internal or policy, medium and smooth; incident or risk, medium and firm, with no celebratory splashes.

### Phase 4. Review before delivering
Check and report the result of each point: every figure matches the document; voice, subtitles and animations are in sync; no moment is still for more than 1 second; something new happens every 2 or 3 seconds; it is always clear where to look and the text is easy to read; the chosen style is respected throughout; if Blueprint is on, the motif is recognisable in a reduced frame; jumping to any point draws the same as watching it straight through; no English text remains if the film is not in English; there is no overlapping or off-screen text on desktop or mobile; it runs smoothly at 60 fps; and someone who has not read the document could explain the core idea after watching it.

End with four lines: what document type you detected, what structure you used, what style and variant you applied and what you left out.`,
}
