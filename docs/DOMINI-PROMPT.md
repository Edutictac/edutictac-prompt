# Accés amb prompt.edutictac.es

Adreça curta per a l’aula: https://prompt.edutictac.es/. HTTP passa a HTTPS i el subdomini redirigix a la PWA publicada en EduTicTac Pages. Es conserven ruta, consulta i els enllaços amb fragment del navegador.

La redirecció conserva l’origen actual de la PWA: la biblioteca local, les preferències i el service worker continuen en el mateix lloc. Servir l’aplicació directament en un origen nou requeriria planificar la migració de les dades locals.

La configuració de referència està en `deploy/nginx/prompt.edutictac.es.conf`. Usa un certificat propi de Let’s Encrypt amb validació HTTP-01 per webroot i renovació automàtica. No substituïx el certificat compartit d’altres aplicacions.

El monitor de producció comprova també l’accés curt, a més de l’API, l’aplicació publicada i la versió. La publicació de l’aplicació continua fent-se amb `scripts/publish-pages.sh`; afegir esta adreça no canvia la branca `pages`.
