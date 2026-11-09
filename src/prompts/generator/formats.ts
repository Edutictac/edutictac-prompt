import type { Language } from '../../types'

export function returnTextFor(language: Language): string {
  return language === 'en'
    ? 'Return the result in'
    : language === 'es'
      ? 'Devuelve el resultado en'
      : language === 'ca-valencia'
        ? 'Retorna el resultat en'
        : 'Retorna el resultat en'
}

export const fileFormatInstructions: Record<Language, Record<string, string>> = {
  es: {
    PDF: 'Crea un archivo PDF descargable si puedes generar archivos; si no, entrega el contenido maquetado y listo para exportar a PDF.',
    ODT: 'Crea un archivo de texto OpenDocument (.odt) descargable si puedes generar archivos; si no, entrega el contenido estructurado y listo para guardar en ODT.',
    DOCX: 'Crea un documento de Word (.docx) descargable si puedes generar archivos; si no, entrega el contenido estructurado y listo para guardar en DOCX.',
  },
  'ca-valencia': {
    PDF: 'Crea un arxiu PDF descarregable si pots generar arxius; si no, entrega el contingut maquetat i preparat per a exportar-lo a PDF.',
    ODT: 'Crea un arxiu de text OpenDocument (.odt) descarregable si pots generar arxius; si no, entrega el contingut estructurat i preparat per a guardar-lo en ODT.',
    DOCX: 'Crea un document de Word (.docx) descarregable si pots generar arxius; si no, entrega el contingut estructurat i preparat per a guardar-lo en DOCX.',
  },
  ca: {
    PDF: 'Crea un fitxer PDF descarregable si pots generar fitxers; si no, lliura el contingut maquetat i a punt per exportar-lo a PDF.',
    ODT: 'Crea un fitxer de text OpenDocument (.odt) descarregable si pots generar fitxers; si no, lliura el contingut estructurat i a punt per desar-lo en ODT.',
    DOCX: 'Crea un document de Word (.docx) descarregable si pots generar fitxers; si no, lliura el contingut estructurat i a punt per desar-lo en DOCX.',
  },
  en: {
    PDF: 'Create a downloadable PDF if you can generate files; otherwise provide the fully formatted content ready to export as PDF.',
    ODT: 'Create a downloadable OpenDocument Text (.odt) file if you can generate files; otherwise provide structured content ready to save as ODT.',
    DOCX: 'Create a downloadable Word (.docx) document if you can generate files; otherwise provide structured content ready to save as DOCX.',
  },
}

export function fileFormatInstructionFor(language: Language, outputFormat: string): string | undefined {
  return fileFormatInstructions[language][outputFormat]
}
