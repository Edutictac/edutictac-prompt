# Agents: dissenyar un assistent docent per a Microsoft 365

La secció s’anomena **Agents** en valencià i **Agentes** en castellà. El seu objectiu és ajudar el professorat a definir el comportament d’un agent especialitzat i adaptar-lo a nivells educatius i matèries diferents. La configuració es prepara en EduTicTac; l’agent es crea i s’utilitza després en Microsoft 365 amb els permisos del compte educatiu.

## Un recorregut pràctic

1. Obri **Agents → Exemples** i tria un model, o entra en **Dissenyar agent** per a començar un agent personalitzat.
2. Tria el **nivell educatiu** i escriu la **matèria, àmbit o especialitat**. Hi ha suggeriments, però el camp és lliure. S’admeten Infantil, Primària, ESO, Batxillerat, FP, persones adultes, música, dansa, educació superior i formació del professorat.
3. Definix la funció de l’agent, qui l’utilitzarà i per a què ajudarà. El context del centre o curs és opcional.
4. Revisa els **modes de treball**: quan s’activa cadascun i què ha de fer. Pots usar Revisor i Guia o afegir-ne altres.
5. Escriu els **criteris**, els **errors que ha de detectar** i l’**estructura de resposta**. Un element per línia facilita la lectura; no cal saber programar ni escriure YAML.
6. Indica el to, les restriccions, el màxim de preguntes per torn i si ha de treballar una sola proposta cada vegada. Pots afegir exemples i preguntes inicials.
7. Tria l’idioma de les instruccions. L’idioma de resposta pot ser **l’idioma en què li escriguen** o una llengua fixa; és independent de la interfície.
8. Polsa **Preparar configuració**. Revisa els camps de Microsoft: Nom, Descripció, Instruccions, Coneixements previstos i Preguntes inicials.
9. **Guardar disseny** conserva la configuració en **Els meus agents**. També pots descarregar-ne una guia.
10. En M365, entra en **Agents → Crear agent → Configurar**, copia els camps, afig els materials autoritzats en Coneixements i prova l’agent abans de crear-lo.

## Exemple: del conservatori a un altre context

El model **Mentor d’objectius SMART** reprén el patró de l’exemple compartit pel docent: modes Revisor i Guia, criteris SMART, catàleg d’errors i indicadors de procés i resultat. No inventa línies base, ni decidix responsables o terminis per l’equip directiu.

Per a adaptar-lo a Primària, canvia el nivell a **Educació Primària**, la matèria a **Gestió del centre** o l’àmbit que corresponga i els destinataris a l’equip docent. Revisa els criteris i exemples perquè corresponguen a la nova tasca. Canviar la matèria dona context al model; no substituïx la revisió docent dels criteris.

En **Els meus agents**, usa **Duplicar** abans d’adaptar-lo si vols conservar l’original. **Editar i adaptar** permet canviar nivell, matèria i comportament. L’historial restaura una versió com a revisió nova sense eliminar les anteriors. L’eliminació demana confirmació.

## Provar l’agent durant la formació

- Dona-li una proposta ja redactada: comprova que activa el mode Revisor i aplica els criteris.
- Dona-li una idea vaga: comprova que activa Guia i respecta el màxim de preguntes per torn.
- Inclou diverses propostes: comprova que les tracta d’una en una si ho has activat.
- Omet un valor real: comprova que el demana o el marca com a pendent i que no l’inventa.
- Canvia d’idioma: comprova que respon en la llengua esperada.
- Si has afegit documents, pregunta alguna cosa que hi aparega i una altra que no: comprova les fonts i els límits.

Les instruccions orienten el model, però no garantixen per si soles que sempre complisca totes les regles. Esta prova forma part de la pràctica del curs.

## Guardat i compatibilitat

Els dissenys es guarden en este navegador, separats per compte. No se sincronitzen amb M365 ni amb la biblioteca remota de prompts. Un canvi de compte mostra els dissenys d’eixa persona; en equips compartits cal usar perfils de navegador separats. Descarrega la guia per a conservar una còpia. Els canvis del formulari es mantenen en canviar entre les pestanyes d’Agents durant la sessió; guarda abans d’eixir de la secció o recarregar.

**Compatibilitat** conserva l’antiga biblioteca i els paquets **Agent Skills** per a Codex/OpenCode i altres entorns compatibles. Una habilitat reutilitzable i un agent configurat són elements diferents. No s’han convertit ni esborrat les habilitats anteriors automàticament. La importació de Skills natives en M365 continua sent una opció addicional en vista prèvia; no és necessària per a configurar els agents amb els camps habituals.

La disponibilitat de Crear agent, les fonts i la compartició en edu.gva.es depén dels permisos i de la llicència de l’organització. Copiar el nom d’un document no dona accés al seu contingut: afig-lo dins de M365 només quan tingues autorització. No uses dades personals de l’alumnat en les pràctiques.
