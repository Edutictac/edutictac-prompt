# Verificación de la entrega 0.15.0 / API 0.2.0

- Base antes del cambio: 67 pruebas frontend y 8 pruebas API, satisfactorias.
- Entrega: 100 pruebas Vitest en 16 archivos y 21 pruebas pytest, satisfactorias.
- `npm run build`: TypeScript y compilación PWA correctos. Permanece el aviso de Vite por el tamaño del bundle principal previo; Skills se carga en un chunk separado.
- `npm audit`: cero vulnerabilidades conocidas después de actualizar los paquetes afectados.
- `npm run lint`: no ejecuta análisis porque el proyecto no contiene `eslint.config.*` (problema previo documentado en la memoria del proyecto); no se presenta como comprobación superada.
- Chromium: catálogo con seis tarjetas a 390, 768, 820, 1024 y 1440 px sin desbordamiento horizontal; sin errores JavaScript observados. Interfaz española y catalana, definiciones ES/VA. Pruebas de formularios e idiomas cubren también valenciano e inglés.
- Se comprueba ida/vuelta de ZIP para Codex/OpenCode y M365, cabeceras válidas, referencias y manifiesto. Se rechazan rutas peligrosas, scripts, formatos no admitidos, aliases YAML, duplicados YAML, symlinks, miembros cifrados, corrupción y límites de tamaño.
- La migración v1→v2 conserva un prompt de la base anterior en una prueba IndexedDB realista (fake-indexeddb).
- La inferencia está probada con transporte simulado, incluyendo errores y límites. No se configura un proveedor nuevo ni se envían datos a un modelo real durante las pruebas.
- Compatibilidad estructural basada en especificación oficial. Quedan para los entornos correspondientes: ejecutar paquetes dentro de Codex/OpenCode, importar en un tenant M365 con Frontier y probar GIFT en un curso Moodle/Aules. No se afirma haber realizado esas pruebas.
- Recorrido Chromium completo verificado: preparación de rúbrica, pegado y guardado del resultado en la biblioteca de prompts existente, descarga de ZIP, reimportación, guardado no confiable, confirmación de revisión y nueva preparación. Sin errores de JavaScript.
