import type { Language } from './types'

// Novedades que se anuncian en la portada (sustituyen a los casos listos para
// usar). Cada una abre su herramienta. Actualizar en cada versión con cambios
// visibles para el profesorado; se muestran las tres primeras, de más reciente
// a más antigua. El historial completo está en el CHANGELOG.
export const newsVersion = '0.39.2'
export const changelogUrl = 'https://git.edutictac.es/Edutictac/edutictac-prompt/src/branch/master/CHANGELOG.md'

export type NewsItem = { templateId: string; text: Record<Language, string> }

export const news: NewsItem[] = [
  {
    templateId: 'editable-latex',
    text: {
      es: 'Nueva herramienta: fórmulas y cálculos en LaTeX editable, para mostrar fórmulas ya compuestas y crear documentos con ecuaciones editables.',
      'ca-valencia':
        'Nova ferramenta: fórmules i càlculs en LaTeX editable, per a mostrar fórmules ja compostes i crear documents amb equacions editables.',
      ca: 'Nova eina: fórmules i càlculs en LaTeX editable, per a mostrar fórmules ja compostes i crear documents amb equacions editables.',
      en: 'New tool: editable LaTeX formulas and calculations, to display typeset formulas and create documents with editable equations.',
    },
  },
  {
    templateId: 'rubric',
    text: {
      es: 'Nuevo en Rúbrica: CSV Aules / Moodle con cuatro niveles y puntuación máxima configurable (100 por defecto). Incluye las reglas de importación y la petición del archivo descargable.',
      'ca-valencia':
        'Nou en Rúbrica: CSV Aules / Moodle amb quatre nivells i puntuació màxima configurable (100 per defecte). Inclou les regles d’importació i la petició de l’arxiu descarregable.',
      ca: 'Nou a Rúbrica: CSV Aules / Moodle amb quatre nivells i puntuació màxima configurable (100 per defecte). Inclou les regles d’importació i la petició del fitxer descarregable.',
      en: 'New in Rubric: CSV Aules / Moodle with four levels and a configurable maximum score (default 100). Includes import rules and asks for a downloadable file.',
    },
  },
  {
    templateId: 'illustrated-worksheet',
    text: {
      es: 'Nuevo: «Mostrar QR» en cada herramienta para proyectarla ya rellena, y en Mi biblioteca, «Preparar la sesión»: una página con el QR y el enlace de varios prompts para imprimir o proyectar.',
      'ca-valencia':
        'Nou: «Mostra el QR» en cada ferramenta per a projectar-la ja omplida, i en La meua biblioteca, «Prepara la sessió»: una pàgina amb el QR i l’enllaç de diversos prompts per a imprimir o projectar.',
      ca: 'Nou: «Mostra el QR» a cada eina per projectar-la ja emplenada, i a La meva biblioteca, «Prepara la sessió»: una pàgina amb el QR i l’enllaç de diversos prompts per imprimir o projectar.',
      en: 'New: “Show QR” in every tool to project it already filled in, and in My library, “Prepare the session”: one page with the QR code and link of several prompts to print or project.',
    },
  },
  {
    templateId: 'worksheet',
    text: {
      es: 'Nuevo en todas las herramientas: «Compartir con estos datos» crea un enlace que abre el formulario ya relleno, y «Generar ya» en cuanto pones el nivel y el tema.',
      'ca-valencia':
        'Nou en totes les ferramentes: «Compartix amb estes dades» crea un enllaç que obri el formulari ja omplit, i «Genera ara» tan prompte com poses el nivell i el tema.',
      ca: 'Nou a totes les eines: «Comparteix amb aquestes dades» crea un enllaç que obre el formulari ja emplenat, i «Genera ara» tan aviat com poses el nivell i el tema.',
      en: 'New in every tool: “Share with these answers” makes a link that opens the form already filled in, and “Generate now” as soon as you set the level and topic.',
    },
  },
]
