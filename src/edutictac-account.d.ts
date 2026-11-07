import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'edutictac-account': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-base'?: string
        'data-density'?: string
        'data-no-reload'?: string
        'data-home'?: string
        'data-lang'?: string
      }
    }
  }
}

declare global {
  interface Window {
    edutictacLanguage?: { languages: string[]; get: () => string; set: (value: string) => void }
    edutictacTheme?: { read: () => string; remember: (value: string) => void }
  }
}
