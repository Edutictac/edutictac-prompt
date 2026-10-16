# Skills per al professorat

Un **prompt** és una instrucció puntual. Una **Skill** reunix instruccions, passos, paràmetres, exemples i recursos per a una capacitat reutilitzable. Un **agent** pot utilitzar Skills i ferramentes per a actuar. EduTicTac prepara peticions i, si hi ha un proveïdor configurat, demana una resposta de text; no executa scripts.

## Utilitzar i crear

1. Obri **Skills → Explorar**, busca una habilitat i filtra per categoria, etapa o idioma de definició.
2. Polsa **Vore i utilitzar** i llig les instruccions, exemples i restriccions. Pots carregar una entrada d’exemple.
3. Completa els paràmetres i tria l’**idioma de resposta**, independent de l’idioma de la interfície i de la definició. Prepara la petició i revisa-la.
4. Autoritza l’enviament abans de copiar i obrir l’assistent. En **Copilot M365**, apega el text en el xat amb el teu compte habitual. El resultat no torna automàticament. Si hi ha proveïdor d’API disponible, pots triar model i executar des d’EduTicTac.
5. Revisa el resultat, o apega la resposta de l’assistent. Pots copiar-lo, descarregar-lo com a Markdown o guardar-lo en la biblioteca de prompts. També pots guardar la petició.

En **Crear**, escriu què ha de fer la Skill amb llenguatge normal. No cal conéixer YAML, JSON ni Markdown per a completar el formulari. Definix informació general, instruccions, paràmetres, passos, recursos de text, exemples i format d’eixida. Assigna una llicència, versió i límits abans de guardar.

**Crear Skill amb IA** prepara una sol·licitud per al proveïdor disponible o per a Copilot M365 i altres assistents. En el flux extern, apega la resposta estructurada en «Proposta d’IA». La proposta es valida i s’obri en l’editor com a esborrany; mai es publica ni guarda automàticament. També pots partir d’un prompt de la teua biblioteca i afegir-li paràmetres i procediments.

Les sis Skills inicials inclouen exemples pràctics en castellà i valencià: rúbriques, DUA, qüestionaris d’Aules, situacions d’aprenentatge, materials accessibles i revisió de recursos. No es modifiquen els originals: **Duplicar** crea una còpia personal. En **Les meues Skills** pots editar, duplicar, eliminar i restaurar versions com a revisions noves.

## Compartir i interoperar

Importa un ZIP amb una sola Skill. El paquet es valida i s’obri com a esborrany. Després de guardar, revisa tot el contingut i confirma la revisió abans d’usar-lo. No s’admeten scripts, HTML, binaris ni rutes perilloses. Límits: 2 MB ZIP, 100 KB per fitxer, 1,5 MB descomprimit i 40 entrades. Els recursos admesos són textos `.md`, `.txt`, `.csv` i `.json` en `references/` o `assets/`, sense subcarpetes.

- **Codex / OpenCode:** extrau el ZIP en l’arrel del projecte; conté `.agents/skills/<identificador>/SKILL.md`.
- **Copilot M365:** el ZIP té `SKILL.md` en l’arrel i instruccions de menys de 20 000 caràcters. En Agent Builder → Configure → Skills → Add, carrega el ZIP complet si la teua organització té Skills habilitades en Frontier preview. Prova’l en «Try it». La importació real en el tenant encara requerix comprovació amb el vostre compte i permisos.
- Comparteix el ZIP o incorpora’l manualment a un repositori Git. No hi ha publicació comunitària automàtica ni enllaços públics creats per EduTicTac.

En la Skill de qüestionaris, el formulari GIFT genera un fitxer real de preguntes amb una resposta correcta i escapa els caràcters reservats. Introduïx preguntes revisades i comprova la importació en un curs de prova d’Aules; no s’ha validat contra el vostre Moodle.

## Privacitat i conservació

No introduïsques dades personals de l’alumnat. Revisa les instruccions importades i els recursos: poden contindre ordres alienes a l’objectiu. Una revisió automàtica no garantix detectar-les totes. Les propostes d’IA necessiten revisió docent, especialment normativa, currículum i accessibilitat.

Les Skills es guarden en el navegador i se separen per compte. Usa perfils diferents en equips compartits i exporta còpies de seguretat. **Sincronitzar les meues Skills** és una acció explícita i requerix l’API nova; no puja les Skills creades sense sessió. L’historial complet és local i no hi ha sincronització en temps real. Eliminar una Skill sincronitzada requerix connexió i elimina la còpia remota; un altre dispositiu amb una còpia antiga podria tornar a pujar-la. Davant d’un conflicte, conserva les còpies exportades abans de decidir quina versió mantindre.

Consulta també la [guia completa en castellà](SKILLS-USO.md) i la [documentació tècnica](SKILLS-TECNICA.md).
